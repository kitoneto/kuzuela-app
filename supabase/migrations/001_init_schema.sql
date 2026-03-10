-- Migration: 001_init_schema.sql
-- Initial schema for Kuzuela language learning app

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT,
  avatar_url    TEXT,
  bio           TEXT,
  country_code  TEXT,
  timezone      TEXT DEFAULT 'UTC',
  is_premium    BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMPTZ,
  hearts        INT DEFAULT 5,
  max_hearts    INT DEFAULT 5,
  last_heart_refill TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kuzuela_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON kuzuela_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON kuzuela_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON kuzuela_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_courses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  language_from   TEXT NOT NULL,
  language_to     TEXT NOT NULL,
  difficulty      TEXT CHECK (difficulty IN ('A1','A2','B1','B2','C1','C2')) DEFAULT 'A1',
  cover_image_url TEXT,
  is_published    BOOLEAN DEFAULT FALSE,
  is_premium      BOOLEAN DEFAULT FALSE,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kuzuela_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses"
  ON kuzuela_courses FOR SELECT
  USING (is_published = TRUE);

-- ============================================================
-- LESSONS
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_lessons (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id       UUID NOT NULL REFERENCES kuzuela_courses(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  lesson_number   INT NOT NULL,
  xp_reward       INT DEFAULT 10,
  is_premium      BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT FALSE,
  vocabulary      JSONB DEFAULT '[]',
  dialogue        JSONB DEFAULT '[]',
  grammar_notes   TEXT,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kuzuela_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published lessons"
  ON kuzuela_lessons FOR SELECT
  USING (is_published = TRUE);

-- ============================================================
-- EXERCISES
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_exercises (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID NOT NULL REFERENCES kuzuela_lessons(id) ON DELETE CASCADE,
  exercise_type TEXT NOT NULL CHECK (exercise_type IN (
    'multiple_choice', 'fill_blank', 'translation', 'matching', 'listening', 'speaking'
  )),
  question      TEXT NOT NULL,
  options       JSONB DEFAULT '[]',
  correct_answer TEXT NOT NULL,
  explanation   TEXT,
  difficulty    TEXT CHECK (difficulty IN ('easy','medium','hard')) DEFAULT 'medium',
  xp_reward     INT DEFAULT 5,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kuzuela_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercises are accessible with their lesson"
  ON kuzuela_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM kuzuela_lessons l WHERE l.id = lesson_id AND l.is_published = TRUE
    )
  );

-- ============================================================
-- USER PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_user_progress (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id           UUID NOT NULL REFERENCES kuzuela_lessons(id) ON DELETE CASCADE,
  completed           BOOLEAN DEFAULT FALSE,
  score               INT DEFAULT 0,
  xp_earned           INT DEFAULT 0,
  completed_at        TIMESTAMPTZ,
  attempts            INT DEFAULT 0,
  last_attempt_at     TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE kuzuela_user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON kuzuela_user_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_achievements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_code  TEXT NOT NULL,
  badge_name  TEXT NOT NULL,
  description TEXT,
  earned_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, badge_code)
);

ALTER TABLE kuzuela_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON kuzuela_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements"
  ON kuzuela_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- WEEKLY LEADERBOARD
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_leaderboard_weekly (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start  DATE NOT NULL,
  xp_earned   INT DEFAULT 0,
  rank        INT,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, week_start)
);

ALTER TABLE kuzuela_leaderboard_weekly ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leaderboard"
  ON kuzuela_leaderboard_weekly FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can manage own leaderboard entry"
  ON kuzuela_leaderboard_weekly FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TUTOR PERSONAS
-- ============================================================
CREATE TABLE IF NOT EXISTS tutor_personas (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  avatar_url  TEXT,
  personality TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  is_premium  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tutor_personas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active tutor personas"
  ON tutor_personas FOR SELECT
  USING (is_active = TRUE);

-- ============================================================
-- TUTOR MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS tutor_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  persona_id  UUID REFERENCES tutor_personas(id),
  role        TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content     TEXT NOT NULL,
  tokens_used INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own tutor messages"
  ON tutor_messages FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TUTOR CONFIG PER USER
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_tutor_config (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  persona_id    UUID REFERENCES tutor_personas(id),
  system_prompt TEXT,
  temperature   NUMERIC(3,2) DEFAULT 0.7,
  max_tokens    INT DEFAULT 500,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kuzuela_tutor_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own tutor config"
  ON kuzuela_tutor_config FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- PRICING PLANS
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_pricing_plans (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  description   TEXT,
  price_monthly NUMERIC(10,2),
  price_yearly  NUMERIC(10,2),
  currency      TEXT DEFAULT 'USD',
  features      JSONB DEFAULT '[]',
  is_active     BOOLEAN DEFAULT TRUE,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kuzuela_pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pricing plans"
  ON kuzuela_pricing_plans FOR SELECT
  USING (is_active = TRUE);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS kuzuela_subscriptions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id         UUID REFERENCES kuzuela_pricing_plans(id),
  status          TEXT CHECK (status IN ('active','cancelled','past_due','trialing','expired')) DEFAULT 'active',
  provider        TEXT,
  provider_sub_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, plan_id)
);

ALTER TABLE kuzuela_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON kuzuela_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own subscriptions"
  ON kuzuela_subscriptions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON kuzuela_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_courses
  BEFORE UPDATE ON kuzuela_courses
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_lessons
  BEFORE UPDATE ON kuzuela_lessons
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_subscriptions
  BEFORE UPDATE ON kuzuela_subscriptions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- TRIGGER: create profile on user signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO kuzuela_profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
