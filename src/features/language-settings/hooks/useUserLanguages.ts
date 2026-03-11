import { useLanguageContext } from '@/shared/contexts/LanguageContext'

export function useUserLanguages() {
  const context = useLanguageContext()

  return {
    learningLanguages: context.learningLanguages,
    isLoading: context.isLoading,
    addLearningLanguage: context.addLearningLanguage,
    removeLearningLanguage: context.removeLearningLanguage,
    setLearningLanguage: context.setLearningLanguage,
    currentLanguage: context.dimensions.learningLanguage,
  }
}
