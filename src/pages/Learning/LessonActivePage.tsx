import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useLessons } from '../../hooks/useLessons';
import { useProgress } from '../../hooks/useProgress';
import { StepNavigator } from '../../components/lesson/StepNavigator';
import { Loading } from '../../components/common/Loading';
import { useToast } from '../../components/common/Toast';

export function LessonActivePage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { lessons, loading } = useLessons(courseId);
  const { completeLesson } = useProgress();
  const { success } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerChecked, setAnswerChecked] = useState(false);

  const lesson = lessons.find(l => l.id === lessonId);

  if (loading) return <Loading fullScreen />;
  if (!lesson) return <div>Lesson not found</div>;

  const vocabulary = (lesson.vocabulary as Array<{ word: string; translation: string }>) ?? [];
  const exercises = (lesson.exercises as Array<{ type: string; question: string; options?: string[]; correct?: string; answer?: string }>) ?? [];

  // Build steps: intro + vocab + exercises + completion
  const steps: Array<{ type: 'intro' | 'vocabulary' | 'exercise' | 'complete'; data?: { word?: string; translation?: string; pronunciation?: string; type?: string; question?: string; options?: string[]; correct?: string; answer?: string } }> = [
    { type: 'intro' },
    ...vocabulary.slice(0, 5).map(v => ({ type: 'vocabulary' as const, data: v })),
    ...exercises.slice(0, 3).map(e => ({ type: 'exercise' as const, data: e })),
    { type: 'complete' as const },
  ];

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const isLast = currentStep === totalSteps - 1;

  const handleNext = () => {
    setSelectedAnswer(null);
    setAnswerChecked(false);
    if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1);
  };
  const handlePrev = () => {
    setSelectedAnswer(null);
    setAnswerChecked(false);
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async () => {
    await completeLesson(lessonId!, 100, lesson.xp_reward);
    success(`🎉 Lesson complete! You earned ${lesson.xp_reward} XP`);
    setCompleted(true);
    setTimeout(() => navigate(`/courses/${courseId}`), 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-teal-500">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-white p-8">
          <div className="text-7xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Lesson Complete!</h1>
          <p className="text-xl opacity-90">+{lesson.xp_reward} XP earned</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-gray-200">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}`)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
          <span className="text-sm font-medium text-gray-600">{lesson.title}</span>
          <span className="text-sm text-primary-600 font-semibold">+{lesson.xp_reward} XP</span>
        </div>
      </div>

      <div className="pt-24 pb-16 max-w-2xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Intro step */}
            {step.type === 'intro' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{lesson.title}</h2>
                <p className="text-gray-500 mb-4">{lesson.description ?? "Let's start learning!"}</p>
                {lesson.grammar_focus && (
                  <div className="inline-block bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded-xl mb-4">
                    📖 Grammar focus: {lesson.grammar_focus}
                  </div>
                )}
                <p className="text-sm text-gray-400">
                  {vocabulary.length} words • {exercises.length} exercises
                </p>
              </div>
            )}

            {/* Vocabulary step */}
            {step.type === 'vocabulary' && step.data && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400 uppercase tracking-wide mb-6">New Word</p>
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-sm mb-6">
                  <p className="text-4xl font-bold text-gray-900 mb-2">{(step.data as { word: string }).word}</p>
                  <p className="text-gray-400 font-mono text-lg">{(step.data as { pronunciation?: string }).pronunciation ?? ''}</p>
                  <div className="my-4 border-t border-gray-100" />
                  <p className="text-2xl font-semibold text-primary-600">{(step.data as { translation: string }).translation}</p>
                </div>
              </div>
            )}

            {/* Exercise step */}
            {step.type === 'exercise' && step.data && (
              <div className="py-8">
                <p className="text-sm text-gray-400 uppercase tracking-wide mb-4 text-center">Exercise</p>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <p className="font-semibold text-gray-900 text-lg mb-6">
                    {(step.data as { question: string }).question}
                  </p>
                  {(step.data as { options?: string[] }).options ? (
                    <div className="grid grid-cols-1 gap-3">
                      {(step.data as { options: string[] }).options.map((opt) => {
                        const isSelected = selectedAnswer === opt;
                        const correctAnswer = (step.data as { correct?: string; answer?: string }).correct ?? (step.data as { answer?: string }).answer ?? '';
                        const isCorrect = opt === correctAnswer;
                        const showResult = answerChecked;
                        return (
                          <button
                            key={opt}
                            onClick={() => !answerChecked && setSelectedAnswer(opt)}
                            className={`px-5 py-4 rounded-xl text-left font-medium text-sm border-2 transition-all
                              ${showResult && isCorrect ? 'border-green-400 bg-green-50 text-green-800'
                                : showResult && isSelected && !isCorrect ? 'border-red-400 bg-red-50 text-red-800'
                                : isSelected ? 'border-primary-400 bg-primary-50 text-primary-700'
                                : 'border-gray-100 hover:border-gray-200 text-gray-700'
                              }
                            `}
                          >
                            <span className="flex items-center gap-3">
                              {showResult && isCorrect && <CheckCircle size={16} className="text-green-500" />}
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={selectedAnswer ?? ''}
                      onChange={e => setSelectedAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none"
                    />
                  )}
                  {selectedAnswer && !answerChecked && (
                    <button
                      onClick={() => setAnswerChecked(true)}
                      className="mt-4 w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      Check Answer
                    </button>
                  )}
                  {answerChecked && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-4 text-center font-semibold text-sm ${
                        selectedAnswer?.toLowerCase().trim() === ((step.data as { correct?: string; answer?: string }).correct ?? (step.data as { answer?: string }).answer ?? '').toLowerCase().trim()
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {selectedAnswer?.toLowerCase().trim() === ((step.data as { correct?: string; answer?: string }).correct ?? (step.data as { answer?: string }).answer ?? '').toLowerCase().trim()
                        ? '✅ Correct! Well done!'
                        : `❌ Correct answer: ${(step.data as { correct?: string; answer?: string }).correct ?? (step.data as { answer?: string }).answer}`
                      }
                    </motion.p>
                  )}
                </div>
              </div>
            )}

            {/* Complete step */}
            {step.type === 'complete' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're done!</h2>
                <p className="text-gray-500 mb-2">Great work completing this lesson.</p>
                <p className="text-primary-600 font-bold text-lg">+{lesson.xp_reward} XP</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <StepNavigator
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrev={handlePrev}
          onNext={handleNext}
          onComplete={handleComplete}
          isLastStep={isLast}
        />
      </div>
    </div>
  );
}
