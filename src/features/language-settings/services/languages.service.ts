import { languagesRepository } from '@/lib/repositories'
import type { Language } from '@/types/languages.types'

export const languagesService = {
  async getAll(): Promise<Language[]> {
    return languagesRepository.getAll()
  },

  async getAvailable(): Promise<Language[]> {
    return languagesRepository.getAvailable()
  },

  async getByCode(code: string): Promise<Language | null> {
    return languagesRepository.getByCode(code)
  },
}
