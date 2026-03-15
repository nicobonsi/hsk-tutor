'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, CheckCircle, XCircle, Send } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface FillBlankProps {
  sentenceZh: string
  sentenceEn: string
  correctAnswer: string
  hintPinyin?: string
  onAnswer: (isCorrect: boolean) => void
}

export default function FillBlank({
  sentenceZh,
  sentenceEn,
  correctAnswer,
  hintPinyin,
  onAnswer,
}: FillBlankProps) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Replace ___ placeholder in the Chinese sentence for display
  const parts = sentenceZh.split('___')

  function handleSubmit() {
    if (!value.trim() || submitted) return
    const correct = value.trim() === correctAnswer.trim()
    setIsCorrect(correct)
    setSubmitted(true)
    onAnswer(correct)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      {/* Sentence display */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 px-6 py-5">
        <p className="text-2xl font-semibold text-zinc-900 text-center leading-relaxed">
          {parts[0]}
          <span className="inline-block min-w-[3rem] border-b-2 border-amber-400 mx-1 text-amber-600">
            {submitted ? (
              <span className={cn(isCorrect ? 'text-emerald-600' : 'text-red-600')}>
                {value || '___'}
              </span>
            ) : (
              <span className="opacity-0">___</span>
            )}
          </span>
          {parts[1] ?? ''}
        </p>
        <p className="mt-3 text-sm text-zinc-500 text-center italic">{sentenceEn}</p>
      </div>

      {/* Hint */}
      {hintPinyin && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            <Lightbulb className="h-4 w-4" />
            {showHint ? 'Hide hint' : 'Show hint (pinyin)'}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showHint && hintPinyin && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-center">
              <p className="text-sm text-amber-700 font-medium">
                Pinyin: <span className="font-bold">{hintPinyin}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted}
          placeholder="Type your answer…"
          className={cn(
            'flex-1 rounded-xl border-2 px-4 py-3 text-base font-medium',
            'outline-none transition-colors placeholder-zinc-400',
            submitted
              ? isCorrect
                ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                : 'border-red-400 bg-red-50 text-red-800'
              : 'border-zinc-200 bg-white text-zinc-900 focus:border-indigo-400'
          )}
        />
        <button
          onClick={handleSubmit}
          disabled={submitted || !value.trim()}
          className={cn(
            'flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all',
            'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
          )}
        >
          <Send className="h-4 w-4" />
          Submit
        </button>
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
              'flex items-start gap-3 rounded-xl px-5 py-4 text-sm font-semibold',
              isCorrect
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Correct! Great job.</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
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
