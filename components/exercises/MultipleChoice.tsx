'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface MultipleChoiceProps {
  question: string
  options: string[]
  correctAnswer: string
  onAnswer: (isCorrect: boolean) => void
}

export default function MultipleChoice({
  question,
  options,
  correctAnswer,
  onAnswer,
}: MultipleChoiceProps) {
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
      return 'border-zinc-200 bg-white text-zinc-800 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer'
    }
    if (option === correctAnswer) {
      return 'border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default'
    }
    if (option === selected && option !== correctAnswer) {
      return 'border-red-400 bg-red-50 text-red-800 cursor-default'
    }
    return 'border-zinc-200 bg-white text-zinc-400 cursor-default opacity-60'
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      {/* Question */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 px-6 py-5">
        <p className="text-lg font-semibold text-zinc-800 text-center leading-relaxed">
          {question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {options.map((option, idx) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            onClick={() => handleSelect(option)}
            className={cn(
              'flex items-center justify-between rounded-xl border-2 px-5 py-4',
              'text-base font-medium transition-all duration-200',
              getOptionStyle(option)
            )}
          >
            <span>{option}</span>
            <AnimatePresence mode="wait">
              {submitted && option === correctAnswer && (
                <motion.span
                  key="correct"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </motion.span>
              )}
              {submitted && option === selected && option !== correctAnswer && (
                <motion.span
                  key="wrong"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <XCircle className="h-5 w-5 text-red-500" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Feedback + Next hint */}
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
                <span>Correct! Well done.</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 shrink-0" />
                <span>
                  Incorrect. The correct answer is:{' '}
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
