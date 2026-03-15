'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const STATUS_STYLES: Record<string, { border: string; bg: string; badge: string; badgeText: string; label: string }> = {
  new: {
    border: 'border-gray-200',
    bg: 'bg-white',
    badge: 'bg-gray-100',
    badgeText: 'text-gray-500',
    label: 'New',
  },
  learning: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100',
    badgeText: 'text-blue-700',
    label: 'Learning',
  },
  reviewing: {
    border: 'border-yellow-200',
    bg: 'bg-yellow-50',
    badge: 'bg-yellow-100',
    badgeText: 'text-yellow-700',
    label: 'Reviewing',
  },
  mastered: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    badge: 'bg-green-100',
    badgeText: 'text-green-700',
    label: 'Mastered',
  },
}

export interface WordData {
  id: string
  simplified: string
  traditional: string | null
  pinyin: string
  definitions: string[]
  status: string
}

function WordCard({ word }: { word: WordData }) {
  const [expanded, setExpanded] = useState(false)
  const style = STATUS_STYLES[word.status] ?? STATUS_STYLES.new

  return (
    <div
      className={cn(
        'rounded-2xl border-2 p-4 transition-all hover:shadow-md cursor-pointer flex flex-col gap-2',
        style.border,
        style.bg
      )}
      onClick={() => setExpanded((e) => !e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setExpanded((prev) => !prev)
        }
      }}
      aria-expanded={expanded}
    >
      {/* Character */}
      <div className="text-center">
        <p className="chinese-char text-4xl font-black text-gray-900 leading-tight">
          {word.simplified}
        </p>
        {word.traditional && word.traditional !== word.simplified && (
          <p className="chinese-char text-sm text-gray-400 mt-0.5">{word.traditional}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">{word.pinyin}</p>
      </div>

      {/* First definition */}
      <p className="text-xs text-gray-600 text-center line-clamp-2 leading-relaxed">
        {word.definitions[0] ?? '—'}
      </p>

      {/* Expanded definitions */}
      {expanded && word.definitions.length > 1 && (
        <div className="pt-2 border-t border-gray-200 space-y-1">
          {word.definitions.slice(1).map((def, i) => (
            <p key={i} className="text-xs text-gray-500">
              {i + 2}. {def}
            </p>
          ))}
        </div>
      )}

      {/* Footer: status + expand toggle */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span
          className={cn(
            'text-[10px] font-bold px-2 py-0.5 rounded-full',
            style.badge,
            style.badgeText
          )}
        >
          {style.label}
        </span>
        {word.definitions.length > 1 && (
          <span className="text-gray-400">
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default function WordCardGrid({
  words,
  levelColor,
}: {
  words: WordData[]
  levelColor: string
}) {
  const [filter, setFilter] = useState<string>('all')

  const statuses = ['all', 'new', 'learning', 'reviewing', 'mastered']

  const filtered =
    filter === 'all' ? words : words.filter((w) => w.status === filter)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {statuses.map((s) => {
          const isActive = filter === s
          const count = s === 'all' ? words.length : words.filter((w) => w.status === s).length
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors capitalize',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {s} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-12 text-sm text-gray-400">
          No words match this filter.
        </p>
      )}
    </div>
  )
}
