/**
 * Supabase Client Configuration
 *
 * This module initializes the Supabase client for authentication
 * and database operations on the frontend.
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

/**
 * Supabase client instance
 *
 * Uses the anonymous (public) key which respects Row Level Security (RLS).
 * This is the recommended client for frontend applications.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Automatically refresh tokens when they expire
    autoRefreshToken: true,
    // Persist session in localStorage (7 day expiry)
    persistSession: true,
    // Detect session from URL hash (for OAuth callbacks and email links)
    detectSessionInUrl: true,
  },
});

/**
 * Database Types (to be extended as we add more tables)
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          subscription_tier: 'free' | 'premium';
          generation_count_monthly: number;
          generation_reset_date: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'premium';
          generation_count_monthly?: number;
          generation_reset_date?: string | null;
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'premium';
          generation_count_monthly?: number;
          generation_reset_date?: string | null;
        };
      };
    };
  };
}
