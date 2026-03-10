import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { coursesRepository } from '@/lib/repositories'
import { useLanguageContext } from '@/shared/contexts/LanguageContext'
import type { Course } from '@/types'

export function CoursesPage() {
  const { dimensions } = useLanguageContext()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'my-language'>('my-language')

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true)
      try {
        const data =
          filter === 'my-language'
            ? await coursesRepository.getByLanguage(dimensions.learningLanguage)
            : await coursesRepository.getAll()
        setCourses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses')
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [filter, dimensions.learningLanguage])

  const LEVEL_COLORS: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    elementary: 'bg-blue-100 text-blue-700',
    intermediate: 'bg-indigo-100 text-indigo-700',
    advanced: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 mt-1">Choose your learning path</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('my-language')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'my-language'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            My Language
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl">📚</span>
          <h3 className="text-lg font-semibold text-gray-900 mt-4">No courses found</h3>
          <p className="text-gray-500 mt-1">Check back soon for new content</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-md transition-all"
            >
              {course.thumbnailUrl ? (
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                      LEVEL_COLORS[course.level] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {course.level}
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.targetLanguageCode.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <span>📚 {course.totalLessons} lessons</span>
                  <span>⏱️ {course.estimatedHours}h</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
