import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useUserLanguages } from '../hooks/useUserLanguages';
import { LanguageSelector } from '../components/LanguageSelector';
import { ProficiencyBadge } from '../components/ProficiencyBadge';
import { getLearningLanguages } from '../../../shared/constants/languages';
import type { LanguageCode, ProficiencyCode } from '../../../shared/types/languages.types';

const PROFICIENCY_OPTIONS: ProficiencyCode[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function SelectLearningLanguagePage() {
  const { user } = useAuthContext();
  const userId = user?.id;
  const navigate = useNavigate();
  const { addLanguage } = useUserLanguages(userId);

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyCode>('A1');
  const [isAdding, setIsAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!userId) return;
    setIsAdding(true);
    setSuccessMsg(null);
    try {
      await addLanguage(selectedLanguage, selectedLevel);
      setSuccessMsg(`Added ${selectedLanguage} at level ${selectedLevel}!`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Add a Language to Learn</h1>
      <p className="mb-6 text-sm text-gray-500">Choose the language you want to study and your current level.</p>

      {successMsg && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{successMsg}</div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <LanguageSelector
          label="Language to learn"
          value={selectedLanguage}
          languages={getLearningLanguages()}
          onChange={setSelectedLanguage}
          disabled={isAdding}
          className="mb-4"
        />

        <div className="mb-6 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Current proficiency level</label>
          <div className="flex flex-wrap gap-2">
            {PROFICIENCY_OPTIONS.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                <ProficiencyBadge level={level} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {isAdding ? 'Adding…' : 'Add Language'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
