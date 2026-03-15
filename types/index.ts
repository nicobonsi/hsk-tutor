export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  hskLevel: number
  xp: number
  streakDays: number
  lastActiveAt?: string
  isAlpha: boolean
  subscriptionStatus: string
  createdAt: string
}

export interface HskWord {
  id: string
  level: number
  simplified: string
  traditional?: string
  pinyin: string
  pinyinTones: string
  definitions: WordDefinition[]
  audioUrl?: string
  tags: string[]
  frequencyRank?: number
}

export interface WordDefinition {
  part_of_speech: string
  meaning: string
  example_zh: string
  example_pinyin: string
  example_en: string
}

export interface Exercise {
  id: string
  type: ExerciseType
  level: number
  wordId?: string
  grammarId?: string
  prompt: ExercisePrompt
  correctAnswer: string
  distractors: string[]
  audioUrl?: string
  difficulty: number
  tags: string[]
}

export type ExerciseType =
  | 'vocab_recall'
  | 'fill_blank'
  | 'listening'
  | 'reading_comp'
  | 'tone_match'
  | 'sentence_order'
  | 'grammar_choice'

export type ExercisePrompt =
  | VocabRecallPrompt
  | FillBlankPrompt
  | ListeningPrompt
  | ToneMatchPrompt
  | SentenceOrderPrompt

export interface VocabRecallPrompt {
  display: string
  displayMode: 'character' | 'pinyin' | 'english'
  askFor: 'definition' | 'character' | 'pinyin'
}

export interface FillBlankPrompt {
  sentenceZh: string
  sentenceEn: string
  hintPinyin?: string
}

export interface ListeningPrompt {
  audioUrl: string
  question: string
  transcriptZh?: string
}

export interface ToneMatchPrompt {
  word: string
  meaning: string
  options: string[]
}

export interface SentenceOrderPrompt {
  words: string[]
  instruction: string
}

export interface UserWordProgress {
  id: string
  userId: string
  wordId: string
  status: 'new' | 'learning' | 'reviewing' | 'mastered'
  easeFactor: number
  intervalDays: number
  nextReviewAt?: string
  correctCount: number
  incorrectCount: number
}

export interface LeaderboardEntry {
  rank: number
  username: string
  avatarUrl?: string
  xp: number
  hskLevel: number
  streakDays: number
  userId: string
}

export interface StudySession {
  id: string
  userId: string
  level: number
  mode: string
  xpEarned: number
  wordsStudied: number
  accuracy?: number
  durationMs?: number
  completedAt: string
}

export interface Achievement {
  id: string
  key: string
  title: string
  description: string
  icon: string
  xpReward: number
}

export interface AnswerResult {
  isCorrect: boolean
  xpEarned: number
  correctAnswer: string
  newAchievements: Achievement[]
}
