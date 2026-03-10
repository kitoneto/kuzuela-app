import { useLanguagePreferences } from './useLanguagePreferences';
import type { LanguageContext } from '../../../shared/types/languages.types';

export function useLanguageContext(userId?: string): LanguageContext {
  const { preferences } = useLanguagePreferences(userId);

  return {
    nativeLanguage: preferences?.nativeLanguage ?? 'pt',
    targetLanguage: preferences?.learningLanguage ?? 'en',
    interfaceLanguage: preferences?.interfaceLanguage ?? 'pt',
    explanationLanguage: preferences?.explanationLanguage ?? 'pt',
    proficiencyLevel: 'A1',
  };
}
