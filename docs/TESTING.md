# Kuzuela - Testing Guide

## Test Strategy

### 1. Unit Tests (Vitest)
- Test services, utils, mappers, hooks in isolation
- Mock all external dependencies (Supabase, etc.)
- Location: `src/test/unit/`

### 2. Integration Tests (Vitest)
- Test repositories against real/mock Supabase
- Test RLS policies
- Location: `src/test/integration/`

### 3. E2E Tests (Playwright)
- Test complete user flows
- Location: `tests/e2e/`

## Running Tests

```bash
# Unit tests
npm test

# Unit tests in watch mode
npm run test:watch

# With coverage
npm run test:coverage

# With UI
npm run test:ui

# E2E tests
npm run test:e2e
```

## Coverage Goals

| Layer | Target |
|-------|--------|
| Services | 80% |
| Utils | 90% |
| Mappers | 95% |
| Hooks | 70% |
| Overall | 70% |

## Unit Test Examples

### Testing a service
```typescript
import { describe, it, expect, vi } from 'vitest'
import { languagePreferencesService } from '@/features/language-settings/services/languagePreferences.service'

vi.mock('@/lib/repositories', () => ({
  preferencesRepository: {
    getByUserId: vi.fn().mockResolvedValue({ id: '1', nativeLanguage: 'pt' }),
  }
}))

describe('languagePreferencesService', () => {
  it('should return preferences for user', async () => {
    const prefs = await languagePreferencesService.getByUserId('user-1')
    expect(prefs?.nativeLanguage).toBe('pt')
  })
})
```

### Testing a Zustand store
```typescript
import { useLanguageStore } from '@/lib/stores/language.store'

describe('languageStore', () => {
  beforeEach(() => useLanguageStore.getState().reset())
  
  it('should update dimensions', () => {
    useLanguageStore.getState().setNativeLanguage('es')
    expect(useLanguageStore.getState().dimensions.nativeLanguage).toBe('es')
  })
})
```

## E2E Test Scenarios

### Onboarding Flow
```typescript
test('complete onboarding', async ({ page }) => {
  await page.goto('/signup')
  // fill signup form
  await page.getByLabel('Email').fill('test@example.com')
  // ...
  await expect(page).toHaveURL('/onboarding')
  
  // Step 1: Select native language
  await page.getByText('Portuguese').click()
  await page.getByText('Continue').click()
  
  // Step 2-4...
  
  await expect(page).toHaveURL('/dashboard')
})
```

### Language Switch
```typescript
test('switch learning language', async ({ page }) => {
  await loginAs(page, 'test@example.com')
  await page.goto('/language-settings')
  await page.getByText('Spanish').click()
  await expect(page.getByText('Active')).toBeVisible()
})
```
