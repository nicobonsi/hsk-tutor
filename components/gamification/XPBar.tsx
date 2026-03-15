'use client'

import { motion } from 'framer-motion'
import { getAppRank, getXpProgressPercent, getXpToNextRank } from '@/lib/gamification/xp'
import { cn } from '@/lib/utils/cn'

interface XPBarProps {
  xp: number
  compact?: boolean
}

export default function XPBar({ xp, compact = false }: XPBarProps) {
  const rank = getAppRank(xp)
  const percent = getXpProgressPercent(xp)
  const toNext = getXpToNextRank(xp)

  if (compact) {
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-600">{rank.name}</span>
          <span className="text-xs font-medium text-zinc-400">{xp.toLocaleString()} XP</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full rounded-2xl bg-white border border-zinc-100 shadow-sm px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-base font-bold text-zinc-900">{rank.name}</span>
        </div>
        <span className="text-sm font-semibold text-indigo-600">
          {xp.toLocaleString()} XP
        </span>
      </div>

      {/* Bar */}
      <div className="relative h-3 w-full rounded-full bg-zinc-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">{percent}% to next rank</span>
        {toNext !== null ? (
          <span className="text-xs font-medium text-zinc-500">
            {toNext.toLocaleString()} XP to go
          </span>
        ) : (
          <span className="text-xs font-medium text-amber-600">Max rank reached!</span>
        )}
      </div>
    </div>
  )
}
