import { cn } from '@/lib/utils'
import type { UserLearningLanguage, LanguageCode } from '@/types/languages.types'
import { ProficiencyBadge } from './ProficiencyBadge'

interface LearningLanguageCardProps {
  language: UserLearningLanguage
  languageName: string
  flag: string
  isActive?: boolean
  onSelect?: (code: LanguageCode) => void
  onRemove?: (code: LanguageCode) => void
  xp?: number
  level?: number
  streak?: number
  className?: string
}

export function LearningLanguageCard({
  language,
  languageName,
  flag,
  isActive = false,
  onSelect,
  onRemove,
  xp = 0,
  level = 1,
  streak = 0,
  className,
}: LearningLanguageCardProps) {
  return (
    <div
      className={cn(
        'relative p-4 rounded-2xl border-2 transition-all duration-200',
        isActive
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 bg-white hover:border-gray-300',
        onSelect && 'cursor-pointer',
        className
      )}
      onClick={() => onSelect?.(language.languageCode as LanguageCode)}
    >
      {isActive && (
        <div className="absolute top-2 right-2">
          <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full font-medium">
            Active
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <span className="text-3xl" role="img" aria-label={languageName}>
          {flag}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{languageName}</h3>
          <ProficiencyBadge level={language.proficiencyLevel} size="sm" className="mt-1" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-yellow-50 rounded-lg p-2">
          <p className="text-sm font-bold text-yellow-600">{xp.toLocaleString()}</p>
          <p className="text-xs text-yellow-500">XP</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-2">
          <p className="text-sm font-bold text-purple-600">Lv.{level}</p>
          <p className="text-xs text-purple-500">Level</p>
        </div>
        <div className="bg-red-50 rounded-lg p-2">
          <p className="text-sm font-bold text-red-600">{streak}</p>
          <p className="text-xs text-red-500">🔥 Streak</p>
        </div>
      </div>

      {onRemove && (
        <button
          className="mt-3 w-full text-sm text-red-400 hover:text-red-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(language.languageCode as LanguageCode)
          }}
        >
          Remove
        </button>
      )}
    </div>
  )
}
