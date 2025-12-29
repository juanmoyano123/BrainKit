"""
PDF Processing API Routes

Handles PDF upload and content extraction for learning content generation.
"""

from typing import Optional

from fastapi import APIRouter, File, Form, Header, HTTPException, UploadFile, status

from app.schemas.pdf import PDFUploadResponse
from app.services.auth_service import auth_service
from app.services.mnemonic_service import mnemonic_service
from app.services.pdf_service import pdf_service

router = APIRouter(prefix="/pdf", tags=["PDF Processing"])


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
    "/upload-and-generate",
    response_model=PDFUploadResponse,
    status_code=status.HTTP_200_OK,
    summary="Upload PDF and generate learning content",
    description="""
    Upload a PDF file, extract key concepts, and generate mnemonic techniques.

    **Requirements:**
    - Must be authenticated
    - PDF file max size: 10MB
    - PDF max pages: 50
    - Only .pdf files accepted

    **Process:**
    1. Extract text from PDF
    2. Use Claude AI to identify 10-50 key concepts
    3. Generate three mnemonic techniques for the concepts

    **Response:**
    - extracted_concepts: List of key concepts from the PDF
    - concept_count: Number of concepts extracted
    - mnemonics: Three mnemonic techniques (acrostic, story, visual)
    - metadata: Generation metadata including generation_id

    **Error Codes:**
    - 400: Invalid PDF, no text extracted, or too few concepts
    - 401: Not authenticated
    - 413: File too large (>10MB)
    - 415: Unsupported file type (not PDF)
    - 500: Processing error
    - 504: Timeout during processing
    """,
)
async def upload_and_generate(
    file: UploadFile = File(..., description="PDF file to process"),
    deck_id: str = Form(..., description="Deck ID to associate with this generation"),
    authorization: Optional[str] = Header(None),
):
    """
    Upload a PDF file and generate learning content from it.

    Flow:
    1. Validate PDF file
    2. Extract text
    3. Extract key concepts using Claude
    4. Generate mnemonics
    5. Save generation to database
    6. Return concepts + mnemonics for user selection
    """
    user_id = await get_current_user_id(authorization)

    # Validate file type
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only PDF files are supported",
        )

    # Validate content type
    if file.content_type and file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only PDF files are supported",
        )

    try:
        # Read file content
        file_content = await file.read()

        # Check file size (10MB limit)
        file_size_mb = len(file_content) / (1024 * 1024)
        if file_size_mb > 10:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File is too large ({file_size_mb:.1f}MB). Maximum size is 10MB",
            )

        # Process PDF
        result = await pdf_service.process_pdf_for_learning(
            file_content=file_content,
            user_id=user_id,
            deck_id=deck_id,
        )

        # Save to database via mnemonic service (reuses existing flow)
        saved_result = await mnemonic_service.save_generation_from_pdf(
            user_id=user_id,
            deck_id=deck_id,
            concepts=result["extracted_concepts"],
            mnemonics=result["mnemonics"],
            metadata=result["metadata"],
        )

        return PDFUploadResponse(
            extracted_concepts=result["extracted_concepts"],
            concept_count=result["concept_count"],
            mnemonics=result["mnemonics"],
            metadata=saved_result["metadata"],
        )

    except HTTPException:
        raise

    except ValueError as e:
        # PDF processing errors
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    except Exception as e:
        error_msg = str(e)

        # Check if it's a timeout
        if "timeout" in error_msg.lower() or "taking longer" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Processing is taking too long. Please try a smaller PDF.",
            )

        # Check for rate limit
        if "rate limit" in error_msg.lower() or "too many requests" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please wait a moment and try again.",
            )

        # Generic error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process PDF: {error_msg}",
        )


@router.post(
    "/select-and-generate-flashcards",
    status_code=status.HTTP_200_OK,
    summary="Select mnemonic and generate flashcards",
    description="""
    After reviewing extracted concepts and mnemonics, select a mnemonic type
    and generate flashcards.

    This endpoint combines mnemonic selection with flashcard generation
    for a streamlined PDF-to-flashcards flow.

    **Requirements:**
    - Must be authenticated
    - Must have a valid generation_id from PDF upload

    **Error Codes:**
    - 400: Invalid request
    - 401: Not authenticated
    - 404: Generation not found
    - 500: Generation error
    """,
)
async def select_and_generate_flashcards(
    generation_id: str = Form(..., description="Generation ID from PDF upload"),
    selected_type: str = Form(..., description="Selected mnemonic type: acrostic, story, or visual"),
    deck_id: str = Form(..., description="Deck ID to save flashcards to"),
    authorization: Optional[str] = Header(None),
):
    """
    Select a mnemonic type and generate flashcards for PDF-extracted concepts.

    This reuses the existing select_mnemonic and generate_flashcards flow.
    """
    user_id = await get_current_user_id(authorization)

    # Validate selected_type
    if selected_type not in ["acrostic", "story", "visual"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="selected_type must be 'acrostic', 'story', or 'visual'",
        )

    try:
        # Step 1: Select mnemonic (saves to deck)
        deck = await mnemonic_service.select_mnemonic(
            user_id=user_id,
            generation_id=generation_id,
            selected_type=selected_type,
            deck_id=deck_id,
        )

        # Step 2: Generate flashcards
        from app.services.flashcard_service import flashcard_service
        flashcards = await flashcard_service.generate_flashcards(
            deck_id=deck_id,
            user_id=user_id,
        )

        return {
            "message": "Flashcards generated successfully",
            "success": True,
            "deck": deck,
            "flashcards": flashcards,
            "flashcard_count": len(flashcards),
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    except Exception as e:
        error_msg = str(e)

        if "not found" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=error_msg,
            )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate flashcards: {error_msg}",
        )
