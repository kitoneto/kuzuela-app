import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLesson } from '../hooks/useLesson';
import { Loading } from '../../../shared/components/feedback/Loading';
import { ttsClient } from '../../../integrations/ai/tts.client';

type Tab = 'vocabulary' | 'dialogue' | 'exercises';

export function LessonPage() {
  const { courseId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const { lesson, loading } = useLesson(lessonId);
  const [activeTab, setActiveTab] = useState<Tab>('vocabulary');

  if (loading) return <Loading fullScreen />;
  if (!lesson) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-gray-500">Lesson not found</p>
    </div>
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: 'vocabulary', label: 'Vocabulary' },
    { key: 'dialogue', label: 'Dialogue' },
    { key: 'exercises', label: 'Exercises' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-white px-4 pt-12 pb-0 border-b border-gray-100">
        <button onClick={() => navigate(`/courses/${courseId}`)} className="flex items-center gap-2 text-gray-500 mb-4">
          <ArrowLeft className="h-5 w-5" /> Back
        </button>
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-sm text-gray-500">{lesson.description}</p>
        </div>
        <div className="flex border-b border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.key ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {activeTab === 'vocabulary' && (
          <div className="space-y-3">
            {lesson.vocabulary.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-lg">{item.word}</span>
                      {item.phonetic && <span className="text-xs text-gray-400">{item.phonetic}</span>}
                    </div>
                    <span className="text-purple-600 font-medium">{item.translation}</span>
                    <p className="text-sm text-gray-500 mt-1 italic">&ldquo;{item.example}&rdquo;</p>
                  </div>
                  <button
                    onClick={() => ttsClient.speak(item.word)}
                    className="text-gray-400 hover:text-purple-600 flex-shrink-0"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'dialogue' && (
          <div className="space-y-3">
            {lesson.dialogue.map((line, i) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex gap-3 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700 flex-shrink-0">
                  {line.speaker[0]}
                </div>
                <div className={`flex-1 max-w-xs ${i % 2 === 0 ? '' : 'items-end'}`}>
                  <p className="text-xs text-gray-400 mb-1 font-medium">{line.speaker}</p>
                  <div className={`rounded-2xl p-3 ${i % 2 === 0 ? 'bg-white border border-gray-100' : 'bg-purple-600 text-white'}`}>
                    <p className="font-medium text-sm">{line.text}</p>
                    <p className={`text-xs mt-1 ${i % 2 === 0 ? 'text-gray-400' : 'text-purple-200'}`}>{line.translation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-center">
              <div className="text-5xl mb-3">📝</div>
              <h3 className="font-bold text-gray-800 mb-2">Ready to practice?</h3>
              <p className="text-sm text-gray-500 mb-6">Test what you've learned with interactive exercises.</p>
            </div>
            <button
              onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/active`)}
              className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-colors"
            >
              <Play className="h-5 w-5" /> Start Exercises
            </button>
            <p className="text-xs text-gray-400">Earn {lesson.xpReward} XP on completion</p>
          </div>
        )}
      </div>
    </div>
  );
}
