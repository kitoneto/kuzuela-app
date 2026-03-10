import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users } from 'lucide-react';
export function AdminSidebar() {
  const links = [{to:'/admin',icon:LayoutDashboard,label:'Dashboard'},{to:'/admin/courses',icon:BookOpen,label:'Courses'},{to:'/admin/users',icon:Users,label:'Users'}];
  return (
    <aside className="w-56 bg-gray-900 min-h-screen p-4 flex flex-col gap-1">
      <p className="text-white font-bold text-lg px-3 mb-4">🦁 Admin</p>
      {links.map(({to,icon:Icon,label})=>(
        <NavLink key={to} to={to} end className={({isActive})=>`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive?'bg-purple-600 text-white':'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
          <Icon className="h-5 w-5"/>{label}
        </NavLink>
      ))}
    </aside>
  );
}
