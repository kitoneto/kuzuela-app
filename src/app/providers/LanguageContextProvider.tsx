import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { UserLanguagePreferencesRepository } from '../../integrations/supabase/repositories/userLanguagePreferences.repository';
import { UserLanguageProgressRepository } from '../../integrations/supabase/repositories/userLanguageProgress.repository';
import type {
  LanguageCode,
  UserLanguagePreferences,
  UserLearningLanguage,
  UserLanguageProgress,
  LanguageContext,
} from '../../shared/types/languages.types';

export interface LanguageContextType {
  userPreferences: UserLanguagePreferences | null;
  learningLanguages: UserLearningLanguage[];
  currentLearningLanguage: LanguageCode;
  setCurrentLearningLanguage: (lang: LanguageCode) => void;
  languageProgress: Partial<Record<LanguageCode, UserLanguageProgress>>;
  isLoading: boolean;
  updatePreferences: (prefs: Partial<UserLanguagePreferences>) => Promise<void>;
  addLearningLanguage: (lang: LanguageCode) => Promise<void>;
  removeLearningLanguage: (lang: LanguageCode) => Promise<void>;
  getLanguageContext: () => LanguageContext;
}

const LanguageCtx = createContext<LanguageContextType | undefined>(undefined);

const prefsRepo = new UserLanguagePreferencesRepository();
const progressRepo = new UserLanguageProgressRepository();

export function LanguageContextProvider({
  children,
  userId,
}: {
  children: ReactNode;
  userId?: string;
}) {
  const [userPreferences, setUserPreferences] = useState<UserLanguagePreferences | null>(null);
  const [learningLanguages, setLearningLanguages] = useState<UserLearningLanguage[]>([]);
  const [languageProgress, setLanguageProgress] = useState<Partial<Record<LanguageCode, UserLanguageProgress>>>({});
  const [currentLearningLanguage, setCurrentLearningLanguage] = useState<LanguageCode>('en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    Promise.all([
      prefsRepo.getUserPreferences(userId),
      prefsRepo.getUserLearningLanguages(userId),
      progressRepo.getAllProgress(userId),
    ])
      .then(([prefs, langs, allProgress]) => {
        setUserPreferences(prefs);
        setLearningLanguages(langs);
        if (prefs?.learningLanguage) setCurrentLearningLanguage(prefs.learningLanguage);
        const progressMap: Partial<Record<LanguageCode, UserLanguageProgress>> = {};
        for (const p of allProgress) progressMap[p.languageCode] = p;
        setLanguageProgress(progressMap);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  const updatePreferences = useCallback(
    async (prefs: Partial<UserLanguagePreferences>) => {
      if (!userId) return;
      await prefsRepo.updateUserPreferences(userId, prefs);
      setUserPreferences(prev => (prev ? { ...prev, ...prefs } : (prefs as UserLanguagePreferences)));
    },
    [userId]
  );

  const addLearningLanguage = useCallback(
    async (lang: LanguageCode) => {
      if (!userId) return;
      await prefsRepo.addLearningLanguage(userId, lang);
      await progressRepo.initializeProgress(userId, lang);
      const [langs, prog] = await Promise.all([
        prefsRepo.getUserLearningLanguages(userId),
        progressRepo.getProgress(userId, lang),
      ]);
      setLearningLanguages(langs);
      if (prog) setLanguageProgress(prev => ({ ...prev, [lang]: prog }));
    },
    [userId]
  );

  const removeLearningLanguage = useCallback(
    async (lang: LanguageCode) => {
      if (!userId) return;
      await prefsRepo.removeLearningLanguage(userId, lang);
      setLearningLanguages(prev => prev.filter(l => l.languageCode !== lang));
    },
    [userId]
  );

  const getLanguageContext = useCallback(
    (): LanguageContext => ({
      nativeLanguage: userPreferences?.nativeLanguage ?? 'pt',
      targetLanguage: currentLearningLanguage,
      interfaceLanguage: userPreferences?.interfaceLanguage ?? 'pt',
      explanationLanguage: userPreferences?.explanationLanguage ?? 'pt',
      proficiencyLevel: languageProgress[currentLearningLanguage]?.currentLevel ?? 'A1',
    }),
    [userPreferences, currentLearningLanguage, languageProgress]
  );

  return (
    <LanguageCtx.Provider
      value={{
        userPreferences,
        learningLanguages,
        currentLearningLanguage,
        setCurrentLearningLanguage,
        languageProgress,
        isLoading,
        updatePreferences,
        addLearningLanguage,
        removeLearningLanguage,
        getLanguageContext,
      }}
    >
      {children}
    </LanguageCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguageContext() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error('useLanguageContext must be used within LanguageContextProvider');
  return ctx;
}
