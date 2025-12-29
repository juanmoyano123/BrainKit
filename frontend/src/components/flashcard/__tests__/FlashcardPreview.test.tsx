/**
 * Tests for FlashcardPreview Component
 * F-006: AI Flashcard Generation - Preview functionality
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlashcardPreview } from '../FlashcardPreview';

const mockFlashcard = {
  id: 'card-123',
  deck_id: 'deck-123',
  front: 'What is the capital of France?',
  back: 'Paris',
  difficulty: 'easy' as const,
  ease_factor: 2.5,
  interval_days: 1,
  repetitions: 0,
  next_review_date: null,
  last_reviewed_at: null,
  is_edited: false,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
};

describe('FlashcardPreview', () => {
  describe('Rendering', () => {
    it('should render flashcard front content', () => {
      render(<FlashcardPreview flashcard={mockFlashcard} />);

      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    });

    it('should show difficulty badge', () => {
      render(<FlashcardPreview flashcard={mockFlashcard} />);

      expect(screen.getByText('easy')).toBeInTheDocument();
    });

    it('should render edit and delete buttons when handlers provided', () => {
      const mockOnEdit = () => {};
      const mockOnDelete = () => {};

      render(
        <FlashcardPreview flashcard={mockFlashcard} onEdit={mockOnEdit} onDelete={mockOnDelete} />
      );

      expect(screen.getByLabelText(/edit flashcard/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/delete flashcard/i)).toBeInTheDocument();
    });

    it('should not render edit/delete buttons when handlers not provided', () => {
      render(<FlashcardPreview flashcard={mockFlashcard} />);

      expect(screen.queryByLabelText(/edit flashcard/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/delete flashcard/i)).not.toBeInTheDocument();
    });
  });

  describe('Difficulty Variations', () => {
    it('should render medium difficulty', () => {
      const mediumCard = { ...mockFlashcard, difficulty: 'medium' as const };
      render(<FlashcardPreview flashcard={mediumCard} />);

      expect(screen.getByText('medium')).toBeInTheDocument();
    });

    it('should render hard difficulty', () => {
      const hardCard = { ...mockFlashcard, difficulty: 'hard' as const };
      render(<FlashcardPreview flashcard={hardCard} />);

      expect(screen.getByText('hard')).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should display front content correctly', () => {
      render(<FlashcardPreview flashcard={mockFlashcard} />);

      // Front should be visible
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    });

    it('should handle long content', () => {
      const longCard = {
        ...mockFlashcard,
        front:
          'This is a very long question that should be displayed correctly without breaking the layout and maintaining good UX',
      };

      render(<FlashcardPreview flashcard={longCard} />);

      expect(screen.getByText(/This is a very long question/)).toBeInTheDocument();
    });
  });
});
