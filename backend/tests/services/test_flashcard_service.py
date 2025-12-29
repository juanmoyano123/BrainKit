"""
Simple Tests for Flashcard Service (F-006: AI Flashcard Generation)

Tests the core Claude API integration for flashcard generation.
Tests cover:
- Scenario 1: Generate flashcards using Claude API
- Scenario 2: Handle Claude API errors
- Scenario 3: Parse markdown-wrapped JSON responses
"""

import json
from unittest.mock import Mock, patch

import pytest

from app.services.flashcard_service import FlashcardService


@pytest.fixture
def mock_flashcards_response():
    """Mock Claude API response for flashcard generation"""
    return {
        "flashcards": [
            {
                "front": "What is the first item?",
                "back": "Item1",
                "difficulty": "easy"
            },
            {
                "front": "What comes after Item1?",
                "back": "Item2",
                "difficulty": "medium"
            },
            {
                "front": "What is the third item?",
                "back": "Item3",
                "difficulty": "medium"
            },
        ]
    }


class TestFlashcardGenerationAPI:
    """Test flashcard generation via Claude API (F-006 core functionality)"""

    @pytest.mark.asyncio
    async def test_call_claude_api_success(self, mock_flashcards_response):
        """
        Scenario 1: Generate flashcards using Claude API
        Given I have list items and a mnemonic
        When I call Claude API
        Then I receive flashcards in correct format
        """
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                # Mock Claude API response
                mock_message = Mock()
                mock_message.content = [Mock(text=json.dumps(mock_flashcards_response))]

                with patch.object(service.claude_client.messages, "create", return_value=mock_message):
                    result = await service._call_claude_api(
                        list_items="Item1\nItem2\nItem3",
                        mnemonic_type="acrostic",
                        mnemonic_content="I Take Three"
                    )

                    # Verify response structure
                    assert isinstance(result, list)
                    assert len(result) == 3
                    assert all("front" in card for card in result)
                    assert all("back" in card for card in result)
                    assert all("difficulty" in card for card in result)

    @pytest.mark.asyncio
    async def test_call_claude_api_with_markdown_wrapper(self, mock_flashcards_response):
        """
        Scenario 3: Parse markdown-wrapped JSON
        Given Claude returns JSON wrapped in markdown code blocks
        When I parse the response
        Then I successfully extract the JSON
        """
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                # Mock Claude API with markdown wrapper
                wrapped_json = f"```json\n{json.dumps(mock_flashcards_response)}\n```"
                mock_message = Mock()
                mock_message.content = [Mock(text=wrapped_json)]

                with patch.object(service.claude_client.messages, "create", return_value=mock_message):
                    result = await service._call_claude_api(
                        list_items="Item1\nItem2\nItem3",
                        mnemonic_type="acrostic",
                        mnemonic_content="I Take Three"
                    )

                    assert isinstance(result, list)
                    assert len(result) == 3

    @pytest.mark.asyncio
    async def test_call_claude_api_handles_invalid_json(self):
        """
        Scenario 2: Handle Claude API errors
        Given Claude returns invalid JSON
        When I try to parse it
        Then I get a clear error message
        """
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                # Mock invalid JSON response
                mock_message = Mock()
                mock_message.content = [Mock(text="This is not valid JSON")]

                with patch.object(service.claude_client.messages, "create", return_value=mock_message):
                    with pytest.raises(Exception, match="Failed to parse"):
                        await service._call_claude_api(
                            list_items="Item1\nItem2\nItem3",
                            mnemonic_type="acrostic",
                            mnemonic_content="I Take Three"
                        )

    @pytest.mark.asyncio
    async def test_call_claude_api_handles_missing_flashcards_key(self, mock_flashcards_response):
        """Should raise error if response doesn't have 'flashcards' key"""
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                # Mock response without 'flashcards' key
                invalid_response = {"cards": mock_flashcards_response["flashcards"]}
                mock_message = Mock()
                mock_message.content = [Mock(text=json.dumps(invalid_response))]

                with patch.object(service.claude_client.messages, "create", return_value=mock_message):
                    with pytest.raises(Exception, match="Invalid response format"):
                        await service._call_claude_api(
                            list_items="Item1\nItem2\nItem3",
                            mnemonic_type="acrostic",
                            mnemonic_content="I Take Three"
                        )

    @pytest.mark.asyncio
    async def test_call_claude_api_handles_api_exception(self):
        """Should handle Claude API exceptions gracefully"""
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                # Mock API failure
                with patch.object(
                    service.claude_client.messages,
                    "create",
                    side_effect=Exception("API timeout")
                ):
                    with pytest.raises(Exception, match="Claude API call failed"):
                        await service._call_claude_api(
                            list_items="Item1\nItem2\nItem3",
                            mnemonic_type="acrostic",
                            mnemonic_content="I Take Three"
                        )


class TestFlashcardServiceInit:
    """Test service initialization"""

    def test_init_with_api_key(self):
        """Should initialize with Claude client if API key present"""
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()
                assert service.claude_client is not None


class TestPromptBuilding:
    """Test that prompts include necessary information"""

    @pytest.mark.asyncio
    async def test_claude_api_receives_correct_model(self):
        """Should use claude-sonnet-4-20250514 model"""
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                mock_response = {"flashcards": [{"front": "Q", "back": "A", "difficulty": "easy"}]}
                mock_message = Mock()
                mock_message.content = [Mock(text=json.dumps(mock_response))]

                with patch.object(service.claude_client.messages, "create", return_value=mock_message) as mock_create:
                    await service._call_claude_api(
                        list_items="Item1\nItem2",
                        mnemonic_type="acrostic",
                        mnemonic_content="I Take"
                    )

                    # Verify model parameter
                    assert mock_create.called
                    call_kwargs = mock_create.call_args[1]
                    assert call_kwargs["model"] == "claude-sonnet-4-20250514"
                    assert call_kwargs["max_tokens"] == 4000

    @pytest.mark.asyncio
    async def test_prompt_includes_list_and_mnemonic(self):
        """Should include both list items and mnemonic in prompt"""
        with patch("app.core.supabase.get_supabase_client"):
            with patch("app.core.config.settings") as mock_settings:
                mock_settings.CLAUDE_API_KEY = "test-api-key"
                service = FlashcardService()

                mock_response = {"flashcards": [{"front": "Q", "back": "A", "difficulty": "easy"}]}
                mock_message = Mock()
                mock_message.content = [Mock(text=json.dumps(mock_response))]

                with patch.object(service.claude_client.messages, "create", return_value=mock_message) as mock_create:
                    await service._call_claude_api(
                        list_items="Epinephrine\nAmiodarone",
                        mnemonic_type="acrostic",
                        mnemonic_content="Every Advanced"
                    )

                    # Get the prompt
                    call_kwargs = mock_create.call_args[1]
                    prompt = call_kwargs["messages"][0]["content"]

                    # Verify prompt contains necessary info
                    assert "Epinephrine" in prompt
                    assert "Amiodarone" in prompt
                    assert "Every Advanced" in prompt
                    assert "acrostic" in prompt
                    assert "15-20" in prompt  # Should mention count target
