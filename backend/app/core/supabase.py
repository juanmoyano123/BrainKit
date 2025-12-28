"""
Supabase Client Configuration

This module initializes and provides the Supabase client for authentication
and database operations. It uses the service role key for backend operations
that require admin privileges.
"""

from functools import lru_cache

from supabase import Client, create_client

from app.core.config import settings


@lru_cache()
def get_supabase_client() -> Client:
    """
    Creates and returns a singleton Supabase client instance.

    Uses the service role key which bypasses Row Level Security (RLS).
    This should only be used in backend operations where admin access is required.

    Returns:
        Client: Configured Supabase client instance

    Raises:
        ValueError: If SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are not configured
    """
    if not settings.SUPABASE_URL:
        raise ValueError("SUPABASE_URL is not configured. Please set it in environment variables.")

    if not settings.SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError("SUPABASE_SERVICE_ROLE_KEY is not configured. Please set it in environment variables.")

    return create_client(
        supabase_url=settings.SUPABASE_URL,
        supabase_key=settings.SUPABASE_SERVICE_ROLE_KEY,
    )


def get_supabase_anon_client() -> Client:
    """
    Creates and returns a Supabase client with anonymous (public) key.

    This client respects Row Level Security (RLS) policies and should be used
    for operations that need to respect user permissions.

    Returns:
        Client: Configured Supabase client with anon key

    Raises:
        ValueError: If SUPABASE_URL or SUPABASE_ANON_KEY are not configured
    """
    if not settings.SUPABASE_URL:
        raise ValueError("SUPABASE_URL is not configured. Please set it in environment variables.")

    if not settings.SUPABASE_ANON_KEY:
        raise ValueError("SUPABASE_ANON_KEY is not configured. Please set it in environment variables.")

    return create_client(
        supabase_url=settings.SUPABASE_URL,
        supabase_key=settings.SUPABASE_ANON_KEY,
    )


# Export singleton instance for convenience
supabase_client = get_supabase_client()
