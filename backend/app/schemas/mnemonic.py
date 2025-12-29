"""
Mnemonic Schemas

Pydantic models for mnemonic generation API requests and responses.
"""

from typing import Optional

from pydantic import BaseModel, Field, field_validator


class MnemonicTechnique(BaseModel):
    """Schema for a single mnemonic technique"""
    title: str = Field(..., description="Short title for the mnemonic")
    content: str = Field(..., description="The full mnemonic text")
    how_to_use: str = Field(..., description="Brief explanation of how to use this mnemonic")


class GenerateMnemonicsRequest(BaseModel):
    """Request schema for generating mnemonics"""
    list_items: list[str] = Field(
        ...,
        description="List of items to create mnemonics for",
        min_length=3,
        max_length=50
    )
    deck_id: Optional[str] = Field(
        None,
        description="Optional deck ID to associate with this generation"
    )

    @field_validator('list_items')
    @classmethod
    def validate_list_items(cls, v):
        """Validate that list items are not empty"""
        if not v:
            raise ValueError("List must contain at least 3 items")

        # Filter out empty items
        non_empty = [item.strip() for item in v if item and item.strip()]

        if len(non_empty) < 3:
            raise ValueError("List must contain at least 3 non-empty items")

        if len(non_empty) > 50:
            raise ValueError("List cannot contain more than 50 items")

        return non_empty


class MnemonicGenerationMetadata(BaseModel):
    """Metadata about the generation process"""
    generation_time_ms: int = Field(..., description="Time taken to generate in milliseconds")
    item_count: int = Field(..., description="Number of items in the list")
    model: str = Field(..., description="Claude model version used")
    generation_id: Optional[str] = Field(None, description="Database ID of the generation record")


class GenerateMnemonicsResponse(BaseModel):
    """Response schema for generated mnemonics"""
    acrostic: MnemonicTechnique = Field(..., description="Acrostic mnemonic technique")
    story: MnemonicTechnique = Field(..., description="Narrative story mnemonic technique")
    visual: MnemonicTechnique = Field(..., description="Visual/spatial pattern mnemonic technique")
    metadata: MnemonicGenerationMetadata = Field(..., description="Generation metadata")


class SelectMnemonicRequest(BaseModel):
    """Request schema for selecting a mnemonic type"""
    generation_id: str = Field(..., description="ID of the generation to update")
    selected_type: str = Field(
        ...,
        description="Selected mnemonic type: 'acrostic', 'story', or 'visual'"
    )
    deck_id: str = Field(..., description="Deck ID to save the selected mnemonic to")

    @field_validator('selected_type')
    @classmethod
    def validate_selected_type(cls, v):
        """Validate that selected type is valid"""
        if v not in ['acrostic', 'story', 'visual']:
            raise ValueError("selected_type must be 'acrostic', 'story', or 'visual'")
        return v


class SelectMnemonicResponse(BaseModel):
    """Response schema for mnemonic selection"""
    message: str = Field(..., description="Success message")
    success: bool = Field(..., description="Whether the operation succeeded")
    deck: dict = Field(..., description="Updated deck data")
