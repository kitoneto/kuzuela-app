import { Users, BookOpen, Star, TrendingUp } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
export function AdminDashboardPage() {
  const stats = [{icon:Users,label:'Total Users',value:'1,234',color:'text-blue-600',bg:'bg-blue-50'},{icon:BookOpen,label:'Courses',value:'12',color:'text-green-600',bg:'bg-green-50'},{icon:Star,label:'Total XP Earned',value:'45,600',color:'text-yellow-600',bg:'bg-yellow-50'},{icon:TrendingUp,label:'Active Today',value:'89',color:'text-purple-600',bg:'bg-purple-50'}];
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar/>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({icon:Icon,label,value,color,bg})=>(
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`h-5 w-5 ${color}`}/></div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
