import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      {/* Brand header */}
      <header className="pt-8 pb-4 flex justify-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="chinese-char text-3xl font-black text-red-600 group-hover:text-red-700 transition-colors">
            汉
          </span>
          <span className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
            HSK Tutor
          </span>
        </Link>
      </header>

      {/* Page content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} HSK Tutor. All rights reserved.
      </footer>
    </div>
  )
}
