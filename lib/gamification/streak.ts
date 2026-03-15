export function calculateStreak(lastActiveAt: Date | null, currentStreak: number): number {
  if (!lastActiveAt) return 1

  const now = new Date()
  const last = new Date(lastActiveAt)

  const diffMs = now.getTime() - last.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Same day — streak unchanged (already counted today)
    return currentStreak
  } else if (diffDays === 1) {
    // Consecutive day — increment streak
    return currentStreak + 1
  } else {
    // Missed a day — reset
    return 1
  }
}
