/**
 * Deck Detail Page
 *
 * Shows a single deck with its flashcards and study options.
 * Implements F-003 (List Input), F-004 (AI Mnemonics), F-005 (Mnemonic Selection), F-006 (Flashcard Generation).
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, FileUp, BookOpen, Target } from 'lucide-react';
import { useDeckStore } from '@/stores/deckStore';
import { useMnemonicStore } from '@/stores/mnemonicStore';
import { useFlashcardStore } from '@/stores/flashcardStore';
import type { PDFUploadResponse } from '@/stores/pdfStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { EditDeckModal } from '@/components/deck/EditDeckModal';
import { DeleteDeckModal } from '@/components/deck/DeleteDeckModal';
import { ListInputInterface } from '@/components/deck/ListInputInterface';
import { MnemonicSelectionView } from '@/components/deck/MnemonicSelectionView';
import { PDFUploadModal } from '@/components/deck/PDFUploadModal';
import { FlashcardList } from '@/components/flashcard/FlashcardList';
import { Toast } from '@/components/ui/Toast';

export const DeckDetailPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { currentDeck, loading, error, fetchDeck, updateDeck, deleteDeck } = useDeckStore();
  const {
    currentGeneration,
    loading: mnemonicLoading,
    error: mnemonicError,
    generateMnemonics,
    selectMnemonic,
    clearCurrentGeneration,
    clearError: clearMnemonicError,
  } = useMnemonicStore();
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
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
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

  // Handle PDF upload success
  const handlePDFSuccess = (result: PDFUploadResponse) => {
    // Set the current generation from PDF result
    useMnemonicStore.setState({
      currentGeneration: {
        acrostic: result.mnemonics.acrostic,
        story: result.mnemonics.story,
        visual: result.mnemonics.visual,
        metadata: result.metadata,
      },
    });

    setToast({
      message: `Extracted ${result.concept_count} concepts from PDF! Select a mnemonic technique.`,
      type: 'success',
    });
  };

  // F-003: Handle list submission
  const handleListSubmit = async (items: string[]) => {
    if (!deckId) return;

    try {
      clearMnemonicError();
      await generateMnemonics(items, deckId);
      // Generation successful - currentGeneration will be set by the store
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to generate mnemonics',
        type: 'error',
      });
    }
  };

  // F-005: Handle mnemonic selection
  const handleSelectMnemonic = async (selectedType: 'acrostic' | 'story' | 'visual') => {
    if (!currentGeneration?.metadata.generation_id || !deckId) return;

    try {
      await selectMnemonic(currentGeneration.metadata.generation_id, selectedType, deckId);

      setToast({
        message: 'Mnemonic saved successfully! Generating flashcards...',
        type: 'success',
      });

      // Clear the current generation
      clearCurrentGeneration();

      // Refresh the deck to show updated data
      await fetchDeck(deckId);

      // F-006: Auto-generate flashcards after mnemonic selection
      try {
        await generateFlashcards(deckId);
        setToast({ message: 'Flashcards generated successfully!', type: 'success' });
      } catch (flashcardError) {
        setToast({
          message:
            flashcardError instanceof Error
              ? flashcardError.message
              : 'Failed to generate flashcards',
          type: 'error',
        });
      }
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to save mnemonic',
        type: 'error',
      });
    }
  };

  const handleRegenerate = async () => {
    // Show confirmation since regeneration uses a generation credit
    const confirmed = window.confirm(
      'This will use 1 generation credit. Are you sure you want to regenerate?'
    );

    if (!confirmed || !currentGeneration) return;

    try {
      // Extract the original items from the current generation
      // We can parse them from the metadata or store them separately
      // For now, we'll show a message
      setToast({
        message: 'Please go back and re-submit your list to regenerate',
        type: 'error',
      });

      // TODO: Store original list items to enable true regeneration
      // await generateMnemonics(originalItems, deckId);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Failed to regenerate mnemonics',
        type: 'error',
      });
    }
  };

  // F-006: Handle flashcard generation
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
    await updateFlashcard(flashcardId, front, back, difficulty);
    setToast({ message: 'Flashcard updated successfully', type: 'success' });
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
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 truncate">{currentDeck.name}</h1>
                {currentDeck.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{currentDeck.description}</p>
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
        {/* Mastery Hero Section */}
        {currentDeck.card_count > 0 && !currentGeneration && (
          <div className="bg-gradient-hero rounded-3xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Progress Ring */}
              <div className="flex flex-col items-center justify-center">
                <ProgressRing
                  value={Math.min(100, Math.max(0, (currentDeck.card_count - (currentDeck.cards_due || 0)) / Math.max(1, currentDeck.card_count) * 100))}
                  size="lg"
                />
                <p className="mt-4 text-lg font-semibold text-gray-700">Mastery Level</p>
              </div>

              {/* Right: Stats Breakdown */}
              <div className="space-y-4">
                {/* Total Cards */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Cards</p>
                      <p className="text-2xl font-bold text-gray-900">{currentDeck.card_count}</p>
                    </div>
                  </div>
                </div>

                {/* Cards Due */}
                <div className="flex items-center justify-between p-4 bg-accent-50 rounded-xl border border-accent-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm text-accent-700">Cards Due</p>
                      <p className="text-2xl font-bold text-accent-900">{currentDeck.cards_due || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Mastered / Learning / New (Mock data) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mastered</span>
                    <span className="text-sm font-semibold text-success-700">
                      {Math.max(0, currentDeck.card_count - (currentDeck.cards_due || 0))} ({Math.round(Math.max(0, currentDeck.card_count - (currentDeck.cards_due || 0)) / Math.max(1, currentDeck.card_count) * 100)}%)
                    </span>
                  </div>
                  <ProgressBar value={Math.max(0, currentDeck.card_count - (currentDeck.cards_due || 0)) / Math.max(1, currentDeck.card_count) * 100} color="success" size="sm" />

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600">Learning</span>
                    <span className="text-sm font-semibold text-accent-700">
                      {Math.min(currentDeck.cards_due || 0, Math.round(currentDeck.card_count * 0.2))} ({Math.round(Math.min(currentDeck.cards_due || 0, currentDeck.card_count * 0.2) / Math.max(1, currentDeck.card_count) * 100)}%)
                    </span>
                  </div>
                  <ProgressBar value={Math.min(currentDeck.cards_due || 0, currentDeck.card_count * 0.2) / Math.max(1, currentDeck.card_count) * 100} color="accent" size="sm" />
                </div>

                {/* Study Now Button */}
                <Button
                  className="w-full mt-4"
                  size="lg"
                  onClick={() => navigate(`/study/${currentDeck.id}`)}
                  disabled={!currentDeck.card_count}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Study Now - {currentDeck.cards_due || 0} cards due
                </Button>
              </div>
            </div>

            {/* Study Stats Card */}
            <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-white/50 rounded-xl border border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Cards Reviewed</p>
                <p className="text-xl font-bold text-gray-900">-</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <p className="text-sm text-gray-600">Correct Rate</p>
                <p className="text-xl font-bold text-gray-900">-</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-xl font-bold text-gray-900">-</p>
                <p className="text-xs text-gray-500">Avg per session</p>
              </div>
            </div>
          </div>
        )}

        {/* F-003: List Input Interface (show when no cards and no mnemonic generation in progress) */}
        {currentDeck.card_count === 0 && !currentGeneration && (
          <div className="space-y-4">
            {/* PDF Upload Button */}
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setIsPDFModalOpen(true)}>
                <FileUp className="w-4 h-4 mr-2" />
                Import from PDF
              </Button>
            </div>

            <ListInputInterface deckId={currentDeck.id} onListSubmit={handleListSubmit} />
          </div>
        )}

        {/* F-004 & F-005: Mnemonic Selection (show when generation exists) */}
        {currentGeneration && (
          <Card className="p-8">
            <MnemonicSelectionView
              generation={currentGeneration}
              onSelect={handleSelectMnemonic}
              onRegenerate={handleRegenerate}
              loading={mnemonicLoading}
            />
          </Card>
        )}

        {/* Show mnemonic error if any */}
        {mnemonicError && !currentGeneration && (
          <Card className="p-6 bg-error-50 border-error-200">
            <p className="text-error-800 font-medium">{mnemonicError}</p>
          </Card>
        )}

        {/* F-006: Flashcards Section (show when cards exist) */}
        {currentDeck.card_count > 0 && (
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

      <PDFUploadModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        deckId={currentDeck.id}
        onSuccess={handlePDFSuccess}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
