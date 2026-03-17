import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { calculateStreak } from '@/lib/gamification/streak'
import { checkNewAchievements } from '@/lib/gamification/achievements'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { level, mode, xpEarned, wordsStudied, accuracy, durationMs, wordResults, lessonId } = body
  // wordResults: Array<{ wordId: string; isCorrect: boolean }>

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const session = await prisma.studySession.create({
    data: { userId: user.id, level, mode, xpEarned, wordsStudied, accuracy, durationMs }
  })

  // Update UserWordProgress for each answered word (SRS)
  if (Array.isArray(wordResults)) {
    const now = new Date()
    for (const { wordId, isCorrect } of wordResults as { wordId: string; isCorrect: boolean }[]) {
      const existing = await prisma.userWordProgress.findUnique({
        where: { userId_wordId: { userId: user.id, wordId } },
      })

      if (existing) {
        const { status, easeFactor, intervalDays, correctCount, incorrectCount } = existing
        let newStatus = status
        let newInterval = intervalDays
        let newEase = easeFactor

        if (isCorrect) {
          if (status === 'new') { newStatus = 'learning'; newInterval = 1 }
          else if (status === 'learning') { newStatus = 'reviewing'; newInterval = 3 }
          else if (status === 'reviewing') { newStatus = 'mastered'; newInterval = 7 }
          else { newInterval = Math.round(intervalDays * easeFactor) }
          await prisma.userWordProgress.update({
            where: { userId_wordId: { userId: user.id, wordId } },
            data: {
              status: newStatus,
              intervalDays: newInterval,
              easeFactor: newEase,
              nextReviewAt: new Date(now.getTime() + newInterval * 86400000),
              correctCount: correctCount + 1,
              lastSeenAt: now,
            },
          })
        } else {
          newStatus = status === 'mastered' || status === 'reviewing' ? 'learning' : status
          newEase = Math.max(1.3, easeFactor - 0.15)
          await prisma.userWordProgress.update({
            where: { userId_wordId: { userId: user.id, wordId } },
            data: {
              status: newStatus,
              intervalDays: 1,
              easeFactor: newEase,
              nextReviewAt: new Date(now.getTime() + 86400000),
              incorrectCount: incorrectCount + 1,
              lastSeenAt: now,
            },
          })
        }
      } else {
        // First time seeing this word
        await prisma.userWordProgress.create({
          data: {
            userId: user.id,
            wordId,
            status: isCorrect ? 'learning' : 'new',
            intervalDays: isCorrect ? 1 : 1,
            nextReviewAt: new Date(now.getTime() + 86400000),
            correctCount: isCorrect ? 1 : 0,
            incorrectCount: isCorrect ? 0 : 1,
            lastSeenAt: now,
          },
        })
      }
    }
  }

  const newStreak = calculateStreak(dbUser.lastActiveAt, dbUser.streakDays)
  const newXp = dbUser.xp + xpEarned

  await prisma.user.update({
    where: { id: user.id },
    data: { xp: newXp, streakDays: newStreak, lastActiveAt: new Date() }
  })

  // Check achievements
  // Update UserLessonProgress if this was a lesson quiz
  if (lessonId) {
    await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      create: { userId: user.id, lessonId },
      update: {},
    })

    // Mark complete if all lesson words have been attempted
    const lessonWordIds = (
      await prisma.hskWord.findMany({ where: { lessonId }, select: { id: true } })
    ).map(w => w.id)

    const attemptedCount = await prisma.userWordProgress.count({
      where: { userId: user.id, wordId: { in: lessonWordIds } },
    })

    if (attemptedCount >= lessonWordIds.length && lessonWordIds.length > 0) {
      await prisma.userLessonProgress.update({
        where: { userId_lessonId: { userId: user.id, lessonId } },
        data: { completedAt: new Date() },
      })
    }
  }

  const [masteredCount, totalSessions, earnedAchievements] = await Promise.all([
    prisma.userWordProgress.count({ where: { userId: user.id, status: 'mastered' } }),
    prisma.studySession.count({ where: { userId: user.id } }),
    prisma.userAchievement.findMany({ where: { userId: user.id }, include: { achievement: true } }),
  ])

  const stats = {
    streakDays: newStreak,
    wordsMastered: masteredCount,
    hskLevel: dbUser.hskLevel,
    totalSessions,
    weeklyAccuracy: accuracy ?? 0,
    weeklyXp: xpEarned,
    allTimeXp: newXp,
  }

  const earnedKeys = earnedAchievements.map(ua => ua.achievement.key)
  const newAchievementDefs = checkNewAchievements(stats, earnedKeys)

  const newAchievements = []
  for (const def of newAchievementDefs) {
    const achievement = await prisma.achievement.findUnique({ where: { key: def.key } })
    if (achievement) {
      await prisma.userAchievement.create({ data: { userId: user.id, achievementId: achievement.id } })
      await prisma.user.update({ where: { id: user.id }, data: { xp: { increment: achievement.xpReward } } })
      newAchievements.push(achievement)
    }
  }

  return NextResponse.json({ session, newAchievements, totalXp: newXp + newAchievements.reduce((sum, a) => sum + a.xpReward, 0) })
}
