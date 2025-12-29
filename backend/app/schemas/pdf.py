"""
PDF Processing Schemas

Pydantic models for PDF upload and processing API requests and responses.
"""

from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.mnemonic import MnemonicTechnique, MnemonicGenerationMetadata


class PDFUploadResponse(BaseModel):
    """Response schema for PDF upload and concept extraction"""
    extracted_concepts: list[str] = Field(
        ...,
        description="List of key concepts extracted from the PDF"
    )
    concept_count: int = Field(
        ...,
        description="Number of concepts extracted"
    )
    mnemonics: dict = Field(
        ...,
        description="Generated mnemonic techniques (acrostic, story, visual)"
    )
    metadata: MnemonicGenerationMetadata = Field(
        ...,
        description="Generation metadata"
    )


class PDFProcessingError(BaseModel):
    """Error response for PDF processing failures"""
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")


class GenerateFromPDFRequest(BaseModel):
    """Request schema for generating flashcards from PDF-extracted concepts"""
    generation_id: str = Field(
        ...,
        description="ID of the mnemonic generation to use"
    )
    selected_type: str = Field(
        ...,
        description="Selected mnemonic type: 'acrostic', 'story', or 'visual'"
    )
    deck_id: str = Field(
        ...,
        description="Deck ID to save flashcards to"
    )
