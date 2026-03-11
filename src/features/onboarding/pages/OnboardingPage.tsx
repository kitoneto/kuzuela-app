import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/shared/contexts/AuthContext'
import { languagePreferencesService } from '@/features/language-settings/services/languagePreferences.service'
import { userLanguagesService } from '@/features/language-settings/services/userLanguages.service'
import { languageProgressService } from '@/features/language-settings/services/languageProgress.service'
import { LanguageSelector } from '@/features/language-settings/components/LanguageSelector'
import { STATIC_LANGUAGES } from '@/lib/constants/languages.constants'
import type { LanguageCode } from '@/types/languages.types'

type OnboardingStep = 1 | 2 | 3 | 4

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [step, setStep] = useState<OnboardingStep>(1)
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCode>('pt')
  const [interfaceLanguage, setInterfaceLanguage] = useState<LanguageCode>('pt')
  const [learningLanguages, setLearningLanguages] = useState<LanguageCode[]>(['en'])
  const [explanationLanguage, setExplanationLanguage] = useState<LanguageCode>('pt')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const steps = [
    { number: 1, title: 'Native Language', description: 'What is your mother tongue?' },
    { number: 2, title: 'Interface Language', description: 'What language should we use for menus?' },
    { number: 3, title: 'Learning Languages', description: 'What language(s) do you want to learn?' },
    { number: 4, title: 'Explanation Language', description: 'How should the tutor explain concepts?' },
  ]

  const toggleLearningLanguage = (code: LanguageCode) => {
    setLearningLanguages((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    )
  }

  const handleFinish = async () => {
    if (!user) return
    setIsSubmitting(true)
    setError('')

    try {
      // Save language preferences
      await languagePreferencesService.upsert({
        userId: user.id,
        nativeLanguage,
        interfaceLanguage,
        explanationLanguage,
      })

      // Add learning languages and initialize progress
      for (const langCode of learningLanguages) {
        await userLanguagesService.add(user.id, langCode, 'beginner')
        await languageProgressService.initialize(user.id, langCode)
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    if (step === 3) return learningLanguages.length > 0
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`h-2 rounded-full transition-all duration-300 ${
                s.number === step ? 'w-8 bg-primary-500' : s.number < step ? 'w-4 bg-primary-300' : 'w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 text-2xl">
                {step === 1 ? '🌍' : step === 2 ? '🖥️' : step === 3 ? '📚' : '🎓'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{steps[step - 1].title}</h2>
            <p className="text-gray-500 mt-1">{steps[step - 1].description}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <LanguageSelector
              languages={STATIC_LANGUAGES.filter((l) => l.isAvailable)}
              selected={nativeLanguage}
              onSelect={setNativeLanguage}
            />
          )}

          {step === 2 && (
            <LanguageSelector
              languages={STATIC_LANGUAGES.filter((l) => l.isAvailable)}
              selected={interfaceLanguage}
              onSelect={setInterfaceLanguage}
            />
          )}

          {step === 3 && (
            <div>
              <LanguageSelector
                languages={STATIC_LANGUAGES}
                multiple
                selectedMultiple={learningLanguages}
                onSelect={toggleLearningLanguage}
              />
              {learningLanguages.length === 0 && (
                <p className="text-center text-red-500 text-sm mt-3">
                  Please select at least one language
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <LanguageSelector
              languages={STATIC_LANGUAGES.filter((l) => l.isAvailable)}
              selected={explanationLanguage}
              onSelect={setExplanationLanguage}
            />
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as OnboardingStep)}
                className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as OnboardingStep)}
                disabled={!canProceed()}
                className="flex-1 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={isSubmitting || !canProceed()}
                className="flex-1 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Setting up...' : "Let's Go! 🚀"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Step {step} of {steps.length}
        </p>
      </div>
    </div>
  )
}
