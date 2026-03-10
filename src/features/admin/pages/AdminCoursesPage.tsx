import { useState, useEffect } from 'react'
import { coursesRepository } from '@/lib/repositories'
import type { Course } from '@/types'

export function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    coursesRepository.getAllAdmin()
      .then(setCourses)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  const togglePublish = async (course: Course) => {
    try {
      const updated = await coursesRepository.update(course.id, {
        isPublished: !course.isPublished,
      })
      setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    } catch (err) {
      alert('Failed to update course: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      await coursesRepository.delete(id)
      setCourses((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert('Failed to delete course: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 mt-1">{courses.length} total courses</p>
        </div>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
          + New Course
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">{error}</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Language</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Level</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Lessons</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No courses yet. Create your first course!
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{course.description}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 uppercase">
                      {course.targetLanguageCode}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm capitalize text-gray-600">{course.level}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{course.totalLessons}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          course.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePublish(course)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          {course.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="text-sm text-red-400 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
