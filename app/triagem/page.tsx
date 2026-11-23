'use client'
import { Suspense, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mic, Square, AlertTriangle, PhoneCall, LogOut, ShieldAlert, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea, Label, Badge } from '@/components/ui/inputs'
import { TIPO_CASO_LABELS, URGENCIA_LABELS } from '@/lib/constants'
import type { TriagemResult } from '@/lib/types'

interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string; isFinal: boolean }>> }) => void) | null
  onend: (() => void) | null
  onerror: ((ev: { error: string }) => void) | null
  start: () => void
  stop: () => void
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
}

function TriagemConteudo() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isUrgenteParam = searchParams.get('urgente') === '1'

  const [relato, setRelato] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState<TriagemResult | null>(null)
  const [respostasEsclarecimento, setRespostasEsclarecimento] = useState<Record<string, string>>({})
  const [erro, setErro] = useState('')
  const [gravando, setGravando] = useState(false)
  const recogRef = useRef<SpeechRecognitionLike | null>(null)
  const baseRef = useRef('')

  function alternarGravacao() {
    if (gravando) {
      recogRef.current?.stop()
      return
    }
    const Ctor = typeof window !== 'undefined'
      ? (window.SpeechRecognition ?? window.webkitSpeechRecognition)
      : undefined
    if (!Ctor) {
      setErro('Seu navegador não suporta ditado por voz. Digite sua história no campo de texto.')
      return
    }
    setErro('')
    baseRef.current = relato ? relato.replace(/\s+$/, '') + ' ' : ''
    const recog = new Ctor()
    recog.lang = 'pt-BR'
    recog.interimResults = false
    recog.continuous = true
    recog.onresult = (ev) => {
      let final = ''
      for (let i = 0; i < ev.results.length; i++) {
        const alt = ev.results[i][0]
        if (alt?.isFinal) final += alt.transcript + ' '
      }
      if (final) setRelato(baseRef.current + final.trim())
    }
    recog.onerror = (ev) => {
      if (ev.error === 'not-allowed') setErro('Permita o acesso ao microfone no navegador para ditar.')
      else if (ev.error !== 'aborted') setErro('Falha no microfone. Tente novamente ou digite o texto.')
      setGravando(false)
    }
    recog.onend = () => setGravando(false)
    recogRef.current = recog
    try {
      recog.start()
      setGravando(true)
    } catch {
      setErro('Não foi possível iniciar o microfone.')
    }
  }

  async function analisar() {
    if (relato.trim().length < 15) {
      setErro('Conte um pouco mais sobre sua situação (mínimo de 15 caracteres).')
      return
    }
    setErro('')
    setLoading(true)
    setResultado(null)
    setRespostasEsclarecimento({})
    try {
      const res = await fetch('/api/triagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relato }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Falha na triagem')
      setResultado(data)
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  async function salvarCaso() {
    if (!resultado) return
    setLoading(true)
    try {
      const res = await fetch('/api/casos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          relato,
          triagem: {
            ...resultado,
            respostas_esclarecimento: respostasEsclarecimento,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Faça login para salvar o caso')
      router.push(`/casos/${data.id}`)
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : 'Erro ao salvar o caso')
      setLoading(false)
    }
  }

  const urg = resultado ? URGENCIA_LABELS[resultado.urgencia] : null
  const mostrarAvisoEmergencia = isUrgenteParam || resultado?.urgencia === 'critica'

  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* NAVEGAÇÃO SUPERIOR */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-aurora-700 hover:underline">
            ← Voltar para a página inicial
          </Link>
          <button
            type="button"
            onClick={() => window.location.replace('https://www.google.com')}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-700 font-medium px-2.5 py-1 rounded-md border border-neutral-300 hover:border-red-300 bg-white shadow-sm transition-colors"
            title="Sair imediatamente para o Google"
          >
            <LogOut size={14} aria-hidden="true" /> Saída rápida
          </button>
        </div>

        {/* ALERTA VISÍVEL EM FLUXO URGENTE OU RISCO CRÍTICO */}
        {mostrarAvisoEmergencia && (
          <div className="bg-rose-950 text-white rounded-2xl p-6 shadow-md border border-rose-900 space-y-4 animate-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={24} aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold">Você está em perigo agora?</h2>
                <p className="mt-1 text-sm text-rose-100 leading-relaxed">
                  Se puder fazer isso com segurança, ligue <strong>190</strong>. Para orientação sobre a rede de atendimento à mulher, ligue <strong>180</strong>. A Aurora não é um canal de emergência.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="tel:190"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <PhoneCall size={16} aria-hidden="true" /> Ligar 190 (Polícia Militar)
              </a>
              <a
                href="tel:180"
                className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <PhoneCall size={16} aria-hidden="true" /> Ligar 180 (Central da Mulher)
              </a>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              Orientações de emergência não dependem de cadastro, pagamento ou geração de documentos. Se houver risco de monitoramento do seu dispositivo, utilize o botão de saída rápida ao lado.
            </p>
          </div>
        )}

        {/* AVISO DE ESCOPO E PRIVACIDADE ANTES DO FORMULÁRIO */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <ShieldAlert size={16} className="text-amber-700" aria-hidden="true" />
            Informações importantes antes de enviar seu relato
          </p>
          <p className="text-xs text-amber-800 leading-relaxed">
            A Aurora é uma ferramenta informativa que ajuda a identificar temas jurídicos e organizar pontos principais. Não substitui consulta jurídica com defensora pública ou advogada. 
            <strong> Para sua privacidade, recomendamos não incluir dados como nome completo, CPF ou endereço residencial detalhado no relato.</strong>
          </p>
        </div>

        {/* CARD DO FORMULÁRIO */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Triagem de direitos da mulher</CardTitle>
            <CardDescription>
              Conte com suas palavras o que você está vivenciando. Exemplo: &ldquo;Me separei há 3 meses, ele não ajuda nas despesas dos filhos e preciso saber como pedir pensão.&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="relato">Sua história ou situação</Label>
              <Textarea
                id="relato"
                value={relato}
                onChange={(e) => setRelato(e.target.value)}
                placeholder="Descreva o que aconteceu: qual é a situação? Há filhos envolvidos? Houve ameaça ou conflito? (Evite dados pessoais desnecessários)"
                rows={6}
                aria-describedby="dica-privacidade"
              />
              <p id="dica-privacidade" className="text-xs text-muted-foreground">
                Seu relato é analisado para estruturar opções preliminares e não é compartilhado com terceiros.
              </p>
            </div>
            {erro && <p className="text-sm text-red-600 font-medium" role="alert">{erro}</p>}
            <div className="flex flex-wrap gap-2">
              <Button onClick={analisar} disabled={loading || gravando}>
                {loading ? 'Analisando...' : 'Analisar situação'}
              </Button>
              <Button
                variant={gravando ? 'destructive' : 'outline'}
                onClick={alternarGravacao}
                disabled={loading}
                type="button"
              >
                {gravando ? (<><Square size={16} className="mr-1.5" /> Parar</>) : (<><Mic size={16} className="mr-1.5" /> Ditar por voz</>)}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  recogRef.current?.stop()
                  setRelato('')
                  setResultado(null)
                  setRespostasEsclarecimento({})
                }}
              >
                Limpar
              </Button>
            </div>
            {gravando && (
              <p className="text-sm text-aurora-700 animate-pulse font-medium">
                🎤 Ouvindo... Fale com tranquilidade e clique em Parar quando concluir.
              </p>
            )}
          </CardContent>
        </Card>

        {/* RESULTADO DA TRIAGEM */}
        {resultado && (
          <Card className="animate-in border-aurora-200 shadow-md">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-aurora-100 text-aurora-900 border-aurora-300 font-medium">
                  Possível assunto identificado
                </Badge>
                <CardTitle className="text-xl text-neutral-900">
                  {TIPO_CASO_LABELS[resultado.tipo_caso] ?? resultado.tipo_caso}
                </CardTitle>
                {urg && (
                  <Badge className={urg.color}>
                    {urg.icon} Urgência estimada: {urg.label}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs text-neutral-600 mt-2">
                {resultado.aviso_legal ?? 'Classificação preliminar baseada nos termos do relato. Não constitui diagnóstico nem parecer jurídico individual.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PERGUNTAS DE ESCLARECIMENTO */}
              {resultado.perguntas_esclarecimento && resultado.perguntas_esclarecimento.length > 0 && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-neutral-900">
                    <HelpCircle size={16} className="text-aurora-600" aria-hidden="true" />
                    Perguntas de esclarecimento (opcional)
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estas respostas ajudam a delimitar o contexto para a consulta com a profissional. Você pode optar por &ldquo;Não sei&rdquo; ou &ldquo;Prefiro não responder&rdquo;.
                  </p>
                  {resultado.perguntas_esclarecimento.map((p) => (
                    <div key={p.id} className="space-y-2 pt-2 border-t first:border-t-0">
                      <p className="text-sm font-medium text-neutral-800">{p.pergunta}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.opcoes.map((opcao) => {
                          const selecionada = respostasEsclarecimento[p.id] === opcao
                          return (
                            <button
                              key={opcao}
                              type="button"
                              onClick={() => setRespostasEsclarecimento(prev => ({ ...prev, [p.id]: opcao }))}
                              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                                selecionada
                                  ? 'bg-aurora-600 text-white border-aurora-600 font-semibold'
                                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                              }`}
                            >
                              {opcao}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ORIENTAÇÕES E PRÓXIMOS PASSOS */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Orientações recomendadas</h3>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-neutral-700">
                  {resultado.proximos_passos.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ol>
              </div>

              {/* AVISO DE DADOS INSUFICIENTES OU DOCUMENTOS SUGERIDOS */}
              {resultado.dados_insuficientes ? (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-900">
                  <p className="font-semibold">Informações preliminares</p>
                  <p className="text-xs text-blue-800 mt-1">
                    Com base no relato fornecido, os dados ainda são preliminares para estruturar peças jurídicas com segurança. Recomendamos detalhar com calma ou levar o caso para atendimento presencial na Defensoria Pública antes de elaborar minutas.
                  </p>
                </div>
              ) : resultado.documentos_sugeridos.length > 0 ? (
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Modelos-base sugeridos para revisão</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Minutas iniciais que devem ser revisadas e assinadas por defensora ou advogada:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resultado.documentos_sugeridos.map((d) => (
                      <Badge key={d} className="bg-aurora-50 text-aurora-800 border-aurora-200 py-1 px-2.5">
                        📄 {d.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* AÇÕES FINAIS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button onClick={salvarCaso} disabled={loading}>
                  Salvar caso e preparar minutas
                </Button>
                <Link href="/checklist">
                  <Button variant="outline">Ver checklist da Defensoria</Button>
                </Link>
                <p className="text-xs text-muted-foreground self-center">
                  O cadastro gratuito permite consultar e editar seus documentos em área protegida.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function TriagemPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center bg-aurora-50">Carregando triagem...</div>}>
      <TriagemConteudo />
    </Suspense>
  )
}
