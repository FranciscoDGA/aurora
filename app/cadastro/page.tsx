'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/inputs'
import { Scale, ShieldCheck } from 'lucide-react'

export default function CadastroPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setOk('')

    if (senha.length < 8) {
      setErro('A senha deve conter no mínimo 8 caracteres.')
      return
    }

    setLoading(true)
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Serviço de autenticação temporariamente indisponível. Tente novamente mais tarde.')
      }
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { data: { nome } },
      })
      if (error) {
        // Mensagem amigável sem expor detalhes internos do sistema
        if (error.message.includes('already registered')) {
          throw new Error('Este e-mail já possui cadastro. Acesse a página de login.')
        }
        throw new Error('Não foi possível concluir o cadastro. Verifique os dados e tente novamente.')
      }
      if (!data.session) {
        setOk('Conta criada com sucesso! Verifique seu e-mail para confirmar seu cadastro antes de entrar.')
        return
      }
      router.push('/dashboard')
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao criar conta')
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
          <CardTitle className="text-2xl text-neutral-900">Criar conta na Aurora</CardTitle>
          <CardDescription>
            Acesso gratuito: 1 caso ativo e 2 documentos-base por mês, sem cartão.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Como prefere ser chamada?</Label>
              <Input
                id="nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Maria"
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="senha">Senha de acesso</Label>
              <Input
                id="senha"
                type="password"
                required
                minLength={8}
                maxLength={128}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo de 8 caracteres"
                autoComplete="new-password"
                aria-describedby="dica-senha"
              />
              <p id="dica-senha" className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ShieldCheck size={14} className="text-aurora-600 shrink-0" />
                Recomendamos no mínimo 8 caracteres, combinando letras e números.
              </p>
            </div>
            {erro && <p className="text-sm text-red-600 font-medium" role="alert">{erro}</p>}
            {ok && <p className="text-sm text-green-700 font-medium" role="status">{ok}</p>}
            <Button className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta gratuita'}
            </Button>
            <div className="text-sm text-center text-muted-foreground pt-2">
              Já possui uma conta? <Link href="/login" className="text-aurora-700 font-semibold hover:underline">Entrar</Link>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Ao se cadastrar, você concorda com nossos <Link href="/termos-de-uso" className="underline">Termos de Uso</Link> e nossa <Link href="/privacidade" className="underline">Política de Privacidade</Link>.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
