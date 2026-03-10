import type { LanguageCode, LanguageMetadata, ProficiencyLevel } from '../types/languages.types';

export const SUPPORTED_LANGUAGES: LanguageMetadata[] = [
  {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português',
    flag: '🇵🇹',
    isNative: true,
    isLearning: true,
    isInterface: true,
    isExplanation: true,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    isNative: true,
    isLearning: true,
    isInterface: true,
    isExplanation: true,
  },
  {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
    isNative: true,
    isLearning: true,
    isInterface: true,
    isExplanation: true,
  },
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    isNative: true,
    isLearning: true,
    isInterface: true,
    isExplanation: true,
  },
  {
    code: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isNative: true,
    isLearning: true,
    isInterface: false,
    isExplanation: false,
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    isNative: true,
    isLearning: true,
    isInterface: false,
    isExplanation: false,
  },
  {
    code: 'it',
    name: 'Italiano',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    isNative: true,
    isLearning: true,
    isInterface: false,
    isExplanation: false,
  },
  {
    code: 'mn',
    name: 'Mongolian',
    nativeName: 'Монгол',
    flag: '🇲🇳',
    isNative: true,
    isLearning: true,
    isInterface: false,
    isExplanation: false,
  },
];

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  {
    code: 'A1',
    label: 'Iniciante / Beginner',
    description: 'Can understand and use basic phrases and simple expressions.',
    minXP: 0,
    maxXP: 499,
  },
  {
    code: 'A2',
    label: 'Elementar / Elementary',
    description: 'Can understand sentences and frequently used expressions.',
    minXP: 500,
    maxXP: 1499,
  },
  {
    code: 'B1',
    label: 'Intermédio / Intermediate',
    description: 'Can understand the main points of clear standard input.',
    minXP: 1500,
    maxXP: 2999,
  },
  {
    code: 'B2',
    label: 'Intermédio Superior / Upper Intermediate',
    description: 'Can understand the main ideas of complex text on concrete and abstract topics.',
    minXP: 3000,
    maxXP: 4999,
  },
  {
    code: 'C1',
    label: 'Avançado / Advanced',
    description: 'Can understand a wide range of demanding, longer texts.',
    minXP: 5000,
    maxXP: 7999,
  },
  {
    code: 'C2',
    label: 'Proficiente / Proficient',
    description: 'Can understand with ease virtually everything heard or read.',
    minXP: 8000,
  },
];

export function getLanguage(code: LanguageCode): LanguageMetadata | undefined {
  return SUPPORTED_LANGUAGES.find(l => l.code === code);
}

export function getNativeLanguages(): LanguageMetadata[] {
  return SUPPORTED_LANGUAGES.filter(l => l.isNative);
}

export function getLearningLanguages(): LanguageMetadata[] {
  return SUPPORTED_LANGUAGES.filter(l => l.isLearning);
}

export function getInterfaceLanguages(): LanguageMetadata[] {
  return SUPPORTED_LANGUAGES.filter(l => l.isInterface);
}

export function getExplanationLanguages(): LanguageMetadata[] {
  return SUPPORTED_LANGUAGES.filter(l => l.isExplanation);
}
