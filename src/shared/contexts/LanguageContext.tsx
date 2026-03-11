import React, { createContext, useContext, useEffect, useCallback, useRef } from 'react'
import { useLanguageStore } from '@/lib/stores/language.store'
import type {
  LanguageCode,
  LanguageContextValue,
  ProficiencyLevel,
  UserLanguageProgress,
} from '@/types/languages.types'
import { useAuthContext } from './AuthContext'
import { languagePreferencesService } from '@/features/language-settings/services/languagePreferences.service'
import { userLanguagesService } from '@/features/language-settings/services/userLanguages.service'
import { languageProgressService } from '@/features/language-settings/services/languageProgress.service'

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageContextProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()
  const store = useLanguageStore()
  // Use a ref to access the stable store methods without triggering re-renders
  const storeRef = useRef(store)
  storeRef.current = store

  useEffect(() => {
    if (!user) {
      storeRef.current.reset()
      return
    }

    const loadLanguageData = async () => {
      storeRef.current.setLoading(true)
      try {
        const [preferences, learningLanguages, progressList] = await Promise.all([
          languagePreferencesService.getByUserId(user.id),
          userLanguagesService.getByUserId(user.id),
          languageProgressService.getAllByUserId(user.id),
        ])

        if (preferences) {
          storeRef.current.setPreferences(preferences)
          storeRef.current.setDimensions({
            nativeLanguage: preferences.nativeLanguage,
            interfaceLanguage: preferences.interfaceLanguage,
            explanationLanguage: preferences.explanationLanguage,
          })
        }

        storeRef.current.setLearningLanguages(learningLanguages)

        if (learningLanguages.length > 0) {
          const active = learningLanguages.find((l) => l.isActive)
          if (active) {
            storeRef.current.setLearningLanguage(active.languageCode as LanguageCode)
          }
        }

        const progressMap: Record<string, UserLanguageProgress> = {}
        for (const progress of progressList) {
          progressMap[progress.languageCode] = progress
        }
        storeRef.current.setProgressByLanguage(progressMap)
      } catch (error) {
        console.error('Failed to load language data:', error)
      } finally {
        storeRef.current.setLoading(false)
      }
    }

    loadLanguageData()
  }, [user])

  const setNativeLanguage = useCallback(
    async (code: LanguageCode) => {
      if (!user) return
      store.setNativeLanguage(code)
      await languagePreferencesService.update(user.id, { nativeLanguage: code })
    },
    [user, store]
  )

  const setInterfaceLanguage = useCallback(
    async (code: LanguageCode) => {
      if (!user) return
      store.setInterfaceLanguage(code)
      await languagePreferencesService.update(user.id, { interfaceLanguage: code })
    },
    [user, store]
  )

  const setExplanationLanguage = useCallback(
    async (code: LanguageCode) => {
      if (!user) return
      store.setExplanationLanguage(code)
      await languagePreferencesService.update(user.id, { explanationLanguage: code })
    },
    [user, store]
  )

  const setLearningLanguage = useCallback(
    (code: LanguageCode) => {
      store.setLearningLanguage(code)
    },
    [store]
  )

  const addLearningLanguage = useCallback(
    async (code: LanguageCode, proficiency: ProficiencyLevel) => {
      if (!user) return
      const newLang = await userLanguagesService.add(user.id, code, proficiency)
      if (newLang) {
        store.addLearningLanguage(newLang)
      }
    },
    [user, store]
  )

  const removeLearningLanguage = useCallback(
    async (code: LanguageCode) => {
      if (!user) return
      await userLanguagesService.remove(user.id, code)
      store.removeLearningLanguage(code)
    },
    [user, store]
  )

  const getProgressForLanguage = useCallback(
    (code: LanguageCode): UserLanguageProgress | null => {
      return store.progressByLanguage[code] ?? null
    },
    [store.progressByLanguage]
  )

  const value: LanguageContextValue = {
    dimensions: store.dimensions,
    preferences: store.preferences,
    learningLanguages: store.learningLanguages,
    progressByLanguage: store.progressByLanguage as Record<LanguageCode, UserLanguageProgress>,
    isLoading: store.isLoading,
    setNativeLanguage,
    setInterfaceLanguage,
    setExplanationLanguage,
    setLearningLanguage,
    addLearningLanguage,
    removeLearningLanguage,
    getProgressForLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageContextProvider')
  }
  return context
}
