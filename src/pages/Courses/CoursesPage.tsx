import { useState } from 'react';
import { Search } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { CourseGrid } from '../../components/course/CourseGrid';
import { useCourses } from '../../hooks/useCourses';
import { Input } from '../../components/common/Input';

export function CoursesPage() {
  const { courses, loading } = useCourses();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.language_code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'free' ? !course.is_premium : course.is_premium);
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Courses</h1>
          <p className="text-gray-500">Choose a language to start or continue learning</p>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search courses or languages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'free', 'premium'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all
                  ${filter === f
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Course count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-4">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
          </p>
        )}

        <CourseGrid courses={filteredCourses} loading={loading} />
      </div>
    </AppLayout>
  );
}
