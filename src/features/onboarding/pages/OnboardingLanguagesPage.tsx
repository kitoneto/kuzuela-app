import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useLanguagePreferences } from '../../language-settings/hooks/useLanguagePreferences';
import { useUserLanguages } from '../../language-settings/hooks/useUserLanguages';
import { LanguageSelector } from '../../language-settings/components/LanguageSelector';
import { Loading } from '../../../components/common/Loading';
import {
  getNativeLanguages,
  getInterfaceLanguages,
  getLearningLanguages,
  getExplanationLanguages,
} from '../../../shared/constants/languages';
import type { LanguageCode } from '../../../shared/types/languages.types';

type OnboardingStep = 'native' | 'interface' | 'learning' | 'explanation' | 'done';

const STEPS: OnboardingStep[] = ['native', 'interface', 'learning', 'explanation'];

const stepConfig: Record<OnboardingStep, { title: string; description: string }> = {
  native: {
    title: 'What is your native language?',
    description: 'This helps us personalise your learning experience.',
  },
  interface: {
    title: 'What language should the app use?',
    description: 'Choose the language for menus, buttons and instructions.',
  },
  learning: {
    title: 'Which language do you want to learn?',
    description: 'You can add more languages later.',
  },
  explanation: {
    title: 'Which language should we use for explanations?',
    description: 'Grammar tips and hints will appear in this language.',
  },
  done: { title: '', description: '' },
};

export function OnboardingLanguagesPage() {
  const { user } = useAuthContext();
  const userId = user?.id;
  const navigate = useNavigate();

  const { preferences, isLoading, updatePreferences } = useLanguagePreferences(userId);
  const { addLanguage } = useUserLanguages(userId);

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('native');
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCode>('pt');
  const [interfaceLanguage, setInterfaceLanguage] = useState<LanguageCode>('pt');
  const [learningLanguage, setLearningLanguage] = useState<LanguageCode>('en');
  const [explanationLanguage, setExplanationLanguage] = useState<LanguageCode>('pt');
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading) return <Loading text="Loading…" />;

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const handleNext = async () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    } else {
      // Final step - save everything
      setIsSaving(true);
      try {
        await updatePreferences({
          nativeLanguage,
          interfaceLanguage,
          learningLanguage,
          explanationLanguage,
        });
        await addLanguage(learningLanguage);
        navigate('/dashboard');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setCurrentStep(STEPS[stepIndex - 1]);
  };

  const config = stepConfig[currentStep];

  const renderSelector = () => {
    switch (currentStep) {
      case 'native':
        return (
          <LanguageSelector
            value={nativeLanguage}
            languages={getNativeLanguages()}
            onChange={setNativeLanguage}
          />
        );
      case 'interface':
        return (
          <LanguageSelector
            value={interfaceLanguage}
            languages={getInterfaceLanguages()}
            onChange={setInterfaceLanguage}
          />
        );
      case 'learning':
        return (
          <LanguageSelector
            value={learningLanguage}
            languages={getLearningLanguages()}
            onChange={setLearningLanguage}
          />
        );
      case 'explanation':
        return (
          <LanguageSelector
            value={explanationLanguage}
            languages={getExplanationLanguages()}
            onChange={setExplanationLanguage}
          />
        );
      default:
        return null;
    }
  };

  // Suppress unused warning — preferences may be needed for default values in extended version
  void preferences;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Progress bar */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mb-1 text-xs font-medium text-gray-400">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
        <h1 className="mb-2 text-xl font-bold text-gray-900">{config.title}</h1>
        <p className="mb-6 text-sm text-gray-500">{config.description}</p>

        {renderSelector()}

        <div className="mt-8 flex gap-3">
          {stepIndex > 0 && (
            <button
              onClick={handleBack}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isSaving}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : stepIndex < STEPS.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}
