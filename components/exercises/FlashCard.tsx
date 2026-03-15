'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { HskWord } from '@/types'

interface FlashCardProps {
  word: HskWord
  onAnswer: (isCorrect: boolean) => void
}

export default function FlashCard({ word, onAnswer }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)

  const definition = word.definitions[0]

  function handleFlip() {
    if (!answered) setIsFlipped(true)
  }

  function handleAnswer(isCorrect: boolean) {
    setAnswered(true)
    onAnswer(isCorrect)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card */}
      <div
        className="relative w-full max-w-sm h-72 cursor-pointer"
        style={{ perspective: 1200 }}
        onClick={handleFlip}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white shadow-xl border border-zinc-100 hover:shadow-2xl transition-shadow"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-6xl font-bold text-zinc-900 tracking-wide select-none">
              {word.simplified}
            </p>
            <p className="mt-3 text-xl text-zinc-500 select-none">{word.pinyin}</p>
            <p className="mt-6 text-sm text-zinc-400 select-none">Tap to reveal</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 shadow-xl border border-indigo-100 px-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {definition ? (
              <>
                <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                  {definition.part_of_speech}
                </span>
                <p className="text-2xl font-bold text-zinc-900 text-center">
                  {definition.meaning}
                </p>
                {definition.example_zh && (
                  <div className="mt-2 rounded-xl bg-white/70 p-3 text-center">
                    <p className="text-base text-zinc-700 font-medium">{definition.example_zh}</p>
                    <p className="text-sm text-zinc-500 mt-1">{definition.example_pinyin}</p>
                    <p className="text-sm text-zinc-400 italic mt-1">{definition.example_en}</p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-xl text-zinc-600">No definition available</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Action buttons — appear after flip */}
      <AnimatePresence>
        {isFlipped && !answered && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="flex gap-4"
          >
            <button
              onClick={() => handleAnswer(false)}
              className={cn(
                'flex items-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-6 py-3',
                'text-base font-semibold text-red-600 transition-all',
                'hover:bg-red-100 hover:border-red-300 active:scale-95'
              )}
            >
              <XCircle className="h-5 w-5" />
              Try Again
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className={cn(
                'flex items-center gap-2 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-6 py-3',
                'text-base font-semibold text-emerald-600 transition-all',
                'hover:bg-emerald-100 hover:border-emerald-300 active:scale-95'
              )}
            >
              <CheckCircle className="h-5 w-5" />
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
