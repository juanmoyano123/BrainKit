"""
Flashcard Model

This model represents individual flashcards in a deck with SRS (Spaced Repetition System) support.
Each flashcard belongs to a deck and tracks review statistics for the SM-2 algorithm.
"""

from datetime import date
from sqlalchemy import Boolean, Column, Date, DateTime, Integer, Real, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Flashcard(Base):
    """
    Flashcard Model

    Stores individual flashcards with front/back content and SRS metadata.

    Attributes:
        id: UUID primary key
        deck_id: Foreign key to decks table
        front: Question text
        back: Answer text
        difficulty: Card difficulty level ('easy' | 'medium' | 'hard')

        SRS Fields (SM-2 Algorithm):
        ease_factor: Multiplier for interval calculation (starts at 2.5)
        interval_days: Days until next review
        repetitions: Number of successful reviews
        next_review_date: Date when card is due for review
        last_reviewed_at: Timestamp of last review

        Metadata:
        is_edited: Whether the card has been manually edited
        created_at: Timestamp when card was created
        updated_at: Timestamp when card was last updated
    """

    __tablename__ = "flashcards"

    id = Column(UUID(as_uuid=True), primary_key=True)
    deck_id = Column(UUID(as_uuid=True), nullable=False)
    front = Column(Text, nullable=False)
    back = Column(Text, nullable=False)
    difficulty = Column(String(10), default="medium", nullable=False)

    # SRS fields (initialized on first review)
    ease_factor = Column(Real, default=2.5, nullable=False)
    interval_days = Column(Integer, default=0, nullable=False)
    repetitions = Column(Integer, default=0, nullable=False)
    next_review_date = Column(Date, default=date.today, nullable=False)
    last_reviewed_at = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    is_edited = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Flashcard(id={self.id}, deck_id={self.deck_id}, difficulty='{self.difficulty}')>"

    def to_dict(self):
        """Convert flashcard to dictionary for API responses"""
        return {
            "id": str(self.id),
            "deck_id": str(self.deck_id),
            "front": self.front,
            "back": self.back,
            "difficulty": self.difficulty,
            "ease_factor": float(self.ease_factor),
            "interval_days": self.interval_days,
            "repetitions": self.repetitions,
            "next_review_date": self.next_review_date.isoformat() if self.next_review_date else None,
            "last_reviewed_at": self.last_reviewed_at.isoformat() if self.last_reviewed_at else None,
            "is_edited": self.is_edited,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
