import { supabase } from '../client';
import { SUPPORTED_LANGUAGES, getNativeLanguages, getLearningLanguages, getInterfaceLanguages, getExplanationLanguages } from '../../../shared/constants/languages';
import type { LanguageCode, LanguageMetadata } from '../../../shared/types/languages.types';

export class LanguagesRepository {
  async getAllLanguages(): Promise<LanguageMetadata[]> {
    try {
      const { data, error } = await supabase.from('languages').select('*');
      if (error || !data || data.length === 0) return SUPPORTED_LANGUAGES;
      return data as LanguageMetadata[];
    } catch {
      return SUPPORTED_LANGUAGES;
    }
  }

  async getLanguage(code: LanguageCode): Promise<LanguageMetadata | null> {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('code', code)
        .single();
      if (error || !data) {
        return SUPPORTED_LANGUAGES.find(l => l.code === code) ?? null;
      }
      return data as LanguageMetadata;
    } catch {
      return SUPPORTED_LANGUAGES.find(l => l.code === code) ?? null;
    }
  }

  async getAvailableNativeLanguages(): Promise<LanguageMetadata[]> {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_native', true);
      if (error || !data || data.length === 0) return getNativeLanguages();
      return data as LanguageMetadata[];
    } catch {
      return getNativeLanguages();
    }
  }

  async getAvailableLearningLanguages(): Promise<LanguageMetadata[]> {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_learning', true);
      if (error || !data || data.length === 0) return getLearningLanguages();
      return data as LanguageMetadata[];
    } catch {
      return getLearningLanguages();
    }
  }

  async getAvailableInterfaceLanguages(): Promise<LanguageMetadata[]> {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_interface', true);
      if (error || !data || data.length === 0) return getInterfaceLanguages();
      return data as LanguageMetadata[];
    } catch {
      return getInterfaceLanguages();
    }
  }

  async getAvailableExplanationLanguages(): Promise<LanguageMetadata[]> {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_explanation', true);
      if (error || !data || data.length === 0) return getExplanationLanguages();
      return data as LanguageMetadata[];
    } catch {
      return getExplanationLanguages();
    }
  }
}
