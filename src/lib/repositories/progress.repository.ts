import { supabase } from '@/lib/supabase'
import { calculateLevel } from '@/lib/utils/xp.utils'
import type { UserLanguageProgress, LanguageCode } from '@/types/languages.types'

interface ProgressRow {
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

function mapToProgress(row: ProgressRow): UserLanguageProgress {
  return {
    id: row.id,
    userId: row.user_id,
    languageCode: row.language_code as LanguageCode,
    xp: row.xp,
    level: row.level,
    streak: row.streak,
    longestStreak: row.longest_streak,
    lessonsCompleted: row.lessons_completed,
    minutesPracticed: row.minutes_practiced,
    lastPracticeDate: row.last_practice_date ?? undefined,
    updatedAt: row.updated_at,
  }
}

export const progressRepository = {
  async getAllByUserId(userId: string): Promise<UserLanguageProgress[]> {
    const { data, error } = await supabase
      .from('user_language_progress')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return (data as ProgressRow[]).map(mapToProgress)
  },

  async getByUserAndLanguage(
    userId: string,
    languageCode: LanguageCode
  ): Promise<UserLanguageProgress | null> {
    const { data, error } = await supabase
      .from('user_language_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('language_code', languageCode)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return mapToProgress(data as ProgressRow)
  },

  async initialize(userId: string, languageCode: LanguageCode): Promise<UserLanguageProgress> {
    const { data, error } = await supabase
      .from('user_language_progress')
      .insert({
        user_id: userId,
        language_code: languageCode,
        xp: 0,
        level: 1,
        streak: 0,
        longest_streak: 0,
        lessons_completed: 0,
        minutes_practiced: 0,
      })
      .select()
      .single()

    if (error) throw error
    return mapToProgress(data as ProgressRow)
  },

  async addXP(
    userId: string,
    languageCode: LanguageCode,
    xp: number,
    minutes: number
  ): Promise<UserLanguageProgress> {
    // Get current progress
    const current = await this.getByUserAndLanguage(userId, languageCode)

    if (!current) {
      return this.initialize(userId, languageCode)
    }

    const newXP = current.xp + xp
    const newLevel = calculateLevel(newXP)
    const today = new Date().toISOString().split('T')[0]
    const lastPractice = current.lastPracticeDate?.split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    let newStreak = current.streak
    if (lastPractice === yesterday) {
      newStreak = current.streak + 1
    } else if (lastPractice !== today) {
      newStreak = 1
    }

    const newLongestStreak = Math.max(current.longestStreak, newStreak)

    const { data, error } = await supabase
      .from('user_language_progress')
      .update({
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        longest_streak: newLongestStreak,
        lessons_completed: current.lessonsCompleted + 1,
        minutes_practiced: current.minutesPracticed + minutes,
        last_practice_date: today,
      })
      .eq('user_id', userId)
      .eq('language_code', languageCode)
      .select()
      .single()

    if (error) throw error
    return mapToProgress(data as ProgressRow)
  },
}
