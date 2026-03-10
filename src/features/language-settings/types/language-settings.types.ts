import type { LanguageCode, UserLanguagePreferences, UserLearningLanguage, UserLanguageProgress } from '../../../shared/types/languages.types';

export interface LanguagePreferencesFormData {
  nativeLanguage: LanguageCode;
  learningLanguage: LanguageCode;
  interfaceLanguage: LanguageCode;
  explanationLanguage: LanguageCode;
}

export interface LanguageSettingsState {
  preferences: UserLanguagePreferences | null;
  learningLanguages: UserLearningLanguage[];
  progress: UserLanguageProgress[];
  isLoading: boolean;
  error: string | null;
}
