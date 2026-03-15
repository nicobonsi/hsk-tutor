import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { redirect } from 'next/navigation'
import { getAppRank, getXpProgressPercent } from '@/lib/gamification/xp'
import { getHskLevel } from '@/lib/hsk/levels'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [dbUser, achievements, sessions] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.userAchievement.findMany({
      where: { userId: user.id },
      include: { achievement: true },
      orderBy: { earnedAt: 'desc' },
    }),
    prisma.studySession.aggregate({
      where: { userId: user.id },
      _count: true,
      _sum: { wordsStudied: true },
    }),
  ])

  if (!dbUser) redirect('/login')

  const rank = getAppRank(dbUser.xp)
  const progressPercent = getXpProgressPercent(dbUser.xp)
  const hskLevel = getHskLevel(dbUser.hskLevel)

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-2xl font-bold">
            {dbUser.username[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{dbUser.username}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${hskLevel.bgLight} ${hskLevel.textColor}`}>
                {hskLevel.name}
              </span>
              {dbUser.isAlpha && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  Alpha
                </span>
              )}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{rank.name}</span>
            <span>{dbUser.xp.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Day Streak', value: `${dbUser.streakDays} 🔥`, color: 'text-orange-600' },
          { label: 'Sessions', value: sessions._count, color: 'text-blue-600' },
          { label: 'Words Studied', value: (sessions._sum.wordsStudied ?? 0).toLocaleString(), color: 'text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Achievements ({achievements.length})
        </h2>
        {achievements.length === 0 ? (
          <p className="text-gray-500 text-sm">Complete study sessions to earn achievements!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map((ua) => (
              <div
                key={ua.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <span className="text-2xl">{ua.achievement.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800">{ua.achievement.title}</div>
                  <div className="text-xs text-gray-500">+{ua.achievement.xpReward} XP</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
