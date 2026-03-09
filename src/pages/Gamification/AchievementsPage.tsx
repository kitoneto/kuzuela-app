import { AppLayout } from '../../components/layout/AppLayout';
import { AchievementBadge } from '../../components/gamification/AchievementBadge';
import { useGamification } from '../../hooks/useGamification';
import { Loading } from '../../components/common/Loading';
import { Award } from 'lucide-react';

// All possible achievements (locked ones shown as placeholder)
const ALL_ACHIEVEMENTS = [
  { type: 'first_lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯' },
  { type: 'streak_3', title: '3-Day Streak', description: 'Maintain a 3-day streak', icon: '🔥' },
  { type: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥' },
  { type: 'streak_30', title: 'Monthly Master', description: '30-day learning streak', icon: '⚡' },
  { type: 'xp_100', title: 'XP Collector', description: 'Earn 100 XP', icon: '⭐' },
  { type: 'xp_1000', title: 'XP Champion', description: 'Earn 1,000 XP', icon: '🌟' },
  { type: 'xp_10000', title: 'XP Legend', description: 'Earn 10,000 XP', icon: '💫' },
  { type: 'lessons_5', title: 'Quick Learner', description: 'Complete 5 lessons', icon: '📚' },
  { type: 'lessons_25', title: 'Dedicated Learner', description: 'Complete 25 lessons', icon: '🎓' },
  { type: 'perfect_score', title: 'Perfectionist', description: 'Get 100% on any lesson', icon: '💯' },
  { type: 'tutor_chat', title: 'Chat Addict', description: 'Send 10 messages to AI tutor', icon: '🤖' },
  { type: 'multilingual', title: 'Multilingual', description: 'Start 3 different courses', icon: '🌍' },
];

export function AchievementsPage() {
  const { achievements, loading } = useGamification();

  const earnedTypes = new Set(achievements.map(a => a.type));

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 flex items-center justify-center">
            <Award size={22} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
            <p className="text-sm text-gray-500">{achievements.length} earned • {ALL_ACHIEVEMENTS.length} total</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="font-bold text-primary-600">{achievements.length}/{ALL_ACHIEVEMENTS.length}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-400 to-teal-400 rounded-full"
              style={{ width: `${(achievements.length / ALL_ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {achievements.length > 0 && (
              <>
                <h2 className="font-semibold text-gray-800 mb-4">Earned 🏆</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {achievements.map(ach => (
                    <AchievementBadge key={ach.id} achievement={ach} />
                  ))}
                </div>
              </>
            )}

            <h2 className="font-semibold text-gray-800 mb-4">Locked 🔒</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ALL_ACHIEVEMENTS
                .filter(a => !earnedTypes.has(a.type))
                .map(ach => (
                  <div key={ach.type} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-center opacity-60">
                    <div className="text-3xl mb-2 grayscale">{ach.icon}</div>
                    <p className="font-semibold text-sm text-gray-600">{ach.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{ach.description}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
