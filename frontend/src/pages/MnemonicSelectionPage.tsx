/**
 * Mnemonic Selection Page (F-005)
 *
 * Allows users to view and select from 3 AI-generated mnemonic options.
 * Currently uses mock data until F-004 (AI Mnemonic Generation) is implemented.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDeckStore } from '@/stores/deckStore';
import { MnemonicCard, type MnemonicType, type MnemonicOption } from '@/components/mnemonic/MnemonicCard';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

// Mock mnemonic data - will be replaced with AI-generated content in F-004
const MOCK_MNEMONICS: MnemonicOption[] = [
  {
    type: 'acrostic',
    title: 'Acrostic Technique',
    description: 'Use the first letter of each item to create a memorable phrase',
    content:
      'Every Good Boy Deserves Fudge\n\nE - Elephant\nG - Giraffe\nB - Bear\nD - Dog\nF - Fox\n\nThis acrostic uses the first letter of each animal to create a memorable phrase that musicians often use to remember musical notes.',
  },
  {
    type: 'story',
    title: 'Story Method',
    description: 'Connect items through a vivid narrative',
    content:
      'Imagine an ELEPHANT playing a guitar when suddenly a tall GIRAFFE walks by wearing sunglasses. The giraffe starts dancing with a BEAR who\'s holding balloons. A playful DOG runs between them chasing a clever FOX who\'s carrying a treasure map.\n\nThis story creates vivid visual connections between each animal, making them easier to remember in sequence. The more unusual and vivid the story, the more memorable it becomes!',
  },
  {
    type: 'visual',
    title: 'Visual Association',
    description: 'Create mental images linking items together',
    content:
      '🐘 Elephant → Standing on a tall neck (Giraffe reference)\n🦒 Giraffe → Wearing a bear-shaped hat\n🐻 Bear → Holding a leash with a dog on it\n🐕 Dog → Chasing its tail which looks like a fox\n🦊 Fox → Curled up forming an elephant shape\n\nEach animal visually connects to the next, creating a chain of memorable associations. Picture each image clearly in your mind for best results.',
  },
];

export const MnemonicSelectionPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { currentDeck, loading, error, fetchDeck, updateSelectedMnemonic } = useDeckStore();

  const [selectedType, setSelectedType] = useState<MnemonicType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (deckId) {
      fetchDeck(deckId);
    }
  }, [deckId, fetchDeck]);

  // Set initial selection if deck already has a selected mnemonic
  useEffect(() => {
    if (currentDeck?.selected_mnemonic_type && !selectedType) {
      setSelectedType(currentDeck.selected_mnemonic_type);
    }
  }, [currentDeck, selectedType]);

  const handleSelectMnemonic = (type: MnemonicType) => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType || !deckId) return;

    const selectedMnemonic = MOCK_MNEMONICS.find((m) => m.type === selectedType);
    if (!selectedMnemonic) return;

    setIsSaving(true);
    try {
      await updateSelectedMnemonic(deckId, selectedType, selectedMnemonic.content);
      setToast({ message: 'Mnemonic selection saved successfully!', type: 'success' });

      // Navigate to flashcard generation (F-006) after a brief delay
      setTimeout(() => {
        // TODO: Navigate to flashcard generation page once F-006 is implemented
        setToast({
          message: 'Flashcard generation coming in F-006',
          type: 'success',
        });
      }, 1500);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to save selection',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !currentDeck) {
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate(`/decks/${deckId}`)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Choose Your Mnemonic</h1>
                <p className="text-sm text-gray-600">{currentDeck.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="mb-8 text-center">
          <p className="text-gray-700 text-lg">
            Select the mnemonic technique that works best for you
          </p>
          <p className="text-gray-500 text-sm mt-2">
            You can expand each card to read the full content before selecting
          </p>
        </div>

        {/* Mnemonic Cards Grid */}
        <div
          className="grid gap-6 md:grid-cols-3 mb-8"
          role="radiogroup"
          aria-label="Mnemonic technique selection"
        >
          {MOCK_MNEMONICS.map((mnemonic) => (
            <MnemonicCard
              key={mnemonic.type}
              mnemonic={mnemonic}
              isSelected={selectedType === mnemonic.type}
              onSelect={handleSelectMnemonic}
            />
          ))}
        </div>

        {/* Continue Button - Appears after selection */}
        {selectedType && (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleContinue}
              isLoading={isSaving}
              disabled={isSaving}
              className="min-w-[250px] shadow-lg"
            >
              {isSaving ? (
                'Saving...'
              ) : (
                <>
                  Continue to Flashcards
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Helper text when no selection */}
        {!selectedType && (
          <div className="text-center text-gray-500 text-sm">
            Select a mnemonic technique above to continue
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};
