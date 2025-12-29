"""
Study Session Routes

API endpoints for spaced repetition study sessions (F-007: SRS Study System).
"""

from typing import Optional

from fastapi import APIRouter, Header, HTTPException, status

from app.schemas.study import (
    CompleteSessionRequest,
    CompleteSessionResponse,
    DueCardsResponse,
    ReviewCardRequest,
    ReviewCardResponse,
    SessionSummary,
    StartSessionResponse,
)
from app.services.auth_service import auth_service
from app.services.srs_service import srs_service

router = APIRouter(prefix="/study")


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
                detail="Invalid or expired token",
            )
        return result["user"]["id"]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
        )


@router.post("/{deck_id}/start", response_model=StartSessionResponse)
async def start_study_session(
    deck_id: str,
    authorization: Optional[str] = Header(None),
):
    """
    Start a new study session for a deck.

    Returns due cards and creates a session record for analytics.
    """
    user_id = await get_current_user_id(authorization)

    try:
        result = await srs_service.start_study_session(
            deck_id=deck_id,
            user_id=user_id
        )

        if result["session"] is None:
            return StartSessionResponse(
                session_id=None,
                deck_id=deck_id,
                cards_due_count=0,
                due_cards=[]
            )

        return StartSessionResponse(
            session_id=result["session"]["id"],
            deck_id=deck_id,
            cards_due_count=result["cards_due_count"],
            due_cards=result["due_cards"]
        )

    except Exception as e:
        if "not found" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(e)
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/{deck_id}/due", response_model=DueCardsResponse)
async def get_due_cards(
    deck_id: str,
    authorization: Optional[str] = Header(None),
):
    """
    Get all due cards for a deck without starting a session.

    Useful for showing "X cards due" on deck overview.
    """
    user_id = await get_current_user_id(authorization)

    try:
        due_cards = await srs_service.get_due_cards(
            deck_id=deck_id,
            user_id=user_id
        )

        return DueCardsResponse(
            deck_id=deck_id,
            due_cards_count=len(due_cards),
            due_cards=due_cards
        )

    except Exception as e:
        if "not found" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(e)
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/review", response_model=ReviewCardResponse)
async def review_flashcard(
    request: ReviewCardRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Review a flashcard and update its SRS data using SM-2 algorithm.

    Quality ratings:
    - 1: Hard (review tomorrow)
    - 3: Good (standard interval)
    - 5: Easy (longer interval)
    """
    user_id = await get_current_user_id(authorization)

    try:
        # Validate quality
        if request.quality not in [1, 3, 5]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Quality must be 1 (Hard), 3 (Good), or 5 (Easy)"
            )

        updated_flashcard = await srs_service.review_card(
            flashcard_id=request.flashcard_id,
            quality=request.quality,
            session_id=request.session_id,
            user_id=user_id,
            response_time_ms=request.response_time_ms
        )

        return ReviewCardResponse(
            flashcard=updated_flashcard,
            next_review_date=updated_flashcard["next_review_date"],
            interval_days=updated_flashcard["interval_days"],
            ease_factor=updated_flashcard["ease_factor"]
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        if "not found" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(e)
            )
        if "access denied" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=str(e)
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/complete", response_model=CompleteSessionResponse)
async def complete_study_session(
    request: CompleteSessionRequest,
    authorization: Optional[str] = Header(None),
):
    """
    Complete a study session and get summary statistics.

    Updates session record with completion time and duration.
    """
    user_id = await get_current_user_id(authorization)

    try:
        result = await srs_service.complete_session(
            session_id=request.session_id,
            user_id=user_id,
            duration_seconds=request.duration_seconds
        )

        session_data = result["session"]

        summary = SessionSummary(
            session_id=session_data["id"],
            deck_id=session_data["deck_id"],
            cards_reviewed=session_data["cards_reviewed"],
            duration_seconds=session_data.get("duration_seconds"),
            cards_remaining=result["cards_remaining"],
            started_at=session_data["started_at"],
            completed_at=session_data.get("completed_at")
        )

        return CompleteSessionResponse(summary=summary)

    except Exception as e:
        if "not found" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(e)
            )
        if "access denied" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=str(e)
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
