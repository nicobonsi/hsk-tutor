'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MultipleChoice from '@/components/exercises/MultipleChoice'

interface PlacementQuestion {
  question: string
  options: string[]
  correctAnswer: string
  hskLevel: number
}

// 10 questions spanning HSK 1–4
const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // HSK 1 (Q1–3)
  {
    question: 'What does 你好 (nǐ hǎo) mean?',
    options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'],
    correctAnswer: 'Hello',
    hskLevel: 1,
  },
  {
    question: 'Which character means "water" (shuǐ)?',
    options: ['火', '水', '木', '土'],
    correctAnswer: '水',
    hskLevel: 1,
  },
  {
    question: 'What does 我爱你 mean?',
    options: ['I miss you', 'I need you', 'I love you', 'I see you'],
    correctAnswer: 'I love you',
    hskLevel: 1,
  },
  // HSK 2 (Q4–6)
  {
    question: 'Choose the correct pinyin for 学习 (to study):',
    options: ['xuéxí', 'xúexī', 'xuèxi', 'xuéxi'],
    correctAnswer: 'xuéxí',
    hskLevel: 2,
  },
  {
    question: 'What does 时候 (shíhou) mean?',
    options: ['Time / moment', 'Weather', 'Reason', 'Place'],
    correctAnswer: 'Time / moment',
    hskLevel: 2,
  },
  {
    question: 'Fill in: 我____去图书馆。 (I want to go to the library)',
    options: ['想', '是', '有', '在'],
    correctAnswer: '想',
    hskLevel: 2,
  },
  // HSK 3 (Q7–8)
  {
    question: 'What does 虽然…但是… mean?',
    options: [
      'If… then…',
      'Although… but…',
      'Because… therefore…',
      'Either… or…',
    ],
    correctAnswer: 'Although… but…',
    hskLevel: 3,
  },
  {
    question: 'Which word means "environment" (huánjìng)?',
    options: ['环境', '经济', '关系', '文化'],
    correctAnswer: '环境',
    hskLevel: 3,
  },
  // HSK 4 (Q9–10)
  {
    question: 'Choose the correct usage of 把: ____',
    options: [
      '我把书读了。',
      '我书读了把。',
      '把我读书了。',
      '读我把书了。',
    ],
    correctAnswer: '我把书读了。',
    hskLevel: 4,
  },
  {
    question: 'What does 尽管 (jǐnguǎn) mean?',
    options: ['As long as', 'Even though', 'In order to', 'As a result'],
    correctAnswer: 'Even though',
    hskLevel: 4,
  },
]

function calcLevel(correctCount: number): number {
  if (correctCount <= 3) return 1
  if (correctCount <= 6) return 2
  if (correctCount <= 8) return 3
  return 4
}

type Stage = 'intro' | 'quiz' | 'saving' | 'done'

export default function OnboardingPage() {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQ = PLACEMENT_QUESTIONS[currentIndex]

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (answered) return
      setAnswered(true)
      if (isCorrect) setCorrectCount((c) => c + 1)
    },
    [answered]
  )

  async function handleNext() {
    if (currentIndex + 1 >= PLACEMENT_QUESTIONS.length) {
      // All questions answered — save level
      const placedLevel = calcLevel(correctCount + (answered ? 0 : 0))
      await saveLevel(placedLevel)
    } else {
      setCurrentIndex((i) => i + 1)
      setAnswered(false)
    }
  }

  async function saveLevel(level: number) {
    setStage('saving')
    try {
      const res = await fetch('/api/user/level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level }),
      })
      if (!res.ok) throw new Error('Failed to save level')
      setStage('done')
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStage('quiz')
    }
  }

  // Intro screen
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm flex flex-col items-center gap-6 text-center"
        >
          <span className="text-7xl">🎓</span>
          <h1 className="text-2xl font-extrabold text-zinc-900">Welcome to HSK Tutor!</h1>
          <p className="text-base text-zinc-600 leading-relaxed">
            Let's find the right starting level for you with a short placement test — just 10
            questions.
          </p>
          <ul className="text-sm text-zinc-500 text-left space-y-1 w-full">
            <li>✅ 10 questions · ~3 minutes</li>
            <li>✅ Spans HSK levels 1–4</li>
            <li>✅ No pressure — just helps us personalise your experience</li>
          </ul>
          <button
            onClick={() => setStage('quiz')}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 transition-colors active:scale-95"
          >
            Start Placement Test
          </button>
        </motion.div>
      </div>
    )
  }

  // Saving / done screen
  if (stage === 'saving' || stage === 'done') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {stage === 'saving' ? (
            <>
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
              <p className="text-base font-semibold text-zinc-700">Saving your level…</p>
            </>
          ) : (
            <>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="text-6xl"
              >
                🚀
              </motion.span>
              <p className="text-xl font-bold text-zinc-900">All set! Redirecting…</p>
            </>
          )}
        </motion.div>
      </div>
    )
  }

  // Quiz screen
  const progress = Math.round((currentIndex / PLACEMENT_QUESTIONS.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50 flex flex-col items-center justify-center p-4 gap-8">
      {/* Header */}
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-zinc-500">
            Question {currentIndex + 1} of {PLACEMENT_QUESTIONS.length}
          </span>
          <span className="text-xs font-semibold text-indigo-500">HSK {currentQ.hskLevel}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/70 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-indigo-500"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-lg"
        >
          <MultipleChoice
            question={currentQ.question}
            options={currentQ.options}
            correctAnswer={currentQ.correctAnswer}
            onAnswer={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="text-sm font-semibold text-red-600 text-center">{error}</p>
      )}

      {/* Next / Finish button */}
      <AnimatePresence>
        {answered && (
          <motion.div
            key="next"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
            className="w-full max-w-lg"
          >
            <button
              onClick={handleNext}
              className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 transition-colors active:scale-95"
            >
              {currentIndex + 1 >= PLACEMENT_QUESTIONS.length ? 'Finish & See My Level' : 'Next Question →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
