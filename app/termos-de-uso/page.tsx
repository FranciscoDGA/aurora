import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Termos de Uso | Aurora',
  description: 'Regras de uso da plataforma Aurora: escopo informativo, contas, planos, documentos-base e responsabilidades.',
}

const SECOES = [
  {
    t: '1. Propósito da Plataforma',
    d: 'A Aurora é uma plataforma de organização da informação e auxílio na preparação de documentos-base sobre direitos das mulheres. A plataforma não é escritório de advocacia nem presta consultoria jurídica individualizada. O uso da ferramenta não estabelece relação de mandato advocatício ou cliente-advogado.',
  },
  {
    t: '2. Contas e Acesso Seguro',
    d: 'Para salvar casos e consultar minutas elaboradas, a usuária cria uma conta pessoal com e-mail e senha. A usuária é responsável pela veracidade das informações inseridas e pela guarda confidencial de suas credenciais. É proibido compartilhar acesso a contas com terceiros sem autorização.',
  },
  {
    t: '3. Natureza dos Documentos-Base',
    d: 'As minutas e modelos gerados são documentos-base preliminares. É dever da usuária submeter essas peças à revisão técnica de uma defensora pública ou de uma advogada devidamente habilitada na OAB antes de qualquer apresentação em juízo. A Aurora não garante a procedência, deferimento de liminares ou qualquer resultado judicial em processos.',
  },
  {
    t: '4. Situações de Urgência e Emergência',
    d: 'A Aurora não presta serviço de resgate, monitoramento ou intervenção policial emergencial. Caso você ou alguém próximo esteja sob ameaça iminente ou agressão, interrompa o uso da plataforma e ligue imediatamente para 190 (Polícia Militar) ou 180 (Central de Atendimento à Mulher).',
  },
  {
    t: '5. Planos, Assinaturas e Cancelamento',
    d: 'O plano Gratuito disponibiliza 1 caso ativo e geração de até 2 documentos-base por mês. O plano Aurora+ disponibiliza recursos ampliados mediante assinatura com cobrança recorrente mensal processada pela Kiwify. O cancelamento pode ser solicitado a qualquer momento antes do próximo ciclo de renovação, assegurados os direitos previstos no Código de Defesa do Consumidor.',
  },
  {
    t: '6. Regras de Uso Aceitável',
    d: 'É vedado utilizar a plataforma para fins ilícitos, falsidade ideológica, cadastramento de dados de terceiros sem a devida autorização, ataques de força bruta, tentativas de violação da segurança dos sistemas ou comercialização não autorizada de minutas geradas.',
  },
]

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Termos de Uso</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as diretrizes, direitos e responsabilidades para a utilização da plataforma Aurora.
          </p>
          <p className="text-xs text-muted-foreground">Última atualização: Novembro de 2026</p>
        </div>

        <div className="grid gap-6">
          {SECOES.map((s) => (
            <Card key={s.t} className="border-0 shadow-sm bg-white">
              <CardHeader><CardTitle className="text-xl text-neutral-900">{s.t}</CardTitle></CardHeader>
              <CardContent><p className="text-neutral-700 leading-relaxed text-sm sm:text-base">{s.d}</p></CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-neutral-200">
          <p className="text-muted-foreground text-sm space-x-4">
            <Link href="/privacidade" className="font-semibold text-aurora-700 hover:underline">Política de Privacidade (LGPD)</Link>
            <span>•</span>
            <Link href="/sobre" className="font-semibold text-aurora-700 hover:underline">Sobre a Aurora</Link>
            <span>•</span>
            <Link href="/contato" className="font-semibold text-aurora-700 hover:underline">Fale Conosco</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
