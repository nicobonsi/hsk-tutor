import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const level = parseInt(request.nextUrl.searchParams.get('level') ?? '1')

  const lessons = await prisma.lesson.findMany({
    where: { level },
    orderBy: { lessonNumber: 'asc' },
    include: {
      _count: { select: { words: true, dialogues: true, grammarPoints: true } },
    },
  })

  const progressMap: Map<string, { startedAt: Date; completedAt: Date | null }> = new Map()

  if (user) {
    const progress = await prisma.userLessonProgress.findMany({
      where: { userId: user.id, lessonId: { in: lessons.map(l => l.id) } },
    })
    for (const p of progress) {
      progressMap.set(p.lessonId, { startedAt: p.startedAt, completedAt: p.completedAt })
    }
  }

  const result = lessons.map(l => ({
    id: l.id,
    level: l.level,
    lessonNumber: l.lessonNumber,
    title: l.title,
    titlePinyin: l.titlePinyin,
    subtitle: l.subtitle,
    objectives: l.objectives,
    wordCount: l._count.words,
    dialogueCount: l._count.dialogues,
    grammarCount: l._count.grammarPoints,
    progress: progressMap.get(l.id) ?? null,
  }))

  return NextResponse.json(result)
}
