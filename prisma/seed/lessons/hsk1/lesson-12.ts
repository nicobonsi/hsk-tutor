import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 12,
  title: '天气怎么样',
  titlePinyin: 'Tiānqì zěnmeyàng',
  subtitle: 'What\'s the Weather Like?',
  objectives: [
    'Ask about the weather',
    'Describe weather conditions',
    'Use 太...了 for "too"',
    'Give health-related greetings',
  ],
  vocabulary: ['tiānqì', 'zěnmeyàng', 'tài', 'rè', 'lěng', 'xià yǔ', 'xiǎojie', 'lái', 'shēntǐ', 'ài', 'xiē', 'shuǐguǒ', 'shuǐ'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '谈天气 Talking about weather',
      turns: [
        { speaker: '大卫', chinese: '今天天气怎么样？', pinyin: 'Jīntiān tiānqì zěnmeyàng?', english: 'What is the weather like today?' },
        { speaker: '玛丽', chinese: '太热了！', pinyin: 'Tài rè le!', english: 'It\'s too hot!' },
        { speaker: '大卫', chinese: '昨天呢？', pinyin: 'Zuótiān ne?', english: 'What about yesterday?' },
        { speaker: '玛丽', chinese: '昨天下雨，也很冷。', pinyin: 'Zuótiān xià yǔ, yě hěn lěng.', english: 'It rained yesterday and was also very cold.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '问候身体 Health greeting',
      turns: [
        { speaker: '大卫', chinese: '小姐，您来了！身体怎么样？', pinyin: 'Xiǎojiě, nín lái le! Shēntǐ zěnmeyàng?', english: 'Miss, you\'re here! How is your health?' },
        { speaker: '玛丽', chinese: '还好。我爱吃这些水果，多谢你。', pinyin: 'Hái hǎo. Wǒ ài chī zhèxiē shuǐguǒ, duō xiè nǐ.', english: 'Not bad. I love eating these fruits, thank you very much.' },
        { speaker: '大卫', chinese: '多喝水，身体好！', pinyin: 'Duō hē shuǐ, shēntǐ hǎo!', english: 'Drink more water, stay healthy!' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '怎么样 — how is it? (asking quality)',
      explanation: '怎么样 (zěnmeyàng) asks "how is/are [subject]?" to inquire about quality, condition, or status. Broader than 怎么 which asks "how (to do)".',
      pattern: 'Subject + 怎么样？',
      examples: [
        { chinese: '天气怎么样？', pinyin: 'Tiānqì zěnmeyàng?', english: 'How is the weather?' },
        { chinese: '你身体怎么样？', pinyin: 'Nǐ shēntǐ zěnmeyàng?', english: 'How is your health?' },
        { chinese: '这个菜怎么样？', pinyin: 'Zhège cài zěnmeyàng?', english: 'How is this dish?' },
      ],
    },
    {
      title: '太...了 — too / excessively',
      explanation: '太 (tài) + adjective + 了 means "too [adjective]" or "so [adjective]!". The 了 is required at the end of the sentence.',
      pattern: '太 + adjective + 了',
      examples: [
        { chinese: '太热了！', pinyin: 'Tài rè le!', english: 'It\'s too hot!' },
        { chinese: '太好了！', pinyin: 'Tài hǎo le!', english: 'That\'s great! / Too good!' },
        { chinese: '太贵了。', pinyin: 'Tài guì le.', english: 'It\'s too expensive.' },
      ],
    },
    {
      title: '下雨 — action verbs for weather',
      explanation: 'Weather is expressed with verb phrases: 下雨 (xià yǔ, to rain), 下雪 (xià xuě, to snow), 刮风 (guā fēng, to be windy). These are verb-object compounds.',
      pattern: '今天/明天 + weather verb',
      examples: [
        { chinese: '今天下雨。', pinyin: 'Jīntiān xià yǔ.', english: 'It is raining today.' },
        { chinese: '明天下雪吗？', pinyin: 'Míngtiān xià xuě ma?', english: 'Will it snow tomorrow?' },
      ],
    },
  ],
  characters: [
    { character: '天', strokeCount: 4, componentsExplanation: '大 (big) + 一 (one) — sky, heaven' },
    { character: '气', wordPinyin: 'tiānqì', strokeCount: 4, componentsExplanation: 'Steam rising — air, breath, weather' },
    { character: '热', wordPinyin: 'rè', strokeCount: 10, componentsExplanation: '执 (hold) + 灬 (fire) — hot' },
    { character: '冷', wordPinyin: 'lěng', strokeCount: 7, componentsExplanation: '冫(ice) + 令 (command) — cold' },
    { character: '雨', wordPinyin: 'xià yǔ', strokeCount: 8, componentsExplanation: 'Pictograph of rain falling from clouds' },
    { character: '水', wordPinyin: 'shuǐ', strokeCount: 4, componentsExplanation: 'Pictograph of flowing water' },
  ],
}
