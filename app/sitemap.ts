import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog'

// Configure NEXT_PUBLIC_APP_URL no painel da Vercel (domínio real de produção).
const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ['', '/triagem', '/blog', '/checklist', '/login', '/cadastro']
  const agora = new Date()
  return [
    ...estaticas.map((r) => ({
      url: `${BASE}${r || '/'}`,
      lastModified: agora,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : 0.8,
    })),
    ...POSTS.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.data),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
