import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import type { LessonSeed } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toJson = (v: unknown): Prisma.InputJsonValue => v as any

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

// Import all lesson files
import { lesson as lesson01 } from './lessons/hsk1/lesson-01'
import { lesson as lesson02 } from './lessons/hsk1/lesson-02'
import { lesson as lesson03 } from './lessons/hsk1/lesson-03'
import { lesson as lesson04 } from './lessons/hsk1/lesson-04'
import { lesson as lesson05 } from './lessons/hsk1/lesson-05'
import { lesson as lesson06 } from './lessons/hsk1/lesson-06'
import { lesson as lesson07 } from './lessons/hsk1/lesson-07'
import { lesson as lesson08 } from './lessons/hsk1/lesson-08'
import { lesson as lesson09 } from './lessons/hsk1/lesson-09'
import { lesson as lesson10 } from './lessons/hsk1/lesson-10'
import { lesson as lesson11 } from './lessons/hsk1/lesson-11'
import { lesson as lesson12 } from './lessons/hsk1/lesson-12'
import { lesson as lesson13 } from './lessons/hsk1/lesson-13'
import { lesson as lesson14 } from './lessons/hsk1/lesson-14'
import { lesson as lesson15 } from './lessons/hsk1/lesson-15'

const ALL_LESSONS: LessonSeed[] = [
  lesson01, lesson02, lesson03, lesson04, lesson05,
  lesson06, lesson07, lesson08, lesson09, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
]

async function seedLesson(data: LessonSeed) {
  console.log(`  Seeding HSK${data.level} Lesson ${data.lessonNumber}: ${data.title}`)

  // Upsert lesson
  const lesson = await prisma.lesson.upsert({
    where: { level_lessonNumber: { level: data.level, lessonNumber: data.lessonNumber } },
    create: {
      level: data.level,
      lessonNumber: data.lessonNumber,
      title: data.title,
      titlePinyin: data.titlePinyin,
      subtitle: data.subtitle,
      objectives: data.objectives,
    },
    update: {
      title: data.title,
      titlePinyin: data.titlePinyin,
      subtitle: data.subtitle,
      objectives: data.objectives,
    },
  })

  // Link vocabulary words to lesson
  for (const vocab of data.vocabulary) {
    await prisma.hskWord.updateMany({
      where: { pinyin: vocab, level: data.level },
      data: { lessonId: lesson.id },
    })
  }

  // Upsert dialogues (delete + recreate for idempotency)
  await prisma.lessonDialogue.deleteMany({ where: { lessonId: lesson.id } })
  for (const d of data.dialogues) {
    await prisma.lessonDialogue.create({
      data: {
        lessonId: lesson.id,
        dialogueNumber: d.dialogueNumber,
        title: d.title ?? null,
        turns: toJson(d.turns),
      },
    })
  }

  // Upsert grammar points
  await prisma.grammarPoint.deleteMany({ where: { lessonId: lesson.id } })
  for (let i = 0; i < data.grammarPoints.length; i++) {
    const g = data.grammarPoints[i]
    const slug = `hsk${data.level}-l${data.lessonNumber}-g${i + 1}`
    await prisma.grammarPoint.upsert({
      where: { slug },
      create: {
        level: data.level,
        title: g.title,
        slug,
        explanation: g.explanation,
        examples: toJson(g.examples),
        pattern: g.pattern ?? null,
        relatedWords: [],
        orderInLevel: (data.lessonNumber - 1) * 10 + i,
        lessonId: lesson.id,
      },
      update: {
        title: g.title,
        explanation: g.explanation,
        examples: toJson(g.examples),
        pattern: g.pattern ?? null,
        lessonId: lesson.id,
      },
    })
  }

  // Upsert pinyin drills
  await prisma.lessonPinyinDrill.deleteMany({ where: { lessonId: lesson.id } })
  if (data.pinyinDrills) {
    for (const drill of data.pinyinDrills) {
      await prisma.lessonPinyinDrill.create({
        data: {
          lessonId: lesson.id,
          type: drill.type,
          content: toJson(drill.content),
          order: drill.order,
        },
      })
    }
  }

  // Upsert characters
  await prisma.lessonCharacter.deleteMany({ where: { lessonId: lesson.id } })
  for (let i = 0; i < data.characters.length; i++) {
    const c = data.characters[i]
    let wordId: string | null = null
    if (c.wordPinyin) {
      const word = await prisma.hskWord.findFirst({
        where: { pinyin: c.wordPinyin, level: data.level },
      })
      wordId = word?.id ?? null
    }
    await prisma.lessonCharacter.create({
      data: {
        lessonId: lesson.id,
        character: c.character,
        wordId,
        strokeCount: c.strokeCount ?? null,
        componentsExplanation: c.componentsExplanation ?? null,
        order: i,
      },
    })
  }

  // Upsert culture note
  if (data.cultureNote) {
    await prisma.cultureNote.upsert({
      where: { lessonId: lesson.id },
      create: {
        lessonId: lesson.id,
        title: data.cultureNote.title,
        content: data.cultureNote.content,
        imageUrl: data.cultureNote.imageUrl ?? null,
      },
      update: {
        title: data.cultureNote.title,
        content: data.cultureNote.content,
        imageUrl: data.cultureNote.imageUrl ?? null,
      },
    })
  }
}

async function main() {
  console.log('Seeding lessons...')
  for (const lesson of ALL_LESSONS) {
    await seedLesson(lesson)
  }
  console.log(`Done. Seeded ${ALL_LESSONS.length} lessons.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
