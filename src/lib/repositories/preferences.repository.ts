import { supabase } from '@/lib/supabase'
import type { UserLanguagePreferences, LanguageCode } from '@/types/languages.types'

interface PreferencesRow {
  id: string
  user_id: string
  native_language: string
  interface_language: string
  explanation_language: string
  created_at: string
  updated_at: string
}

function mapToPreferences(row: PreferencesRow): UserLanguagePreferences {
  return {
    id: row.id,
    userId: row.user_id,
    nativeLanguage: row.native_language as LanguageCode,
    interfaceLanguage: row.interface_language as LanguageCode,
    explanationLanguage: row.explanation_language as LanguageCode,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const preferencesRepository = {
  async getByUserId(userId: string): Promise<UserLanguagePreferences | null> {
    const { data, error } = await supabase
      .from('user_language_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return mapToPreferences(data as PreferencesRow)
  },

  async create(preferences: {
    userId: string
    nativeLanguage: LanguageCode
    interfaceLanguage: LanguageCode
    explanationLanguage: LanguageCode
  }): Promise<UserLanguagePreferences> {
    const { data, error } = await supabase
      .from('user_language_preferences')
      .insert({
        user_id: preferences.userId,
        native_language: preferences.nativeLanguage,
        interface_language: preferences.interfaceLanguage,
        explanation_language: preferences.explanationLanguage,
      })
      .select()
      .single()

    if (error) throw error
    return mapToPreferences(data as PreferencesRow)
  },

  async update(
    userId: string,
    updates: Partial<{
      nativeLanguage: LanguageCode
      interfaceLanguage: LanguageCode
      explanationLanguage: LanguageCode
    }>
  ): Promise<UserLanguagePreferences> {
    const updateData: Record<string, string> = {}
    if (updates.nativeLanguage) updateData.native_language = updates.nativeLanguage
    if (updates.interfaceLanguage) updateData.interface_language = updates.interfaceLanguage
    if (updates.explanationLanguage) updateData.explanation_language = updates.explanationLanguage

    const { data, error } = await supabase
      .from('user_language_preferences')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return mapToPreferences(data as PreferencesRow)
  },

  async upsert(preferences: {
    userId: string
    nativeLanguage: LanguageCode
    interfaceLanguage: LanguageCode
    explanationLanguage: LanguageCode
  }): Promise<UserLanguagePreferences> {
    const { data, error } = await supabase
      .from('user_language_preferences')
      .upsert({
        user_id: preferences.userId,
        native_language: preferences.nativeLanguage,
        interface_language: preferences.interfaceLanguage,
        explanation_language: preferences.explanationLanguage,
      })
      .select()
      .single()

    if (error) throw error
    return mapToPreferences(data as PreferencesRow)
  },
}
