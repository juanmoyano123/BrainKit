"""
Mnemonic API Routes

Handles all mnemonic generation and selection endpoints.
"""

from typing import Optional

from fastapi import APIRouter, Header, HTTPException, status

from app.schemas.mnemonic import (
    GenerateMnemonicsRequest,
    GenerateMnemonicsResponse,
    SelectMnemonicRequest,
    SelectMnemonicResponse,
)
from app.services.auth_service import auth_service
from app.services.mnemonic_service import mnemonic_service

router = APIRouter(prefix="/mnemonics", tags=["Mnemonics"])


async def get_current_user_id(authorization: Optional[str] = Header(None)) -> str:
    """
    Extract and validate user ID from Authorization header.

    Args:
        authorization: Bearer token from header

    Returns:
        User ID string

    Raises:
        HTTPException: If auth fails
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header",
        )

    access_token = authorization.replace("Bearer ", "")

    try:
        result = await auth_service.get_current_user(access_token=access_token)
        if not result or not result.get("user"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired access token",
            )
        return result["user"]["id"]
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
        )


@router.post(
    "/generate",
    response_model=GenerateMnemonicsResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate mnemonics for a list",
    description="""
    Generate three mnemonic techniques (acrostic, story, visual) for a list of items.

    **Requirements:**
    - Must be authenticated
    - List must contain 3-50 items
    - Free tier: Maximum 3 generations per month
    - Premium tier: Unlimited generations

    **Response:**
    - Returns three mnemonic options with metadata
    - Each mnemonic includes title, content, and usage instructions

    **Error Codes:**
    - 400: Invalid list (too few/many items, empty items)
    - 401: Not authenticated
    - 403: Generation limit reached (free tier)
    - 500: Claude API error or server error
    - 504: Generation timeout (>30 seconds)
    """,
)
async def generate_mnemonics(
    request: GenerateMnemonicsRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Generate three mnemonic techniques for a list.

    Implements Scenario 1: Successful mnemonic generation (happy path)
    Implements Scenario 3: Handle Claude API timeout
    Implements Scenario 4: Handle Claude API error
    """
    user_id = await get_current_user_id(authorization)

    try:
        result = await mnemonic_service.generate_mnemonics(
            user_id=user_id,
            list_items=request.list_items,
            deck_id=request.deck_id,
        )

        return GenerateMnemonicsResponse(
            acrostic=result["acrostic"],
            story=result["story"],
            visual=result["visual"],
            metadata=result["metadata"],
        )

    except ValueError as e:
        # Validation errors (400)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    except Exception as e:
        error_msg = str(e)

        # Check if it's a limit error
        if "limit" in error_msg.lower() or "reached your monthly" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=error_msg,
            )

        # Check if it's a timeout
        if "timeout" in error_msg.lower() or "taking longer than expected" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail=error_msg,
            )

        # Generic server error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate mnemonics: {error_msg}",
        )


@router.post(
    "/select",
    response_model=SelectMnemonicResponse,
    status_code=status.HTTP_200_OK,
    summary="Select a mnemonic type",
    description="""
    Save the user's selected mnemonic type to a deck.

    **Requirements:**
    - Must be authenticated
    - Must own the generation and deck
    - selected_type must be 'acrostic', 'story', or 'visual'

    **Effects:**
    - Updates deck with selected mnemonic content
    - Updates generation record with selection
    - Deck's original_list is set to the generation input

    **Error Codes:**
    - 400: Invalid selected_type
    - 401: Not authenticated
    - 403: Not owner of generation or deck
    - 404: Generation or deck not found
    - 500: Server error
    """,
)
async def select_mnemonic(
    request: SelectMnemonicRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Select and save a mnemonic type to a deck.

    Implements F-005: Mnemonic Selection UI backend
    """
    user_id = await get_current_user_id(authorization)

    try:
        deck = await mnemonic_service.select_mnemonic(
            user_id=user_id,
            generation_id=request.generation_id,
            selected_type=request.selected_type,
            deck_id=request.deck_id,
        )

        return SelectMnemonicResponse(
            message="Mnemonic selected successfully",
            success=True,
            deck=deck,
        )

    except ValueError as e:
        # Validation errors (400)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    except Exception as e:
        error_msg = str(e)

        # Check if it's a not found error
        if "not found" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=error_msg,
            )

        # Generic server error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to select mnemonic: {error_msg}",
        )


@router.get(
    "/check-limit",
    status_code=status.HTTP_200_OK,
    summary="Check generation limit",
    description="""
    Check if the user has remaining generations for the month.

    **Response:**
    - can_generate: bool - Whether user can generate
    - remaining: int - Remaining generations (-1 for unlimited/premium)
    - is_premium: bool - Whether user has premium subscription
    - reset_date: str - When the count resets (ISO format)

    **Error Codes:**
    - 401: Not authenticated
    - 500: Server error
    """,
)
async def check_generation_limit(authorization: Optional[str] = Header(None)):
    """
    Check the user's remaining generation count.

    Used by frontend to show generation limits and upgrade prompts.
    """
    user_id = await get_current_user_id(authorization)

    try:
        result = await mnemonic_service.check_generation_limit(user_id)
        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to check generation limit: {str(e)}",
        )
