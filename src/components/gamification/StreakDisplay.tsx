import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  days: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function StreakDisplay({ days, size = 'md', showLabel = true }: StreakDisplayProps) {
  const sizeMap = { sm: 14, md: 20, lg: 28 }[size];
  const textSize = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }[size];

  return (
    <div className="flex items-center gap-1.5">
      <Flame size={sizeMap} className={`text-orange-500 ${days > 0 ? 'animate-pulse' : ''}`} />
      <span className={`font-bold text-gray-900 ${textSize}`}>{days}</span>
      {showLabel && <span className={`text-gray-500 ${textSize}`}>{days === 1 ? 'day' : 'days'}</span>}
    </div>
  );
}

export function XPBar({ xp, level, progressPercent }: { xp: number; level: number; progressPercent: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-gray-700">Level {level}</span>
        <span className="text-sm text-gray-500">{xp.toLocaleString()} XP</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-400 to-teal-400 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progressPercent, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1 text-right">{Math.round(progressPercent)}% to Level {level + 1}</p>
    </div>
  );
}

export function HeartsDisplay({ hearts, maxHearts = 5 }: { hearts: number; maxHearts?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <span key={i} className={`text-lg transition-all ${i < hearts ? '' : 'opacity-20 grayscale'}`}>
          ❤️
        </span>
      ))}
    </div>
  );
}
