import { NavLink } from 'react-router-dom';
import { BOTTOM_NAV_ITEMS } from '../../../app/config/navigation';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {BOTTOM_NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-0 flex-1 ${
                isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-purple-600' : ''}`} />
                <span className={`text-xs font-medium truncate ${isActive ? 'text-purple-600' : ''}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
