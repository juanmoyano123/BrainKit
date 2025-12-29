/**
 * Study Store
 *
 * Zustand store for managing study session state across the application.
 * Handles SRS study sessions, card reviews, and session progress.
 */

import { create } from 'zustand';
import { useAuthStore } from './authStore';
import type { Flashcard } from './flashcardStore';

/**
 * Study Session Interface
 */
export interface StudySession {
  id: string;
  deck_id: string;
  cards_reviewed: number;
  duration_seconds: number | null;
  started_at: string;
  completed_at: string | null;
}

/**
 * Session Summary Interface
 */
export interface SessionSummary {
  session_id: string;
  deck_id: string;
  cards_reviewed: number;
  duration_seconds: number | null;
  cards_remaining: number;
  started_at: string;
  completed_at: string | null;
}

/**
 * Study State Interface
 */
interface StudyState {
  // State
  currentSession: StudySession | null;
  dueCards: Flashcard[];
  currentCardIndex: number;
  isStudying: boolean;
  loading: boolean;
  error: string | null;
  sessionStartTime: number | null;
  cardStartTime: number | null;

  // Actions
  setCurrentSession: (session: StudySession | null) => void;
  setDueCards: (cards: Flashcard[]) => void;
  setCurrentCardIndex: (index: number) => void;
  setIsStudying: (studying: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // API operations
  startSession: (deckId: string) => Promise<void>;
  getDueCards: (deckId: string) => Promise<Flashcard[]>;
  reviewCard: (flashcardId: string, quality: 1 | 3 | 5) => Promise<void>;
  completeSession: () => Promise<SessionSummary>;
  nextCard: () => void;
  resetSession: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Study Store
 */
export const useStudyStore = create<StudyState>((set, get) => ({
  // Initial state
  currentSession: null,
  dueCards: [],
  currentCardIndex: 0,
  isStudying: false,
  loading: false,
  error: null,
  sessionStartTime: null,
  cardStartTime: null,

  // Setters
  setCurrentSession: (session) => set({ currentSession: session }),
  setDueCards: (cards) => set({ dueCards: cards }),
  setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
  setIsStudying: (studying) => set({ isStudying: studying }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Start a study session
  startSession: async (deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      set({ error: 'Not authenticated' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/study/${deckId}/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to start study session');
      }

      const data = await response.json();

      if (data.cards_due_count === 0) {
        set({
          loading: false,
          error: 'No cards due for review',
          currentSession: null,
          dueCards: [],
          isStudying: false,
        });
        return;
      }

      set({
        currentSession: data.session_id
          ? ({ id: data.session_id, deck_id: deckId } as StudySession)
          : null,
        dueCards: data.due_cards,
        currentCardIndex: 0,
        isStudying: true,
        loading: false,
        sessionStartTime: Date.now(),
        cardStartTime: Date.now(),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start study session',
        loading: false,
      });
      throw error;
    }
  },

  // Get due cards without starting a session
  getDueCards: async (deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/study/${deckId}/due`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch due cards');
      }

      const data = await response.json();
      set({ loading: false });
      return data.due_cards;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch due cards',
        loading: false,
      });
      throw error;
    }
  },

  // Review a card
  reviewCard: async (flashcardId: string, quality: 1 | 3 | 5) => {
    const { session } = useAuthStore.getState();
    const { currentSession, cardStartTime } = get();

    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ loading: true, error: null });

    try {
      // Calculate response time
      const responseTime = cardStartTime ? Date.now() - cardStartTime : null;

      const response = await fetch(`${API_BASE_URL}/api/v1/study/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          flashcard_id: flashcardId,
          quality,
          session_id: currentSession?.id || null,
          response_time_ms: responseTime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to review card');
      }

      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to review card',
        loading: false,
      });
      throw error;
    }
  },

  // Move to next card
  nextCard: () => {
    const { currentCardIndex, dueCards } = get();

    if (currentCardIndex < dueCards.length - 1) {
      set({
        currentCardIndex: currentCardIndex + 1,
        cardStartTime: Date.now(),
      });
    }
  },

  // Complete the session
  completeSession: async () => {
    const { session } = useAuthStore.getState();
    const { currentSession, sessionStartTime } = get();

    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    if (!currentSession?.id) {
      throw new Error('No active session');
    }

    set({ loading: true, error: null });

    try {
      // Calculate session duration
      const durationSeconds = sessionStartTime
        ? Math.floor((Date.now() - sessionStartTime) / 1000)
        : null;

      const response = await fetch(`${API_BASE_URL}/api/v1/study/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          session_id: currentSession.id,
          duration_seconds: durationSeconds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to complete session');
      }

      const data = await response.json();
      set({ loading: false, isStudying: false });

      return data.summary;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to complete session',
        loading: false,
      });
      throw error;
    }
  },

  // Reset session state
  resetSession: () => {
    set({
      currentSession: null,
      dueCards: [],
      currentCardIndex: 0,
      isStudying: false,
      sessionStartTime: null,
      cardStartTime: null,
      error: null,
    });
  },
}));
