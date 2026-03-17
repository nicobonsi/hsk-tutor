import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 1,
  title: '你好',
  titlePinyin: 'Nǐ hǎo',
  subtitle: 'Hello',
  objectives: [
    'Greet someone in Chinese',
    'Respond to a greeting',
    'Use polite forms of address',
  ],
  vocabulary: ['nǐ hǎo', 'nǐ', 'hǎo', 'nín', 'duìbuqǐ', 'méi guānxi'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '打招呼 Greeting',
      turns: [
        { speaker: '大卫', chinese: '你好！', pinyin: 'Nǐ hǎo!', english: 'Hello!' },
        { speaker: '玛丽', chinese: '你好！', pinyin: 'Nǐ hǎo!', english: 'Hello!' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '道歉 Apology',
      turns: [
        { speaker: '大卫', chinese: '对不起。', pinyin: 'Duìbuqǐ.', english: 'I\'m sorry.' },
        { speaker: '玛丽', chinese: '没关系。', pinyin: 'Méi guānxi.', english: 'It\'s okay. / No problem.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '你好 as a greeting',
      explanation: '你好 (Nǐ hǎo) literally means "You good" but functions as the standard Chinese greeting "Hello". It can be used at any time of day with anyone.',
      pattern: '你好',
      examples: [
        { chinese: '你好！', pinyin: 'Nǐ hǎo!', english: 'Hello!' },
        { chinese: '老师好！', pinyin: 'Lǎoshī hǎo!', english: 'Hello, teacher!' },
      ],
    },
    {
      title: '您 — polite "you"',
      explanation: '您 (nín) is the polite/respectful form of 你 (nǐ). Use 您 when speaking to elders, strangers, or people of higher status.',
      pattern: '您好',
      examples: [
        { chinese: '您好！', pinyin: 'Nín hǎo!', english: 'Hello! (polite)' },
        { chinese: '您贵姓？', pinyin: 'Nín guì xìng?', english: 'What is your honorable surname?' },
      ],
    },
    {
      title: '对不起 / 没关系 — Sorry / No problem',
      explanation: '对不起 (duìbuqǐ) is used to apologize. 没关系 (méi guānxi) is the standard response meaning "it\'s fine" or "no problem".',
      pattern: 'A: 对不起。 B: 没关系。',
      examples: [
        { chinese: '对不起，我来晚了。', pinyin: 'Duìbuqǐ, wǒ lái wǎn le.', english: 'Sorry, I\'m late.' },
        { chinese: '没关系，没关系。', pinyin: 'Méi guānxi, méi guānxi.', english: 'It\'s fine, it\'s fine.' },
      ],
    },
  ],
  pinyinDrills: [
    {
      type: 'tone',
      order: 1,
      content: [
        {
          symbol: 'ā á ǎ à',
          examples: [
            { pinyin: 'māo', character: '猫', meaning: 'cat' },
            { pinyin: 'máo', character: '毛', meaning: 'hair/fur' },
            { pinyin: 'mǎo', character: '卯', meaning: 'the 4th earthly branch' },
            { pinyin: 'mào', character: '帽', meaning: 'hat' },
          ],
        },
      ],
    },
    {
      type: 'initial',
      order: 2,
      content: [
        {
          symbol: 'b',
          examples: [
            { pinyin: 'bā', character: '八', meaning: 'eight' },
            { pinyin: 'bái', character: '白', meaning: 'white' },
          ],
        },
        {
          symbol: 'p',
          examples: [
            { pinyin: 'pá', character: '爬', meaning: 'to climb' },
            { pinyin: 'pǔ', character: '普', meaning: 'common' },
          ],
        },
        {
          symbol: 'm',
          examples: [
            { pinyin: 'māo', character: '猫', meaning: 'cat' },
            { pinyin: 'mǎ', character: '马', meaning: 'horse' },
          ],
        },
        {
          symbol: 'f',
          examples: [
            { pinyin: 'fēi', character: '飞', meaning: 'to fly' },
            { pinyin: 'fàn', character: '饭', meaning: 'rice/meal' },
          ],
        },
      ],
    },
  ],
  characters: [
    { character: '你', wordPinyin: 'nǐ', strokeCount: 7, componentsExplanation: '亻(person) + 尔 (phonetic)' },
    { character: '好', wordPinyin: 'hǎo', strokeCount: 6, componentsExplanation: '女 (woman) + 子 (child) — together they mean "good"' },
    { character: '您', wordPinyin: 'nín', strokeCount: 11, componentsExplanation: '你 (you) + 心 (heart) — polite "you"' },
  ],
}
