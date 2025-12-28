"""
Authentication Service

Handles all authentication operations using Supabase Auth.
This service layer abstracts Supabase auth operations and provides
a clean interface for the API routes.
"""

from typing import Any, Dict, Optional

from supabase import Client

from app.core.supabase import get_supabase_anon_client, get_supabase_client


class AuthService:
    """
    Authentication Service for BrainKit

    Provides methods for user registration, login, logout, password reset,
    and session management using Supabase Auth.
    """

    def __init__(self):
        """Initialize the auth service with Supabase clients"""
        self.admin_client: Client = get_supabase_client()  # Service role (admin)
        self.anon_client: Client = get_supabase_anon_client()  # Anonymous (respects RLS)

    async def register_with_email(
        self,
        email: str,
        password: str,
        display_name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Register a new user with email and password.

        This method:
        1. Creates a new user in Supabase Auth
        2. Sends a confirmation email
        3. Auto-creates a profile via database trigger

        Args:
            email: User's email address
            password: User's password (must meet requirements)
            display_name: Optional display name for the user

        Returns:
            Dict containing:
                - user: User object with id, email, etc.
                - session: Session object with access_token, refresh_token

        Raises:
            Exception: If registration fails (duplicate email, weak password, etc.)
        """
        try:
            # Prepare user metadata
            user_metadata = {}
            if display_name:
                user_metadata["display_name"] = display_name

            # Sign up the user
            response = self.anon_client.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": user_metadata,
                    "email_redirect_to": None,  # Will be set in Supabase dashboard
                }
            })

            if not response.user:
                raise Exception("Failed to create user account")

            return {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "email_confirmed_at": response.user.email_confirmed_at,
                    "created_at": response.user.created_at,
                },
                "session": {
                    "access_token": response.session.access_token if response.session else None,
                    "refresh_token": response.session.refresh_token if response.session else None,
                    "expires_at": response.session.expires_at if response.session else None,
                } if response.session else None,
            }

        except Exception as e:
            # Handle common errors
            error_message = str(e)
            if "already registered" in error_message.lower() or "already exists" in error_message.lower():
                raise Exception("An account with this email already exists")
            elif "password" in error_message.lower():
                raise Exception("Password does not meet requirements")
            else:
                raise Exception(f"Registration failed: {error_message}")

    async def login_with_email(self, email: str, password: str) -> Dict[str, Any]:
        """
        Login a user with email and password.

        Args:
            email: User's email address
            password: User's password

        Returns:
            Dict containing:
                - user: User object with id, email, etc.
                - session: Session object with access_token, refresh_token
                - profile: User's profile data

        Raises:
            Exception: If login fails (invalid credentials, unverified email, etc.)
        """
        try:
            # Sign in the user
            response = self.anon_client.auth.sign_in_with_password({
                "email": email,
                "password": password,
            })

            if not response.user or not response.session:
                raise Exception("Invalid email or password")

            # Fetch user profile
            profile_response = self.admin_client.table("profiles").select("*").eq("id", response.user.id).single().execute()

            return {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "email_confirmed_at": response.user.email_confirmed_at,
                    "created_at": response.user.created_at,
                },
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "expires_at": response.session.expires_at,
                },
                "profile": profile_response.data if profile_response.data else None,
            }

        except Exception as e:
            error_message = str(e)
            if "invalid" in error_message.lower() or "credentials" in error_message.lower():
                raise Exception("Invalid email or password")
            elif "not confirmed" in error_message.lower() or "email" in error_message.lower():
                raise Exception("Please verify your email before logging in")
            else:
                raise Exception(f"Login failed: {error_message}")

    async def login_with_google(self, id_token: str) -> Dict[str, Any]:
        """
        Login a user with Google OAuth.

        Args:
            id_token: Google ID token from OAuth flow

        Returns:
            Dict containing user, session, and profile data

        Raises:
            Exception: If Google login fails
        """
        try:
            # Sign in with Google OAuth
            response = self.anon_client.auth.sign_in_with_id_token({
                "provider": "google",
                "token": id_token,
            })

            if not response.user or not response.session:
                raise Exception("Google login failed")

            # Fetch or create user profile
            profile_response = self.admin_client.table("profiles").select("*").eq("id", response.user.id).single().execute()

            return {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "email_confirmed_at": response.user.email_confirmed_at,
                    "created_at": response.user.created_at,
                },
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "expires_at": response.session.expires_at,
                },
                "profile": profile_response.data if profile_response.data else None,
            }

        except Exception as e:
            raise Exception(f"Google login failed: {str(e)}")

    async def logout(self, access_token: str) -> bool:
        """
        Logout a user by invalidating their session.

        Args:
            access_token: User's current access token

        Returns:
            bool: True if logout was successful

        Raises:
            Exception: If logout fails
        """
        try:
            # Set the session for the client
            self.anon_client.auth.set_session(access_token, access_token)

            # Sign out
            self.anon_client.auth.sign_out()

            return True

        except Exception as e:
            raise Exception(f"Logout failed: {str(e)}")

    async def request_password_reset(self, email: str) -> bool:
        """
        Send a password reset email to the user.

        Args:
            email: User's email address

        Returns:
            bool: True if email was sent successfully

        Raises:
            Exception: If password reset request fails
        """
        try:
            self.anon_client.auth.reset_password_email(email)
            return True

        except Exception:
            # Don't reveal if email exists or not (security best practice)
            # Always return True to prevent email enumeration
            return True

    async def update_password(self, access_token: str, new_password: str) -> bool:
        """
        Update a user's password.

        Args:
            access_token: User's current access token
            new_password: New password to set

        Returns:
            bool: True if password was updated successfully

        Raises:
            Exception: If password update fails
        """
        try:
            # Set the session for the client
            self.anon_client.auth.set_session(access_token, access_token)

            # Update password
            self.anon_client.auth.update_user({
                "password": new_password
            })

            return True

        except Exception as e:
            raise Exception(f"Password update failed: {str(e)}")

    async def get_current_user(self, access_token: str) -> Optional[Dict[str, Any]]:
        """
        Get the current user from their access token.

        Args:
            access_token: User's access token

        Returns:
            Dict containing user and profile data, or None if token is invalid

        Raises:
            Exception: If user retrieval fails
        """
        try:
            # Set the session for the client
            self.anon_client.auth.set_session(access_token, access_token)

            # Get user
            user = self.anon_client.auth.get_user()

            if not user.user:
                return None

            # Fetch profile
            profile_response = self.admin_client.table("profiles").select("*").eq("id", user.user.id).single().execute()

            return {
                "user": {
                    "id": user.user.id,
                    "email": user.user.email,
                    "email_confirmed_at": user.user.email_confirmed_at,
                    "created_at": user.user.created_at,
                },
                "profile": profile_response.data if profile_response.data else None,
            }

        except Exception as e:
            raise Exception(f"Failed to get current user: {str(e)}")

    async def refresh_session(self, refresh_token: str) -> Dict[str, Any]:
        """
        Refresh a user's session using their refresh token.

        Args:
            refresh_token: User's refresh token

        Returns:
            Dict containing new session data

        Raises:
            Exception: If session refresh fails
        """
        try:
            response = self.anon_client.auth.refresh_session(refresh_token)

            if not response.session:
                raise Exception("Failed to refresh session")

            return {
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "expires_at": response.session.expires_at,
                }
            }

        except Exception as e:
            raise Exception(f"Session refresh failed: {str(e)}")


# Singleton instance
auth_service = AuthService()
