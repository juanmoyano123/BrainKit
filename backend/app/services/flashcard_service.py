"""
Flashcard Service

Handles all flashcard operations including AI generation using Claude API.
This service manages CRUD operations and integrates with Anthropic's Claude
for intelligent flashcard generation based on mnemonics.
"""

import json
from typing import Any, Dict, List, Optional

from anthropic import Anthropic
from supabase import Client

from app.core.config import settings
from app.core.supabase import get_supabase_client


class FlashcardService:
    """
    Flashcard Service for BrainKit

    Provides methods for:
    - Generating flashcards using Claude AI
    - CRUD operations on flashcards
    - Updating SRS metadata
    """

    def __init__(self):
        """Initialize the flashcard service with Supabase and Claude clients"""
        self.admin_client: Client = get_supabase_client()
        self.claude_client: Optional[Anthropic] = None

        # Initialize Claude client if API key is available
        if settings.CLAUDE_API_KEY:
            self.claude_client = Anthropic(api_key=settings.CLAUDE_API_KEY)

    def _detect_language(self, text: str) -> str:
        """
        Detect the language of the input text.

        Args:
            text: Text to detect language from

        Returns:
            Language code ('es' for Spanish, 'en' for English)
        """
        spanish_indicators = ['el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'y', 'o', 'que', 'en', 'es', 'por', 'para', 'con', 'su', 'al', 'lo', 'como', 'más', 'pero']
        english_indicators = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']

        text_lower = text.lower()
        words = text_lower.split()

        spanish_count = sum(1 for word in words if word in spanish_indicators)
        english_count = sum(1 for word in words if word in english_indicators)

        # Check for Spanish-specific characters
        if any(char in text for char in ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', '¿', '¡']):
            spanish_count += 5

        return 'es' if spanish_count > english_count else 'en'

    async def generate_flashcards(
        self,
        deck_id: str,
        user_id: str,
    ) -> List[Dict[str, Any]]:
        """
        Generate flashcards for a deck using Claude AI.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID (for ownership verification)

        Returns:
            List of generated flashcard dictionaries

        Raises:
            Exception: If generation fails or deck not found
        """
        if not self.claude_client:
            raise Exception("Claude API key not configured")

        try:
            # Fetch the deck to get mnemonic info
            deck_response = self.admin_client.table("decks") \
                .select("*") \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .single() \
                .execute()

            if not deck_response.data:
                raise Exception("Deck not found")

            deck = deck_response.data

            # Validate that deck has mnemonic info
            if not deck.get("original_list") or not deck.get("selected_mnemonic_content"):
                raise Exception("Deck must have a list and selected mnemonic before generating flashcards")

            # Generate flashcards using Claude
            flashcards_data = await self._call_claude_api(
                list_items=deck["original_list"],
                mnemonic_type=deck.get("selected_mnemonic_type", "unknown"),
                mnemonic_content=deck["selected_mnemonic_content"],
            )

            # Insert flashcards into database
            flashcards_to_insert = [
                {
                    "deck_id": deck_id,
                    "front": card["front"],
                    "back": card["back"],
                    "difficulty": card.get("difficulty", "medium"),
                }
                for card in flashcards_data
            ]

            response = self.admin_client.table("flashcards") \
                .insert(flashcards_to_insert) \
                .execute()

            if not response.data:
                raise Exception("Failed to save generated flashcards")

            # Update deck card_count
            await self._update_deck_card_count(deck_id)

            return response.data

        except Exception as e:
            raise Exception(f"Flashcard generation failed: {str(e)}")

    async def _call_claude_api(
        self,
        list_items: str,
        mnemonic_type: str,
        mnemonic_content: str,
    ) -> List[Dict[str, Any]]:
        """
        Call Claude API to generate flashcards.

        Args:
            list_items: The original list to memorize
            mnemonic_type: Type of mnemonic (acrostic, story, visual)
            mnemonic_content: The selected mnemonic content

        Returns:
            List of flashcard dictionaries with front, back, difficulty

        Raises:
            Exception: If Claude API call fails
        """
        # Detect language from list items and mnemonic content
        combined_text = f"{list_items} {mnemonic_content}"
        detected_language = self._detect_language(combined_text)

        # Build language-specific prompt
        if detected_language == 'es':
            prompt = f"""Eres un experto en crear flashcards para memorización profesional.

El usuario necesita memorizar esta lista:
{list_items}

Han elegido esta técnica mnemotécnica para ayudar a recordarla:
Tipo: {mnemonic_type}
Contenido: {mnemonic_content}

Crea 15-20 flashcards de alta calidad para ayudarles a:
1. Memorizar cada elemento individual
2. Recordar el orden/secuencia correcta
3. Recordar la técnica mnemotécnica en sí
4. Hacer asociaciones entre elementos

Tipos de flashcards a incluir:
- Recordatorio directo: "¿Qué es [elemento X]?" o "¿Qué representa [letra/posición]?"
- Secuencia: "¿Qué viene después de [elemento]?" o "¿Cuál es el [N-ésimo] elemento?"
- Recordatorio mnemotécnico: "En el mnemotécnico '[frase]', ¿qué te ayuda a recordar [parte]?"
- Asociación: "¿Qué elemento está asociado con [elemento visual/de la historia]?"
- Inverso: "¿Qué letra/número representa [elemento]?"

Requisitos:
- Las preguntas deben ser claras y sin ambigüedades
- Las respuestas deben ser concisas pero completas
- Incluye el contexto mnemotécnico en las respuestas cuando sea útil
- Varía la dificultad de las preguntas (fácil, medio, difícil)
- Cubre TODOS los elementos de la lista
- Sin preguntas duplicadas
- TODO debe estar en ESPAÑOL

Devuelve solo en formato JSON, sin otro texto:
{{
  "flashcards": [
    {{
      "front": "Texto de la pregunta",
      "back": "Texto de la respuesta",
      "difficulty": "easy|medium|hard"
    }}
  ]
}}"""
        else:  # English
            prompt = f"""You are an expert flashcard creator for professional memorization.

The user needs to memorize this list:
{list_items}

They have chosen this mnemonic technique to help remember it:
Type: {mnemonic_type}
Content: {mnemonic_content}

Create 15-20 high-quality flashcards to help them:
1. Memorize each individual item
2. Remember the correct order/sequence
3. Recall the mnemonic technique itself
4. Make associations between items

Flashcard types to include:
- Direct recall: "What is [item X]?" or "What does [letter/position] represent?"
- Sequence: "What comes after [item]?" or "What is the [Nth] item?"
- Mnemonic recall: "In the mnemonic '[phrase]', what does [part] help you remember?"
- Association: "Which item is associated with [visual/story element]?"
- Reverse: "Which letter/number represents [item]?"

Requirements:
- Questions should be clear and unambiguous
- Answers should be concise but complete
- Include the mnemonic context in answers when helpful
- Vary question difficulty (easy, medium, challenging)
- Cover ALL items from the list
- No duplicate questions

Output in JSON format only, no other text:
{{
  "flashcards": [
    {{
      "front": "Question text",
      "back": "Answer text",
      "difficulty": "easy|medium|hard"
    }}
  ]
}}"""

        try:
            message = self.claude_client.messages.create(
                model="claude-sonnet-4-20250514",  # Same model used in claude_service.py
                max_tokens=4000,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            # Extract JSON from response
            response_text = message.content[0].text

            # Handle markdown code blocks (Claude might wrap JSON in ``` markers)
            if "```json" in response_text:
                json_start = response_text.find("```json") + 7
                json_end = response_text.find("```", json_start)
                response_text = response_text[json_start:json_end].strip()
            elif "```" in response_text:
                json_start = response_text.find("```") + 3
                json_end = response_text.find("```", json_start)
                response_text = response_text[json_start:json_end].strip()

            # Parse JSON response
            result = json.loads(response_text)

            if "flashcards" not in result:
                raise Exception("Invalid response format from Claude API")

            return result["flashcards"]

        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse Claude API response: {str(e)}")
        except Exception as e:
            raise Exception(f"Claude API call failed: {str(e)}")

    async def get_flashcards_by_deck(
        self,
        deck_id: str,
        user_id: str,
    ) -> List[Dict[str, Any]]:
        """
        Get all flashcards for a deck.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID (for ownership verification)

        Returns:
            List of flashcard dictionaries

        Raises:
            Exception: If fetching fails
        """
        try:
            # Verify deck ownership
            deck = self.admin_client.table("decks") \
                .select("id") \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .single() \
                .execute()

            if not deck.data:
                raise Exception("Deck not found or access denied")

            # Fetch flashcards
            response = self.admin_client.table("flashcards") \
                .select("*") \
                .eq("deck_id", deck_id) \
                .order("created_at", desc=False) \
                .execute()

            return response.data if response.data else []

        except Exception as e:
            if "not found" in str(e).lower():
                raise Exception("Deck not found")
            raise Exception(f"Failed to fetch flashcards: {str(e)}")

    async def get_flashcard_by_id(
        self,
        flashcard_id: str,
        user_id: str,
    ) -> Optional[Dict[str, Any]]:
        """
        Get a specific flashcard by ID, ensuring user has access.

        Args:
            flashcard_id: The flashcard's UUID
            user_id: The user's UUID

        Returns:
            Flashcard dictionary if found, None otherwise

        Raises:
            Exception: If fetching fails
        """
        try:
            response = self.admin_client.table("flashcards") \
                .select("*, decks!inner(user_id)") \
                .eq("id", flashcard_id) \
                .single() \
                .execute()

            if not response.data:
                return None

            # Verify ownership through deck
            if response.data["decks"]["user_id"] != user_id:
                return None

            # Remove nested deck info before returning
            flashcard = response.data.copy()
            flashcard.pop("decks", None)
            return flashcard

        except Exception as e:
            if "not found" in str(e).lower() or "0 rows" in str(e).lower():
                return None
            raise Exception(f"Failed to fetch flashcard: {str(e)}")

    async def create_flashcard(
        self,
        deck_id: str,
        user_id: str,
        front: str,
        back: str,
        difficulty: str = "medium",
    ) -> Dict[str, Any]:
        """
        Create a new flashcard manually.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID (for ownership verification)
            front: Question text
            back: Answer text
            difficulty: Card difficulty

        Returns:
            Created flashcard dictionary

        Raises:
            Exception: If creation fails
        """
        try:
            # Verify deck ownership
            deck = self.admin_client.table("decks") \
                .select("id") \
                .eq("id", deck_id) \
                .eq("user_id", user_id) \
                .single() \
                .execute()

            if not deck.data:
                raise Exception("Deck not found or access denied")

            # Create flashcard
            response = self.admin_client.table("flashcards") \
                .insert({
                    "deck_id": deck_id,
                    "front": front,
                    "back": back,
                    "difficulty": difficulty,
                }) \
                .execute()

            if not response.data:
                raise Exception("Failed to create flashcard")

            # Update deck card_count
            await self._update_deck_card_count(deck_id)

            return response.data[0]

        except Exception as e:
            if "not found" in str(e).lower():
                raise Exception("Deck not found")
            raise Exception(f"Flashcard creation failed: {str(e)}")

    async def update_flashcard(
        self,
        flashcard_id: str,
        user_id: str,
        front: Optional[str] = None,
        back: Optional[str] = None,
        difficulty: Optional[str] = None,
    ) -> Optional[Dict[str, Any]]:
        """
        Update a flashcard's content.

        Args:
            flashcard_id: The flashcard's UUID
            user_id: The user's UUID (for ownership verification)
            front: New question text (optional)
            back: New answer text (optional)
            difficulty: New difficulty (optional)

        Returns:
            Updated flashcard dictionary if successful, None if not found

        Raises:
            Exception: If update fails
        """
        try:
            # Build update data
            update_data = {}
            if front is not None:
                update_data["front"] = front
            if back is not None:
                update_data["back"] = back
            if difficulty is not None:
                update_data["difficulty"] = difficulty

            if not update_data:
                # Nothing to update
                return await self.get_flashcard_by_id(flashcard_id, user_id)

            # Mark as edited
            update_data["is_edited"] = True

            # Get flashcard with deck to verify ownership
            flashcard = await self.get_flashcard_by_id(flashcard_id, user_id)
            if not flashcard:
                return None

            # Update flashcard
            response = self.admin_client.table("flashcards") \
                .update(update_data) \
                .eq("id", flashcard_id) \
                .execute()

            if not response.data:
                return None

            return response.data[0]

        except Exception as e:
            raise Exception(f"Failed to update flashcard: {str(e)}")

    async def delete_flashcard(
        self,
        flashcard_id: str,
        user_id: str,
    ) -> bool:
        """
        Delete a flashcard.

        Args:
            flashcard_id: The flashcard's UUID
            user_id: The user's UUID (for ownership verification)

        Returns:
            True if deleted successfully

        Raises:
            Exception: If deletion fails
        """
        try:
            # Get flashcard to verify ownership and get deck_id
            flashcard = await self.get_flashcard_by_id(flashcard_id, user_id)
            if not flashcard:
                return False

            deck_id = flashcard["deck_id"]

            # Delete flashcard
            response = self.admin_client.table("flashcards") \
                .delete() \
                .eq("id", flashcard_id) \
                .execute()

            deleted = len(response.data) > 0 if response.data else False

            if deleted:
                # Update deck card_count
                await self._update_deck_card_count(deck_id)

            return deleted

        except Exception as e:
            raise Exception(f"Failed to delete flashcard: {str(e)}")

    async def _update_deck_card_count(self, deck_id: str) -> None:
        """
        Update the card_count field in the deck.

        Args:
            deck_id: The deck's UUID
        """
        try:
            # Count flashcards
            count_response = self.admin_client.table("flashcards") \
                .select("id", count="exact") \
                .eq("deck_id", deck_id) \
                .execute()

            count = count_response.count if count_response.count is not None else 0

            # Update deck
            self.admin_client.table("decks") \
                .update({"card_count": count}) \
                .eq("id", deck_id) \
                .execute()

        except Exception:
            # Don't fail the main operation if count update fails
            pass


# Singleton instance
flashcard_service = FlashcardService()
