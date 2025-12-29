/**
 * Authentication Store
 *
 * Zustand store for managing authentication state across the application.
 * Handles user sessions, login, logout, and profile data.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * User Profile Interface
 */
export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  subscription_tier: 'free' | 'premium';
  generation_count_monthly: number;
  generation_reset_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Auth State Interface
 */
interface AuthState {
  // State
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

/**
 * Authentication Store
 *
 * This store:
 * - Manages user authentication state
 * - Persists session to localStorage
 * - Automatically refreshes tokens
 * - Handles session initialization on app load
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      profile: null,
      session: null,
      loading: true,
      initialized: false,

      // Set user
      setUser: (user) => set({ user }),

      // Set profile
      setProfile: (profile) => set({ profile }),

      // Set session
      setSession: (session) => set({ session }),

      // Set loading
      setLoading: (loading) => set({ loading }),

      // Initialize auth state - just trigger getSession, listener handles the rest
      initialize: async () => {
        try {
          // This will trigger onAuthStateChange with INITIAL_SESSION event
          await supabase.auth.getSession();
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({
            user: null,
            profile: null,
            session: null,
            loading: false,
            initialized: true,
          });
        }
      },

      // Sign out
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({
            user: null,
            profile: null,
            session: null,
          });
        } catch (error) {
          console.error('Error signing out:', error);
          throw error;
        }
      },

      // Refresh profile
      refreshProfile: async () => {
        try {
          const { user } = get();
          if (!user) return;

          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profile) {
            set({ profile: profile as UserProfile });
          }
        } catch (error) {
          console.error('Error refreshing profile:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        profile: state.profile,
        session: state.session,
      }),
    }
  )
);

/**
 * Setup auth state listener
 *
 * This should be called once when the app initializes.
 * It listens for auth state changes (login, logout, token refresh)
 * and updates the store accordingly.
 */
export const setupAuthListener = () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event);

    // Handle session events (SIGNED_IN, TOKEN_REFRESHED, INITIAL_SESSION)
    if (session) {
      console.log('Session exists, setting state directly...');

      // Set state immediately with session data - don't wait for profile
      useAuthStore.setState({
        user: session.user,
        session,
        loading: false,
        initialized: true,
      });

      console.log('State set, loading profile in background...');

      // Fetch profile in background (non-blocking)
      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileData) {
          useAuthStore.setState({
            profile: profileData as UserProfile,
          });
          console.log('Profile loaded');
        }
      } catch {
        console.log('Profile fetch failed, continuing without it');
      }
    } else if (event === 'SIGNED_OUT' || !session) {
      // User signed out or no session
      useAuthStore.setState({
        user: null,
        profile: null,
        session: null,
        loading: false,
        initialized: true,
      });
    } else if (event === 'TOKEN_REFRESHED') {
      // Token refreshed
      if (session) {
        useAuthStore.setState({
          session,
        });
      }
    } else if (event === 'USER_UPDATED') {
      // User updated, refresh profile
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        useAuthStore.setState({
          user,
          profile: profile as UserProfile,
          session,
        });
      }
    }
  });
};
