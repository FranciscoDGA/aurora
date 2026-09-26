import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, AlertTriangle, Users } from 'lucide-react'

export const metadata = {
  title: 'Contato | Clara',
  description: 'Fale com a equipe da Clara para tirar dúvidas, sugerir melhorias ou propor parcerias.',
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-clara-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Contato</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para ajudar você a navegar por seus direitos. Escolha o melhor canal abaixo para falar com a nossa equipe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <MessageCircle className="text-clara-600" />
                Suporte via WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-700">
              <p>Dúvidas sobre a plataforma, planos ou como gerar seus documentos? Mande uma mensagem e nossa equipe ajudará o mais rápido possível.</p>
              {WHATSAPP ? (
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                  <Button className="w-full sm:w-auto">Chamar no WhatsApp</Button>
                </a>
              ) : (
                <p className="text-sm bg-neutral-100 p-3 rounded-md text-neutral-600">Canal em implantação no momento.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <Mail className="text-clara-600" />
                Atendimento por E-mail
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-700">
              <p>Prefere e-mail ou quer tratar sobre cancelamentos, estornos e LGPD? Escreva para nós. Respondemos em até 24 horas úteis.</p>
              <div className="bg-neutral-100 p-3 rounded-md">
                <strong className="text-neutral-900">oi@clara.direito.br</strong>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <Users className="text-clara-600" />
                Parcerias Institucionais
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-700">
              <p>Trabalha em Defensorias, ONGs, coletivos femininos ou escritórios e quer levar a Clara para mais mulheres? Nós adoraríamos conversar! Envie um e-mail para <strong>oi@clara.direito.br</strong> com o assunto "Parceria Institucional".</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-rose-50 border border-rose-200 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center md:items-start text-rose-900">
          <AlertTriangle className="text-rose-600 shrink-0 mt-1" size={28} />
          <div>
            <h3 className="font-bold text-lg mb-1">Situação de Emergência?</h3>
            <p className="text-rose-800 leading-relaxed">
              A Clara não é um canal de emergência ou denúncia ativa. Se você está correndo risco agora mesmo, ligue imediatamente para <strong>190</strong> (Polícia Militar) ou <strong>180</strong> (Central de Atendimento à Mulher). Sua vida e segurança vêm em primeiro lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
