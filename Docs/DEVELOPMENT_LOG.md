# Development Log — HSK Tutor

> Technical decisions, session summaries, and what's next.
> Updated after each work block. Old entries archived to `DEVELOPMENT_LOG_ARCHIVE.md`.

---

## 2026-03-17 — Process Scaffolding

**Focus:** Set up AI Product Management process infrastructure

**Completed:**
- **CLAUDE.md** — AI agent operating instructions (vision, tech stack, architecture, versioning, doc triggers, security rules, current build context)
- **ROADMAP.md** — Phase summary + v0.1.0 history + v0.2.0 in-progress placeholder
- **CHANGELOG.md** — Full v0.1.0 history reconstructed from git log
- **Docs/** structure — Created `Design/`, `Research/`, `Testing/`, `_old/` directories
- **Docs/REQUEST_LOG.md** — Started request tracking
- **Docs/DEVELOPMENT_LOG.md** — This file
- **Docs/DOC_WORKFLOW.md** — Document maintenance procedures

**Decisions:**
- Versioned current MVP state as v0.1.0 (baseline). The 4 modified files in the working tree are v0.2.0 (in progress).
- Did not create reference docs yet (SRS_ENGINE.md, GAMIFICATION.md, etc.) — those should be written when those systems are next touched, not speculatively.

**Open Questions:**
- ~~What are the v0.2.0 changes in the working tree for?~~ Resolved: see v0.2.0 entry below.

**Files Created:**
- `CLAUDE.md`
- `ROADMAP.md`
- `CHANGELOG.md`
- `Docs/REQUEST_LOG.md`
- `Docs/DEVELOPMENT_LOG.md`
- `Docs/DOC_WORKFLOW.md`

**Next Steps:**
1. Commit v0.2.0 changes
2. Write reference docs as systems are next modified

---

## 2026-03-17 — v0.2.0 SRS Loop Analysis

**Focus:** Read and document the uncommitted changes in working tree

**Findings:**
The 4 modified files form a complete, coherent feature: closing the SRS feedback loop that was broken in the MVP. The SM-2 algorithm existed but was wired to nothing.

- `ExerciseContainer.tsx` — tracks per-word `{ wordId, isCorrect }` results, passes to `onComplete`
- `exercises/route.ts` — full rewrite: SRS-ordered delivery (due → new → in-progress → mastered), auth-aware
- `sessions/route.ts` — accepts `wordResults`, updates `UserWordProgress` for each word (simplified SM-2 transitions)
- `quiz/page.tsx` — pre-quiz start screen with word count selector (preset buttons + slider) and pinyin toggle

**Known gap identified:** Sessions API implements simplified interval transitions (1/3/7 days hardcoded) instead of calling the full SM-2 algorithm in `lib/srs/sm2.ts`. Should be wired in a follow-up.

**Files Created:**
- `Docs/Design/V0.2.0_SRS_LOOP.md`

**Next Steps:**
1. Commit v0.2.0
2. Consider v0.2.1: wire `lib/srs/sm2.ts` properly into sessions API
