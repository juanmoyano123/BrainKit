"""
Study Session Schemas

Pydantic models for study session and SRS-related API requests/responses.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class StartSessionResponse(BaseModel):
    """Response when starting a study session"""
    session_id: Optional[str]
    deck_id: str
    cards_due_count: int
    due_cards: List[dict]  # List of flashcard dictionaries


class ReviewCardRequest(BaseModel):
    """Request to review a flashcard"""
    flashcard_id: str = Field(..., description="UUID of the flashcard being reviewed")
    quality: int = Field(..., ge=1, le=5, description="Rating quality: 1 (Hard), 3 (Good), or 5 (Easy)")
    session_id: Optional[str] = Field(None, description="Optional study session UUID")
    response_time_ms: Optional[int] = Field(None, ge=0, description="Time taken to answer in milliseconds")

    class Config:
        json_schema_extra = {
            "example": {
                "flashcard_id": "123e4567-e89b-12d3-a456-426614174000",
                "quality": 3,
                "session_id": "123e4567-e89b-12d3-a456-426614174001",
                "response_time_ms": 3500
            }
        }


class ReviewCardResponse(BaseModel):
    """Response after reviewing a flashcard"""
    flashcard: dict  # Updated flashcard with new SRS data
    next_review_date: str
    interval_days: int
    ease_factor: float


class CompleteSessionRequest(BaseModel):
    """Request to complete a study session"""
    session_id: str = Field(..., description="UUID of the study session")
    duration_seconds: Optional[int] = Field(None, ge=0, description="Total session duration in seconds")

    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "123e4567-e89b-12d3-a456-426614174001",
                "duration_seconds": 360
            }
        }


class SessionSummary(BaseModel):
    """Study session summary statistics"""
    session_id: str
    deck_id: str
    cards_reviewed: int
    duration_seconds: Optional[int]
    cards_remaining: int
    started_at: datetime
    completed_at: Optional[datetime]


class CompleteSessionResponse(BaseModel):
    """Response when completing a study session"""
    summary: SessionSummary
    message: str = "Session completed successfully"


class DueCardsResponse(BaseModel):
    """Response for getting due cards"""
    deck_id: str
    due_cards_count: int
    due_cards: List[dict]
