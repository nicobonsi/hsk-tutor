import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 7,
  title: '你去哪儿',
  titlePinyin: 'Nǐ qù nǎr',
  subtitle: 'Where Are You Going?',
  objectives: [
    'Ask and say where someone is going',
    'Use time words for days and dates',
    'Make plans and invitations',
    'Express dates and days of the week',
  ],
  vocabulary: ['jīntiān', 'kàn', 'míngtiān', 'qǐng', 'qù', 'shū', 'xīngqī', 'xuéxiào', 'yuè', 'zuótiān', 'hào'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '邀请去学校 Invitation to school',
      turns: [
        { speaker: '大卫', chinese: '你去哪儿？', pinyin: 'Nǐ qù nǎr?', english: 'Where are you going?' },
        { speaker: '玛丽', chinese: '我去学校。今天星期几？', pinyin: 'Wǒ qù xuéxiào. Jīntiān xīngqī jǐ?', english: 'I\'m going to school. What day of the week is it today?' },
        { speaker: '大卫', chinese: '今天星期一。', pinyin: 'Jīntiān xīngqī yī.', english: 'Today is Monday.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '看书的邀请 Invitation to read',
      turns: [
        { speaker: '老师', chinese: '明天几号？', pinyin: 'Míngtiān jǐ hào?', english: 'What is the date tomorrow?' },
        { speaker: '大卫', chinese: '明天八月十五号。', pinyin: 'Míngtiān bā yuè shíwǔ hào.', english: 'Tomorrow is August 15th.' },
        { speaker: '老师', chinese: '我们去图书馆看书，好吗？', pinyin: 'Wǒmen qù túshūguǎn kàn shū, hǎo ma?', english: 'Let\'s go to the library to read, OK?' },
        { speaker: '大卫', chinese: '好，昨天我也想去。', pinyin: 'Hǎo, zuótiān wǒ yě xiǎng qù.', english: 'OK, I wanted to go yesterday too.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '星期 — days of the week',
      explanation: 'Days of the week: 星期一 (Monday) through 星期六 (Saturday), 星期日/天 (Sunday). Ask "what day?" with 星期几？',
      pattern: '今天星期几？ / 今天星期＿＿。',
      examples: [
        { chinese: '今天星期几？', pinyin: 'Jīntiān xīngqī jǐ?', english: 'What day is today?' },
        { chinese: '今天星期三。', pinyin: 'Jīntiān xīngqī sān.', english: 'Today is Wednesday.' },
        { chinese: '明天星期天。', pinyin: 'Míngtiān xīngqītiān.', english: 'Tomorrow is Sunday.' },
      ],
    },
    {
      title: '几号 — asking the date',
      explanation: 'To ask the date: 几号 (jǐ hào)? The format is: year + 年, month + 月, date + 号/日.',
      pattern: '今天几号？/ 今天＿＿月＿＿号。',
      examples: [
        { chinese: '今天几号？', pinyin: 'Jīntiān jǐ hào?', english: 'What is today\'s date?' },
        { chinese: '今天三月二十号。', pinyin: 'Jīntiān sān yuè èrshí hào.', english: 'Today is March 20th.' },
      ],
    },
    {
      title: '请 — please / to invite',
      explanation: '请 (qǐng) has two uses: (1) a polite word meaning "please", placed before the verb; (2) to invite someone to do something.',
      pattern: '请 + verb / 请你 + verb',
      examples: [
        { chinese: '请坐。', pinyin: 'Qǐng zuò.', english: 'Please sit down.' },
        { chinese: '我请你去看电影。', pinyin: 'Wǒ qǐng nǐ qù kàn diànyǐng.', english: 'I\'ll treat you to a movie.' },
      ],
    },
  ],
  characters: [
    { character: '去', wordPinyin: 'qù', strokeCount: 5, componentsExplanation: '土 (earth) + 厶 — to go (away from the earth)' },
    { character: '今', strokeCount: 4, componentsExplanation: '亼 (gather) + 下 (down) — now, today' },
    { character: '天', strokeCount: 4, componentsExplanation: '大 (big) + 一 (one) — sky, heaven, day' },
    { character: '明', strokeCount: 8, componentsExplanation: '日 (sun) + 月 (moon) — bright, tomorrow' },
    { character: '学', wordPinyin: 'xuéxiào', strokeCount: 8, componentsExplanation: '爻 (learning) + 冖 (cover) + 子 (child) — to study' },
    { character: '校', strokeCount: 10, componentsExplanation: '木 (wood) + 交 (cross) — school' },
  ],
}
