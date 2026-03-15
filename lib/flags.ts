export const FLAGS = {
  STRIPE_ENABLED: process.env.STRIPE_ENABLED === 'true',
  HSK_56_ENABLED: process.env.HSK_56_ENABLED === 'true',
  LEADERBOARD_REALTIME: process.env.NODE_ENV === 'production',
  ALPHA_MODE: true,
}
