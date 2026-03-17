import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 11,
  title: '现在几点',
  titlePinyin: 'Xiànzài jǐ diǎn',
  subtitle: 'What Time Is It?',
  objectives: [
    'Tell and ask the time',
    'Talk about daily routines',
    'Use time as a topic (topic-comment structure)',
    'Say when you do things',
  ],
  vocabulary: ['xiànzài', 'diǎn', 'fēn', 'zhōngwǔ', 'chīfàn', 'shíhou', 'huí', 'wǒmen', 'diànyǐng', 'zhù', 'qián'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '问时间 Asking the time',
      turns: [
        { speaker: '玛丽', chinese: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', english: 'What time is it now?' },
        { speaker: '大卫', chinese: '现在十二点十分。', pinyin: 'Xiànzài shí èr diǎn shí fēn.', english: 'It\'s 12:10 now.' },
        { speaker: '玛丽', chinese: '快中午了，我们去吃饭吧。', pinyin: 'Kuài zhōngwǔ le, wǒmen qù chīfàn ba.', english: 'It\'s almost noon, let\'s go eat.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '看电影 Watching a movie',
      turns: [
        { speaker: '大卫', chinese: '电影几点开始？', pinyin: 'Diànyǐng jǐ diǎn kāishǐ?', english: 'What time does the movie start?' },
        { speaker: '玛丽', chinese: '三点半。现在两点，我们什么时候去？', pinyin: 'Sān diǎn bàn. Xiànzài liǎng diǎn, wǒmen shénme shíhou qù?', english: 'Half past three. It\'s two now, when should we go?' },
        { speaker: '大卫', chinese: '我们三点回来，然后一起去。', pinyin: 'Wǒmen sān diǎn huí lái, rán hòu yīqǐ qù.', english: 'We\'ll come back at three, then go together.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: 'Telling time in Chinese',
      explanation: 'Time: ＿点 (diǎn) = o\'clock, ＿分 (fēn) = minutes. Half hour: 半 (bàn). Quarter: 一刻 (yī kè). Common times: 三点 (3:00), 三点半 (3:30), 三点一刻 (3:15).',
      pattern: '＿点＿分',
      examples: [
        { chinese: '现在八点三十分。', pinyin: 'Xiànzài bā diǎn sānshí fēn.', english: 'It is 8:30 now.' },
        { chinese: '上午十点一刻。', pinyin: 'Shàngwǔ shí diǎn yī kè.', english: '10:15 AM.' },
        { chinese: '下午两点半。', pinyin: 'Xiàwǔ liǎng diǎn bàn.', english: '2:30 PM.' },
      ],
    },
    {
      title: '什么时候 — when (asking time)',
      explanation: '什么时候 (shénme shíhou) means "when?" Used to ask at what point something happens.',
      pattern: '什么时候 + verb?',
      examples: [
        { chinese: '你什么时候回来？', pinyin: 'Nǐ shénme shíhou huí lái?', english: 'When are you coming back?' },
        { chinese: '你什么时候吃饭？', pinyin: 'Nǐ shénme shíhou chīfàn?', english: 'When do you eat?' },
      ],
    },
    {
      title: 'Time before verb (word order)',
      explanation: 'In Chinese, time expressions come before the verb (unlike English where they can come after). The word order is: Subject + Time + Verb + Object.',
      pattern: 'Subject + time + verb + object',
      examples: [
        { chinese: '我每天八点吃早饭。', pinyin: 'Wǒ měitiān bā diǎn chī zǎofàn.', english: 'I eat breakfast at 8 every day.' },
        { chinese: '他明天去北京。', pinyin: 'Tā míngtiān qù Běijīng.', english: 'He is going to Beijing tomorrow.' },
      ],
    },
  ],
  characters: [
    { character: '现', strokeCount: 8, componentsExplanation: '王 (king) + 见 (see) — present, now' },
    { character: '点', wordPinyin: 'diǎn', strokeCount: 9, componentsExplanation: '占 (occupy) + 灬 (fire) — dot; o\'clock' },
    { character: '分', wordPinyin: 'fēn', strokeCount: 4, componentsExplanation: '八 (eight, divide) + 刀 (knife) — to divide; minute' },
    { character: '回', wordPinyin: 'huí', strokeCount: 6, componentsExplanation: 'Enclosure within enclosure — to return' },
    { character: '影', wordPinyin: 'diànyǐng', strokeCount: 15, componentsExplanation: '景 (scenery) + 彡 (rays) — shadow; film' },
  ],
}
