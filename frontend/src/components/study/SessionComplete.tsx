/**
 * Session Complete Component
 *
 * Displays session completion summary with statistics.
 */

import React from 'react';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Session Complete!</h2>
        <p className="text-center text-gray-600 mb-8">
          Great work! You've completed your study session.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Cards Reviewed */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{summary.cards_reviewed}</p>
            <p className="text-sm text-gray-600">Cards Reviewed</p>
          </div>

          {/* Time Spent */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {formatDuration(summary.duration_seconds)}
            </p>
            <p className="text-sm text-gray-600">Time Spent</p>
          </div>

          {/* Cards Remaining */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex justify-center mb-2">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{summary.cards_remaining}</p>
            <p className="text-sm text-gray-600">Cards Remaining</p>
          </div>
        </div>

        {/* Next Review Info */}
        {summary.cards_remaining > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 text-center">
              <strong>{summary.cards_remaining}</strong> card
              {summary.cards_remaining !== 1 ? 's' : ''} will be due for review soon
            </p>
          </div>
        )}

        {summary.cards_remaining === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 text-center font-medium">
              All cards reviewed! Check back later for your next review.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onDone}>
            Back to Deck
          </Button>
          {summary.cards_remaining > 0 && onStudyMore && (
            <Button onClick={onStudyMore}>Study More</Button>
          )}
        </div>
      </Card>
    </div>
  );
};
