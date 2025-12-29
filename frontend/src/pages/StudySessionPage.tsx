/**
 * Study Session Page
 *
 * Main page for studying flashcards with SRS algorithm.
 * Implements F-007 (SRS Study System).
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStudyStore } from '@/stores/studyStore';
import type { SessionSummary } from '@/stores/studyStore';
import { Button } from '@/components/ui/Button';
import { FlashcardDisplay } from '@/components/study/FlashcardDisplay';
import { RatingButtons } from '@/components/study/RatingButtons';
import { SessionComplete } from '@/components/study/SessionComplete';
import { Toast } from '@/components/ui/Toast';

export const StudySessionPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const {
    dueCards,
    currentCardIndex,
    isStudying,
    loading,
    error,
    startSession,
    reviewCard,
    completeSession,
    nextCard,
    resetSession,
  } = useStudyStore();

  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Start session on mount
  useEffect(() => {
    if (deckId) {
      startSession(deckId).catch((err) => {
        setToast({
          message: err instanceof Error ? err.message : 'Failed to start session',
          type: 'error',
        });
      });
    }

    // Cleanup on unmount
    return () => {
      resetSession();
    };
  }, [deckId, startSession, resetSession]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRate = async (quality: 1 | 3 | 5) => {
    const currentCard = dueCards[currentCardIndex];
    if (!currentCard) return;

    try {
      await reviewCard(currentCard.id, quality);

      // Check if this was the last card
      if (currentCardIndex >= dueCards.length - 1) {
        // Complete the session
        const sessionSummary = await completeSession();
        setSummary(sessionSummary);
        setSessionComplete(true);
      } else {
        // Move to next card
        nextCard();
        setShowAnswer(false);
      }
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to review card',
        type: 'error',
      });
    }
  };

  const handleDone = () => {
    navigate(`/decks/${deckId}`);
  };

  const handleStudyMore = () => {
    // Restart session
    setSessionComplete(false);
    setSummary(null);
    if (deckId) {
      startSession(deckId).catch((err) => {
        setToast({
          message: err instanceof Error ? err.message : 'Failed to start session',
          type: 'error',
        });
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate(`/decks/${deckId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deck
          </Button>
        </div>
      </div>
    );
  }

  if (sessionComplete && summary) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <SessionComplete
          summary={summary}
          onDone={handleDone}
          onStudyMore={summary.cards_remaining > 0 ? handleStudyMore : undefined}
        />
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    );
  }

  if (!isStudying || dueCards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No cards due for review</p>
          <Button onClick={() => navigate(`/decks/${deckId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deck
          </Button>
        </div>
      </div>
    );
  }

  const currentCard = dueCards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                const confirmExit = window.confirm(
                  'Are you sure you want to exit? Your progress will be saved.'
                );
                if (confirmExit) {
                  navigate(`/decks/${deckId}`);
                }
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Study Session
            </Button>
            <div className="text-sm text-gray-600">Studying Deck</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FlashcardDisplay
          flashcard={currentCard}
          currentIndex={currentCardIndex}
          totalCards={dueCards.length}
          onShowAnswer={handleShowAnswer}
        />

        <RatingButtons onRate={handleRate} disabled={loading} showButtons={showAnswer} />
      </main>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
