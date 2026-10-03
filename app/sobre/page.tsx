import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Sobre a Aurora — Seus Direitos, Claros',
  description: 'Conheça a história e o propósito da Aurora, a navegadora de direitos da mulher criada para democratizar o acesso à justiça no Brasil.',
}

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Sobre a Aurora</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Nascemos com um propósito claro: transformar o medo e a desinformação em poder e ação.
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-aurora-700">A Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-neutral-700 text-lg leading-relaxed">
            <p>
              A Aurora é uma <strong>navegadora de direitos da mulher</strong>. Uma plataforma legal tech projetada para democratizar o acesso à justiça no Brasil. Traduzimos histórias reais, contadas com palavras do dia a dia, em triagens jurídicas precisas, documentos-base e um passo a passo prático para protocolar ações na Defensoria Pública ou com uma advogada.
            </p>
            <p>
              Sabemos que o sistema judiciário pode ser frio, caro e inacessível. Milhões de mulheres deixam de lutar por seus direitos — como pensão alimentícia justa, guarda dos filhos, proteção contra violência e estabilidade no trabalho — por falta de informação ou por esgotamento emocional. A Aurora existe para encurtar o caminho entre o problema e a solução.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900">O que a Aurora faz por você</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700">
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>Triagem acolhedora:</strong> Analisa seu caso sem julgamentos e sem juridiquês.</li>
                <li><strong>Geração de documentos:</strong> Cria minutas de petições iniciais prontas para revisão profissional.</li>
                <li><strong>Clareza no processo:</strong> Entrega um mapa exato do que você deve fazer a seguir e onde deve ir (Defensoria, Delegacia, etc).</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900">Limites Éticos e Legais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700">
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>A Aurora não é escritório de advocacia:</strong> Não representamos judicialmente nem prestamos consultoria particular.</li>
                <li><strong>Revisão necessária:</strong> Todos os documentos gerados precisam ser revisados e assinados por um profissional (Defensoria ou Advogada) antes do protocolo no fórum.</li>
                <li><strong>Não somos canal de emergência:</strong> Se você estiver em perigo imediato, ligue para 190 (Polícia) ou 180 (Central de Atendimento à Mulher).</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
          <h2 className="text-2xl font-bold mb-4">Pronta para assumir o controle?</h2>
          <p className="text-muted-foreground mb-6">
            Você não precisa conhecer a lei para buscar justiça. Conte-nos o que aconteceu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/triagem">
              <Button size="lg" className="w-full sm:w-auto">Fazer triagem gratuita</Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Falar com a equipe</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
