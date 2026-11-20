import Link from 'next/link'
import { Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/inputs'
import { CapaPost } from '@/components/blog-capa'
import { POSTS } from '@/lib/blog'
import { CATEGORIAS, getAllPosts } from '@/lib/blog/types'

export const metadata = {
  title: 'Blog — Direitos explicados sem juridiquês | Guia Clara',
  description: 'Guias práticos sobre pensão, guarda, divórcio, medida protetiva, direitos da gestante e mais. Conteúdo gratuito e atualizado.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage({ searchParams }: { searchParams?: { categoria?: string } }) {
  const cat = searchParams?.categoria
  const todos = getAllPosts(POSTS)
  const posts = cat ? todos.filter((p) => p.categoria === cat) : todos

  return (
    <div className="min-h-screen bg-aurora-50">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-aurora-600 text-white"><Scale size={20} /></span>
            Guia Clara
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/"><Button variant="ghost" size="sm">Início</Button></Link>
            <Link href="/triagem"><Button size="sm">Fazer triagem</Button></Link>
          </nav>
        </div>
      </header>
      <main className="px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Blog do Guia Clara</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Direitos da mulher explicados sem juridiquês: pensão, guarda, divórcio, medida protetiva,
            trabalho e consumo. Leia e, se precisar, gere seus documentos com a Clara.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/blog">
              <Badge className={!cat ? 'bg-aurora-600 text-white border-aurora-600' : 'bg-white'}>Todas</Badge>
            </Link>
            {CATEGORIAS.map((c) => (
              <Link key={c} href={`/blog?categoria=${encodeURIComponent(c)}`}>
                <Badge className={cat === c ? 'bg-aurora-600 text-white border-aurora-600' : 'bg-white'}>{c}</Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <CapaPost categoria={p.categoria} semente={p.slug} className="h-36" iconSize={40} />
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-aurora-50 text-aurora-700 border-aurora-200">{p.categoria}</Badge>
                    <span className="text-xs text-muted-foreground">{p.leituraMin} min</span>
                  </div>
                  <CardTitle className="text-lg leading-snug">{p.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{p.descricao}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground">Nenhum post nesta categoria ainda.</p>
        )}
      </div>
      </main>
      <footer className="border-t bg-white py-8 text-xs text-muted-foreground">
        <div className="mx-auto max-w-5xl px-4 flex flex-wrap justify-between gap-4">
          <span>Guia Clara — Orientação jurídica acessível</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/sobre" className="hover:underline">Sobre</Link>
            <Link href="/triagem" className="hover:underline">Triagem</Link>
            <Link href="/checklist" className="hover:underline">Checklist</Link>
            <Link href="/contato" className="hover:underline">Contato</Link>
            <Link href="/privacidade" className="hover:underline">Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:underline">Termos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
