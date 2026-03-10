import { describe, it, expect } from 'vitest'
import { useLanguageStore, getActiveLearningLanguage, getProficiencyForLanguage } from '@/lib/stores/language.store'
import type { UserLearningLanguage } from '@/types/languages.types'

describe('language.store', () => {
  it('should have default dimensions', () => {
    const state = useLanguageStore.getState()
    expect(state.dimensions.nativeLanguage).toBe('pt')
    expect(state.dimensions.learningLanguage).toBe('en')
    expect(state.dimensions.interfaceLanguage).toBe('pt')
    expect(state.dimensions.explanationLanguage).toBe('pt')
  })

  it('should set native language', () => {
    const store = useLanguageStore.getState()
    store.setNativeLanguage('es')
    expect(useLanguageStore.getState().dimensions.nativeLanguage).toBe('es')
  })

  it('should set interface language', () => {
    const store = useLanguageStore.getState()
    store.setInterfaceLanguage('fr')
    expect(useLanguageStore.getState().dimensions.interfaceLanguage).toBe('fr')
  })

  it('should set learning language', () => {
    const store = useLanguageStore.getState()
    store.setLearningLanguage('de')
    expect(useLanguageStore.getState().dimensions.learningLanguage).toBe('de')
  })

  it('should add learning language', () => {
    const store = useLanguageStore.getState()
    store.reset()
    const lang: UserLearningLanguage = {
      id: '1',
      userId: 'user1',
      languageCode: 'fr',
      proficiencyLevel: 'beginner',
      isActive: true,
      startedAt: new Date().toISOString(),
    }
    store.addLearningLanguage(lang)
    const state = useLanguageStore.getState()
    expect(state.learningLanguages.find((l) => l.languageCode === 'fr')).toBeDefined()
  })

  it('should remove learning language', () => {
    const store = useLanguageStore.getState()
    store.reset()
    const lang: UserLearningLanguage = {
      id: '2',
      userId: 'user1',
      languageCode: 'es',
      proficiencyLevel: 'intermediate',
      isActive: false,
      startedAt: new Date().toISOString(),
    }
    store.addLearningLanguage(lang)
    store.removeLearningLanguage('es')
    const state = useLanguageStore.getState()
    expect(state.learningLanguages.find((l) => l.languageCode === 'es')).toBeUndefined()
  })

  it('should reset to defaults', () => {
    const store = useLanguageStore.getState()
    store.setNativeLanguage('ko')
    store.reset()
    expect(useLanguageStore.getState().dimensions.nativeLanguage).toBe('pt')
  })
})

describe('getActiveLearningLanguage', () => {
  it('should return the active language', () => {
    const languages: UserLearningLanguage[] = [
      { id: '1', userId: 'u1', languageCode: 'en', proficiencyLevel: 'beginner', isActive: false, startedAt: '' },
      { id: '2', userId: 'u1', languageCode: 'es', proficiencyLevel: 'beginner', isActive: true, startedAt: '' },
    ]
    expect(getActiveLearningLanguage(languages)?.languageCode).toBe('es')
  })

  it('should return undefined if no active language', () => {
    expect(getActiveLearningLanguage([])).toBeUndefined()
  })
})

describe('getProficiencyForLanguage', () => {
  const languages: UserLearningLanguage[] = [
    { id: '1', userId: 'u1', languageCode: 'en', proficiencyLevel: 'intermediate', isActive: true, startedAt: '' },
  ]

  it('should return proficiency level for a language', () => {
    expect(getProficiencyForLanguage(languages, 'en')).toBe('intermediate')
  })

  it('should return undefined for unknown language', () => {
    expect(getProficiencyForLanguage(languages, 'fr')).toBeUndefined()
  })
})
