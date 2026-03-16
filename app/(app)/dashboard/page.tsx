import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import {
  Flame,
  Zap,
  BookOpen,
  Headphones,
  Trophy,
  ArrowRight,
  Star,
} from 'lucide-react'

const LEVEL_COLORS: Record<number, string> = {
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-yellow-500',
  4: 'bg-orange-500',
  5: 'bg-red-600',
  6: 'bg-purple-700',
}

const LEVEL_NAMES: Record<number, string> = {
  1: 'Beginner',
  2: 'Elementary',
  3: 'Intermediate',
  4: 'Upper-Intermediate',
  5: 'Advanced',
  6: 'Mastery',
}

const XP_PER_LEVEL = 1000

function XpBar({ xp }: { xp: number }) {
  const xpInLevel = xp % XP_PER_LEVEL
  const progress = Math.min((xpInLevel / XP_PER_LEVEL) * 100, 100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span>{xpInLevel.toLocaleString()} XP</span>
        <span>{XP_PER_LEVEL.toLocaleString()} XP</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) redirect('/login')

  const [dbUser, recentSessions, todayChallenge] = await Promise.all([
    prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        username: true,
        hskLevel: true,
        xp: true,
        streakDays: true,
        lastActiveAt: true,
      },
    }),
    prisma.studySession.findMany({
      where: { userId: authUser.id },
      orderBy: { completedAt: 'desc' },
      take: 3,
      select: {
        id: true,
        mode: true,
        xpEarned: true,
        wordsStudied: true,
        accuracy: true,
        completedAt: true,
      },
    }),
    prisma.dailyChallenge.findFirst({
      where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      select: { id: true, xpBonus: true, date: true },
    }),
  ])

  if (!dbUser) {
    const username =
      (authUser.user_metadata?.username as string | undefined) ??
      authUser.email?.split('@')[0] ??
      'user'
    try {
      await prisma.user.create({
        data: { id: authUser.id, email: authUser.email!, username },
      })
    } catch {
      // username conflict or other error — sign them out and back to register
      await supabase.auth.signOut()
      redirect('/register')
    }
    redirect('/dashboard')
  }

  const levelColor = LEVEL_COLORS[dbUser.hskLevel] ?? 'bg-gray-500'
  const levelName = LEVEL_NAMES[dbUser.hskLevel] ?? 'Unknown'
  const hourOfDay = new Date().getHours()
  const greeting =
    hourOfDay < 12 ? 'Good morning' : hourOfDay < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          {greeting}, {dbUser.username} 👋
        </h1>
        <p className="text-gray-500 mt-1">Ready to practice some Mandarin today?</p>
      </div>

      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Streak */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900">{dbUser.streakDays}</p>
            <p className="text-sm text-gray-500">Day streak</p>
          </div>
        </div>

        {/* Total XP */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-900">{dbUser.xp.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total XP</p>
          </div>
        </div>

        {/* HSK Level */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div
            className={`w-12 h-12 ${levelColor} rounded-xl flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-white font-extrabold text-lg">H{dbUser.hskLevel}</span>
          </div>
          <div>
            <p className="text-lg font-extrabold text-gray-900">HSK {dbUser.hskLevel}</p>
            <p className="text-sm text-gray-500">{levelName}</p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily challenge */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-lg shadow-red-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold text-red-100">Daily Challenge</span>
                </div>
                <h2 className="text-xl font-extrabold">
                  {todayChallenge ? "Today's challenge is live!" : 'No challenge today yet'}
                </h2>
                <p className="text-sm text-red-200 mt-1">
                  {todayChallenge
                    ? `Complete it to earn +${todayChallenge.xpBonus} bonus XP`
                    : 'A new challenge drops every day at midnight UTC'}
                </p>
              </div>
              {todayChallenge && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                  +{todayChallenge.xpBonus} XP
                </span>
              )}
            </div>
            {todayChallenge && (
              <Link
                href="/practice/quiz"
                className="inline-flex items-center gap-2 bg-white text-red-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
              >
                Start Challenge <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* HSK Level progress */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">HSK {dbUser.hskLevel} Progress</h2>
              <span className={`${levelColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                {levelName}
              </span>
            </div>
            <XpBar xp={dbUser.xp} />
            <p className="text-xs text-gray-400 mt-2">
              {XP_PER_LEVEL - (dbUser.xp % XP_PER_LEVEL)} XP until next level
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href={`/learn/${dbUser.hskLevel}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                View HSK {dbUser.hskLevel} word list <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Recent Activity</h2>
            {recentSessions.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">
                No sessions yet. Start practicing below!
              </p>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session: (typeof recentSessions)[number]) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 capitalize">
                          {session.mode} session
                        </p>
                        <p className="text-xs text-gray-400">
                          {session.wordsStudied} words ·{' '}
                          {session.accuracy ? `${Math.round(session.accuracy * 100)}% accuracy` : 'n/a'}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-yellow-600">
                      +{session.xpEarned} XP
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick start */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Quick Start</h2>
            <div className="space-y-3">
              <Link
                href="/practice/quiz"
                className="w-full flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Flashcards
              </Link>
              <Link
                href="/practice/quiz"
                className="w-full flex items-center gap-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <Zap className="w-5 h-5" />
                Quiz
              </Link>
              <Link
                href="/practice/quiz"
                className="w-full flex items-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <Headphones className="w-5 h-5" />
                Listening
              </Link>
            </div>
          </div>

          {/* Leaderboard CTA */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg shadow-purple-100">
            <Trophy className="w-6 h-6 text-yellow-300 mb-2" />
            <h3 className="font-bold text-base mb-1">Leaderboard</h3>
            <p className="text-xs text-purple-200 mb-4">
              See how you rank against learners worldwide.
            </p>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-1.5 bg-white text-purple-700 font-semibold text-xs px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              View Rankings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
