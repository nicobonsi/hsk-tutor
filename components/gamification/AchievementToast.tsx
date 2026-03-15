'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface AchievementToastProps {
  achievement: {
    icon: string
    title: string
    description: string
    xpReward: number
  }
  onDismiss: () => void
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, y: -16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 80, y: -16 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="fixed top-5 right-5 z-50 w-80 rounded-2xl border border-amber-200 bg-white shadow-2xl overflow-hidden"
    >
      {/* Auto-dismiss progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-amber-400"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white">
          New Achievement Unlocked!
        </span>
        <button
          onClick={onDismiss}
          className="rounded-full p-0.5 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex items-start gap-4 px-4 py-4">
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 18 }}
          className="text-4xl leading-none shrink-0"
        >
          {achievement.icon}
        </motion.span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-zinc-900">{achievement.title}</p>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{achievement.description}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs">⚡</span>
            <span className="text-xs font-bold text-amber-600">+{achievement.xpReward} XP</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
