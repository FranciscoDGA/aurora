import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Aurora — Seus Direitos, Claros',
  description: 'Navegadora de direitos da mulher. Divórcio, pensão, guarda, medida protetiva — documentos jurídicos em minutos, sem advogado.',
  keywords: ['direitos da mulher', 'divórcio', 'pensão alimentícia', 'guarda', 'medida protetiva', 'jurídico'],
  authors: [{ name: 'Aurora Direitos da Mulher' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Aurora — Seus Direitos, Claros',
    description: 'Documentos jurídicos personalizados para mulheres em minutos. WhatsApp, gratuito, seguro.',
    type: 'website',
    locale: 'pt_BR',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurora — Seus Direitos, Claros',
    description: 'Documentos jurídicos personalizados para mulheres em minutos.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}