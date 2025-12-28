"""create profiles table

Revision ID: 001
Revises:
Create Date: 2025-12-28 11:30:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    """
    Creates the profiles table with Row Level Security policies.
    This table extends Supabase auth.users with application-specific data.
    """

    # Create profiles table
    op.execute("""
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          display_name VARCHAR(100),
          avatar_url TEXT,
          subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
          generation_count_monthly INTEGER DEFAULT 0 CHECK (generation_count_monthly >= 0),
          generation_reset_date DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    """)

    # Create indexes
    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON profiles(subscription_tier);
    """)

    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_profiles_generation_reset_date ON profiles(generation_reset_date);
    """)

    # Enable Row Level Security
    op.execute("""
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    """)

    # Create RLS policies
    op.execute("""
        CREATE POLICY "Users can view own profile" ON profiles
          FOR SELECT
          USING (auth.uid() = id);
    """)

    op.execute("""
        CREATE POLICY "Users can update own profile" ON profiles
          FOR UPDATE
          USING (auth.uid() = id);
    """)

    op.execute("""
        CREATE POLICY "Users can insert own profile" ON profiles
          FOR INSERT
          WITH CHECK (auth.uid() = id);
    """)

    # Create trigger function for updating updated_at
    op.execute("""
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    """)

    op.execute("""
        CREATE TRIGGER update_profiles_updated_at
          BEFORE UPDATE ON profiles
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
    """)

    # Create trigger function for auto-creating profile on user signup
    op.execute("""
        CREATE OR REPLACE FUNCTION handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO public.profiles (id, display_name, avatar_url)
          VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
            NEW.raw_user_meta_data->>'avatar_url'
          );
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    """)

    op.execute("""
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW
          EXECUTE FUNCTION handle_new_user();
    """)


def downgrade() -> None:
    """
    Rollback the profiles table and all associated objects.
    """
    op.execute("""
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    """)

    op.execute("""
        DROP FUNCTION IF EXISTS handle_new_user();
    """)

    op.execute("""
        DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
    """)

    op.execute("""
        DROP FUNCTION IF EXISTS update_updated_at_column();
    """)

    op.execute("""
        DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
    """)

    op.execute("""
        DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    """)

    op.execute("""
        DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
    """)

    op.execute("""
        DROP TABLE IF EXISTS profiles;
    """)
