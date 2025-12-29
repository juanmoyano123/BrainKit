/**
 * Deck Detail Page
 *
 * Shows a single deck with its flashcards and study options.
 * Implements F-006: AI Flashcard Generation.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Plus } from 'lucide-react';
import { useDeckStore, type Deck } from '@/stores/deckStore';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EditDeckModal } from '@/components/deck/EditDeckModal';
import { DeleteDeckModal } from '@/components/deck/DeleteDeckModal';
import { FlashcardList } from '@/components/flashcard/FlashcardList';
import { Toast } from '@/components/ui/Toast';

export const DeckDetailPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { currentDeck, loading, error, fetchDeck, updateDeck, deleteDeck, clearError } = useDeckStore();
  const {
    flashcards,
    loading: flashcardsLoading,
    generating,
    fetchFlashcards,
    generateFlashcards,
    updateFlashcard,
    deleteFlashcard,
  } = useFlashcardStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (deckId) {
      fetchDeck(deckId);
      fetchFlashcards(deckId);
    }
  }, [deckId, fetchDeck, fetchFlashcards]);

  const handleEditDeck = async (id: string, name: string, description?: string) => {
    await updateDeck(id, name, description);
    setToast({ message: 'Deck updated successfully', type: 'success' });
  };

  const handleDeleteDeck = async (id: string) => {
    await deleteDeck(id);
    setToast({ message: 'Deck deleted', type: 'success' });
    navigate('/dashboard');
  };

  const handleGenerateFlashcards = async () => {
    if (!deckId) return;

    try {
      await generateFlashcards(deckId);
      setToast({ message: 'Flashcards generated successfully!', type: 'success' });
      // Refresh deck to update card count
      await fetchDeck(deckId);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to generate flashcards',
        type: 'error',
      });
    }
  };

  const handleUpdateFlashcard = async (
    flashcardId: string,
    front: string,
    back: string,
    difficulty: string
  ) => {
    try {
      await updateFlashcard(flashcardId, front, back, difficulty);
      setToast({ message: 'Flashcard updated successfully', type: 'success' });
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteFlashcard = async (flashcardId: string) => {
    if (!deckId) return;

    try {
      await deleteFlashcard(flashcardId);
      setToast({ message: 'Flashcard deleted', type: 'success' });
      // Refresh deck to update card count
      await fetchDeck(deckId);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to delete flashcard',
        type: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !currentDeck) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Deck not found'}</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentDeck.name}</h1>
                {currentDeck.description && (
                  <p className="text-sm text-gray-600">{currentDeck.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="p-4">
            <p className="text-sm text-gray-600">Total Cards</p>
            <p className="text-2xl font-bold text-gray-900">{currentDeck.card_count}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Last Studied</p>
            <p className="text-lg font-semibold text-gray-900">
              {currentDeck.last_studied_at
                ? new Date(currentDeck.last_studied_at).toLocaleDateString()
                : 'Never'}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Created</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(currentDeck.created_at).toLocaleDateString()}
            </p>
          </Card>
        </div>

        {/* Flashcards Section */}
        <FlashcardList
          flashcards={flashcards}
          loading={flashcardsLoading || generating}
          deckHasMnemonic={Boolean(
            currentDeck.selected_mnemonic_content && currentDeck.original_list
          )}
          onGenerateFlashcards={handleGenerateFlashcards}
          onUpdateFlashcard={handleUpdateFlashcard}
          onDeleteFlashcard={handleDeleteFlashcard}
        />

        {/* Empty State / Add List Prompt - Placeholder for F-003 */}
        {currentDeck.card_count === 0 &&
          !currentDeck.selected_mnemonic_content &&
          !flashcardsLoading && (
            <Card className="p-8 text-center mt-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add your first list</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Paste a list of items you want to memorize, and we'll generate AI-powered mnemonics
                and flashcards for you.
              </p>
              <Button disabled>
                <Plus className="w-5 h-5 mr-2" />
                Add List (Coming in F-003)
              </Button>
            </Card>
          )}
      </main>

      {/* Modals */}
      <EditDeckModal
        isOpen={isEditModalOpen}
        deck={currentDeck}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditDeck}
      />

      <DeleteDeckModal
        isOpen={isDeleteModalOpen}
        deck={currentDeck}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDeck}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
