/**
 * Deck Store
 *
 * Zustand store for managing deck state across the application.
 * Handles CRUD operations for decks.
 */

import { create } from 'zustand';
import { useAuthStore } from './authStore';

/**
 * Deck Interface
 */
export interface Deck {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  original_list: string | null;
  selected_mnemonic_type: 'acrostic' | 'story' | 'visual' | null;
  selected_mnemonic_content: string | null;
  card_count: number;
  cards_due?: number;
  last_studied_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Deck State Interface
 */
interface DeckState {
  // State
  decks: Deck[];
  currentDeck: Deck | null;
  loading: boolean;
  error: string | null;

  // Actions
  setDecks: (decks: Deck[]) => void;
  setCurrentDeck: (deck: Deck | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchDecks: () => Promise<void>;
  fetchDeck: (deckId: string) => Promise<Deck | null>;
  createDeck: (name: string, description?: string) => Promise<Deck>;
  updateDeck: (deckId: string, name?: string, description?: string) => Promise<Deck>;
  deleteDeck: (deckId: string) => Promise<void>;
  clearError: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Deck Store
 */
export const useDeckStore = create<DeckState>((set) => ({
  // Initial state
  decks: [],
  currentDeck: null,
  loading: false,
  error: null,

  // Setters
  setDecks: (decks) => set({ decks }),
  setCurrentDeck: (currentDeck) => set({ currentDeck }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Fetch all decks
  fetchDecks: async () => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      set({ error: 'Not authenticated' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/decks`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch decks');
      }

      const data = await response.json();
      set({ decks: data.decks, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch decks',
        loading: false,
      });
    }
  },

  // Fetch single deck
  fetchDeck: async (deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      set({ error: 'Not authenticated' });
      return null;
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/decks/${deckId}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Deck not found');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch deck');
      }

      const deck = await response.json();
      set({ currentDeck: deck, loading: false });
      return deck;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch deck',
        loading: false,
      });
      return null;
    }
  },

  // Create deck
  createDeck: async (name: string, description?: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/decks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create deck');
      }

      const newDeck = await response.json();
      set((state) => ({
        decks: [newDeck, ...state.decks],
        loading: false,
      }));
      return newDeck;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create deck';
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  // Update deck
  updateDeck: async (deckId: string, name?: string, description?: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/decks/${deckId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Deck not found');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update deck');
      }

      const updatedDeck = await response.json();
      set((state) => ({
        decks: state.decks.map((d) => (d.id === deckId ? updatedDeck : d)),
        currentDeck: state.currentDeck?.id === deckId ? updatedDeck : state.currentDeck,
        loading: false,
      }));
      return updatedDeck;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update deck';
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  // Delete deck
  deleteDeck: async (deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/decks/${deckId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Deck not found');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete deck');
      }

      set((state) => ({
        decks: state.decks.filter((d) => d.id !== deckId),
        currentDeck: state.currentDeck?.id === deckId ? null : state.currentDeck,
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete deck';
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },
}));
