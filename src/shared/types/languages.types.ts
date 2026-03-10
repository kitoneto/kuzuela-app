export type LanguageCode = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'ja' | 'it' | 'mn';

export interface UserLanguagePreferences {
  nativeLanguage: LanguageCode;
  learningLanguage: LanguageCode;
  interfaceLanguage: LanguageCode;
  explanationLanguage: LanguageCode;
}

export interface LanguageMetadata {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  isNative?: boolean;
  isLearning?: boolean;
  isInterface?: boolean;
  isExplanation?: boolean;
}

export interface ProficiencyLevel {
  code: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  label: string;
  description: string;
  minXP?: number;
  maxXP?: number;
}

export type ProficiencyCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface UserLearningLanguage {
  userId: string;
  languageCode: LanguageCode;
  proficiencyLevel: ProficiencyCode;
  startedAt: string;
  lastStudiedAt: string | null;
  totalXP: number;
  streakDays: number;
}

export interface UserLanguageProgress {
  userId: string;
  languageCode: LanguageCode;
  totalLessonsCompleted: number;
  totalXP: number;
  currentLevel: ProficiencyCode;
  streakDays: number;
  bestStreakDays: number;
  lastActivityAt: string | null;
}

export interface LanguageContext {
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  interfaceLanguage: LanguageCode;
  explanationLanguage: LanguageCode;
  proficiencyLevel: ProficiencyCode;
}
