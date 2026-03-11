# Kuzuela V2 - Refactoring Map

## Summary

This document maps the old flat structure to the new feature-based structure.

## New Structure (V2)

```
src/
├── features/
│   ├── auth/
│   │   ├── pages/LoginPage.tsx
│   │   ├── pages/SignUpPage.tsx
│   │   └── components/ProtectedRoute.tsx
│   ├── student/
│   │   └── pages/DashboardPage.tsx
│   ├── courses/
│   │   ├── pages/CoursesPage.tsx
│   │   └── pages/CourseDetailPage.tsx
│   ├── lessons/
│   │   └── (lesson player - to be implemented)
│   ├── progress/
│   │   └── (progress dashboard - to be implemented)
│   ├── gamification/
│   │   └── (badges, achievements - to be implemented)
│   ├── tutors/
│   │   ├── pages/TutorPage.tsx
│   │   ├── hooks/useTutorLanguageContext.ts
│   │   └── services/tutorPrompts.service.ts
│   ├── premium/
│   │   └── (premium features - to be implemented)
│   ├── admin/
│   │   ├── pages/AdminDashboardPage.tsx
│   │   ├── pages/AdminCoursesPage.tsx
│   │   ├── components/AdminLayout.tsx
│   │   └── components/AdminRoute.tsx
│   ├── language-settings/
│   │   ├── pages/LanguagePreferencesPage.tsx
│   │   ├── components/LanguageSelector.tsx
│   │   ├── components/LearningLanguageCard.tsx
│   │   ├── components/ProficiencyBadge.tsx
│   │   ├── hooks/useLanguagePreferences.ts
│   │   ├── hooks/useUserLanguages.ts
│   │   ├── hooks/useLanguageProgress.ts
│   │   ├── hooks/useLanguages.ts
│   │   ├── services/languagePreferences.service.ts
│   │   ├── services/userLanguages.service.ts
│   │   ├── services/languageProgress.service.ts
│   │   └── services/languages.service.ts
│   ├── notifications/
│   │   └── (notifications - to be implemented)
│   └── onboarding/
│       └── pages/OnboardingPage.tsx
├── shared/
│   ├── components/AppLayout.tsx
│   └── contexts/
│       ├── AuthContext.tsx
│       └── LanguageContext.tsx
├── lib/
│   ├── supabase.ts
│   ├── utils.ts
│   ├── stores/language.store.ts
│   └── repositories/
│       ├── index.ts
│       ├── languages.repository.ts
│       ├── preferences.repository.ts
│       ├── userLanguages.repository.ts
│       ├── progress.repository.ts
│       ├── courses.repository.ts
│       └── lessons.repository.ts
├── types/
│   ├── index.ts
│   └── languages.types.ts
├── routes.tsx
├── main.tsx
└── index.css
```

## New Tables (via migration 002)

| Table | Purpose |
|-------|---------|
| `languages` | All supported languages |
| `proficiency_levels` | CEFR levels |
| `user_language_preferences` | 4-dimension preferences per user |
| `user_learning_languages` | Languages user is learning |
| `user_language_progress` | Per-language XP, level, streak |

## Altered Tables

| Table | Change |
|-------|--------|
| `kuzuela_courses` | Added `language_code`, `target_language_code` |
| `kuzuela_lessons` | Added `language_code`, `target_language_code` |

## Key Architectural Changes

1. **Feature isolation**: Each feature owns its pages, components, hooks, services
2. **Repository pattern**: No direct Supabase calls in components
3. **4-dimension language model**: nativeLanguage, learningLanguage, interfaceLanguage, explanationLanguage
4. **Per-language progress**: XP/level/streak independent per language
5. **Admin decoupled**: Separate layout and routes
6. **Tutor language context**: AI receives full language context for better teaching
