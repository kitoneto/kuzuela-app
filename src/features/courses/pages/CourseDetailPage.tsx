import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { coursesRepository, lessonsRepository } from '@/lib/repositories'
import type { Course, Lesson } from '@/types'

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return

    const load = async () => {
      setIsLoading(true)
      try {
        const [courseData, lessonsData] = await Promise.all([
          coursesRepository.getById(courseId),
          lessonsRepository.getByCourseId(courseId),
        ])
        setCourse(courseData)
        setLessons(lessonsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [courseId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error || 'Course not found'}
        </div>
        <Link to="/courses" className="inline-block mt-4 text-primary-600 hover:underline">
          ← Back to Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/courses" className="text-primary-600 hover:underline text-sm mb-6 inline-block">
        ← Back to Courses
      </Link>

      {/* Course Header */}
      {course.thumbnailUrl ? (
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
      ) : (
        <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-8xl">📖</span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center bg-gray-50 rounded-xl p-3">
          <p className="text-xl font-bold text-gray-900">{course.totalLessons}</p>
          <p className="text-sm text-gray-500">Lessons</p>
        </div>
        <div className="text-center bg-gray-50 rounded-xl p-3">
          <p className="text-xl font-bold text-gray-900">{course.estimatedHours}h</p>
          <p className="text-sm text-gray-500">Duration</p>
        </div>
        <div className="text-center bg-gray-50 rounded-xl p-3">
          <p className="text-xl font-bold text-gray-900 capitalize">{course.level}</p>
          <p className="text-sm text-gray-500">Level</p>
        </div>
      </div>

      {/* Lessons List */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Lessons</h2>
      {lessons.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No lessons available yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              to={`/courses/${courseId}/lessons/${lesson.id}`}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold text-sm">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{lesson.title}</h3>
                <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 flex-shrink-0">
                <span>⏱️ {lesson.durationMinutes}m</span>
                <span className="text-yellow-500 font-medium">+{lesson.xpReward} XP</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
