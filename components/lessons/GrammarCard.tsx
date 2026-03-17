type Example = {
  chinese: string
  pinyin: string
  english: string
}

type GrammarPoint = {
  id: string
  title: string
  explanation: string
  pattern: string | null
  examples: unknown
}

export function GrammarCard({ grammar }: { grammar: GrammarPoint }) {
  const examples = grammar.examples as Example[]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">{grammar.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">{grammar.explanation}</p>

      {grammar.pattern && (
        <div className="bg-indigo-50 rounded-lg px-3 py-2 mb-3 font-mono text-sm text-indigo-700">
          {grammar.pattern}
        </div>
      )}

      {examples.length > 0 && (
        <div className="flex flex-col gap-2">
          {examples.map((ex, i) => (
            <div key={i} className="border-l-2 border-gray-200 pl-3">
              <p className="text-base text-gray-900">{ex.chinese}</p>
              <p className="text-xs text-indigo-500">{ex.pinyin}</p>
              <p className="text-xs text-gray-500 italic">{ex.english}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
