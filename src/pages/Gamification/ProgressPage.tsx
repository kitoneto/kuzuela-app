import { AppLayout } from '../../components/layout/AppLayout';
import { useProfile } from '../../hooks/useProfile';
import { useXP } from '../../hooks/useXP';
import { useProgress } from '../../hooks/useProgress';
import { useCourses } from '../../hooks/useCourses';
import { XPBar, StreakDisplay, HeartsDisplay } from '../../components/gamification/StreakDisplay';
import { BarChart3 } from 'lucide-react';

export function ProgressPage() {
  const { profile } = useProfile();
  const { xp, level, progressPercent } = useXP();
  const { progress } = useProgress();
  const { courses } = useCourses();

  const completedLessons = progress.filter(p => p.completed).length;
  const totalXP = progress.reduce((sum, p) => sum + p.xp_earned, 0);
  const completedCourseIds = new Set(
    progress.map(() => courses.find(c => c.id)?.id).filter(Boolean)
  );
  const coursesStarted = completedCourseIds.size;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center">
            <BarChart3 size={22} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
            <p className="text-sm text-gray-500">Keep learning every day!</p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Level Progress</h2>
          <XPBar xp={xp} level={level} progressPercent={progressPercent} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {[
            { emoji: '⭐', label: 'Total XP', value: totalXP.toLocaleString() },
            { emoji: '📚', label: 'Lessons Done', value: completedLessons },
            { emoji: '🌍', label: 'Courses Started', value: coursesStarted },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-2xl mb-1">{s.emoji}</p>
              <p className="font-bold text-xl text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Streak & Hearts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Streak</h3>
            <StreakDisplay days={profile?.streak_days ?? 0} size="lg" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Hearts</h3>
            <HeartsDisplay hearts={profile?.hearts ?? 5} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
