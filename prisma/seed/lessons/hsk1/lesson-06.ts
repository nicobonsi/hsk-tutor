import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 6,
  title: '我会说汉语',
  titlePinyin: 'Wǒ huì shuō Hànyǔ',
  subtitle: 'I Can Speak Chinese',
  objectives: [
    'Say what language you can speak',
    'Express abilities with 会 (huì)',
    'Use common action verbs',
    'Describe quality with 很 (hěn)',
  ],
  vocabulary: ['cài', 'hěn', 'māma', 'shuō', 'xiě', 'zuò', 'zì', 'zěnme', 'dú', 'huì'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '语言能力 Language ability',
      turns: [
        { speaker: '老师', chinese: '你会说汉语吗？', pinyin: 'Nǐ huì shuō Hànyǔ ma?', english: 'Can you speak Chinese?' },
        { speaker: '大卫', chinese: '会，我会说汉语，也会写汉字。', pinyin: 'Huì, wǒ huì shuō Hànyǔ, yě huì xiě Hànzì.', english: 'Yes, I can speak Chinese and also write Chinese characters.' },
        { speaker: '老师', chinese: '很好！你汉语说得很好。', pinyin: 'Hěn hǎo! Nǐ Hànyǔ shuō de hěn hǎo.', english: 'Very good! Your Chinese is very good.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '做菜 Cooking',
      turns: [
        { speaker: '玛丽', chinese: '你妈妈会做菜吗？', pinyin: 'Nǐ māma huì zuò cài ma?', english: 'Can your mother cook?' },
        { speaker: '大卫', chinese: '会，她做的菜很好吃。', pinyin: 'Huì, tā zuò de cài hěn hǎochī.', english: 'Yes, the food she makes is very delicious.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '会 — can / to know how to',
      explanation: '会 (huì) expresses learned ability — knowing how to do something through learning. Different from 能 (néng, physical ability) and 可以 (kěyǐ, permission).',
      pattern: '我会 + verb',
      examples: [
        { chinese: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', english: 'I can speak Chinese.' },
        { chinese: '她会做菜。', pinyin: 'Tā huì zuò cài.', english: 'She can cook.' },
        { chinese: '我不会写汉字。', pinyin: 'Wǒ bú huì xiě Hànzì.', english: 'I can\'t write Chinese characters.' },
      ],
    },
    {
      title: '很 — very (adverb before adjective)',
      explanation: '很 (hěn) means "very". In Chinese, adjectives used as predicates usually need an adverb like 很 before them. A bare 好 without 很 implies contrast.',
      pattern: '很 + adjective',
      examples: [
        { chinese: '他很好。', pinyin: 'Tā hěn hǎo.', english: 'He is very good.' },
        { chinese: '这个菜很好吃。', pinyin: 'Zhège cài hěn hǎochī.', english: 'This dish is very tasty.' },
      ],
    },
    {
      title: '怎么 — how (asking about method)',
      explanation: '怎么 (zěnme) asks "how" in the sense of "by what method" or "in what way". 怎么样 (zěnmeyàng) asks "how is it?" or "what do you think?"',
      pattern: '怎么 + verb?',
      examples: [
        { chinese: '这个字怎么读？', pinyin: 'Zhège zì zěnme dú?', english: 'How do you read this character?' },
        { chinese: '这个字怎么写？', pinyin: 'Zhège zì zěnme xiě?', english: 'How do you write this character?' },
      ],
    },
  ],
  characters: [
    { character: '会', wordPinyin: 'huì', strokeCount: 6, componentsExplanation: '亼 (gather) + 云 (cloud) — to understand/know how' },
    { character: '说', wordPinyin: 'shuō', strokeCount: 9, componentsExplanation: '言 (speech) + 兑 (exchange) — to speak' },
    { character: '写', wordPinyin: 'xiě', strokeCount: 5, componentsExplanation: '冖 (cover) + 与 (give) — to write' },
    { character: '字', wordPinyin: 'zì', strokeCount: 6, componentsExplanation: '宀 (roof) + 子 (child) — written character' },
    { character: '读', wordPinyin: 'dú', strokeCount: 10, componentsExplanation: '言 (speech) + 卖 (sell) — to read aloud' },
  ],
}
