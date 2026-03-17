import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { redirect, notFound } from 'next/navigation'
import { GraduationCap, ChevronRight, CheckCircle2, BookOpen, MessageSquare } from 'lucide-react'

const LEVEL_COLORS: Record<number, { color: string; bgLight: string; textColor: string; borderColor: string }> = {
  1: { color: 'bg-emerald-500', bgLight: 'bg-emerald-50', textColor: 'text-emerald-600', borderColor: 'border-emerald-400' },
  2: { color: 'bg-sky-500', bgLight: 'bg-sky-50', textColor: 'text-sky-600', borderColor: 'border-sky-400' },
  3: { color: 'bg-violet-500', bgLight: 'bg-violet-50', textColor: 'text-violet-600', borderColor: 'border-violet-400' },
  4: { color: 'bg-amber-500', bgLight: 'bg-amber-50', textColor: 'text-amber-600', borderColor: 'border-amber-400' },
  5: { color: 'bg-rose-500', bgLight: 'bg-rose-50', textColor: 'text-rose-600', borderColor: 'border-rose-400' },
  6: { color: 'bg-gray-700', bgLight: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-500' },
}

export default async function LevelLessonsPage({
  params,
}: {
  params: Promise<{ level: string }>
}) {
  const { level: levelSlug } = await params
  const levelNum = parseInt(levelSlug.replace('hsk', ''))
  if (isNaN(levelNum) || levelNum < 1 || levelNum > 6) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const lessons = await prisma.lesson.findMany({
    where: { level: levelNum },
    orderBy: { lessonNumber: 'asc' },
    include: {
      _count: { select: { words: true, dialogues: true, grammarPoints: true } },
    },
  })

  if (lessons.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20 text-gray-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-semibold">No lessons yet for HSK {levelNum}</p>
          <p className="text-sm mt-1">Lesson content is being added.</p>
        </div>
      </div>
    )
  }

  const progressRecords = await prisma.userLessonProgress.findMany({
    where: { userId: user.id, lessonId: { in: lessons.map(l => l.id) } },
  })
  const progressMap = new Map(progressRecords.map(p => [p.lessonId, p]))

  const colors = LEVEL_COLORS[levelNum] ?? LEVEL_COLORS[1]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/lessons" className="hover:text-gray-600">Lessons</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium">HSK {levelNum}</span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl ${colors.color} flex items-center justify-center text-white font-bold text-lg`}>
          {levelNum}
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">HSK {levelNum} Lessons</h1>
      </div>
      <p className="text-gray-500 mb-8">{lessons.length} lessons from the HSK Standard Course textbook.</p>

      <div className="flex flex-col gap-3">
        {lessons.map((lesson) => {
          const progress = progressMap.get(lesson.id)
          const isCompleted = !!progress?.completedAt
          const isStarted = !!progress && !isCompleted

          return (
            <Link
              key={lesson.id}
              href={`/lessons/hsk${levelNum}/${lesson.lessonNumber}`}
              className={`group flex items-center gap-4 bg-white rounded-2xl border-2 p-5 hover:shadow-md transition-all ${
                isCompleted
                  ? `${colors.borderColor} opacity-80`
                  : isStarted
                  ? colors.borderColor
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Lesson number badge */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                isCompleted ? colors.color : isStarted ? colors.color + ' opacity-70' : 'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : lesson.lessonNumber}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-gray-400">Lesson {lesson.lessonNumber}</span>
                  {isCompleted && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bgLight} ${colors.textColor}`}>
                      Complete
                    </span>
                  )}
                  {isStarted && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600">
                      In progress
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">
                  {lesson.title}{' '}
                  <span className="font-normal text-gray-400 text-sm">{lesson.titlePinyin}</span>
                </h3>
                <p className="text-sm text-gray-500 truncate">{lesson.subtitle}</p>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400 flex-shrink-0">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {lesson._count.words} words
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {lesson._count.dialogues} dialogues
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
