import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 2,
  title: '谢谢',
  titlePinyin: 'Xièxie',
  subtitle: 'Thank You',
  objectives: [
    'Express gratitude in Chinese',
    'Respond to thanks politely',
    'Say goodbye',
  ],
  vocabulary: ['xièxie', 'bú kèqi', 'zàijiàn'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '感谢 Expressing thanks',
      turns: [
        { speaker: '大卫', chinese: '谢谢你！', pinyin: 'Xièxie nǐ!', english: 'Thank you!' },
        { speaker: '玛丽', chinese: '不客气。', pinyin: 'Bú kèqi.', english: 'You\'re welcome.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '告别 Saying goodbye',
      turns: [
        { speaker: '大卫', chinese: '再见！', pinyin: 'Zàijiàn!', english: 'Goodbye!' },
        { speaker: '玛丽', chinese: '再见！', pinyin: 'Zàijiàn!', english: 'Goodbye!' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '谢谢 — Thank you',
      explanation: '谢谢 (xièxie) is the most common way to say "thank you". You can add 你 (nǐ) or 您 (nín) after it to make it more personal: 谢谢你 / 谢谢您.',
      pattern: '谢谢(你/您)',
      examples: [
        { chinese: '谢谢你的帮助。', pinyin: 'Xièxie nǐ de bāngzhù.', english: 'Thank you for your help.' },
        { chinese: '非常谢谢您。', pinyin: 'Fēicháng xièxie nín.', english: 'Thank you very much.' },
      ],
    },
    {
      title: '不客气 — You\'re welcome',
      explanation: '不客气 (bú kèqi) literally means "no need to be polite". It is the standard response to 谢谢. You can also say 不用谢 (bùyòng xiè) — "no need to thank".',
      pattern: 'A: 谢谢！B: 不客气。',
      examples: [
        { chinese: '不客气，这是我应该做的。', pinyin: 'Bú kèqi, zhè shì wǒ yīnggāi zuò de.', english: 'You\'re welcome, it\'s what I should do.' },
      ],
    },
    {
      title: '再见 — Goodbye',
      explanation: '再见 (zàijiàn) means "see you again". It is the standard way to say goodbye. 再 means "again" and 见 means "to see/meet".',
      pattern: '再见！',
      examples: [
        { chinese: '明天见！', pinyin: 'Míngtiān jiàn!', english: 'See you tomorrow!' },
        { chinese: '拜拜！', pinyin: 'Báibái!', english: 'Bye-bye! (informal)' },
      ],
    },
  ],
  pinyinDrills: [
    {
      type: 'initial',
      order: 1,
      content: [
        {
          symbol: 'd',
          examples: [
            { pinyin: 'dà', character: '大', meaning: 'big' },
            { pinyin: 'diǎn', character: '点', meaning: 'o\'clock / a bit' },
          ],
        },
        {
          symbol: 't',
          examples: [
            { pinyin: 'tā', character: '他', meaning: 'he' },
            { pinyin: 'tiān', character: '天', meaning: 'sky / day' },
          ],
        },
        {
          symbol: 'n',
          examples: [
            { pinyin: 'nǐ', character: '你', meaning: 'you' },
            { pinyin: 'nǚ', character: '女', meaning: 'woman' },
          ],
        },
        {
          symbol: 'l',
          examples: [
            { pinyin: 'lǎo', character: '老', meaning: 'old' },
            { pinyin: 'lái', character: '来', meaning: 'to come' },
          ],
        },
      ],
    },
  ],
  characters: [
    { character: '谢', wordPinyin: 'xièxie', strokeCount: 17, componentsExplanation: '言 (speech) + 身 (body) + 寸 (measure) — expressing through words' },
    { character: '再', wordPinyin: 'zàijiàn', strokeCount: 6, componentsExplanation: 'Top stroke + 冉 — meaning "again"' },
    { character: '见', wordPinyin: 'zàijiàn', strokeCount: 4, componentsExplanation: '目 (eye) + 儿 — to see' },
  ],
}
