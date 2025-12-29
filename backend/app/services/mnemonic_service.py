"""
Mnemonic Service

Handles mnemonic generation operations including Claude AI integration,
database logging, and generation count tracking.
"""

from typing import Any, Dict, List, Optional

from supabase import Client

from app.core.supabase import get_supabase_client
from app.services.claude_service import claude_service


class MnemonicService:
    """
    Mnemonic Service for BrainKit

    Provides methods for generating mnemonics and tracking usage.
    """

    def __init__(self):
        """Initialize the mnemonic service with Supabase client"""
        self.admin_client: Client = get_supabase_client()

    async def check_generation_limit(self, user_id: str) -> Dict[str, Any]:
        """
        Check if user has remaining generations for the month.

        Args:
            user_id: The user's UUID

        Returns:
            Dict with:
                - can_generate: bool
                - remaining: int
                - is_premium: bool
                - reset_date: str (ISO format)

        Raises:
            Exception: If checking limit fails
        """
        try:
            # Get user profile
            response = self.admin_client.table("profiles") \
                .select("subscription_tier, generation_count_monthly, generation_reset_date") \
                .eq("id", user_id) \
                .single() \
                .execute()

            if not response.data:
                raise Exception("User profile not found")

            profile = response.data
            is_premium = profile.get("subscription_tier") == "premium"

            # Premium users have unlimited generations
            if is_premium:
                return {
                    "can_generate": True,
                    "remaining": -1,  # -1 indicates unlimited
                    "is_premium": True,
                    "reset_date": None,
                }

            # Free tier: Unlimited generations (removed limit)
            FREE_TIER_LIMIT = 999999
            count = profile.get("generation_count_monthly", 0)
            remaining = max(0, FREE_TIER_LIMIT - count)

            return {
                "can_generate": True,  # Always allow generation
                "remaining": remaining,
                "is_premium": False,
                "reset_date": profile.get("generation_reset_date"),
            }

        except Exception as e:
            raise Exception(f"Failed to check generation limit: {str(e)}")

    async def increment_generation_count(self, user_id: str) -> None:
        """
        Increment the user's monthly generation count.

        Args:
            user_id: The user's UUID

        Raises:
            Exception: If incrementing fails
        """
        try:
            # Get current count
            response = self.admin_client.table("profiles") \
                .select("generation_count_monthly") \
                .eq("id", user_id) \
                .single() \
                .execute()

            if not response.data:
                raise Exception("User profile not found")

            current_count = response.data.get("generation_count_monthly", 0)

            # Increment count
            self.admin_client.table("profiles") \
                .update({"generation_count_monthly": current_count + 1}) \
                .eq("id", user_id) \
                .execute()

        except Exception as e:
            raise Exception(f"Failed to increment generation count: {str(e)}")

    async def generate_mnemonics(
        self,
        user_id: str,
        list_items: List[str],
        deck_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Generate three mnemonic techniques for a list of items.

        Args:
            user_id: The user's UUID
            list_items: List of items to create mnemonics for
            deck_id: Optional deck ID to associate with this generation

        Returns:
            Dict containing:
                - acrostic: Dict with title, content, how_to_use
                - story: Dict with title, content, how_to_use
                - visual: Dict with title, content, how_to_use
                - metadata: Dict with generation info

        Raises:
            Exception: If generation fails or user has no remaining generations
        """
        try:
            # Check generation limit
            limit_check = await self.check_generation_limit(user_id)

            if not limit_check["can_generate"]:
                raise Exception(
                    f"You have reached your monthly limit of 3 free generations. "
                    f"Upgrade to Premium for unlimited generations."
                )

            # Generate mnemonics using Claude
            result = await claude_service.generate_mnemonics(
                list_items=list_items,
                user_id=user_id,
                deck_id=deck_id,
            )

            # Save generation to database
            input_list_text = "\n".join(list_items)

            generation_data = {
                "user_id": user_id,
                "deck_id": deck_id,
                "input_list": input_list_text,
                "item_count": result["metadata"]["item_count"],
                "acrostic_result": result["acrostic"],
                "story_result": result["story"],
                "visual_result": result["visual"],
                "generation_time_ms": result["metadata"]["generation_time_ms"],
                "claude_model": result["metadata"]["model"],
            }

            generation_response = self.admin_client.table("mnemonic_generations") \
                .insert(generation_data) \
                .execute()

            if not generation_response.data:
                raise Exception("Failed to save generation to database")

            generation_id = generation_response.data[0]["id"]

            # Increment generation count (only for free tier)
            if not limit_check["is_premium"]:
                await self.increment_generation_count(user_id)

            # Add generation_id to metadata
            result["metadata"]["generation_id"] = generation_id

            # Update remaining count
            if limit_check["is_premium"]:
                result["metadata"]["remaining_generations"] = -1
            else:
                result["metadata"]["remaining_generations"] = limit_check["remaining"] - 1

            return result

        except Exception as e:
            # Don't increment count on failure
            raise

    async def save_generation_from_pdf(
        self,
        user_id: str,
        deck_id: str,
        concepts: List[str],
        mnemonics: Dict[str, Any],
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Save a mnemonic generation from PDF extraction.

        This is similar to generate_mnemonics but the concepts and mnemonics
        were already extracted from a PDF by the PDF service.

        Args:
            user_id: The user's UUID
            deck_id: Deck ID to associate with this generation
            concepts: List of concepts extracted from PDF
            mnemonics: Dict with acrostic, story, visual techniques
            metadata: Generation metadata from Claude

        Returns:
            Dict containing updated metadata with generation_id

        Raises:
            Exception: If saving fails
        """
        try:
            # Check generation limit
            limit_check = await self.check_generation_limit(user_id)

            if not limit_check["can_generate"]:
                raise Exception(
                    f"You have reached your monthly limit of 3 free generations. "
                    f"Upgrade to Premium for unlimited generations."
                )

            # Save generation to database
            input_list_text = "\n".join(concepts)

            generation_data = {
                "user_id": user_id,
                "deck_id": deck_id,
                "input_list": input_list_text,
                "item_count": len(concepts),
                "acrostic_result": mnemonics["acrostic"],
                "story_result": mnemonics["story"],
                "visual_result": mnemonics["visual"],
                "generation_time_ms": metadata.get("generation_time_ms", 0),
                "claude_model": metadata.get("model", "unknown"),
            }

            generation_response = self.admin_client.table("mnemonic_generations") \
                .insert(generation_data) \
                .execute()

            if not generation_response.data:
                raise Exception("Failed to save generation to database")

            generation_id = generation_response.data[0]["id"]

            # Increment generation count (only for free tier)
            if not limit_check["is_premium"]:
                await self.increment_generation_count(user_id)

            # Return updated metadata
            updated_metadata = {
                "generation_id": generation_id,
                "generation_time_ms": metadata.get("generation_time_ms", 0),
                "item_count": len(concepts),
                "model": metadata.get("model", "unknown"),
            }

            if limit_check["is_premium"]:
                updated_metadata["remaining_generations"] = -1
            else:
                updated_metadata["remaining_generations"] = limit_check["remaining"] - 1

            return {"metadata": updated_metadata}

        except Exception as e:
            raise Exception(f"Failed to save PDF generation: {str(e)}")

    async def select_mnemonic(
        self,
        user_id: str,
        generation_id: str,
        selected_type: str,
        deck_id: str,
    ) -> Dict[str, Any]:
        """
        Save the user's selected mnemonic type to the deck.

        Args:
            user_id: The user's UUID
            generation_id: ID of the generation record
            selected_type: 'acrostic', 'story', or 'visual'
            deck_id: Deck ID to save the mnemonic to

        Returns:
            Dict with updated deck data

        Raises:
            Exception: If selection fails
        """
        try:
            # Verify generation belongs to user
            generation_response = self.admin_client.table("mnemonic_generations") \
                .select("*") \
                .eq("id", generation_id) \
                .eq("user_id", user_id) \
                .single() \
                .execute()

            if not generation_response.data:
                raise Exception("Generation not found")

            generation = generation_response.data

            # Get the selected mnemonic content
            selected_content = generation.get(f"{selected_type}_result")

            if not selected_content:
                raise Exception(f"No {selected_type} mnemonic found in generation")

            # Update generation record with selection
            self.admin_client.table("mnemonic_generations") \
                .update({"selected_type": selected_type}) \
                .eq("id", generation_id) \
                .execute()

            # Update deck with selected mnemonic
            deck_update = {
                "selected_mnemonic_type": selected_type,
                "selected_mnemonic_content": selected_content["content"],
                "original_list": generation["input_list"],
            }

            deck_response = self.admin_client.table("decks") \
                .update(deck_update) \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .execute()

            if not deck_response.data:
                raise Exception("Failed to update deck")

            return deck_response.data[0]

        except Exception as e:
            raise Exception(f"Failed to select mnemonic: {str(e)}")


# Singleton instance
mnemonic_service = MnemonicService()
