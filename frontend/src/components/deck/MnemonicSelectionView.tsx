/**
 * Mnemonic Selection View Component
 *
 * F-004 & F-005: Display AI-generated mnemonics and allow selection
 * Shows three mnemonic techniques (acrostic, story, visual) for user to choose from.
 */

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { MnemonicGenerationResult, MnemonicTechnique } from '@/stores/mnemonicStore';

interface MnemonicSelectionViewProps {
  generation: MnemonicGenerationResult;
  onSelect: (selectedType: 'acrostic' | 'story' | 'visual') => void;
  onRegenerate?: () => void;
  loading?: boolean;
}

/**
 * Single mnemonic card component
 */
const MnemonicCard: React.FC<{
  type: 'acrostic' | 'story' | 'visual';
  technique: MnemonicTechnique;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
}> = ({ type, technique, isSelected, isExpanded, onToggleExpand, onSelect }) => {
  const typeLabels = {
    acrostic: 'Acrostic',
    story: 'Story',
    visual: 'Visual Pattern',
  };

  const typeDescriptions = {
    acrostic: 'First letters form a memorable phrase',
    story: 'Narrative connecting all items',
    visual: 'Spatial/visual memory technique',
  };

  const typeIcons = {
    acrostic: '🔤',
    story: '📖',
    visual: '🎨',
  };

  return (
    <Card
      className={`p-4 transition-all cursor-pointer ${
        isSelected
          ? 'ring-2 ring-primary-500 border-primary-500 bg-primary-50'
          : 'hover:border-gray-400'
      }`}
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl" aria-hidden="true">
                {typeIcons[type]}
              </span>
              <h3 className="text-lg font-semibold text-gray-900">{typeLabels[type]}</h3>
              {isSelected && (
                <div className="ml-auto flex items-center gap-1 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  <Check className="w-3 h-3" />
                  Selected
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">{typeDescriptions[type]}</p>
          </div>
        </div>

        {/* Title */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="font-medium text-gray-900">{technique.title}</p>
        </div>

        {/* Expandable Content */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show details
              </>
            )}
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-3 animate-in slide-in-from-top-2">
              {/* Mnemonic Content */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">The Mnemonic:</p>
                <div className="max-h-[300px] overflow-y-auto">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {technique.content}
                  </p>
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-primary-50 rounded-lg p-3 border border-primary-100">
                <p className="text-xs font-medium text-primary-900 mb-1">💡 How to use this:</p>
                <p className="text-sm text-primary-800">{technique.how_to_use}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

/**
 * Main component
 */
export const MnemonicSelectionView: React.FC<MnemonicSelectionViewProps> = ({
  generation,
  onSelect,
  onRegenerate,
  loading = false,
}) => {
  const [selectedType, setSelectedType] = useState<'acrostic' | 'story' | 'visual' | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(['acrostic']));

  const handleSelect = (type: 'acrostic' | 'story' | 'visual') => {
    setSelectedType(type);
    // Auto-expand the selected card
    setExpandedCards((prev) => new Set([...prev, type]));
  };

  const toggleExpand = (type: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const handleConfirmSelection = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">✨ Your Mnemonics are Ready!</h2>
        <p className="text-gray-600">
          Choose the technique that works best for you. You can expand each to see full details.
        </p>
        {generation.metadata.remaining_generations !== undefined && (
          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
            {generation.metadata.remaining_generations === -1 ? (
              <span className="text-gray-700">
                ⭐ <strong>Premium:</strong> Unlimited generations
              </span>
            ) : (
              <span className="text-gray-700">
                <strong>{generation.metadata.remaining_generations}</strong> generation
                {generation.metadata.remaining_generations !== 1 ? 's' : ''} remaining this month
              </span>
            )}
          </div>
        )}
      </div>

      {/* Mnemonic Cards */}
      <div
        className="grid gap-4 md:grid-cols-3"
        role="radiogroup"
        aria-label="Mnemonic technique selection"
      >
        <MnemonicCard
          type="acrostic"
          technique={generation.acrostic}
          isSelected={selectedType === 'acrostic'}
          isExpanded={expandedCards.has('acrostic')}
          onToggleExpand={() => toggleExpand('acrostic')}
          onSelect={() => handleSelect('acrostic')}
        />

        <MnemonicCard
          type="story"
          technique={generation.story}
          isSelected={selectedType === 'story'}
          isExpanded={expandedCards.has('story')}
          onToggleExpand={() => toggleExpand('story')}
          onSelect={() => handleSelect('story')}
        />

        <MnemonicCard
          type="visual"
          technique={generation.visual}
          isSelected={selectedType === 'visual'}
          isExpanded={expandedCards.has('visual')}
          onToggleExpand={() => toggleExpand('visual')}
          onSelect={() => handleSelect('visual')}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        {onRegenerate && (
          <Button variant="secondary" onClick={onRegenerate} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate Options
          </Button>
        )}

        <Button
          onClick={handleConfirmSelection}
          disabled={!selectedType || loading}
          size="lg"
          className="px-8"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Continue with Selected
              {selectedType && ` (${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)})`}
            </>
          )}
        </Button>
      </div>

      {/* Generation Info */}
      <div className="text-center text-xs text-gray-500">
        Generated in {(generation.metadata.generation_time_ms / 1000).toFixed(1)}s using{' '}
        {generation.metadata.model}
      </div>
    </div>
  );
};
