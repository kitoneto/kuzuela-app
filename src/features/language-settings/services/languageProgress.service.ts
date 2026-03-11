import { progressRepository } from '@/lib/repositories'
import type { UserLanguageProgress, LanguageCode } from '@/types/languages.types'

export const languageProgressService = {
  async getAllByUserId(userId: string): Promise<UserLanguageProgress[]> {
    return progressRepository.getAllByUserId(userId)
  },

  async getByLanguage(
    userId: string,
    languageCode: LanguageCode
  ): Promise<UserLanguageProgress | null> {
    return progressRepository.getByUserAndLanguage(userId, languageCode)
  },

  async initialize(userId: string, languageCode: LanguageCode): Promise<UserLanguageProgress> {
    return progressRepository.initialize(userId, languageCode)
  },

  async addXP(
    userId: string,
    languageCode: LanguageCode,
    xp: number,
    minutes: number
  ): Promise<UserLanguageProgress> {
    return progressRepository.addXP(userId, languageCode, xp, minutes)
  },
}
