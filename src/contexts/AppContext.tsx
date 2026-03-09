import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Profile, Course } from '../types';
import { supabase } from '../lib/supabase';
import { useAuthContext } from './AuthContext';

interface AppContextType {
  profile: Profile | null;
  courses: Course[];
  loadingProfile: boolean;
  loadingCourses: boolean;
  refreshProfile: () => Promise<void>;
  refreshCourses: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Start your English journey with fundamental vocabulary and grammar',
    language_code: 'en',
    flag_emoji: '🇬🇧',
    level: 'beginner',
    is_premium: false,
    thumbnail_url: null,
    total_lessons: 30,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Portuguese Basics',
    description: 'Learn Portuguese with native-inspired lessons and exercises',
    language_code: 'pt',
    flag_emoji: '🇵🇹',
    level: 'beginner',
    is_premium: false,
    thumbnail_url: null,
    total_lessons: 25,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'French Essentials',
    description: 'Master French pronunciation, vocabulary and conversation',
    language_code: 'fr',
    flag_emoji: '🇫🇷',
    level: 'intermediate',
    is_premium: true,
    thumbnail_url: null,
    total_lessons: 40,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Spanish Conversational',
    description: 'Speak Spanish with confidence through real-life scenarios',
    language_code: 'es',
    flag_emoji: '🇪🇸',
    level: 'intermediate',
    is_premium: true,
    thumbnail_url: null,
    total_lessons: 35,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Mandarin Chinese',
    description: 'Discover Mandarin Chinese characters, tones and culture',
    language_code: 'zh',
    flag_emoji: '🇨🇳',
    level: 'beginner',
    is_premium: true,
    thumbnail_url: null,
    total_lessons: 50,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Kimbundu Basics',
    description: 'Learn Kimbundu, one of Angola\'s main indigenous languages',
    language_code: 'kmb',
    flag_emoji: '🇦🇴',
    level: 'beginner',
    is_premium: false,
    thumbnail_url: null,
    total_lessons: 20,
    created_at: new Date().toISOString(),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!user) { setProfile(null); return; }
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        // Create a mock profile from user data
        setProfile({
          id: user.id,
          email: user.email ?? '',
          full_name: user.user_metadata?.full_name ?? null,
          avatar_url: user.user_metadata?.avatar_url ?? null,
          xp: 0,
          hearts: 5,
          streak_days: 0,
          current_course_id: null,
          subscription_tier: 'free',
          created_at: user.created_at,
          updated_at: new Date().toISOString(),
        });
      } else {
        setProfile(data as Profile);
      }
    } catch {
      setProfile({
        id: user.id,
        email: user.email ?? '',
        full_name: user.user_metadata?.full_name ?? null,
        avatar_url: user.user_metadata?.avatar_url ?? null,
        xp: 0,
        hearts: 5,
        streak_days: 0,
        current_course_id: null,
        subscription_tier: 'free',
        created_at: user.created_at,
        updated_at: new Date().toISOString(),
      });
    } finally {
      setLoadingProfile(false);
    }
  }, [user]);

  const refreshCourses = useCallback(async () => {
    setLoadingCourses(true);
    try {
      const { data, error } = await supabase.from('courses').select('*').order('created_at');
      if (error || !data || data.length === 0) {
        setCourses(MOCK_COURSES);
      } else {
        setCourses(data as Course[]);
      }
    } catch {
      setCourses(MOCK_COURSES);
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() });
    if (error) throw error;
    await refreshProfile();
  }, [user, refreshProfile]);

  useEffect(() => {
    if (user) {
      refreshProfile();
      refreshCourses();
    } else {
      setProfile(null);
      refreshCourses(); // Load courses even when logged out
    }
  }, [user, refreshProfile, refreshCourses]);

  return (
    <AppContext.Provider
      value={{ profile, courses, loadingProfile, loadingCourses, refreshProfile, refreshCourses, updateProfile }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
