import type { LanguageLevel } from '../types/levels.types';
import { LEVEL_COLORS, LEVEL_LABELS } from '../types/levels.types';

interface LevelBadgeProps {
  level: string;
  showLabel?: boolean;
}

export function LevelBadge({ level, showLabel = false }: LevelBadgeProps) {
  const colorClass = LEVEL_COLORS[level as LanguageLevel] ?? 'bg-gray-100 text-gray-600';
  const label = LEVEL_LABELS[level as LanguageLevel];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
      {level}
      {showLabel && label && <span className="font-normal">· {label}</span>}
    </span>
  );
}
