import Link from 'next/link'
import { Scale, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/inputs'
import { CapaPost } from '@/components/blog-capa'
import { POSTS } from '@/lib/blog'
import { CATEGORIAS, getAllPosts } from '@/lib/blog/types'

export const metadata = {
  title: 'Blog — Direitos da mulher explicados com clareza | Aurora',
  description: 'Guias informativos sobre pensão, guarda, divórcio, medida protetiva e direitos no trabalho. Conteúdo gratuito e baseado na legislação.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage({ searchParams }: { searchParams?: { categoria?: string } }) {
  const cat = searchParams?.categoria
  const todos = getAllPosts(POSTS)
  const posts = cat ? todos.filter((p) => p.categoria === cat) : todos

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/60 text-neutral-900">
      <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-heading font-bold text-lg sm:text-xl tracking-tight text-neutral-900">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-aurora-500 to-aurora-700 text-white shadow-sm">
              <Scale size={19} />
            </span>
            Aurora
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/"><Button variant="ghost" size="sm">Início</Button></Link>
            <Link href="/checklist" className="hidden sm:inline-block"><Button variant="ghost" size="sm">Checklist</Button></Link>
            <Link href="/triagem"><Button size="sm">Fazer triagem</Button></Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-neutral-200/70 bg-gradient-to-b from-aurora-50/70 via-white to-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-aurora-600 mb-2">Guias informativos</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
              Blog Informativo da Aurora
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-600 max-w-2xl mx-auto">
              Direitos da mulher explicados de forma acolhedora e sem juridiquês: pensão, guarda, divórcio, medidas protetivas, trabalho e benefícios.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <Link href="/blog">
                <Badge
                  className={
                    !cat
                      ? 'bg-aurora-600 text-white border-aurora-600 px-3.5 py-1.5 text-xs shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-aurora-300 hover:text-aurora-700 px-3.5 py-1.5 text-xs transition-colors'
                  }
                >
                  Todas
                </Badge>
              </Link>
              {CATEGORIAS.map((c) => (
                <Link key={c} href={`/blog?categoria=${encodeURIComponent(c)}`}>
                  <Badge
                    className={
                      cat === c
                        ? 'bg-aurora-600 text-white border-aurora-600 px-3.5 py-1.5 text-xs shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-aurora-300 hover:text-aurora-700 px-3.5 py-1.5 text-xs transition-colors'
                    }
                  >
                    {c}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block h-full">
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-aurora-200 bg-white">
                  <CapaPost categoria={p.categoria} semente={p.slug} className="h-44" iconSize={40} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge className="bg-aurora-50 text-aurora-700 border-aurora-200">{p.categoria}</Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                        <Clock size={12} /> {p.leituraMin} min
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-snug group-hover:text-aurora-700 transition-colors">
                      {p.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between gap-4">
                    <CardDescription className="line-clamp-3">{p.descricao}</CardDescription>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-aurora-600 group-hover:text-aurora-700">
                      Ler artigo <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-600">Nenhum post nesta categoria ainda.</p>
              <Link href="/blog" className="inline-block mt-4">
                <Button variant="outline" size="sm">Ver todos os artigos</Button>
              </Link>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-neutral-200/80 bg-white py-8 text-xs text-neutral-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Aurora © 2026 — Apoio aos direitos das mulheres</span>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/sobre" className="hover:text-aurora-700 transition-colors">Sobre</Link>
            <Link href="/triagem" className="hover:text-aurora-700 transition-colors">Triagem</Link>
            <Link href="/checklist" className="hover:text-aurora-700 transition-colors">Checklist</Link>
            <Link href="/contato" className="hover:text-aurora-700 transition-colors">Contato</Link>
            <Link href="/privacidade" className="hover:text-aurora-700 transition-colors">Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-aurora-700 transition-colors">Termos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
