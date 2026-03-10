export interface DbProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  xp: number;
  hearts: number;
  streak: number;
  current_course_id: string | null;
  level: number;
  is_premium: boolean;
  role: 'student' | 'premium' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface DbCourse {
  id: string;
  title: string;
  description: string | null;
  target_language: string;
  source_language: string;
  level: string;
  image_url: string | null;
  total_lessons: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbLesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  unit_number: number;
  lesson_number: number;
  xp_reward: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbExercise {
  id: string;
  lesson_id: string;
  type: 'multiple_choice' | 'fill_gap' | 'match' | 'speaking' | 'listening';
  question: string;
  options: string[] | null;
  correct_answer: string;
  order_index: number;
  created_at: string;
}

export interface DbProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  score: number;
  xp_earned: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbAchievement {
  id: string;
  user_id: string;
  achievement_key: string;
  title: string;
  description: string;
  icon: string;
  unlocked_at: string;
}

export interface DbLeaderboardEntry {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  weekly_xp: number;
  total_xp: number;
  rank: number;
  week_start: string;
}

export interface DbTutorMessage {
  id: string;
  user_id: string;
  tutor_persona_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface DbSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}
