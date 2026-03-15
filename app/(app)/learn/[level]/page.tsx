import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { redirect, notFound } from 'next/navigation'
import { getHskLevel } from '@/lib/hsk/levels'
import { Play, ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ level: string }>
}

const STATUS_STYLES = {
  new: 'border-gray-200 bg-white',
  learning: 'border-blue-200 bg-blue-50',
  reviewing: 'border-yellow-200 bg-yellow-50',
  mastered: 'border-green-200 bg-green-50',
}

const STATUS_BADGE = {
  new: 'bg-gray-100 text-gray-500',
  learning: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  mastered: 'bg-green-100 text-green-700',
}

export default async function LevelPage({ params }: PageProps) {
  const { level: levelParam } = await params
  const level = parseInt(levelParam)

  if (isNaN(level) || level < 1 || level > 6) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const hskLevel = getHskLevel(level)

  const [words, userProgress] = await Promise.all([
    prisma.hskWord.findMany({
      where: { level },
      orderBy: [{ frequencyRank: 'asc' }, { simplified: 'asc' }],
    }),
    prisma.userWordProgress.findMany({
      where: { userId: user.id, word: { level } },
    }),
  ])

  const progressMap = new Map(userProgress.map((p) => [p.wordId, p]))

  const masteredCount = userProgress.filter((p) => p.status === 'mastered').length
  const percent = words.length > 0 ? Math.round((masteredCount / words.length) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Link href="/learn" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Levels
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${hskLevel.color} flex items-center justify-center text-white font-bold`}>
                {level}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{hskLevel.name}</h1>
            </div>
            <p className="text-gray-500 text-sm mt-1">{hskLevel.description}</p>
          </div>
          <Link
            href={`/practice/quiz?level=${level}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
          >
            <Play className="w-4 h-4" /> Practice This Level
          </Link>
        </div>

        {/* Progress */}
        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{masteredCount} of {words.length} words mastered</span>
            <span className="font-medium">{percent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className={`${hskLevel.color} h-2 rounded-full transition-all`} style={{ width: `${percent}%` }} />
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            {(['new', 'learning', 'reviewing', 'mastered'] as const).map((s) => (
              <span key={s} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full inline-block ${STATUS_BADGE[s].split(' ')[0]}`} />
                {s.charAt(0).toUpperCase() + s.slice(1)}: {userProgress.filter((p) => p.status === s).length}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Word Grid */}
      {words.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No words loaded yet for this level.</p>
          <p className="text-sm mt-1">Run the seed script to load HSK vocabulary.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {words.map((word) => {
            const progress = progressMap.get(word.id)
            const status = (progress?.status as keyof typeof STATUS_STYLES) ?? 'new'
            const def = (word.definitions as { meaning: string }[])[0]

            return (
              <div
                key={word.id}
                className={`rounded-xl border-2 p-4 transition-all hover:shadow-md cursor-default ${STATUS_STYLES[status]}`}
              >
                <div className="text-4xl font-bold text-gray-900 text-center mb-2 chinese-char">
                  {word.simplified}
                </div>
                <div className="text-sm text-center text-gray-500 mb-1">{word.pinyin}</div>
                <div className="text-xs text-center text-gray-600 line-clamp-2">{def?.meaning}</div>
                <div className="mt-2 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[status]}`}>
                    {status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
