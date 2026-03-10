import type { LanguageCode, LanguageMetadata } from '../../../shared/types/languages.types';
import { SUPPORTED_LANGUAGES } from '../../../shared/constants/languages';

export function getLanguageByCode(code: LanguageCode): LanguageMetadata | undefined {
  return SUPPORTED_LANGUAGES.find(l => l.code === code);
}

export function formatLanguageDisplay(code: LanguageCode): string {
  const lang = getLanguageByCode(code);
  return lang ? `${lang.flag} ${lang.name}` : code;
}
