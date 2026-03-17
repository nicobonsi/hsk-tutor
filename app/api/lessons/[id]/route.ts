import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const lesson = await prisma.lesson.findUnique({
    where: { id },
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
      characters: { orderBy: { order: 'asc' } },
      cultureNote: true,
    },
  })

  if (!lesson) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let progress = null
  if (user) {
    progress = await prisma.userLessonProgress.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId: id } },
    })
  }

  return NextResponse.json({ ...lesson, userProgress: progress })
}
