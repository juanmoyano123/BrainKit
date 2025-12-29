/**
 * Flashcard Store
 *
 * Zustand store for managing flashcard state across the application.
 * Handles flashcard generation, CRUD operations, and SRS data.
 */

import { create } from 'zustand';
import { useAuthStore } from './authStore';

/**
 * Flashcard Interface
 */
export interface Flashcard {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';

  // SRS fields
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string | null;
  last_reviewed_at: string | null;

  // Metadata
  is_edited: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Flashcard State Interface
 */
interface FlashcardState {
  // State
  flashcards: Flashcard[];
  loading: boolean;
  generating: boolean;
  error: string | null;

  // Actions
  setFlashcards: (flashcards: Flashcard[]) => void;
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // API operations
  fetchFlashcards: (deckId: string) => Promise<void>;
  generateFlashcards: (deckId: string) => Promise<Flashcard[]>;
  createFlashcard: (
    deckId: string,
    front: string,
    back: string,
    difficulty?: string
  ) => Promise<Flashcard>;
  updateFlashcard: (
    flashcardId: string,
    front?: string,
    back?: string,
    difficulty?: string
  ) => Promise<Flashcard>;
  deleteFlashcard: (flashcardId: string) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Flashcard Store
 */
export const useFlashcardStore = create<FlashcardState>((set) => ({
  // Initial state
  flashcards: [],
  loading: false,
  generating: false,
  error: null,

  // Setters
  setFlashcards: (flashcards) => set({ flashcards }),
  setLoading: (loading) => set({ loading }),
  setGenerating: (generating) => set({ generating }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Fetch flashcards for a deck
  fetchFlashcards: async (deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      set({ error: 'Not authenticated' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/flashcards/deck/${deckId}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch flashcards');
      }

      const data = await response.json();
      set({ flashcards: data.flashcards, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch flashcards',
        loading: false,
      });
    }
  },

  // Generate flashcards using AI
  generateFlashcards: async (deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ generating: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/flashcards/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ deck_id: deckId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate flashcards');
      }

      const data = await response.json();
      set({ flashcards: data.flashcards, generating: false });
      return data.flashcards;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate flashcards';
      set({ generating: false, error: errorMessage });
      throw error;
    }
  },

  // Create flashcard manually
  createFlashcard: async (
    deckId: string,
    front: string,
    back: string,
    difficulty: string = 'medium'
  ) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/flashcards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ deck_id: deckId, front, back, difficulty }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create flashcard');
      }

      const newFlashcard = await response.json();
      set((state) => ({
        flashcards: [...state.flashcards, newFlashcard],
        loading: false,
      }));
      return newFlashcard;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // Update flashcard
  updateFlashcard: async (
    flashcardId: string,
    front?: string,
    back?: string,
    difficulty?: string
  ) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/flashcards/${flashcardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ front, back, difficulty }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update flashcard');
      }

      const updatedFlashcard = await response.json();
      set((state) => ({
        flashcards: state.flashcards.map((f) => (f.id === flashcardId ? updatedFlashcard : f)),
        loading: false,
      }));
      return updatedFlashcard;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // Delete flashcard
  deleteFlashcard: async (flashcardId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/flashcards/${flashcardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete flashcard');
      }

      set((state) => ({
        flashcards: state.flashcards.filter((f) => f.id !== flashcardId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
