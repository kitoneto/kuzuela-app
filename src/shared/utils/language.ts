import type { LanguageCode, ProficiencyCode } from '../types/languages.types';
import { SUPPORTED_LANGUAGES, PROFICIENCY_LEVELS } from '../constants/languages';

export function getLanguageFlag(code: LanguageCode): string {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
  return lang?.flag ?? code;
}

export function getLanguageName(code: LanguageCode): string {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
  return lang?.name ?? code;
}

export function formatLanguagePair(native: LanguageCode, target: LanguageCode): string {
  return `${getLanguageName(native)} → ${getLanguageName(target)}`;
}

export function getProficiencyLabel(code: ProficiencyCode): string {
  const level = PROFICIENCY_LEVELS.find(l => l.code === code);
  return level?.label ?? code;
}
