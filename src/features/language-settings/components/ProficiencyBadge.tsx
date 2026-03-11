import { cn } from '@/lib/utils'
import type { ProficiencyLevel } from '@/types/languages.types'

interface ProficiencyBadgeProps {
  level: ProficiencyLevel
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const LEVEL_COLORS: Record<ProficiencyLevel, string> = {
  'beginner': 'bg-gray-100 text-gray-700 border-gray-200',
  'elementary': 'bg-green-100 text-green-700 border-green-200',
  'intermediate': 'bg-blue-100 text-blue-700 border-blue-200',
  'upper-intermediate': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'advanced': 'bg-purple-100 text-purple-700 border-purple-200',
  'proficient': 'bg-yellow-100 text-yellow-700 border-yellow-200',
}

const LEVEL_LABELS: Record<ProficiencyLevel, string> = {
  'beginner': 'A1 Beginner',
  'elementary': 'A2 Elementary',
  'intermediate': 'B1 Intermediate',
  'upper-intermediate': 'B2 Upper-Intermediate',
  'advanced': 'C1 Advanced',
  'proficient': 'C2 Proficient',
}

export function ProficiencyBadge({ level, className, size = 'md' }: ProficiencyBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        LEVEL_COLORS[level],
        sizeClasses[size],
        className
      )}
    >
      {LEVEL_LABELS[level]}
    </span>
  )
}
