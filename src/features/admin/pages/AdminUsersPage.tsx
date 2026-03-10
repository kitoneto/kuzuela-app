import { AdminSidebar } from '../components/AdminSidebar';
import { AdminTable } from '../components/AdminTable';
import { useAdminUsers } from '../hooks/useAdminUsers';
export function AdminUsersPage() {
  const { users, loading } = useAdminUsers();
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar/>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>
        {loading ? <p>Loading...</p> : <AdminTable data={users} columns={[{key:'displayName',label:'Name'},{key:'email',label:'Email'},{key:'role',label:'Role'},{key:'xp',label:'XP'}]}/>}
      </main>
    </div>
  );
}
