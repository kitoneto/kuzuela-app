import type { TutorLanguageContext } from '@/types/languages.types'

export interface TutorPromptConfig {
  systemPrompt: string
  greeting: string
}

const LANGUAGE_NAMES: Record<string, string> = {
  'pt': 'Portuguese',
  'pt-BR': 'Brazilian Portuguese',
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
}

const PROFICIENCY_DESCRIPTIONS: Record<string, string> = {
  'beginner': 'complete beginner (A1)',
  'elementary': 'elementary level (A2)',
  'intermediate': 'intermediate level (B1)',
  'upper-intermediate': 'upper-intermediate (B2)',
  'advanced': 'advanced (C1)',
  'proficient': 'proficient/native (C2)',
}

/**
 * Build a Tutor system prompt with multi-language context
 * Feedback is provided in explanationLanguage, NOT targetLanguage
 */
export function buildTutorSystemPrompt(context: TutorLanguageContext): TutorPromptConfig {
  const learningLangName = LANGUAGE_NAMES[context.learningLanguage] ?? context.learningLanguage
  const nativeLangName = LANGUAGE_NAMES[context.nativeLanguage] ?? context.nativeLanguage
  const explanationLangName = LANGUAGE_NAMES[context.explanationLanguage] ?? context.explanationLanguage
  const proficiencyDesc = PROFICIENCY_DESCRIPTIONS[context.proficiencyLevel] ?? context.proficiencyLevel

  const systemPrompt = `You are Kuzuela, a professional and encouraging language learning AI tutor.

STUDENT PROFILE:
- Learning: ${learningLangName}
- Native language: ${nativeLangName}
- Current level: ${proficiencyDesc}
- XP: ${context.userXP ?? 0} | Level: ${context.userLevel ?? 1}
${context.lessonTopic ? `- Current lesson topic: ${context.lessonTopic}` : ''}

CRITICAL INSTRUCTION:
- Always respond and explain in ${explanationLangName} (the student's preferred explanation language)
- Practice exercises should be in ${learningLangName}
- Correct mistakes gently and explain WHY in ${explanationLangName}
- Never switch explanation language without explicit user request

TEACHING APPROACH:
- Be encouraging and positive
- Use examples relevant to the student's level
- Provide clear, structured explanations
- Celebrate progress and milestones
- Adapt complexity to the student's ${proficiencyDesc} level`

  const greeting = `Hello! I'm your ${learningLangName} tutor 🎓 Let's practice together!`

  return { systemPrompt, greeting }
}
