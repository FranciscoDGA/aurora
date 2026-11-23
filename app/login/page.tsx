'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/inputs'
import { Scale, Lock } from 'lucide-react'

const MAX_TENTATIVAS = 5
const TEMPO_BLOQUEIO_SEGUNDOS = 60

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [tentativas, setTentativas] = useState(0)
  const [bloqueadoAte, setBloqueadoAte] = useState<number | null>(null)
  const [segundosRestantes, setSegundosRestantes] = useState(0)

  // Temporizador para desbloqueio após tentativas repetidas
  useEffect(() => {
    if (!bloqueadoAte) return
    const interval = setInterval(() => {
      const restantes = Math.ceil((bloqueadoAte - Date.now()) / 1000)
      if (restantes <= 0) {
        setBloqueadoAte(null)
        setSegundosRestantes(0)
        setTentativas(0)
        setErro('')
      } else {
        setSegundosRestantes(restantes)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [bloqueadoAte])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (bloqueadoAte && Date.now() < bloqueadoAte) {
      setErro(`Muitas tentativas incorretas. Aguarde ${segundosRestantes} segundos antes de tentar novamente.`)
      return
    }

    setLoading(true)
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Serviço de autenticação temporariamente indisponível.')
      }
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha,
      })

      if (error) {
        const novasTentativas = tentativas + 1
        setTentativas(novasTentativas)

        if (novasTentativas >= MAX_TENTATIVAS) {
          const ate = Date.now() + TEMPO_BLOQUEIO_SEGUNDOS * 1000
          setBloqueadoAte(ate)
          setSegundosRestantes(TEMPO_BLOQUEIO_SEGUNDOS)
          throw new Error(`Limite de tentativas excedido. Por segurança, aguarde ${TEMPO_BLOQUEIO_SEGUNDOS} segundos.`)
        }

        // Mensagem genérica segura: não expõe se o e-mail existe no banco
        throw new Error('E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.')
      }

      router.push('/dashboard')
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao realizar login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-aurora-50 px-4 py-8">
      <Card className="w-full max-w-md shadow-md border-aurora-100">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto grid place-items-center w-10 h-10 rounded-xl bg-aurora-600 text-white mb-2">
            <Scale size={20} aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl text-neutral-900">Entrar na Aurora</CardTitle>
          <CardDescription>
            Acesse seus casos e minutas de documentos de forma segura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                disabled={loading || segundosRestantes > 0}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="senha">Senha</Label>
                <Link
                  href="/recuperar-senha"
                  className="text-xs text-aurora-700 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading || segundosRestantes > 0}
              />
            </div>

            {erro && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2" role="alert">
                <Lock size={16} className="shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <Button
              className="w-full"
              disabled={loading || segundosRestantes > 0}
            >
              {segundosRestantes > 0
                ? `Aguarde ${segundosRestantes}s`
                : loading
                ? 'Entrando...'
                : 'Entrar'}
            </Button>

            <div className="text-sm text-center text-muted-foreground pt-2">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-aurora-700 font-semibold hover:underline">
                Cadastre-se gratuitamente
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
