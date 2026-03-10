import { supabase } from '@/lib/supabase'
import type { Lesson } from '@/types'

interface LessonRow {
  id: string
  course_id: string
  title: string
  description: string
  content: Record<string, unknown>
  language_code: string
  target_language_code: string
  order_index: number
  xp_reward: number
  duration_minutes: number
  is_published: boolean
  created_at: string
  updated_at: string
}

function mapToLesson(row: LessonRow): Lesson {
  return {
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    description: row.description,
    content: row.content as unknown as Lesson['content'],
    languageCode: row.language_code,
    targetLanguageCode: row.target_language_code,
    orderIndex: row.order_index,
    xpReward: row.xp_reward,
    durationMinutes: row.duration_minutes,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const lessonsRepository = {
  async getByCourseId(courseId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('kuzuela_lessons')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_published', true)
      .order('order_index')

    if (error) throw error
    return (data as LessonRow[]).map(mapToLesson)
  },

  async getByCourseIdAdmin(courseId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('kuzuela_lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index')

    if (error) throw error
    return (data as LessonRow[]).map(mapToLesson)
  },

  async getById(id: string): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('kuzuela_lessons')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return mapToLesson(data as LessonRow)
  },

  async create(lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('kuzuela_lessons')
      .insert({
        course_id: lesson.courseId,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        language_code: lesson.languageCode,
        target_language_code: lesson.targetLanguageCode,
        order_index: lesson.orderIndex,
        xp_reward: lesson.xpReward,
        duration_minutes: lesson.durationMinutes,
        is_published: lesson.isPublished,
      })
      .select()
      .single()

    if (error) throw error
    return mapToLesson(data as LessonRow)
  },

  async update(id: string, updates: Partial<Omit<Lesson, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>>): Promise<Lesson> {
    const updateData: Record<string, unknown> = {}
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.content !== undefined) updateData.content = updates.content
    if (updates.orderIndex !== undefined) updateData.order_index = updates.orderIndex
    if (updates.xpReward !== undefined) updateData.xp_reward = updates.xpReward
    if (updates.durationMinutes !== undefined) updateData.duration_minutes = updates.durationMinutes
    if (updates.isPublished !== undefined) updateData.is_published = updates.isPublished

    const { data, error } = await supabase
      .from('kuzuela_lessons')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return mapToLesson(data as LessonRow)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('kuzuela_lessons')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
