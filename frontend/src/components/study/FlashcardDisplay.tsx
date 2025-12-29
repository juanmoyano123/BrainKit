/**
 * Flashcard Display Component
 *
 * Displays a flashcard with flip animation for studying.
 * Shows question on front, answer on back.
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Flashcard } from '@/stores/flashcardStore';

interface FlashcardDisplayProps {
  flashcard: Flashcard;
  currentIndex: number;
  totalCards: number;
  onShowAnswer: () => void;
}

export const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  flashcard,
  currentIndex,
  totalCards,
  onShowAnswer,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onShowAnswer();
    }
  };

  const handleCardClick = () => {
    handleFlip();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">
            Card {currentIndex + 1} of {totalCards}
          </p>
          <p className="text-sm text-gray-600">
            {Math.round(((currentIndex + 1) / totalCards) * 100)}% Complete
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="perspective-1000 cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleFlip();
          }
        }}
        aria-label="Flip flashcard to reveal answer"
      >
        <div
          className={`relative w-full h-96 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card (Question) */}
          <Card
            className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 overflow-hidden ${
              isFlipped ? 'invisible' : 'visible'
            }`}
          >
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide text-center">
              Question
            </p>
            <div className="flex-1 flex items-center justify-center w-full overflow-y-auto px-6">
              <p
                className={`text-gray-900 text-center font-medium break-words ${
                  flashcard.front.length > 100
                    ? 'text-lg'
                    : flashcard.front.length > 50
                      ? 'text-xl'
                      : 'text-2xl'
                }`}
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
              >
                {flashcard.front}
              </p>
            </div>
            <div className="mt-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
              >
                Show Answer
              </Button>
            </div>
          </Card>

          {/* Back of card (Answer) */}
          <Card
            className={`absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-primary-50 border-primary-200 overflow-hidden ${
              isFlipped ? 'visible' : 'invisible'
            }`}
          >
            <p className="text-sm text-primary-700 mb-4 uppercase tracking-wide text-center">
              Answer
            </p>
            <div className="flex-1 flex items-center justify-center w-full overflow-y-auto px-6">
              <p
                className={`text-gray-900 text-center font-medium break-words ${
                  flashcard.back.length > 100
                    ? 'text-lg'
                    : flashcard.back.length > 50
                      ? 'text-xl'
                      : 'text-2xl'
                }`}
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
              >
                {flashcard.back}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 text-center">
                How well did you remember this card?
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Tap to flip hint (only show when not flipped) */}
      {!isFlipped && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Tap card or press Enter/Space to reveal answer
        </p>
      )}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
