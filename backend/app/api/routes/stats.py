"""
Stats API Routes

Endpoints for user statistics and progress tracking.
"""

from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from datetime import datetime, timedelta

from app.services.auth_service import auth_service

router = APIRouter(prefix="/stats", tags=["stats"])


async def get_current_user_id(authorization: Optional[str] = Header(None)) -> str:
    """Extract and validate user ID from Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.replace("Bearer ", "")
    user_id = auth_service.verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return user_id


@router.get("/overview")
async def get_stats_overview(
    user_id: str = Header(alias="authorization", convert_underscores=True)
):
    """
    Get overview statistics for the current user.

    Returns:
        - streak: Current streak in days
        - total_cards_studied: Total number of cards studied
        - retention_rate: Overall retention percentage
        - total_study_time: Total study time in seconds
    """
    # Mock data for now - replace with real queries
    return {
        "streak": 13,
        "total_cards_studied": 2847,
        "retention_rate": 87,
        "total_study_time_seconds": 88320,  # 24h 32m
        "this_month_cards": 312,
        "this_month_study_time_seconds": 29700,  # 8h 15m
    }


@router.get("/activity")
async def get_activity_data(
    year: int = 2026,
    user_id: str = Header(alias="authorization", convert_underscores=True)
):
    """
    Get activity heatmap data for the specified year.

    Returns array of {date: string, count: number} for each day.
    """
    # Mock data for now - replace with real queries
    activity_data = []
    today = datetime.now()

    for i in range(365):
        date = today - timedelta(days=i)
        # Mock count (0-50 cards per day)
        import random
        count = random.randint(0, 50) if random.random() > 0.3 else 0

        activity_data.append({
            "date": date.strftime("%Y-%m-%d"),
            "count": count
        })

    return {"data": activity_data, "year": year}


@router.get("/retention-history")
async def get_retention_history(
    months: int = 6,
    user_id: str = Header(alias="authorization", convert_underscores=True)
):
    """
    Get retention rate history for the last N months.
    """
    # Mock data
    return {
        "data": [
            {"month": "Aug", "retention": 75},
            {"month": "Sep", "retention": 78},
            {"month": "Oct", "retention": 82},
            {"month": "Nov", "retention": 85},
            {"month": "Dec", "retention": 84},
            {"month": "Jan", "retention": 87},
        ]
    }


@router.get("/study-time")
async def get_study_time(
    period: str = "week",  # week, month, year
    user_id: str = Header(alias="authorization", convert_underscores=True)
):
    """
    Get study time breakdown by day.
    """
    # Mock data
    if period == "week":
        return {
            "data": [
                {"day": "Mon", "minutes": 25},
                {"day": "Tue", "minutes": 30},
                {"day": "Wed", "minutes": 18},
                {"day": "Thu", "minutes": 35},
                {"day": "Fri", "minutes": 22},
                {"day": "Sat", "minutes": 28},
                {"day": "Sun", "minutes": 15},
            ],
            "period": "week"
        }

    return {"data": [], "period": period}


@router.get("/deck-performance")
async def get_deck_performance(
    user_id: str = Header(alias="authorization", convert_underscores=True)
):
    """
    Get performance metrics for all user decks.
    """
    # Mock data - replace with real deck queries
    return {
        "decks": [
            {
                "id": "deck-1",
                "name": "Medical Terms",
                "retention": 85,
                "cards_studied_this_week": 45,
                "total_cards": 156,
                "cards_due": 12
            },
            {
                "id": "deck-2",
                "name": "Aviation Vocabulary",
                "retention": 72,
                "cards_studied_this_week": 28,
                "total_cards": 89,
                "cards_due": 5
            },
        ]
    }
