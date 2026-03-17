# CLAUDE.md — HSK Tutor Operating Instructions

> AI agent instructions. Loaded automatically every session.
> Process details: `AI_PRODUCT_MANAGEMENT.md`

---

## Product Vision

HSK Tutor is a Mandarin Chinese learning platform targeting learners preparing for HSK certifications (levels 1–6). It combines spaced repetition (SM-2), gamification (XP, streaks, achievements, leaderboard), and adaptive exercise delivery to make structured vocabulary and grammar study effective and engaging.

---

## Tech Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS 4
- **ORM:** Prisma 7 with PostgreSQL via Supabase
- **Auth:** Supabase SSR
- **State:** TanStack React Query (server state) + Zustand (client state)
- **Payments:** Stripe (disabled in alpha — feature-flagged)
- **Deploy:** Vercel

---

## Build Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npx prisma generate  # Regenerate Prisma client
npx prisma migrate dev  # Run migrations
npx prisma db seed   # Seed database
npx tsx prisma/seed.ts  # Manual seed run
```

---

## Architecture Overview

```
app/
  (app)/          # Protected routes: dashboard, learn, practice, profile, etc.
  (auth)/         # Public auth routes: login, register
  api/            # API routes (exercises, sessions, progress, leaderboard, user)

components/
  exercises/      # Exercise type components (FlashCard, MultipleChoice, etc.)
  gamification/   # XP bar, streak counter, achievement toast
  layout/         # Sidebar, MobileNav
  ui/             # Radix UI wrappers

lib/
  srs/sm2.ts      # SuperMemo-2 spaced repetition algorithm
  gamification/   # XP, achievements, streak logic
  hsk/levels.ts   # HSK level definitions
  adaptive/       # Adaptive learning algorithms
  flags.ts        # Feature flags (HSK_56_ENABLED, etc.)

prisma/
  schema.prisma   # Data model (User, HskWord, Exercise, UserWordProgress, etc.)
  data/           # JSON seed files (hsk1–hsk6, achievements)
```

### Key Systems

| System | Location | What It Does |
|--------|----------|--------------|
| **SRS Engine** | `lib/srs/sm2.ts` | SM-2 algorithm — calculates next review interval and ease factor |
| **Exercise Delivery** | `app/api/exercises/` | Fetches exercises ordered by SRS priority (due → new → in-progress → mastered) |
| **Gamification** | `lib/gamification/` | XP rewards, rank thresholds, streak milestones, achievement unlocks |
| **Study Sessions** | `app/api/sessions/` | Creates sessions, logs XP, triggers achievement checks |
| **Quiz Flow** | `app/(app)/practice/quiz/` | Daily challenge interface using ExerciseContainer |
| **Learn Mode** | `app/(app)/learn/[level]/` | Browse vocabulary by HSK level via WordCardGrid |

---

## Versioning Rules

- **Sequential numbering:** v0.1.0, v0.1.1, v0.2.0 — no letter suffixes
- **One version = one commit** — each version is a focused, committable scope
- **Small releases preferred** — if a diff is too large to review in one sitting, split it
- **Patch versions** (v0.1.1.1) only for mid-build discoveries, never planned items
- **Current baseline:** v0.1.0 = initial MVP (commit 9ef5f50)

---

## Documentation Trigger Table

Read these docs before modifying the corresponding code:

| If You're Modifying... | Read First... |
|------------------------|---------------|
| `lib/srs/` | `Docs/SRS_ENGINE.md` (when it exists) |
| `lib/gamification/` | `Docs/GAMIFICATION.md` (when it exists) |
| `app/api/exercises/` | `Docs/EXERCISE_DELIVERY.md` (when it exists) |
| `app/api/sessions/` | `Docs/GAMIFICATION.md` (when it exists) |
| `prisma/schema.prisma` | `Docs/DATA_MODEL.md` (when it exists) |
| `components/exercises/` | `Docs/EXERCISE_DELIVERY.md` (when it exists) |
| Feature flags | `lib/flags.ts` directly |
| Auth flow | `middleware.ts` + `lib/supabase/` |

> Reference docs are created as systems are documented. If a doc doesn't exist yet, read the source directly and consider creating the doc.

---

## Documentation Workflow

### Every Session
- Log request in `Docs/REQUEST_LOG.md` (intent + context)
- Log work in `Docs/DEVELOPMENT_LOG.md` (decisions + files changed)

### Every Commit
- Update `CHANGELOG.md`
- Update `ROADMAP.md` (mark items complete)

### After a Release
- Update affected reference docs in `Docs/`
- Mark design doc "Implemented in vX.Y" (if one existed)

### Document Types
| Type | Location | Purpose |
|------|----------|---------|
| Reference | `Docs/` top-level | Current system state |
| Design | `Docs/Design/` | Forward-looking specs |
| Research | `Docs/Research/` | Persistent findings |
| Testing | `Docs/Testing/` | Test logs and analysis |

---

## Key Conventions

- **File naming:** kebab-case for code (`sm2.ts`, `ExerciseContainer.tsx`), ALL_CAPS for docs (`DATA_MODEL.md`)
- **API routes:** REST-style under `app/api/`. Return `{ error }` on failure, data directly on success.
- **Prisma:** Always use the PrismaPg adapter (not `datasource url` in schema). See `prisma.config.ts`.
- **Auth:** Supabase SSR — server components use `createClient()` from `lib/supabase/server.ts`
- **Feature flags:** Check `lib/flags.ts` before adding new guarded features. `HSK_56_ENABLED` controls HSK 5–6 access.
- **Exercise types:** `vocab_recall`, `tone_match`, `grammar_choice`, `fill_blank`, `listening`, `reading_comp`, `sentence_order`
- **SRS statuses:** `new` → `learning` → `reviewing` → `mastered`

---

## Security Rules

- **Never commit `.env.local`** — it contains live Supabase + Stripe credentials
- **CRON_SECRET** must be validated on all `/api/cron/*` routes before processing
- **Supabase service role key** (`SUPABASE_SERVICE_ROLE_KEY`) is server-only — never expose to client
- **User data isolation:** All queries must filter by authenticated user ID — never return another user's progress data
- **Input validation:** Validate exercise IDs and session data in API routes before DB writes

---

## Current Build Context

### Current: v0.3.0 (not yet started)
Nothing in progress. Next planned work: see `ROADMAP.md`.

Good starting points:
- Wire full SM-2 algorithm (`lib/srs/sm2.ts`) into sessions API (currently uses simplified hardcoded intervals)
- Populate or remove the unused `Exercise` table

### Previous: v0.2.0
SRS loop completion — exercise delivery ordered by SRS priority, per-word results tracked and persisted to `UserWordProgress` after each session, pre-quiz start screen. See `Docs/Design/V0.2.0_SRS_LOOP.md`. Commit `37b580f`.
