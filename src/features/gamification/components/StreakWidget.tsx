import { Flame } from 'lucide-react';
export function StreakWidget({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-xl">
      <Flame className="h-5 w-5 text-orange-500 fill-current" />
      <span className="font-bold text-orange-600">{streak}</span>
    </div>
  );
}
