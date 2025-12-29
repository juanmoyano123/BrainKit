/**
 * Mnemonic Card Component
 *
 * Displays a single mnemonic option with expand/collapse functionality
 * and selection state. Used in the mnemonic selection interface.
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type MnemonicType = 'acrostic' | 'story' | 'visual';

export interface MnemonicOption {
  type: MnemonicType;
  title: string;
  description: string;
  content: string;
}

interface MnemonicCardProps {
  mnemonic: MnemonicOption;
  isSelected: boolean;
  isExpanded?: boolean;
  onSelect: (type: MnemonicType) => void;
  onToggleExpand?: () => void;
}

export const MnemonicCard: React.FC<MnemonicCardProps> = ({
  mnemonic,
  isSelected,
  isExpanded: controlledExpanded,
  onSelect,
  onToggleExpand,
}) => {
  // Internal state for expansion if not controlled
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const handleSelect = () => {
    onSelect(mnemonic.type);
  };

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        isSelected
          ? 'border-2 border-primary-600 bg-primary-50 shadow-md'
          : 'border-gray-200 hover:border-primary-300',
        !isSelected && 'opacity-100'
      )}
      role="group"
      aria-label={`${mnemonic.title} mnemonic option`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{mnemonic.title}</h3>
            {isSelected && (
              <div
                className="flex items-center justify-center w-6 h-6 bg-primary-600 rounded-full"
                aria-label="Selected"
              >
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">{mnemonic.description}</p>
        </div>
      </div>

      {/* Content Preview/Full */}
      <div className="mb-4">
        <div
          className={cn(
            'text-gray-700 whitespace-pre-wrap',
            !isExpanded && 'line-clamp-3'
          )}
        >
          {mnemonic.content}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handleToggleExpand}
          className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse content' : 'Expand content'}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Read more
            </>
          )}
        </button>

        <Button
          onClick={handleSelect}
          variant={isSelected ? 'primary' : 'secondary'}
          size="sm"
          aria-pressed={isSelected}
          className={cn(
            'transition-all duration-200',
            isSelected && 'ring-2 ring-primary-600 ring-offset-2'
          )}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Selected
            </>
          ) : (
            'Use This Mnemonic'
          )}
        </Button>
      </div>
    </Card>
  );
};
