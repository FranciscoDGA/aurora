import type { MetadataRoute } from 'next'
import { APP_URL } from '@/lib/site'

const AI_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
]

const DISALLOW_PRIVATE = ['/api/', '/dashboard', '/login', '/cadastro', '/casos']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_PRIVATE,
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: DISALLOW_PRIVATE,
      })),
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}
