"""
SRS Service

Handles Spaced Repetition System logic using the SM-2 algorithm.
This service manages study sessions, card reviews, and scheduling.
"""

from datetime import date, datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple
from uuid import UUID

from supabase import Client

from app.core.supabase import get_supabase_client


class SRSService:
    """
    SRS Service for BrainKit

    Implements the SuperMemo SM-2 algorithm for spaced repetition.
    Provides methods for:
    - Calculating next review intervals
    - Managing study sessions
    - Recording card reviews
    - Fetching due cards
    """

    MIN_EASE_FACTOR = 1.3

    def __init__(self):
        """Initialize the SRS service with Supabase client"""
        self.admin_client: Client = get_supabase_client()

    def calculate_sm2(
        self,
        quality: int,
        repetitions: int,
        ease_factor: float,
        interval: int
    ) -> Tuple[int, float, int]:
        """
        SuperMemo SM-2 algorithm implementation.

        Args:
            quality: Rating quality (1=Hard, 3=Good, 5=Easy)
            repetitions: Number of successful reviews
            ease_factor: Current ease factor (default 2.5)
            interval: Current interval in days

        Returns:
            Tuple of (new_interval, new_ease_factor, new_repetitions)

        Raises:
            ValueError: If quality is not 1, 3, or 5
        """
        if quality not in [1, 3, 5]:
            raise ValueError("Quality must be 1 (Hard), 3 (Good), or 5 (Easy)")

        # Quality < 3 means failure - reset repetitions
        if quality < 3:
            new_repetitions = 0
            new_interval = 1  # Review tomorrow
        else:
            new_repetitions = repetitions + 1

            if new_repetitions == 1:
                new_interval = 1
            elif new_repetitions == 2:
                new_interval = 6
            else:
                new_interval = int(interval * ease_factor)

        # Update ease factor based on quality
        new_ease = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        new_ease = max(self.MIN_EASE_FACTOR, new_ease)

        return new_interval, new_ease, new_repetitions

    async def get_due_cards(
        self,
        deck_id: str,
        user_id: str,
    ) -> List[Dict[str, Any]]:
        """
        Get flashcards that are due for review.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID (for ownership verification)

        Returns:
            List of due flashcard dictionaries

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

            # Fetch due cards (next_review_date <= today)
            today = date.today()
            response = self.admin_client.table("flashcards") \
                .select("*") \
                .eq("deck_id", deck_id) \
                .lte("next_review_date", today.isoformat()) \
                .order("next_review_date", desc=False) \
                .execute()

            return response.data if response.data else []

        except Exception as e:
            if "not found" in str(e).lower():
                raise Exception("Deck not found")
            raise Exception(f"Failed to fetch due cards: {str(e)}")

    async def start_study_session(
        self,
        deck_id: str,
        user_id: str,
    ) -> Dict[str, Any]:
        """
        Start a new study session.

        Args:
            deck_id: The deck's UUID
            user_id: The user's UUID

        Returns:
            Dictionary with session data and due cards

        Raises:
            Exception: If session creation fails
        """
        try:
            # Get due cards
            due_cards = await self.get_due_cards(deck_id, user_id)

            if not due_cards:
                return {
                    "session": None,
                    "due_cards": [],
                    "cards_due_count": 0,
                }

            # Create session
            response = self.admin_client.table("study_sessions") \
                .insert({
                    "user_id": user_id,
                    "deck_id": deck_id,
                    "cards_reviewed": 0,
                    "started_at": datetime.utcnow().isoformat(),
                }) \
                .execute()

            if not response.data:
                raise Exception("Failed to create study session")

            session = response.data[0]

            return {
                "session": session,
                "due_cards": due_cards,
                "cards_due_count": len(due_cards),
            }

        except Exception as e:
            raise Exception(f"Failed to start study session: {str(e)}")

    async def review_card(
        self,
        flashcard_id: str,
        quality: int,
        session_id: Optional[str],
        user_id: str,
        response_time_ms: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        Review a flashcard and update its SRS data.

        Args:
            flashcard_id: The flashcard's UUID
            quality: Rating quality (1=Hard, 3=Good, 5=Easy)
            session_id: Optional study session UUID
            user_id: The user's UUID
            response_time_ms: Optional response time in milliseconds

        Returns:
            Updated flashcard dictionary with new SRS data

        Raises:
            Exception: If review fails
        """
        try:
            # Validate quality
            if quality not in [1, 3, 5]:
                raise ValueError("Quality must be 1 (Hard), 3 (Good), or 5 (Easy)")

            # Get flashcard with deck to verify ownership
            flashcard_response = self.admin_client.table("flashcards") \
                .select("*, decks!inner(user_id)") \
                .eq("id", flashcard_id) \
                .single() \
                .execute()

            if not flashcard_response.data:
                raise Exception("Flashcard not found")

            flashcard = flashcard_response.data

            # Verify ownership
            if flashcard["decks"]["user_id"] != user_id:
                raise Exception("Access denied")

            # Get current SRS values
            current_repetitions = flashcard.get("repetitions", 0)
            current_ease_factor = flashcard.get("ease_factor", 2.5)
            current_interval = flashcard.get("interval_days", 0)

            # Calculate new SRS values using SM-2
            new_interval, new_ease_factor, new_repetitions = self.calculate_sm2(
                quality=quality,
                repetitions=current_repetitions,
                ease_factor=current_ease_factor,
                interval=current_interval
            )

            # Calculate next review date
            next_review_date = date.today() + timedelta(days=new_interval)

            # Update flashcard
            update_response = self.admin_client.table("flashcards") \
                .update({
                    "ease_factor": new_ease_factor,
                    "interval_days": new_interval,
                    "repetitions": new_repetitions,
                    "next_review_date": next_review_date.isoformat(),
                    "last_reviewed_at": datetime.utcnow().isoformat(),
                }) \
                .eq("id", flashcard_id) \
                .execute()

            if not update_response.data:
                raise Exception("Failed to update flashcard")

            updated_flashcard = update_response.data[0]

            # Record the review
            self.admin_client.table("card_reviews") \
                .insert({
                    "session_id": session_id,
                    "flashcard_id": flashcard_id,
                    "user_id": user_id,
                    "quality": quality,
                    "response_time_ms": response_time_ms,
                    "previous_interval": current_interval,
                    "new_interval": new_interval,
                    "previous_ease_factor": current_ease_factor,
                    "new_ease_factor": new_ease_factor,
                }) \
                .execute()

            # Update session if provided
            if session_id:
                # Increment cards_reviewed count
                session_response = self.admin_client.table("study_sessions") \
                    .select("cards_reviewed") \
                    .eq("id", session_id) \
                    .single() \
                    .execute()

                if session_response.data:
                    current_count = session_response.data.get("cards_reviewed", 0)
                    self.admin_client.table("study_sessions") \
                        .update({"cards_reviewed": current_count + 1}) \
                        .eq("id", session_id) \
                        .execute()

            return updated_flashcard

        except ValueError as e:
            raise Exception(f"Invalid input: {str(e)}")
        except Exception as e:
            raise Exception(f"Failed to review card: {str(e)}")

    async def complete_session(
        self,
        session_id: str,
        user_id: str,
        duration_seconds: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        Complete a study session.

        Args:
            session_id: The session's UUID
            user_id: The user's UUID (for ownership verification)
            duration_seconds: Optional session duration

        Returns:
            Completed session dictionary with statistics

        Raises:
            Exception: If completion fails
        """
        try:
            # Verify session ownership
            session = self.admin_client.table("study_sessions") \
                .select("*") \
                .eq("id", session_id) \
                .eq("user_id", user_id) \
                .single() \
                .execute()

            if not session.data:
                raise Exception("Session not found or access denied")

            # Update session
            update_response = self.admin_client.table("study_sessions") \
                .update({
                    "completed_at": datetime.utcnow().isoformat(),
                    "duration_seconds": duration_seconds,
                }) \
                .eq("id", session_id) \
                .execute()

            if not update_response.data:
                raise Exception("Failed to update session")

            completed_session = update_response.data[0]

            # Update deck's last_studied_at
            self.admin_client.table("decks") \
                .update({"last_studied_at": datetime.utcnow().isoformat()}) \
                .eq("id", completed_session["deck_id"]) \
                .execute()

            # Get next review info
            deck_id = completed_session["deck_id"]
            due_cards = await self.get_due_cards(deck_id, user_id)

            return {
                "session": completed_session,
                "cards_remaining": len(due_cards),
            }

        except Exception as e:
            raise Exception(f"Failed to complete session: {str(e)}")


# Singleton instance
srs_service = SRSService()
