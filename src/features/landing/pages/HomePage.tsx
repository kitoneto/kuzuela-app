import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, Trophy, MessageCircle } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800">
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-7xl mb-4">🦁</div>
          <h1 className="text-4xl font-bold text-white mb-2">Kuzuela</h1>
          <p className="text-purple-200 text-lg mb-2">Learn languages the African way</p>
          <p className="text-purple-300 text-sm mb-10">Better than Duolingo. Made for Angola.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          {[
            { icon: <BookOpen className="h-6 w-6" />, title: 'Smart Lessons', desc: 'Learn step by step' },
            { icon: <Zap className="h-6 w-6" />, title: 'XP & Streaks', desc: 'Stay motivated daily' },
            { icon: <MessageCircle className="h-6 w-6" />, title: 'AI Tutor', desc: 'Get instant help' },
            { icon: <Trophy className="h-6 w-6" />, title: 'Leaderboard', desc: 'Compete with friends' },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-left">
              <div className="text-purple-200 mb-2">{f.icon}</div>
              <div className="text-white font-semibold text-sm">{f.title}</div>
              <div className="text-purple-300 text-xs">{f.desc}</div>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Link
            to="/register"
            className="block w-full py-4 bg-white text-purple-700 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="block w-full py-4 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-colors"
          >
            I already have an account
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
