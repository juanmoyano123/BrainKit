/**
 * FlashcardList Component
 *
 * Displays a grid of flashcards for a deck.
 * Implements F-006 Scenario 4: View generated flashcards before studying.
 */

import React, { useState } from 'react';
import { FlashcardPreview } from './FlashcardPreview';
import { FlashcardEditModal } from './FlashcardEditModal';
import { Button } from '@/components/ui/Button';
import { Plus, Sparkles } from 'lucide-react';
import type { Flashcard } from '@/stores/flashcardStore';

interface FlashcardListProps {
  flashcards: Flashcard[];
  loading: boolean;
  deckHasMnemonic: boolean;
  onGenerateFlashcards: () => void;
  onUpdateFlashcard: (flashcardId: string, front: string, back: string, difficulty: string) => Promise<void>;
  onDeleteFlashcard: (flashcardId: string) => Promise<void>;
}

export const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  loading,
  deckHasMnemonic,
  onGenerateFlashcards,
  onUpdateFlashcard,
  onDeleteFlashcard,
}) => {
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null);
  const [deletingFlashcard, setDeletingFlashcard] = useState<Flashcard | null>(null);

  const handleEdit = (flashcard: Flashcard) => {
    setEditingFlashcard(flashcard);
  };

  const handleDelete = (flashcard: Flashcard) => {
    setDeletingFlashcard(flashcard);
  };

  const confirmDelete = async () => {
    if (deletingFlashcard) {
      await onDeleteFlashcard(deletingFlashcard.id);
      setDeletingFlashcard(null);
    }
  };

  // Empty state - no flashcards
  if (!loading && flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {deckHasMnemonic ? 'Ready to Generate Flashcards' : 'No Flashcards Yet'}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {deckHasMnemonic
            ? 'Generate flashcards based on your mnemonic to start studying.'
            : 'Add a list and select a mnemonic first, then generate flashcards.'}
        </p>
        {deckHasMnemonic && (
          <Button onClick={onGenerateFlashcards}>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Flashcards with AI
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Flashcards
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({flashcards.length} {flashcards.length === 1 ? 'card' : 'cards'})
            </span>
          </h2>
        </div>
        {deckHasMnemonic && flashcards.length > 0 && (
          <Button variant="secondary" size="sm" onClick={onGenerateFlashcards}>
            <Plus className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        )}
      </div>

      {/* Flashcard Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((flashcard) => (
            <FlashcardPreview
              key={flashcard.id}
              flashcard={flashcard}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <FlashcardEditModal
        isOpen={editingFlashcard !== null}
        flashcard={editingFlashcard}
        onClose={() => setEditingFlashcard(null)}
        onSubmit={onUpdateFlashcard}
      />

      {/* Delete Confirmation Modal */}
      {deletingFlashcard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Flashcard?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this flashcard? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeletingFlashcard(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} className="flex-1">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
