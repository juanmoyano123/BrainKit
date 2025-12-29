/**
 * Rating Buttons Component
 *
 * Displays rating buttons for SRS flashcard review.
 * Allows users to rate cards as Hard (1), Good (3), or Easy (5).
 */

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface RatingButtonsProps {
  onRate: (quality: 1 | 3 | 5) => void;
  disabled?: boolean;
  showButtons: boolean;
}

export const RatingButtons: React.FC<RatingButtonsProps> = ({
  onRate,
  disabled = false,
  showButtons,
}) => {
  // Keyboard shortcuts
  useEffect(() => {
    if (!showButtons || disabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '1') {
        onRate(1);
      } else if (e.key === '3') {
        onRate(3);
      } else if (e.key === '5') {
        onRate(5);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [onRate, showButtons, disabled]);

  if (!showButtons) {
    return null;
  }

  return (
    <div className="mt-6">
      <p className="text-center text-sm text-gray-600 mb-4">
        Rate how well you remembered this card
      </p>
      <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
        {/* Hard Button */}
        <Button
          variant="secondary"
          onClick={() => onRate(1)}
          disabled={disabled}
          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 w-full h-auto py-3"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold">1</span>
            <span className="text-sm font-medium">Hard</span>
            <span className="text-xs opacity-75">Review tomorrow</span>
          </div>
        </Button>

        {/* Good Button */}
        <Button
          variant="primary"
          onClick={() => onRate(3)}
          disabled={disabled}
          className="w-full h-auto py-3"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold">3</span>
            <span className="text-sm font-medium">Good</span>
            <span className="text-xs opacity-75">Normal interval</span>
          </div>
        </Button>

        {/* Easy Button */}
        <Button
          variant="secondary"
          onClick={() => onRate(5)}
          disabled={disabled}
          className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 w-full h-auto py-3"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold">5</span>
            <span className="text-sm font-medium">Easy</span>
            <span className="text-xs opacity-75">Longer interval</span>
          </div>
        </Button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-3">
        Press 1, 3, or 5 on your keyboard for quick rating
      </p>
    </div>
  );
};
