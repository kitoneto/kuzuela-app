import { preferencesRepository } from '@/lib/repositories'
import type { UserLanguagePreferences, LanguageCode } from '@/types/languages.types'

export const languagePreferencesService = {
  async getByUserId(userId: string): Promise<UserLanguagePreferences | null> {
    return preferencesRepository.getByUserId(userId)
  },

  async create(preferences: {
    userId: string
    nativeLanguage: LanguageCode
    interfaceLanguage: LanguageCode
    explanationLanguage: LanguageCode
  }): Promise<UserLanguagePreferences> {
    return preferencesRepository.create(preferences)
  },

  async update(
    userId: string,
    updates: Partial<{
      nativeLanguage: LanguageCode
      interfaceLanguage: LanguageCode
      explanationLanguage: LanguageCode
    }>
  ): Promise<UserLanguagePreferences> {
    return preferencesRepository.update(userId, updates)
  },

  async upsert(preferences: {
    userId: string
    nativeLanguage: LanguageCode
    interfaceLanguage: LanguageCode
    explanationLanguage: LanguageCode
  }): Promise<UserLanguagePreferences> {
    return preferencesRepository.upsert(preferences)
  },
}
