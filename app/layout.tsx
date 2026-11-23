import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { APP_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Aurora — Informação e Direitos da Mulher',
  description: 'Plataforma de orientação geral e organização de documentos-base voltada aos direitos das mulheres: pensão, divórcio, guarda, proteção e trabalho.',
  keywords: ['direitos da mulher', 'divórcio', 'pensão alimentícia', 'guarda', 'medida protetiva', 'defensoria pública'],
  authors: [{ name: 'Aurora — Direitos da Mulher' }],
  openGraph: {
    title: 'Aurora — Informação e Direitos da Mulher',
    description: 'Organize suas informações e conheça seus direitos com acolhimento, transparência e segurança.',
    type: 'website',
    locale: 'pt_BR',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurora — Informação e Direitos da Mulher',
    description: 'Organize suas informações e conheça seus direitos com acolhimento, transparência e segurança.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Aurora',
      url: APP_URL,
      logo: `${APP_URL}/apple-icon.png`,
      description: 'Plataforma brasileira de orientação e organização de documentos-base voltada aos direitos das mulheres.',
    },
    {
      '@type': 'WebSite',
      name: 'Aurora',
      url: APP_URL,
      inLanguage: 'pt-BR',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased selection:bg-aurora-100 selection:text-aurora-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
