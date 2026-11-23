import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ShieldCheck, Lock, FileText, Server, UserCheck, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidade | Aurora',
  description: 'Saiba com total transparência técnica como a Aurora coleta, utiliza, armazena e protege seus dados, em conformidade com a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs sm:text-sm text-aurora-700 shadow-sm">
            <ShieldCheck size={16} aria-hidden="true" /> Transparência e Conformidade LGPD (Lei nº 13.709/2018)
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Política de Privacidade
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            A proteção das suas informações e a segurança da sua história são tratadas com total transparência técnica e respeito aos seus direitos.
          </p>
          <p className="text-xs text-muted-foreground">Última atualização: Novembro de 2026</p>
        </div>

        <div className="grid gap-6">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <FileText className="text-aurora-600" size={20} aria-hidden="true" />
                1. Quais dados são coletados e para quais finalidades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>Ao utilizar a triagem sem cadastro:</strong> O relato inserido é processado temporariamente em memória para classificar preliminarmente o tema e sugerir passos. Se você não criar uma conta ou não salvar o caso, o texto do relato não é persistido no banco de dados.
              </p>
              <p>
                <strong>Ao criar uma conta:</strong> Coletamos nome (ou como prefere ser chamada), e-mail e senha (armazenada de forma protegida por hash criptográfico através do serviço de autenticação).
              </p>
              <p>
                <strong>Ao salvar casos e gerar minutas:</strong> Armazenamos o relato da situação, as respostas às perguntas de esclarecimento e as minutas-base geradas para que você possa acessá-las e editá-las no seu painel.
              </p>
              <p className="p-3 bg-amber-50 rounded-lg text-xs text-amber-900 font-medium">
                Princípio da Minimização: Orientamos as usuárias a não incluírem dados identificadores desnecessários (como CPF, números de contas, documentos com fotos ou endereços residenciais exatos) na etapa de relato preliminar.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <Server className="text-aurora-600" size={20} aria-hidden="true" />
                2. Provedores de infraestrutura e compartilhamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 leading-relaxed text-sm sm:text-base">
              <p>A Aurora não comercializa, aluga ou compartilha seus dados pessoais para publicidade. Os dados trafegam e são processados estritamente pelos seguintes operadores essenciais:</p>
              <ul className="list-disc ml-5 space-y-1.5 text-sm">
                <li><strong>Supabase Inc.:</strong> Provedor de banco de dados (PostgreSQL) e autenticação de usuários, com servidores em nuvem seguros e regras de isolamento lógico de contas.</li>
                <li><strong>Kiwify Tecnologia:</strong> Plataforma de processamento de pagamentos para usuárias que optam por planos pagos (Aurora+). Os dados bancários ou de cartão são tratados diretamente pela Kiwify sob padrões PCI-DSS; a Aurora não armazena dados de cartão de crédito.</li>
                <li><strong>Processamento de Triagem:</strong> A classificação preliminar é executada por algoritmo interno de correspondência de regras jurídicas em nossos servidores. Relatos não são enviados a provedores externos de inteligência artificial sem seu consentimento expresso.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <Lock className="text-aurora-600" size={20} aria-hidden="true" />
                3. Medidas de segurança e limites técnicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>Criptografia em trânsito (HTTPS / TLS):</strong> Todas as comunicações entre o seu navegador e a plataforma são protegidas por protocolos modernos de TLS/HTTPS, impedindo a interceptação de dados na rede. <em>(Nota de transparência: HTTPS protege a conexão em trânsito, não constituindo &ldquo;criptografia de ponta a ponta&rdquo;).</em>
              </p>
              <p>
                <strong>Isolamento de dados (Row Level Security - RLS):</strong> O banco de dados utiliza políticas ativas que garantem que apenas a usuária autenticada com seu próprio login e senha consiga consultar ou alterar seus casos e minutas geradas.
              </p>
              <p>
                <strong>Segurança no dispositivo da usuária:</strong> Se você estiver em situação de vulnerabilidade e houver risco de alguém inspecionar o seu celular ou computador, recomendamos navegar em modo anônimo, limpar o histórico após o uso e utilizar o botão de &ldquo;Saída Rápida&rdquo; disponível no topo da plataforma.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <UserCheck className="text-aurora-600" size={20} aria-hidden="true" />
                4. Seus direitos sob a LGPD e exclusão de dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-neutral-700 leading-relaxed text-sm sm:text-base">
              <p>Nos termos do artigo 18 da LGPD, você pode, a qualquer momento:</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Confirmar a existência de tratamento e solicitar cópia dos seus dados cadastrados;</li>
                <li>Solicitar a correção de dados incompletos ou inexatos;</li>
                <li>Requerer a exclusão da sua conta e dos casos salvos no sistema.</li>
              </ul>
              <p className="text-sm">
                <strong>Como solicitar exclusão:</strong> Você pode solicitar a remoção da sua conta enviando mensagem para nossa equipe de atendimento em <Link href="/contato" className="text-aurora-700 underline font-semibold">Página de Contato</Link>. Ao solicitar a exclusão, seus dados são removidos das tabelas ativas da aplicação.
              </p>
              <p className="text-xs text-muted-foreground">
                Nota técnica sobre backups e registros: Registros de acesso à aplicação (IP, data e hora) são mantidos pelo prazo legal de 6 meses em cumprimento ao Marco Civil da Internet (Lei nº 12.965/2014, art. 15). Backups do banco de dados são rotacionados periodicamente e substituídos de forma técnica e automática.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-900 flex items-center gap-2">
                <AlertTriangle className="text-rose-600" size={20} aria-hidden="true" />
                5. Não substituição de atendimento emergencial ou advocatício
              </CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-700 leading-relaxed text-sm sm:text-base">
              <p>
                A Aurora não é um canal de emergência pública, polícia ou socorro imediato. Em caso de perigo imediato à integridade física, ligue <strong>190</strong> (Polícia Militar) ou <strong>180</strong> (Central de Atendimento à Mulher). A plataforma também não presta assessoria jurídica individual nem atua como procuradora perante os tribunais.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4 text-sm">Dúvidas ou solicitações sobre o tratamento dos seus dados?</p>
          <Link href="/contato" className="text-aurora-700 font-semibold hover:underline">
            Fale com nossa equipe pelo canal de contato e suporte
          </Link>
        </div>
      </div>
    </div>
  )
}
