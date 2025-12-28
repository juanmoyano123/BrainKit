"""
Authentication API Routes

Handles all authentication endpoints for user registration, login, logout,
password reset, and session management.
"""

from typing import Optional

from fastapi import APIRouter, Header, HTTPException, status

from app.schemas.auth import (
    AuthResponse,
    ErrorResponse,
    ForgotPasswordRequest,
    GoogleLoginRequest,
    LoginRequest,
    MessageResponse,
    RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest,
)
from app.services.auth_service import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register with email and password",
    description="""
    Register a new user account with email and password.

    **Requirements:**
    - Email must be valid and not already registered
    - Password must be at least 8 characters with 1 number and 1 uppercase letter
    - Display name is optional

    **Response:**
    - User account is created in pending state
    - Confirmation email is sent within 60 seconds
    - Session tokens are returned (access_token valid for 1h, refresh_token for 7d)

    **Error Codes:**
    - 400: Invalid password format or duplicate email
    - 500: Server error during registration
    """,
    responses={
        201: {"description": "User registered successfully"},
        400: {"model": ErrorResponse, "description": "Invalid input or duplicate email"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def register(request: RegisterRequest):
    """
    Register a new user with email and password.

    Implements Scenario 1: Email/password registration (happy path)
    and Scenario 3: Duplicate email error
    """
    try:
        result = await auth_service.register_with_email(
            email=request.email,
            password=request.password,
            display_name=request.display_name,
        )
        return result

    except Exception as e:
        error_message = str(e)

        # Handle duplicate email (Scenario 3)
        if "already exists" in error_message.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email already exists. Sign in instead.",
            )

        # Handle password validation errors (Scenario 4)
        elif "password" in error_message.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_message,
            )

        # Generic error
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Registration failed: {error_message}",
            )


@router.post(
    "/login",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Login with email and password",
    description="""
    Login with email and password credentials.

    **Requirements:**
    - Email must be registered and verified
    - Password must match the account

    **Response:**
    - Session tokens are returned (access_token valid for 1h, refresh_token for 7d)
    - User and profile data included in response

    **Security:**
    - Rate limiting: 5 failed attempts = 15 minute lockout (handled by Supabase)
    - Session persists for 7 days

    **Error Codes:**
    - 401: Invalid credentials or unverified email
    - 500: Server error during login
    """,
    responses={
        200: {"description": "Login successful"},
        401: {"model": ErrorResponse, "description": "Invalid credentials"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def login(request: LoginRequest):
    """
    Login a user with email and password.

    Implements Scenario 5: Login with valid credentials
    """
    try:
        result = await auth_service.login_with_email(
            email=request.email,
            password=request.password,
        )
        return result

    except Exception as e:
        error_message = str(e)

        if "invalid" in error_message.lower() or "password" in error_message.lower():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        elif "verify" in error_message.lower() or "confirm" in error_message.lower():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Please verify your email before logging in",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Login failed: {error_message}",
            )


@router.post(
    "/login/google",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Login with Google OAuth",
    description="""
    Login or register using Google OAuth.

    **Flow:**
    1. Frontend initiates Google OAuth flow
    2. Google redirects back with ID token
    3. Frontend sends ID token to this endpoint
    4. User is logged in (or registered if new)

    **Response:**
    - Session tokens are returned
    - If new user, profile is auto-created with Google data
    - Google profile name and avatar are imported

    **Error Codes:**
    - 401: Invalid Google token
    - 500: Server error during Google login
    """,
    responses={
        200: {"description": "Google login successful"},
        401: {"model": ErrorResponse, "description": "Invalid Google token"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def login_google(request: GoogleLoginRequest):
    """
    Login or register a user with Google OAuth.

    Implements Scenario 2: Google OAuth registration (happy path)
    """
    try:
        result = await auth_service.login_with_google(id_token=request.id_token)
        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google login failed: {str(e)}",
        )


@router.post(
    "/logout",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Logout current session",
    description="""
    Logout the current user by invalidating their session.

    **Requirements:**
    - Must provide valid access token in Authorization header

    **Response:**
    - Session is invalidated
    - User must login again to access protected routes
    """,
    responses={
        200: {"description": "Logout successful"},
        401: {"model": ErrorResponse, "description": "Invalid or missing token"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def logout(authorization: Optional[str] = Header(None)):
    """Logout a user by invalidating their session."""
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing or invalid authorization header",
            )

        access_token = authorization.replace("Bearer ", "")
        await auth_service.logout(access_token=access_token)

        return MessageResponse(message="Logged out successfully", success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Logout failed: {str(e)}",
        )


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Request password reset email",
    description="""
    Send a password reset email to the user.

    **Security:**
    - Always returns success (even if email doesn't exist) to prevent email enumeration
    - Reset link expires after 1 hour

    **Response:**
    - If email exists, reset email is sent
    - User receives link to reset password page
    """,
    responses={
        200: {"description": "Password reset email sent (or email doesn't exist)"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def forgot_password(request: ForgotPasswordRequest):
    """Send a password reset email."""
    try:
        await auth_service.request_password_reset(email=request.email)
        return MessageResponse(
            message="If an account exists with this email, you will receive a password reset link shortly.",
            success=True,
        )

    except Exception:
        # Always return success for security (don't reveal if email exists)
        return MessageResponse(
            message="If an account exists with this email, you will receive a password reset link shortly.",
            success=True,
        )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Reset password with new password",
    description="""
    Reset user password using access token from reset email.

    **Requirements:**
    - Valid access token from password reset email
    - New password must meet strength requirements (8+ chars, 1 number, 1 uppercase)

    **Response:**
    - Password is updated
    - User can login with new password
    """,
    responses={
        200: {"description": "Password reset successful"},
        400: {"model": ErrorResponse, "description": "Invalid password format"},
        401: {"model": ErrorResponse, "description": "Invalid or expired token"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def reset_password(request: ResetPasswordRequest):
    """Reset user password with new password."""
    try:
        await auth_service.update_password(
            access_token=request.access_token,
            new_password=request.new_password,
        )

        return MessageResponse(message="Password reset successful. You can now login with your new password.", success=True)

    except Exception as e:
        error_message = str(e)

        if "password" in error_message.lower() and "requirements" in error_message.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_message,
            )
        elif "token" in error_message.lower() or "expired" in error_message.lower():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired reset token. Please request a new password reset.",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Password reset failed: {error_message}",
            )


@router.get(
    "/me",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current user",
    description="""
    Get the currently authenticated user's information.

    **Requirements:**
    - Must provide valid access token in Authorization header

    **Response:**
    - User data
    - Profile data
    - No session tokens (use /refresh for new tokens)
    """,
    responses={
        200: {"description": "User data retrieved successfully"},
        401: {"model": ErrorResponse, "description": "Invalid or missing token"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def get_me(authorization: Optional[str] = Header(None)):
    """Get the current authenticated user."""
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing or invalid authorization header",
            )

        access_token = authorization.replace("Bearer ", "")
        result = await auth_service.get_current_user(access_token=access_token)

        if not result:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired access token",
            )

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get user: {str(e)}",
        )


@router.post(
    "/refresh",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh session tokens",
    description="""
    Refresh the user's session using a refresh token.

    **Requirements:**
    - Must provide valid refresh token

    **Response:**
    - New access token (valid for 1h)
    - New refresh token (valid for 7d)
    - User and profile data
    """,
    responses={
        200: {"description": "Session refreshed successfully"},
        401: {"model": ErrorResponse, "description": "Invalid or expired refresh token"},
        500: {"model": ErrorResponse, "description": "Internal server error"},
    },
)
async def refresh_session(request: RefreshTokenRequest):
    """Refresh a user's session tokens."""
    try:
        result = await auth_service.refresh_session(refresh_token=request.refresh_token)
        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Session refresh failed: {str(e)}",
        )
