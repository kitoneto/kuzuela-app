import { AdminSidebar } from '../components/AdminSidebar';
import { AdminTable } from '../components/AdminTable';
import { useAdminCourses } from '../hooks/useAdminCourses';
export function AdminCoursesPage() {
  const { courses, loading } = useAdminCourses();
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar/>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Courses</h1>
        {loading ? <p>Loading...</p> : <AdminTable data={courses} columns={[{key:'title',label:'Title'},{key:'level',label:'Level'},{key:'totalLessons',label:'Lessons'},{key:'isPublished',label:'Published',render:v=><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${v.isPublished?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{v.isPublished?'Yes':'No'}</span>}]}/>}
      </main>
    </div>
  );
}
