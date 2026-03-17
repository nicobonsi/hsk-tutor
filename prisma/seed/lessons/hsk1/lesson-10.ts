import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 10,
  title: '我们去图书馆吧',
  titlePinyin: 'Wǒmen qù túshūguǎn ba',
  subtitle: 'Let\'s Go to the Library',
  objectives: [
    'Suggest doing things together with 吧 (ba)',
    'Describe what\'s on a table or in a room',
    'Use 能 (néng) for ability/permission',
    'Express there is/are with 有 and 没有',
  ],
  vocabulary: ['zhuōzi', 'shàng', 'diànnǎo', 'hé', 'běn', 'lǐ', 'qiánmiàn', 'hòumiàn', 'zhèr', 'méiyǒu', 'néng', 'zuò'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '找东西 Looking for things',
      turns: [
        { speaker: '玛丽', chinese: '桌子上有什么？', pinyin: 'Zhuōzi shàng yǒu shénme?', english: 'What is on the table?' },
        { speaker: '大卫', chinese: '桌子上有一个电脑和几本书。', pinyin: 'Zhuōzi shàng yǒu yī gè diànnǎo hé jǐ běn shū.', english: 'There is a computer and several books on the table.' },
        { speaker: '玛丽', chinese: '里面有没有本子？', pinyin: 'Lǐmiàn yǒu méiyǒu běnzi?', english: 'Is there a notebook inside?' },
        { speaker: '大卫', chinese: '没有，里面没有本子。', pinyin: 'Méiyǒu, lǐmiàn méiyǒu běnzi.', english: 'No, there is no notebook inside.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '图书馆 The library',
      turns: [
        { speaker: '大卫', chinese: '我们去图书馆吧！', pinyin: 'Wǒmen qù túshūguǎn ba!', english: 'Let\'s go to the library!' },
        { speaker: '玛丽', chinese: '好，我们能坐在前面吗？', pinyin: 'Hǎo, wǒmen néng zuò zài qiánmiàn ma?', english: 'Good, can we sit in the front?' },
        { speaker: '大卫', chinese: '能，那儿有位子。', pinyin: 'Néng, nàr yǒu wèizi.', english: 'Yes, there are seats there.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '吧 — suggestion / assumption particle',
      explanation: '吧 (ba) at the end of a sentence softens a statement into a suggestion or assumption. "Let\'s..." / "Right?" / "I suppose..."',
      pattern: 'Verb phrase + 吧',
      examples: [
        { chinese: '我们走吧。', pinyin: 'Wǒmen zǒu ba.', english: 'Let\'s go.' },
        { chinese: '你是老师吧？', pinyin: 'Nǐ shì lǎoshī ba?', english: 'You\'re a teacher, right?' },
        { chinese: '坐吧。', pinyin: 'Zuò ba.', english: 'Have a seat.' },
      ],
    },
    {
      title: '有没有 — affirmative-negative question',
      explanation: 'Repeat a verb in its positive and negative form to make a yes/no question: 有没有 (yǒu méiyǒu) = "Is there or is there not?" This is equivalent to V+吗 questions.',
      pattern: 'Subject + verb + 没 + verb + object?',
      examples: [
        { chinese: '你有没有书？', pinyin: 'Nǐ yǒu méiyǒu shū?', english: 'Do you have a book or not?' },
        { chinese: '他去没去？', pinyin: 'Tā qù méi qù?', english: 'Did he go or not?' },
      ],
    },
    {
      title: '能 — can (ability/permission)',
      explanation: '能 (néng) expresses physical ability or situational permission. Different from 会 (learned skill) and 可以 (allowed to).',
      pattern: '能 + verb',
      examples: [
        { chinese: '我能走了。', pinyin: 'Wǒ néng zǒu le.', english: 'I can leave now.' },
        { chinese: '这里能坐吗？', pinyin: 'Zhèlǐ néng zuò ma?', english: 'Can I sit here?' },
      ],
    },
  ],
  characters: [
    { character: '桌', wordPinyin: 'zhuōzi', strokeCount: 10, componentsExplanation: '卓 (tall) + 木 (wood) — table' },
    { character: '电', wordPinyin: 'diànnǎo', strokeCount: 5, componentsExplanation: '日 (sun) + 乚 (hidden stroke) — electricity' },
    { character: '脑', strokeCount: 10, componentsExplanation: '月 (flesh) + 囟 (fontanel) + 匕 — brain' },
    { character: '本', wordPinyin: 'běn', strokeCount: 5, componentsExplanation: '木 (tree) + 一 (one, at base) — root/foundation; measure word for books' },
    { character: '坐', wordPinyin: 'zuò', strokeCount: 7, componentsExplanation: 'Two people sitting on earth — to sit' },
  ],
  cultureNote: {
    title: '中国图书馆文化 Chinese Library Culture',
    content: 'Libraries (图书馆 túshūguǎn) hold a revered place in Chinese culture. The Chinese value of 读书 (dúshū, "reading/studying") goes back thousands of years to Confucian traditions emphasizing education. Public libraries in China are free and widely used by students of all ages. University libraries often stay open late into the night during exam seasons. The phrase 书中自有黄金屋 (shū zhōng zì yǒu huángjīn wū, "within books there are golden houses") reflects the traditional belief that education is the path to success.',
  },
}
