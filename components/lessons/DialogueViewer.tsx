'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type Turn = {
  speaker: string
  chinese: string
  pinyin: string
  english: string
}

export function DialogueViewer({ turns }: { turns: Turn[] }) {
  const [showPinyin, setShowPinyin] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)

  // Get unique speakers for color assignment
  const speakers = [...new Set(turns.map((t) => t.speaker))]
  const speakerColors = ['text-indigo-600 bg-indigo-50', 'text-rose-600 bg-rose-50', 'text-emerald-600 bg-emerald-50']

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Toggle bar */}
      <div className="flex gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50">
        <button
          onClick={() => setShowPinyin((v) => !v)}
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
            showPinyin ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {showPinyin ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          Pinyin
        </button>
        <button
          onClick={() => setShowEnglish((v) => !v)}
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
            showEnglish ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {showEnglish ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          English
        </button>
      </div>

      {/* Turns */}
      <div className="divide-y divide-gray-50">
        {turns.map((turn, i) => {
          const speakerIndex = speakers.indexOf(turn.speaker)
          const colorClass = speakerColors[speakerIndex % speakerColors.length]
          const isRight = speakerIndex % 2 === 1

          return (
            <div
              key={i}
              className={`px-4 py-3 flex gap-3 ${isRight ? 'flex-row-reverse' : ''}`}
            >
              <div className={`text-xs font-bold px-2 py-1 rounded-lg self-start flex-shrink-0 ${colorClass}`}>
                {turn.speaker}
              </div>
              <div className={`flex flex-col gap-0.5 ${isRight ? 'items-end' : ''}`}>
                <p className="text-lg font-medium text-gray-900">{turn.chinese}</p>
                {showPinyin && <p className="text-sm text-indigo-500">{turn.pinyin}</p>}
                {showEnglish && <p className="text-sm text-gray-500 italic">{turn.english}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
