'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, RotateCcw, Trophy, Target, Zap } from 'lucide-react'
import ExerciseContainer from '@/components/exercises/ExerciseContainer'
import AchievementToast from '@/components/gamification/AchievementToast'
import { cn } from '@/lib/utils/cn'
import type { Exercise, Achievement } from '@/types'

interface WordResult {
  wordId: string
  isCorrect: boolean
}

interface QuizResults {
  correct: number
  total: number
  xpEarned: number
  wordResults: WordResult[]
}

interface SessionResponse {
  session: { id: string }
  newAchievements: Achievement[]
  totalXp: number
}

export default function QuizPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const level = parseInt(searchParams.get('level') ?? '1')
  const defaultCount = parseInt(searchParams.get('count') ?? '10')

  const [sessionCount, setSessionCount] = useState(defaultCount)
  const [started, setStarted] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPinyin, setShowPinyin] = useState(true)
  const [results, setResults] = useState<QuizResults | null>(null)
  const [sessionData, setSessionData] = useState<SessionResponse | null>(null)
  const [toastQueue, setToastQueue] = useState<Achievement[]>([])
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    if (!started) return
    async function fetchExercises() {
      setLoading(true)
      try {
        const res = await fetch(`/api/exercises?level=${level}&count=${sessionCount}`)
        if (!res.ok) throw new Error('Failed to fetch exercises')
        const data = await res.json()
        setExercises(data)
        setStartTime(Date.now())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchExercises()
  }, [level, sessionCount, started])

  const handleComplete = useCallback(
    async (quizResults: QuizResults) => {
      setResults(quizResults)
      const durationMs = Date.now() - startTime
      const accuracy = quizResults.total > 0
        ? Math.round((quizResults.correct / quizResults.total) * 100)
        : 0

      try {
        const res = await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level,
            mode: 'quiz',
            xpEarned: quizResults.xpEarned,
            wordsStudied: quizResults.total,
            accuracy,
            durationMs,
            wordResults: quizResults.wordResults,
          }),
        })
        if (res.ok) {
          const data: SessionResponse = await res.json()
          setSessionData(data)
          if (data.newAchievements?.length > 0) {
            setToastQueue(data.newAchievements)
          }
        }
      } catch {
        // Session save failure is non-fatal
      }
    },
    [level, startTime]
  )

  function dismissToast() {
    setToastQueue((prev) => prev.slice(1))
  }

  function handlePlayAgain() {
    setResults(null)
    setSessionData(null)
    setToastQueue([])
    setExercises([])
    setStarted(false)
  }

  const accuracy = results
    ? results.total > 0
      ? Math.round((results.correct / results.total) * 100)
      : 0
    : 0

  // Achievement toast overlay
  const currentToast = toastQueue[0]

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {currentToast && (
          <AchievementToast
            key={currentToast.id}
            achievement={currentToast}
            onDismiss={dismissToast}
          />
        )}
      </AnimatePresence>

      {/* Pre-quiz: count selector */}
      {!started && !results && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm flex flex-col items-center gap-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-zinc-900">HSK {level} Practice</h1>
            <p className="text-sm text-zinc-500 mt-1">Words are chosen based on your progress</p>
          </div>

          <div className="w-full bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <p className="text-sm font-semibold text-zinc-700 mb-3">Words per session</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {[5, 10, 20, 30, 50].map((n) => (
                <button
                  key={n}
                  onClick={() => setSessionCount(n)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-semibold border transition-colors',
                    sessionCount === n
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={150}
                value={sessionCount}
                onChange={(e) => setSessionCount(parseInt(e.target.value))}
                className="flex-1 accent-indigo-600"
              />
              <span className="w-8 text-sm font-bold text-zinc-700 text-right">{sessionCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setShowPinyin((v) => !v)}
              className={cn(
                'flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-colors',
                showPinyin
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-500'
              )}
            >
              Pinyin: {showPinyin ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setStarted(true)}
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors active:scale-95"
            >
              Start →
            </button>
          </div>
        </motion.div>
      )}

      {/* Loading */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-sm text-zinc-500 font-medium">Loading exercises…</p>
        </motion.div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-base font-semibold text-red-600">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {/* Quiz in progress */}
      {!loading && !error && !results && exercises.length > 0 && (
        <div className="w-full max-w-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-zinc-900">HSK {level} Practice</h1>
              <p className="text-sm text-zinc-500 mt-0.5">{sessionCount} words</p>
            </div>
            <span className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold border',
              showPinyin ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-zinc-100 border-zinc-200 text-zinc-400'
            )}>
              {showPinyin ? 'Pinyin ON' : 'Pinyin OFF'}
            </span>
          </div>
          <ExerciseContainer exercises={exercises} onComplete={handleComplete} showPinyin={showPinyin} />
        </div>
      )}

      {/* Results screen */}
      {results && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-sm flex flex-col items-center gap-6"
        >
          {/* Trophy */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="text-7xl"
          >
            {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '🎯' : '💪'}
          </motion.div>

          <h2 className="text-2xl font-extrabold text-zinc-900 text-center">
            {accuracy >= 80 ? 'Excellent work!' : accuracy >= 50 ? 'Good effort!' : 'Keep practicing!'}
          </h2>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="flex flex-col items-center rounded-2xl bg-white border border-zinc-100 shadow-sm px-3 py-4 gap-1">
              <Target className="h-5 w-5 text-indigo-500" />
              <span className="text-2xl font-extrabold text-zinc-900">{accuracy}%</span>
              <span className="text-xs text-zinc-400 text-center">Accuracy</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white border border-zinc-100 shadow-sm px-3 py-4 gap-1">
              <Trophy className="h-5 w-5 text-emerald-500" />
              <span className="text-2xl font-extrabold text-zinc-900">
                {results.correct}/{results.total}
              </span>
              <span className="text-xs text-zinc-400 text-center">Correct</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white border border-zinc-100 shadow-sm px-3 py-4 gap-1">
              <Zap className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-extrabold text-zinc-900">
                {sessionData ? sessionData.totalXp.toLocaleString() : results.xpEarned}
              </span>
              <span className="text-xs text-zinc-400 text-center">XP earned</span>
            </div>
          </div>

          {/* New achievements */}
          {sessionData && sessionData.newAchievements.length > 0 && (
            <div className="w-full rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
                New Achievements
              </p>
              <div className="flex flex-col gap-2">
                {sessionData.newAchievements.map((a) => (
                  <div key={a.id} className="flex items-center gap-3">
                    <span className="text-2xl">{a.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{a.title}</p>
                      <p className="text-xs text-zinc-500">{a.description}</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-amber-600">
                      +{a.xpReward} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handlePlayAgain}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 transition-colors active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-zinc-200 bg-white px-6 py-3.5 text-base font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors active:scale-95"
            >
              <Home className="h-4 w-4" />
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
