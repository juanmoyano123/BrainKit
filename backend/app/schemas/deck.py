"""
Deck Schemas

Pydantic models for validating deck requests and responses.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class CreateDeckRequest(BaseModel):
    """
    Request schema for creating a new deck.
    """
    name: str = Field(..., min_length=1, max_length=100, description="Deck name")
    description: Optional[str] = Field(None, max_length=500, description="Optional deck description")

    @field_validator('name')
    @classmethod
    def validate_name_not_empty(cls, v: str) -> str:
        """Ensure name is not just whitespace"""
        if not v.strip():
            raise ValueError('Deck name cannot be empty')
        return v.strip()

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "name": "ACLS Medications",
                "description": "Emergency cardiac drug protocols"
            }]
        }
    }


class UpdateDeckRequest(BaseModel):
    """
    Request schema for updating a deck.
    """
    name: Optional[str] = Field(None, min_length=1, max_length=100, description="Deck name")
    description: Optional[str] = Field(None, max_length=500, description="Deck description")

    @field_validator('name')
    @classmethod
    def validate_name_not_empty(cls, v: Optional[str]) -> Optional[str]:
        """Ensure name is not just whitespace if provided"""
        if v is not None and not v.strip():
            raise ValueError('Deck name cannot be empty')
        return v.strip() if v else v

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "name": "ACLS Emergency Meds",
                "description": "Updated description"
            }]
        }
    }


class DeckResponse(BaseModel):
    """
    Response schema for a single deck.
    """
    id: str
    user_id: str
    name: str
    description: Optional[str]
    original_list: Optional[str]
    selected_mnemonic_type: Optional[str]
    selected_mnemonic_content: Optional[str]
    card_count: int
    last_studied_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime


class DeckListResponse(BaseModel):
    """
    Response schema for list of decks.
    """
    decks: List[DeckResponse]
    total: int


class DeckSummaryResponse(BaseModel):
    """
    Lightweight deck summary for dashboard cards.
    """
    id: str
    name: str
    description: Optional[str]
    card_count: int
    cards_due: int = 0  # Will be computed from flashcards in F-007
    last_studied_at: Optional[datetime]
    created_at: datetime


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
    success: bool = True
