"""create flashcards table

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
    Creates the flashcards table with Row Level Security policies.
    Includes SRS (Spaced Repetition System) fields for the SM-2 algorithm.
    """

    # Create flashcards table
    op.execute("""
        CREATE TABLE IF NOT EXISTS flashcards (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
          front TEXT NOT NULL,
          back TEXT NOT NULL,
          difficulty VARCHAR(10) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),

          -- SRS fields (SM-2 algorithm)
          ease_factor REAL DEFAULT 2.5 NOT NULL CHECK (ease_factor >= 1.3),
          interval_days INTEGER DEFAULT 0 NOT NULL CHECK (interval_days >= 0),
          repetitions INTEGER DEFAULT 0 NOT NULL CHECK (repetitions >= 0),
          next_review_date DATE DEFAULT CURRENT_DATE NOT NULL,
          last_reviewed_at TIMESTAMPTZ,

          -- Metadata
          is_edited BOOLEAN DEFAULT false NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
        );
    """)

    # Create indexes for performance
    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_flashcards_deck_id ON flashcards(deck_id);
    """)

    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_flashcards_next_review ON flashcards(deck_id, next_review_date);
    """)

    # Enable Row Level Security
    op.execute("""
        ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
    """)

    # Create RLS policy - Users can access flashcards in their own decks
    op.execute("""
        CREATE POLICY "Users can access flashcards in own decks" ON flashcards
          FOR ALL
          USING (deck_id IN (
            SELECT id FROM decks WHERE user_id = auth.uid()
          ));
    """)

    # Create trigger for updating updated_at
    op.execute("""
        CREATE TRIGGER update_flashcards_updated_at
          BEFORE UPDATE ON flashcards
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
    """)


def downgrade() -> None:
    """
    Rollback the flashcards table and all associated objects.
    """
    op.execute("DROP TRIGGER IF EXISTS update_flashcards_updated_at ON flashcards;")
    op.execute("DROP POLICY IF EXISTS \"Users can access flashcards in own decks\" ON flashcards;")
    op.execute("DROP INDEX IF EXISTS idx_flashcards_next_review;")
    op.execute("DROP INDEX IF EXISTS idx_flashcards_deck_id;")
    op.execute("DROP TABLE IF EXISTS flashcards;")
