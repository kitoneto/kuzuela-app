import { supabase } from '@/lib/supabase'
import type { UserLearningLanguage, LanguageCode, ProficiencyLevel } from '@/types/languages.types'

interface LearningLanguageRow {
  id: string
  user_id: string
  language_code: string
  proficiency_level: string
  is_active: boolean
  started_at: string
  last_practiced_at: string | null
}

function mapToLearningLanguage(row: LearningLanguageRow): UserLearningLanguage {
  return {
    id: row.id,
    userId: row.user_id,
    languageCode: row.language_code as LanguageCode,
    proficiencyLevel: row.proficiency_level as ProficiencyLevel,
    isActive: row.is_active,
    startedAt: row.started_at,
    lastPracticedAt: row.last_practiced_at ?? undefined,
  }
}

export const userLanguagesRepository = {
  async getByUserId(userId: string): Promise<UserLearningLanguage[]> {
    const { data, error } = await supabase
      .from('user_learning_languages')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })

    if (error) throw error
    return (data as LearningLanguageRow[]).map(mapToLearningLanguage)
  },

  async add(
    userId: string,
    languageCode: LanguageCode,
    proficiencyLevel: ProficiencyLevel
  ): Promise<UserLearningLanguage> {
    const { data, error } = await supabase
      .from('user_learning_languages')
      .insert({
        user_id: userId,
        language_code: languageCode,
        proficiency_level: proficiencyLevel,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error
    return mapToLearningLanguage(data as LearningLanguageRow)
  },

  async remove(userId: string, languageCode: LanguageCode): Promise<void> {
    const { error } = await supabase
      .from('user_learning_languages')
      .delete()
      .eq('user_id', userId)
      .eq('language_code', languageCode)

    if (error) throw error
  },

  async setActive(userId: string, languageCode: LanguageCode): Promise<void> {
    // Deactivate all
    await supabase
      .from('user_learning_languages')
      .update({ is_active: false })
      .eq('user_id', userId)

    // Activate specific one
    const { error } = await supabase
      .from('user_learning_languages')
      .update({ is_active: true })
      .eq('user_id', userId)
      .eq('language_code', languageCode)

    if (error) throw error
  },

  async updateProficiency(
    userId: string,
    languageCode: LanguageCode,
    proficiencyLevel: ProficiencyLevel
  ): Promise<void> {
    const { error } = await supabase
      .from('user_learning_languages')
      .update({ proficiency_level: proficiencyLevel })
      .eq('user_id', userId)
      .eq('language_code', languageCode)

    if (error) throw error
  },

  async updateLastPracticed(userId: string, languageCode: LanguageCode): Promise<void> {
    const { error } = await supabase
      .from('user_learning_languages')
      .update({ last_practiced_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('language_code', languageCode)

    if (error) throw error
  },
}
