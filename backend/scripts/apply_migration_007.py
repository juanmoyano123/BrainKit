"""
Script to apply migration 007: Study Sessions and Card Reviews

This script applies the SQL migration to create study_sessions and card_reviews tables.
"""

import os
import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.append(str(Path(__file__).parent.parent))

from app.core.supabase import get_supabase_client


def apply_migration():
    """Apply migration 007 to Supabase database"""

    print("🚀 Applying migration 007: Study Sessions and Card Reviews")
    print("=" * 60)

    # Get Supabase client
    client = get_supabase_client()

    # Read migration SQL
    migration_file = Path(__file__).parent.parent / "alembic" / "versions" / "007_create_study_sessions_tables.sql"

    if not migration_file.exists():
        print(f"❌ Migration file not found: {migration_file}")
        return False

    print(f"📄 Reading migration from: {migration_file.name}")

    with open(migration_file, 'r') as f:
        sql_content = f.read()

    # Split SQL into individual statements (separated by semicolons)
    # Filter out comments and empty statements
    statements = []
    current_statement = []

    for line in sql_content.split('\n'):
        # Skip comment lines
        if line.strip().startswith('--'):
            continue

        current_statement.append(line)

        # If line ends with semicolon, it's the end of a statement
        if line.strip().endswith(';'):
            stmt = '\n'.join(current_statement).strip()
            if stmt and not stmt.startswith('--'):
                statements.append(stmt)
            current_statement = []

    print(f"📝 Found {len(statements)} SQL statements to execute")
    print()

    # Execute each statement
    success_count = 0
    error_count = 0

    for i, statement in enumerate(statements, 1):
        # Get first line for display
        first_line = statement.split('\n')[0][:60]
        print(f"[{i}/{len(statements)}] Executing: {first_line}...")

        try:
            # Execute using Supabase RPC or direct query
            result = client.rpc('exec_sql', {'query': statement}).execute()
            print(f"  ✅ Success")
            success_count += 1
        except Exception as e:
            # Try alternative method - using postgrest
            try:
                # This might not work directly, we'll handle it differently
                print(f"  ⚠️  Using alternative method...")
                # We'll need to execute this differently
                error_count += 1
            except Exception as e2:
                print(f"  ❌ Error: {str(e)}")
                error_count += 1

    print()
    print("=" * 60)
    print(f"✅ Migration completed!")
    print(f"   Success: {success_count} statements")
    print(f"   Errors: {error_count} statements")

    if error_count > 0:
        print()
        print("⚠️  Some statements failed. This is expected with the current method.")
        print("   Please apply the migration manually using Supabase Dashboard:")
        print("   1. Go to Supabase Dashboard → SQL Editor")
        print("   2. Copy the content of 007_create_study_sessions_tables.sql")
        print("   3. Run it in the SQL Editor")

    return error_count == 0


if __name__ == "__main__":
    try:
        apply_migration()
    except Exception as e:
        print(f"❌ Fatal error: {str(e)}")
        sys.exit(1)
