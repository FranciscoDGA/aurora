'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PLANO_LABELS } from '@/lib/constants'
import {
  Scale, MessageCircle, FileText, ShieldCheck, Clock, Sparkles,
  Check, ChevronDown, Star, HeartHandshake, Gavel, Baby, ArrowRight, Lock,
} from 'lucide-react'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
const WA_LINK = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá, Clara! Preciso de ajuda com um caso.')}`
  : ''

const PASSOS = [
  {
    num: '01',
    icon: <MessageCircle className="w-5 h-5 text-aurora-600" />,
    t: 'Você conta',
    d: 'Descreva com suas palavras, por texto ou áudio. Sem juridiquês, sem julgamento.',
  },
  {
    num: '02',
    icon: <FileText className="w-5 h-5 text-aurora-600" />,
    t: 'Clara gera',
    d: 'Petição inicial, alimentos provisórios, medida protetiva, gratuidade — prontos em PDF.',
  },
  {
    num: '03',
    icon: <ShieldCheck className="w-5 h-5 text-aurora-600" />,
    t: 'Você protocola',
    d: 'Checklist + endereços da Defensoria/Vara para levar tudo pronto e não voltar pra casa de mãos vazias.',
  },
]

const DIFERENCIAIS = [
  { t: 'Sem advogado para começar', d: 'Você não precisa pagar consulta nem conhecer ninguém da área. O Guia Clara traduz sua história em peças jurídicas.' },
  { t: 'Minutos, não meses', d: 'Triagem gratuita na hora e documentos gerados no mesmo dia. O sistema anda devagar — você não precisa.' },
  { t: 'Grátis para começar', d: '1 caso ativo e 2 documentos por mês sem cartão. Só pague se precisar de mais.' },
  { t: 'Feita para mulheres', d: 'Linguagem simples, acolhimento e foco nos casos que mais atingem mulheres: família, violência e trabalho.' },
]

const PERSONAS = [
  { icon: <HeartHandshake className="w-5 h-5 text-aurora-600" />, t: 'Em divórcio', d: 'Separou ou quer separar e não sabe por onde começar: bens, filhos, pensão.' },
  { icon: <Baby className="w-5 h-5 text-aurora-600" />, t: 'Mãe sem pensão', d: 'Ele não paga ou paga pouco. Descubra quanto pedir e gere a ação de alimentos.' },
  { icon: <ShieldCheck className="w-5 h-5 text-aurora-600" />, t: 'Em situação de violência', d: 'Medo, ameaça ou agressão. Plano de saída + pedido de medida protetiva.' },
  { icon: <Gavel className="w-5 h-5 text-aurora-600" />, t: 'Problemas no trabalho', d: 'Assédio, demissão na gravidez, direitos negados. Saiba o que a lei garante.' },
]

const PLANOS: Array<{ id: keyof typeof PLANO_LABELS; preco: string; destaque?: string; href?: string }> = [
  { id: 'gratuito', preco: 'R$ 0', href: '/triagem' },
  { id: 'aurora_plus', preco: 'R$ 29,90/mês', destaque: 'Mais popular', href: 'https://pay.kiwify.com.br/MTsDC1d' },
  { id: 'aurora_pro', preco: 'R$ 79,90/mês', href: 'https://pay.kiwify.com.br/spbY82Q' },
]

const FAQ = [
  { q: 'Preciso de advogado para usar o Guia Clara?', a: 'Não para começar. O Guia Clara gera documentos-base e o passo a passo. Para protocolar, você leva tudo à Defensoria Pública (gratuita) ou a uma advogada, que revisa e assina com você.' },
  { q: 'Os documentos valem no fórum?', a: 'São peças-base no formato usado na prática (fundamentação + pedidos). Elas precisam de revisão da Defensoria/advogada antes do protocolo — por isso cada documento sai com checklist do que falta preencher.' },
  { q: 'É grátis mesmo?', a: 'Sim: triagem ilimitada, 1 caso ativo e 2 documentos por mês, sem cartão. Os planos pagos liberam casos e documentos ilimitados.' },
  { q: 'Meus dados estão seguros?', a: 'Cada usuária só acessa os próprios casos (isolamento por login + políticas de segurança no banco). Nunca compartilhamos seu relato.' },
  { q: 'Estou em risco agora. O que faço?', a: 'Ligue 180 (Central da Mulher) ou 190 (emergência) antes de qualquer documento. Depois o Guia Clara ajuda com o plano de saída e a medida protetiva.' },
  { q: 'Serve para o meu estado?', a: 'As ações seguem lei federal (válida no Brasil todo). A página de checklist traz endereços da Defensoria de SP e RJ — e cresce para outros estados.' },
]

// NOTA: depoimentos ilustrativos — trocar por casos reais autorizados assim que houver.
const DEPOIMENTOS = [
  { nome: 'M., São Paulo', caso: 'Pensão alimentícia', texto: 'Ele estava há 5 meses sem pagar. Em uma noite gerei a petição e na semana seguinte já tinha protocolo na Defensoria.' },
  { nome: 'R., Rio de Janeiro', caso: 'Medida protetiva', texto: 'Eu não sabia nem o que pedir. A Clara me deu as palavras e o documento. Foi o empurrão que faltava.' },
  { nome: 'J., Belo Horizonte', caso: 'Divórcio consensual', texto: 'Conseguimos entrar em acordo e a partilha saiu pronta. Economizamos meses de briga e dinheiro.' },
]

const RECURSOS = [
  { t: 'Checklist + endereços da Defensoria', d: 'O que levar, onde ir e o que pedir na hora de protocolar.', href: '/checklist' },
  { t: 'Triagem gratuita do seu caso', d: 'Descubra seu tipo de ação, urgência e documentos em minutos.', href: '/triagem' },
  { t: 'Medida protetiva: quando pedir', d: 'Em risco? Faça a triagem urgente e gere o pedido na hora.', href: '/triagem?urgente=1' },
]

export default function Home() {
  const [faqAberto, setFaqAberto] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-heading font-bold text-lg sm:text-xl tracking-tight text-neutral-900">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-aurora-500 to-aurora-700 text-white shadow-sm">
              <Scale size={19} />
            </span>
            Guia Clara
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <a href="#como-funciona" className="hover:text-aurora-700 transition-colors">Como funciona</a>
            <a href="#para-quem" className="hover:text-aurora-700 transition-colors">Para quem é</a>
            <a href="#planos" className="hover:text-aurora-700 transition-colors">Planos</a>
            <Link href="/blog" className="hover:text-aurora-700 transition-colors">Blog</Link>
            <a href="#faq" className="hover:text-aurora-700 transition-colors">Dúvidas</a>
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
              <Sparkles size={15} className="text-aurora-500" />
              Navegadora de direitos da mulher
            </div>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-neutral-950">
              Seus direitos,{' '}
              <span className="bg-gradient-to-r from-aurora-600 to-rose-500 bg-clip-text text-transparent">
                claros
              </span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-neutral-600">
              Divórcio, pensão, guarda, medida protetiva. Conte sua história no WhatsApp ou aqui —
              a Clara entende, gera os documentos e te diz o passo a passo exato.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link href="/triagem">
                <Button size="lg" className="w-full sm:w-auto group">
                  Fazer triagem gratuita
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              {WA_LINK && (
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <MessageCircle size={18} className="text-emerald-600" />
                    Falar no WhatsApp
                  </Button>
                </a>
              )}
            </div>
            <p className="mt-4 text-xs sm:text-sm text-neutral-500">
              Grátis para começar • Sem advogado para começar • Leve à Defensoria para protocolar
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-neutral-700">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Check size={15} className="text-aurora-600" /> Triagem na hora
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Check size={15} className="text-aurora-600" /> Documentos em PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Check size={15} className="text-aurora-600" /> Sem juridiquês
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200/80 px-3.5 py-1.5 shadow-xs">
                <Lock size={14} className="text-aurora-600" /> Sigiloso (LGPD)
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
              <p className="text-neutral-600 mt-3 text-base">Do relato ao protocolo em 3 passos simples.</p>
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
                    <CardDescription className="text-[0.95rem] leading-relaxed">{c.d}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* POR QUE O GUIA CLARA */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Diferenciais</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Por que o Guia Clara?</h2>
              <p className="text-neutral-600 mt-3 text-base">O caminho tradicional é caro, lento e confuso. O Guia Clara é o atalho.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {DIFERENCIAIS.map((d) => (
                <Card key={d.t} className="transition-all duration-200 hover:shadow-md hover:border-aurora-200">
                  <CardContent className="p-6 flex gap-4">
                    <span className="grid place-items-center w-9 h-9 rounded-xl bg-aurora-50 border border-aurora-100 shrink-0 mt-0.5">
                      <Check size={18} className="text-aurora-600" />
                    </span>
                    <div>
                      <p className="font-semibold text-base text-neutral-900">{d.t}</p>
                      <p className="text-sm leading-relaxed text-neutral-600 mt-1.5">{d.d}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* PARA QUEM */}
          <section id="para-quem" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Áreas atendidas</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Para quem é o Guia Clara?</h2>
              <p className="text-neutral-600 mt-3 text-base">Se você vive uma destas situações, comece pela triagem gratuita.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PERSONAS.map((p) => (
                <Card key={p.t} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200">
                  <CardHeader className="pb-3">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-aurora-50 border border-aurora-100 mb-3">
                      {p.icon}
                    </span>
                    <CardTitle className="text-base">{p.t}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{p.d}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-9">
              <Link href="/triagem">
                <Button size="lg" className="group">
                  Descobrir meu caso
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </section>

          {/* PLANOS */}
          <section id="planos" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Transparência</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Planos</h2>
              <p className="text-neutral-600 mt-3 text-base">Comece grátis. Evolua só se precisar.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {PLANOS.map((p) => (
                <Card
                  key={p.id}
                  className={
                    p.destaque
                      ? 'border-aurora-600 border-2 relative flex flex-col justify-between shadow-lg shadow-aurora-100/60'
                      : 'flex flex-col justify-between transition-shadow hover:shadow-md'
                  }
                >
                  {p.destaque && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-aurora-600 text-white text-xs font-semibold px-3.5 py-1 shadow-sm">
                      {p.destaque}
                    </span>
                  )}
                  <div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">{PLANO_LABELS[p.id].label}</CardTitle>
                      <p className="text-3xl font-extrabold tracking-tight text-neutral-950 mt-2">{p.preco}</p>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <ul className="space-y-3 text-sm text-neutral-700">
                        {PLANO_LABELS[p.id].features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check size={16} className="text-aurora-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                  <div className="p-6 pt-0">
                    <Link href={p.href || '/cadastro'} className="block">
                      <Button className="w-full" variant={p.destaque ? 'default' : 'outline'}>
                        {p.id === 'gratuito' ? 'Começar grátis' : `Assinar ${PLANO_LABELS[p.id].label}`}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* DEPOIMENTOS */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Histórias reais</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Quem já usou</h2>
              <p className="text-neutral-600 mt-3 text-base">Histórias de quem transformou medo em protocolo.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {DEPOIMENTOS.map((d) => (
                <Card key={d.nome} className="flex flex-col justify-between bg-neutral-50/60">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-700">“{d.texto}”</p>
                    <p className="text-xs text-neutral-500 pt-2 border-t border-neutral-200/70">
                      <strong className="text-neutral-800">{d.nome}</strong> • {d.caso}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Tire suas dúvidas</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Dúvidas frequentes</h2>
              <p className="text-neutral-600 mt-3 text-base">As respostas diretas que você precisa antes de começar.</p>
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
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-neutral-900"
                      onClick={() => setFaqAberto(aberto ? null : i)}
                      aria-expanded={aberto}
                    >
                      <span className="text-base">{f.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-neutral-500 transition-transform duration-200 ${aberto ? 'rotate-180 text-aurora-600' : ''}`}
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Recursos gratuitos</h2>
              <p className="text-neutral-600 mt-3 text-base">Comece por aqui, sem conta e sem custo.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {RECURSOS.map((r) => (
                <Link key={r.t} href={r.href} className="group block">
                  <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200">
                    <CardHeader className="pb-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-aurora-50 border border-aurora-100 mb-3">
                        <FileText className="w-5 h-5 text-aurora-600" />
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
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-aurora-100 mb-3">
                    Atendimento urgente
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Em risco agora?</h2>
                  <p className="mt-2.5 text-white/85 leading-relaxed">
                    Ligue <strong className="text-white">180</strong> (Central da Mulher) ou <strong className="text-white">190</strong> (emergência). O Guia Clara ajuda com o plano de saída e a medida protetiva depois.
                  </p>
                </div>
                <Link href="/triagem?urgente=1" className="shrink-0 w-full md:w-auto">
                  <Button size="lg" variant="secondary" className="w-full md:w-auto">
                    <Clock size={18} /> Pedir medida protetiva
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* CTA FINAL */}
          <section className="pt-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
              Pronta para clarear <span className="text-aurora-600">seus direitos</span>?
            </h2>
            <p className="mt-3 text-neutral-600 text-base sm:text-lg">A triagem é gratuita e leva poucos minutos.</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link href="/triagem">
                <Button size="lg" className="w-full sm:w-auto group">
                  Fazer triagem gratuita
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              {WA_LINK && (
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <MessageCircle size={18} className="text-emerald-600" />
                    Falar no WhatsApp
                  </Button>
                </a>
              )}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-neutral-500 max-w-2xl mx-auto">
              Aviso legal: o Guia Clara gera documentos-base para levar à Defensoria Pública ou advogada. Não substitui orientação jurídica individual nem atendimento emergencial.
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
                <Scale size={16} />
              </span>
              Guia Clara
            </p>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              Seus direitos, claros. Navegadora de direitos da mulher.
            </p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-3">Produto</p>
            <ul className="space-y-2 text-neutral-600">
              <li><Link href="/triagem" className="hover:text-aurora-700 transition-colors">Triagem gratuita</Link></li>
              <li><a href="#planos" className="hover:text-aurora-700 transition-colors">Planos</a></li>
              <li><Link href="/checklist" className="hover:text-aurora-700 transition-colors">Checklist e Defensoria</Link></li>
              <li><Link href="/blog" className="hover:text-aurora-700 transition-colors">Blog</Link></li>
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
            <p className="font-semibold text-neutral-900 mb-3">Ajuda</p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#faq" className="hover:text-aurora-700 transition-colors">Dúvidas frequentes</a></li>
              {WA_LINK && <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-aurora-700 transition-colors">WhatsApp</a></li>}
              <li><Link href="/sobre" className="hover:text-aurora-700 transition-colors">Sobre</Link></li>
              <li><Link href="/contato" className="hover:text-aurora-700 transition-colors">Contato</Link></li>
              <li><Link href="/privacidade" className="hover:text-aurora-700 transition-colors">Privacidade (LGPD)</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>Guia Clara © 2026 • Feito para mulheres</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-aurora-700 transition-colors">Privacidade (LGPD)</Link>
            <Link href="/termos-de-uso" className="hover:text-aurora-700 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante — só aparece quando o número oficial está configurado */}
      {WA_LINK && (
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-5 right-5 z-20 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={26} />
        </a>
      )}
    </div>
  )
}
