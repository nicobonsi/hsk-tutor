import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client'

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const weekKey = `${now.getFullYear()}-W${getWeekNumber(now)}`
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const topUsers = await prisma.user.findMany({
    select: { id: true, xp: true, streakDays: true, createdAt: true },
    orderBy: [{ xp: 'desc' }, { streakDays: 'desc' }, { createdAt: 'asc' }],
    take: 100,
  })

  const periods = [
    { period: 'alltime', periodKey: 'alltime' },
    { period: 'weekly', periodKey: weekKey },
    { period: 'monthly', periodKey: monthKey },
  ]

  for (const { period, periodKey } of periods) {
    for (let i = 0; i < topUsers.length; i++) {
      const u = topUsers[i]
      await prisma.leaderboardSnapshot.upsert({
        where: { userId_period_periodKey: { userId: u.id, period, periodKey } },
        update: { xp: u.xp, rank: i + 1, updatedAt: new Date() },
        create: { userId: u.id, period, periodKey, xp: u.xp, rank: i + 1 },
      })
    }
  }

  // Create today's daily challenge if it doesn't exist yet
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const existing = await prisma.dailyChallenge.findUnique({ where: { date: todayStart } })

  let challengeCreated = false
  if (!existing) {
    // Pick 10 random exercises spread across all levels
    const exercises = await prisma.exercise.findMany({
      select: { id: true },
      take: 50,
    })
    // Shuffle and pick 10
    const shuffled = exercises.sort(() => Math.random() - 0.5).slice(0, 10)

    if (shuffled.length > 0) {
      await prisma.dailyChallenge.create({
        data: {
          date: todayStart,
          levelRange: [1, 2, 3, 4, 5, 6],
          xpBonus: 50,
          exercises: { connect: shuffled.map((e) => ({ id: e.id })) },
        },
      })
      challengeCreated = true
    }
  }

  return NextResponse.json({ updated: topUsers.length, challengeCreated })
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
