type Character = {
  id: string
  character: string
  strokeCount: number | null
  componentsExplanation: string | null
  word?: { pinyin: string } | null
}

export function CharacterCard({ character: c }: { character: Character }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-4xl font-bold text-gray-900">{c.character}</span>
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {c.word?.pinyin && (
          <p className="text-sm font-medium text-indigo-600">{c.word.pinyin}</p>
        )}
        {c.strokeCount && (
          <p className="text-xs text-gray-400">{c.strokeCount} strokes</p>
        )}
        {c.componentsExplanation && (
          <p className="text-xs text-gray-600 leading-relaxed">{c.componentsExplanation}</p>
        )}
      </div>
    </div>
  )
}
