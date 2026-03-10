import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type Database = {
  public: {
    Tables: {
      languages: {
        Row: {
          id: string
          code: string
          name: string
          native_name: string
          flag: string
          rtl: boolean
          is_available: boolean
          has_lessons: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['languages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['languages']['Insert']>
      }
      proficiency_levels: {
        Row: {
          id: string
          code: string
          cefr: string
          name: string
          description: string
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['proficiency_levels']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['proficiency_levels']['Insert']>
      }
      user_language_preferences: {
        Row: {
          id: string
          user_id: string
          native_language: string
          interface_language: string
          explanation_language: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_language_preferences']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_language_preferences']['Insert']>
      }
      user_learning_languages: {
        Row: {
          id: string
          user_id: string
          language_code: string
          proficiency_level: string
          is_active: boolean
          started_at: string
          last_practiced_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['user_learning_languages']['Row'], 'id' | 'started_at'>
        Update: Partial<Database['public']['Tables']['user_learning_languages']['Insert']>
      }
      user_language_progress: {
        Row: {
          id: string
          user_id: string
          language_code: string
          xp: number
          level: number
          streak: number
          longest_streak: number
          lessons_completed: number
          minutes_practiced: number
          last_practice_date: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_language_progress']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_language_progress']['Insert']>
      }
      kuzuela_courses: {
        Row: {
          id: string
          title: string
          description: string
          language_code: string
          target_language_code: string
          level: string
          thumbnail_url: string | null
          total_lessons: number
          estimated_hours: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['kuzuela_courses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['kuzuela_courses']['Insert']>
      }
      kuzuela_lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          content: Record<string, unknown>
          language_code: string
          target_language_code: string
          order_index: number
          xp_reward: number
          duration_minutes: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['kuzuela_lessons']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['kuzuela_lessons']['Insert']>
      }
    }
  }
}
