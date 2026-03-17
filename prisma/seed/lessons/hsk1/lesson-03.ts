import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 3,
  title: '你叫什么名字',
  titlePinyin: 'Nǐ jiào shénme míngzi',
  subtitle: 'What\'s Your Name?',
  objectives: [
    'Ask someone\'s name',
    'Introduce yourself',
    'Use 是 (shì) to identify yourself',
    'Ask yes/no questions with 吗 (ma)',
  ],
  vocabulary: ['jiào', 'míngzi', 'lǎoshī', 'ma', 'shì', 'shénme', 'wǒ', 'rén', 'xuésheng'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '问名字 Asking names',
      turns: [
        { speaker: '老师', chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: 'What is your name?' },
        { speaker: '大卫', chinese: '我叫大卫。', pinyin: 'Wǒ jiào Dàwèi.', english: 'My name is David.' },
        { speaker: '老师', chinese: '你是学生吗？', pinyin: 'Nǐ shì xuésheng ma?', english: 'Are you a student?' },
        { speaker: '大卫', chinese: '是，我是学生。', pinyin: 'Shì, wǒ shì xuésheng.', english: 'Yes, I am a student.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '介绍老师 Introducing the teacher',
      turns: [
        { speaker: '大卫', chinese: '她是老师吗？', pinyin: 'Tā shì lǎoshī ma?', english: 'Is she a teacher?' },
        { speaker: '玛丽', chinese: '是，她是我们的老师。', pinyin: 'Shì, tā shì wǒmen de lǎoshī.', english: 'Yes, she is our teacher.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '叫 — to be called / named',
      explanation: '叫 (jiào) means "to be called" or "to call". Use it to give or ask a name: 你叫什么名字？(What is your name?) / 我叫＿＿。(My name is __).',
      pattern: '你叫什么名字？/ 我叫＿＿。',
      examples: [
        { chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: 'What is your name?' },
        { chinese: '我叫李明。', pinyin: 'Wǒ jiào Lǐ Míng.', english: 'My name is Li Ming.' },
      ],
    },
    {
      title: '是 — to be (affirmation)',
      explanation: '是 (shì) is the verb "to be" used to equate or identify. Negate with 不是 (bú shì). Unlike English, 是 is not used before adjectives.',
      pattern: '我是＿＿。/ 我不是＿＿。',
      examples: [
        { chinese: '我是老师。', pinyin: 'Wǒ shì lǎoshī.', english: 'I am a teacher.' },
        { chinese: '我不是学生。', pinyin: 'Wǒ bú shì xuésheng.', english: 'I am not a student.' },
      ],
    },
    {
      title: '吗 — yes/no question particle',
      explanation: '吗 (ma) is added to the end of a statement to turn it into a yes/no question. No word order change needed.',
      pattern: '陈述句 + 吗？',
      examples: [
        { chinese: '你是学生吗？', pinyin: 'Nǐ shì xuésheng ma?', english: 'Are you a student?' },
        { chinese: '他是老师吗？', pinyin: 'Tā shì lǎoshī ma?', english: 'Is he a teacher?' },
      ],
    },
  ],
  pinyinDrills: [
    {
      type: 'initial',
      order: 1,
      content: [
        {
          symbol: 'g',
          examples: [
            { pinyin: 'gāo', character: '高', meaning: 'tall' },
            { pinyin: 'guó', character: '国', meaning: 'country' },
          ],
        },
        {
          symbol: 'k',
          examples: [
            { pinyin: 'kāi', character: '开', meaning: 'to open' },
            { pinyin: 'kè', character: '课', meaning: 'class/lesson' },
          ],
        },
        {
          symbol: 'h',
          examples: [
            { pinyin: 'hǎo', character: '好', meaning: 'good' },
            { pinyin: 'hàn', character: '汉', meaning: 'Chinese (Han)' },
          ],
        },
      ],
    },
  ],
  characters: [
    { character: '叫', wordPinyin: 'jiào', strokeCount: 5, componentsExplanation: '口 (mouth) + 丩 — to call out' },
    { character: '名', strokeCount: 6, componentsExplanation: '夕 (evening) + 口 (mouth) — calling out one\'s name in the dark' },
    { character: '字', strokeCount: 6, componentsExplanation: '宀 (roof) + 子 (child) — characters written under a roof' },
    { character: '是', wordPinyin: 'shì', strokeCount: 9, componentsExplanation: '日 (sun) + 正 (correct) — to be correct' },
    { character: '我', wordPinyin: 'wǒ', strokeCount: 7, componentsExplanation: '手 (hand) + 戈 (spear) — I/me' },
  ],
}
