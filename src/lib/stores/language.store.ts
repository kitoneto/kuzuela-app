import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  LanguageCode,
  ProficiencyLevel,
  UserLanguageDimensions,
  UserLanguagePreferences,
  UserLearningLanguage,
  UserLanguageProgress,
} from '@/types/languages.types'

interface LanguageState {
  dimensions: UserLanguageDimensions
  preferences: UserLanguagePreferences | null
  learningLanguages: UserLearningLanguage[]
  progressByLanguage: Record<string, UserLanguageProgress>
  isLoading: boolean

  // Actions
  setDimensions: (dimensions: Partial<UserLanguageDimensions>) => void
  setNativeLanguage: (code: LanguageCode) => void
  setInterfaceLanguage: (code: LanguageCode) => void
  setExplanationLanguage: (code: LanguageCode) => void
  setLearningLanguage: (code: LanguageCode) => void
  setPreferences: (preferences: UserLanguagePreferences | null) => void
  setLearningLanguages: (languages: UserLearningLanguage[]) => void
  addLearningLanguage: (language: UserLearningLanguage) => void
  removeLearningLanguage: (code: LanguageCode) => void
  updateProgress: (progress: UserLanguageProgress) => void
  setProgressByLanguage: (progress: Record<string, UserLanguageProgress>) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

const DEFAULT_DIMENSIONS: UserLanguageDimensions = {
  nativeLanguage: 'pt',
  learningLanguage: 'en',
  interfaceLanguage: 'pt',
  explanationLanguage: 'pt',
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      dimensions: DEFAULT_DIMENSIONS,
      preferences: null,
      learningLanguages: [],
      progressByLanguage: {},
      isLoading: false,

      setDimensions: (partialDimensions) =>
        set((state) => ({
          dimensions: { ...state.dimensions, ...partialDimensions },
        })),

      setNativeLanguage: (code) =>
        set((state) => ({
          dimensions: { ...state.dimensions, nativeLanguage: code },
        })),

      setInterfaceLanguage: (code) =>
        set((state) => ({
          dimensions: { ...state.dimensions, interfaceLanguage: code },
        })),

      setExplanationLanguage: (code) =>
        set((state) => ({
          dimensions: { ...state.dimensions, explanationLanguage: code },
        })),

      setLearningLanguage: (code) =>
        set((state) => ({
          dimensions: { ...state.dimensions, learningLanguage: code },
        })),

      setPreferences: (preferences) => set({ preferences }),

      setLearningLanguages: (learningLanguages) => set({ learningLanguages }),

      addLearningLanguage: (language) =>
        set((state) => ({
          learningLanguages: [
            ...state.learningLanguages.filter(
              (l) => l.languageCode !== language.languageCode
            ),
            language,
          ],
        })),

      removeLearningLanguage: (code) =>
        set((state) => ({
          learningLanguages: state.learningLanguages.filter(
            (l) => l.languageCode !== code
          ),
        })),

      updateProgress: (progress) =>
        set((state) => ({
          progressByLanguage: {
            ...state.progressByLanguage,
            [progress.languageCode]: progress,
          },
        })),

      setProgressByLanguage: (progress) => set({ progressByLanguage: progress }),

      setLoading: (isLoading) => set({ isLoading }),

      reset: () =>
        set({
          dimensions: DEFAULT_DIMENSIONS,
          preferences: null,
          learningLanguages: [],
          progressByLanguage: {},
          isLoading: false,
        }),
    }),
    {
      name: 'kuzuela-language-store',
      partialize: (state) => ({
        dimensions: state.dimensions,
      }),
    }
  )
)

export const getActiveLearningLanguage = (
  learningLanguages: UserLearningLanguage[]
): UserLearningLanguage | undefined => {
  return learningLanguages.find((l) => l.isActive)
}

export const getProficiencyForLanguage = (
  learningLanguages: UserLearningLanguage[],
  code: LanguageCode
): ProficiencyLevel | undefined => {
  return learningLanguages.find((l) => l.languageCode === code)?.proficiencyLevel
}
