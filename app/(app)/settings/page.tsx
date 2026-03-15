'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { FLAGS } from '@/lib/flags'

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Account */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Account</h2>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </section>

      {/* Subscription */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Subscription</h2>
        {FLAGS.STRIPE_ENABLED ? (
          <div>
            <p className="text-gray-600">Manage your subscription here.</p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">🎉 Alpha Access — Free!</p>
            <p className="text-green-700 text-sm mt-1">
              You have full access during the alpha period. Premium plans will launch soon.
            </p>
          </div>
        )}
      </section>

      {/* About */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">About</h2>
        <p className="text-gray-600 text-sm">HSK Tutor — Alpha Version</p>
        <p className="text-gray-500 text-sm">
          An adaptive learning platform for HSK Chinese proficiency exams.
        </p>
      </section>
    </div>
  )
}
