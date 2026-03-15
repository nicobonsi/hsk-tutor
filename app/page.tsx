import Link from 'next/link'
import { BookOpen, Zap, Trophy, Star } from 'lucide-react'

const HSK_LEVELS = [
  { level: 1, label: 'HSK 1', words: 150, color: 'bg-green-500' },
  { level: 2, label: 'HSK 2', words: 300, color: 'bg-blue-500' },
  { level: 3, label: 'HSK 3', words: 600, color: 'bg-yellow-500' },
  { level: 4, label: 'HSK 4', words: 1200, color: 'bg-orange-500' },
  { level: 5, label: 'HSK 5', words: 2500, color: 'bg-red-600' },
  { level: 6, label: 'HSK 6', words: 5000, color: 'bg-purple-700' },
]

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Adaptive Learning',
    description:
      'Our spaced-repetition engine surfaces the right words at exactly the right moment, so you learn faster and forget less.',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Gamified Progress',
    description:
      'Earn XP, maintain streaks, and unlock achievements as you climb from HSK 1 to HSK 6 mastery.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: Trophy,
    title: 'Global Leaderboard',
    description:
      'Compete with learners worldwide on weekly and all-time rankings. See where you stand and push higher.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="chinese-char text-2xl font-bold text-red-600">汉</span>
            <span className="text-lg font-bold text-gray-900">HSK Tutor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          {/* Alpha badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            Free Alpha Access – Limited Time
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-none mb-4">
            Master Mandarin.
            <br />
            <span className="text-red-600">Beat the Test.</span>
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-500 max-w-xl mx-auto">
            Adaptive flashcards, daily challenges, and a global leaderboard—all designed to take you
            from zero to HSK 6.
          </p>

          {/* Big Chinese characters */}
          <div className="mt-10 mb-10 flex justify-center">
            <div className="relative">
              <span className="chinese-char text-[10rem] sm:text-[14rem] font-black text-red-600 leading-none select-none text-shadow-sm opacity-90">
                你好
              </span>
              <span className="absolute -top-2 -right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full rotate-12">
                nǐ hǎo
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-200"
            >
              Start Learning Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* HSK Level badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {HSK_LEVELS.map(({ level, label, color }) => (
              <span
                key={level}
                className={`${color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}
              >
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-400">
            All 6 official HSK levels · {HSK_LEVELS.reduce((s, l) => s + l.words, 0).toLocaleString()}+ words
          </p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Everything you need to pass HSK
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Built for serious learners who want measurable results, not just entertainment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / stats strip */}
      <section className="py-16 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '9,750+', label: 'Vocabulary words' },
            { value: '6', label: 'HSK Levels' },
            { value: 'SRS', label: 'Spaced repetition' },
            { value: '100%', label: 'Free in alpha' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-red-400">{value}</p>
              <p className="mt-1 text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-red-50 to-white text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ready to start?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Join learners already mastering Mandarin with adaptive, science-backed practice.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 text-center text-sm text-gray-400">
        <p>
          <span className="chinese-char font-semibold text-red-600">汉字</span> HSK Tutor &copy;{' '}
          {new Date().getFullYear()} · Built for Mandarin learners worldwide
        </p>
      </footer>
    </div>
  )
}
