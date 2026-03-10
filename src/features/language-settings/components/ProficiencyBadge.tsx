import type { ProficiencyCode } from '../../../shared/types/languages.types';

interface ProficiencyBadgeProps {
  level: ProficiencyCode;
  className?: string;
}

const levelColors: Record<ProficiencyCode, string> = {
  A1: 'bg-gray-100 text-gray-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-green-100 text-green-700',
  B2: 'bg-yellow-100 text-yellow-700',
  C1: 'bg-orange-100 text-orange-700',
  C2: 'bg-purple-100 text-purple-700',
};

const levelLabels: Record<ProficiencyCode, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
};

export function ProficiencyBadge({ level, className = '' }: ProficiencyBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${levelColors[level]} ${className}`}
      title={levelLabels[level]}
    >
      {level}
      <span className="hidden sm:inline">· {levelLabels[level]}</span>
    </span>
  );
}
