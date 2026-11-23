'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/inputs'
import { Scale, Mail, CheckCircle2 } from 'lucide-react'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Serviço de recuperação indisponível no momento.')
      }
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/dashboard`,
      })
      if (error) {
        // Log seguro e tratamento amigável
        console.error('Falha na solicitação de redefinição:', error.message)
      }
      // Sempre exibe mensagem de envio para prevenir enumeração de e-mails
      setEnviado(true)
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao solicitar recuperação')
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
          <CardTitle className="text-2xl text-neutral-900">Recuperação de Acesso</CardTitle>
          <CardDescription>
            Informe seu e-mail cadastrado para receber instruções seguras de redefinição de senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {enviado ? (
            <div className="space-y-4 text-center py-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-700 grid place-items-center">
                <CheckCircle2 size={24} aria-hidden="true" />
              </div>
              <p className="text-sm text-neutral-700">
                Se o e-mail informado estiver cadastrado em nossa base, você receberá em instantes um link seguro para cadastrar uma nova senha.
              </p>
              <p className="text-xs text-muted-foreground">
                Verifique também sua caixa de spam ou lixo eletrônico.
              </p>
              <div className="pt-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">Voltar para o login</Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail cadastrado</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {erro && <p className="text-sm text-red-600 font-medium" role="alert">{erro}</p>}

              <Button className="w-full" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>

              <div className="text-sm text-center text-muted-foreground pt-2">
                Lembrou sua senha?{' '}
                <Link href="/login" className="text-aurora-700 font-semibold hover:underline">
                  Voltar para o login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
