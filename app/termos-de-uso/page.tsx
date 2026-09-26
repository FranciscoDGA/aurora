import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Termos de Uso | Clara',
  description: 'Regras de uso da plataforma Clara: conta, planos, documentos-base e responsabilidades legais.',
}

const SECOES = [
  {
    t: '1. Propósito da Plataforma',
    d: 'A Clara é uma ferramenta de organização e informação jurídica. Traduzimos seus relatos em triagens, sugerimos os próximos passos e geramos modelos base de documentos legais. A Clara não é um escritório de advocacia, e o uso do nosso software não estabelece uma relação entre advogado e cliente.',
  },
  {
    t: '2. Contas e Segurança',
    d: 'Para usufruir da geração de documentos, você precisa criar uma conta. Você concorda em fornecer informações verdadeiras e é responsável por manter a confidencialidade da sua senha. Qualquer atividade na sua conta é de sua responsabilidade.',
  },
  {
    t: '3. Aviso Legal sobre Documentos',
    d: 'Os PDFs gerados são "documentos-base". Eles devem, obrigatoriamente, ser lidos e validados pela Defensoria Pública ou por uma advogada inscrita na OAB antes de serem protocolados no fórum. A Clara não garante o deferimento (aprovação) de nenhum pedido pelo juiz.',
  },
  {
    t: '4. Situações de Emergência',
    d: 'A Clara não é um serviço de resgate ou denúncia emergencial. Se você está em situação de risco iminente, pare de usar a plataforma e ligue imediatamente para 190 (Polícia Militar) ou 180 (Central de Atendimento à Mulher).',
  },
  {
    t: '5. Planos e Assinaturas',
    d: 'O plano Gratuito possui limites de casos e documentos estabelecidos na nossa página de planos. Os planos Clara Plus e Clara Pro são assinaturas recorrentes processadas via plataforma parceira (Kiwify). O cancelamento pode ser feito a qualquer momento, interrompendo a cobrança do mês seguinte.',
  },
  {
    t: '6. Regras de Conduta',
    d: 'É estritamente proibido usar a Clara para fraudar informações, gerar peças com dados de terceiros sem autorização (falsidade ideológica), aplicar engenharia reversa no nosso software ou revender os documentos gerados pela plataforma.',
  },
]

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-clara-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Termos de Uso</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Por favor, leia com atenção as regras de uso da plataforma. O acesso à Clara implica na concordância com estes termos.
          </p>
          <p className="text-sm text-muted-foreground">Última atualização: Setembro de 2026</p>
        </div>

        <div className="grid gap-6">
          {SECOES.map((s) => (
            <Card key={s.t} className="border-0 shadow-sm bg-white">
              <CardHeader><CardTitle className="text-xl text-neutral-900">{s.t}</CardTitle></CardHeader>
              <CardContent><p className="text-neutral-700 leading-relaxed text-lg">{s.d}</p></CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-neutral-200">
          <p className="text-muted-foreground text-sm space-x-4">
            <Link href="/privacidade" className="font-semibold text-clara-600 hover:underline">Política de Privacidade (LGPD)</Link>
            <span>•</span>
            <Link href="/sobre" className="font-semibold text-clara-600 hover:underline">Sobre a Clara</Link>
            <span>•</span>
            <Link href="/contato" className="font-semibold text-clara-600 hover:underline">Fale Conosco</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
