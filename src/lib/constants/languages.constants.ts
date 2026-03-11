import type { Language, LanguageCode } from '@/types/languages.types'

/**
 * Static language data - used as fallback when DB is not available
 * or during onboarding before the user is authenticated
 */
export const STATIC_LANGUAGES: Language[] = [
  { id: '1', code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', rtl: false, isAvailable: true, hasLessons: true },
  { id: '2', code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', rtl: false, isAvailable: true, hasLessons: true },
  { id: '3', code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', rtl: false, isAvailable: true, hasLessons: true },
  { id: '4', code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false, isAvailable: true, hasLessons: true },
  { id: '5', code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false, isAvailable: true, hasLessons: true },
  { id: '6', code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false, isAvailable: true, hasLessons: false },
  { id: '7', code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false, isAvailable: true, hasLessons: false },
  { id: '8', code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false, isAvailable: false, hasLessons: false },
  { id: '9', code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', rtl: false, isAvailable: false, hasLessons: false },
  { id: '10', code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false, isAvailable: false, hasLessons: false },
  { id: '11', code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false, isAvailable: false, hasLessons: false },
  { id: '12', code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, isAvailable: false, hasLessons: false },
  { id: '13', code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false, isAvailable: false, hasLessons: false },
  { id: '14', code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false, isAvailable: false, hasLessons: false },
  { id: '15', code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', rtl: false, isAvailable: false, hasLessons: false },
]

export const LANGUAGE_MAP: Record<string, Language> = Object.fromEntries(
  STATIC_LANGUAGES.map((l) => [l.code, l])
)

export function getLanguageInfo(code: LanguageCode | string): Language {
  return LANGUAGE_MAP[code] ?? {
    id: code,
    code: code as LanguageCode,
    name: code.toUpperCase(),
    nativeName: code,
    flag: '🌐',
    rtl: false,
    isAvailable: false,
    hasLessons: false,
  }
}
