interface XPBarProps {
  current: number;
  max: number;
  level: number;
  showLabel?: boolean;
}

export function XPBar({ current, max, level, showLabel = true }: XPBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="font-semibold text-gray-600">Level {level}</span>
          <span className="text-gray-400">{current}/{max} XP</span>
        </div>
      )}
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
