"""
Flashcard API Routes

Handles all flashcard operations including AI generation and CRUD.
"""

from typing import Optional

from fastapi import APIRouter, Header, HTTPException, status

from app.schemas.flashcard import (
    CreateFlashcardRequest,
    FlashcardListResponse,
    FlashcardResponse,
    GenerateFlashcardsRequest,
    GenerateFlashcardsResponse,
    MessageResponse,
    UpdateFlashcardRequest,
)
from app.services.auth_service import auth_service
from app.services.flashcard_service import flashcard_service

router = APIRouter(prefix="/flashcards", tags=["Flashcards"])


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
    response_model=GenerateFlashcardsResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate flashcards using AI",
    description="""
    Generate flashcards for a deck using Claude AI.

    **Requirements:**
    - Must be authenticated
    - Deck must have a list and selected mnemonic
    - Claude API key must be configured

    **Process:**
    - Fetches deck mnemonic information
    - Calls Claude API to generate 15-20 flashcards
    - Saves flashcards to database
    - Updates deck card_count

    **Response:**
    - Returns list of generated flashcards

    **Error Codes:**
    - 400: Missing mnemonic or list
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Deck not found
    - 429: Rate limit exceeded
    - 500: Server error or Claude API failure
    - 504: Claude API timeout
    """,
)
async def generate_flashcards(
    request: GenerateFlashcardsRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Generate flashcards for a deck using Claude AI.

    Implements F-006 Scenario 1: Successful flashcard generation (happy path)
    """
    user_id = await get_current_user_id(authorization)

    try:
        flashcards = await flashcard_service.generate_flashcards(
            deck_id=request.deck_id,
            user_id=user_id,
        )

        return {
            "flashcards": flashcards,
            "total": len(flashcards),
            "deck_id": request.deck_id,
            "message": "Flashcards generated successfully",
        }

    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e).lower()

        # Handle specific error cases
        if "deck not found" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Deck not found",
            )
        elif "must have a list and selected mnemonic" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Deck must have a list and selected mnemonic before generating flashcards",
            )
        elif "claude api key not configured" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="AI service not configured. Please contact support.",
            )
        elif "rate limit" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please try again later.",
            )
        elif "timeout" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="AI service timeout. Please try again.",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Flashcard generation failed: {str(e)}",
            )


@router.get(
    "/deck/{deck_id}",
    response_model=FlashcardListResponse,
    summary="Get all flashcards for a deck",
    description="""
    Get all flashcards for a specific deck.

    **Response:**
    - Returns list of flashcards ordered by creation date
    - Includes total count

    **Error Codes:**
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Deck not found
    - 500: Server error
    """,
)
async def get_deck_flashcards(
    deck_id: str,
    authorization: Optional[str] = Header(None),
):
    """
    Get all flashcards for a deck.

    Implements F-006 Scenario 4: View generated flashcards before studying
    """
    user_id = await get_current_user_id(authorization)

    try:
        flashcards = await flashcard_service.get_flashcards_by_deck(
            deck_id=deck_id,
            user_id=user_id,
        )

        return {
            "flashcards": flashcards,
            "total": len(flashcards),
        }

    except HTTPException:
        raise
    except Exception as e:
        if "deck not found" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Deck not found",
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch flashcards: {str(e)}",
        )


@router.get(
    "/{flashcard_id}",
    response_model=FlashcardResponse,
    summary="Get a specific flashcard",
    description="""
    Get a specific flashcard by ID.

    **Requirements:**
    - Must be authenticated
    - Must own the deck containing the flashcard

    **Error Codes:**
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Flashcard not found
    - 500: Server error
    """,
)
async def get_flashcard(
    flashcard_id: str,
    authorization: Optional[str] = Header(None),
):
    """Get a specific flashcard by ID."""
    user_id = await get_current_user_id(authorization)

    try:
        flashcard = await flashcard_service.get_flashcard_by_id(
            flashcard_id=flashcard_id,
            user_id=user_id,
        )

        if not flashcard:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flashcard not found",
            )

        return flashcard

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch flashcard: {str(e)}",
        )


@router.post(
    "",
    response_model=FlashcardResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a flashcard manually",
    description="""
    Create a new flashcard manually.

    **Requirements:**
    - Must be authenticated
    - Must own the deck
    - Front and back text required (max 2000 chars each)

    **Response:**
    - Returns the created flashcard

    **Error Codes:**
    - 400: Invalid input
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Deck not found
    - 500: Server error
    """,
)
async def create_flashcard(
    request: CreateFlashcardRequest,
    authorization: Optional[str] = Header(None),
):
    """Create a new flashcard manually."""
    user_id = await get_current_user_id(authorization)

    try:
        flashcard = await flashcard_service.create_flashcard(
            deck_id=request.deck_id,
            user_id=user_id,
            front=request.front,
            back=request.back,
            difficulty=request.difficulty,
        )

        return flashcard

    except HTTPException:
        raise
    except Exception as e:
        if "deck not found" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Deck not found",
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create flashcard: {str(e)}",
        )


@router.patch(
    "/{flashcard_id}",
    response_model=FlashcardResponse,
    summary="Update a flashcard",
    description="""
    Update a flashcard's content.

    **Requirements:**
    - Must be authenticated
    - Must own the deck containing the flashcard

    **Notes:**
    - Updates is_edited flag to true
    - At least one field must be provided

    **Error Codes:**
    - 400: Invalid input
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Flashcard not found
    - 500: Server error
    """,
)
async def update_flashcard(
    flashcard_id: str,
    request: UpdateFlashcardRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Update a flashcard's content.

    Implements F-006 Scenario 5: Edit a generated flashcard
    """
    user_id = await get_current_user_id(authorization)

    try:
        flashcard = await flashcard_service.update_flashcard(
            flashcard_id=flashcard_id,
            user_id=user_id,
            front=request.front,
            back=request.back,
            difficulty=request.difficulty,
        )

        if not flashcard:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flashcard not found",
            )

        return flashcard

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update flashcard: {str(e)}",
        )


@router.delete(
    "/{flashcard_id}",
    response_model=MessageResponse,
    summary="Delete a flashcard",
    description="""
    Delete a flashcard permanently.

    **Requirements:**
    - Must be authenticated
    - Must own the deck containing the flashcard

    **Effects:**
    - Flashcard is permanently deleted
    - Deck card_count is updated

    **Error Codes:**
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Flashcard not found
    - 500: Server error
    """,
)
async def delete_flashcard(
    flashcard_id: str,
    authorization: Optional[str] = Header(None),
):
    """Delete a flashcard permanently."""
    user_id = await get_current_user_id(authorization)

    try:
        deleted = await flashcard_service.delete_flashcard(
            flashcard_id=flashcard_id,
            user_id=user_id,
        )

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flashcard not found",
            )

        return MessageResponse(message="Flashcard deleted successfully", success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete flashcard: {str(e)}",
        )
