import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/shared/contexts/AuthContext'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { path: '/admin/courses', label: 'Courses', icon: '📚', exact: false },
  { path: '/admin/lessons', label: 'Lessons', icon: '📖', exact: false },
  { path: '/admin/users', label: 'Users', icon: '👥', exact: false },
  { path: '/admin/languages', label: 'Languages', icon: '🌍', exact: false },
]

export function AdminLayout() {
  const { user, signOut } = useAuthContext()
  const location = useLocation()

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <p className="font-bold text-sm">Kuzuela Admin</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    isActive(item.path, item.exact)
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm transition-colors mb-2"
          >
            ← Student View
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-red-400 text-sm transition-colors w-full"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
