import { userLanguagesRepository } from '@/lib/repositories'
import type { UserLearningLanguage, LanguageCode, ProficiencyLevel } from '@/types/languages.types'

export const userLanguagesService = {
  async getByUserId(userId: string): Promise<UserLearningLanguage[]> {
    return userLanguagesRepository.getByUserId(userId)
  },

  async add(
    userId: string,
    languageCode: LanguageCode,
    proficiencyLevel: ProficiencyLevel
  ): Promise<UserLearningLanguage> {
    return userLanguagesRepository.add(userId, languageCode, proficiencyLevel)
  },

  async remove(userId: string, languageCode: LanguageCode): Promise<void> {
    return userLanguagesRepository.remove(userId, languageCode)
  },

  async setActive(userId: string, languageCode: LanguageCode): Promise<void> {
    return userLanguagesRepository.setActive(userId, languageCode)
  },

  async updateProficiency(
    userId: string,
    languageCode: LanguageCode,
    proficiencyLevel: ProficiencyLevel
  ): Promise<void> {
    return userLanguagesRepository.updateProficiency(userId, languageCode, proficiencyLevel)
  },
}
