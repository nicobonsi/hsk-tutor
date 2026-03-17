import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 5,
  title: '她女儿几岁',
  titlePinyin: 'Tā nǚér jǐ suì',
  subtitle: 'How Old Is Her Daughter?',
  objectives: [
    'Ask and state ages',
    'Talk about family members',
    'Count numbers 1–10',
    'Use 几 (jǐ) for small numbers',
  ],
  vocabulary: ['le', 'duō', 'jiā', 'jǐ', 'nǚér', 'suì', 'yǒu', 'dà', 'yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ', 'shí'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '问年龄 Asking age',
      turns: [
        { speaker: '玛丽', chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people are in your family?' },
        { speaker: '大卫', chinese: '我家有三口人。', pinyin: 'Wǒ jiā yǒu sān kǒu rén.', english: 'There are three people in my family.' },
        { speaker: '玛丽', chinese: '你有女儿吗？', pinyin: 'Nǐ yǒu nǚér ma?', english: 'Do you have a daughter?' },
        { speaker: '大卫', chinese: '有，她五岁了。', pinyin: 'Yǒu, tā wǔ suì le.', english: 'Yes, she is five years old.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '问年纪 Asking how old',
      turns: [
        { speaker: '老师', chinese: '她女儿几岁？', pinyin: 'Tā nǚér jǐ suì?', english: 'How old is her daughter?' },
        { speaker: '同学', chinese: '她女儿八岁了。', pinyin: 'Tā nǚér bā suì le.', english: 'Her daughter is eight years old.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '有 — to have',
      explanation: '有 (yǒu) means "to have" or "there is/are". Negate with 没有 (méiyǒu). Do NOT use 不有.',
      pattern: '我有＿＿。/ 我没有＿＿。',
      examples: [
        { chinese: '我有一个女儿。', pinyin: 'Wǒ yǒu yī gè nǚér.', english: 'I have one daughter.' },
        { chinese: '我没有兄弟。', pinyin: 'Wǒ méiyǒu xiōngdì.', english: 'I don\'t have brothers.' },
      ],
    },
    {
      title: '几 vs 多少 — asking about quantity',
      explanation: '几 (jǐ) asks "how many?" for small numbers (usually under 10). 多少 (duōshao) asks "how many/much?" for any amount.',
      pattern: '几 + 量词 / 多少 + (量词)',
      examples: [
        { chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people in your family?' },
        { chinese: '你有多少钱？', pinyin: 'Nǐ yǒu duōshao qián?', english: 'How much money do you have?' },
      ],
    },
    {
      title: '了 — change of state',
      explanation: 'Sentence-final 了 (le) indicates a change of state or new situation. In 她五岁了, it means "she has turned/become five".',
      pattern: 'Subject + age/state + 了',
      examples: [
        { chinese: '她五岁了。', pinyin: 'Tā wǔ suì le.', english: 'She is five now.' },
        { chinese: '天黑了。', pinyin: 'Tiān hēi le.', english: 'It\'s gotten dark.' },
      ],
    },
  ],
  characters: [
    { character: '一', strokeCount: 1, componentsExplanation: 'One horizontal stroke — one' },
    { character: '二', strokeCount: 2, componentsExplanation: 'Two horizontal strokes — two' },
    { character: '三', strokeCount: 3, componentsExplanation: 'Three horizontal strokes — three' },
    { character: '四', strokeCount: 5, componentsExplanation: '囗 (enclosure) + 儿 — four' },
    { character: '五', strokeCount: 4, componentsExplanation: 'Stylized form meaning five' },
    { character: '六', strokeCount: 4, componentsExplanation: '亠 (top) + 八 (eight shape) — six' },
    { character: '七', strokeCount: 2, componentsExplanation: 'Horizontal with a bend — seven' },
    { character: '八', strokeCount: 2, componentsExplanation: 'Two diverging strokes — eight' },
    { character: '九', strokeCount: 2, componentsExplanation: 'A curved stroke — nine' },
    { character: '十', strokeCount: 2, componentsExplanation: 'Cross shape — ten' },
    { character: '岁', wordPinyin: 'suì', strokeCount: 6, componentsExplanation: '山 (mountain) + 夕 (evening) — years of age' },
  ],
  cultureNote: {
    title: '中国家庭 Chinese Family Values',
    content: 'Family (家, jiā) is the cornerstone of Chinese society. Confucian values emphasize filial piety (孝, xiào) — respect and care for parents and elders. Chinese families traditionally lived in multi-generational households. Today, grandparents often help raise grandchildren, especially in cities where both parents work. When meeting someone, Chinese people often ask about family size and ages — this is a sign of friendly interest, not intrusion.',
  },
}
