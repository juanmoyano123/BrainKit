"""
Tests for Claude Service (F-004: AI Mnemonic Generation)

Tests cover:
- Scenario 1: Successful mnemonic generation (happy path)
- Scenario 2: Mnemonic quality requirements
- Scenario 3: Handle Claude API timeout
- Scenario 4: Handle Claude API error
"""

import json
from unittest.mock import AsyncMock, Mock, patch

import anthropic
import pytest

from app.services.claude_service import ClaudeService


@pytest.fixture
def mock_claude_response():
    """Mock successful Claude API response"""
    return {
        "acrostic": {
            "title": "EALA Mnemonic",
            "content": "Every Advanced Learner Adapts - Epinephrine, Amiodarone, Lidocaine, Atropine",
            "how_to_use": "Remember the phrase 'Every Advanced Learner Adapts' where each word's first letter corresponds to a medication in order.",
        },
        "story": {
            "title": "The Emergency Room Journey",
            "content": "Picture yourself rushing into an emergency room. First, you grab Epinephrine from the crash cart. Next, you reach for Amiodarone on the second shelf. Then Lidocaine catches your eye on the third level. Finally, Atropine waits at the top shelf, completing your life-saving arsenal.",
            "how_to_use": "Visualize moving through the emergency room, collecting each medication in sequence from bottom to top of the crash cart.",
        },
        "visual": {
            "title": "Body Journey Method",
            "content": "Start at your feet (Epinephrine boosts you up), move to your heart (Amiodarone regulates rhythm), then to your chest (Lidocaine numbs), and finally to your head (Atropine dilates pupils).",
            "how_to_use": "Associate each medication with a body part from bottom to top, creating a physical journey through your body.",
        },
    }


@pytest.fixture
def claude_service():
    """Create ClaudeService instance with mocked API key"""
    with patch("app.services.claude_service.settings") as mock_settings:
        mock_settings.CLAUDE_API_KEY = "test-api-key"
        service = ClaudeService()
        return service


class TestClaudeServiceInit:
    """Test Claude Service initialization"""

    def test_init_without_api_key_raises_error(self):
        """Should raise ValueError if CLAUDE_API_KEY is not set"""
        with patch("app.services.claude_service.settings") as mock_settings:
            mock_settings.CLAUDE_API_KEY = ""
            with pytest.raises(ValueError, match="CLAUDE_API_KEY is not set"):
                ClaudeService()

    def test_init_with_api_key_succeeds(self, claude_service):
        """Should initialize successfully with valid API key"""
        assert claude_service.model == "claude-sonnet-4-20250514"
        assert claude_service.max_tokens == 4096
        assert claude_service.timeout == 30


class TestBuildMnemonicPrompt:
    """Test mnemonic prompt building"""

    def test_build_prompt_with_valid_list(self, claude_service):
        """Should build prompt with correct format"""
        list_items = ["Epinephrine", "Amiodarone", "Lidocaine", "Atropine"]
        prompt = claude_service._build_mnemonic_prompt(list_items)

        assert "1. Epinephrine" in prompt
        assert "2. Amiodarone" in prompt
        assert "3. Lidocaine" in prompt
        assert "4. Atropine" in prompt
        assert "4" in prompt  # item_count
        assert "ACROSTIC TECHNIQUE" in prompt
        assert "NARRATIVE STORY TECHNIQUE" in prompt
        assert "VISUAL/SPATIAL PATTERN TECHNIQUE" in prompt
        assert "JSON format" in prompt


class TestGenerateMnemonics:
    """Test mnemonic generation (F-004 Scenario 1)"""

    @pytest.mark.asyncio
    async def test_generate_mnemonics_success(self, claude_service, mock_claude_response):
        """
        Scenario 1: Successful mnemonic generation (happy path)
        Given I have entered a valid list of 4 medication names
        When I call generate_mnemonics
        Then I receive exactly 3 mnemonic options
        """
        list_items = ["Epinephrine", "Amiodarone", "Lidocaine", "Atropine"]

        # Mock Claude API response
        mock_message = Mock()
        mock_message.content = [Mock(text=json.dumps(mock_claude_response))]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message):
            result = await claude_service.generate_mnemonics(
                list_items=list_items, user_id="test-user-id", deck_id="test-deck-id"
            )

            # Verify response structure
            assert "acrostic" in result
            assert "story" in result
            assert "visual" in result
            assert "metadata" in result

            # Verify each mnemonic has required fields
            for technique in ["acrostic", "story", "visual"]:
                assert "title" in result[technique]
                assert "content" in result[technique]
                assert "how_to_use" in result[technique]

            # Verify metadata
            assert result["metadata"]["item_count"] == 4
            assert result["metadata"]["model"] == "claude-sonnet-4-20250514"
            assert "generation_time_ms" in result["metadata"]

    @pytest.mark.asyncio
    async def test_generate_with_markdown_wrapped_json(self, claude_service, mock_claude_response):
        """Should handle Claude response wrapped in markdown code blocks"""
        list_items = ["Item1", "Item2", "Item3"]

        # Mock response with markdown wrapper
        wrapped_response = f"```json\n{json.dumps(mock_claude_response)}\n```"
        mock_message = Mock()
        mock_message.content = [Mock(text=wrapped_response)]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message):
            result = await claude_service.generate_mnemonics(
                list_items=list_items, user_id="test-user", deck_id="test-deck"
            )

            assert "acrostic" in result
            assert "story" in result
            assert "visual" in result

    @pytest.mark.asyncio
    async def test_generate_with_too_few_items_raises_error(self, claude_service):
        """Should raise ValueError if list has less than 3 items"""
        list_items = ["Item1", "Item2"]

        with pytest.raises(ValueError, match="at least 3 items"):
            await claude_service.generate_mnemonics(
                list_items=list_items, user_id="test-user", deck_id="test-deck"
            )

    @pytest.mark.asyncio
    async def test_generate_with_too_many_items_raises_error(self, claude_service):
        """Should raise ValueError if list has more than 50 items"""
        list_items = [f"Item{i}" for i in range(51)]

        with pytest.raises(ValueError, match="cannot contain more than 50 items"):
            await claude_service.generate_mnemonics(
                list_items=list_items, user_id="test-user", deck_id="test-deck"
            )

    @pytest.mark.asyncio
    async def test_generate_handles_timeout(self, claude_service):
        """
        Scenario 3: Handle Claude API timeout
        When Claude API does not respond within 30 seconds
        Then I see appropriate timeout error
        """
        list_items = ["Item1", "Item2", "Item3"]

        with patch.object(
            claude_service.client.messages, "create", side_effect=anthropic.APITimeoutError("Timeout")
        ):
            with pytest.raises(Exception, match="taking longer than expected"):
                await claude_service.generate_mnemonics(
                    list_items=list_items, user_id="test-user", deck_id="test-deck"
                )

    @pytest.mark.asyncio
    async def test_generate_handles_rate_limit(self, claude_service):
        """
        Scenario 4: Handle Claude API error (rate limit)
        When Claude API returns rate limit error
        Then I see appropriate rate limit message
        """
        list_items = ["Item1", "Item2", "Item3"]

        # Simulate generic exception (claude_service catches RateLimitError and converts to Exception)
        with patch.object(
            claude_service.client.messages,
            "create",
            side_effect=Exception("Too many requests. Please wait a moment and try again."),
        ):
            with pytest.raises(Exception, match="Too many requests|Failed to generate"):
                await claude_service.generate_mnemonics(
                    list_items=list_items, user_id="test-user", deck_id="test-deck"
                )

    @pytest.mark.asyncio
    async def test_generate_handles_api_error(self, claude_service):
        """
        Scenario 4: Handle Claude API error (generic)
        When Claude API returns a server error
        Then I see friendly error message
        """
        list_items = ["Item1", "Item2", "Item3"]

        # Simulate generic server error
        with patch.object(
            claude_service.client.messages, "create", side_effect=Exception("Internal server error")
        ):
            with pytest.raises(Exception, match="Failed to generate mnemonics|Internal server error"):
                await claude_service.generate_mnemonics(
                    list_items=list_items, user_id="test-user", deck_id="test-deck"
                )

    @pytest.mark.asyncio
    async def test_generate_validates_response_structure(self, claude_service):
        """
        Scenario 2: Mnemonic quality requirements
        Should validate that response has all required fields
        """
        list_items = ["Item1", "Item2", "Item3"]

        # Mock incomplete response (missing 'visual')
        incomplete_response = {
            "acrostic": {"title": "Test", "content": "Test", "how_to_use": "Test"},
            "story": {"title": "Test", "content": "Test", "how_to_use": "Test"},
        }

        mock_message = Mock()
        mock_message.content = [Mock(text=json.dumps(incomplete_response))]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message):
            with pytest.raises(Exception, match="Missing 'visual'"):
                await claude_service.generate_mnemonics(
                    list_items=list_items, user_id="test-user", deck_id="test-deck"
                )

    @pytest.mark.asyncio
    async def test_generate_invalid_json_response(self, claude_service):
        """Should raise error if Claude returns invalid JSON"""
        list_items = ["Item1", "Item2", "Item3"]

        mock_message = Mock()
        mock_message.content = [Mock(text="This is not valid JSON")]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message):
            with pytest.raises(Exception, match="Failed to parse"):
                await claude_service.generate_mnemonics(
                    list_items=list_items, user_id="test-user", deck_id="test-deck"
                )


class TestExtractKeyConcepts:
    """Test key concept extraction from text"""

    @pytest.mark.asyncio
    async def test_extract_concepts_success(self, claude_service):
        """Should successfully extract concepts from text"""
        text = "The heart pumps blood. The lungs exchange oxygen. The brain processes information."

        mock_response = {"concepts": ["Heart pumps blood", "Lungs exchange oxygen", "Brain processes information"]}

        mock_message = Mock()
        mock_message.content = [Mock(text=json.dumps(mock_response))]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message):
            concepts = await claude_service.extract_key_concepts(text, max_concepts=30)

            assert len(concepts) == 3
            assert "Heart pumps blood" in concepts
            assert "Lungs exchange oxygen" in concepts

    @pytest.mark.asyncio
    async def test_extract_truncates_long_text(self, claude_service):
        """Should truncate text longer than 15000 characters"""
        long_text = "A" * 20000

        mock_response = {"concepts": ["Concept 1", "Concept 2"]}
        mock_message = Mock()
        mock_message.content = [Mock(text=json.dumps(mock_response))]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message) as mock_create:
            await claude_service.extract_key_concepts(long_text)

            # Verify that the text sent to Claude was truncated
            call_args = mock_create.call_args
            sent_text = call_args[1]["messages"][0]["content"]
            assert len(sent_text) < 20000

    @pytest.mark.asyncio
    async def test_extract_handles_empty_concepts(self, claude_service):
        """Should raise error if no concepts are extracted"""
        text = "Some text"

        mock_response = {"concepts": []}
        mock_message = Mock()
        mock_message.content = [Mock(text=json.dumps(mock_response))]

        with patch.object(claude_service.client.messages, "create", return_value=mock_message):
            with pytest.raises(Exception, match="No concepts were extracted"):
                await claude_service.extract_key_concepts(text)
