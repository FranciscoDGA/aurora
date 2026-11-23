import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, MessageCircle, AlertTriangle, Users, PhoneCall, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Contato e Suporte | Aurora',
  description: 'Canais de suporte, atendimento a solicitações LGPD e parcerias institucionais da Aurora.',
}

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* NAVEGAÇÃO SUPERIOR */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-aurora-700 hover:underline">
            ← Voltar para a página inicial
          </Link>
          <Link href="/triagem">
            <Button size="sm" variant="outline">Fazer triagem informativa</Button>
          </Link>
        </div>

        {/* ALERTA DE EMERGÊNCIA — SEPARADO DO SUPORTE COMUM */}
        <div className="bg-rose-950 text-white rounded-2xl p-6 shadow-md border border-rose-900 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={24} aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold">Situação de Risco ou Emergência</h2>
              <p className="text-sm text-rose-100 mt-1 leading-relaxed">
                A Aurora não é um canal de socorro, resgate ou atendimento emergencial. Se você ou alguém próximo estiver sob violência ou ameaça agora mesmo, ligue imediatamente para os serviços públicos oficiais:
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-1 font-semibold text-sm">
            <a href="tel:190" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl transition-colors">
              <PhoneCall size={16} aria-hidden="true" /> Ligar 190 (Polícia Militar)
            </a>
            <a href="tel:180" className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-xl transition-colors">
              <PhoneCall size={16} aria-hidden="true" /> Ligar 180 (Central de Atendimento à Mulher)
            </a>
          </div>
        </div>

        {/* CABEÇALHO */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Contato e Suporte</h1>
          <p className="text-neutral-700 max-w-2xl mx-auto text-sm sm:text-base">
            Estamos à disposição para dúvidas sobre a plataforma, planos, sugestões ou pedidos relacionados à privacidade de dados.
          </p>
        </div>

        {/* CANAIS */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SUPORTE POR EMAIL */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <Mail className="text-aurora-600" size={20} aria-hidden="true" />
                Atendimento e Privacidade (E-mail)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 text-sm">
              <p>
                Para suporte com a plataforma, dúvidas sobre o plano Aurora+, solicitações de cancelamento ou exercício dos seus direitos de titular de dados (LGPD):
              </p>
              <div className="bg-neutral-100 p-3 rounded-lg font-mono text-sm text-neutral-900 font-semibold select-all">
                contato@aurora.app.br
              </div>
              <p className="text-xs text-muted-foreground">
                Responderemos à sua solicitação com a devida atenção assim que possível, em horário comercial.
              </p>
            </CardContent>
          </Card>

          {/* WHATSAPP — TRANSPARÊNCIA: EM IMPLANTAÇÃO */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <MessageCircle className="text-aurora-600" size={20} aria-hidden="true" />
                Canal WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 text-sm">
              <p>
                A triagem automatizada via WhatsApp encontra-se atualmente <strong>em fase de desenvolvimento e validação técnica</strong> para assegurar sigilo e estabilidade.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900">
                ⚠️ No momento, realize sua triagem informativa diretamente em nosso site oficial, de forma gratuita e segura.
              </div>
              <div className="pt-1">
                <Link href="/triagem">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Acessar triagem no site
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* PARCERIAS INSTITUCIONAIS */}
          <Card className="border-0 shadow-sm bg-white md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <Users className="text-aurora-600" size={20} aria-hidden="true" />
                Parcerias Institucionais e Projetos Sociais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-neutral-700 text-sm">
              <p>
                Você atua em uma Defensoria Pública, Núcleo de Prática Jurídica universitário, coletivo feminino ou ONG voltada aos direitos humanos das mulheres?
              </p>
              <p>
                A Aurora tem interesse contínuo em dialogar com a sociedade civil e órgãos públicos. Escreva para <strong>contato@aurora.app.br</strong> com o assunto &ldquo;Parceria Institucional&rdquo;.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
