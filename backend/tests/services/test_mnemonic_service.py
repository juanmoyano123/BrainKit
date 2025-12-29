"""
Tests for Mnemonic Service (F-004: AI Mnemonic Generation Business Logic)

Tests cover:
- Generation limit checking
- Generation count tracking
- Mnemonic generation with database logging
- Mnemonic selection and deck updates
"""

from unittest.mock import AsyncMock, Mock, patch

import pytest

from app.services.mnemonic_service import MnemonicService


@pytest.fixture
def mock_supabase_client():
    """Mock Supabase client"""
    client = Mock()
    client.table = Mock(return_value=client)
    client.select = Mock(return_value=client)
    client.eq = Mock(return_value=client)
    client.single = Mock(return_value=client)
    client.insert = Mock(return_value=client)
    client.update = Mock(return_value=client)
    client.execute = Mock()
    return client


@pytest.fixture
def mnemonic_service(mock_supabase_client):
    """Create MnemonicService with mocked dependencies"""
    with patch("app.services.mnemonic_service.get_supabase_client", return_value=mock_supabase_client):
        service = MnemonicService()
        return service


@pytest.fixture
def mock_generation_result():
    """Mock successful generation result"""
    return {
        "acrostic": {
            "title": "Test Acrostic",
            "content": "Test content",
            "how_to_use": "Test usage",
        },
        "story": {
            "title": "Test Story",
            "content": "Test content",
            "how_to_use": "Test usage",
        },
        "visual": {
            "title": "Test Visual",
            "content": "Test content",
            "how_to_use": "Test usage",
        },
        "metadata": {
            "generation_time_ms": 5000,
            "item_count": 4,
            "model": "claude-sonnet-4-20250514",
            "user_id": "test-user",
            "deck_id": "test-deck",
        },
    }


class TestCheckGenerationLimit:
    """Test generation limit checking"""

    @pytest.mark.asyncio
    async def test_check_limit_premium_user(self, mnemonic_service, mock_supabase_client):
        """Premium users should have unlimited generations"""
        # Mock premium user profile
        mock_response = Mock()
        mock_response.data = {
            "subscription_tier": "premium",
            "generation_count_monthly": 10,
            "generation_reset_date": "2025-02-01",
        }
        mock_supabase_client.execute.return_value = mock_response

        result = await mnemonic_service.check_generation_limit("premium-user-id")

        assert result["can_generate"] is True
        assert result["remaining"] == -1  # Unlimited
        assert result["is_premium"] is True
        assert result["reset_date"] is None

    @pytest.mark.asyncio
    async def test_check_limit_free_user_within_limit(self, mnemonic_service, mock_supabase_client):
        """Free users should have generation count"""
        # Mock free user profile
        mock_response = Mock()
        mock_response.data = {
            "subscription_tier": "free",
            "generation_count_monthly": 1,
            "generation_reset_date": "2025-02-01",
        }
        mock_supabase_client.execute.return_value = mock_response

        result = await mnemonic_service.check_generation_limit("free-user-id")

        assert result["can_generate"] is True
        assert result["is_premium"] is False
        assert result["reset_date"] == "2025-02-01"

    @pytest.mark.asyncio
    async def test_check_limit_user_not_found(self, mnemonic_service, mock_supabase_client):
        """Should raise error if user profile not found"""
        mock_response = Mock()
        mock_response.data = None
        mock_supabase_client.execute.return_value = mock_response

        with pytest.raises(Exception, match="User profile not found"):
            await mnemonic_service.check_generation_limit("nonexistent-user")


class TestIncrementGenerationCount:
    """Test generation count incrementing"""

    @pytest.mark.asyncio
    async def test_increment_count_success(self, mnemonic_service, mock_supabase_client):
        """Should increment user's generation count"""
        # Mock current count retrieval
        mock_select_response = Mock()
        mock_select_response.data = {"generation_count_monthly": 5}

        # Mock update
        mock_update_response = Mock()
        mock_update_response.data = [{"generation_count_monthly": 6}]

        mock_supabase_client.execute.side_effect = [mock_select_response, mock_update_response]

        await mnemonic_service.increment_generation_count("test-user")

        # Verify update was called with incremented count
        update_call = [call for call in mock_supabase_client.update.call_args_list if call]
        assert len(update_call) > 0

    @pytest.mark.asyncio
    async def test_increment_count_user_not_found(self, mnemonic_service, mock_supabase_client):
        """Should raise error if user not found"""
        mock_response = Mock()
        mock_response.data = None
        mock_supabase_client.execute.return_value = mock_response

        with pytest.raises(Exception, match="User profile not found"):
            await mnemonic_service.increment_generation_count("nonexistent-user")


class TestGenerateMnemonics:
    """Test full mnemonic generation flow"""

    @pytest.mark.asyncio
    async def test_generate_success_free_user(
        self, mnemonic_service, mock_supabase_client, mock_generation_result
    ):
        """Should generate mnemonics and save to database for free user"""
        list_items = ["Item1", "Item2", "Item3", "Item4"]

        # Mock limit check (free user, can generate)
        mock_limit_response = Mock()
        mock_limit_response.data = {
            "subscription_tier": "free",
            "generation_count_monthly": 0,
            "generation_reset_date": "2025-02-01",
        }

        # Mock generation save
        mock_save_response = Mock()
        mock_save_response.data = [{"id": "generation-123"}]

        # Mock increment
        mock_increment_select = Mock()
        mock_increment_select.data = {"generation_count_monthly": 0}

        mock_increment_update = Mock()
        mock_increment_update.data = [{"generation_count_monthly": 1}]

        mock_supabase_client.execute.side_effect = [
            mock_limit_response,  # check limit
            mock_save_response,  # save generation
            mock_increment_select,  # get current count
            mock_increment_update,  # increment count
        ]

        # Mock Claude service
        with patch("app.services.mnemonic_service.claude_service") as mock_claude:
            mock_claude.generate_mnemonics = AsyncMock(return_value=mock_generation_result)

            result = await mnemonic_service.generate_mnemonics(
                user_id="test-user", list_items=list_items, deck_id="test-deck"
            )

            # Verify result
            assert "acrostic" in result
            assert "story" in result
            assert "visual" in result
            assert result["metadata"]["generation_id"] == "generation-123"
            assert "remaining_generations" in result["metadata"]

            # Verify Claude was called
            mock_claude.generate_mnemonics.assert_called_once_with(
                list_items=list_items, user_id="test-user", deck_id="test-deck"
            )

    @pytest.mark.asyncio
    async def test_generate_success_premium_user(
        self, mnemonic_service, mock_supabase_client, mock_generation_result
    ):
        """Premium users should not have count incremented"""
        list_items = ["Item1", "Item2", "Item3", "Item4"]

        # Mock limit check (premium user)
        mock_limit_response = Mock()
        mock_limit_response.data = {
            "subscription_tier": "premium",
            "generation_count_monthly": 100,
            "generation_reset_date": None,
        }

        # Mock generation save
        mock_save_response = Mock()
        mock_save_response.data = [{"id": "generation-123"}]

        mock_supabase_client.execute.side_effect = [
            mock_limit_response,  # check limit
            mock_save_response,  # save generation (no increment for premium)
        ]

        with patch("app.services.mnemonic_service.claude_service") as mock_claude:
            mock_claude.generate_mnemonics = AsyncMock(return_value=mock_generation_result)

            result = await mnemonic_service.generate_mnemonics(
                user_id="premium-user", list_items=list_items, deck_id="test-deck"
            )

            # Verify remaining is -1 (unlimited)
            assert result["metadata"]["remaining_generations"] == -1


class TestSelectMnemonic:
    """Test mnemonic selection"""

    @pytest.mark.asyncio
    async def test_select_mnemonic_success(self, mnemonic_service, mock_supabase_client):
        """Should successfully select and save mnemonic to deck"""
        # Mock generation retrieval
        mock_generation = {
            "id": "gen-123",
            "user_id": "test-user",
            "input_list": "Item1\nItem2\nItem3",
            "acrostic_result": {
                "title": "Test",
                "content": "Test acrostic content",
                "how_to_use": "Use this",
            },
            "story_result": {"title": "Test", "content": "Test story", "how_to_use": "Use this"},
            "visual_result": {"title": "Test", "content": "Test visual", "how_to_use": "Use this"},
        }

        mock_gen_response = Mock()
        mock_gen_response.data = mock_generation

        # Mock generation update
        mock_gen_update = Mock()
        mock_gen_update.data = [mock_generation]

        # Mock deck update
        mock_deck_response = Mock()
        mock_deck_response.data = [
            {
                "id": "deck-123",
                "selected_mnemonic_type": "acrostic",
                "selected_mnemonic_content": "Test acrostic content",
            }
        ]

        mock_supabase_client.execute.side_effect = [
            mock_gen_response,  # get generation
            mock_gen_update,  # update generation with selection
            mock_deck_response,  # update deck
        ]

        result = await mnemonic_service.select_mnemonic(
            user_id="test-user", generation_id="gen-123", selected_type="acrostic", deck_id="deck-123"
        )

        assert result["id"] == "deck-123"
        assert result["selected_mnemonic_type"] == "acrostic"

    @pytest.mark.asyncio
    async def test_select_mnemonic_generation_not_found(self, mnemonic_service, mock_supabase_client):
        """Should raise error if generation not found"""
        mock_response = Mock()
        mock_response.data = None
        mock_supabase_client.execute.return_value = mock_response

        with pytest.raises(Exception, match="Generation not found"):
            await mnemonic_service.select_mnemonic(
                user_id="test-user",
                generation_id="nonexistent",
                selected_type="acrostic",
                deck_id="deck-123",
            )

    @pytest.mark.asyncio
    async def test_select_invalid_mnemonic_type(self, mnemonic_service, mock_supabase_client):
        """Should raise error if selected mnemonic type doesn't exist in generation"""
        mock_generation = {
            "id": "gen-123",
            "user_id": "test-user",
            "acrostic_result": None,  # Missing acrostic
            "story_result": {"title": "Test", "content": "Test", "how_to_use": "Use"},
            "visual_result": {"title": "Test", "content": "Test", "how_to_use": "Use"},
        }

        mock_response = Mock()
        mock_response.data = mock_generation
        mock_supabase_client.execute.return_value = mock_response

        with pytest.raises(Exception, match="No acrostic mnemonic found"):
            await mnemonic_service.select_mnemonic(
                user_id="test-user", generation_id="gen-123", selected_type="acrostic", deck_id="deck-123"
            )
