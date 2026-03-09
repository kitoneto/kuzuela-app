import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useCourses } from '../../hooks/useCourses';
import { useProfile } from '../../hooks/useProfile';

const GOALS = [
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'work', label: 'Work', emoji: '💼' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { id: 'culture', label: 'Culture', emoji: '🎭' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'fun', label: 'Just for fun', emoji: '😄' },
];

const DAILY_GOALS = [
  { minutes: 5, label: 'Casual', description: '5 min/day', emoji: '🌱' },
  { minutes: 10, label: 'Regular', description: '10 min/day', emoji: '🌿' },
  { minutes: 20, label: 'Serious', description: '20 min/day', emoji: '🌳' },
  { minutes: 30, label: 'Intense', description: '30 min/day', emoji: '🚀' },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { updateProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(10);

  const steps = ['Choose Language', 'Your Goal', 'Daily Target'];

  const handleComplete = async () => {
    if (selectedCourse) {
      await updateProfile({ current_course_id: selectedCourse });
    }
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-teal-50 flex flex-col">
      {/* Progress */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? 'bg-primary-500' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-right">Step {step + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Language selection */}
            {step === 0 && (
              <div>
                <div className="text-center mb-8">
                  <span className="text-5xl">🌍</span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">What do you want to learn?</h1>
                  <p className="text-gray-500">Choose a language to get started</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {courses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all
                        ${selectedCourse === course.id
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                      <span className="text-3xl block mb-2">{course.flag_emoji}</span>
                      <p className="font-semibold text-sm text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{course.level}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Goal */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <span className="text-5xl">🎯</span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">Why are you learning?</h1>
                  <p className="text-gray-500">This helps us personalize your experience</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all
                        ${selectedGoal === goal.id
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                      <span className="text-3xl block mb-2">{goal.emoji}</span>
                      <p className="font-medium text-sm text-gray-900">{goal.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Daily goal */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <span className="text-5xl">⏱️</span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">Set your daily goal</h1>
                  <p className="text-gray-500">How much time can you dedicate daily?</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {DAILY_GOALS.map(goal => (
                    <button
                      key={goal.minutes}
                      onClick={() => setSelectedMinutes(goal.minutes)}
                      className={`p-5 rounded-2xl border-2 text-center transition-all
                        ${selectedMinutes === goal.minutes
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                      <span className="text-3xl block mb-2">{goal.emoji}</span>
                      <p className="font-bold text-gray-900">{goal.label}</p>
                      <p className="text-sm text-gray-500">{goal.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <button
            onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : handleComplete()}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-colors"
          >
            {step < steps.length - 1 ? (
              <>Next <ArrowRight size={16} /></>
            ) : (
              <>Start Learning! 🚀</>
            )}
          </button>
        </div>
        {step === 0 && (
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-center text-sm text-gray-400 mt-3 hover:text-gray-600 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
