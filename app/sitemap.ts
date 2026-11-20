import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog'
import { APP_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ['', '/triagem', '/blog', '/checklist', '/sobre', '/contato', '/privacidade', '/termos-de-uso']
  const agora = new Date()

  return [
    ...estaticas.map((r) => ({
      url: `${APP_URL}${r || '/'}`,
      lastModified: agora,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : 0.8,
    })),
    ...POSTS.map((p) => ({
      url: `${APP_URL}/blog/${p.slug}`,
      lastModified: new Date(p.data),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
