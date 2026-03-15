import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import hsk1 from './data/hsk1.json'
import hsk2 from './data/hsk2.json'
import achievementsData from './data/achievements.json'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding HSK words...')

  // Seed HSK Level 1 words — delete existing then bulk insert
  await prisma.hskWord.deleteMany({ where: { level: 1 } })
  await prisma.hskWord.createMany({
    data: hsk1.map((word) => ({
      level: 1,
      simplified: word.simplified,
      traditional: word.traditional,
      pinyin: word.pinyin,
      pinyinTones: word.pinyinTones,
      definitions: word.definitions,
      tags: word.tags,
      frequencyRank: word.frequencyRank,
    })),
  })
  console.log(`Seeded ${hsk1.length} HSK Level 1 words.`)

  // Seed HSK Level 2 words — delete existing then bulk insert
  await prisma.hskWord.deleteMany({ where: { level: 2 } })
  await prisma.hskWord.createMany({
    data: hsk2.map((word) => ({
      level: 2,
      simplified: word.simplified,
      traditional: word.traditional,
      pinyin: word.pinyin,
      pinyinTones: word.pinyinTones,
      definitions: word.definitions,
      tags: word.tags,
      frequencyRank: word.frequencyRank,
    })),
  })
  console.log(`Seeded ${hsk2.length} HSK Level 2 words.`)

  // Seed achievements — upsert so existing records are preserved/updated
  console.log('Seeding achievements...')
  for (const achievement of achievementsData) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: {
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        xpReward: achievement.xpReward,
        conditionType: achievement.conditionType,
        conditionValue: achievement.conditionValue,
      },
      create: {
        key: achievement.key,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        xpReward: achievement.xpReward,
        conditionType: achievement.conditionType,
        conditionValue: achievement.conditionValue,
      },
    })
  }
  console.log(`Seeded ${achievementsData.length} achievements.`)

  console.log('Seeding complete!')
}

main()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
