"""
Authentication Schemas

Pydantic models for validating authentication requests and responses.
"""

import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class RegisterRequest(BaseModel):
    """
    Request schema for user registration with email/password.

    Validates email format and password strength requirements.
    """
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., min_length=8, max_length=100, description="User's password")
    display_name: Optional[str] = Field(None, max_length=100, description="User's display name")

    @field_validator('password')
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """
        Validate password meets security requirements:
        - At least 8 characters
        - At least 1 number
        - At least 1 uppercase letter
        """
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')

        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least 1 number')

        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least 1 uppercase letter')

        return v

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "email": "sarah@hospital.org",
                "password": "SecurePass123",
                "display_name": "Dr. Sarah"
            }]
        }
    }


class LoginRequest(BaseModel):
    """Request schema for user login with email/password."""
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "email": "sarah@hospital.org",
                "password": "SecurePass123"
            }]
        }
    }


class GoogleLoginRequest(BaseModel):
    """Request schema for Google OAuth login."""
    id_token: str = Field(..., description="Google ID token from OAuth flow")

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
            }]
        }
    }


class ForgotPasswordRequest(BaseModel):
    """Request schema for password reset email."""
    email: EmailStr = Field(..., description="User's email address")

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "email": "sarah@hospital.org"
            }]
        }
    }


class ResetPasswordRequest(BaseModel):
    """Request schema for resetting password with new password."""
    access_token: str = Field(..., description="Access token from reset email link")
    new_password: str = Field(..., min_length=8, max_length=100, description="New password")

    @field_validator('new_password')
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """Validate password meets security requirements."""
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')

        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least 1 number')

        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least 1 uppercase letter')

        return v

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "new_password": "NewSecurePass123"
            }]
        }
    }


class RefreshTokenRequest(BaseModel):
    """Request schema for refreshing session."""
    refresh_token: str = Field(..., description="Refresh token from current session")

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }]
        }
    }


# Response Schemas

class UserResponse(BaseModel):
    """User information in API responses."""
    id: str
    email: str
    email_confirmed_at: Optional[datetime]
    created_at: datetime


class ProfileResponse(BaseModel):
    """User profile information in API responses."""
    id: str
    display_name: Optional[str]
    avatar_url: Optional[str]
    subscription_tier: str
    generation_count_monthly: int
    generation_reset_date: Optional[str]
    created_at: Optional[str]
    updated_at: Optional[str]


class SessionResponse(BaseModel):
    """Session information in API responses."""
    access_token: str
    refresh_token: str
    expires_at: int


class AuthResponse(BaseModel):
    """Complete authentication response."""
    user: UserResponse
    session: Optional[SessionResponse]
    profile: Optional[ProfileResponse]


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
    success: bool = True


class ErrorResponse(BaseModel):
    """Error response schema."""
    detail: str
    success: bool = False
