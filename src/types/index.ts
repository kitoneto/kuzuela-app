export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  xp: number;
  hearts: number;
  streak_days: number;
  current_course_id: string | null;
  subscription_tier: 'free' | 'pro' | 'plus';
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  language_code: string;
  flag_emoji: string | null;
  level: string;
  is_premium: boolean;
  thumbnail_url: string | null;
  total_lessons: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  xp_reward: number;
  vocabulary: Record<string, unknown>[] | null;
  dialogue: Record<string, unknown>[] | null;
  exercises: Record<string, unknown>[] | null;
  grammar_focus: string | null;
  speaking_task: Record<string, unknown> | null;
  is_premium: boolean;
  created_at: string;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'listening' | 'speaking';
  question: string;
  options: string[] | null;
  correct_answer: string;
  explanation: string | null;
  xp_reward: number;
  order_index: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  xp_earned: number;
  completed_at: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  xp_this_week: number;
  rank: number;
  language_code: string;
  week_start: string;
  profile?: Profile;
}

export interface TutorPersona {
  id: string;
  name: string;
  language_code: string;
  avatar_emoji: string;
  description: string;
  greeting: string;
}

export interface TutorMessage {
  id: string;
  user_id: string;
  persona: string;
  role: 'user' | 'assistant';
  content: string;
  lesson_context: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'free' | 'pro' | 'plus';
  status: 'active' | 'cancelled' | 'expired';
  currency: 'AOA' | 'USD' | 'EUR' | 'MZN' | 'BRL';
  amount: number;
  expires_at: string | null;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  tier: 'pro' | 'plus';
  name: string;
  description: string;
  price_aoa: number;
  price_usd: number;
  price_eur: number;
  price_mzn: number;
  price_brl: number;
  features: string[];
}
