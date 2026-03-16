import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data } = await supabase.auth.exchangeCodeForSession(code)

    if (data.user) {
      const existing = await prisma.user.findUnique({ where: { id: data.user.id }, select: { id: true } })
      if (!existing) {
        const username =
          (data.user.user_metadata?.username as string | undefined) ??
          data.user.email?.split('@')[0] ??
          'user'
        await prisma.user.create({
          data: { id: data.user.id, email: data.user.email!, username },
        }).catch(() => null) // ignore duplicate
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
