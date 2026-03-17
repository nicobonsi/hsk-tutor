import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { GraduationCap, ChevronRight } from 'lucide-react'

const LEVELS = [
  { level: 1, name: 'HSK 1', description: 'Basic greetings, introductions, numbers, daily life. 15 lessons.', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', textColor: 'text-emerald-600', borderColor: 'border-emerald-400', lessons: 15 },
  { level: 2, name: 'HSK 2', description: 'Elementary conversation, shopping, transport, family. 15 lessons.', color: 'bg-sky-500', bgLight: 'bg-sky-50', textColor: 'text-sky-600', borderColor: 'border-sky-400', lessons: 15 },
  { level: 3, name: 'HSK 3', description: 'Intermediate topics: travel, health, work. 20 lessons.', color: 'bg-violet-500', bgLight: 'bg-violet-50', textColor: 'text-violet-600', borderColor: 'border-violet-400', lessons: 20 },
  { level: 4, name: 'HSK 4', description: 'Upper-intermediate: opinions, culture, news. 20 lessons.', color: 'bg-amber-500', bgLight: 'bg-amber-50', textColor: 'text-amber-600', borderColor: 'border-amber-400', lessons: 20 },
  { level: 5, name: 'HSK 5', description: 'Advanced: literature, debate, complex situations. 36 lessons.', color: 'bg-rose-500', bgLight: 'bg-rose-50', textColor: 'text-rose-600', borderColor: 'border-rose-400', lessons: 36 },
  { level: 6, name: 'HSK 6', description: 'Mastery: abstract concepts, idioms, formal writing. 40 lessons.', color: 'bg-gray-700', bgLight: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-500', lessons: 40 },
]

export default async function LessonsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Lessons</h1>
      </div>
      <p className="text-gray-500 mb-8">
        Structured lessons from the HSK Standard Course textbook. Each lesson includes dialogues, grammar notes, and practice.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((lvl) => {
          const isAvailable = lvl.level === 1
          return (
            <div
              key={lvl.level}
              className={`group relative bg-white rounded-2xl border-2 p-6 flex flex-col gap-4 transition-all ${
                isAvailable
                  ? `${lvl.borderColor} hover:shadow-md cursor-pointer`
                  : 'border-gray-100 opacity-50'
              }`}
            >
              {!isAvailable && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  Coming soon
                </span>
              )}

              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${lvl.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {lvl.level}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{lvl.name}</h2>
                  <p className="text-xs text-gray-400">{lvl.lessons} lessons</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">{lvl.description}</p>

              {isAvailable ? (
                <Link
                  href={`/lessons/hsk${lvl.level}`}
                  className={`flex items-center justify-between ${lvl.textColor} font-semibold text-sm hover:underline group mt-auto`}
                >
                  View lessons
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <span className="text-xs text-gray-400 mt-auto">Content being added</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
