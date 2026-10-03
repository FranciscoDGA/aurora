import type { MetadataRoute } from 'next'

// Configure NEXT_PUBLIC_APP_URL no painel da Vercel (domínio real de produção).
const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
