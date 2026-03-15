import { prisma } from '@/lib/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const level = parseInt(request.nextUrl.searchParams.get('level') ?? '1')
  const count = parseInt(request.nextUrl.searchParams.get('count') ?? '10')

  const exercises = await prisma.exercise.findMany({
    where: { level },
    take: count,
    include: { word: true },
    orderBy: { difficulty: 'asc' },
  })

  // If no exercises yet, generate from words
  if (exercises.length === 0) {
    const words = await prisma.hskWord.findMany({
      where: { level },
      take: count,
    })

    const generatedExercises = words.map(word => ({
      id: word.id,
      type: 'vocab_recall' as const,
      level: word.level,
      wordId: word.id,
      prompt: {
        display: word.simplified,
        displayMode: 'character',
        askFor: 'definition',
      },
      correctAnswer: (word.definitions as any)[0]?.meaning ?? '',
      distractors: [],
      difficulty: 1,
      tags: word.tags,
      word,
    }))

    return NextResponse.json(generatedExercises)
  }

  return NextResponse.json(exercises)
}
