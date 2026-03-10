import { Target } from 'lucide-react';

interface WeeklyGoalCardProps {
  dailyGoal: number;
  dailyProgress: number;
}

export function WeeklyGoalCard({ dailyGoal, dailyProgress }: WeeklyGoalCardProps) {
  const percentage = dailyGoal > 0 ? Math.min((dailyProgress / dailyGoal) * 100, 100) : 0;
  const isCompleted = dailyProgress >= dailyGoal;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-gray-800">Daily Goal</span>
        </div>
        {isCompleted && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Completed! 🎉</span>}
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-gray-900">{dailyProgress}</span>
        <span className="text-gray-400 mb-1">/ {dailyGoal} XP</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
