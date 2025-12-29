"""
Mnemonic Generation Model

This model represents mnemonic generation records in the BrainKit application.
Each generation logs the AI-generated mnemonics for analytics and quality tracking.
"""

from sqlalchemy import Column, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.core.database import Base


class MnemonicGeneration(Base):
    """
    Mnemonic Generation Model

    Stores logs of all mnemonic generation requests for analytics and improvement.

    Attributes:
        id: UUID primary key
        user_id: Foreign key to auth.users
        deck_id: Optional foreign key to decks
        input_list: The original list text submitted
        item_count: Number of items in the list
        acrostic_result: JSONB containing acrostic mnemonic
        story_result: JSONB containing story mnemonic
        visual_result: JSONB containing visual mnemonic
        selected_type: Which mnemonic type the user selected
        generation_time_ms: Time taken to generate in milliseconds
        claude_model: Claude model version used
        created_at: Timestamp when generation was created
    """

    __tablename__ = "mnemonic_generations"

    id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    deck_id = Column(UUID(as_uuid=True), nullable=True)
    input_list = Column(Text, nullable=False)
    item_count = Column(Integer, nullable=False)
    acrostic_result = Column(JSONB, nullable=True)
    story_result = Column(JSONB, nullable=True)
    visual_result = Column(JSONB, nullable=True)
    selected_type = Column(String(20), nullable=True)
    generation_time_ms = Column(Integer, nullable=True)
    claude_model = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<MnemonicGeneration(id={self.id}, user_id={self.user_id}, item_count={self.item_count})>"

    def to_dict(self):
        """Convert mnemonic generation to dictionary for API responses"""
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "deck_id": str(self.deck_id) if self.deck_id else None,
            "input_list": self.input_list,
            "item_count": self.item_count,
            "acrostic_result": self.acrostic_result,
            "story_result": self.story_result,
            "visual_result": self.visual_result,
            "selected_type": self.selected_type,
            "generation_time_ms": self.generation_time_ms,
            "claude_model": self.claude_model,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
