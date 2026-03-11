# Kuzuela App - Architecture

## Overview

Kuzuela is a multi-language learning platform built with React + TypeScript + Vite + Supabase.

## Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 5.x | Build Tool |
| Tailwind CSS | 3.x | Styling |
| Zustand | 5.x | State Management |
| React Router | 6.x | Routing |
| Supabase | 2.x | Backend (DB + Auth) |
| Vitest | 2.x | Unit Testing |
| Playwright | 1.x | E2E Testing |

## Feature-Based Architecture

```
src/
├── features/
│   ├── auth/              # Authentication (login, signup, protected routes)
│   ├── student/           # Student dashboard and profile
│   ├── courses/           # Course browsing and detail
│   ├── lessons/           # Lesson player and completion
│   ├── progress/          # Progress tracking and statistics
│   ├── gamification/      # XP, levels, badges, achievements
│   ├── tutors/            # AI Tutor integration
│   ├── premium/           # Subscription management
│   ├── admin/             # Admin panel (separate layout)
│   ├── language-settings/ # Language preference management
│   ├── notifications/     # Push notifications
│   └── onboarding/        # New user setup (4-step language selection)
├── shared/
│   ├── components/        # Shared UI (AppLayout, etc.)
│   ├── contexts/          # React Contexts (AuthContext, LanguageContext)
│   └── hooks/             # Shared hooks
├── lib/
│   ├── supabase.ts        # Supabase client + type definitions
│   ├── utils.ts           # Utility functions (cn, etc.)
│   ├── stores/            # Zustand stores
│   │   └── language.store.ts
│   └── repositories/      # Data access layer (Repository Pattern)
│       ├── languages.repository.ts
│       ├── preferences.repository.ts
│       ├── userLanguages.repository.ts
│       ├── progress.repository.ts
│       ├── courses.repository.ts
│       └── lessons.repository.ts
├── types/
│   ├── index.ts           # Core domain types
│   └── languages.types.ts # Language-specific types
└── test/
    ├── setup.ts
    └── unit/
```

## Each Feature Contains

```
features/<feature-name>/
├── pages/       # Route-level components
├── components/  # Feature-specific UI components
├── hooks/       # Feature-specific hooks
├── services/    # Business logic (use repositories)
├── types/       # Feature-specific types
└── utils/       # Feature-specific utilities
```

## Repository Pattern

All Supabase queries are abstracted behind repositories:

```typescript
// BAD: Direct Supabase calls in components
const { data } = await supabase.from('languages').select('*')

// GOOD: Use repository
const languages = await languagesRepository.getAll()
```

Each repository:
1. Receives raw DB rows
2. Maps them to domain types via mapper functions
3. Handles errors appropriately

## State Management

- **Zustand** for global state (language preferences, auth)
- **React Context** wraps Zustand for React component tree
- **Local state** (`useState`) for component-level state

## Routing Structure

```
/ → redirect to /dashboard
/login → LoginPage (public)
/signup → SignUpPage (public)
/onboarding → OnboardingPage (authenticated, no language context)

/dashboard → DashboardPage (protected + language context)
/courses → CoursesPage
/courses/:courseId → CourseDetailPage
/tutor → TutorPage
/language-settings → LanguagePreferencesPage
/progress → ProgressPage

/admin → AdminLayout (admin only, separate)
/admin/courses → AdminCoursesPage
/admin/lessons → AdminLessonsPage
/admin/users → AdminUsersPage
/admin/languages → AdminLanguagesPage
```

## Security

- Supabase RLS policies on all tables
- `ProtectedRoute` component guards authenticated routes
- `AdminRoute` component guards admin routes
- Admin emails configured via `VITE_ADMIN_EMAILS` env var
