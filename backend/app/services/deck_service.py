"""
Deck Service

Handles all deck operations using Supabase.
This service layer abstracts database operations and provides
a clean interface for the API routes.
"""

from typing import Any, Dict, List, Optional

from supabase import Client

from app.core.supabase import get_supabase_client


class DeckService:
    """
    Deck Service for BrainKit

    Provides methods for creating, reading, updating, and deleting decks.
    Uses admin client to bypass RLS for service operations.
    """

    def __init__(self):
        """Initialize the deck service with Supabase client"""
        self.admin_client: Client = get_supabase_client()

    async def create_deck(
        self,
        user_id: str,
        name: str,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Create a new deck for a user.

        Args:
            user_id: The user's UUID
            name: Deck name (1-100 chars)
            description: Optional deck description

        Returns:
            Dict containing the created deck data

        Raises:
            Exception: If deck creation fails
        """
        try:
            response = self.admin_client.table("decks").insert({
                "user_id": user_id,
                "name": name,
                "description": description,
            }).execute()

            if not response.data:
                raise Exception("Failed to create deck")

            return response.data[0]

        except Exception as e:
            raise Exception(f"Deck creation failed: {str(e)}")

    async def get_decks_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        """
        Get all decks for a user, sorted by last_studied_at (most recent first).

        Args:
            user_id: The user's UUID

        Returns:
            List of deck dictionaries

        Raises:
            Exception: If fetching decks fails
        """
        try:
            response = self.admin_client.table("decks") \
                .select("*") \
                .eq("user_id", user_id) \
                .order("last_studied_at", desc=True, nullsfirst=False) \
                .order("created_at", desc=True) \
                .execute()

            return response.data if response.data else []

        except Exception as e:
            raise Exception(f"Failed to fetch decks: {str(e)}")

    async def get_deck_by_id(self, deck_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        """
        Get a specific deck by ID, ensuring it belongs to the user.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID

        Returns:
            Deck dictionary if found and owned by user, None otherwise

        Raises:
            Exception: If fetching deck fails
        """
        try:
            response = self.admin_client.table("decks") \
                .select("*") \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .single() \
                .execute()

            return response.data

        except Exception as e:
            # single() throws if not found, which is expected
            if "not found" in str(e).lower() or "0 rows" in str(e).lower():
                return None
            raise Exception(f"Failed to fetch deck: {str(e)}")

    async def update_deck(
        self,
        deck_id: str,
        user_id: str,
        name: Optional[str] = None,
        description: Optional[str] = None,
    ) -> Optional[Dict[str, Any]]:
        """
        Update a deck's name and/or description.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID (for ownership verification)
            name: New deck name (optional)
            description: New deck description (optional)

        Returns:
            Updated deck dictionary if successful, None if not found

        Raises:
            Exception: If update fails
        """
        try:
            # Build update data
            update_data = {}
            if name is not None:
                update_data["name"] = name
            if description is not None:
                update_data["description"] = description

            if not update_data:
                # Nothing to update, just return existing deck
                return await self.get_deck_by_id(deck_id, user_id)

            response = self.admin_client.table("decks") \
                .update(update_data) \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .execute()

            if not response.data:
                return None

            return response.data[0]

        except Exception as e:
            raise Exception(f"Failed to update deck: {str(e)}")

    async def delete_deck(self, deck_id: str, user_id: str) -> bool:
        """
        Delete a deck and all associated flashcards (via cascade).

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID (for ownership verification)

        Returns:
            True if deleted successfully

        Raises:
            Exception: If deletion fails
        """
        try:
            response = self.admin_client.table("decks") \
                .delete() \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .execute()

            # Delete returns the deleted rows
            return len(response.data) > 0 if response.data else False

        except Exception as e:
            raise Exception(f"Failed to delete deck: {str(e)}")


# Singleton instance
deck_service = DeckService()
