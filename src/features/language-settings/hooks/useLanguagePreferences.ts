import { useLanguageContext } from '@/shared/contexts/LanguageContext'

export function useLanguagePreferences() {
  const context = useLanguageContext()

  return {
    preferences: context.preferences,
    isLoading: context.isLoading,
    setNativeLanguage: context.setNativeLanguage,
    setInterfaceLanguage: context.setInterfaceLanguage,
    setExplanationLanguage: context.setExplanationLanguage,
  }
}
