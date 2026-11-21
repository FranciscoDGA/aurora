import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Scale, Clock, Calendar, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/inputs'
import { CapaPost } from '@/components/blog-capa'
import { POSTS } from '@/lib/blog'
import { getPost, getRelacionados } from '@/lib/blog/types'
import { APP_URL } from '@/lib/site'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(POSTS, params.slug)
  if (!post) return {}
  return {
    title: `${post.titulo} | Guia Clara`,
    description: post.descricao,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.titulo, description: post.descricao, type: 'article', url: `${APP_URL}/blog/${post.slug}` },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(POSTS, params.slug)
  if (!post) notFound()
  const relacionados = getRelacionados(POSTS, post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.titulo,
        description: post.descricao,
        datePublished: post.data,
        author: { '@type': 'Organization', name: 'Guia Clara — Seus Direitos, Claros' },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: APP_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${APP_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.titulo, item: `${APP_URL}/blog/${post.slug}` },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-heading font-bold text-lg sm:text-xl tracking-tight text-neutral-900">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-aurora-500 to-aurora-700 text-white shadow-sm">
              <Scale size={19} />
            </span>
            Guia Clara
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={14} /> Blog
              </Button>
            </Link>
            <Link href="/triagem"><Button size="sm">Fazer triagem</Button></Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto max-w-[740px] px-4 sm:px-6 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 mb-5 flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-aurora-700 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-aurora-700 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-neutral-800 font-medium">{post.categoria}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <Badge className="bg-aurora-50 text-aurora-700 border-aurora-200">{post.categoria}</Badge>
            <span className="inline-flex items-center gap-1">
              <Calendar size={13} />
              {new Date(post.data + 'T12:00:00').toLocaleDateString('pt-BR')}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {post.leituraMin} min de leitura
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold tracking-tight leading-[1.16] text-neutral-950 text-balance">
            {post.titulo}
          </h1>
          <p className="mt-4 text-lg sm:text-xl leading-relaxed text-neutral-600">
            {post.descricao}
          </p>

          <CapaPost
            categoria={post.categoria}
            semente={post.slug}
            className="mt-8 h-56 sm:h-64 md:h-72 rounded-2xl shadow-sm"
            iconSize={64}
          />

          <div
            className="post-conteudo mt-10"
            dangerouslySetInnerHTML={{ __html: post.conteudo }}
          />

          <Card className="mt-12 bg-gradient-to-br from-aurora-50 to-rose-50/60 border-aurora-200/80 shadow-xs">
            <CardHeader className="pb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600">Próximo passo</p>
              <CardTitle className="text-xl text-neutral-950">Precisa aplicar isso no seu caso?</CardTitle>
              <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                Faça a triagem gratuita e receba os documentos-base prontos para levar à Defensoria Pública ou advogada.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3">
              <Link href="/triagem">
                <Button className="w-full sm:w-auto group">
                  Fazer triagem gratuita
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/checklist">
                <Button variant="outline" className="w-full sm:w-auto">Ver checklist e endereços</Button>
              </Link>
            </CardContent>
          </Card>

          <div className="mt-8 rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-4 flex items-start gap-3 text-xs leading-relaxed text-neutral-600">
            <ShieldAlert size={16} className="text-neutral-500 shrink-0 mt-0.5" />
            <p>
              Aviso: conteúdo informativo e geral, não substitui orientação jurídica individual. Para o seu caso,
              leve os documentos gerados pelo Guia Clara à Defensoria Pública ou advogada.
            </p>
          </div>

          {relacionados.length > 0 && (
            <div className="mt-14 pt-10 border-t border-neutral-200/80">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-5">Leia também</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relacionados.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group block h-full">
                    <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200">
                      <CardContent className="p-5 flex flex-col justify-between h-full gap-3">
                        <div>
                          <Badge className="bg-aurora-50 text-aurora-700 border-aurora-200 mb-2.5">{r.categoria}</Badge>
                          <p className="font-semibold text-sm leading-snug text-neutral-900 group-hover:text-aurora-700 transition-colors">
                            {r.titulo}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-aurora-600">
                          Ler guia <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <footer className="border-t border-neutral-200/80 bg-neutral-50/80 py-8 text-xs text-neutral-500">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Guia Clara © 2026 — Orientação jurídica acessível</span>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/sobre" className="hover:text-aurora-700 transition-colors">Sobre</Link>
            <Link href="/contato" className="hover:text-aurora-700 transition-colors">Contato</Link>
            <Link href="/privacidade" className="hover:text-aurora-700 transition-colors">Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-aurora-700 transition-colors">Termos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
