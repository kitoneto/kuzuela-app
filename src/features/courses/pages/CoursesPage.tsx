import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { CourseCard } from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';
import { SkeletonCard } from '../../../shared/components/ui/Skeleton';

export function CoursesPage() {
  const { courses, loading } = useCourses();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'available'>('all');

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ? true : filter === 'enrolled' ? c.isEnrolled : !c.isEnrolled;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Courses</h1>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'enrolled', 'available'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500">No courses found</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
