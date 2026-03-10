import { useState, useEffect } from 'react'
import { languagesService } from '../services/languages.service'
import type { Language } from '@/types/languages.types'

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    languagesService.getAvailable()
      .then(setLanguages)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  return { languages, isLoading, error }
}
