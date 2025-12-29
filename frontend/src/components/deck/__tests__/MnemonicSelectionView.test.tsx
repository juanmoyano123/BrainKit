/**
 * Tests for MnemonicSelectionView Component
 * F-005: Mnemonic Selection UI
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MnemonicSelectionView } from '../MnemonicSelectionView';
import type { MnemonicGenerationResult } from '@/stores/mnemonicStore';

const mockGeneration: MnemonicGenerationResult = {
  acrostic: {
    title: 'EALA Memory Aid',
    content:
      'Every Advanced Learner Adapts - E for Epinephrine, A for Amiodarone, L for Lidocaine, A for Atropine',
    how_to_use:
      'Remember the phrase "Every Advanced Learner Adapts" where each first letter corresponds to a medication.',
  },
  story: {
    title: 'The Emergency Room Journey',
    content:
      'Picture yourself in an emergency room. First, you reach for Epinephrine from the crash cart. Next, Amiodarone sits on the second shelf. Then Lidocaine catches your eye on the third level. Finally, Atropine waits at the top shelf.',
    how_to_use:
      'Visualize moving through the emergency room, collecting each medication in sequence.',
  },
  visual: {
    title: 'Body Journey Method',
    content:
      'Start at your feet (Epinephrine boosts you up), move to your heart (Amiodarone regulates rhythm), then to your chest (Lidocaine numbs), and finally to your head (Atropine dilates pupils).',
    how_to_use:
      'Associate each medication with a body part from bottom to top, creating a physical journey.',
  },
  metadata: {
    generation_time_ms: 5000,
    item_count: 4,
    model: 'claude-sonnet-4-20250514',
    generation_id: 'gen-123',
    remaining_generations: 2,
  },
};

describe('MnemonicSelectionView', () => {
  const mockOnSelect = vi.fn();
  const mockOnRegenerate = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
    mockOnRegenerate.mockClear();
  });

  describe('Rendering', () => {
    it('should render all three mnemonic cards', () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      expect(screen.getByText('Acrostic')).toBeInTheDocument();
      expect(screen.getByText('Story')).toBeInTheDocument();
      expect(screen.getByText('Visual Pattern')).toBeInTheDocument();
    });

    it('should show generation metadata', () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      expect(screen.getByText(/5\.0s/)).toBeInTheDocument();
      expect(screen.getByText(/claude-sonnet-4-20250514/)).toBeInTheDocument();
    });

    it('should show remaining generations count for free users', () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Check for the generation count text (split across elements)
      const generationsText = screen.getByText(/remaining this month/i);
      expect(generationsText).toBeInTheDocument();

      // Verify the count "2" is in a strong tag near the generations text
      const strongElements = screen.getAllByText('2');
      expect(strongElements.length).toBeGreaterThan(0);
    });

    it('should show unlimited badge for premium users', () => {
      const premiumGeneration = {
        ...mockGeneration,
        metadata: { ...mockGeneration.metadata, remaining_generations: -1 },
      };

      render(<MnemonicSelectionView generation={premiumGeneration} onSelect={mockOnSelect} />);

      expect(screen.getByText(/unlimited generations/i)).toBeInTheDocument();
      expect(screen.getByText(/premium/i)).toBeInTheDocument();
    });
  });

  describe('Scenario 1: Select mnemonic (happy path)', () => {
    it('should highlight selected card when clicked', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const acrosticCard = screen.getByRole('radio', { name: /acrostic/i });
      await user.click(acrosticCard);

      // Should show "Selected" badge
      await waitFor(() => {
        expect(screen.getByText('Selected')).toBeInTheDocument();
      });

      // Card should have aria-checked=true
      expect(acrosticCard).toHaveAttribute('aria-checked', 'true');
    });

    it('should enable continue button after selection', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const continueButton = screen.getByRole('button', { name: /continue with selected/i });

      // Initially disabled
      expect(continueButton).toBeDisabled();

      // Select a card
      const storyCard = screen.getByRole('radio', { name: /story/i });
      await user.click(storyCard);

      // Now enabled
      await waitFor(() => {
        expect(continueButton).not.toBeDisabled();
      });
    });

    it('should call onSelect with correct type when confirmed', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Select story card
      const storyCard = screen.getByRole('radio', { name: /story/i });
      await user.click(storyCard);

      // Click continue
      const continueButton = screen.getByRole('button', { name: /continue with selected.*story/i });
      await user.click(continueButton);

      expect(mockOnSelect).toHaveBeenCalledWith('story');
    });

    it('should show selected type name in continue button', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Select visual card
      const visualCard = screen.getByRole('radio', { name: /visual/i });
      await user.click(visualCard);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /continue with selected.*visual/i })
        ).toBeInTheDocument();
      });
    });
  });

  describe('Scenario 2: Change selection before confirming', () => {
    it('should update selection when different card is clicked', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // First select story
      const storyCard = screen.getByRole('radio', { name: /story/i });
      await user.click(storyCard);

      await waitFor(() => {
        expect(storyCard).toHaveAttribute('aria-checked', 'true');
      });

      // Then select acrostic
      const acrosticCard = screen.getByRole('radio', { name: /acrostic/i });
      await user.click(acrosticCard);

      await waitFor(() => {
        expect(acrosticCard).toHaveAttribute('aria-checked', 'true');
        expect(storyCard).toHaveAttribute('aria-checked', 'false');
      });

      // Continue button should reflect new selection
      expect(
        screen.getByRole('button', { name: /continue with selected.*acrostic/i })
      ).toBeInTheDocument();
    });

    it('should only call onSelect once when confirmed', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Select and change multiple times (clicking cards does NOT call onSelect yet)
      const cards = screen.getAllByRole('radio');
      await user.click(cards[1]); // Story card
      await user.click(cards[0]); // Acrostic card
      await user.click(cards[2]); // Visual card

      // onSelect should not have been called yet
      expect(mockOnSelect).not.toHaveBeenCalled();

      // Confirm final selection
      const continueButton = screen.getByRole('button', { name: /continue with selected/i });
      await user.click(continueButton);

      // Should only call once with final selection
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith('visual');
    });
  });

  describe('Scenario 3: Expand mnemonic for full reading', () => {
    it('should expand card when show details is clicked', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Acrostic is expanded by default, so test story card
      const storyCard = screen.getByRole('radio', { name: /story/i });
      const showDetailsButton = storyCard.querySelector('button[aria-expanded="false"]');

      if (showDetailsButton) {
        await user.click(showDetailsButton);
      }

      await waitFor(() => {
        const mnemonicLabels = screen.getAllByText('The Mnemonic:');
        expect(mnemonicLabels.length).toBeGreaterThan(1); // Both acrostic and story expanded
      });
    });

    it('should collapse card when hide details is clicked', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Find acrostic's hide button (it's expanded by default)
      const hideButton = screen.getByText(/hide details/i);
      await user.click(hideButton);

      await waitFor(() => {
        // Content should not be visible
        const mnemonicContent = screen.queryByText(/Every Advanced Learner Adapts/);
        expect(mnemonicContent).not.toBeInTheDocument();
      });
    });

    it('should not affect other cards when expanding/collapsing', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Expand story card
      const storyCard = screen.getByRole('radio', { name: /story/i });
      const showDetailsButton = storyCard.querySelector('button[aria-expanded="false"]');

      if (showDetailsButton) {
        await user.click(showDetailsButton);
      }

      // Acrostic should still be expanded (check for part of acrostic content)
      await waitFor(() => {
        expect(screen.getByText(/EALA/i)).toBeInTheDocument();
      });
    });

    it('should have proper ARIA attributes for expandable content', async () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const expandButtons = screen.getAllByRole('button', { name: /show details|hide details/i });

      expandButtons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });
  });

  describe('Regenerate functionality', () => {
    it('should show regenerate button when onRegenerate is provided', () => {
      render(
        <MnemonicSelectionView
          generation={mockGeneration}
          onSelect={mockOnSelect}
          onRegenerate={mockOnRegenerate}
        />
      );

      expect(screen.getByRole('button', { name: /regenerate options/i })).toBeInTheDocument();
    });

    it('should not show regenerate button when onRegenerate is not provided', () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      expect(screen.queryByRole('button', { name: /regenerate options/i })).not.toBeInTheDocument();
    });

    it('should call onRegenerate when button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <MnemonicSelectionView
          generation={mockGeneration}
          onSelect={mockOnSelect}
          onRegenerate={mockOnRegenerate}
        />
      );

      const regenerateButton = screen.getByRole('button', { name: /regenerate options/i });
      await user.click(regenerateButton);

      expect(mockOnRegenerate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading state', () => {
    it('should show loading state on continue button when loading', () => {
      render(
        <MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} loading={true} />
      );

      expect(screen.getByText(/saving\.\.\./i)).toBeInTheDocument();
    });

    it('should disable buttons when loading', () => {
      render(
        <MnemonicSelectionView
          generation={mockGeneration}
          onSelect={mockOnSelect}
          onRegenerate={mockOnRegenerate}
          loading={true}
        />
      );

      expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /regenerate/i })).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have radiogroup role for cards container', () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const radiogroup = screen.getByRole('radiogroup');
      expect(radiogroup).toHaveAttribute('aria-label', 'Mnemonic technique selection');
    });

    it('should support keyboard navigation with Enter key', async () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const storyCard = screen.getByRole('radio', { name: /story/i });
      storyCard.focus();

      // Press Enter
      fireEvent.keyDown(storyCard, { key: 'Enter' });

      await waitFor(() => {
        expect(storyCard).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should support keyboard navigation with Space key', async () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const visualCard = screen.getByRole('radio', { name: /visual/i });
      visualCard.focus();

      // Press Space
      fireEvent.keyDown(visualCard, { key: ' ' });

      await waitFor(() => {
        expect(visualCard).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should have proper tabIndex for keyboard focus', () => {
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      const cards = screen.getAllByRole('radio');
      cards.forEach((card) => {
        expect(card).toHaveAttribute('tabIndex', '0');
      });
    });
  });

  describe('Auto-expand on selection', () => {
    it('should auto-expand card when selected', async () => {
      const user = userEvent.setup();
      render(<MnemonicSelectionView generation={mockGeneration} onSelect={mockOnSelect} />);

      // Visual card starts collapsed
      const visualCard = screen.getByRole('radio', { name: /visual/i });

      // Before selection, it should be collapsed
      const visualExpandButton = visualCard.querySelector('button[aria-expanded="false"]');
      expect(visualExpandButton).toBeInTheDocument();

      // Select visual card
      await user.click(visualCard);

      // Should auto-expand - button should now show "Hide details"
      await waitFor(() => {
        const visualHideButton = visualCard.querySelector('button[aria-expanded="true"]');
        expect(visualHideButton).toBeInTheDocument();
      });
    });
  });
});
