import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get('period') ?? 'weekly'

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Return users ordered by XP (leaderboard snapshots will be used in production)
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      xp: true,
      hskLevel: true,
      streakDays: true,
    },
    orderBy: [{ xp: 'desc' }, { streakDays: 'desc' }],
    take: 50,
  })

  const entries = users.map((u, i) => ({ ...u, rank: i + 1 }))

  let myRank: { rank: number; xp: number } | null = null

  if (user) {
    const myIndex = entries.findIndex((e) => e.id === user.id)
    if (myIndex >= 0) {
      myRank = { rank: myIndex + 1, xp: entries[myIndex].xp }
    } else {
      const myXp =
        (await prisma.user.findUnique({ where: { id: user.id }, select: { xp: true } }))?.xp ?? 0
      const higherCount = await prisma.user.count({ where: { xp: { gt: myXp } } })
      myRank = { rank: higherCount + 1, xp: myXp }
    }
  }

  return NextResponse.json({ period, entries, myRank })
}
