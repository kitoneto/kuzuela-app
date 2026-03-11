import { useAuthContext } from '@/shared/contexts/AuthContext'
import { useLanguageContext } from '@/shared/contexts/LanguageContext'
import { calculateNextLevelXP, calculateLevelProgress } from '@/lib/utils/xp.utils'
import { getLanguageInfo } from '@/lib/constants/languages.constants'

export function DashboardPage() {
  const { user } = useAuthContext()
  const { dimensions, learningLanguages, progressByLanguage, isLoading } = useLanguageContext()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const currentProgress = progressByLanguage[dimensions.learningLanguage]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {user?.displayName?.split(' ')[0] || 'Learner'}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Ready to continue learning?</p>
      </div>

      {/* Current Language Progress */}
      {currentProgress && (
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-6 text-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-100 text-sm">Currently learning</p>
              <h2 className="text-xl font-bold capitalize">{dimensions.learningLanguage}</h2>
            </div>
            <div className="text-right">
              <p className="text-primary-100 text-sm">Level</p>
              <p className="text-3xl font-bold">{currentProgress.level}</p>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-primary-100">{currentProgress.xp.toLocaleString()} XP</span>
              <span className="text-primary-100">
                {calculateNextLevelXP(currentProgress.level).toLocaleString()} XP
              </span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${calculateLevelProgress(currentProgress.xp)}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{currentProgress.streak}</p>
              <p className="text-primary-100 text-sm">🔥 Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{currentProgress.lessonsCompleted}</p>
              <p className="text-primary-100 text-sm">📚 Lessons</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{currentProgress.minutesPracticed}</p>
              <p className="text-primary-100 text-sm">⏱️ Minutes</p>
            </div>
          </div>
        </div>
      )}

      {/* All Learning Languages */}
      {learningLanguages.length > 1 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Languages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {learningLanguages.map((lang) => {
              const progress = progressByLanguage[lang.languageCode]
              const langInfo = getLanguageInfo(lang.languageCode)
              return (
                <div
                  key={lang.languageCode}
                  className="bg-white rounded-2xl border border-gray-200 p-4 text-center"
                >
                  <p className="text-2xl mb-1">{langInfo.flag}</p>
                  <p className="font-medium text-sm">{langInfo.name}</p>
                  <p className="text-xs text-gray-500">Lv. {progress?.level ?? 1}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <a
          href="/courses"
          className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="font-semibold text-gray-900">Browse Courses</h3>
          <p className="text-sm text-gray-500 mt-1">Continue learning</p>
        </a>

        <a
          href="/language-settings"
          className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-secondary-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-secondary-200 transition-colors">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="font-semibold text-gray-900">Languages</h3>
          <p className="text-sm text-gray-500 mt-1">Manage languages</p>
        </a>
      </div>
    </div>
  )
}
