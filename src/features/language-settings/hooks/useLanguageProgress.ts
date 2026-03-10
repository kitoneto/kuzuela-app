import { useLanguageContext } from '@/shared/contexts/LanguageContext'
import type { LanguageCode } from '@/types/languages.types'

export function useLanguageProgress(languageCode?: LanguageCode) {
  const context = useLanguageContext()

  const code = languageCode ?? context.dimensions.learningLanguage
  const progress = context.getProgressForLanguage(code)

  return {
    progress,
    allProgress: context.progressByLanguage,
    isLoading: context.isLoading,
  }
}
