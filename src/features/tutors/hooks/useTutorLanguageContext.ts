import { useLanguageContext } from '@/shared/contexts/LanguageContext'
import type { TutorLanguageContext } from '@/types/languages.types'

export function useTutorLanguageContext(): TutorLanguageContext {
  const { dimensions, learningLanguages, progressByLanguage } = useLanguageContext()

  const learningLang = learningLanguages.find(
    (l) => l.languageCode === dimensions.learningLanguage
  )

  const progress = progressByLanguage[dimensions.learningLanguage]

  return {
    learningLanguage: dimensions.learningLanguage,
    nativeLanguage: dimensions.nativeLanguage,
    explanationLanguage: dimensions.explanationLanguage,
    proficiencyLevel: learningLang?.proficiencyLevel ?? 'beginner',
    userXP: progress?.xp,
    userLevel: progress?.level,
  }
}
