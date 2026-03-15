'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface SentenceOrderProps {
  words: string[]
  correctAnswer: string
  onAnswer: (isCorrect: boolean) => void
}

export default function SentenceOrder({ words, correctAnswer, onAnswer }: SentenceOrderProps) {
  const [bank, setBank] = useState<string[]>([...words])
  const [answer, setAnswer] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  function addWord(word: string) {
    if (submitted) return
    setBank((prev) => {
      const idx = prev.indexOf(word)
      if (idx === -1) return prev
      const next = [...prev]
      next.splice(idx, 1)
      return next
    })
    setAnswer((prev) => [...prev, word])
  }

  function removeWord(word: string, idx: number) {
    if (submitted) return
    setAnswer((prev) => {
      const next = [...prev]
      next.splice(idx, 1)
      return next
    })
    setBank((prev) => [...prev, word])
  }

  function handleReset() {
    if (submitted) return
    setBank([...words])
    setAnswer([])
  }

  function handleCheck() {
    if (submitted || answer.length === 0) return
    const composed = answer.join('')
    const correct = composed === correctAnswer || answer.join(' ') === correctAnswer
    setIsCorrect(correct)
    setSubmitted(true)
    onAnswer(correct)
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      {/* Instruction */}
      <p className="text-sm font-medium text-zinc-500 text-center">
        Arrange the words to form the correct sentence
      </p>

      {/* Answer area */}
      <div className="min-h-[72px] rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
          Your answer
        </p>
        {answer.length === 0 ? (
          <p className="text-sm text-zinc-400 italic">Tap words below to add them here…</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {answer.map((word, idx) => (
                <motion.button
                  key={`${word}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => removeWord(word, idx)}
                  disabled={submitted}
                  className={cn(
                    'rounded-lg border-2 px-3 py-1.5 text-base font-semibold transition-all',
                    submitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default'
                        : 'border-red-400 bg-red-50 text-red-800 cursor-default'
                      : 'border-indigo-400 bg-white text-indigo-700 hover:bg-red-50 hover:border-red-300 cursor-pointer'
                  )}
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Word bank */}
      <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          Word bank
        </p>
        {bank.length === 0 ? (
          <p className="text-sm text-zinc-400 italic">All words placed</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {bank.map((word, idx) => (
                <motion.button
                  key={`bank-${word}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => addWord(word)}
                  disabled={submitted}
                  className={cn(
                    'rounded-lg border-2 border-zinc-200 bg-zinc-50 px-3 py-1.5',
                    'text-base font-semibold text-zinc-700 transition-all',
                    'hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700',
                    'disabled:cursor-default disabled:opacity-60'
                  )}
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Actions */}
      {!submitted && (
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={handleCheck}
            disabled={answer.length === 0}
            className={cn(
              'flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white',
              'hover:bg-indigo-700 transition-colors active:scale-95',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
            )}
          >
            Check answer
          </button>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'flex flex-col gap-1 rounded-xl px-5 py-4 text-sm font-semibold',
              isCorrect
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0" />
              )}
              <span>{isCorrect ? 'Correct! Perfect order.' : 'Not quite right.'}</span>
            </div>
            {!isCorrect && (
              <p className="pl-7 text-xs font-normal">
                Correct sentence: <strong>{correctAnswer}</strong>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
