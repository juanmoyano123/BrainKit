/**
 * FlashcardEditModal Component
 *
 * Modal for editing flashcard front and back content.
 * Implements F-006 Scenario 5: Edit a generated flashcard.
 */

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import type { Flashcard } from '@/stores/flashcardStore';

interface FlashcardEditModalProps {
  isOpen: boolean;
  flashcard: Flashcard | null;
  onClose: () => void;
  onSubmit: (flashcardId: string, front: string, back: string, difficulty: string) => Promise<void>;
}

export const FlashcardEditModal: React.FC<FlashcardEditModalProps> = ({
  isOpen,
  flashcard,
  onClose,
  onSubmit,
}) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (flashcard) {
      setFront(flashcard.front);
      setBack(flashcard.back);
      setDifficulty(flashcard.difficulty);
      setError(null);
    }
  }, [flashcard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flashcard) return;

    if (!front.trim() || !back.trim()) {
      setError('Both front and back are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit(flashcard.id, front.trim(), back.trim(), difficulty);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update flashcard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Flashcard">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-lg text-error-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-1">
            Question (Front)
            <span className="text-gray-400 ml-1">{front.length}/2000</span>
          </label>
          <Textarea
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Enter question text..."
            rows={3}
            maxLength={2000}
            required
          />
        </div>

        <div>
          <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">
            Answer (Back)
            <span className="text-gray-400 ml-1">{back.length}/2000</span>
          </label>
          <Textarea
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Enter answer text..."
            rows={3}
            maxLength={2000}
            required
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !front.trim() || !back.trim()}
            className="flex-1"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
