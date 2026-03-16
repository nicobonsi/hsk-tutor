'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  Trophy,
  Users,
  User,
  Flame,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  user: {
    username: string
    hskLevel: number
    xp: number
    streakDays: number
    avatarUrl?: string | null
  }
}

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/practice/quiz', label: 'Practice', icon: Zap },
  { href: '/challenge', label: 'Daily Challenge', icon: Trophy },
  { href: '/leaderboard', label: 'Leaderboard', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
]

const LEVEL_COLORS: Record<number, string> = {
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-yellow-500',
  4: 'bg-orange-500',
  5: 'bg-red-600',
  6: 'bg-purple-700',
}

const XP_PER_LEVEL = 1000

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const xpInCurrentLevel = user.xp % XP_PER_LEVEL
  const xpProgress = Math.min((xpInCurrentLevel / XP_PER_LEVEL) * 100, 100)
  const levelColor = LEVEL_COLORS[user.hskLevel] ?? 'bg-gray-500'

  return (
    <aside className="flex flex-col h-full bg-white border-r border-gray-100 w-64">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <span className="chinese-char text-2xl font-black text-red-600 group-hover:text-red-700 transition-colors">
            汉
          </span>
          <span className="text-lg font-bold text-gray-900">HSK Tutor</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon
                className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-red-600' : 'text-gray-400')}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-gray-100">
        {/* Streak */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
          <span className="text-sm font-semibold text-gray-700">
            {user.streakDays} day streak
          </span>
        </div>

        {/* XP progress */}
        <div className="px-1 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500 font-medium">
              {xpInCurrentLevel.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP
            </span>
            <span className="text-xs text-gray-400">{Math.round(xpProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* User pill */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 group">
          <div className="relative flex-shrink-0">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next-auth/no-html-link-for-pages
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm uppercase">
                {user.username.slice(0, 1)}
              </div>
            )}
            <span
              className={cn(
                'absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center',
                levelColor
              )}
            >
              {user.hskLevel}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">{user.username}</p>
            <p className="text-xs text-gray-400">{user.xp.toLocaleString()} XP total</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
