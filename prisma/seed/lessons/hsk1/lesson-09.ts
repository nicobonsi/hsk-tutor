import type { LessonSeed } from '../../types'

export const lesson: LessonSeed = {
  level: 1,
  lessonNumber: 9,
  title: '他在哪儿工作',
  titlePinyin: 'Tā zài nǎr gōngzuò',
  subtitle: 'Where Does He Work?',
  objectives: [
    'Ask and say where someone works',
    'Use 在 (zài) for location',
    'Describe locations with simple positional words',
    'Talk about family occupations',
  ],
  vocabulary: ['xiǎo', 'māo', 'zài', 'nàr', 'gǒu', 'yǐzi', 'xiàmiàn', 'nǎr', 'gōngzuò', 'érzi', 'yīyuàn', 'yīshēng', 'bàba'],
  dialogues: [
    {
      dialogueNumber: 1,
      title: '找猫 Looking for the cat',
      turns: [
        { speaker: '玛丽', chinese: '你的猫在哪儿？', pinyin: 'Nǐ de māo zài nǎr?', english: 'Where is your cat?' },
        { speaker: '大卫', chinese: '我的猫在椅子下面。', pinyin: 'Wǒ de māo zài yǐzi xiàmiàn.', english: 'My cat is under the chair.' },
        { speaker: '玛丽', chinese: '那儿还有一只狗！', pinyin: 'Nàr hái yǒu yī zhī gǒu!', english: 'There\'s also a dog over there!' },
      ],
    },
    {
      dialogueNumber: 2,
      title: '谈工作 Talking about work',
      turns: [
        { speaker: '大卫', chinese: '你爸爸在哪儿工作？', pinyin: 'Nǐ bàba zài nǎr gōngzuò?', english: 'Where does your father work?' },
        { speaker: '玛丽', chinese: '他在医院工作。他是医生。', pinyin: 'Tā zài yīyuàn gōngzuò. Tā shì yīshēng.', english: 'He works at a hospital. He is a doctor.' },
        { speaker: '大卫', chinese: '你儿子呢？', pinyin: 'Nǐ érzi ne?', english: 'What about your son?' },
        { speaker: '玛丽', chinese: '我儿子还小。', pinyin: 'Wǒ érzi hái xiǎo.', english: 'My son is still young.' },
      ],
    },
  ],
  grammarPoints: [
    {
      title: '在 — to be at / located at',
      explanation: '在 (zài) is used to indicate location. Pattern: Subject + 在 + place. As a verb: "to be at". As a preposition before another verb: "at [place] doing..."',
      pattern: 'Subject + 在 + place (+ verb)',
      examples: [
        { chinese: '他在家。', pinyin: 'Tā zài jiā.', english: 'He is at home.' },
        { chinese: '她在医院工作。', pinyin: 'Tā zài yīyuàn gōngzuò.', english: 'She works at the hospital.' },
        { chinese: '猫在哪儿？', pinyin: 'Māo zài nǎr?', english: 'Where is the cat?' },
      ],
    },
    {
      title: '下面 — location words',
      explanation: 'Positional words (方位词 fāngwèicí): 上面 (shàngmiàn, above/on top), 下面 (xiàmiàn, below/under), 里面 (lǐmiàn, inside), 前面 (qiánmiàn, in front), 后面 (hòumiàn, behind).',
      pattern: 'Object + 上面/下面/里面/前面/后面',
      examples: [
        { chinese: '书在桌子上面。', pinyin: 'Shū zài zhuōzi shàngmiàn.', english: 'The book is on the table.' },
        { chinese: '猫在椅子下面。', pinyin: 'Māo zài yǐzi xiàmiàn.', english: 'The cat is under the chair.' },
      ],
    },
    {
      title: '还 — still / also / in addition',
      explanation: '还 (hái) has two meanings: (1) "still" — continuing a state: 还小 (still young); (2) "also/in addition": 还有 (there is also).',
      pattern: '还 + adjective/verb',
      examples: [
        { chinese: '他还是学生。', pinyin: 'Tā hái shì xuésheng.', english: 'He is still a student.' },
        { chinese: '还有一个苹果。', pinyin: 'Hái yǒu yī gè píngguǒ.', english: 'There is also one more apple.' },
      ],
    },
  ],
  characters: [
    { character: '在', wordPinyin: 'zài', strokeCount: 6, componentsExplanation: '才 (just/talent) + 土 (earth) — to exist at a place' },
    { character: '猫', wordPinyin: 'māo', strokeCount: 11, componentsExplanation: '犭(dog radical) + 苗 (sprout) — cat' },
    { character: '狗', wordPinyin: 'gǒu', strokeCount: 8, componentsExplanation: '犭(dog radical) + 句 (sentence) — dog' },
    { character: '医', wordPinyin: 'yīshēng', strokeCount: 7, componentsExplanation: '匸 (hiding) + 矢 (arrow) + 殳 — medicine' },
    { character: '院', strokeCount: 9, componentsExplanation: '阝(mound) + 完 (complete) — courtyard/institution' },
  ],
}
