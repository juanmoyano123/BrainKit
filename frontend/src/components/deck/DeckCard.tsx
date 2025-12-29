/**
 * DeckCard Component
 *
 * Displays a deck summary card on the dashboard.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Pencil, Trash2, BookOpen, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { Deck } from '@/stores/deckStore';

interface DeckCardProps {
  deck: Deck;
  onEdit: (deck: Deck) => void;
  onDelete: (deck: Deck) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ deck, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleCardClick = () => {
    navigate(`/decks/${deck.id}`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card variant="interactive" className="relative p-5 cursor-pointer" onClick={handleCardClick}>
      {/* Menu Button */}
      <div className="absolute top-3 right-3">
        <button
          onClick={handleMenuClick}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
              }}
            />
            <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onEdit(deck);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onDelete(deck);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Deck Info */}
      <h3 className="text-lg font-semibold text-gray-900 pr-8 mb-1 truncate">{deck.name}</h3>
      {deck.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{deck.description}</p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>{deck.card_count} cards</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Studied: {formatDate(deck.last_studied_at)}</span>
        </div>
      </div>

      {/* Due indicator - will be implemented in F-007 */}
      {deck.cards_due && deck.cards_due > 0 && (
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
            {deck.cards_due} due
          </span>
        </div>
      )}
    </Card>
  );
};
