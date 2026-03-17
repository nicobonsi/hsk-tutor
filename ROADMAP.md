# Roadmap — HSK Tutor

> Active roadmap. Completed sections archived to `ROADMAP_ARCHIVE.md`.
> Last updated: 2026-03-17

---

## Phase Summary

| Version | Goal | Status | Depends On |
|---------|------|--------|------------|
| v0.1.0 | Initial MVP | ✅ Complete | — |
| v0.2.0 | SRS loop completion | ✅ Complete | v0.1.0 |
| v0.3.0 | HSK textbook integration | Planned | v0.2.0 |

---

## v0.1.0 — Initial MVP ✅

**Shipped:** ~2026-03-17 (commit `9ef5f50` + subsequent fixes)

- Full app scaffold with Next.js App Router
- Supabase auth (email + Google OAuth)
- HSK 1–6 vocabulary data (9,750+ words)
- SM-2 spaced repetition engine
- Exercise types: flashcard, tone match, grammar choice, fill blank, listening, reading, sentence order
- Gamification: XP, ranks, streaks, achievements
- Daily challenge system
- Leaderboard (weekly + all-time)
- Dashboard, learn mode, profile, settings, onboarding
- Vercel deployment + CI/CD

---

## v0.2.0 — SRS Loop Completion 🔄

**Status:** ✅ Complete (`37b580f`) — see [Docs/Design/V0.2.0_SRS_LOOP.md](Docs/Design/V0.2.0_SRS_LOOP.md)

- SRS-ordered exercise delivery (due → new → in-progress → mastered)
- Per-word result tracking during quiz (`wordResults` in ExerciseContainer)
- SRS progress written back to `UserWordProgress` after each session
- Pre-quiz start screen with word count selector (presets + slider) and pinyin toggle

**Known gaps (follow-up items):**
- Wire full SM-2 algorithm (`lib/srs/sm2.ts`) into sessions API (currently uses simplified hardcoded intervals)
- Populate or remove the `Exercise` table (currently unused)

---

## v0.3.0 — HSK Textbook Integration 📋

**Status:** Planned — see [Docs/Design/V0.3.0_TEXTBOOK_INTEGRATION.md](Docs/Design/V0.3.0_TEXTBOOK_INTEGRATION.md)

- Lesson data model (Lesson, LessonDialogue, LessonPinyinDrill, LessonCharacter, CultureNote, UserLessonProgress)
- Lesson-based navigation: `/learn/lessons/hsk[level]/[number]`
- Tabbed lesson detail: vocabulary, dialogues, grammar, pinyin, characters, culture
- Lesson quiz mode: SRS quiz scoped to lesson vocabulary
- Seed data for HSK1 lessons 1–8 (from HSK Standard Course 1 chapters 1–8)
- Extensible seed architecture for future chapters and HSK2–6

---

## Backlog (Unscheduled)

- HSK 5–6 full vocabulary data (currently 120 words, needs full dataset)
- Stripe payments / subscription tier (disabled in alpha)
- Audio pronunciation for vocabulary
- Mobile app (PWA or native)
- Sentence-level exercises
- Writing practice (stroke order)
- Teacher/classroom features
