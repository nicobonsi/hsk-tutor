import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [dbUser, wordProgress, sessions, achievements] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.userWordProgress.groupBy({
      by: ['status'],
      where: { userId: user.id },
      _count: true,
    }),
    prisma.studySession.findMany({
      where: { userId: user.id },
      orderBy: { completedAt: 'desc' },
      take: 10,
    }),
    prisma.userAchievement.findMany({
      where: { userId: user.id },
      include: { achievement: true },
      orderBy: { earnedAt: 'desc' },
    }),
  ])

  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({
    user: dbUser,
    wordProgress,
    recentSessions: sessions,
    achievements: achievements.map(ua => ua.achievement),
  })
}
