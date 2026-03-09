import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, Trophy, Crown, User, BarChart3 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/tutor', icon: MessageCircle, label: 'AI Tutor' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/achievements', icon: BarChart3, label: 'Achievements' },
  { to: '/premium', icon: Crown, label: 'Premium' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 flex-1">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-primary-500 to-teal-500 rounded-xl p-4 text-white">
          <p className="font-semibold text-sm mb-1">Go Premium 🚀</p>
          <p className="text-xs opacity-90">Unlock all courses and features</p>
          <NavLink
            to="/premium"
            className="mt-2 block text-center bg-white/20 hover:bg-white/30 rounded-lg py-1.5 text-xs font-semibold transition-colors"
          >
            Upgrade Now
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const { user } = useAuth();
  if (!user) return null;

  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {mobileItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <Icon size={22} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
