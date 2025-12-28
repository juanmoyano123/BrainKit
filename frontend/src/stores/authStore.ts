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

      // Initialize auth state
      initialize: async () => {
        try {
          set({ loading: true });

          // Get current session from Supabase
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            // Session exists, fetch user and profile
            const {
              data: { user },
            } = await supabase.auth.getUser();

            if (user) {
              // Fetch profile from database
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

              set({
                user,
                profile: profile as UserProfile,
                session,
                loading: false,
                initialized: true,
              });
            } else {
              set({
                user: null,
                profile: null,
                session: null,
                loading: false,
                initialized: true,
              });
            }
          } else {
            // No session
            set({
              user: null,
              profile: null,
              session: null,
              loading: false,
              initialized: true,
            });
          }
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

    if (event === 'SIGNED_IN' && session) {
      // User signed in
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
          loading: false,
        });
      }
    } else if (event === 'SIGNED_OUT') {
      // User signed out
      useAuthStore.setState({
        user: null,
        profile: null,
        session: null,
        loading: false,
      });
    } else if (event === 'TOKEN_REFRESHED' && session) {
      // Token refreshed
      useAuthStore.setState({
        session,
      });
    } else if (event === 'USER_UPDATED' && session) {
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
