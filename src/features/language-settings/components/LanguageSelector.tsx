import { cn } from '@/lib/utils'
import type { LanguageCode, Language } from '@/types/languages.types'

interface LanguageSelectorProps {
  languages: Language[]
  selected?: LanguageCode
  onSelect: (code: LanguageCode) => void
  className?: string
  multiple?: boolean
  selectedMultiple?: LanguageCode[]
}

export function LanguageSelector({
  languages,
  selected,
  onSelect,
  className,
  multiple = false,
  selectedMultiple = [],
}: LanguageSelectorProps) {
  const isSelected = (code: LanguageCode) => {
    if (multiple) return selectedMultiple.includes(code)
    return selected === code
  }

  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-3', className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={cn(
            'flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200',
            'hover:border-primary-400 hover:bg-primary-50',
            isSelected(lang.code)
              ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
              : 'border-gray-200 bg-white',
            !lang.isAvailable && 'opacity-50 cursor-not-allowed'
          )}
          disabled={!lang.isAvailable}
        >
          <span className="text-2xl" role="img" aria-label={lang.name}>
            {lang.flag}
          </span>
          <div className="text-left min-w-0">
            <p className="font-medium text-gray-900 text-sm truncate">{lang.name}</p>
            <p className="text-xs text-gray-500 truncate">{lang.nativeName}</p>
          </div>
          {isSelected(lang.code) && (
            <div className="ml-auto w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
