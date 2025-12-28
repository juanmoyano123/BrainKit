"""
Profile Model

This model represents user profiles in the BrainKit application.
It extends Supabase's auth.users with application-specific data.
"""

from sqlalchemy import Column, Date, DateTime, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Profile(Base):
    """
    User Profile Model

    Stores additional user information beyond Supabase's auth.users.
    Has a 1:1 relationship with auth.users via the id foreign key.

    Attributes:
        id: UUID primary key, references auth.users(id)
        display_name: User's display name (max 100 chars)
        avatar_url: URL to user's avatar image
        subscription_tier: 'free' or 'premium'
        generation_count_monthly: Number of AI generations used this month
        generation_reset_date: Date when monthly generation count resets
        created_at: Timestamp when profile was created
        updated_at: Timestamp when profile was last updated
    """

    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True)
    display_name = Column(String(100), nullable=True)
    avatar_url = Column(String, nullable=True)
    subscription_tier = Column(String(20), default="free", nullable=False)
    generation_count_monthly = Column(Integer, default=0, nullable=False)
    generation_reset_date = Column(Date, default=func.current_date(), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Profile(id={self.id}, display_name='{self.display_name}', tier='{self.subscription_tier}')>"

    def to_dict(self):
        """Convert profile to dictionary for API responses"""
        return {
            "id": str(self.id),
            "display_name": self.display_name,
            "avatar_url": self.avatar_url,
            "subscription_tier": self.subscription_tier,
            "generation_count_monthly": self.generation_count_monthly,
            "generation_reset_date": self.generation_reset_date.isoformat() if self.generation_reset_date else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
