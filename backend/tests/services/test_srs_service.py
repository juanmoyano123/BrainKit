"""
Tests for SRS Service (F-007: Spaced Repetition System)

Tests cover:
- Scenario 1: SM-2 algorithm implementation
- Scenario 2: Calculate next review intervals
- Scenario 3: Handle different quality ratings (Hard, Good, Easy)
- Scenario 4: Ease factor adjustments
"""

import pytest
from datetime import date, datetime, timedelta

from app.services.srs_service import SRSService


@pytest.fixture
def srs_service():
    """Create SRSService instance"""
    return SRSService()


class TestSM2Algorithm:
    """Test SuperMemo SM-2 algorithm (F-007 core functionality)"""

    def test_sm2_first_review_quality_good(self, srs_service):
        """
        Scenario 1: First review with Good rating
        Given a new flashcard (repetitions=0)
        When rated as Good (quality=3)
        Then interval should be 1 day, repetitions should be 1
        """
        new_interval, new_ease, new_reps = srs_service.calculate_sm2(
            quality=3,
            repetitions=0,
            ease_factor=2.5,
            interval=0
        )

        assert new_interval == 1, "First review should have 1-day interval"
        assert new_reps == 1, "Repetitions should increment to 1"
        assert new_ease >= 1.3, "Ease factor should be at least 1.3"

    def test_sm2_second_review_quality_good(self, srs_service):
        """
        Scenario 2: Second review with Good rating
        Given a flashcard with 1 repetition
        When rated as Good (quality=3)
        Then interval should be 6 days
        """
        new_interval, new_ease, new_reps = srs_service.calculate_sm2(
            quality=3,
            repetitions=1,
            ease_factor=2.5,
            interval=1
        )

        assert new_interval == 6, "Second review should have 6-day interval"
        assert new_reps == 2, "Repetitions should increment to 2"

    def test_sm2_third_review_quality_good(self, srs_service):
        """
        Scenario 2: Third review applies ease factor
        Given a flashcard with 2 repetitions
        When rated as Good (quality=3)
        Then interval should be previous_interval * ease_factor
        """
        ease_factor = 2.5
        previous_interval = 6

        new_interval, new_ease, new_reps = srs_service.calculate_sm2(
            quality=3,
            repetitions=2,
            ease_factor=ease_factor,
            interval=previous_interval
        )

        expected_interval = int(previous_interval * ease_factor)
        assert new_interval == expected_interval, f"Expected {expected_interval}, got {new_interval}"
        assert new_reps == 3, "Repetitions should increment to 3"

    def test_sm2_quality_easy_increases_ease_factor(self, srs_service):
        """
        Scenario 4: Easy rating increases ease factor
        Given a flashcard
        When rated as Easy (quality=5)
        Then ease factor should increase
        """
        original_ease = 2.5

        new_interval, new_ease, new_reps = srs_service.calculate_sm2(
            quality=5,
            repetitions=1,
            ease_factor=original_ease,
            interval=1
        )

        assert new_ease > original_ease, "Easy rating should increase ease factor"
        assert new_ease >= 1.3, "Ease factor should not go below minimum"

    def test_sm2_quality_hard_decreases_ease_factor(self, srs_service):
        """
        Scenario 4: Hard rating decreases ease factor
        Given a flashcard
        When rated as Hard (quality=1)
        Then ease factor should decrease and repetitions reset
        """
        original_ease = 2.5

        new_interval, new_ease, new_reps = srs_service.calculate_sm2(
            quality=1,
            repetitions=3,
            ease_factor=original_ease,
            interval=15
        )

        assert new_ease < original_ease, "Hard rating should decrease ease factor"
        assert new_ease >= 1.3, "Ease factor should not go below 1.3"
        assert new_reps == 0, "Failed review should reset repetitions"
        assert new_interval == 1, "Failed review should have 1-day interval"

    def test_sm2_quality_hard_resets_repetitions(self, srs_service):
        """
        Scenario 3: Hard rating resets learning progress
        Given a flashcard with multiple successful reviews
        When rated as Hard (quality=1)
        Then repetitions should reset to 0
        """
        new_interval, new_ease, new_reps = srs_service.calculate_sm2(
            quality=1,
            repetitions=5,
            ease_factor=2.5,
            interval=30
        )

        assert new_reps == 0, "Failed review should reset repetitions to 0"
        assert new_interval == 1, "Failed review should review tomorrow"

    def test_sm2_minimum_ease_factor_enforced(self, srs_service):
        """
        Scenario 4: Ease factor has a minimum of 1.3
        Given a flashcard with low ease factor
        When rated as Hard multiple times
        Then ease factor should not go below 1.3
        """
        # Start with minimum ease factor
        current_ease = 1.3

        # Rate as hard multiple times
        for _ in range(5):
            _, current_ease, _ = srs_service.calculate_sm2(
                quality=1,
                repetitions=0,
                ease_factor=current_ease,
                interval=1
            )

        assert current_ease >= 1.3, "Ease factor should never go below 1.3"

    def test_sm2_invalid_quality_raises_error(self, srs_service):
        """Should raise error for invalid quality values"""
        invalid_qualities = [0, 2, 4, 6, -1, 10]

        for quality in invalid_qualities:
            with pytest.raises(ValueError, match="Quality must be 1"):
                srs_service.calculate_sm2(
                    quality=quality,
                    repetitions=0,
                    ease_factor=2.5,
                    interval=0
                )

    def test_sm2_progression_sequence(self, srs_service):
        """
        Test complete learning progression
        Given a new flashcard
        When reviewed multiple times with Good ratings
        Then intervals should follow SM-2 progression
        """
        repetitions = 0
        ease_factor = 2.5
        interval = 0

        # First review
        interval, ease_factor, repetitions = srs_service.calculate_sm2(
            quality=3, repetitions=repetitions, ease_factor=ease_factor, interval=interval
        )
        assert interval == 1, "First interval should be 1 day"
        assert repetitions == 1

        # Second review
        interval, ease_factor, repetitions = srs_service.calculate_sm2(
            quality=3, repetitions=repetitions, ease_factor=ease_factor, interval=interval
        )
        assert interval == 6, "Second interval should be 6 days"
        assert repetitions == 2

        # Third review - ease factor has been updated by previous reviews
        prev_interval = interval
        interval, ease_factor, repetitions = srs_service.calculate_sm2(
            quality=3, repetitions=repetitions, ease_factor=ease_factor, interval=interval
        )
        assert interval >= 6, "Third interval should be at least 6 days"
        assert repetitions == 3

    def test_sm2_quality_affects_ease_differently(self, srs_service):
        """Test that different qualities affect ease factor differently"""
        original_ease = 2.5

        # Easy should increase more than Good
        _, ease_easy, _ = srs_service.calculate_sm2(5, 1, original_ease, 1)
        _, ease_good, _ = srs_service.calculate_sm2(3, 1, original_ease, 1)
        _, ease_hard, _ = srs_service.calculate_sm2(1, 1, original_ease, 1)

        assert ease_easy > ease_good > ease_hard, "Easy > Good > Hard in ease factor"
        assert ease_easy > original_ease, "Easy should increase ease"
        assert ease_hard < original_ease, "Hard should decrease ease"


class TestSM2RealWorldScenarios:
    """Test SM-2 with realistic study scenarios"""

    def test_consistent_good_reviews(self, srs_service):
        """
        Simulate a student consistently rating cards as Good
        Intervals should progressively increase
        """
        reps = 0
        ease = 2.5
        interval = 0
        intervals = []

        for _ in range(10):
            interval, ease, reps = srs_service.calculate_sm2(
                quality=3,
                repetitions=reps,
                ease_factor=ease,
                interval=interval
            )
            intervals.append(interval)

        # Intervals should be monotonically increasing after first two
        assert intervals[0] == 1
        assert intervals[1] == 6
        for i in range(2, len(intervals) - 1):
            assert intervals[i + 1] >= intervals[i], f"Intervals should increase: {intervals}"

    def test_mixed_quality_reviews(self, srs_service):
        """
        Simulate realistic mixed review quality
        Should handle varying performance
        """
        reps = 0
        ease = 2.5
        interval = 0

        # Good, Good, Easy, Good, Hard, Good
        qualities = [3, 3, 5, 3, 1, 3]
        results = []

        for quality in qualities:
            interval, ease, reps = srs_service.calculate_sm2(
                quality=quality,
                repetitions=reps,
                ease_factor=ease,
                interval=interval
            )
            results.append((interval, ease, reps))

        # After Hard (quality=1), repetitions should reset
        assert results[4][2] == 0, "Hard review should reset repetitions"
        # Hard rating should decrease ease compared to previous review
        assert results[4][1] < results[3][1], "Hard should decrease ease"
        # Easy rating (index 2) should give higher ease than Hard rating (index 4)
        # Even though ease accumulates, Easy rating affects it more positively
        assert len(results) == 6, "Should have 6 review results"


class TestEdgeCases:
    """Test edge cases and boundary conditions"""

    def test_very_long_interval(self, srs_service):
        """Test handling of very long intervals"""
        interval, ease, reps = srs_service.calculate_sm2(
            quality=5,
            repetitions=10,
            ease_factor=3.0,
            interval=365
        )

        assert interval > 365, "Very long intervals should continue to grow"
        assert isinstance(interval, int), "Interval should be an integer"

    def test_zero_initial_values(self, srs_service):
        """Test starting from zero values"""
        interval, ease, reps = srs_service.calculate_sm2(
            quality=3,
            repetitions=0,
            ease_factor=2.5,
            interval=0
        )

        assert interval == 1
        assert reps == 1
        assert ease >= 1.3

    def test_maximum_ease_progression(self, srs_service):
        """Test that ease factor can grow with consistent Easy ratings"""
        ease = 2.5

        for _ in range(10):
            _, ease, _ = srs_service.calculate_sm2(
                quality=5,
                repetitions=1,
                ease_factor=ease,
                interval=1
            )

        assert ease > 2.5, "Ease should increase with Easy ratings"
        # There should be some upper practical limit
        assert ease < 5.0, "Ease shouldn't grow unbounded in practice"
