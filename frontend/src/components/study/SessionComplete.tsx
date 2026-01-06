/**
 * Session Complete Component V2
 *
 * Displays session completion summary with streak badge.
 */

import React from 'react';
import { Trophy, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StreakBadge } from '@/components/progress/StreakBadge';
import type { SessionSummary } from '@/stores/studyStore';

interface SessionCompleteProps {
  summary: SessionSummary;
  onDone: () => void;
  onStudyMore?: () => void;
}

export const SessionComplete: React.FC<SessionCompleteProps> = ({
  summary,
  onDone,
  onStudyMore,
}) => {
  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return 'N/A';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Mock streak data (will be replaced with real data)
  const mockStreak = 13;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-hero rounded-3xl p-8">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Great job! Session complete
        </h2>
        <p className="text-center text-gray-600 mb-6">
          You've completed today's review
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Cards Reviewed */}
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <CheckCircle2 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900 mb-1 font-mono">
              {summary.cards_reviewed}
            </p>
            <p className="text-xs text-gray-600">Cards Reviewed</p>
          </div>

          {/* Correct Rate (Mock) */}
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <div className="w-6 h-6 bg-success-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-success-700 text-xs font-bold">✓</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1 font-mono">
              {Math.round((summary.cards_reviewed / Math.max(1, summary.cards_reviewed)) * 87)}%
            </p>
            <p className="text-xs text-gray-600">Correct Rate</p>
          </div>

          {/* Time Spent */}
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <Clock className="w-6 h-6 text-accent-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900 mb-1 font-mono">
              {formatDuration(summary.duration_seconds)}
            </p>
            <p className="text-xs text-gray-600">Total Time</p>
          </div>
        </div>

        {/* Streak Banner */}
        <div className="bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-300 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-center gap-3">
            <p className="text-lg font-semibold text-accent-900">
              Your streak is now
            </p>
            <StreakBadge count={mockStreak} size="md" variant="active" showAnimation={true} />
          </div>
          <p className="text-center text-sm text-accent-700 mt-2">
            Keep it up! Study tomorrow to maintain your streak
          </p>
        </div>

        {/* Remaining Cards Info */}
        {summary.cards_remaining > 0 ? (
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-primary-800 text-center">
              <strong>{summary.cards_remaining}</strong> card
              {summary.cards_remaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
        ) : (
          <div className="bg-success-50 border border-success-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-success-800 text-center font-medium">
              All cards reviewed! Check back later for your next review.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onDone} size="lg">
            Back to Deck
          </Button>
          {summary.cards_remaining > 0 && onStudyMore && (
            <Button onClick={onStudyMore} size="lg">
              Continue Studying
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
