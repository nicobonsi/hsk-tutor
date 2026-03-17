import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 14,
  title: '你的衣服真漂亮',
  titlePinyin: 'Nǐ de yīfu zhēn piàoliang',
  subtitle: 'Your Clothes Are Really Beautiful',
  objectives: [
    'Give and receive compliments',
    'Talk about shopping for clothes',
    'Use 真 (zhēn) for emphasis',
    'Use 都 (dōu) for "all/both"',
  ],
  vocabulary: ['dōngxi', 'yīdiǎnr', 'píngguǒ', 'kànjiàn', 'xiānsheng', 'kāi', 'chē', 'huí lái', 'fēnzhōng', 'hòu', 'yīfu', 'piàoliang', 'a', 'shǎo', 'zhèxiē', 'dōu'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '买苹果 Buying apples',
      turns: [
        { speaker: '大卫', chinese: '先生，这些苹果多少钱？', pinyin: 'Xiānsheng, zhèxiē píngguǒ duōshao qián?', english: 'Sir, how much are these apples?' },
        { speaker: '店主', chinese: '一块五一个。你要几个？', pinyin: 'Yī kuài wǔ yī gè. Nǐ yào jǐ gè?', english: 'One yuan fifty each. How many would you like?' },
        { speaker: '大卫', chinese: '这些都要。东西少一点儿，便宜一点儿吧。', pinyin: 'Zhèxiē dōu yào. Dōngxi shǎo yīdiǎnr, piányí yīdiǎnr ba.', english: 'I\'ll take all of these. A bit less stuff, a bit cheaper please.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '称赞衣服 Complimenting clothes',
      turns: [
        { speaker: '玛丽', chinese: '你的衣服真漂亮啊！', pinyin: 'Nǐ de yīfu zhēn piàoliang a!', english: 'Your clothes are really beautiful!' },
        { speaker: '大卫', chinese: '谢谢。我开车回来的时候看见了，就买了。', pinyin: 'Xièxie. Wǒ kāichē huí lái de shíhou kànjiàn le, jiù mǎi le.', english: 'Thank you. I saw them when I was driving back and just bought them.' },
        { speaker: '玛丽', chinese: '在哪儿买的？离这儿多少分钟？', pinyin: 'Zài nǎr mǎi de? Lí zhèr duōshao fēnzhōng?', english: 'Where did you buy them? How many minutes from here?' },
        { speaker: '大卫', chinese: '就在后面的商店，走路十分钟。', pinyin: 'Jiù zài hòumiàn de shāngdiàn, zǒulù shí fēnzhōng.', english: 'Just at the shop behind here, ten minutes on foot.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '真 — really / truly (emphatic)',
      explanation: '真 (zhēn) means "really" or "truly". Used before adjectives to add emphasis: 真漂亮 = "really beautiful". Stronger than 很 (hěn, very).',
      pattern: '真 + adjective + (啊)',
      examples: [
        { chinese: '你的衣服真漂亮！', pinyin: 'Nǐ de yīfu zhēn piàoliang!', english: 'Your clothes are really beautiful!' },
        { chinese: '这个菜真好吃！', pinyin: 'Zhège cài zhēn hǎochī!', english: 'This dish is really delicious!' },
      ],
    },
    {
      title: '都 — all / both',
      explanation: '都 (dōu) means "all" or "both". It always comes before the verb. The noun it refers to comes before 都.',
      pattern: 'Plural subject + 都 + verb',
      examples: [
        { chinese: '我们都是学生。', pinyin: 'Wǒmen dōu shì xuésheng.', english: 'We are all students.' },
        { chinese: '这些我都要。', pinyin: 'Zhèxiē wǒ dōu yào.', english: 'I want all of these.' },
        { chinese: '他们都来了。', pinyin: 'Tāmen dōu lái le.', english: 'They all came.' },
      ],
    },
    {
      title: '一点儿 — a little bit',
      explanation: '一点儿 (yīdiǎnr) means "a little" or "a bit". Used after verbs/adjectives: 多一点儿 (a bit more), 便宜一点儿 (a bit cheaper). 一 can be omitted in speech.',
      pattern: 'Adjective/verb + 一点儿',
      examples: [
        { chinese: '便宜一点儿吧。', pinyin: 'Piányí yīdiǎnr ba.', english: 'A little cheaper, please.' },
        { chinese: '我会说一点儿汉语。', pinyin: 'Wǒ huì shuō yīdiǎnr Hànyǔ.', english: 'I can speak a little Chinese.' },
      ],
    },
  ],
  characters: [
    { character: '衣', wordPinyin: 'yīfu', strokeCount: 6, componentsExplanation: 'Pictograph of a garment — clothing' },
    { character: '服', strokeCount: 8, componentsExplanation: '月 (flesh/body) + 服 (kneel) — to serve; clothing' },
    { character: '漂', wordPinyin: 'piàoliang', strokeCount: 14, componentsExplanation: '氵(water) + 票 (ticket) — to float; beautiful' },
    { character: '亮', strokeCount: 9, componentsExplanation: '高 (tall) + 几 (small table) — bright, beautiful' },
    { character: '都', wordPinyin: 'dōu', strokeCount: 10, componentsExplanation: '者 (one who) + 阝(city) — capital; all' },
    { character: '苹', wordPinyin: 'píngguǒ', strokeCount: 8, componentsExplanation: '艹 (grass) + 平 (flat) — apple (top part)' },
    { character: '果', strokeCount: 8, componentsExplanation: '田 (field) + 木 (tree) — fruit; result' },
  ],
}
