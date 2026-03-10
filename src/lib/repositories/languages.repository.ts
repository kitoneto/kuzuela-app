import { supabase } from '@/lib/supabase'
import type { Language } from '@/types/languages.types'

export interface LanguageRow {
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

function mapToLanguage(row: LanguageRow): Language {
  return {
    id: row.id,
    code: row.code as Language['code'],
    name: row.name,
    nativeName: row.native_name,
    flag: row.flag,
    rtl: row.rtl,
    isAvailable: row.is_available,
    hasLessons: row.has_lessons,
  }
}

export const languagesRepository = {
  async getAll(): Promise<Language[]> {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .order('name')

    if (error) throw error
    return (data as LanguageRow[]).map(mapToLanguage)
  },

  async getAvailable(): Promise<Language[]> {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .eq('is_available', true)
      .order('name')

    if (error) throw error
    return (data as LanguageRow[]).map(mapToLanguage)
  },

  async getByCode(code: string): Promise<Language | null> {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .eq('code', code)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return mapToLanguage(data as LanguageRow)
  },
}
