# Kuzuela - Multi-Language Guide

## The 4 Language Dimensions

Kuzuela supports 4 independent language dimensions, each serving a different purpose:

### 1. `nativeLanguage` - User's Mother Tongue
- Used for **pedagogical context**
- Helps the AI tutor understand what native concepts to reference
- Example: A Portuguese speaker learning English might confuse "ser" vs "estar"

### 2. `learningLanguage` - Target Language
- The language the user is **actively learning**
- Used to filter courses, lessons, and practice content
- A user can learn multiple languages simultaneously
- Progress is tracked independently per language

### 3. `interfaceLanguage` - UI Language
- Language of **menus, buttons, labels**
- Currently affects the interface presentation
- Independent from learning content

### 4. `explanationLanguage` - Tutor Explanation Language
- Language the **AI tutor uses for explanations**
- Different from `learningLanguage`!
- Example: Learning English, but wanting explanations in Portuguese

## TypeScript Types

```typescript
import type { 
  LanguageCode, 
  UserLanguageDimensions,
  TutorLanguageContext 
} from '@/types/languages.types'

// The 4 dimensions
const dimensions: UserLanguageDimensions = {
  nativeLanguage: 'pt',        // Portuguese speaker
  learningLanguage: 'en',       // Learning English
  interfaceLanguage: 'pt',      // UI in Portuguese
  explanationLanguage: 'pt',    // Tutor explains in Portuguese
}
```

## Supported Languages

| Code | Language | Native Name | Available |
|------|----------|------------|-----------|
| `pt` | Portuguese | Português | ✅ |
| `pt-BR` | Brazilian Portuguese | Português (Brasil) | ✅ |
| `en` | English | English | ✅ |
| `es` | Spanish | Español | ✅ |
| `fr` | French | Français | ✅ |
| `de` | German | Deutsch | ✅ |
| `it` | Italian | Italiano | ✅ |
| `zh` | Chinese | 中文 | 🔜 |
| `ja` | Japanese | 日本語 | 🔜 |
| `ko` | Korean | 한국어 | 🔜 |

## Proficiency Levels (CEFR)

| Code | CEFR | Description |
|------|------|-------------|
| `beginner` | A1 | Basic expressions |
| `elementary` | A2 | Simple communication |
| `intermediate` | B1 | Everyday topics |
| `upper-intermediate` | B2 | Complex text |
| `advanced` | C1 | Fluent expression |
| `proficient` | C2 | Near-native |

## Hooks

### `useLanguageContext()` - Full context
```typescript
const {
  dimensions,           // { nativeLanguage, learningLanguage, interfaceLanguage, explanationLanguage }
  learningLanguages,    // UserLearningLanguage[] - all languages being learned
  progressByLanguage,   // Record<LanguageCode, UserLanguageProgress>
  setNativeLanguage,    // (code: LanguageCode) => Promise<void>
  setInterfaceLanguage, // (code: LanguageCode) => Promise<void>
  setExplanationLanguage, // (code: LanguageCode) => Promise<void>
  addLearningLanguage,  // (code, proficiency) => Promise<void>
  removeLearningLanguage, // (code) => Promise<void>
  getProgressForLanguage, // (code) => UserLanguageProgress | null
} = useLanguageContext()
```

### `useLanguagePreferences()` - Preferences only
```typescript
const { preferences, setNativeLanguage, setInterfaceLanguage, setExplanationLanguage } 
  = useLanguagePreferences()
```

### `useUserLanguages()` - Learning languages
```typescript
const { learningLanguages, addLearningLanguage, removeLearningLanguage } 
  = useUserLanguages()
```

### `useLanguageProgress(code?)` - Progress tracking
```typescript
const { progress, allProgress } = useLanguageProgress('en')
// progress.xp, progress.level, progress.streak
```

### `useTutorLanguageContext()` - For AI Tutor
```typescript
const tutorCtx = useTutorLanguageContext()
// { learningLanguage, nativeLanguage, explanationLanguage, proficiencyLevel, userXP, userLevel }
```

## Per-Language Progress

Each language has completely independent progress:

```typescript
interface UserLanguageProgress {
  languageCode: LanguageCode
  xp: number              // Experience points
  level: number           // Calculated from XP: floor(sqrt(xp/100)) + 1
  streak: number          // Current daily streak
  longestStreak: number   // All-time record
  lessonsCompleted: number
  minutesPracticed: number
  lastPracticeDate?: string
}
```

### XP → Level Formula
```
level = floor(sqrt(xp / 100)) + 1

Level 1 = 0 XP
Level 2 = 100 XP  
Level 3 = 400 XP
Level 4 = 900 XP
Level 10 = 8100 XP
```

## Database Schema

```sql
-- 4 dimensions stored in user_language_preferences
user_language_preferences (
  user_id, native_language, interface_language, explanation_language
)

-- Multiple learning languages per user
user_learning_languages (
  user_id, language_code, proficiency_level, is_active
)

-- Independent progress per language
user_language_progress (
  user_id, language_code, xp, level, streak, longest_streak, ...
)
```

## Tutor AI Integration

The tutor receives full language context via `TutorLanguageContext`:

```typescript
// The system prompt is built with ALL 4 dimensions
const { systemPrompt } = buildTutorSystemPrompt({
  learningLanguage: 'en',
  nativeLanguage: 'pt',
  explanationLanguage: 'pt', // ← Tutor explains IN Portuguese
  proficiencyLevel: 'beginner',
})

// Critical: tutor ALWAYS responds in explanationLanguage
// even though practice is in learningLanguage
```

## Onboarding Flow

The 4-step onboarding collects all language dimensions:

1. **Step 1**: Select `nativeLanguage`
2. **Step 2**: Select `interfaceLanguage`  
3. **Step 3**: Select `learningLanguage` (multiple allowed)
4. **Step 4**: Select `explanationLanguage`

On completion:
- Creates `user_language_preferences` record
- Creates `user_learning_languages` records
- Initializes `user_language_progress` for each language
