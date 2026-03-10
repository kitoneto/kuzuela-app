import type { LanguageCode, LanguageMetadata } from '../../../shared/types/languages.types';
import { SUPPORTED_LANGUAGES } from '../../../shared/constants/languages';

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
  languages?: LanguageMetadata[];
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function LanguageSelector({
  value,
  onChange,
  languages = SUPPORTED_LANGUAGES,
  label,
  disabled = false,
  className = '',
}: LanguageSelectorProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value as LanguageCode)}
        disabled={disabled}
        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-gray-100"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
