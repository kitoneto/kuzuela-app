import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useLanguageContext } from '../contexts/LanguageContext'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Home', icon: '🏠' },
  { path: '/courses', label: 'Courses', icon: '📚' },
  { path: '/tutor', label: 'Tutor', icon: '🤖' },
  { path: '/progress', label: 'Progress', icon: '📈' },
  { path: '/language-settings', label: 'Languages', icon: '🌍' },
]

export function AppLayout() {
  const { user, signOut } = useAuthContext()
  const { dimensions, progressByLanguage } = useLanguageContext()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const currentProgress = progressByLanguage[dimensions.learningLanguage]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-gray-900">Kuzuela</span>
          </div>

          {/* Language + XP indicator */}
          {currentProgress && (
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-xl">
                <span className="text-yellow-600 font-bold">{currentProgress.xp.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-xl">
                <span className="text-red-500">🔥</span>
                <span className="text-red-600 font-bold">{currentProgress.streak}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-xl">
                <span className="text-purple-600 font-bold">Lv.{currentProgress.level}</span>
              </div>
            </div>
          )}

          {/* User menu */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.displayName?.split(' ')[0]}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto pb-24 sm:pb-8">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
        <div className="flex">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors',
                  isActive ? 'text-primary-600' : 'text-gray-500'
                )
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Side Navigation (Desktop) */}
      <nav className="hidden sm:flex fixed top-16 left-0 bottom-0 w-56 bg-white border-r border-gray-200 flex-col p-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors mb-1',
                isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
              )
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
