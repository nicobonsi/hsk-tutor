import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 15,
  title: '我认识她',
  titlePinyin: 'Wǒ rènshi tā',
  subtitle: 'I Know Her',
  objectives: [
    'Talk about how you know someone',
    'Describe travel and transportation',
    'Express happy occasions',
    'Review and consolidate HSK1 vocabulary',
  ],
  vocabulary: ['rènshi', 'nián', 'dàxué', 'fàndiàn', 'chūzūchē', 'yīqǐ', 'gāoxìng', 'tīng', 'fēijī'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '认识朋友 Meeting a friend',
      turns: [
        { speaker: '大卫', chinese: '你认识她吗？', pinyin: 'Nǐ rènshi tā ma?', english: 'Do you know her?' },
        { speaker: '玛丽', chinese: '认识！我们一起在大学学习过。', pinyin: 'Rènshi! Wǒmen yīqǐ zài dàxué xuéxí guò.', english: 'Yes! We studied together at university.' },
        { speaker: '大卫', chinese: '真的吗？你们认识几年了？', pinyin: 'Zhēn de ma? Nǐmen rènshi jǐ nián le?', english: 'Really? How many years have you known each other?' },
        { speaker: '玛丽', chinese: '认识五年了。', pinyin: 'Rènshi wǔ nián le.', english: 'We\'ve known each other for five years.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '去机场 Going to the airport',
      turns: [
        { speaker: '玛丽', chinese: '我们去饭店，还是去机场？', pinyin: 'Wǒmen qù fàndiàn, háishi qù jīchǎng?', english: 'Are we going to the restaurant or the airport?' },
        { speaker: '大卫', chinese: '先去饭店，一起吃饭，然后我送你去机场。', pinyin: 'Xiān qù fàndiàn, yīqǐ chīfàn, rán hòu wǒ sòng nǐ qù jīchǎng.', english: 'Go to the restaurant first, eat together, then I\'ll take you to the airport.' },
        { speaker: '玛丽', chinese: '坐出租车去吗？', pinyin: 'Zuò chūzūchē qù ma?', english: 'Are we going by taxi?' },
        { speaker: '大卫', chinese: '对，出租车很快。认识你真高兴！', pinyin: 'Duì, chūzūchē hěn kuài. Rènshi nǐ zhēn gāoxìng!', english: 'Yes, taxis are fast. I\'m really happy to know you!' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '认识 — to know (a person)',
      explanation: '认识 (rènshi) means "to know" a person or "to recognize". Different from 知道 (zhīdào), which means "to know" a fact.',
      pattern: '认识 + person',
      examples: [
        { chinese: '我认识她。', pinyin: 'Wǒ rènshi tā.', english: 'I know her.' },
        { chinese: '很高兴认识你！', pinyin: 'Hěn gāoxìng rènshi nǐ!', english: 'Nice to meet you! (lit. Very happy to know you)' },
        { chinese: '我不认识他。', pinyin: 'Wǒ bù rènshi tā.', english: 'I don\'t know him.' },
      ],
    },
    {
      title: '还是 — or (in questions)',
      explanation: '还是 (háishi) means "or" in questions asking for a choice between alternatives. Different from 或者 (huòzhě), which is used in statements.',
      pattern: 'A + 还是 + B?',
      examples: [
        { chinese: '你喝茶还是喝咖啡？', pinyin: 'Nǐ hē chá háishi hē kāfēi?', english: 'Do you drink tea or coffee?' },
        { chinese: '你去还是不去？', pinyin: 'Nǐ qù háishi bú qù?', english: 'Are you going or not?' },
      ],
    },
    {
      title: '高兴 — happy / glad',
      explanation: '高兴 (gāoxìng) means "happy", "glad", or "pleased". Often used in greetings: 很高兴认识你 (nice to meet you). Also: 不高兴 = unhappy.',
      pattern: '很高兴 + verb / 高兴地 + verb',
      examples: [
        { chinese: '认识你很高兴！', pinyin: 'Rènshi nǐ hěn gāoxìng!', english: 'Nice to meet you!' },
        { chinese: '我很高兴来这里。', pinyin: 'Wǒ hěn gāoxìng lái zhèlǐ.', english: 'I\'m very glad to come here.' },
      ],
    },
  ],
  characters: [
    { character: '认', wordPinyin: 'rènshi', strokeCount: 4, componentsExplanation: '言 (speech) + 忍 (endure) — to recognize; to know' },
    { character: '识', strokeCount: 7, componentsExplanation: '言 (speech) + 只 (only) — to know; knowledge' },
    { character: '飞', wordPinyin: 'fēijī', strokeCount: 3, componentsExplanation: 'Pictograph of a bird spreading wings — to fly' },
    { character: '机', strokeCount: 6, componentsExplanation: '木 (wood) + 几 (small table) — machine; airplane' },
    { character: '高', wordPinyin: 'gāoxìng', strokeCount: 10, componentsExplanation: 'Pictograph of a tall tower — tall; high' },
    { character: '兴', strokeCount: 6, componentsExplanation: '舁 (lift together) — excitement; interest' },
    { character: '年', wordPinyin: 'nián', strokeCount: 6, componentsExplanation: '禾 (grain) + 千 (thousand) — year (harvest cycle)' },
  ],
  cultureNote: {
    title: '中国交通文化 Getting Around in China',
    content: 'China has one of the world\'s most developed transportation networks. High-speed trains (高铁 gāotiě) connect major cities at speeds up to 350 km/h. Taxis (出租车 chūzūchē) and ride-hailing apps like DiDi (滴滴) are ubiquitous in cities. Airports (机场 jīchǎng) serve all major cities, with Beijing Capital, Shanghai Pudong, and Guangzhou Baiyun among the world\'s busiest. When meeting new people in China, it is common to exchange WeChat (微信 Wēixìn) contacts rather than business cards — the digital equivalent of "nice to meet you".',
  },
}
