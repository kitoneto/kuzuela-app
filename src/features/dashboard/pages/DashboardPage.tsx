import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../app/providers/AuthProvider';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { Flame, Star, Heart, BookOpen } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name?.split(' ')[0] ?? 'Learner';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 pt-12 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-purple-200 text-sm">{greeting},</p>
            <h1 className="text-2xl font-bold text-white">{name}! 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <Flame className="h-4 w-4 text-orange-300" />
              <span className="text-white text-sm font-bold">7</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <Heart className="h-4 w-4 text-red-300" />
              <span className="text-white text-sm font-bold">5</span>
            </div>
          </div>
        </div>
        {/* Daily goal */}
        <div className="mt-4 bg-white/10 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">Daily goal</span>
            <span className="text-purple-200 text-sm">40 / 50 XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4">
        {/* Continue learning */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <p className="text-gray-500 text-sm mb-3">Continue learning</p>
          <Link to="/courses/1/lessons/1" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🇬🇧</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">English for Beginners</p>
              <p className="text-sm text-gray-500">Lesson 6 · Greetings</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
            <div className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">Go</div>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Star className="h-5 w-5 text-yellow-500" />, value: '240', label: 'Total XP' },
            { icon: <Flame className="h-5 w-5 text-orange-500" />, value: '7', label: 'Day streak' },
            { icon: <BookOpen className="h-5 w-5 text-blue-500" />, value: '12', label: 'Lessons' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 shadow-sm text-center">
              <div className="flex justify-center mb-1">{s.icon}</div>
              <div className="font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm mb-3">Quick actions</p>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/courses" className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Browse Courses</span>
            </Link>
            <Link to="/tutor" className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
              <span className="text-lg">🤖</span>
              <span className="text-sm font-medium text-blue-700">Ask Tutor</span>
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
