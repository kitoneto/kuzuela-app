-- Migration: 002_add_language_support.sql
-- Adds multi-language support tables to Kuzuela
-- Created: 2024-01-01

-- ============================================================
-- TABLE: languages
-- Stores all available languages in the platform
-- ============================================================
CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100) NOT NULL,
  flag VARCHAR(10) NOT NULL,
  rtl BOOLEAN NOT NULL DEFAULT FALSE,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  has_lessons BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_languages_code ON languages(code);
CREATE INDEX IF NOT EXISTS idx_languages_available ON languages(is_available);

-- RLS
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read languages" ON languages FOR SELECT USING (true);
CREATE POLICY "Only admins can manage languages" ON languages FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Seed data
INSERT INTO languages (code, name, native_name, flag, rtl, is_available, has_lessons) VALUES
  ('pt', 'Portuguese', 'Português', '🇵🇹', false, true, true),
  ('pt-BR', 'Portuguese (Brazil)', 'Português (Brasil)', '🇧🇷', false, true, true),
  ('en', 'English', 'English', '🇬🇧', false, true, true),
  ('es', 'Spanish', 'Español', '🇪🇸', false, true, true),
  ('fr', 'French', 'Français', '🇫🇷', false, true, true),
  ('de', 'German', 'Deutsch', '🇩🇪', false, true, false),
  ('it', 'Italian', 'Italiano', '🇮🇹', false, true, false),
  ('zh', 'Chinese', '中文', '🇨🇳', false, false, false),
  ('zh-TW', 'Chinese (Traditional)', '繁體中文', '🇹🇼', false, false, false),
  ('ja', 'Japanese', '日本語', '🇯🇵', false, false, false),
  ('ko', 'Korean', '한국어', '🇰🇷', false, false, false),
  ('ar', 'Arabic', 'العربية', '🇸🇦', true, false, false),
  ('ru', 'Russian', 'Русский', '🇷🇺', false, false, false),
  ('hi', 'Hindi', 'हिन्दी', '🇮🇳', false, false, false),
  ('nl', 'Dutch', 'Nederlands', '🇳🇱', false, false, false)
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- TABLE: proficiency_levels
-- CEFR proficiency levels
-- ============================================================
CREATE TABLE IF NOT EXISTS proficiency_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(30) UNIQUE NOT NULL,
  cefr VARCHAR(2) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE proficiency_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read proficiency levels" ON proficiency_levels FOR SELECT USING (true);

INSERT INTO proficiency_levels (code, cefr, name, description, sort_order) VALUES
  ('beginner', 'A1', 'Beginner', 'Can understand and use familiar everyday expressions', 1),
  ('elementary', 'A2', 'Elementary', 'Can understand sentences and frequently used expressions', 2),
  ('intermediate', 'B1', 'Intermediate', 'Can deal with most situations likely to arise whilst travelling', 3),
  ('upper-intermediate', 'B2', 'Upper-Intermediate', 'Can understand the main ideas of complex text', 4),
  ('advanced', 'C1', 'Advanced', 'Can express ideas fluently and spontaneously', 5),
  ('proficient', 'C2', 'Proficient', 'Can understand with ease virtually everything heard or read', 6)
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- TABLE: user_language_preferences
-- Stores the 4-dimension language preferences per user
-- ============================================================
CREATE TABLE IF NOT EXISTS user_language_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  native_language VARCHAR(10) NOT NULL REFERENCES languages(code),
  interface_language VARCHAR(10) NOT NULL REFERENCES languages(code),
  explanation_language VARCHAR(10) NOT NULL REFERENCES languages(code),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_lang_prefs_user ON user_language_preferences(user_id);

-- RLS
ALTER TABLE user_language_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own preferences" ON user_language_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON user_language_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_language_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_lang_prefs_updated_at
  BEFORE UPDATE ON user_language_preferences
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ============================================================
-- TABLE: user_learning_languages
-- Languages a user is learning (supports multiple)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_learning_languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
  proficiency_level VARCHAR(30) NOT NULL REFERENCES proficiency_levels(code),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_practiced_at TIMESTAMPTZ,
  UNIQUE(user_id, language_code)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_learning_langs_user ON user_learning_languages(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_langs_active ON user_learning_languages(user_id, is_active) WHERE is_active = true;

-- RLS
ALTER TABLE user_learning_languages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own learning languages" ON user_learning_languages
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own learning languages" ON user_learning_languages
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning languages" ON user_learning_languages
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own learning languages" ON user_learning_languages
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TABLE: user_language_progress
-- Per-language progress tracking (XP, Level, Streak)
-- Each language is completely independent
-- ============================================================
CREATE TABLE IF NOT EXISTS user_language_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  minutes_practiced INTEGER NOT NULL DEFAULT 0,
  last_practice_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, language_code),
  CONSTRAINT xp_non_negative CHECK (xp >= 0),
  CONSTRAINT level_positive CHECK (level >= 1),
  CONSTRAINT streak_non_negative CHECK (streak >= 0)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_lang_progress_user ON user_language_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lang_progress_language ON user_language_progress(language_code);

-- RLS
ALTER TABLE user_language_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own language progress" ON user_language_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own language progress" ON user_language_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own language progress" ON user_language_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_user_lang_progress_updated_at
  BEFORE UPDATE ON user_language_progress
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ============================================================
-- ALTER TABLE: kuzuela_courses
-- Add language code columns if not already present
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'kuzuela_courses' AND column_name = 'language_code'
  ) THEN
    ALTER TABLE kuzuela_courses
      ADD COLUMN language_code VARCHAR(10) NOT NULL DEFAULT 'pt' REFERENCES languages(code),
      ADD COLUMN target_language_code VARCHAR(10) NOT NULL DEFAULT 'en' REFERENCES languages(code);

    CREATE INDEX IF NOT EXISTS idx_courses_target_language ON kuzuela_courses(target_language_code);
    CREATE INDEX IF NOT EXISTS idx_courses_published ON kuzuela_courses(is_published) WHERE is_published = true;
  END IF;
END $$;

-- ============================================================
-- ALTER TABLE: kuzuela_lessons
-- Add language code columns if not already present
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'kuzuela_lessons' AND column_name = 'language_code'
  ) THEN
    ALTER TABLE kuzuela_lessons
      ADD COLUMN language_code VARCHAR(10) NOT NULL DEFAULT 'pt' REFERENCES languages(code),
      ADD COLUMN target_language_code VARCHAR(10) NOT NULL DEFAULT 'en' REFERENCES languages(code);

    CREATE INDEX IF NOT EXISTS idx_lessons_course ON kuzuela_lessons(course_id);
    CREATE INDEX IF NOT EXISTS idx_lessons_published ON kuzuela_lessons(is_published) WHERE is_published = true;
  END IF;
END $$;
