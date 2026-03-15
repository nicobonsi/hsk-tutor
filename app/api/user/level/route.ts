import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { level } = await request.json()
  if (level < 1 || level > 6) return NextResponse.json({ error: 'Invalid level' }, { status: 400 })

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { hskLevel: level },
  })

  return NextResponse.json(updated)
}
