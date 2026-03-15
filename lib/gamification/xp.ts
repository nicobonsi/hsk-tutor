export const XP_REWARDS = {
  flashcard_correct: 5,
  mcq_correct: 8,
  fill_blank_correct: 10,
  listening_correct: 12,
  session_complete: 20,
  daily_challenge_complete: 50,
  word_mastered: 15,
  streak_7: 100,
  streak_30: 500,
  streak_100: 1000,
} as const

export const APP_RANKS = [
  { name: 'Beginner', minXp: 0, maxXp: 500 },
  { name: 'Elementary', minXp: 501, maxXp: 2000 },
  { name: 'Intermediate', minXp: 2001, maxXp: 5000 },
  { name: 'Advanced', minXp: 5001, maxXp: 12000 },
  { name: 'Expert', minXp: 12001, maxXp: Infinity },
] as const

export function getAppRank(xp: number) {
  return APP_RANKS.find((r) => xp >= r.minXp && xp <= r.maxXp) ?? APP_RANKS[0]
}

export function getXpToNextRank(xp: number) {
  const current = getAppRank(xp)
  if (current.maxXp === Infinity) return null
  return current.maxXp - xp
}

export function getXpProgressPercent(xp: number) {
  const current = getAppRank(xp)
  if (current.maxXp === Infinity) return 100
  const range = current.maxXp - current.minXp
  const progress = xp - current.minXp
  return Math.round((progress / range) * 100)
}

export function getXpForExerciseType(type: string, isCorrect: boolean): number {
  if (!isCorrect) return 0
  switch (type) {
    case 'vocab_recall': return XP_REWARDS.flashcard_correct
    case 'tone_match':
    case 'grammar_choice':
    case 'sentence_order': return XP_REWARDS.mcq_correct
    case 'fill_blank': return XP_REWARDS.fill_blank_correct
    case 'listening':
    case 'reading_comp': return XP_REWARDS.listening_correct
    default: return XP_REWARDS.mcq_correct
  }
}
