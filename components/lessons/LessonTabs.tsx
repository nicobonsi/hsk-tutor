'use client'

import { useState } from 'react'
import { DialogueViewer } from './DialogueViewer'
import { GrammarCard } from './GrammarCard'
import { CharacterCard } from './CharacterCard'
import { BookOpen, MessageSquare, BookMarked, Mic, PenLine, Globe } from 'lucide-react'

type Word = {
  id: string
  simplified: string
  traditional: string | null
  pinyin: string
  pinyinTones: string
  definitions: unknown
  tags: string[]
  level: number
}

type Dialogue = {
  id: string
  dialogueNumber: number
  title: string | null
  turns: unknown
}

type GrammarPoint = {
  id: string
  title: string
  explanation: string
  pattern: string | null
  examples: unknown
}

type PinyinDrill = {
  id: string
  type: string
  content: unknown
  order: number
}

type Character = {
  id: string
  character: string
  strokeCount: number | null
  componentsExplanation: string | null
  word: { pinyin: string } | null
}

type CultureNote = {
  id: string
  title: string
  content: string
}

type Lesson = {
  id: string
  title: string
  words: Word[]
  dialogues: Dialogue[]
  grammarPoints: GrammarPoint[]
  pinyinDrills: PinyinDrill[]
  characters: Character[]
  cultureNote: CultureNote | null
}

type Tab = 'vocab' | 'dialogues' | 'grammar' | 'pinyin' | 'characters' | 'culture'

const TAB_CONFIG: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'vocab', label: 'Vocabulary', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'dialogues', label: 'Dialogues', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'grammar', label: 'Grammar', icon: <BookMarked className="w-4 h-4" /> },
  { id: 'pinyin', label: 'Pinyin', icon: <Mic className="w-4 h-4" /> },
  { id: 'characters', label: 'Characters', icon: <PenLine className="w-4 h-4" /> },
  { id: 'culture', label: 'Culture', icon: <Globe className="w-4 h-4" /> },
]

export function LessonTabs({ lesson }: { lesson: Lesson }) {
  const visibleTabs = TAB_CONFIG.filter((t) => {
    if (t.id === 'vocab') return lesson.words.length > 0
    if (t.id === 'dialogues') return lesson.dialogues.length > 0
    if (t.id === 'grammar') return lesson.grammarPoints.length > 0
    if (t.id === 'pinyin') return lesson.pinyinDrills.length > 0
    if (t.id === 'characters') return lesson.characters.length > 0
    if (t.id === 'culture') return !!lesson.cultureNote
    return false
  })

  const [activeTab, setActiveTab] = useState<Tab>(visibleTabs[0]?.id ?? 'vocab')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'vocab' && <VocabTab words={lesson.words} />}
      {activeTab === 'dialogues' && <DialoguesTab dialogues={lesson.dialogues} />}
      {activeTab === 'grammar' && <GrammarTab grammarPoints={lesson.grammarPoints} />}
      {activeTab === 'pinyin' && <PinyinTab drills={lesson.pinyinDrills} />}
      {activeTab === 'characters' && <CharactersTab characters={lesson.characters} />}
      {activeTab === 'culture' && lesson.cultureNote && <CultureTab note={lesson.cultureNote} />}
    </div>
  )
}

function VocabTab({ words }: { words: Word[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {words.map((word) => {
        const defs = word.definitions as { meaning: string }[]
        return (
          <div key={word.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4">
            <span className="text-2xl font-bold text-gray-900 flex-shrink-0">{word.simplified}</span>
            <div>
              <p className="text-sm font-medium text-indigo-600">{word.pinyinTones}</p>
              <p className="text-sm text-gray-600">{defs?.[0]?.meaning}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DialoguesTab({ dialogues }: { dialogues: Dialogue[] }) {
  return (
    <div className="flex flex-col gap-6">
      {dialogues.map((d) => (
        <div key={d.id}>
          {d.title && <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{d.title}</h3>}
          <DialogueViewer turns={d.turns as { speaker: string; chinese: string; pinyin: string; english: string }[]} />
        </div>
      ))}
    </div>
  )
}

function GrammarTab({ grammarPoints }: { grammarPoints: GrammarPoint[] }) {
  return (
    <div className="flex flex-col gap-4">
      {grammarPoints.map((g) => <GrammarCard key={g.id} grammar={g} />)}
    </div>
  )
}

function PinyinTab({ drills }: { drills: PinyinDrill[] }) {
  return (
    <div className="flex flex-col gap-6">
      {drills.map((drill) => {
        const content = drill.content as { symbol: string; examples: { pinyin: string; character: string; meaning: string }[] }[]
        return (
          <div key={drill.id}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 capitalize">{drill.type}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-xl font-bold text-gray-900 mb-2 font-mono">{item.symbol}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.examples.map((ex, j) => (
                      <div key={j} className="text-center">
                        <p className="text-base font-medium text-indigo-600">{ex.pinyin}</p>
                        <p className="text-lg text-gray-900">{ex.character}</p>
                        <p className="text-xs text-gray-400">{ex.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CharactersTab({ characters }: { characters: Character[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((c) => <CharacterCard key={c.id} character={c} />)}
    </div>
  )
}

function CultureTab({ note }: { note: CultureNote }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <h3 className="text-base font-bold text-amber-900 mb-3">{note.title}</h3>
      <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-line">{note.content}</p>
    </div>
  )
}
