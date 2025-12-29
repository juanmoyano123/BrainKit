/**
 * List Input Interface Component
 *
 * F-003: List Input Interface
 * Allows users to paste lists in various formats and validates input
 * before generating mnemonics.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { useMnemonicStore } from '@/stores/mnemonicStore';

interface ListInputInterfaceProps {
  deckId: string;
  onListSubmit?: (items: string[]) => void;
}

// Constants for validation
const MIN_ITEMS = 3;
const MAX_ITEMS = 50;
const MAX_INPUT_LENGTH = 10000;

/**
 * Sanitize input to prevent XSS attacks
 */
function sanitizeInput(input: string): string {
  // Remove HTML tags
  const cleaned = input.replace(/<[^>]+>/g, '');
  return cleaned;
}

/**
 * Parse various list formats into clean array of items
 * Handles: newlines, commas, numbered lists, bullet points, mixed formats
 *
 * Examples:
 * - "Item1\nItem2\nItem3" → ["Item1", "Item2", "Item3"]
 * - "Item1, Item2, Item3" → ["Item1", "Item2", "Item3"]
 * - "1. Item1\n2. Item2" → ["Item1", "Item2"]
 * - "- Item1\n- Item2" → ["Item1", "Item2"]
 * - Mixed formats also supported
 */
function parseList(rawInput: string): string[] {
  const sanitized = sanitizeInput(rawInput);

  // First, split by newlines to handle line-by-line parsing
  const lines = sanitized.split(/\n/);
  const items: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Check if line contains comma-separated items (but not if it's already numbered/bulleted)
    const hasNumbering = /^\d+[\.)]\s*/.test(trimmedLine);
    const hasBullet = /^[-*•]\s*/.test(trimmedLine);

    if (!hasNumbering && !hasBullet && trimmedLine.includes(',')) {
      // Split by comma
      const commaItems = trimmedLine
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      items.push(...commaItems);
    } else {
      // Remove numbering or bullets and add single item
      const cleaned = trimmedLine
        .replace(/^\d+[\.)]\s*/, '') // Remove "1. " or "1) "
        .replace(/^[-*•]\s*/, '') // Remove "- " or "* " or "• "
        .trim();

      if (cleaned) {
        items.push(cleaned);
      }
    }
  }

  // Deduplicate items (case-insensitive) while preserving original case
  const seen = new Set<string>();
  const uniqueItems = items.filter((item) => {
    const lowerItem = item.toLowerCase();
    if (seen.has(lowerItem)) {
      return false;
    }
    seen.add(lowerItem);
    return true;
  });

  return uniqueItems;
}

export const ListInputInterface: React.FC<ListInputInterfaceProps> = ({ onListSubmit }) => {
  const { loading: mnemonicLoading } = useMnemonicStore();
  const [rawInput, setRawInput] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Parse input whenever it changes
  useEffect(() => {
    if (!rawInput.trim()) {
      setItems([]);
      setError(null);
      return;
    }

    const parsedItems = parseList(rawInput);
    setItems(parsedItems);

    // Clear error when user is typing
    if (error) {
      setError(null);
    }
  }, [rawInput]);

  /**
   * Validate items before submission
   */
  const validateItems = useCallback((): boolean => {
    if (items.length === 0) {
      setError('Please paste a list of items to memorize');
      return false;
    }

    if (items.length < MIN_ITEMS) {
      setError(`Please enter at least ${MIN_ITEMS} items to generate meaningful mnemonics`);
      return false;
    }

    if (items.length > MAX_ITEMS) {
      setError(
        `Maximum ${MAX_ITEMS} items per list. You entered ${items.length} items. Consider splitting into multiple decks.`
      );
      return false;
    }

    return true;
  }, [items]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async () => {
    if (!validateItems()) {
      return;
    }

    setError(null);

    try {
      if (onListSubmit) {
        await onListSubmit(items);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate mnemonics');
    }
  }, [items, validateItems, onListSubmit]);

  /**
   * Handle input change with length validation
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > MAX_INPUT_LENGTH) {
      setError(`Input is too large. Maximum ${MAX_INPUT_LENGTH} characters allowed.`);
      return;
    }

    setRawInput(value);
  }, []);

  // Determine if button should be disabled
  const isButtonDisabled =
    items.length === 0 || items.length < MIN_ITEMS || items.length > MAX_ITEMS || mnemonicLoading;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Items to Memorize</h3>
          <p className="text-sm text-gray-600">
            Paste your list here. We support various formats: newlines, commas, numbered lists, or
            bullet points.
          </p>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <label htmlFor="list-input" className="block text-sm font-medium text-gray-700">
            Your List
          </label>
          <Textarea
            id="list-input"
            value={rawInput}
            onChange={handleInputChange}
            error={!!error}
            placeholder="Paste your list here... (e.g., medication names, protocol steps, vocabulary)&#10;&#10;Examples:&#10;Epinephrine&#10;Amiodarone&#10;Lidocaine&#10;&#10;Or:&#10;1. Madrid&#10;2. Paris&#10;3. London&#10;&#10;Or:&#10;- Apple, Banana, Cherry"
            rows={8}
            className="font-mono text-sm resize-y"
            aria-describedby={error ? 'list-input-error' : 'list-input-counter'}
            aria-invalid={!!error}
          />
        </div>

        {/* Item Counter or Error Message */}
        <div className="flex items-center justify-between">
          {error ? (
            <p
              id="list-input-error"
              className="text-sm text-error-600 font-medium"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          ) : (
            <p
              id="list-input-counter"
              className={`text-sm font-medium ${
                items.length === 0
                  ? 'text-gray-500'
                  : items.length < MIN_ITEMS || items.length > MAX_ITEMS
                    ? 'text-warning-600'
                    : 'text-success-600'
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              {items.length === 0
                ? 'No items detected'
                : `${items.length} ${items.length === 1 ? 'item' : 'items'} detected`}
            </p>
          )}
        </div>

        {/* Preview of parsed items (when there are items) */}
        {items.length > 0 && items.length <= 10 && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Parsed items:</p>
            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        )}

        {items.length > 10 && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">
              Parsed items preview (showing first 10):
            </p>
            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
              {items.slice(0, 10).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
            <p className="text-xs text-gray-500 mt-2">...and {items.length - 10} more items</p>
          </div>
        )}

        {/* Generate Button */}
        <Button onClick={handleSubmit} disabled={isButtonDisabled} className="w-full" size="lg">
          {mnemonicLoading ? (
            <>
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating mnemonics...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Mnemonics
            </>
          )}
        </Button>

        {/* Helpful hints */}
        <div className="bg-primary-50 rounded-lg p-3 border border-primary-100">
          <p className="text-xs text-primary-900 font-medium mb-1">💡 Tips:</p>
          <ul className="text-xs text-primary-800 space-y-1 list-disc list-inside">
            <li>
              Minimum {MIN_ITEMS} items, maximum {MAX_ITEMS} items per list
            </li>
            <li>We'll automatically detect your list format</li>
            <li>For best results, use clear, concise terms</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
