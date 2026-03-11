/**
 * Language Types - 4 Dimensions of Language in Kuzuela
 *
 * 1. nativeLanguage: User's native language (pedagogical context)
 * 2. learningLanguage: Language being learned (lesson focus)
 * 3. interfaceLanguage: UI language (menus, buttons)
 * 4. explanationLanguage: Tutor explanation language
 */

export type LanguageCode =
  | 'pt'   // Portuguese
  | 'pt-BR' // Brazilian Portuguese
  | 'en'   // English
  | 'es'   // Spanish
  | 'fr'   // French
  | 'de'   // German
  | 'it'   // Italian
  | 'zh'   // Chinese (Simplified)
  | 'zh-TW' // Chinese (Traditional)
  | 'ja'   // Japanese
  | 'ko'   // Korean
  | 'ar'   // Arabic
  | 'ru'   // Russian
  | 'hi'   // Hindi
  | 'nl'   // Dutch
  | 'pl'   // Polish
  | 'sv'   // Swedish
  | 'da'   // Danish
  | 'fi'   // Finnish
  | 'nb'   // Norwegian Bokmål
  | 'tr'   // Turkish
  | 'he'   // Hebrew
  | 'vi'   // Vietnamese
  | 'th'   // Thai
  | 'uk'   // Ukrainian

export type ProficiencyLevel =
  | 'beginner'
  | 'elementary'
  | 'intermediate'
  | 'upper-intermediate'
  | 'advanced'
  | 'proficient'

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Language {
  id: string
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
  rtl: boolean
  isAvailable: boolean
  hasLessons: boolean
}

export interface ProficiencyLevelInfo {
  id: string
  code: ProficiencyLevel
  cefr: CEFRLevel
  name: string
  description: string
  sortOrder: number
}

/**
 * 4 Dimensions of Language Context
 */
export interface UserLanguageDimensions {
  /** User's native language - for pedagogical context */
  nativeLanguage: LanguageCode
  /** Language being learned - focus of the lesson */
  learningLanguage: LanguageCode
  /** Language of the UI (menus, buttons, etc.) */
  interfaceLanguage: LanguageCode
  /** Language used by the tutor for explanations */
  explanationLanguage: LanguageCode
}

export interface UserLanguagePreferences {
  id: string
  userId: string
  nativeLanguage: LanguageCode
  interfaceLanguage: LanguageCode
  explanationLanguage: LanguageCode
  createdAt: string
  updatedAt: string
}

export interface UserLearningLanguage {
  id: string
  userId: string
  languageCode: LanguageCode
  proficiencyLevel: ProficiencyLevel
  isActive: boolean
  startedAt: string
  lastPracticedAt?: string
}

export interface UserLanguageProgress {
  id: string
  userId: string
  languageCode: LanguageCode
  xp: number
  level: number
  streak: number
  longestStreak: number
  lessonsCompleted: number
  minutesPracticed: number
  lastPracticeDate?: string
  updatedAt: string
}

/**
 * Language Context for Tutor AI Integration
 */
export interface TutorLanguageContext {
  learningLanguage: LanguageCode
  nativeLanguage: LanguageCode
  explanationLanguage: LanguageCode
  proficiencyLevel: ProficiencyLevel
  lessonTopic?: string
  userXP?: number
  userLevel?: number
}

/**
 * Language Selector Options
 */
export interface LanguageSelectorOption {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
  isAvailable: boolean
}

export interface LanguageContextValue {
  dimensions: UserLanguageDimensions
  preferences: UserLanguagePreferences | null
  learningLanguages: UserLearningLanguage[]
  progressByLanguage: Record<LanguageCode, UserLanguageProgress>
  isLoading: boolean
  setNativeLanguage: (code: LanguageCode) => Promise<void>
  setInterfaceLanguage: (code: LanguageCode) => Promise<void>
  setExplanationLanguage: (code: LanguageCode) => Promise<void>
  setLearningLanguage: (code: LanguageCode) => void
  addLearningLanguage: (code: LanguageCode, proficiency: ProficiencyLevel) => Promise<void>
  removeLearningLanguage: (code: LanguageCode) => Promise<void>
  getProgressForLanguage: (code: LanguageCode) => UserLanguageProgress | null
}
