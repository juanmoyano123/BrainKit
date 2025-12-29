/**
 * Deck Detail Page
 *
 * Shows a single deck with its flashcards and study options.
 * Includes F-003 (List Input Interface) for adding items to memorize.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useDeckStore } from '@/stores/deckStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EditDeckModal } from '@/components/deck/EditDeckModal';
import { DeleteDeckModal } from '@/components/deck/DeleteDeckModal';
import { Toast } from '@/components/ui/Toast';
import { ListInputInterface } from '@/components/deck/ListInputInterface';

export const DeckDetailPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { currentDeck, loading, error, fetchDeck, updateDeck, deleteDeck } = useDeckStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (deckId) {
      fetchDeck(deckId);
    }
  }, [deckId, fetchDeck]);

  const handleEditDeck = async (id: string, name: string, description?: string) => {
    await updateDeck(id, name, description);
    setToast({ message: 'Deck updated successfully', type: 'success' });
  };

  const handleDeleteDeck = async (id: string) => {
    await deleteDeck(id);
    setToast({ message: 'Deck deleted', type: 'success' });
    navigate('/dashboard');
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

        {/* F-003: List Input Interface */}
        {currentDeck.card_count === 0 && (
          <ListInputInterface
            deckId={currentDeck.id}
            onListSubmit={(items) => {
              console.log('List submitted:', items);
              // TODO: F-004 - Call mnemonic generation API
            }}
          />
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
