import { useLanguagePreferences } from '../hooks/useLanguagePreferences'
import { useUserLanguages } from '../hooks/useUserLanguages'
import { useLanguageProgress } from '../hooks/useLanguageProgress'
import { LearningLanguageCard } from '../components/LearningLanguageCard'
import { getLanguageInfo } from '@/lib/constants/languages.constants'
import type { LanguageCode } from '@/types/languages.types'

export function LanguagePreferencesPage() {
  const { preferences, setNativeLanguage, setInterfaceLanguage, setExplanationLanguage } = useLanguagePreferences()
  const { learningLanguages, setLearningLanguage, removeLearningLanguage, currentLanguage } = useUserLanguages()
  const { allProgress } = useLanguageProgress()

  if (!preferences) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading preferences...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Language Settings</h1>
        <p className="text-gray-500 mt-1">Manage your language preferences</p>
      </div>

      {/* Interface Language */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Interface Language</h2>
        <p className="text-sm text-gray-500 mb-4">The language used for menus and buttons</p>
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getLanguageInfo(preferences.interfaceLanguage).flag}</span>
              <span className="font-medium">{getLanguageInfo(preferences.interfaceLanguage).name}</span>
            </div>
            <button
              className="text-sm text-primary-600 hover:text-primary-700"
              onClick={() => setInterfaceLanguage(preferences.interfaceLanguage)}
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Native Language */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Native Language</h2>
        <p className="text-sm text-gray-500 mb-4">Your mother tongue (for pedagogical context)</p>
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getLanguageInfo(preferences.nativeLanguage).flag}</span>
              <span className="font-medium">{getLanguageInfo(preferences.nativeLanguage).name}</span>
            </div>
            <button
              className="text-sm text-primary-600 hover:text-primary-700"
              onClick={() => setNativeLanguage(preferences.nativeLanguage)}
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Explanation Language */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Tutor Explanation Language</h2>
        <p className="text-sm text-gray-500 mb-4">Language the AI tutor uses to explain concepts</p>
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getLanguageInfo(preferences.explanationLanguage).flag}</span>
              <span className="font-medium">{getLanguageInfo(preferences.explanationLanguage).name}</span>
            </div>
            <button
              className="text-sm text-primary-600 hover:text-primary-700"
              onClick={() => setExplanationLanguage(preferences.explanationLanguage)}
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Learning Languages */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Languages I'm Learning</h2>
        <p className="text-sm text-gray-500 mb-4">You can learn multiple languages simultaneously</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {learningLanguages.map((lang) => {
            const info = getLanguageInfo(lang.languageCode)
            const progress = allProgress[lang.languageCode as LanguageCode]
            return (
              <LearningLanguageCard
                key={lang.languageCode}
                language={lang}
                languageName={info.name}
                flag={info.flag}
                isActive={lang.languageCode === currentLanguage}
                onSelect={(code) => setLearningLanguage(code)}
                onRemove={(code) => removeLearningLanguage(code)}
                xp={progress?.xp}
                level={progress?.level}
                streak={progress?.streak}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
