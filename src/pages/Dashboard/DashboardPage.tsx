import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useProfile } from '../../hooks/useProfile';
import { useXP } from '../../hooks/useXP';
import { useCourses } from '../../hooks/useCourses';
import { useProgress } from '../../hooks/useProgress';
import { XPBar, HeartsDisplay } from '../../components/gamification/StreakDisplay';
import { CourseCard } from '../../components/course/CourseCard';
import { Loading } from '../../components/common/Loading';

export function DashboardPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { xp, level, progressPercent } = useXP();
  const { courses } = useCourses();
  const { progress } = useProgress();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const completedLessons = progress.filter(p => p.completed).length;
  const totalXPThisWeek = progress
    .filter(p => {
      if (!p.completed_at) return false;
      const completedDate = new Date(p.completed_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return completedDate >= weekAgo;
    })
    .reduce((sum, p) => sum + p.xp_earned, 0);

  const currentCourse = courses.find(c => c.id === profile?.current_course_id) ?? courses[0];

  if (profileLoading) return <Loading fullScreen />;

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {getGreeting()}, {profile?.full_name?.split(' ')[0] ?? 'there'}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Keep up the great work on your language journey.</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Star size={20} className="text-yellow-500" />, label: 'Total XP', value: xp.toLocaleString(), bg: 'bg-yellow-50' },
            { icon: <Flame size={20} className="text-orange-500" />, label: 'Streak', value: `${profile?.streak_days ?? 0} days`, bg: 'bg-orange-50' },
            { icon: <BookOpen size={20} className="text-blue-500" />, label: 'Lessons Done', value: completedLessons, bg: 'bg-blue-50' },
            { icon: <TrendingUp size={20} className="text-green-500" />, label: 'This Week', value: `${totalXPThisWeek} XP`, bg: 'bg-green-50' },
          ].map(stat => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${stat.bg} rounded-2xl p-4`}
            >
              <div className="mb-2">{stat.icon}</div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP Progress */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Your Level Progress</h2>
              <XPBar xp={xp} level={level} progressPercent={progressPercent} />
            </div>

            {/* Continue Learning */}
            {currentCourse && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Continue Learning</h2>
                  <Link to="/courses" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    All courses <ArrowRight size={14} />
                  </Link>
                </div>
                <CourseCard course={currentCourse} progress={20} />
              </div>
            )}

            {/* Daily Goal */}
            <div className="bg-gradient-to-r from-primary-500 to-teal-500 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-lg">Daily Goal</h2>
                  <p className="text-sm opacity-80">Complete 1 lesson today</p>
                </div>
                <span className="text-3xl">🎯</span>
              </div>
              <div className="w-full h-2 bg-white/30 rounded-full mb-2">
                <div className="h-full bg-white rounded-full w-0" />
              </div>
              <p className="text-xs opacity-70">0/1 lessons completed today</p>
              <Link
                to="/courses"
                className="mt-3 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Start a Lesson
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hearts */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Hearts</h3>
              <HeartsDisplay hearts={profile?.hearts ?? 5} />
              <p className="text-xs text-gray-400 mt-2">Regenerate in: 4h 32m</p>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { to: '/tutor', icon: '🤖', label: 'Talk to AI Tutor' },
                  { to: '/leaderboard', icon: '🏆', label: 'View Leaderboard' },
                  { to: '/achievements', icon: '🎖️', label: 'My Achievements' },
                ].map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                    <ArrowRight size={14} className="ml-auto text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
