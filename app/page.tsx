import HomeClient from '@/components/home-client'

export const metadata = {
  title: 'Guia Clara — Seus Direitos, Claros',
  description: 'Navegadora de direitos da mulher. Divórcio, pensão, guarda, medida protetiva — documentos jurídicos em minutos, sem advogado.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <HomeClient />
}
