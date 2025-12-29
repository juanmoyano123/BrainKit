"""
Services Package

Exports all service layer modules for the BrainKit application.
"""

from app.services.auth_service import AuthService, auth_service
from app.services.deck_service import DeckService, deck_service
from app.services.flashcard_service import FlashcardService, flashcard_service

__all__ = [
    "AuthService",
    "auth_service",
    "DeckService",
    "deck_service",
    "FlashcardService",
    "flashcard_service",
]
