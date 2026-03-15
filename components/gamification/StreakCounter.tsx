'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface StreakCounterProps {
  streakDays: number
  compact?: boolean
}

export default function StreakCounter({ streakDays, compact = false }: StreakCounterProps) {
  const isHot = streakDays >= 7

  const fireVariants = {
    idle: { scale: 1, rotate: 0 },
    pulse: {
      scale: [1, 1.15, 1, 1.1, 1],
      rotate: [-3, 3, -3, 3, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <motion.span
          className="text-xl leading-none"
          variants={fireVariants}
          animate={isHot ? 'pulse' : 'idle'}
        >
          🔥
        </motion.span>
        <span className="text-sm font-bold text-zinc-700">{streakDays}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border px-5 py-4',
        isHot
          ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
          : 'bg-white border-zinc-100 shadow-sm'
      )}
    >
      <motion.span
        className="text-3xl leading-none"
        variants={fireVariants}
        animate={isHot ? 'pulse' : 'idle'}
      >
        🔥
      </motion.span>
      <div className="flex flex-col">
        <span
          className={cn(
            'text-2xl font-extrabold leading-none',
            isHot ? 'text-orange-600' : 'text-zinc-900'
          )}
        >
          {streakDays}
          <span className="ml-1 text-sm font-semibold text-zinc-500">
            {streakDays === 1 ? 'day' : 'days'}
          </span>
        </span>
        <span className="text-xs text-zinc-400 mt-0.5">
          {isHot ? 'You are on fire! Keep going!' : 'Current streak'}
        </span>
      </div>
    </div>
  )
}
