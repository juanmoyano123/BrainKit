"""create decks table

Revision ID: 002
Revises: 001
Create Date: 2025-12-28 14:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    """
    Creates the decks table with Row Level Security policies.
    """

    # Create decks table
    op.execute("""
        CREATE TABLE IF NOT EXISTS decks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          original_list TEXT,
          selected_mnemonic_type VARCHAR(20) CHECK (selected_mnemonic_type IN ('acrostic', 'story', 'visual')),
          selected_mnemonic_content TEXT,
          card_count INTEGER DEFAULT 0 CHECK (card_count >= 0),
          last_studied_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    """)

    # Create indexes for performance
    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_decks_user_id ON decks(user_id);
    """)

    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_decks_last_studied ON decks(user_id, last_studied_at DESC NULLS LAST);
    """)

    # Enable Row Level Security
    op.execute("""
        ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
    """)

    # Create RLS policies - Users can CRUD their own decks
    op.execute("""
        CREATE POLICY "Users can view own decks" ON decks
          FOR SELECT
          USING (auth.uid() = user_id);
    """)

    op.execute("""
        CREATE POLICY "Users can insert own decks" ON decks
          FOR INSERT
          WITH CHECK (auth.uid() = user_id);
    """)

    op.execute("""
        CREATE POLICY "Users can update own decks" ON decks
          FOR UPDATE
          USING (auth.uid() = user_id);
    """)

    op.execute("""
        CREATE POLICY "Users can delete own decks" ON decks
          FOR DELETE
          USING (auth.uid() = user_id);
    """)

    # Create trigger for updating updated_at (reuse existing function from 001)
    op.execute("""
        CREATE TRIGGER update_decks_updated_at
          BEFORE UPDATE ON decks
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
    """)


def downgrade() -> None:
    """
    Rollback the decks table and all associated objects.
    """
    op.execute("DROP TRIGGER IF EXISTS update_decks_updated_at ON decks;")
    op.execute("DROP POLICY IF EXISTS \"Users can delete own decks\" ON decks;")
    op.execute("DROP POLICY IF EXISTS \"Users can update own decks\" ON decks;")
    op.execute("DROP POLICY IF EXISTS \"Users can insert own decks\" ON decks;")
    op.execute("DROP POLICY IF EXISTS \"Users can view own decks\" ON decks;")
    op.execute("DROP INDEX IF EXISTS idx_decks_last_studied;")
    op.execute("DROP INDEX IF EXISTS idx_decks_user_id;")
    op.execute("DROP TABLE IF EXISTS decks;")
