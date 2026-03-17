import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const level = parseInt(request.nextUrl.searchParams.get('level') ?? '1')
  const count = Math.min(parseInt(request.nextUrl.searchParams.get('count') ?? '10'), 200)
  const now = new Date()

  const allWords = await prisma.hskWord.findMany({
    where: { level },
    select: { id: true, simplified: true, traditional: true, pinyin: true, definitions: true, tags: true, level: true },
  })

  let orderedIds: string[] = []

  if (user) {
    const progress = await prisma.userWordProgress.findMany({
      where: { userId: user.id, word: { level } },
      select: { wordId: true, status: true, nextReviewAt: true },
    })

    const seenIds = new Set(progress.map(p => p.wordId))

    // 1. Due for review (nextReviewAt in the past, not mastered)
    const dueIds = shuffle(
      progress
        .filter(p => p.status !== 'mastered' && p.nextReviewAt && p.nextReviewAt <= now)
        .map(p => p.wordId)
    )

    // 2. New words (never seen)
    const newIds = shuffle(allWords.filter(w => !seenIds.has(w.id)).map(w => w.id))

    // 3. Mastered words (for review reinforcement)
    const masteredIds = shuffle(
      progress.filter(p => p.status === 'mastered').map(p => p.wordId)
    )

    // 4. In-progress not yet due
    const inProgressIds = shuffle(
      progress
        .filter(p => p.status !== 'mastered' && (!p.nextReviewAt || p.nextReviewAt > now))
        .map(p => p.wordId)
    )

    const combined = [...dueIds, ...newIds, ...inProgressIds, ...masteredIds]
    orderedIds = combined.slice(0, count)

    // If still not enough, cycle through new words again
    if (orderedIds.length < count) {
      const used = new Set(orderedIds)
      const extra = shuffle(allWords.filter(w => !used.has(w.id)).map(w => w.id))
      orderedIds = [...orderedIds, ...extra].slice(0, count)
    }
  } else {
    orderedIds = shuffle(allWords.map(w => w.id)).slice(0, count)
  }

  const wordMap = new Map(allWords.map(w => [w.id, w]))

  const exercises = orderedIds
    .map(id => wordMap.get(id))
    .filter(Boolean)
    .map(word => ({
      id: word!.id,
      type: 'vocab_recall' as const,
      level: word!.level,
      wordId: word!.id,
      prompt: {
        display: word!.simplified,
        displayMode: 'character',
        askFor: 'definition',
      },
      correctAnswer: (word!.definitions as any)[0]?.meaning ?? '',
      distractors: [],
      difficulty: 1,
      tags: word!.tags,
      word: word!,
    }))

  return NextResponse.json(exercises)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
