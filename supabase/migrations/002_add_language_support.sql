-- Migration: 002_add_language_support.sql
-- Adds comprehensive multi-language support tables

-- ============================================================
-- LANGUAGES REFERENCE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS languages (
  code           TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  native_name    TEXT NOT NULL,
  flag           TEXT NOT NULL,
  is_native      BOOLEAN DEFAULT TRUE,
  is_learning    BOOLEAN DEFAULT TRUE,
  is_interface   BOOLEAN DEFAULT FALSE,
  is_explanation BOOLEAN DEFAULT FALSE,
  is_active      BOOLEAN DEFAULT TRUE,
  sort_order     INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active languages"
  ON languages FOR SELECT
  USING (is_active = TRUE);

-- Seed supported languages
INSERT INTO languages (code, name, native_name, flag, is_native, is_learning, is_interface, is_explanation, sort_order)
VALUES
  ('pt', 'Português',  'Português',  '🇵🇹', TRUE, TRUE, TRUE, TRUE,  1),
  ('en', 'English',    'English',    '🇬🇧', TRUE, TRUE, TRUE, TRUE,  2),
  ('es', 'Español',    'Español',    '🇪🇸', TRUE, TRUE, TRUE, TRUE,  3),
  ('fr', 'Français',   'Français',   '🇫🇷', TRUE, TRUE, TRUE, TRUE,  4),
  ('de', 'Deutsch',    'Deutsch',    '🇩🇪', TRUE, TRUE, FALSE, FALSE, 5),
  ('ja', 'Japanese',   '日本語',      '🇯🇵', TRUE, TRUE, FALSE, FALSE, 6),
  ('it', 'Italiano',   'Italiano',   '🇮🇹', TRUE, TRUE, FALSE, FALSE, 7),
  ('mn', 'Mongolian',  'Монгол',     '🇲🇳', TRUE, TRUE, FALSE, FALSE, 8)
ON CONFLICT (code) DO UPDATE
  SET name           = EXCLUDED.name,
      native_name    = EXCLUDED.native_name,
      flag           = EXCLUDED.flag,
      is_native      = EXCLUDED.is_native,
      is_learning    = EXCLUDED.is_learning,
      is_interface   = EXCLUDED.is_interface,
      is_explanation = EXCLUDED.is_explanation,
      sort_order     = EXCLUDED.sort_order;

-- ============================================================
-- PROFICIENCY LEVELS REFERENCE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS proficiency_levels (
  code        TEXT PRIMARY KEY CHECK (code IN ('A1','A2','B1','B2','C1','C2')),
  label       TEXT NOT NULL,
  description TEXT NOT NULL,
  min_xp      INT DEFAULT 0,
  max_xp      INT,
  sort_order  INT DEFAULT 0
);

ALTER TABLE proficiency_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view proficiency levels"
  ON proficiency_levels FOR SELECT
  USING (TRUE);

INSERT INTO proficiency_levels (code, label, description, min_xp, max_xp, sort_order)
VALUES
  ('A1', 'Iniciante / Beginner',                  'Can understand and use basic phrases and simple expressions.',                              0,    499,  1),
  ('A2', 'Elementar / Elementary',                'Can understand sentences and frequently used expressions.',                                500,  1499, 2),
  ('B1', 'Intermédio / Intermediate',             'Can understand the main points of clear standard input.',                                  1500, 2999, 3),
  ('B2', 'Intermédio Superior / Upper Intermediate', 'Can understand the main ideas of complex text on concrete and abstract topics.',        3000, 4999, 4),
  ('C1', 'Avançado / Advanced',                   'Can understand a wide range of demanding, longer texts.',                                  5000, 7999, 5),
  ('C2', 'Proficiente / Proficient',              'Can understand with ease virtually everything heard or read.',                             8000, NULL, 6)
ON CONFLICT (code) DO UPDATE
  SET label       = EXCLUDED.label,
      description = EXCLUDED.description,
      min_xp      = EXCLUDED.min_xp,
      max_xp      = EXCLUDED.max_xp,
      sort_order  = EXCLUDED.sort_order;

-- ============================================================
-- USER LANGUAGE PREFERENCES
-- ============================================================
CREATE TABLE IF NOT EXISTS user_language_preferences (
  user_id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  native_language      TEXT NOT NULL DEFAULT 'pt' REFERENCES languages(code),
  learning_language    TEXT NOT NULL DEFAULT 'en' REFERENCES languages(code),
  interface_language   TEXT NOT NULL DEFAULT 'pt' REFERENCES languages(code),
  explanation_language TEXT NOT NULL DEFAULT 'pt' REFERENCES languages(code),
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_language_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own language preferences"
  ON user_language_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER set_updated_at_user_language_preferences
  BEFORE UPDATE ON user_language_preferences
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- USER LEARNING LANGUAGES (multiple languages per user)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_learning_languages (
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_code     TEXT NOT NULL REFERENCES languages(code),
  proficiency_level TEXT NOT NULL DEFAULT 'A1' REFERENCES proficiency_levels(code),
  started_at        TIMESTAMPTZ DEFAULT NOW(),
  last_studied_at   TIMESTAMPTZ,
  total_xp          INT DEFAULT 0,
  streak_days       INT DEFAULT 0,
  PRIMARY KEY (user_id, language_code)
);

ALTER TABLE user_learning_languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own learning languages"
  ON user_learning_languages FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- USER LANGUAGE PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_language_progress (
  user_id                  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_code            TEXT NOT NULL REFERENCES languages(code),
  total_lessons_completed  INT DEFAULT 0,
  total_xp                 INT DEFAULT 0,
  current_level            TEXT NOT NULL DEFAULT 'A1' REFERENCES proficiency_levels(code),
  streak_days              INT DEFAULT 0,
  best_streak_days         INT DEFAULT 0,
  last_activity_at         TIMESTAMPTZ,
  PRIMARY KEY (user_id, language_code)
);

ALTER TABLE user_language_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own language progress"
  ON user_language_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- ADD LANGUAGE COLUMNS TO EXISTING TABLES
-- ============================================================

-- Courses: add explicit language columns if not already present
ALTER TABLE kuzuela_courses
  ADD COLUMN IF NOT EXISTS target_language_code TEXT REFERENCES languages(code),
  ADD COLUMN IF NOT EXISTS source_language_code TEXT REFERENCES languages(code);

-- Lessons: add language context columns
ALTER TABLE kuzuela_lessons
  ADD COLUMN IF NOT EXISTS language_context JSONB DEFAULT '{}';

-- ============================================================
-- TRIGGER: auto-init user language preferences on profile creation
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_profile_language_setup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_language_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO user_learning_languages (user_id, language_code, proficiency_level)
  VALUES (NEW.id, 'en', 'A1')
  ON CONFLICT (user_id, language_code) DO NOTHING;

  INSERT INTO user_language_progress (user_id, language_code)
  VALUES (NEW.id, 'en')
  ON CONFLICT (user_id, language_code) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_kuzuela_profile_created
  AFTER INSERT ON kuzuela_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_profile_language_setup();

-- ============================================================
-- FUNCTION: get user language context (convenience RPC)
-- ============================================================
CREATE OR REPLACE FUNCTION get_user_language_context(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_prefs  user_language_preferences%ROWTYPE;
  v_prog   user_language_progress%ROWTYPE;
BEGIN
  SELECT * INTO v_prefs FROM user_language_preferences WHERE user_id = p_user_id;
  SELECT * INTO v_prog  FROM user_language_progress
    WHERE user_id = p_user_id AND language_code = v_prefs.learning_language;

  RETURN json_build_object(
    'nativeLanguage',      COALESCE(v_prefs.native_language, 'pt'),
    'targetLanguage',      COALESCE(v_prefs.learning_language, 'en'),
    'interfaceLanguage',   COALESCE(v_prefs.interface_language, 'pt'),
    'explanationLanguage', COALESCE(v_prefs.explanation_language, 'pt'),
    'proficiencyLevel',    COALESCE(v_prog.current_level, 'A1')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
