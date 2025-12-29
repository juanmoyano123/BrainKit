/**
 * FlashcardPreview Component
 *
 * Displays a single flashcard with flip animation on click.
 * Implements F-006 Scenario 4: View generated flashcards with flip interaction.
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import type { Flashcard } from '@/stores/flashcardStore';

interface FlashcardPreviewProps {
  flashcard: Flashcard;
  showControls?: boolean;
  onEdit?: (flashcard: Flashcard) => void;
  onDelete?: (flashcard: Flashcard) => void;
}

export const FlashcardPreview: React.FC<FlashcardPreviewProps> = ({
  flashcard,
  showControls = true,
  onEdit,
  onDelete,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="relative group">
      {/* Flip Container */}
      <div
        className="relative cursor-pointer preserve-3d"
        style={{
          perspective: '1000px',
          minHeight: '200px',
        }}
        onClick={handleFlip}
      >
        <div
          className={`relative w-full transition-transform duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}
        >
          {/* Front Side */}
          <Card
            className={`absolute w-full p-6 backface-hidden ${
              isFlipped ? 'invisible' : 'visible'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              minHeight: '200px',
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase">Question</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(flashcard.difficulty)}`}>
                  {flashcard.difficulty}
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-gray-900 text-center">
                  {flashcard.front}
                </p>
              </div>
              <div className="text-center text-sm text-gray-400 mt-4">
                Click to flip
              </div>
            </div>
          </Card>

          {/* Back Side */}
          <Card
            className={`absolute w-full p-6 backface-hidden ${
              isFlipped ? 'visible' : 'invisible'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              minHeight: '200px',
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase">Answer</span>
                {flashcard.is_edited && (
                  <span className="text-xs text-gray-500 italic">Edited</span>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-gray-900 text-center">
                  {flashcard.back}
                </p>
              </div>
              <div className="text-center text-sm text-gray-400 mt-4">
                Click to flip back
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Controls - Only visible on hover */}
      {showControls && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(flashcard);
              }}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm"
              aria-label="Edit flashcard"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(flashcard);
              }}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-red-50 shadow-sm"
              aria-label="Delete flashcard"
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
