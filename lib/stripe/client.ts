import Stripe from 'stripe'
import { FLAGS } from '@/lib/flags'

export const stripe = FLAGS.STRIPE_ENABLED
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
  : null

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
    name: 'HSK Tutor Pro — Monthly',
    price: 9.99,
    currency: 'usd',
    interval: 'month',
  },
  yearly: {
    priceId: process.env.STRIPE_YEARLY_PRICE_ID,
    name: 'HSK Tutor Pro — Yearly',
    price: 79.99,
    currency: 'usd',
    interval: 'year',
  },
} as const
