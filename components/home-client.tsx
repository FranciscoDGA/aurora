'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PLANO_LABELS } from '@/lib/constants'
import {
  Scale, MessageCircle, FileText, ShieldCheck, Clock, Sparkles,
  Check, ChevronDown, HeartHandshake, Gavel, Baby, ArrowRight, Lock,
  PhoneCall, AlertTriangle, LogOut,
} from 'lucide-react'

const PASSOS = [
  {
    num: '01',
    icon: <MessageCircle className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'Você relata sua situação',
    d: 'Descreva o que aconteceu com suas próprias palavras, por texto ou áudio. Em um ambiente acolhedor e sem julgamentos.',
  },
  {
    num: '02',
    icon: <FileText className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'A Aurora organiza os pontos',
    d: 'A plataforma identifica possíveis temas jurídicos e prepara minutas-base para você levar para análise profissional.',
  },
  {
    num: '03',
    icon: <ShieldCheck className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'Você busca atendimento',
    d: 'Receba um checklist com documentos necessários e links oficiais para atendimento na Defensoria Pública ou com sua advogada.',
  },
]

const DIFERENCIAIS = [
  {
    t: 'Sem burocracia para se orientar',
    d: 'Entenda os caminhos possíveis sem custo inicial e sem juridiquês para saber por onde começar a defender seus direitos.',
  },
  {
    t: 'Agilidade para estruturar o relato',
    d: 'Triagem inicial e minutas organizadas para adiantar sua conversa com a defensora ou advogada que cuidará do seu caso.',
  },
  {
    t: 'Acesso gratuito para começar',
    d: '1 caso ativo e até 2 documentos-base por mês sem exigir cartão de crédito ou compromisso financeiro.',
  },
  {
    t: 'Desenvolvida com foco nas mulheres',
    d: 'Linguagem simples, acolhimento e atenção especial às situações de família, violência doméstica e direitos no trabalho.',
  },
]

const PERSONAS = [
  {
    icon: <HeartHandshake className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'Em divórcio ou separação',
    d: 'Separou ou deseja se separar e precisa organizar a divisão de bens, guarda dos filhos e convivência familiar.',
  },
  {
    icon: <Baby className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'Pensão alimentícia',
    d: 'Dificuldades no recebimento ou valor insuficiente. Entenda como comprovar os gastos das crianças e pedir alimentos.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'Em situação de violência',
    d: 'Ameaças, agressões ou perseguição. Apoio informativo para criar um plano de proteção e solicitar medida protetiva.',
  },
  {
    icon: <Gavel className="w-5 h-5 text-aurora-600" aria-hidden="true" />,
    t: 'Direitos no trabalho',
    d: 'Assédio moral, demissão durante a gravidez ou retorno da licença-maternidade explicados com clareza.',
  },
]

const PLANOS: Array<{ id: keyof typeof PLANO_LABELS; preco: string; destaque?: string; href?: string; disponivel: boolean }> = [
  { id: 'gratuito', preco: 'R$ 0', href: '/triagem', disponivel: true },
  { id: 'aurora_plus', preco: 'R$ 29,90/mês', destaque: 'Mais popular', href: 'https://pay.kiwify.com.br/MTsDC1d', disponivel: true },
  { id: 'aurora_pro', preco: 'Em breve', href: '#planos', disponivel: false },
]

const FAQ = [
  {
    q: 'Preciso de advogada ou Defensoria para usar a Aurora?',
    a: 'A Aurora auxilia a organizar as informações e estruturar documentos-base. Para dar entrada em processos judiciais, é indispensável a revisão e o protocolo por uma defensora pública (serviço gratuito) ou por uma advogada.',
  },
  {
    q: 'Os documentos gerados têm validade judicial imediata?',
    a: 'São peças-base (minutas) formatadas conforme o padrão técnico de fatos e pedidos. Elas servem de ponto de partida e precisam de validação profissional antes do protocolo em juízo.',
  },
  {
    q: 'O serviço é realmente gratuito?',
    a: 'Sim. Você pode realizar a triagem gratuitamente e manter 1 caso ativo com geração de até 2 documentos-base por mês, sem cadastrar cartão. O plano Aurora+ oferece casos e documentos adicionais.',
  },
  {
    q: 'Como meus dados e relatos são protegidos?',
    a: 'Suas informações trafegam via conexão criptografada (HTTPS) e são armazenadas com políticas de isolamento por usuário (Row Level Security no banco de dados). Cada pessoa só visualiza seus próprios registros.',
  },
  {
    q: 'Estou em perigo imediato. A Aurora pode me socorrer?',
    a: 'Não. A Aurora não é um serviço de resgate ou atendimento emergencial. Se você estiver sob ameaça ou risco iminente, ligue 190 (Polícia Militar) imediatamente ou 180 (Central de Atendimento à Mulher).',
  },
  {
    q: 'O serviço cobre todos os estados do Brasil?',
    a: 'As orientações e minutas baseiam-se na legislação federal (válida em todo o território nacional). Em nossa seção de checklist, disponibilizamos os links oficiais das Defensorias Públicas de cada estado cadastrado.',
  },
]

const CENARIOS_ILUSTRATIVOS = [
  {
    caso: 'Pensão alimentícia',
    contexto: 'Cenário ilustrativo',
    descricao: 'Organização de comprovantes de despesas escolares e de saúde dos filhos para subsidiar o pedido de alimentos provisórios junto à Defensoria Pública.',
  },
  {
    caso: 'Medida protetiva de urgência',
    contexto: 'Cenário ilustrativo',
    descricao: 'Estruturação da linha do tempo dos fatos e contatos de emergência para facilitar o registro na Delegacia Especializada de Atendimento à Mulher (DEAM).',
  },
  {
    caso: 'Divórcio consensual com partilha',
    contexto: 'Cenário ilustrativo',
    descricao: 'Reunião prévia de documentos dos cônjuges e dos bens comuns para agilizar o acordo em atendimento da Defensoria ou cartório extrajudicial.',
  },
]

const RECURSOS = [
  { t: 'Checklist e contatos oficiais da Defensoria', d: 'Documentação recomendada, onde ir e links dos canais oficiais de cada estado.', href: '/checklist' },
  { t: 'Triagem gratuita do seu caso', d: 'Identifique possíveis temas jurídicos e próximos passos recomendados.', href: '/triagem' },
  { t: 'Orientações em situação de urgência', d: 'Canais emergenciais 190 e 180, medidas protetivas e plano de segurança.', href: '/triagem?urgente=1' },
]

export default function HomeClient() {
  const [faqAberto, setFaqAberto] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* ALERTA DE SEGURANÇA E EMERGÊNCIA */}
      <div className="bg-rose-950 text-white px-4 py-2.5 text-xs sm:text-sm">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400 shrink-0" aria-hidden="true" />
            <span>
              <strong>Em risco agora?</strong> Se puder fazer isso com segurança, ligue <strong>190</strong>. Para orientação, ligue <strong>180</strong>. A Aurora não é canal de emergência.
            </span>
          </div>
          <div className="flex items-center gap-3 font-semibold shrink-0">
            <a href="tel:190" className="underline hover:text-rose-200">Ligar 190</a>
            <span>•</span>
            <a href="tel:180" className="underline hover:text-rose-200">Ligar 180</a>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.location.replace('https://www.google.com')}
              className="inline-flex items-center gap-1 bg-neutral-900 hover:bg-black px-2 py-0.5 rounded text-rose-300 border border-rose-800 text-xs"
              title="Redirecionar imediatamente para o Google"
            >
              <LogOut size={12} aria-hidden="true" /> Saída rápida
            </button>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-heading font-bold text-lg sm:text-xl tracking-tight text-neutral-900" aria-label="Página inicial Aurora">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-aurora-500 to-aurora-700 text-white shadow-sm">
              <Scale size={19} aria-hidden="true" />
            </span>
            Aurora
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <a href="#como-funciona" className="hover:text-aurora-700 transition-colors">Como funciona</a>
            <a href="#para-quem" className="hover:text-aurora-700 transition-colors">Para quem é</a>
            <a href="#planos" className="hover:text-aurora-700 transition-colors">Planos</a>
            <Link href="/blog" className="hover:text-aurora-700 transition-colors">Blog</Link>
            <a href="#faq" className="hover:text-aurora-700 transition-colors">Dúvidas</a>
            <Link href="/checklist" className="hover:text-aurora-700 transition-colors">Defensoria</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login"><Button variant="ghost" size="sm" className="sm:h-10 sm:px-4 sm:text-sm">Entrar</Button></Link>
            <Link href="/cadastro"><Button size="sm" className="sm:h-10 sm:px-4 sm:text-sm">Começar grátis</Button></Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-aurora-50/80 via-aurora-50/30 to-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-3xl rounded-full bg-aurora-200/30 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center animate-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-aurora-200/80 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-medium text-aurora-700 shadow-xs mb-7">
              <Sparkles size={15} className="text-aurora-500" aria-hidden="true" />
              Informação e organização de direitos para mulheres
            </div>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-neutral-950">
              Seus direitos, com{' '}
              <span className="bg-gradient-to-r from-aurora-600 to-rose-500 bg-clip-text text-transparent">
                acolhimento e clareza
              </span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-neutral-600">
              Conte sua situação. A Aurora ajuda a organizar as informações, entender caminhos possíveis e preparar documentos-base para revisão pela Defensoria ou por uma advogada.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link href="/triagem">
                <Button size="lg" className="w-full sm:w-auto group">
                  Fazer triagem gratuita
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/checklist">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver checklist da Defensoria
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-neutral-500">
              Grátis para começar • Modelos-base para revisão profissional • Não substitui consulta jurídica individual
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-neutral-700">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Check size={15} className="text-aurora-600" aria-hidden="true" /> Triagem preliminar
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Check size={15} className="text-aurora-600" aria-hidden="true" /> Documentos-base em PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Check size={15} className="text-aurora-600" aria-hidden="true" /> Sem juridiquês
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Lock size={14} className="text-aurora-600" aria-hidden="true" /> Sigilo e isolamento (LGPD)
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-20 md:space-y-24 pb-20">
          {/* COMO FUNCIONA */}
          <section id="como-funciona" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Passo a passo</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Como funciona</h2>
              <p className="text-neutral-600 mt-3 text-base">Da sua história à preparação para o atendimento jurídico.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {PASSOS.map((c) => (
                <Card key={c.t} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="grid place-items-center w-11 h-11 rounded-xl bg-aurora-50 border border-aurora-100">
                        {c.icon}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-aurora-400">{c.num}</span>
                    </div>
                    <CardTitle className="text-lg">{c.t}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[0.95rem] leading-relaxed text-neutral-600">{c.d}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* DIFERENCIAIS */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Diferenciais</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Por que usar a Aurora?</h2>
              <p className="text-neutral-600 mt-3 text-base">Sabemos que dar o primeiro passo pode parecer difícil. Ajudamos a organizar o caminho.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {DIFERENCIAIS.map((d) => (
                <Card key={d.t} className="transition-all duration-200 hover:shadow-md hover:border-aurora-200">
                  <CardContent className="p-6 flex gap-4">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-aurora-50 border border-aurora-100 shrink-0 text-aurora-600">
                      <Check size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900 text-base">{d.t}</p>
                      <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">{d.d}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* PARA QUEM É */}
          <section id="para-quem" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Situações atendidas</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Para quem é a Aurora?</h2>
              <p className="text-neutral-600 mt-3 text-base">Se você se identifica com uma dessas situações, comece pela triagem informativa.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PERSONAS.map((p) => (
                <Card key={p.t} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200 flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-aurora-50 border border-aurora-100 mb-3">
                      {p.icon}
                    </span>
                    <CardTitle className="text-base text-neutral-900">{p.t}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-neutral-600">{p.d}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/triagem">
                <Button size="lg" className="w-full sm:w-auto group">
                  Iniciar triagem informativa
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </section>

          {/* PLANOS */}
          <section id="planos" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Transparência</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Planos e acesso</h2>
              <p className="text-neutral-600 mt-3 text-base">Comece sem custo. Evolua se precisar de mais casos ou documentos-base.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {PLANOS.map((p) => (
                <Card key={p.id} className={`flex flex-col justify-between transition-all duration-200 ${p.destaque ? 'border-aurora-600 border-2 shadow-lg relative' : 'hover:border-aurora-200'}`}>
                  {p.destaque && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-aurora-600 text-white text-xs font-semibold px-3 py-1 shadow-xs">
                      {p.destaque}
                    </span>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-neutral-900">{PLANO_LABELS[p.id].label}</CardTitle>
                    <p className="text-3xl font-extrabold mt-2 text-neutral-950">{p.preco}</p>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
                    <ul className="space-y-2.5 text-sm text-neutral-700">
                      {PLANO_LABELS[p.id].features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check size={16} className="text-aurora-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {p.disponivel ? (
                      <Link href={p.href || '/cadastro'} className="block">
                        <Button className="w-full" variant={p.destaque ? 'default' : 'outline'}>
                          {p.id === 'gratuito' ? 'Começar grátis' : `Assinar ${PLANO_LABELS[p.id].label}`}
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Em desenvolvimento
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CENÁRIOS ILUSTRATIVOS */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Exemplos práticos</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Como a Aurora apoia na prática</h2>
              <p className="text-neutral-600 mt-3 text-base">Cenários ilustrativos de organização de informações para orientação jurídica.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {CENARIOS_ILUSTRATIVOS.map((c) => (
                <Card key={c.caso} className="flex flex-col justify-between bg-neutral-50/60 border-neutral-200/80">
                  <CardHeader className="pb-2">
                    <span className="text-xs uppercase tracking-wider text-aurora-700 font-semibold">{c.contexto}</span>
                    <CardTitle className="text-base text-neutral-900 mt-1">{c.caso}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-relaxed text-neutral-600">{c.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Nota de transparência: Os exemplos acima são simulações didáticas e ilustrativas para esclarecer o funcionamento da ferramenta. A Aurora não inventa relatos de usuárias nem assegura desfechos em processos judiciais.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Tire suas dúvidas</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Dúvidas frequentes</h2>
              <p className="text-neutral-600 mt-3 text-base">Informações diretas e transparentes sobre o funcionamento da plataforma.</p>
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {FAQ.map((f, i) => {
                const aberto = faqAberto === i
                return (
                  <Card
                    key={f.q}
                    className={`transition-colors ${aberto ? 'border-aurora-200 bg-aurora-50/30' : 'hover:border-neutral-300'}`}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-neutral-900"
                      onClick={() => setFaqAberto(aberto ? null : i)}
                      aria-expanded={aberto}
                    >
                      <span className="text-base">{f.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-neutral-500 transition-transform duration-200 ${aberto ? 'rotate-180 text-aurora-600' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {aberto && (
                      <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600">{f.a}</p>
                    )}
                  </Card>
                )
              })}
            </div>
          </section>

          {/* RECURSOS */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Acesso rápido</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Recursos informativos</h2>
              <p className="text-neutral-600 mt-3 text-base">Acesse guias e diretórios com fontes oficiais.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {RECURSOS.map((r) => (
                <Link key={r.t} href={r.href} className="group block">
                  <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200">
                    <CardHeader className="pb-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-aurora-50 border border-aurora-100 mb-3">
                        <FileText className="w-5 h-5 text-aurora-600" aria-hidden="true" />
                      </span>
                      <CardTitle className="text-base group-hover:text-aurora-700 transition-colors">{r.t}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{r.d}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* EM RISCO */}
          <section>
            <Card className="bg-gradient-to-br from-aurora-900 via-aurora-900 to-rose-950 text-white border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div className="max-w-2xl space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-aurora-100">
                    <AlertTriangle size={14} aria-hidden="true" /> Atendimento urgente
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Você está em perigo agora?</h2>
                  <p className="text-white/85 leading-relaxed text-sm sm:text-base">
                    Se puder fazer isso com segurança, ligue <strong className="text-white">190</strong> (Polícia Militar). Para acolhimento e rede de proteção, ligue <strong className="text-white">180</strong> (Central da Mulher). A Aurora não é canal de emergência.
                  </p>
                  <div className="flex gap-4 pt-2">
                    <a href="tel:190" className="inline-flex items-center gap-1.5 text-white underline font-semibold"><PhoneCall size={16} /> Ligar 190</a>
                    <a href="tel:180" className="inline-flex items-center gap-1.5 text-white underline font-semibold"><PhoneCall size={16} /> Ligar 180</a>
                  </div>
                </div>
                <Link href="/triagem?urgente=1" className="shrink-0 w-full md:w-auto">
                  <Button size="lg" variant="secondary" className="w-full md:w-auto">
                    <Clock size={18} className="mr-1.5" aria-hidden="true" /> Ver orientações de urgência
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* CTA FINAL */}
          <section className="pt-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
              Dê o primeiro passo para <span className="text-aurora-600">organizar seus direitos</span>.
            </h2>
            <p className="mt-3 text-neutral-600 text-base sm:text-lg">A triagem é gratuita e ajuda a estruturar suas dúvidas antes do atendimento profissional.</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link href="/triagem">
                <Button size="lg" className="w-full sm:w-auto group">
                  Fazer triagem gratuita
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/sobre">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Conhecer a Aurora
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-neutral-500 max-w-3xl mx-auto border-t pt-4">
              <strong>Aviso de responsabilidade legal:</strong> A Aurora é uma plataforma de organização da informação e auxílio na elaboração de documentos-base. O conteúdo disponibilizado não constitui parecer individualizado nem assessoria advocatícia. Todo procedimento perante o Poder Judiciário requer representação legal e avaliação do caso concreto pela Defensoria Pública ou por advogada devidamente inscrita na OAB.
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200/80 bg-neutral-50/80 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
          <div>
            <p className="flex items-center gap-2 font-heading font-bold text-base text-neutral-900">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-500 to-aurora-700 text-white">
                <Scale size={16} aria-hidden="true" />
              </span>
              Aurora
            </p>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              Plataforma independente voltada aos direitos das mulheres.
            </p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Recursos</p>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/triagem" className="hover:text-aurora-700 transition-colors">Triagem preliminar</Link></li>
              <li><a href="#planos" className="hover:text-aurora-700 transition-colors">Planos</a></li>
              <li><Link href="/checklist" className="hover:text-aurora-700 transition-colors">Checklist e Defensoria</Link></li>
              <li><Link href="/blog" className="hover:text-aurora-700 transition-colors">Blog informativo</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Conta</p>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/login" className="hover:text-aurora-700 transition-colors">Entrar</Link></li>
              <li><Link href="/cadastro" className="hover:text-aurora-700 transition-colors">Criar conta</Link></li>
              <li><Link href="/dashboard" className="hover:text-aurora-700 transition-colors">Meus casos</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Ajuda e Institucional</p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#faq" className="hover:text-aurora-700 transition-colors">Dúvidas frequentes</a></li>
              <li><Link href="/sobre" className="hover:text-aurora-700 transition-colors">Sobre a Aurora</Link></li>
              <li><Link href="/contato" className="hover:text-aurora-700 transition-colors">Contato e Suporte</Link></li>
              <li><Link href="/privacidade" className="hover:text-aurora-700 transition-colors">Privacidade (LGPD)</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-aurora-700 transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>Aurora © 2026 • Apoio aos direitos das mulheres</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-aurora-700 transition-colors">Privacidade (LGPD)</Link>
            <Link href="/termos-de-uso" className="hover:text-aurora-700 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
