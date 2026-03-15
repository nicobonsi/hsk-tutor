import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { redirect } from 'next/navigation'
import { HSK_LEVELS } from '@/lib/hsk/levels'
import { BookOpen, ChevronRight, Lock } from 'lucide-react'

export default async function LearnPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) redirect('/login')

  // Get word counts and mastered counts per level
  const progressByLevel = await Promise.all(
    HSK_LEVELS.map(async (lvl) => {
      const [total, mastered] = await Promise.all([
        prisma.hskWord.count({ where: { level: lvl.level } }),
        prisma.userWordProgress.count({
          where: { userId: user.id, word: { level: lvl.level }, status: 'mastered' },
        }),
      ])
      return { level: lvl.level, total, mastered }
    })
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-red-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Learn</h1>
      </div>
      <p className="text-gray-500 mb-8">
        Choose an HSK level to study. Your current level is{' '}
        <span className="font-semibold text-gray-800">HSK {dbUser.hskLevel}</span>.
      </p>

      {/* Level grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HSK_LEVELS.map((level) => {
          const progress = progressByLevel.find((p) => p.level === level.level)
          const percent =
            progress && progress.total > 0
              ? Math.round((progress.mastered / progress.total) * 100)
              : 0
          const isCurrentLevel = dbUser.hskLevel === level.level
          const isLocked = level.level > dbUser.hskLevel + 1

          return (
            <div
              key={level.level}
              className={`group relative bg-white rounded-2xl border-2 p-6 transition-all flex flex-col gap-4 ${
                isLocked
                  ? 'border-gray-100 opacity-50 cursor-not-allowed'
                  : isCurrentLevel
                  ? `${level.borderColor} shadow-md hover:shadow-lg`
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {isCurrentLevel && (
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${level.bgLight} ${level.textColor}`}
                >
                  Current
                </span>
              )}
              {isLocked && (
                <span className="absolute top-3 right-3">
                  <Lock className="w-4 h-4 text-gray-400" />
                </span>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl ${level.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                  {level.level}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{level.name}</h2>
                  <p className="text-xs text-gray-400">{level.wordCount.toLocaleString()} words</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">{level.description}</p>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>
                    {progress?.mastered ?? 0} / {progress?.total ?? level.wordCount} mastered
                  </span>
                  <span>{percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`${level.color} h-1.5 rounded-full transition-all`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* CTA */}
              {!isLocked ? (
                <Link
                  href={`/learn/${level.level}`}
                  className={`flex items-center justify-between ${level.textColor} font-semibold text-sm hover:underline group mt-auto`}
                >
                  Study {level.name}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <span className="text-xs text-gray-400 mt-auto">
                  Reach HSK {level.level - 1} to unlock
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Study tip */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <BookOpen className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Study tip</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Master 80% of your current level before moving on. The adaptive system will help you
            review weak spots automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
