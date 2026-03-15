import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'HSK Tutor – Master Mandarin. Beat the Test.',
  description:
    'Adaptive Mandarin learning app for HSK 1–6. Flashcards, quizzes, daily challenges, and a global leaderboard.',
  keywords: ['HSK', 'Mandarin', 'Chinese', 'language learning', 'flashcards'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
