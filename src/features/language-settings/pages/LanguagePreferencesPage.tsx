import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useLanguagePreferences } from '../hooks/useLanguagePreferences';
import { useUserLanguages } from '../hooks/useUserLanguages';
import { LanguageSelector } from '../components/LanguageSelector';
import { ProficiencyBadge } from '../components/ProficiencyBadge';
import { Loading } from '../../../components/common/Loading';
import { getInterfaceLanguages, getExplanationLanguages, getNativeLanguages, getLearningLanguages } from '../../../shared/constants/languages';
import type { LanguageCode, UserLanguagePreferences } from '../../../shared/types/languages.types';

export function LanguagePreferencesPage() {
  const { user } = useAuthContext();
  const userId = user?.id;
  const { preferences, isLoading, updatePreferences } = useLanguagePreferences(userId);
  const { learningLanguages, addLanguage, removeLanguage } = useUserLanguages(userId);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = async (field: keyof UserLanguagePreferences, value: LanguageCode) => {
    if (!preferences) return;
    setIsSaving(true);
    setSuccessMsg(null);
    try {
      await updatePreferences({ [field]: value });
      setSuccessMsg('Preferences saved successfully.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loading text="Loading language settings..." />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Language Settings</h1>

      {successMsg && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{successMsg}</div>
      )}

      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Language Preferences</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <LanguageSelector
            label="Native Language"
            value={preferences?.nativeLanguage ?? 'pt'}
            languages={getNativeLanguages()}
            onChange={v => handleChange('nativeLanguage', v)}
            disabled={isSaving}
          />
          <LanguageSelector
            label="Learning Language"
            value={preferences?.learningLanguage ?? 'en'}
            languages={getLearningLanguages()}
            onChange={v => handleChange('learningLanguage', v)}
            disabled={isSaving}
          />
          <LanguageSelector
            label="Interface Language"
            value={preferences?.interfaceLanguage ?? 'pt'}
            languages={getInterfaceLanguages()}
            onChange={v => handleChange('interfaceLanguage', v)}
            disabled={isSaving}
          />
          <LanguageSelector
            label="Explanation Language"
            value={preferences?.explanationLanguage ?? 'pt'}
            languages={getExplanationLanguages()}
            onChange={v => handleChange('explanationLanguage', v)}
            disabled={isSaving}
          />
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">My Learning Languages</h2>
        {learningLanguages.length === 0 ? (
          <p className="text-sm text-gray-500">No learning languages added yet.</p>
        ) : (
          <ul className="space-y-3">
            {learningLanguages.map(l => (
              <li key={l.languageCode} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{l.languageCode}</span>
                  <ProficiencyBadge level={l.proficiencyLevel} />
                  <span className="text-xs text-gray-500">{l.totalXP} XP</span>
                </div>
                <button
                  onClick={() => removeLanguage(l.languageCode)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <LanguageSelector
            label="Add a language to learn"
            value={'en' as LanguageCode}
            languages={getLearningLanguages()}
            onChange={lang => addLanguage(lang)}
          />
        </div>
      </section>
    </div>
  );
}
