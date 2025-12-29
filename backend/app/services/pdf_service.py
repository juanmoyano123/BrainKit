"""
PDF Processing Service

Handles PDF text extraction and integration with Claude for concept extraction.
"""

import io
from typing import Any, Dict, List

import pdfplumber

from app.services.claude_service import claude_service


class PDFService:
    """
    PDF Processing Service for BrainKit

    Provides methods for extracting text from PDFs and processing
    them for learning content generation.
    """

    MAX_FILE_SIZE_MB = 10
    MAX_PAGES = 50
    MIN_CONCEPTS = 10
    MAX_CONCEPTS = 50

    def __init__(self):
        """Initialize the PDF service"""
        pass

    async def extract_text_from_pdf(self, file_content: bytes) -> str:
        """
        Extract all text from a PDF file.

        Args:
            file_content: Raw bytes of the PDF file

        Returns:
            Extracted text as a single string

        Raises:
            ValueError: If PDF is invalid or too large
        """
        # Check file size
        file_size_mb = len(file_content) / (1024 * 1024)
        if file_size_mb > self.MAX_FILE_SIZE_MB:
            raise ValueError(f"PDF file is too large. Maximum size is {self.MAX_FILE_SIZE_MB}MB")

        try:
            # Open PDF from bytes
            pdf_file = io.BytesIO(file_content)

            with pdfplumber.open(pdf_file) as pdf:
                # Check page count
                if len(pdf.pages) > self.MAX_PAGES:
                    raise ValueError(f"PDF has too many pages. Maximum is {self.MAX_PAGES} pages")

                # Extract text from all pages
                text_parts = []
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text_parts.append(page_text)

                full_text = "\n\n".join(text_parts)

                if not full_text.strip():
                    raise ValueError("Could not extract any text from the PDF. The file may be scanned or image-based.")

                return full_text

        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f"Failed to process PDF: {str(e)}")

    async def process_pdf_for_learning(
        self,
        file_content: bytes,
        user_id: str,
        deck_id: str,
    ) -> Dict[str, Any]:
        """
        Process a PDF file and generate learning content.

        Flow:
        1. Extract text from PDF
        2. Use Claude to identify key concepts
        3. Generate mnemonics for the concepts
        4. Return concepts + mnemonics for user selection

        Args:
            file_content: Raw bytes of the PDF file
            user_id: User ID for tracking
            deck_id: Deck ID for storing results

        Returns:
            Dict containing:
                - extracted_concepts: List of key concepts from PDF
                - concept_count: Number of concepts extracted
                - mnemonics: Generated mnemonic techniques
                - generation_id: ID for tracking this generation

        Raises:
            ValueError: If PDF processing fails
            Exception: If mnemonic generation fails
        """
        # Step 1: Extract text from PDF
        extracted_text = await self.extract_text_from_pdf(file_content)

        # Step 2: Extract key concepts using Claude
        concepts = await claude_service.extract_key_concepts(
            text=extracted_text,
            max_concepts=self.MAX_CONCEPTS
        )

        # Validate we have enough concepts
        if len(concepts) < 3:
            raise ValueError(
                "Could not extract enough learning content from the PDF. "
                "Please try a PDF with more educational content."
            )

        # Limit concepts to valid range
        if len(concepts) > self.MAX_CONCEPTS:
            concepts = concepts[:self.MAX_CONCEPTS]

        # Step 3: Generate mnemonics for the concepts
        mnemonics_result = await claude_service.generate_mnemonics(
            list_items=concepts,
            user_id=user_id,
            deck_id=deck_id,
        )

        return {
            "extracted_concepts": concepts,
            "concept_count": len(concepts),
            "mnemonics": {
                "acrostic": mnemonics_result["acrostic"],
                "story": mnemonics_result["story"],
                "visual": mnemonics_result["visual"],
            },
            "metadata": mnemonics_result["metadata"],
        }


# Singleton instance
pdf_service = PDFService()
