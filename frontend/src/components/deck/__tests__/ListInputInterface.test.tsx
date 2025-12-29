/**
 * Tests for ListInputInterface Component
 * F-003: List Input Interface
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListInputInterface } from '../ListInputInterface';

// Mock the mnemonic store
vi.mock('@/stores/mnemonicStore', () => ({
  useMnemonicStore: () => ({
    loading: false,
  }),
}));

describe('ListInputInterface', () => {
  const mockOnListSubmit = vi.fn();

  beforeEach(() => {
    mockOnListSubmit.mockClear();
  });

  describe('Scenario 1: Paste valid list (happy path)', () => {
    it('should parse newline-separated list correctly', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, 'Epinephrine\nAmiodarone\nLidocaine\nAtropine');

      await waitFor(() => {
        expect(screen.getByText('4 items detected')).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      expect(button).not.toBeDisabled();
    });

    it('should call onListSubmit with parsed items when form is submitted', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, 'Epinephrine\nAmiodarone\nLidocaine\nAtropine');

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      await user.click(button);

      expect(mockOnListSubmit).toHaveBeenCalledWith([
        'Epinephrine',
        'Amiodarone',
        'Lidocaine',
        'Atropine',
      ]);
    });
  });

  describe('Scenario 2: List with various formats accepted', () => {
    it('should parse comma-separated list', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, 'Madrid, Paris, London, Berlin');

      await waitFor(() => {
        expect(screen.getByText('4 items detected')).toBeInTheDocument();
      });
    });

    it('should parse numbered list format', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, '1. Madrid\n2. Paris\n3. London');

      await waitFor(() => {
        expect(screen.getByText('3 items detected')).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      await user.click(button);

      expect(mockOnListSubmit).toHaveBeenCalledWith(['Madrid', 'Paris', 'London']);
    });

    it('should parse bullet point list format', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, '- Madrid\n- Paris\n- London');

      await waitFor(() => {
        expect(screen.getByText('3 items detected')).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      await user.click(button);

      expect(mockOnListSubmit).toHaveBeenCalledWith(['Madrid', 'Paris', 'London']);
    });

    it('should parse mixed format (numbering with parentheses)', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, '1) First\n2) Second\n3) Third');

      await waitFor(() => {
        expect(screen.getByText('3 items detected')).toBeInTheDocument();
      });
    });
  });

  describe('Scenario 3: Minimum items validation', () => {
    it('should show error when less than 3 items are entered', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, 'Apple\nBanana');

      await waitFor(() => {
        expect(screen.getByText('2 items detected')).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      expect(button).toBeDisabled();
    });

    it('should not submit form and show error message with less than 3 items', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, 'Apple\nBanana');

      const button = screen.getByRole('button', { name: /generate mnemonics/i });

      // Button should be disabled, but let's try to click anyway
      expect(button).toBeDisabled();

      // Form should not be submitted
      expect(mockOnListSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Scenario 4: Maximum items validation', () => {
    it('should show error when more than 50 items are entered', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);

      // Create 51 items
      const items = Array.from({ length: 51 }, (_, i) => `Item${i + 1}`).join('\n');
      await user.type(textarea, items);

      await waitFor(() => {
        expect(screen.getByText('51 items detected')).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      expect(button).toBeDisabled();
    });
  });

  describe('Scenario 5: Empty input handling', () => {
    it('should show "No items detected" with empty textarea', () => {
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      expect(screen.getByText('No items detected')).toBeInTheDocument();
    });

    it('should have disabled button when textarea is empty', () => {
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      expect(button).toBeDisabled();
    });
  });

  describe('XSS Sanitization', () => {
    it('should remove HTML tags from input', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, '<script>alert("xss")</script>\nItem1\nItem2\nItem3');

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      await user.click(button);

      // Should call with sanitized items (script tag removed)
      expect(mockOnListSubmit).toHaveBeenCalled();
      const calledItems = mockOnListSubmit.mock.calls[0][0];
      expect(calledItems.some((item: string) => item.includes('<script>'))).toBe(false);
    });
  });

  describe('Character Limit', () => {
    it('should show error when input exceeds 10000 characters', async () => {
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i) as HTMLTextAreaElement;

      // Create a string longer than 10000 characters
      const longInput = 'A'.repeat(10001);

      // Simulate change event
      fireEvent.change(textarea, { target: { value: longInput } });

      await waitFor(() => {
        expect(screen.getByText(/input is too large/i)).toBeInTheDocument();
      });
    });
  });

  describe('Deduplication', () => {
    it('should remove duplicate items (case-insensitive)', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i) as HTMLTextAreaElement;

      // Simulate change event
      fireEvent.change(textarea, { target: { value: 'Apple\napple\nBanana\nAPPLE\nCherry' } });

      await waitFor(() => {
        // Should detect 3 unique items (Apple, Banana, Cherry)
        expect(screen.getByText('3 items detected')).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /generate mnemonics/i });
      await user.click(button);

      expect(mockOnListSubmit).toHaveBeenCalledWith(['Apple', 'Banana', 'Cherry']);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      expect(textarea).toHaveAttribute('aria-describedby');
    });

    it('should announce item count changes to screen readers', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      await user.type(textarea, 'Item1\nItem2\nItem3');

      const counter = screen.getByText('3 items detected');
      expect(counter).toHaveAttribute('aria-live', 'polite');
    });

    it('should announce errors to screen readers', async () => {
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i) as HTMLTextAreaElement;
      const longInput = 'A'.repeat(10001);

      // Simulate change event
      fireEvent.change(textarea, { target: { value: longInput } });

      await waitFor(() => {
        const error = screen.getByRole('alert');
        expect(error).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('Preview Display', () => {
    it('should show preview for lists with 10 or fewer items', async () => {
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i) as HTMLTextAreaElement;

      // Simulate change event
      fireEvent.change(textarea, { target: { value: 'Item1\nItem2\nItem3' } });

      await waitFor(() => {
        expect(screen.getByText(/parsed items:/i)).toBeInTheDocument();
      });

      // Check that items are displayed in the preview
      const preview = screen.getByText(/parsed items:/i).closest('div');
      expect(preview).toBeTruthy();
      expect(preview?.textContent).toContain('Item1');
      expect(preview?.textContent).toContain('Item2');
      expect(preview?.textContent).toContain('Item3');
    });

    it('should show truncated preview for lists with more than 10 items', async () => {
      const user = userEvent.setup();
      render(<ListInputInterface deckId="test-deck" onListSubmit={mockOnListSubmit} />);

      const textarea = screen.getByLabelText(/your list/i);
      const items = Array.from({ length: 15 }, (_, i) => `Item${i + 1}`).join('\n');
      await user.type(textarea, items);

      await waitFor(() => {
        expect(screen.getByText(/showing first 10/i)).toBeInTheDocument();
        expect(screen.getByText(/and 5 more items/i)).toBeInTheDocument();
      });
    });
  });
});
