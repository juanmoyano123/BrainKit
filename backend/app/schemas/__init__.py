"""
Schemas Package

Exports all Pydantic schemas for API request/response validation.
"""

from app.schemas.auth import (
    AuthResponse,
    ErrorResponse,
    ForgotPasswordRequest,
    GoogleLoginRequest,
    LoginRequest,
    MessageResponse,
    ProfileResponse,
    RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest,
    SessionResponse,
    UserResponse,
)
from app.schemas.deck import (
    CreateDeckRequest,
    DeckListResponse,
    DeckResponse,
    DeckSummaryResponse,
    UpdateDeckRequest,
)
from app.schemas.flashcard import (
    CreateFlashcardRequest,
    FlashcardListResponse,
    FlashcardResponse,
    FlashcardSummary,
    GenerateFlashcardsRequest,
    GenerateFlashcardsResponse,
    UpdateFlashcardRequest,
)

__all__ = [
    # Auth
    "RegisterRequest",
    "LoginRequest",
    "GoogleLoginRequest",
    "ForgotPasswordRequest",
    "ResetPasswordRequest",
    "RefreshTokenRequest",
    "UserResponse",
    "ProfileResponse",
    "SessionResponse",
    "AuthResponse",
    "MessageResponse",
    "ErrorResponse",
    # Deck
    "CreateDeckRequest",
    "UpdateDeckRequest",
    "DeckResponse",
    "DeckListResponse",
    "DeckSummaryResponse",
    # Flashcard
    "GenerateFlashcardsRequest",
    "CreateFlashcardRequest",
    "UpdateFlashcardRequest",
    "FlashcardResponse",
    "FlashcardListResponse",
    "FlashcardSummary",
    "GenerateFlashcardsResponse",
]
