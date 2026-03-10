import { motion } from 'framer-motion';
import { Flame, Star, BookOpen, Trophy } from 'lucide-react';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { useProgress } from '../hooks/useProgress';
import { WeeklyGoalCard } from '../components/WeeklyGoalCard';
import { Loading } from '../../../shared/components/feedback/Loading';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ProgressPage() {
  const { stats, loading } = useProgress();

  if (loading) return <Loading fullScreen />;

  const maxXP = Math.max(...(stats?.weeklyXP ?? [1]));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
        <p className="text-sm text-gray-500">Your learning journey</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Flame, label: 'Current Streak', value: `${stats?.currentStreak ?? 0}🔥`, color: 'text-orange-600', bg: 'bg-orange-50' },
            { icon: Star, label: 'Total XP', value: stats?.totalXP.toLocaleString() ?? '0', color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { icon: BookOpen, label: 'Lessons Done', value: `${stats?.lessonsCompleted ?? 0}`, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Trophy, label: 'Best Streak', value: `${stats?.longestStreak ?? 0} days`, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </motion.div>
          ))}
        </div>

        {stats && <WeeklyGoalCard dailyGoal={stats.dailyGoal} dailyProgress={stats.dailyProgress} />}

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">Weekly XP</h2>
          <div className="flex items-end gap-2 h-24">
            {(stats?.weeklyXP ?? [0, 0, 0, 0, 0, 0, 0]).map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${maxXP > 0 ? (xp / maxXP) * 80 : 0}px` }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-purple-500 to-indigo-400 min-h-[4px]"
                />
                <span className="text-xs text-gray-400">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
