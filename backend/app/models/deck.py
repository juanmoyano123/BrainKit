"""
Deck Model

This model represents study decks in the BrainKit application.
Each deck belongs to a user and contains flashcards for memorization.
"""

from sqlalchemy import Column, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Deck(Base):
    """
    Deck Model

    Stores user study decks with their associated mnemonic information.

    Attributes:
        id: UUID primary key
        user_id: Foreign key to auth.users
        name: Deck name (max 100 chars)
        description: Optional deck description
        original_list: The pasted list that generated this deck
        selected_mnemonic_type: 'acrostic' | 'story' | 'visual'
        selected_mnemonic_content: The full mnemonic text
        card_count: Number of flashcards in the deck
        last_studied_at: Timestamp of last study session
        created_at: Timestamp when deck was created
        updated_at: Timestamp when deck was last updated
    """

    __tablename__ = "decks"

    id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    original_list = Column(Text, nullable=True)
    selected_mnemonic_type = Column(String(20), nullable=True)
    selected_mnemonic_content = Column(Text, nullable=True)
    card_count = Column(Integer, default=0, nullable=False)
    last_studied_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Deck(id={self.id}, name='{self.name}', user_id={self.user_id})>"

    def to_dict(self):
        """Convert deck to dictionary for API responses"""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "name": self.name,
            "description": self.description,
            "original_list": self.original_list,
            "selected_mnemonic_type": self.selected_mnemonic_type,
            "selected_mnemonic_content": self.selected_mnemonic_content,
            "card_count": self.card_count,
            "last_studied_at": self.last_studied_at.isoformat() if self.last_studied_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
