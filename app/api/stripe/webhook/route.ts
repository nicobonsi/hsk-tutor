import { NextRequest, NextResponse } from 'next/server'
import { FLAGS } from '@/lib/flags'

export async function POST(request: NextRequest) {
  if (!FLAGS.STRIPE_ENABLED) {
    return NextResponse.json({ message: 'Stripe disabled in alpha' }, { status: 200 })
  }

  // Stripe webhook handling will be implemented when STRIPE_ENABLED=true
  return NextResponse.json({ received: true })
}
