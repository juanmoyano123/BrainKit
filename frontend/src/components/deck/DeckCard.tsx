/**
 * DeckCard Component V2
 *
 * Displays a deck summary card with progress tracking.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/progress/ProgressRing';
import { DueBadge } from '@/components/progress/DueBadge';
import { ProgressBar } from '@/components/progress/ProgressBar';
import type { Deck } from '@/stores/deckStore';

interface DeckCardProps {
  deck: Deck;
  onEdit: (deck: Deck) => void;
  onDelete: (deck: Deck) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ deck, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleCardClick = () => {
    navigate(`/decks/${deck.id}`);
  };

  // Mock mastery data (will be replaced with real data from backend)
  const mockMastery = Math.min(100, Math.max(0, (deck.card_count - (deck.cards_due || 0)) / Math.max(1, deck.card_count) * 100));
  const cardsDue = deck.cards_due || 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card
      variant="interactive"
      className="relative p-5 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Due Badge */}
      <div className="absolute top-3 right-3">
        <DueBadge count={cardsDue} />
      </div>

      {/* Deck Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 pr-20 mb-1 truncate">
          {deck.name}
        </h3>
        {deck.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{deck.description}</p>
        )}
      </div>

      {/* Progress Ring and Stats */}
      <div className="flex items-center gap-4 mb-4">
        <ProgressRing value={mockMastery} size="sm" />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{deck.card_count} cards</span>
          </div>
          <p className="text-xs text-gray-500">
            Last studied: {formatDate(deck.last_studied_at)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <ProgressBar value={mockMastery} size="sm" />
      </div>

      {/* Hover Actions */}
      {isHovered && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2 animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(deck);
            }}
            className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all shadow-sm"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(deck);
            }}
            className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-error-50 hover:border-error-300 hover:text-error-700 transition-all shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom gradient stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-progress" />
    </Card>
  );
};
