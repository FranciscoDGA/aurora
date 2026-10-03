// Rate limit por IP em memória (fixed window).
// Funciona no Edge Runtime, sem dependências. Limite conhecido: cada isolate
// do Vercel tem o seu contador — complemente com WAF/Cloudflare para escala.
const JANELA_MS = 60_000
const LIMITE_PADRAO = 8
const MAX_CHAVES = 5000

const janelas = new Map<string, { count: number; inicio: number }>()

export function limiteAtingido(
  chave: string,
  limite: number = LIMITE_PADRAO,
  janelaMs: number = JANELA_MS,
): boolean {
  const agora = Date.now()
  const atual = janelas.get(chave)

  if (!atual || agora - atual.inicio >= janelaMs) {
    if (janelas.size >= MAX_CHAVES) {
      janelas.forEach((v, k) => {
        if (agora - v.inicio >= janelaMs) janelas.delete(k)
      })
      if (janelas.size >= MAX_CHAVES) janelas.clear()
    }
    janelas.set(chave, { count: 1, inicio: agora })
    return false
  }

  atual.count += 1
  return atual.count > limite
}

export function ipDaRequisicao(req: Request): string {
  const encaminhado = req.headers.get('x-forwarded-for')
  if (encaminhado) return encaminhado.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'desconhecido'
}
