/**
 * EmptyDeckState Component
 *
 * Displayed when user has no decks.
 */

import React from 'react';
import { FolderPlus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyDeckStateProps {
  onCreateDeck: () => void;
}

export const EmptyDeckState: React.FC<EmptyDeckStateProps> = ({ onCreateDeck }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Create your first study deck
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Organize your learning materials into decks. Each deck can contain
        flashcards generated from AI mnemonics.
      </p>
      <Button onClick={onCreateDeck}>
        <FolderPlus className="w-5 h-5 mr-2" />
        Create Deck
      </Button>
    </div>
  );
};
