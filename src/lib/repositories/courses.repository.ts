import { supabase } from '@/lib/supabase'
import type { Course } from '@/types'

interface CourseRow {
  id: string
  title: string
  description: string
  language_code: string
  target_language_code: string
  level: string
  thumbnail_url: string | null
  total_lessons: number
  estimated_hours: number
  is_published: boolean
  created_at: string
  updated_at: string
}

function mapToCourse(row: CourseRow): Course {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    languageCode: row.language_code,
    targetLanguageCode: row.target_language_code,
    level: row.level,
    thumbnailUrl: row.thumbnail_url ?? undefined,
    totalLessons: row.total_lessons,
    estimatedHours: row.estimated_hours,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const coursesRepository = {
  async getAll(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('kuzuela_courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as CourseRow[]).map(mapToCourse)
  },

  async getAllAdmin(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('kuzuela_courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as CourseRow[]).map(mapToCourse)
  },

  async getById(id: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('kuzuela_courses')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return mapToCourse(data as CourseRow)
  },

  async getByLanguage(targetLanguageCode: string): Promise<Course[]> {
    const { data, error } = await supabase
      .from('kuzuela_courses')
      .select('*')
      .eq('target_language_code', targetLanguageCode)
      .eq('is_published', true)
      .order('level')

    if (error) throw error
    return (data as CourseRow[]).map(mapToCourse)
  },

  async create(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const { data, error } = await supabase
      .from('kuzuela_courses')
      .insert({
        title: course.title,
        description: course.description,
        language_code: course.languageCode,
        target_language_code: course.targetLanguageCode,
        level: course.level,
        thumbnail_url: course.thumbnailUrl,
        total_lessons: course.totalLessons,
        estimated_hours: course.estimatedHours,
        is_published: course.isPublished,
      })
      .select()
      .single()

    if (error) throw error
    return mapToCourse(data as CourseRow)
  },

  async update(id: string, updates: Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Course> {
    const updateData: Record<string, unknown> = {}
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.level !== undefined) updateData.level = updates.level
    if (updates.thumbnailUrl !== undefined) updateData.thumbnail_url = updates.thumbnailUrl
    if (updates.totalLessons !== undefined) updateData.total_lessons = updates.totalLessons
    if (updates.estimatedHours !== undefined) updateData.estimated_hours = updates.estimatedHours
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished

    const { data, error } = await supabase
      .from('kuzuela_courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return mapToCourse(data as CourseRow)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('kuzuela_courses')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
