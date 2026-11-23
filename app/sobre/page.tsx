import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Scale, HeartHandshake, ShieldCheck, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Sobre a Aurora — Direitos da Mulher com Clareza',
  description: 'Conheça o propósito da Aurora, uma plataforma voltada a apoiar mulheres na organização de informações e no entendimento de seus direitos fundamentais.',
}

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs sm:text-sm text-aurora-700 shadow-sm">
            <Scale size={16} aria-hidden="true" /> Apoio independente aos direitos das mulheres
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Sobre a Aurora</h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Nascemos com um objetivo claro: transformar o medo e a desinformação em organização, acolhimento e caminhos possíveis.
          </p>
        </div>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-aurora-700 flex items-center gap-2">
              <HeartHandshake aria-hidden="true" /> Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-neutral-700 text-base sm:text-lg leading-relaxed">
            <p>
              A <strong>Aurora</strong> é uma plataforma independente projetada para auxiliar mulheres a organizarem suas histórias e informações antes de buscarem o sistema de justiça ou assistência jurídica no Brasil.
            </p>
            <p>
              Muitas mulheres enfrentam barreiras como termos jurídicos complexos, custos iniciais e o cansaço emocional de vivenciar conflitos familiares, falta de pensão para os filhos ou violência doméstica. A Aurora ajuda a estruturar os fatos com acolhimento, apontando os caminhos da legislação e preparando rascunhos de minutas-base para facilitar o atendimento com a Defensoria Pública ou com uma advogada de sua confiança.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="text-aurora-600" size={20} aria-hidden="true" />
                Como a Aurora apoia você
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 text-sm sm:text-base">
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>Triagem acolhedora:</strong> Organiza os principais pontos do seu relato sem termos complicados e sem julgamentos.</li>
                <li><strong>Minutas de documentos-base:</strong> Gera rascunhos iniciais de petições e declarações estruturadas para acelerar a análise profissional.</li>
                <li><strong>Orientações práticas:</strong> Apresenta listas de documentos recomendados e links oficiais para contato com a Defensoria Pública do seu estado.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <AlertTriangle className="text-amber-600" size={20} aria-hidden="true" />
                Limites Éticos e Legais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 text-sm sm:text-base">
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>Não somos escritório de advocacia:</strong> A Aurora não presta consultoria jurídica individualizada nem atua como procuradora perante a justiça.</li>
                <li><strong>Revisão obrigatória:</strong> Todas as minutas geradas devem ser analisadas, adaptadas e assinadas por uma defensora pública ou advogada habilitada na OAB antes de qualquer protocolo judicial.</li>
                <li><strong>Não somos socorro emergencial:</strong> Em situações de risco ou violência em andamento, procure ajuda imediata ligando para <strong>190</strong> (Polícia Militar) ou <strong>180</strong> (Central da Mulher).</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
          <h2 className="text-2xl font-bold mb-3 text-neutral-900">Deseja dar o primeiro passo?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Conheça as opções para a sua situação com total respeito à sua privacidade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/triagem">
              <Button size="lg" className="w-full sm:w-auto">Fazer triagem informativa</Button>
            </Link>
            <Link href="/checklist">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Ver checklist da Defensoria</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
