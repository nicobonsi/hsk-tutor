'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { getXpForExerciseType } from '@/lib/gamification/xp'
import type { Exercise, HskWord, VocabRecallPrompt, FillBlankPrompt, ToneMatchPrompt, SentenceOrderPrompt } from '@/types'
import FlashCard from './FlashCard'
import MultipleChoice from './MultipleChoice'
import FillBlank from './FillBlank'
import ToneSelector from './ToneSelector'
import SentenceOrder from './SentenceOrder'

interface ExerciseWithWord extends Exercise {
  word?: HskWord
}

interface WordResult {
  wordId: string
  isCorrect: boolean
}

interface ExerciseContainerProps {
  exercises: ExerciseWithWord[]
  onComplete: (results: { correct: number; total: number; xpEarned: number; wordResults: WordResult[] }) => void
  showPinyin?: boolean
}

interface XpPopup {
  id: number
  amount: number
}

export default function ExerciseContainer({ exercises, onComplete, showPinyin = true }: ExerciseContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [wordResults, setWordResults] = useState<WordResult[]>([])
  const [answered, setAnswered] = useState(false)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const [xpPopups, setXpPopups] = useState<XpPopup[]>([])
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState<'green' | 'red' | null>(null)
  const [popupCounter, setPopupCounter] = useState(0)

  const current = exercises[currentIndex]
  const total = exercises.length
  const progressPercent = (currentIndex / total) * 100

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (answered) return
      setAnswered(true)
      setLastCorrect(isCorrect)

      if (current.wordId) {
        setWordResults((prev) => [...prev, { wordId: current.wordId!, isCorrect }])
      }

      if (isCorrect) {
        const xp = getXpForExerciseType(current.type, true)
        setCorrectCount((c) => c + 1)
        setXpEarned((x) => x + xp)
        setFlash('green')
        const id = popupCounter
        setPopupCounter((n) => n + 1)
        setXpPopups((prev) => [...prev, { id, amount: xp }])
        setTimeout(() => {
          setXpPopups((prev) => prev.filter((p) => p.id !== id))
        }, 1600)
        setTimeout(() => setFlash(null), 600)
      } else {
        setFlash('red')
        setShake(true)
        setTimeout(() => {
          setFlash(null)
          setShake(false)
        }, 600)
      }
    },
    [answered, current, popupCounter]
  )

  function handleNext() {
    if (currentIndex + 1 >= total) {
      onComplete({ correct: correctCount, total, xpEarned, wordResults })
      return
    }
    setCurrentIndex((i) => i + 1)
    setAnswered(false)
    setLastCorrect(null)
  }

  function renderExercise() {
    if (!current) return null

    switch (current.type) {
      case 'vocab_recall': {
        const prompt = current.prompt as VocabRecallPrompt
        if (!current.word) return null
        // Treat vocab_recall as a flashcard
        return <FlashCard word={current.word} onAnswer={handleAnswer} showPinyin={showPinyin} />
      }

      case 'fill_blank': {
        const prompt = current.prompt as FillBlankPrompt
        return (
          <FillBlank
            sentenceZh={prompt.sentenceZh}
            sentenceEn={prompt.sentenceEn}
            correctAnswer={current.correctAnswer}
            hintPinyin={prompt.hintPinyin}
            onAnswer={handleAnswer}
          />
        )
      }

      case 'tone_match': {
        const prompt = current.prompt as ToneMatchPrompt
        return (
          <ToneSelector
            word={prompt.word}
            meaning={prompt.meaning}
            options={prompt.options}
            correctAnswer={current.correctAnswer}
            onAnswer={handleAnswer}
          />
        )
      }

      case 'sentence_order': {
        const prompt = current.prompt as SentenceOrderPrompt
        return (
          <SentenceOrder
            words={prompt.words}
            correctAnswer={current.correctAnswer}
            onAnswer={handleAnswer}
          />
        )
      }

      case 'grammar_choice':
      case 'reading_comp': {
        // Render as multiple choice
        const allOptions = [current.correctAnswer, ...current.distractors].sort(
          () => Math.random() - 0.5
        )
        const prompt = current.prompt as VocabRecallPrompt
        return (
          <MultipleChoice
            question={(prompt as any).question ?? (prompt as any).display ?? 'Choose the correct answer:'}
            options={allOptions}
            correctAnswer={current.correctAnswer}
            onAnswer={handleAnswer}
          />
        )
      }

      default:
        return null
    }
  }

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-lg mx-auto">
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key={flash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'pointer-events-none fixed inset-0 z-50',
              flash === 'green' ? 'bg-emerald-400' : 'bg-red-400'
            )}
          />
        )}
      </AnimatePresence>

      {/* XP popups */}
      <AnimatePresence>
        {xpPopups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="pointer-events-none fixed top-24 right-6 z-50 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
          >
            +{popup.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header: progress + XP */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-zinc-500">
              Question {currentIndex + 1} of {total}
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-indigo-500"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1">
          <span className="text-sm">⚡</span>
          <span className="text-sm font-bold text-amber-700">{xpEarned} XP</span>
        </div>
      </div>

      {/* Exercise area */}
      <motion.div
        key={currentIndex}
        animate={shake ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {renderExercise()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Next button */}
      <AnimatePresence>
        {answered && (
          <motion.div
            key="next-btn"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={handleNext}
              className={cn(
                'w-full rounded-xl py-3.5 text-base font-semibold text-white transition-all active:scale-95',
                lastCorrect
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              )}
            >
              {currentIndex + 1 >= total ? 'See Results' : 'Next Question →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
