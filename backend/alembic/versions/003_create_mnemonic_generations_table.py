"""create mnemonic_generations table

Revision ID: 003
Revises: 002
Create Date: 2025-12-29 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '003'
down_revision = '002'
branch_labels = None
depends_on = None


def upgrade() -> None:
    """
    Creates the mnemonic_generations table with Row Level Security policies.
    This table logs all mnemonic generation requests for analytics and quality improvement.
    """

    # Create mnemonic_generations table
    op.execute("""
        CREATE TABLE IF NOT EXISTS mnemonic_generations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          deck_id UUID REFERENCES decks(id) ON DELETE SET NULL,
          input_list TEXT NOT NULL,
          item_count INTEGER NOT NULL CHECK (item_count > 0),
          acrostic_result JSONB,
          story_result JSONB,
          visual_result JSONB,
          selected_type VARCHAR(20) CHECK (selected_type IN ('acrostic', 'story', 'visual')),
          generation_time_ms INTEGER,
          claude_model VARCHAR(50),
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
    """)

    # Create indexes for performance
    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_mnemonic_generations_user_id ON mnemonic_generations(user_id);
    """)

    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_mnemonic_generations_deck_id ON mnemonic_generations(deck_id);
    """)

    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_mnemonic_generations_created_at ON mnemonic_generations(created_at DESC);
    """)

    # Enable Row Level Security
    op.execute("""
        ALTER TABLE mnemonic_generations ENABLE ROW LEVEL SECURITY;
    """)

    # Create RLS policies - Users can view their own generations
    op.execute("""
        CREATE POLICY "Users can view own generations" ON mnemonic_generations
          FOR SELECT
          USING (auth.uid() = user_id);
    """)

    op.execute("""
        CREATE POLICY "Users can insert own generations" ON mnemonic_generations
          FOR INSERT
          WITH CHECK (auth.uid() = user_id);
    """)

    op.execute("""
        CREATE POLICY "Users can update own generations" ON mnemonic_generations
          FOR UPDATE
          USING (auth.uid() = user_id);
    """)


def downgrade() -> None:
    """
    Rollback the mnemonic_generations table and all associated objects.
    """
    op.execute("DROP POLICY IF EXISTS \"Users can update own generations\" ON mnemonic_generations;")
    op.execute("DROP POLICY IF EXISTS \"Users can insert own generations\" ON mnemonic_generations;")
    op.execute("DROP POLICY IF EXISTS \"Users can view own generations\" ON mnemonic_generations;")
    op.execute("DROP INDEX IF EXISTS idx_mnemonic_generations_created_at;")
    op.execute("DROP INDEX IF EXISTS idx_mnemonic_generations_deck_id;")
    op.execute("DROP INDEX IF EXISTS idx_mnemonic_generations_user_id;")
    op.execute("DROP TABLE IF EXISTS mnemonic_generations;")
