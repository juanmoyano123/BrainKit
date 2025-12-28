"""
Schemas Package

Exports all Pydantic schemas for API request/response validation.
"""

from app.schemas.auth import (
    AuthResponse,
    ErrorResponse,
    ForgotPasswordRequest,
    GoogleLoginRequest,
    LoginRequest,
    MessageResponse,
    ProfileResponse,
    RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest,
    SessionResponse,
    UserResponse,
)

__all__ = [
    "RegisterRequest",
    "LoginRequest",
    "GoogleLoginRequest",
    "ForgotPasswordRequest",
    "ResetPasswordRequest",
    "RefreshTokenRequest",
    "UserResponse",
    "ProfileResponse",
    "SessionResponse",
    "AuthResponse",
    "MessageResponse",
    "ErrorResponse",
]
