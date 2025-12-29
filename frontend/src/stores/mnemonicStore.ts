/**
 * Mnemonic Store
 *
 * Zustand store for managing mnemonic generation state across the application.
 * Handles AI mnemonic generation and selection.
 */

import { create } from 'zustand';
import { useAuthStore } from './authStore';

/**
 * Mnemonic Technique Interface
 */
export interface MnemonicTechnique {
  title: string;
  content: string;
  how_to_use: string;
}

/**
 * Mnemonic Generation Metadata Interface
 */
export interface MnemonicGenerationMetadata {
  generation_time_ms: number;
  item_count: number;
  model: string;
  generation_id?: string;
  remaining_generations?: number;
}

/**
 * Mnemonic Generation Result Interface
 */
export interface MnemonicGenerationResult {
  acrostic: MnemonicTechnique;
  story: MnemonicTechnique;
  visual: MnemonicTechnique;
  metadata: MnemonicGenerationMetadata;
}

/**
 * Generation Limit Info Interface
 */
export interface GenerationLimitInfo {
  can_generate: boolean;
  remaining: number; // -1 for unlimited (premium)
  is_premium: boolean;
  reset_date: string | null;
}

/**
 * Mnemonic State Interface
 */
interface MnemonicState {
  // State
  currentGeneration: MnemonicGenerationResult | null;
  generationLimit: GenerationLimitInfo | null;
  loading: boolean;
  error: string | null;

  // Actions
  setCurrentGeneration: (generation: MnemonicGenerationResult | null) => void;
  setGenerationLimit: (limit: GenerationLimitInfo | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  generateMnemonics: (listItems: string[], deckId?: string) => Promise<MnemonicGenerationResult>;
  selectMnemonic: (generationId: string, selectedType: 'acrostic' | 'story' | 'visual', deckId: string) => Promise<void>;
  checkGenerationLimit: () => Promise<GenerationLimitInfo>;
  clearError: () => void;
  clearCurrentGeneration: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Mnemonic Store
 */
export const useMnemonicStore = create<MnemonicState>((set) => ({
  // Initial state
  currentGeneration: null,
  generationLimit: null,
  loading: false,
  error: null,

  // Setters
  setCurrentGeneration: (currentGeneration) => set({ currentGeneration }),
  setGenerationLimit: (generationLimit) => set({ generationLimit }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  clearCurrentGeneration: () => set({ currentGeneration: null, error: null }),

  // Generate mnemonics
  generateMnemonics: async (listItems: string[], deckId?: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/mnemonics/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          list_items: listItems,
          deck_id: deckId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle specific error cases
        if (response.status === 403) {
          throw new Error(errorData.detail || 'You have reached your monthly generation limit. Upgrade to Premium for unlimited generations.');
        }

        if (response.status === 504) {
          throw new Error('Generation is taking longer than expected. Please try again.');
        }

        throw new Error(errorData.detail || 'Failed to generate mnemonics');
      }

      const result: MnemonicGenerationResult = await response.json();
      set({
        currentGeneration: result,
        loading: false
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate mnemonics';
      set({
        error: errorMessage,
        loading: false
      });
      throw error;
    }
  },

  // Select a mnemonic type
  selectMnemonic: async (
    generationId: string,
    selectedType: 'acrostic' | 'story' | 'visual',
    deckId: string
  ) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/mnemonics/select`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          generation_id: generationId,
          selected_type: selectedType,
          deck_id: deckId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 404) {
          throw new Error('Generation or deck not found');
        }

        throw new Error(errorData.detail || 'Failed to select mnemonic');
      }

      set({ loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to select mnemonic';
      set({
        error: errorMessage,
        loading: false
      });
      throw error;
    }
  },

  // Check generation limit
  checkGenerationLimit: async () => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/mnemonics/check-limit`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to check generation limit');
      }

      const limit: GenerationLimitInfo = await response.json();
      set({ generationLimit: limit });

      return limit;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to check generation limit';
      set({ error: errorMessage });
      throw error;
    }
  },
}));
