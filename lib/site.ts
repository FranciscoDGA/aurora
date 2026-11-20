const FALLBACK_URL = 'https://clara-zeta-rose.vercel.app'

export function getAppUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || '').trim().replace(/\/$/, '')
  if (!raw) return FALLBACK_URL
  try {
    return new URL(raw).origin
  } catch {
    return FALLBACK_URL
  }
}

export const APP_URL = getAppUrl()
