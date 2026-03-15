import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { username } = await request.json()

  if (!username || typeof username !== 'string' || username.length < 3) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 })
  }

  const dbUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.email!,
      username,
    },
  })

  return NextResponse.json(dbUser)
}
