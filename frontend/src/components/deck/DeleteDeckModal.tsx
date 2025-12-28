/**
 * DeleteDeckModal Component
 *
 * Confirmation modal for deleting a deck.
 */

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { Deck } from '@/stores/deckStore';

interface DeleteDeckModalProps {
  isOpen: boolean;
  deck: Deck | null;
  onClose: () => void;
  onConfirm: (deckId: string) => Promise<void>;
}

export const DeleteDeckModal: React.FC<DeleteDeckModalProps> = ({
  isOpen,
  deck,
  onClose,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!deck) return;

    try {
      setIsLoading(true);
      setError(null);
      await onConfirm(deck.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete deck');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Deck">
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
            <p className="text-sm text-error-800">{error}</p>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="p-2 bg-error-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-error-600" />
          </div>
          <div>
            <p className="text-gray-900 font-medium">
              Delete "{deck?.name}"?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              This will permanently delete {deck?.card_count || 0} flashcard
              {deck?.card_count !== 1 ? 's' : ''}. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            Delete Forever
          </Button>
        </div>
      </div>
    </Modal>
  );
};
