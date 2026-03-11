import { describe, it, expect } from 'vitest'
import { buildTutorSystemPrompt } from '@/features/tutors/services/tutorPrompts.service'
import type { TutorLanguageContext } from '@/types/languages.types'

describe('tutorPrompts.service', () => {
  const context: TutorLanguageContext = {
    learningLanguage: 'en',
    nativeLanguage: 'pt',
    explanationLanguage: 'pt',
    proficiencyLevel: 'beginner',
    userXP: 100,
    userLevel: 2,
  }

  it('should build a system prompt with the correct languages', () => {
    const { systemPrompt } = buildTutorSystemPrompt(context)
    expect(systemPrompt).toContain('English')
    expect(systemPrompt).toContain('Portuguese')
    expect(systemPrompt).toContain('beginner')
  })

  it('should include explanation language instruction', () => {
    const { systemPrompt } = buildTutorSystemPrompt(context)
    expect(systemPrompt).toContain('Portuguese')
    expect(systemPrompt).toContain('explanation language')
  })

  it('should include XP and level info', () => {
    const { systemPrompt } = buildTutorSystemPrompt(context)
    expect(systemPrompt).toContain('100')
    expect(systemPrompt).toContain('2')
  })

  it('should generate a greeting', () => {
    const { greeting } = buildTutorSystemPrompt(context)
    expect(greeting).toContain('English')
  })

  it('should handle advanced proficiency', () => {
    const advancedContext: TutorLanguageContext = {
      ...context,
      proficiencyLevel: 'advanced',
      explanationLanguage: 'en',
    }
    const { systemPrompt } = buildTutorSystemPrompt(advancedContext)
    expect(systemPrompt).toContain('C1')
    expect(systemPrompt).toContain('English') // explanation language
  })
})
