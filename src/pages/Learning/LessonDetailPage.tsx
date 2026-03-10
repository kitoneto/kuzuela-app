import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, MessageSquare, Pencil } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { LessonTabs } from '../../components/lesson/LessonTabs';
import { VocabularyTab } from '../../components/lesson/VocabularyTab';
import { DialogueTab } from '../../components/lesson/DialogueTab';
import { ExercisesTab } from '../../components/lesson/ExercisesTab';
import { useLessons } from '../../hooks/useLessons';
import { Loading } from '../../components/common/Loading';

export function LessonDetailPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { lessons, loading } = useLessons(courseId);
  const [activeTab, setActiveTab] = useState('vocabulary');

  const lesson = lessons.find(l => l.id === lessonId);

  const tabs = [
    { id: 'vocabulary', label: 'Vocabulary', icon: <BookOpen size={14} /> },
    { id: 'dialogue', label: 'Dialogue', icon: <MessageSquare size={14} /> },
    { id: 'exercises', label: 'Exercises', icon: <Pencil size={14} /> },
  ];

  if (loading) return <Loading fullScreen />;
  if (!lesson) return (
    <AppLayout>
      <div className="text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <h2 className="font-semibold text-gray-800">Lesson not found</h2>
        <Link to={`/courses/${courseId}`} className="text-primary-600 text-sm mt-2 inline-block">
          Back to course
        </Link>
      </div>
    </AppLayout>
  );

  const vocabulary = (lesson.vocabulary as Array<{ word: string; translation: string; pronunciation?: string }>) ?? [];
  const dialogue = (lesson.dialogue as Array<{ speaker: string; text: string }>) ?? [];
  const exercises = (lesson.exercises as Array<{ type: string; question: string; options?: string[]; correct?: string; answer?: string }>) ?? [];

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          to={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Course
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
              Lesson {lesson.order_index}
            </span>
            <span className="text-xs text-yellow-600 font-medium bg-yellow-50 px-2 py-0.5 rounded-full">
              +{lesson.xp_reward} XP
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-gray-500 mt-1">{lesson.description}</p>
          )}
          {lesson.grammar_focus && (
            <div className="mt-2 inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              📖 {lesson.grammar_focus}
            </div>
          )}
        </div>

        {/* Start Active Lesson button */}
        <Link
          to={`/courses/${courseId}/lessons/${lessonId}/active`}
          className="flex items-center justify-center gap-2 py-3 mb-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
        >
          🎯 Start Interactive Lesson
        </Link>

        {/* Tabs */}
        <LessonTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'vocabulary' && <VocabularyTab vocabulary={vocabulary} />}
          {activeTab === 'dialogue' && <DialogueTab dialogue={dialogue} />}
          {activeTab === 'exercises' && <ExercisesTab exercises={exercises} />}
        </div>
      </div>
    </AppLayout>
  );
}
