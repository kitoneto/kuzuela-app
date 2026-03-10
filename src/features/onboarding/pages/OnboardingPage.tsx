import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'fr', flag: '🇫🇷', name: 'French' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish' },
  { code: 'pt', flag: '🇵🇹', name: 'Portuguese' },
];

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-6xl mb-4">🦁</div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Kuzuela!</h1>
          <p className="text-purple-200 mb-8">Let's set up your learning journey</p>
          <button
            onClick={() => setStep(1)}
            className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto pt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">What do you want to learn?</h2>
        <p className="text-gray-500 mb-6">Choose your target language</p>
        <div className="space-y-3 mb-8">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selected === lang.code
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="font-semibold text-gray-800">{lang.name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          disabled={!selected}
          className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold disabled:opacity-50 hover:bg-purple-700 transition-colors"
        >
          Start Learning!
        </button>
      </div>
    </div>
  );
}
