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
  const { level, mode, xpEarned, wordsStudied, accuracy, durationMs } = body

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const session = await prisma.studySession.create({
    data: { userId: user.id, level, mode, xpEarned, wordsStudied, accuracy, durationMs }
  })

  const newStreak = calculateStreak(dbUser.lastActiveAt, dbUser.streakDays)
  const newXp = dbUser.xp + xpEarned

  await prisma.user.update({
    where: { id: user.id },
    data: { xp: newXp, streakDays: newStreak, lastActiveAt: new Date() }
  })

  // Check achievements
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
