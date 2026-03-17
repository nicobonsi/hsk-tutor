import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { redirect, notFound } from 'next/navigation'
import { ChevronRight, ChevronLeft, Play } from 'lucide-react'
import { LessonTabs } from '@/components/lessons/LessonTabs'

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ level: string; number: string }>
}) {
  const { level: levelSlug, number } = await params
  const levelNum = parseInt(levelSlug.replace('hsk', ''))
  const lessonNum = parseInt(number)
  if (isNaN(levelNum) || isNaN(lessonNum)) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const lesson = await prisma.lesson.findUnique({
    where: { level_lessonNumber: { level: levelNum, lessonNumber: lessonNum } },
    include: {
      words: {
        select: {
          id: true,
          simplified: true,
          traditional: true,
          pinyin: true,
          pinyinTones: true,
          definitions: true,
          tags: true,
          level: true,
        },
      },
      dialogues: { orderBy: { dialogueNumber: 'asc' } },
      grammarPoints: { orderBy: { orderInLevel: 'asc' } },
      pinyinDrills: { orderBy: { order: 'asc' } },
      characters: { orderBy: { order: 'asc' }, include: { word: { select: { pinyin: true } } } },
      cultureNote: true,
    },
  })

  if (!lesson) notFound()

  const progress = await prisma.userLessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId: lesson.id } },
  })

  const [prevLesson, nextLesson] = await Promise.all([
    prisma.lesson.findUnique({
      where: { level_lessonNumber: { level: levelNum, lessonNumber: lessonNum - 1 } },
      select: { lessonNumber: true, title: true },
    }),
    prisma.lesson.findUnique({
      where: { level_lessonNumber: { level: levelNum, lessonNumber: lessonNum + 1 } },
      select: { lessonNumber: true, title: true },
    }),
  ])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/lessons" className="hover:text-gray-600">Lessons</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/lessons/hsk${levelNum}`} className="hover:text-gray-600">HSK {levelNum}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium">Lesson {lessonNum}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-400 font-medium mb-1">Lesson {lessonNum}</p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {lesson.title}
            <span className="ml-3 text-xl font-normal text-gray-400">{lesson.titlePinyin}</span>
          </h1>
          <p className="text-lg text-gray-500 mt-1">{lesson.subtitle}</p>
          {progress?.completedAt && (
            <span className="inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
              ✓ Completed
            </span>
          )}
        </div>

        <Link
          href={`/practice/quiz?lessonId=${lesson.id}&level=${levelNum}`}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors flex-shrink-0 self-start"
        >
          <Play className="w-4 h-4" />
          Practice this lesson
        </Link>
      </div>

      {/* Objectives */}
      {lesson.objectives.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-2">Learning objectives</p>
          <ul className="space-y-1">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-indigo-800">
                <span className="text-indigo-400 mt-0.5">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabbed content */}
      <LessonTabs lesson={lesson as any} />

      {/* Prev / Next navigation */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
        {prevLesson ? (
          <Link
            href={`/lessons/hsk${levelNum}/${lessonNum - 1}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Lesson {lessonNum - 1}: {prevLesson.title}</span>
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link
            href={`/lessons/hsk${levelNum}/${lessonNum + 1}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span>Lesson {lessonNum + 1}: {nextLesson.title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
