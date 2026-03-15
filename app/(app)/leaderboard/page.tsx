'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Trophy, Flame, Star, Medal } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type Period = 'weekly' | 'monthly' | 'alltime'

interface LeaderboardEntry {
  id: string
  username: string
  avatarUrl: string | null
  xp: number
  hskLevel: number
  streakDays: number
  rank: number
}

interface LeaderboardData {
  period: string
  entries: LeaderboardEntry[]
  myRank: { rank: number; xp: number } | null
}

const LEVEL_COLORS: Record<number, string> = {
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-yellow-500',
  4: 'bg-orange-500',
  5: 'bg-red-600',
  6: 'bg-purple-700',
}

const PERIOD_LABELS: Record<Period, string> = {
  weekly: 'This Week',
  monthly: 'This Month',
  alltime: 'All Time',
}

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <Medal className="w-5 h-5 text-yellow-500 fill-yellow-400" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400 fill-gray-300" />
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600 fill-amber-500" />
  return <span className="text-sm font-semibold text-gray-500 w-5 text-center">#{rank}</span>
}

function Avatar({
  user,
}: {
  user: Pick<LeaderboardEntry, 'username' | 'avatarUrl' | 'hskLevel'>
}) {
  const levelColor = LEVEL_COLORS[user.hskLevel] ?? 'bg-gray-500'
  return (
    <div className="relative flex-shrink-0">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold uppercase">
          {user.username.slice(0, 1)}
        </div>
      )}
      <span
        className={cn(
          'absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center',
          levelColor
        )}
      >
        {user.hskLevel}
      </span>
    </div>
  )
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('weekly')

  const { data, isLoading, error } = useQuery<LeaderboardData>({
    queryKey: ['leaderboard', period],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?period=${period}`)
      if (!res.ok) throw new Error('Failed to fetch leaderboard')
      return res.json()
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
          <Trophy className="w-5 h-5 text-yellow-600 fill-yellow-400" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Leaderboard</h1>
          <p className="text-sm text-gray-500">Top learners ranked by XP earned</p>
        </div>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              period === p
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      {/* My rank banner */}
      {data?.myRank && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-red-600 fill-red-400" />
            <div>
              <p className="text-sm font-semibold text-red-700">Your rank</p>
              <p className="text-xs text-red-400">{data.myRank.xp.toLocaleString()} XP</p>
            </div>
          </div>
          <span className="text-2xl font-extrabold text-red-600">#{data.myRank.rank}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-red-500" />
          </div>
        )}

        {error && (
          <div className="py-12 text-center text-sm text-red-500">
            Failed to load leaderboard. Please refresh.
          </div>
        )}

        {data && !isLoading && (
          <ul className="divide-y divide-gray-100">
            {data.entries.map((entry) => {
              const isMe = data.myRank && entry.rank === data.myRank.rank
              return (
                <li
                  key={entry.id}
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 transition-colors',
                    isMe ? 'bg-red-50' : 'hover:bg-gray-50'
                  )}
                >
                  {/* Rank */}
                  <div className="w-6 flex items-center justify-center flex-shrink-0">
                    <RankMedal rank={entry.rank} />
                  </div>

                  {/* Avatar */}
                  <Avatar user={entry} />

                  {/* Name + level */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm font-semibold truncate',
                        isMe ? 'text-red-700' : 'text-gray-900'
                      )}
                    >
                      {entry.username}
                      {isMe && (
                        <span className="ml-2 text-[10px] bg-red-200 text-red-700 px-1.5 py-0.5 rounded-full font-bold">
                          you
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">HSK {entry.hskLevel}</p>
                  </div>

                  {/* Streak */}
                  <div className="hidden sm:flex items-center gap-1 text-orange-500">
                    <Flame className="w-4 h-4 fill-orange-400" />
                    <span className="text-sm font-semibold">{entry.streakDays}</span>
                  </div>

                  {/* XP */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{entry.xp.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">XP</p>
                  </div>
                </li>
              )
            })}

            {data.entries.length === 0 && (
              <li className="py-12 text-center text-sm text-gray-400">
                No entries yet. Be the first!
              </li>
            )}
          </ul>
        )}
      </div>

      <p className="mt-3 text-xs text-center text-gray-400">
        Updates every 60 seconds · Top 50 shown
      </p>
    </div>
  )
}
