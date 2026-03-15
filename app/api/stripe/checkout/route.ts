import { NextRequest, NextResponse } from 'next/server'
import { FLAGS } from '@/lib/flags'

export async function POST(request: NextRequest) {
  if (!FLAGS.STRIPE_ENABLED) {
    return NextResponse.json({ message: 'HSK Tutor is free during alpha!' }, { status: 200 })
  }

  // Stripe checkout session creation will be implemented post-alpha
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
