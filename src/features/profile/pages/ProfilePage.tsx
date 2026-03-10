import { useAuth } from '../../../app/providers/AuthProvider';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { User, Settings, Star, BookOpen, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const name = user?.user_metadata?.full_name ?? 'Learner';
  const email = user?.email ?? '';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 pt-12 pb-8 text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{name}</h1>
        <p className="text-purple-200 text-sm">{email}</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-center">
            <div className="text-white font-bold text-lg">240</div>
            <div className="text-purple-200 text-xs">Total XP</div>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">7</div>
            <div className="text-purple-200 text-xs">Day streak</div>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">12</div>
            <div className="text-purple-200 text-xs">Lessons</div>
          </div>
        </div>
      </div>
      <div className="px-4 mt-6 space-y-3">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {[
            { icon: <Star className="h-5 w-5 text-yellow-500" />, label: 'Achievements', to: '/achievements' },
            { icon: <BookOpen className="h-5 w-5 text-blue-500" />, label: 'My Courses', to: '/courses' },
            { icon: <Flame className="h-5 w-5 text-orange-500" />, label: 'Progress', to: '/progress' },
            { icon: <Settings className="h-5 w-5 text-gray-500" />, label: 'Settings', to: '/settings' },
          ].map((item, i) => (
            <Link key={i} to={item.to} className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
              {item.icon}
              <span className="flex-1 text-gray-700 font-medium">{item.label}</span>
              <span className="text-gray-400">›</span>
            </Link>
          ))}
        </div>
        <button
          onClick={() => signOut()}
          className="w-full py-3 border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
        >
          Sign out
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
