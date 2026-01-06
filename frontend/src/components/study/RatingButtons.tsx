/**
 * Rating Buttons Component V2
 *
 * Displays rating buttons for SRS flashcard review with new gradients.
 * Hard = Red gradient, Good = Amber gradient, Easy = Emerald gradient
 */

import React, { useEffect } from 'react';
import { XCircle, Circle, CheckCircle } from 'lucide-react';

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
      } else if (e.key === '2' || e.key === '3') {
        onRate(3);
      } else if (e.key === '3' || e.key === '5') {
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
    <div className="mt-8">
      <p className="text-center text-sm text-gray-600 mb-4">
        How well did you know this?
      </p>
      <div className="flex gap-4 max-w-md mx-auto">
        {/* Hard Button */}
        <button
          onClick={() => onRate(1)}
          disabled={disabled}
          className="flex-1 flex flex-col items-center justify-center gap-2 h-24 rounded-xl bg-gradient-to-br from-error-500 to-error-600 text-white hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <XCircle size={28} />
          <div className="text-center">
            <p className="text-base font-semibold">Hard</p>
            <p className="text-xs opacity-90">&lt;1 min</p>
          </div>
          <p className="text-xs opacity-75">[1]</p>
        </button>

        {/* Good Button */}
        <button
          onClick={() => onRate(3)}
          disabled={disabled}
          className="flex-1 flex flex-col items-center justify-center gap-2 h-24 rounded-xl bg-gradient-accent text-white hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Circle size={28} />
          <div className="text-center">
            <p className="text-base font-semibold">Good</p>
            <p className="text-xs opacity-90">&lt;10 min</p>
          </div>
          <p className="text-xs opacity-75">[2]</p>
        </button>

        {/* Easy Button */}
        <button
          onClick={() => onRate(5)}
          disabled={disabled}
          className="flex-1 flex flex-col items-center justify-center gap-2 h-24 rounded-xl bg-gradient-primary text-white hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle size={28} />
          <div className="text-center">
            <p className="text-base font-semibold">Easy</p>
            <p className="text-xs opacity-90">4 days</p>
          </div>
          <p className="text-xs opacity-75">[3]</p>
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        Press [1] [2] [3] for quick rating
      </p>
    </div>
  );
};
