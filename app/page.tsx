import HomeClient from '@/components/home-client'

export const metadata = {
  title: 'Aurora — Informação e Direitos da Mulher',
  description: 'Plataforma de orientação geral e organização de documentos-base voltada aos direitos das mulheres: pensão, divórcio, guarda, proteção e trabalho.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <HomeClient />
}
