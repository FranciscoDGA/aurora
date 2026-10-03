import { NextResponse } from 'next/server'
import { triar } from '@/lib/ai/triage'
import { ipDaRequisicao, limiteAtingido } from '@/lib/rate-limit'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    if (limiteAtingido(`triagem:${ipDaRequisicao(req)}`)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Aguarde um minuto e tente de novo.' },
        { status: 429 },
      )
    }

    const body = await req.json()
    const relato = String(body?.relato ?? '').trim()
    if (relato.length < 10) {
      return NextResponse.json({ error: 'Relato muito curto. Descreva com mais detalhes.' }, { status: 400 })
    }
    if (relato.length > 5000) {
      return NextResponse.json({ error: 'Relato muito longo (máx. 5000 caracteres).' }, { status: 400 })
    }
    const resultado = triar(relato)
    return NextResponse.json(resultado)
  } catch {
    return NextResponse.json({ error: 'Falha na triagem. Tente novamente.' }, { status: 500 })
  }
}
