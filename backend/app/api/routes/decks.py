"""
Deck API Routes

Handles all deck CRUD endpoints.
"""

from typing import Optional

from fastapi import APIRouter, Header, HTTPException, status

from app.schemas.deck import (
    CreateDeckRequest,
    DeckListResponse,
    DeckResponse,
    DeckSummaryResponse,
    MessageResponse,
    UpdateDeckRequest,
)
from app.services.auth_service import auth_service
from app.services.deck_service import deck_service

router = APIRouter(prefix="/decks", tags=["Decks"])


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
    "",
    response_model=DeckResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new deck",
    description="""
    Create a new study deck.

    **Requirements:**
    - Must be authenticated
    - Name must be 1-100 characters
    - Description is optional (max 500 characters)

    **Response:**
    - Returns the created deck with all fields
    - Deck is created with 0 card_count

    **Error Codes:**
    - 400: Invalid name (empty or too long)
    - 401: Not authenticated
    - 500: Server error
    """,
)
async def create_deck(
    request: CreateDeckRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Create a new deck.

    Implements Scenario 1: Create new deck (happy path)
    """
    user_id = await get_current_user_id(authorization)

    try:
        deck = await deck_service.create_deck(
            user_id=user_id,
            name=request.name,
            description=request.description,
        )
        return deck
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create deck: {str(e)}",
        )


@router.get(
    "",
    response_model=DeckListResponse,
    summary="Get all decks for current user",
    description="""
    Get all decks for the authenticated user.

    **Response:**
    - Returns list of decks sorted by last_studied_at (most recent first)
    - Includes deck count for pagination info

    **Error Codes:**
    - 401: Not authenticated
    - 500: Server error
    """,
)
async def get_decks(authorization: Optional[str] = Header(None)):
    """
    Get all decks for the current user.

    Implements Scenario 2: View all decks on dashboard
    """
    user_id = await get_current_user_id(authorization)

    try:
        decks = await deck_service.get_decks_by_user(user_id=user_id)
        return {
            "decks": decks,
            "total": len(decks),
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch decks: {str(e)}",
        )


@router.get(
    "/{deck_id}",
    response_model=DeckResponse,
    summary="Get a specific deck",
    description="""
    Get a specific deck by ID.

    **Requirements:**
    - Must be authenticated
    - Must own the deck

    **Error Codes:**
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Deck not found
    - 500: Server error
    """,
)
async def get_deck(
    deck_id: str,
    authorization: Optional[str] = Header(None),
):
    """Get a specific deck by ID."""
    user_id = await get_current_user_id(authorization)

    try:
        deck = await deck_service.get_deck_by_id(deck_id=deck_id, user_id=user_id)

        if not deck:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Deck not found",
            )

        return deck
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch deck: {str(e)}",
        )


@router.patch(
    "/{deck_id}",
    response_model=DeckResponse,
    summary="Update a deck",
    description="""
    Update a deck's name and/or description.

    **Requirements:**
    - Must be authenticated
    - Must own the deck
    - Name must be 1-100 characters if provided

    **Error Codes:**
    - 400: Invalid name
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Deck not found
    - 500: Server error
    """,
)
async def update_deck(
    deck_id: str,
    request: UpdateDeckRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Update a deck's name and/or description.

    Implements Scenario 3: Edit deck name and description
    """
    user_id = await get_current_user_id(authorization)

    try:
        deck = await deck_service.update_deck(
            deck_id=deck_id,
            user_id=user_id,
            name=request.name,
            description=request.description,
        )

        if not deck:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Deck not found",
            )

        return deck
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update deck: {str(e)}",
        )


@router.delete(
    "/{deck_id}",
    response_model=MessageResponse,
    summary="Delete a deck",
    description="""
    Delete a deck and all associated flashcards.

    **Requirements:**
    - Must be authenticated
    - Must own the deck

    **Effects:**
    - Deck is permanently deleted
    - All associated flashcards are deleted (cascade)
    - All associated review history is deleted (cascade)

    **Error Codes:**
    - 401: Not authenticated
    - 403: Not owner of deck
    - 404: Deck not found
    - 500: Server error
    """,
)
async def delete_deck(
    deck_id: str,
    authorization: Optional[str] = Header(None),
):
    """
    Delete a deck and all associated data.

    Implements Scenario 4: Delete deck with confirmation
    """
    user_id = await get_current_user_id(authorization)

    try:
        deleted = await deck_service.delete_deck(deck_id=deck_id, user_id=user_id)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Deck not found",
            )

        return MessageResponse(message="Deck deleted successfully", success=True)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete deck: {str(e)}",
        )
