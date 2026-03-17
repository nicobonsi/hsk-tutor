# Requirements — HSK Tutor

> What to build, prioritized. Updated as the product evolves.
> Last updated: 2026-03-17

---

## P0 — Core (must work for the product to be useful)

- [x] User authentication (email + Google OAuth)
- [x] HSK 1–6 vocabulary database
- [x] Spaced repetition — SM-2 algorithm with per-word progress tracking
- [x] SRS feedback loop — exercise results written back to UserWordProgress
- [x] Daily practice quiz with session configuration (word count, pinyin toggle)
- [x] Exercise delivery ordered by SRS priority (due → new → in-progress → mastered)

---

## P1 — Important (product is better with these)

- [x] Gamification: XP, ranks, streaks, achievements
- [x] Leaderboard (weekly + all-time)
- [x] Learn mode — browse vocabulary by HSK level
- [x] Dashboard with progress overview
- [x] Onboarding — initial HSK level selection
- [ ] Full SM-2 algorithm wired into sessions API (currently uses simplified intervals)
- [ ] Full HSK 5–6 vocabulary (currently 120 words, needs ~5,000+)
- [ ] Audio pronunciation for vocabulary

---

## P2 — Nice to have

- [ ] Sentence-level exercises
- [ ] Writing practice (stroke order)
- [ ] Grammar exercises with distractors (Exercise table populated)
- [ ] Offline support / PWA
- [ ] Dark mode

---

## Out of Scope (for now)

- Teacher / classroom features
- Social features (friends, messaging)
- Video content
- Stripe payments / subscription (disabled in alpha, re-evaluate at launch)
- Native mobile app (web-first)
