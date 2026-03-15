import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { redirect, notFound } from 'next/navigation'
import { getHskLevel } from '@/lib/hsk/levels'
import { ArrowLeft, Zap, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import WordCardGrid from '@/components/learn/WordCardGrid'

interface PageProps {
  params: Promise<{ level: string }>
}

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-gray-100 text-gray-500',
  learning: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  mastered: 'bg-green-100 text-green-700',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  learning: 'Learning',
  reviewing: 'Reviewing',
  mastered: 'Mastered',
}

export default async function LevelPage({ params }: PageProps) {
  const { level: levelParam } = await params
  const level = parseInt(levelParam, 10)

  if (isNaN(level) || level < 1 || level > 6) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const hskLevel = getHskLevel(level)

  const [words, userProgress] = await Promise.all([
    prisma.hskWord.findMany({
      where: { level },
      select: {
        id: true,
        simplified: true,
        traditional: true,
        pinyin: true,
        definitions: true,
      },
      orderBy: [{ frequencyRank: 'asc' }, { simplified: 'asc' }],
    }),
    prisma.userWordProgress.findMany({
      where: { userId: user.id, word: { level } },
      select: { wordId: true, status: true },
    }),
  ])

  const progressMap = new Map(userProgress.map((p) => [p.wordId, p.status]))

  const statusCounts = { new: 0, learning: 0, reviewing: 0, mastered: 0 }
  for (const word of words) {
    const s = (progressMap.get(word.id) ?? 'new') as keyof typeof statusCounts
    if (s in statusCounts) statusCounts[s]++
  }

  const percent = words.length > 0 ? Math.round((statusCounts.mastered / words.length) * 100) : 0

  // Prepare serializable word data for client component
  const wordsForClient = words.map((w) => ({
    id: w.id,
    simplified: w.simplified,
    traditional: w.traditional ?? null,
    pinyin: w.pinyin,
    definitions: Array.isArray(w.definitions)
      ? (w.definitions as Array<{ meaning: string } | string>).map((d) =>
          typeof d === 'string' ? d : d.meaning
        )
      : [String(w.definitions)],
    status: progressMap.get(w.id) ?? 'new',
  }))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back nav */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to levels
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xl',
              hskLevel.color
            )}
          >
            {level}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{hskLevel.name}</h1>
            <p className="text-sm text-gray-500">{hskLevel.description}</p>
          </div>
        </div>
        <Link
          href={`/practice/quiz?level=${level}`}
          className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-100 w-fit"
        >
          <Zap className="w-4 h-4" />
          Start Practice
        </Link>
      </div>

      {/* Progress card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-800">Progress</p>
          <span className="text-sm font-bold text-gray-900">{percent}% mastered</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className={cn('h-full rounded-full transition-all', hskLevel.color)}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['new', 'learning', 'reviewing', 'mastered'] as const).map((status) => (
            <div key={status} className={cn('rounded-xl px-3 py-2', STATUS_BADGE[status].split(' ')[0])}>
              <p className={cn('text-xs font-semibold', STATUS_BADGE[status].split(' ')[1])}>
                {STATUS_LABELS[status]}
              </p>
              <p className={cn('text-xl font-extrabold', STATUS_BADGE[status].split(' ')[1])}>
                {statusCounts[status]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Word grid */}
      {words.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No words found for this level yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Run the seed script to populate HSK vocabulary.
          </p>
        </div>
      ) : (
        <WordCardGrid words={wordsForClient} levelColor={hskLevel.color} />
      )}
    </div>
  )
}
