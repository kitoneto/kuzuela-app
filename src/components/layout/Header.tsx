import { Link, useNavigate } from 'react-router-dom';
import { Heart, Flame, Star, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import { useXP } from '../../hooks/useXP';

export function Header() {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { xp } = useXP();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="text-xl font-bold text-gradient">Kuzuela</span>
          </Link>

          {/* Right side */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* XP */}
              <div className="hidden sm:flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Star size={14} className="text-yellow-500" />
                <span>{xp} XP</span>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Flame size={14} className="text-orange-500" />
                <span>{profile?.streak_days ?? 0}</span>
              </div>

              {/* Hearts */}
              <div className="hidden sm:flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>{profile?.hearts ?? 5}</span>
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                    {profile?.full_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-sm text-gray-900">{profile?.full_name ?? 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings size={16} /> Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Log in
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4 rounded-xl">
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
