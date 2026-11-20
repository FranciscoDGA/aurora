import { Inter } from 'next/font/google'
import { APP_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Guia Clara — Seus Direitos, Claros',
  description: 'Navegadora de direitos da mulher. Divórcio, pensão, guarda, medida protetiva — documentos jurídicos em minutos, sem advogado.',
  keywords: ['direitos da mulher', 'divórcio', 'pensão alimentícia', 'guarda', 'medida protetiva', 'jurídico'],
  authors: [{ name: 'Guia Clara — Direitos da Mulher' }],
  openGraph: {
    title: 'Guia Clara — Seus Direitos, Claros',
    description: 'Documentos jurídicos personalizados para mulheres em minutos. WhatsApp, gratuito, seguro.',
    type: 'website',
    locale: 'pt_BR',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia Clara — Seus Direitos, Claros',
    description: 'Documentos jurídicos personalizados para mulheres em minutos.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Guia Clara',
      url: APP_URL,
      logo: `${APP_URL}/apple-icon.png`,
      description: 'Plataforma brasileira de orientação jurídica acessível e geração de documentos-base.',
    },
    {
      '@type': 'WebSite',
      name: 'Guia Clara',
      url: APP_URL,
      inLanguage: 'pt-BR',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
