# Changelog — HSK Tutor

> User-facing changes, grouped by version. Most recent first.

---

## v0.2.0 — Quiz & Exercise Improvements (in progress)

_Changes TBD — design doc pending_

---

## v0.1.0 — Initial MVP

**Commits:** `37c0b3f` → `e8be5f9`

### App
- Full HSK Tutor app with Next.js App Router
- Supabase authentication (email/password + Google OAuth)
- Protected routes with middleware-based auth guard
- Onboarding flow for initial HSK level selection

### Learning
- HSK 1–6 vocabulary browser (`/learn/[level]`)
- 9,750+ vocabulary words with pinyin, definitions, and traditional characters
- WordCardGrid component for browsing vocabulary

### Practice
- Daily challenge quiz (`/practice/quiz`)
- 7 exercise types: flashcard recall, tone matching, grammar choice, fill-in-the-blank, listening, reading comprehension, sentence ordering
- SM-2 spaced repetition algorithm for review scheduling
- Smart exercise ordering: due-for-review → new → in-progress → mastered

### Gamification
- XP system with variable rewards per exercise type (5–12 XP)
- 50 XP bonus for daily challenge completion
- Rank progression: Beginner → Elementary → Intermediate → Advanced → Expert
- Streak tracking with milestone bonuses (7, 30, 100 days)
- Achievement system with unlock logic
- Global leaderboard (weekly + all-time snapshots)

### Infrastructure
- Vercel deployment
- GitHub Actions CI pipeline
- Prisma 7 with PrismaPg adapter (Supabase PostgreSQL)
- Cron job for leaderboard snapshot updates

### Fixes (post-MVP)
- Pointed daily challenge links to `/practice/quiz`
- Resolved TypeScript build errors
- Prisma 7 compatibility fixes (PrismaPg adapter)
- Added dummy `DATABASE_URL` to CI for `prisma generate`
- Vercel deployment UX improvements
