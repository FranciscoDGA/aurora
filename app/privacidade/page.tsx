import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidade | Clara',
  description: 'Saiba como a Clara coleta, utiliza e protege os seus dados pessoais, em conformidade com a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-clara-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">Política de Privacidade</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A sua segurança e o sigilo da sua história são a nossa maior prioridade. Saiba como cuidamos dos seus dados (LGPD).
          </p>
          <p className="text-sm text-muted-foreground">Última atualização: Setembro de 2026</p>
        </div>

        <div className="grid gap-6">
          {[
            {
              t: '1. Quais dados coletamos',
              d: 'Ao criar uma conta: nome, e-mail e senha (armazenada com forte criptografia). Ao relatar um caso: sua história em texto ou áudio, tipo de caso e as minutas geradas. Coletamos apenas o estritamente necessário para gerar os seus documentos.'
            },
            {
              t: '2. Para que usamos os seus dados',
              d: 'Utilizamos seus dados exclusivamente para prestar o serviço oferecido (triagem inteligente, geração de documentos e acompanhamento). Em hipótese alguma a Clara vende, aluga ou monetiza seus dados pessoais com terceiros.'
            },
            {
              t: '3. Isolamento rigoroso (Ninguém lê seu caso)',
              d: 'A plataforma possui uma arquitetura de segurança (Row Level Security) que garante que cada conta acesse única e exclusivamente os seus próprios casos e documentos. Seu relato é processado por nossos sistemas de IA de forma anônima e descartável.'
            },
            {
              t: '4. Compartilhamento necessário',
              d: 'Compartilhamos dados de forma segura apenas com provedores essenciais de infraestrutura (servidores em nuvem e provedor de pagamento, como a Kiwify) ou mediante ordem judicial.'
            },
            {
              t: '5. Os seus direitos (LGPD)',
              d: 'Você é dona dos seus dados. A qualquer momento, você pode solicitar a confirmação, o acesso, a correção ou a exclusão total e irrecuperável da sua conta e dos seus relatos enviando um e-mail para oi@clara.direito.br.'
            },
            {
              t: '6. Segurança e Criptografia',
              d: 'Toda a comunicação com a Clara é feita sob conexões criptografadas de ponta a ponta (HTTPS). Nossos bancos de dados seguem rígidos padrões internacionais de proteção.'
            }
          ].map((s) => (
            <Card key={s.t} className="border-0 shadow-sm bg-white">
              <CardHeader><CardTitle className="text-xl text-neutral-900">{s.t}</CardTitle></CardHeader>
              <CardContent><p className="text-neutral-700 leading-relaxed text-lg">{s.d}</p></CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Dúvidas sobre o tratamento dos seus dados?</p>
          <Link href="/contato" className="text-clara-600 font-semibold hover:underline">
            Fale com a nossa equipe de privacidade
          </Link>
        </div>
      </div>
    </div>
  )
}
