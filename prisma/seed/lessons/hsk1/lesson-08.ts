import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 8,
  title: '你要什么',
  titlePinyin: 'Nǐ yào shénme',
  subtitle: 'What Would You Like?',
  objectives: [
    'Order food and drinks',
    'Ask prices and quantities',
    'Use measure words (量词)',
    'Handle simple transactions',
  ],
  vocabulary: ['bēizi', 'duōshao', 'gè', 'hē', 'mǎi', 'mǐfàn', 'nà', 'shāngdiàn', 'xiàwǔ', 'xiǎng', 'zhè', 'kuài', 'qián', 'chá', 'chī'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '在商店 At the shop',
      turns: [
        { speaker: '店员', chinese: '你要什么？', pinyin: 'Nǐ yào shénme?', english: 'What would you like?' },
        { speaker: '大卫', chinese: '我想买这个杯子，多少钱？', pinyin: 'Wǒ xiǎng mǎi zhège bēizi, duōshao qián?', english: 'I want to buy this cup. How much is it?' },
        { speaker: '店员', chinese: '那个二十块，这个十块。', pinyin: 'Nàge èrshí kuài, zhège shí kuài.', english: 'That one is 20 yuan, this one is 10 yuan.' },
        { speaker: '大卫', chinese: '我要这个。', pinyin: 'Wǒ yào zhège.', english: 'I\'ll take this one.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '点餐 Ordering food',
      turns: [
        { speaker: '服务员', chinese: '你们想吃什么？', pinyin: 'Nǐmen xiǎng chī shénme?', english: 'What would you like to eat?' },
        { speaker: '玛丽', chinese: '我要米饭和茶。', pinyin: 'Wǒ yào mǐfàn hé chá.', english: 'I\'d like rice and tea.' },
        { speaker: '大卫', chinese: '下午我去商店喝茶，你去吗？', pinyin: 'Xiàwǔ wǒ qù shāngdiàn hē chá, nǐ qù ma?', english: 'I\'m going to the shop this afternoon for tea, will you come?' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '这 / 那 — this / that',
      explanation: '这 (zhè) means "this" (near the speaker). 那 (nà) means "that" (far from speaker). Add 个 or another measure word after: 这个、那个.',
      pattern: '这/那 + measure word + noun',
      examples: [
        { chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?', english: 'How much is this one?' },
        { chinese: '那个杯子很好。', pinyin: 'Nàge bēizi hěn hǎo.', english: 'That cup is very nice.' },
      ],
    },
    {
      title: '个 — general measure word',
      explanation: '个 (gè) is the most common measure word in Chinese. Used with people and many objects when no specific measure word exists.',
      pattern: 'number + 个 + noun',
      examples: [
        { chinese: '一个人', pinyin: 'yī gè rén', english: 'one person' },
        { chinese: '两个苹果', pinyin: 'liǎng gè píngguǒ', english: 'two apples' },
        { chinese: '三个杯子', pinyin: 'sān gè bēizi', english: 'three cups' },
      ],
    },
    {
      title: '块 / 元 — yuan (currency)',
      explanation: '块 (kuài) is the spoken form of the currency unit 元 (yuán). 毛 (máo) = 0.1 yuan; 分 (fēn) = 0.01 yuan. Prices: 十块 = 10 yuan.',
      pattern: 'number + 块(钱)',
      examples: [
        { chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?', english: 'How much is this?' },
        { chinese: '五块钱。', pinyin: 'Wǔ kuài qián.', english: 'Five yuan.' },
        { chinese: '二十块五毛。', pinyin: 'Èrshí kuài wǔ máo.', english: '20 yuan 50 cents.' },
      ],
    },
  ],
  characters: [
    { character: '买', wordPinyin: 'mǎi', strokeCount: 6, componentsExplanation: '乙 (second) + 头 (head) — to buy' },
    { character: '这', wordPinyin: 'zhè', strokeCount: 7, componentsExplanation: '文 (culture) + 辶 (walk) — this' },
    { character: '那', wordPinyin: 'nà', strokeCount: 6, componentsExplanation: '冄 + 阝 (mound) — that' },
    { character: '米', strokeCount: 6, componentsExplanation: 'A rice plant with grains on both sides — rice' },
    { character: '饭', wordPinyin: 'mǐfàn', strokeCount: 7, componentsExplanation: '饣(food) + 反 (reverse) — cooked rice/meal' },
    { character: '茶', wordPinyin: 'chá', strokeCount: 9, componentsExplanation: '艹 (grass) + 人 (person) + 木 (tree) — tea plant' },
    { character: '钱', wordPinyin: 'qián', strokeCount: 10, componentsExplanation: '钅(metal) + 戋 (small) — money' },
  ],
}
