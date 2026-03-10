import { UserLanguagePreferencesRepository } from '../../../integrations/supabase/repositories/userLanguagePreferences.repository';
import { LanguagesRepository } from '../../../integrations/supabase/repositories/languages.repository';
import type { LanguageCode, ProficiencyCode, UserLanguagePreferences, UserLearningLanguage, LanguageMetadata } from '../../../shared/types/languages.types';

const prefsRepo = new UserLanguagePreferencesRepository();
const langsRepo = new LanguagesRepository();

export const languagePreferencesService = {
  getUserPreferences: (userId: string): Promise<UserLanguagePreferences | null> =>
    prefsRepo.getUserPreferences(userId),

  updateUserPreferences: (userId: string, prefs: Partial<UserLanguagePreferences>): Promise<void> =>
    prefsRepo.updateUserPreferences(userId, prefs),

  getUserLearningLanguages: (userId: string): Promise<UserLearningLanguage[]> =>
    prefsRepo.getUserLearningLanguages(userId),

  addLearningLanguage: (userId: string, lang: LanguageCode, level?: ProficiencyCode): Promise<void> =>
    prefsRepo.addLearningLanguage(userId, lang, level),

  removeLearningLanguage: (userId: string, lang: LanguageCode): Promise<void> =>
    prefsRepo.removeLearningLanguage(userId, lang),

  getAllLanguages: (): Promise<LanguageMetadata[]> =>
    langsRepo.getAllLanguages(),

  getAvailableNativeLanguages: (): Promise<LanguageMetadata[]> =>
    langsRepo.getAvailableNativeLanguages(),

  getAvailableLearningLanguages: (): Promise<LanguageMetadata[]> =>
    langsRepo.getAvailableLearningLanguages(),

  getAvailableInterfaceLanguages: (): Promise<LanguageMetadata[]> =>
    langsRepo.getAvailableInterfaceLanguages(),

  getAvailableExplanationLanguages: (): Promise<LanguageMetadata[]> =>
    langsRepo.getAvailableExplanationLanguages(),
};
