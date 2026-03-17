import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 13,
  title: '喂，你在哪儿呢',
  titlePinyin: 'Wèi, nǐ zài nǎr ne',
  subtitle: 'Hello, Where Are You?',
  objectives: [
    'Make and answer phone calls in Chinese',
    'Talk about daily activities and habits',
    'Use 也 (yě) to add information',
    'Use 喜欢 (xǐhuan) to express likes',
  ],
  vocabulary: ['wèi', 'yě', 'xuéxí', 'shàngwǔ', 'shuìjiào', 'diànshì', 'xǐhuan', 'gěi', 'dǎ diànhuà', 'ba'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '打电话 Making a phone call',
      turns: [
        { speaker: '大卫', chinese: '喂，你好！', pinyin: 'Wèi, nǐ hǎo!', english: 'Hello! (on the phone)' },
        { speaker: '玛丽', chinese: '你好！你在哪儿呢？', pinyin: 'Nǐ hǎo! Nǐ zài nǎr ne?', english: 'Hello! Where are you?' },
        { speaker: '大卫', chinese: '我在家呢。上午我在学习，你呢？', pinyin: 'Wǒ zài jiā ne. Shàngwǔ wǒ zài xuéxí, nǐ ne?', english: 'I\'m at home. I\'m studying in the morning, and you?' },
        { speaker: '玛丽', chinese: '我在学校，给你打电话问你晚上要不要一起看电视。', pinyin: 'Wǒ zài xuéxiào, gěi nǐ dǎ diànhuà wèn nǐ wǎnshang yào bú yào yīqǐ kàn diànshì.', english: 'I\'m at school, calling to ask if you want to watch TV together tonight.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '谈爱好 Talking about hobbies',
      turns: [
        { speaker: '老师', chinese: '你喜欢做什么？', pinyin: 'Nǐ xǐhuan zuò shénme?', english: 'What do you like to do?' },
        { speaker: '大卫', chinese: '我喜欢看书，也喜欢看电视。你呢？', pinyin: 'Wǒ xǐhuan kàn shū, yě xǐhuan kàn diànshì. Nǐ ne?', english: 'I like reading and also watching TV. What about you?' },
        { speaker: '老师', chinese: '我喜欢睡觉！', pinyin: 'Wǒ xǐhuan shuìjiào!', english: 'I like sleeping!' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '也 — also / too',
      explanation: '也 (yě) means "also" or "too". It always comes before the verb, never at the end of a sentence (unlike English "too").',
      pattern: 'Subject + 也 + verb + object',
      examples: [
        { chinese: '我也是学生。', pinyin: 'Wǒ yě shì xuésheng.', english: 'I am also a student.' },
        { chinese: '她也喜欢看书。', pinyin: 'Tā yě xǐhuan kàn shū.', english: 'She also likes reading.' },
      ],
    },
    {
      title: '喜欢 — to like',
      explanation: '喜欢 (xǐhuan) means "to like". Follow with a noun or verb phrase. To express dislike: 不喜欢.',
      pattern: '喜欢 + noun/verb phrase',
      examples: [
        { chinese: '我喜欢猫。', pinyin: 'Wǒ xǐhuan māo.', english: 'I like cats.' },
        { chinese: '她喜欢唱歌。', pinyin: 'Tā xǐhuan chàng gē.', english: 'She likes singing.' },
        { chinese: '我不喜欢冷天气。', pinyin: 'Wǒ bù xǐhuan lěng tiānqì.', english: 'I don\'t like cold weather.' },
      ],
    },
    {
      title: '给 — for / to (giving/directing action)',
      explanation: '给 (gěi) means "to give" as a verb, or "for/to" as a preposition. 给你打电话 = "call you" (direct a phone call to you).',
      pattern: '给 + person + verb / verb + 给 + person',
      examples: [
        { chinese: '我给你打电话。', pinyin: 'Wǒ gěi nǐ dǎ diànhuà.', english: 'I\'ll call you.' },
        { chinese: '给我一个苹果。', pinyin: 'Gěi wǒ yī gè píngguǒ.', english: 'Give me an apple.' },
      ],
    },
  ],
  characters: [
    { character: '喜', wordPinyin: 'xǐhuan', strokeCount: 12, componentsExplanation: '壴 (drum) + 口 (mouth) — joy expressed aloud' },
    { character: '欢', strokeCount: 6, componentsExplanation: '又 (again) + 欠 (yawn) — delight; welcome' },
    { character: '电', strokeCount: 5, componentsExplanation: '日 (sun) + 乚 — electricity' },
    { character: '话', wordPinyin: 'dǎ diànhuà', strokeCount: 8, componentsExplanation: '言 (speech) + 舌 (tongue) — speech; words' },
    { character: '睡', wordPinyin: 'shuìjiào', strokeCount: 13, componentsExplanation: '目 (eye) + 垂 (hang down) — to sleep' },
    { character: '觉', strokeCount: 9, componentsExplanation: '爫 (claw) + 冖 (cover) + 见 (see) — to feel; sleep' },
  ],
}
