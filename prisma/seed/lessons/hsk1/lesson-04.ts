import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 4,
  title: '你是哪国人',
  titlePinyin: 'Nǐ shì nǎ guó rén',
  subtitle: 'Where Are You From?',
  objectives: [
    'Ask and answer where someone is from',
    'Talk about nationalities',
    'Use 哪 (nǎ) to ask "which"',
    'Use the possessive particle 的 (de)',
  ],
  vocabulary: ['hànyǔ', 'nǎ', 'ne', 'péngyou', 'shéi', 'tā', 'tā (she)', 'tóngxué', 'de'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '问国籍 Asking nationality',
      turns: [
        { speaker: '玛丽', chinese: '你是哪国人？', pinyin: 'Nǐ shì nǎ guó rén?', english: 'Which country are you from?' },
        { speaker: '大卫', chinese: '我是美国人。你呢？', pinyin: 'Wǒ shì Měiguó rén. Nǐ ne?', english: 'I am American. And you?' },
        { speaker: '玛丽', chinese: '我是中国人。', pinyin: 'Wǒ shì Zhōngguó rén.', english: 'I am Chinese.' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '介绍朋友 Introducing a friend',
      turns: [
        { speaker: '大卫', chinese: '她是谁？', pinyin: 'Tā shì shéi?', english: 'Who is she?' },
        { speaker: '玛丽', chinese: '她是我的朋友，她是我的同学。', pinyin: 'Tā shì wǒ de péngyou, tā shì wǒ de tóngxué.', english: 'She is my friend; she is my classmate.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '哪 — which (question word)',
      explanation: '哪 (nǎ) means "which". In 你是哪国人？it asks "which country person are you?" — i.e., what nationality are you?',
      pattern: '你是哪国人？',
      examples: [
        { chinese: '你是哪国人？', pinyin: 'Nǐ shì nǎ guó rén?', english: 'Which country are you from?' },
        { chinese: '你在哪儿？', pinyin: 'Nǐ zài nǎr?', english: 'Where are you?' },
      ],
    },
    {
      title: '呢 — what about...? (follow-up question)',
      explanation: '呢 (ne) after a noun or pronoun creates a follow-up question meaning "And ___?" or "What about ___?"',
      pattern: '＿＿呢？',
      examples: [
        { chinese: '我很好，你呢？', pinyin: 'Wǒ hěn hǎo, nǐ ne?', english: 'I\'m fine, and you?' },
        { chinese: '他是学生，她呢？', pinyin: 'Tā shì xuésheng, tā ne?', english: 'He is a student. What about her?' },
      ],
    },
    {
      title: '的 — possessive particle',
      explanation: '的 (de) is placed between a pronoun/noun and a following noun to show possession or modification, like "\'s" in English.',
      pattern: '我/你/他/她 + 的 + noun',
      examples: [
        { chinese: '我的朋友', pinyin: 'wǒ de péngyou', english: 'my friend' },
        { chinese: '他的书', pinyin: 'tā de shū', english: 'his book' },
        { chinese: '老师的名字', pinyin: 'lǎoshī de míngzi', english: 'the teacher\'s name' },
      ],
    },
  ],
  pinyinDrills: [
    {
      type: 'initial',
      order: 1,
      content: [
        {
          symbol: 'j',
          examples: [
            { pinyin: 'jiā', character: '家', meaning: 'home/family' },
            { pinyin: 'jiào', character: '叫', meaning: 'to be called' },
          ],
        },
        {
          symbol: 'q',
          examples: [
            { pinyin: 'qù', character: '去', meaning: 'to go' },
            { pinyin: 'qǐng', character: '请', meaning: 'please/invite' },
          ],
        },
        {
          symbol: 'x',
          examples: [
            { pinyin: 'xué', character: '学', meaning: 'to study' },
            { pinyin: 'xiǎo', character: '小', meaning: 'small' },
          ],
        },
      ],
    },
  ],
  characters: [
    { character: '哪', wordPinyin: 'nǎ', strokeCount: 9, componentsExplanation: '口 (mouth) + 那 (that) — which one?' },
    { character: '他', wordPinyin: 'tā', strokeCount: 5, componentsExplanation: '亻(person) + 也 (also) — he/him' },
    { character: '她', strokeCount: 6, componentsExplanation: '女 (woman) + 也 (also) — she/her' },
    { character: '的', wordPinyin: 'de', strokeCount: 8, componentsExplanation: '白 (white) + 勺 (spoon) — possessive particle' },
    { character: '谁', wordPinyin: 'shéi', strokeCount: 10, componentsExplanation: '言 (speech) + 隹 (bird) — who?' },
  ],
}
