// SM-2 Spaced Repetition Algorithm
// Based on SuperMemo 2 algorithm: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

export interface SM2Result {
  easeFactor: number
  intervalDays: number
  nextReviewAt: Date
  status: 'new' | 'learning' | 'reviewing' | 'mastered'
}

export function calculateSM2(
  isCorrect: boolean,
  currentEaseFactor: number,
  currentInterval: number,
  correctCount: number,
  incorrectCount: number
): SM2Result {
  // Quality: 5 = perfect, 0 = blackout
  const quality = isCorrect ? 4 : 1

  let easeFactor = currentEaseFactor
  let intervalDays = currentInterval

  if (quality >= 3) {
    // Correct answer
    if (currentInterval === 0 || currentInterval === 1) {
      intervalDays = 1
    } else if (currentInterval === 1) {
      intervalDays = 6
    } else {
      intervalDays = Math.round(currentInterval * easeFactor)
    }
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  } else {
    // Wrong answer — reset interval
    intervalDays = 1
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  }

  const nextReviewAt = new Date()
  nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays)

  const totalAnswers = correctCount + incorrectCount + 1
  const newCorrect = isCorrect ? correctCount + 1 : correctCount
  const accuracy = newCorrect / totalAnswers

  let status: SM2Result['status']
  if (intervalDays >= 21 && accuracy >= 0.85) {
    status = 'mastered'
  } else if (intervalDays >= 3) {
    status = 'reviewing'
  } else if (totalAnswers >= 2) {
    status = 'learning'
  } else {
    status = 'new'
  }

  return { easeFactor, intervalDays, nextReviewAt, status }
}
