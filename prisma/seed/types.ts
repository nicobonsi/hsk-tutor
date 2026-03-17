export interface DialogueTurn {
  speaker: string
  chinese: string
  pinyin: string
  english: string
}

export interface DialogueSeed {
  dialogueNumber: number
  title?: string
  turns: DialogueTurn[]
}

export interface PinyinExample {
  pinyin: string
  character: string
  meaning: string
}

export interface PinyinSymbol {
  symbol: string
  examples: PinyinExample[]
}

export interface PinyinDrillSeed {
  type: 'initial' | 'final' | 'tone' | 'combination'
  content: PinyinSymbol[]
  order: number
}

export interface GrammarExampleSeed {
  chinese: string
  pinyin: string
  english: string
}

export interface GrammarPointSeed {
  title: string
  explanation: string
  pattern?: string
  examples: GrammarExampleSeed[]
}

export interface CharacterSeed {
  character: string
  wordPinyin?: string // matched to HskWord.pinyin
  strokeCount?: number
  componentsExplanation?: string
}

export interface CultureNoteSeed {
  title: string
  content: string
  imageUrl?: string
}

export interface LessonSeed {
  level: number
  lessonNumber: number
  title: string
  titlePinyin: string
  subtitle: string
  objectives: string[]
  // pinyin values matched to HskWord.pinyin for lessonId assignment
  vocabulary: string[]
  dialogues: DialogueSeed[]
  grammarPoints: GrammarPointSeed[]
  pinyinDrills?: PinyinDrillSeed[]
  characters: CharacterSeed[]
  cultureNote?: CultureNoteSeed
}
