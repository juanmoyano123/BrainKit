"""
Flashcard Schemas

Pydantic models for validating flashcard requests and responses.
"""

from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class GenerateFlashcardsRequest(BaseModel):
    """
    Request schema for generating flashcards from a deck's mnemonic.
    """
    deck_id: str = Field(..., description="UUID of the deck to generate flashcards for")

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "deck_id": "123e4567-e89b-12d3-a456-426614174000"
            }]
        }
    }


class CreateFlashcardRequest(BaseModel):
    """
    Request schema for manually creating a flashcard.
    """
    deck_id: str = Field(..., description="UUID of the deck")
    front: str = Field(..., min_length=1, max_length=2000, description="Question text")
    back: str = Field(..., min_length=1, max_length=2000, description="Answer text")
    difficulty: Optional[str] = Field("medium", description="Card difficulty")

    @field_validator('front', 'back')
    @classmethod
    def validate_not_empty(cls, v: str) -> str:
        """Ensure text is not just whitespace"""
        if not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

    @field_validator('difficulty')
    @classmethod
    def validate_difficulty(cls, v: Optional[str]) -> str:
        """Ensure difficulty is valid"""
        allowed = ['easy', 'medium', 'hard']
        if v and v not in allowed:
            raise ValueError(f'Difficulty must be one of: {", ".join(allowed)}')
        return v or 'medium'

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "deck_id": "123e4567-e89b-12d3-a456-426614174000",
                "front": "What is the first medication in ACLS?",
                "back": "Epinephrine - it's the 'E' in the EALA mnemonic",
                "difficulty": "medium"
            }]
        }
    }


class UpdateFlashcardRequest(BaseModel):
    """
    Request schema for updating a flashcard.
    """
    front: Optional[str] = Field(None, min_length=1, max_length=2000, description="Question text")
    back: Optional[str] = Field(None, min_length=1, max_length=2000, description="Answer text")
    difficulty: Optional[str] = Field(None, description="Card difficulty")

    @field_validator('front', 'back')
    @classmethod
    def validate_not_empty(cls, v: Optional[str]) -> Optional[str]:
        """Ensure text is not just whitespace if provided"""
        if v is not None and not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip() if v else v

    @field_validator('difficulty')
    @classmethod
    def validate_difficulty(cls, v: Optional[str]) -> Optional[str]:
        """Ensure difficulty is valid if provided"""
        if v:
            allowed = ['easy', 'medium', 'hard']
            if v not in allowed:
                raise ValueError(f'Difficulty must be one of: {", ".join(allowed)}')
        return v

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "front": "What is the first medication in ACLS protocol?",
                "back": "Epinephrine (1 mg IV/IO every 3-5 min)"
            }]
        }
    }


class FlashcardResponse(BaseModel):
    """
    Response schema for a single flashcard.
    """
    id: str
    deck_id: str
    front: str
    back: str
    difficulty: str

    # SRS fields
    ease_factor: float
    interval_days: int
    repetitions: int
    next_review_date: Optional[date]
    last_reviewed_at: Optional[datetime]

    # Metadata
    is_edited: bool
    created_at: datetime
    updated_at: datetime


class FlashcardListResponse(BaseModel):
    """
    Response schema for list of flashcards.
    """
    flashcards: List[FlashcardResponse]
    total: int


class FlashcardSummary(BaseModel):
    """
    Lightweight flashcard summary for preview/list views.
    """
    id: str
    front: str
    back: str
    difficulty: str
    is_edited: bool


class GenerateFlashcardsResponse(BaseModel):
    """
    Response schema for flashcard generation.
    """
    flashcards: List[FlashcardResponse]
    total: int
    deck_id: str
    message: str = "Flashcards generated successfully"


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
    success: bool = True
