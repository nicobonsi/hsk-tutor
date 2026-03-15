'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ToneSelectorProps {
  word: string
  meaning: string
  options: string[]
  correctAnswer: string
  onAnswer: (isCorrect: boolean) => void
}

const TONE_LABELS = ['1st tone', '2nd tone', '3rd tone', '4th tone']
const TONE_DESCRIPTIONS = ['flat →', 'rising ↗', 'dip ↘↗', 'falling ↘']

export default function ToneSelector({
  word,
  meaning,
  options,
  correctAnswer,
  onAnswer,
}: ToneSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSelect(option: string) {
    if (submitted) return
    setSelected(option)
    setSubmitted(true)
    onAnswer(option === correctAnswer)
  }

  function getOptionStyle(option: string): string {
    if (!submitted) {
      return 'border-zinc-200 bg-white text-zinc-800 hover:border-violet-400 hover:bg-violet-50 cursor-pointer'
    }
    if (option === correctAnswer) {
      return 'border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default'
    }
    if (option === selected && option !== correctAnswer) {
      return 'border-red-400 bg-red-50 text-red-800 cursor-default'
    }
    return 'border-zinc-200 bg-white text-zinc-400 cursor-default opacity-50'
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {/* Word display */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 px-6 py-6 text-center">
        <p className="text-5xl font-bold text-zinc-900 tracking-wide">{word}</p>
        <p className="mt-3 text-base text-zinc-500 font-medium">{meaning}</p>
        <p className="mt-2 text-sm text-violet-500">Which tone is correct?</p>
      </div>

      {/* Tone options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, idx) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.07 }}
            onClick={() => handleSelect(option)}
            className={cn(
              'relative flex flex-col items-center gap-1 rounded-xl border-2 px-4 py-4',
              'text-base font-semibold transition-all duration-200',
              getOptionStyle(option)
            )}
          >
            <span className="text-2xl font-bold">{option}</span>
            <span className="text-xs font-normal opacity-70">
              {TONE_LABELS[idx]} · {TONE_DESCRIPTIONS[idx]}
            </span>
            <AnimatePresence mode="wait">
              {submitted && option === correctAnswer && (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </motion.span>
              )}
              {submitted && option === selected && option !== correctAnswer && (
                <motion.span
                  key="x"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <XCircle className="h-4 w-4 text-red-500" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold',
              selected === correctAnswer
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            )}
          >
            {selected === correctAnswer ? (
              <>
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>Correct tone!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 shrink-0" />
                <span>
                  Wrong tone. The correct pronunciation is:{' '}
                  <strong className="ml-1">{correctAnswer}</strong>
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
