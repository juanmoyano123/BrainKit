-- Migration: Create study sessions and card reviews tables
-- Version: 007
-- Date: 2025-12-28
-- Description: Creates tables for tracking study sessions and individual card reviews (F-007: SRS Study System)

-- ============================================================
-- STUDY_SESSIONS TABLE
-- ============================================================
-- This table tracks study sessions for analytics and progress monitoring

CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  cards_reviewed INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  CONSTRAINT cards_reviewed_non_negative CHECK (cards_reviewed >= 0),
  CONSTRAINT duration_non_negative CHECK (duration_seconds IS NULL OR duration_seconds >= 0)
);

-- ============================================================
-- CARD_REVIEWS TABLE
-- ============================================================
-- This table tracks individual flashcard reviews within study sessions

CREATE TABLE IF NOT EXISTS card_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES study_sessions(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quality INTEGER NOT NULL CHECK (quality IN (1, 3, 5)),
  response_time_ms INTEGER,
  previous_interval INTEGER,
  new_interval INTEGER,
  previous_ease_factor FLOAT,
  new_ease_factor FLOAT,
  reviewed_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT response_time_non_negative CHECK (response_time_ms IS NULL OR response_time_ms >= 0)
);

-- ============================================================
-- INDEXES
-- ============================================================
-- Index on user_id for filtering user's sessions
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);

-- Index on deck_id for deck-specific analytics
CREATE INDEX IF NOT EXISTS idx_study_sessions_deck_id ON study_sessions(deck_id);

-- Index on completed_at for recent sessions
CREATE INDEX IF NOT EXISTS idx_study_sessions_completed_at ON study_sessions(completed_at DESC);

-- Index on flashcard_id for card-specific review history
CREATE INDEX IF NOT EXISTS idx_card_reviews_flashcard_id ON card_reviews(flashcard_id);

-- Index on session_id for session reviews
CREATE INDEX IF NOT EXISTS idx_card_reviews_session_id ON card_reviews(session_id);

-- Index on reviewed_at for temporal queries
CREATE INDEX IF NOT EXISTS idx_card_reviews_reviewed_at ON card_reviews(reviewed_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Enable RLS to ensure users can only access their own data
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_reviews ENABLE ROW LEVEL SECURITY;

-- Study Sessions Policies
CREATE POLICY "Users can view own study sessions" ON study_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study sessions" ON study_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study sessions" ON study_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Card Reviews Policies
CREATE POLICY "Users can view own card reviews" ON card_reviews
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own card reviews" ON card_reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- ROLLBACK INSTRUCTIONS
-- ============================================================
-- To rollback this migration, run:
--
-- DROP POLICY IF EXISTS "Users can insert own card reviews" ON card_reviews;
-- DROP POLICY IF EXISTS "Users can view own card reviews" ON card_reviews;
-- DROP POLICY IF EXISTS "Users can update own study sessions" ON study_sessions;
-- DROP POLICY IF EXISTS "Users can insert own study sessions" ON study_sessions;
-- DROP POLICY IF EXISTS "Users can view own study sessions" ON study_sessions;
-- DROP INDEX IF EXISTS idx_card_reviews_reviewed_at;
-- DROP INDEX IF EXISTS idx_card_reviews_session_id;
-- DROP INDEX IF EXISTS idx_card_reviews_flashcard_id;
-- DROP INDEX IF EXISTS idx_study_sessions_completed_at;
-- DROP INDEX IF EXISTS idx_study_sessions_deck_id;
-- DROP INDEX IF EXISTS idx_study_sessions_user_id;
-- DROP TABLE IF EXISTS card_reviews;
-- DROP TABLE IF EXISTS study_sessions;
