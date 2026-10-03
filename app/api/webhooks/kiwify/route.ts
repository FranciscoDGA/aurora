import { NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createHmac, timingSafeEqual } from 'crypto'

// Cliente admin (service_role): atualiza plano ignorando RLS.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
)

interface PayloadKiwify {
  order_status?: string
  Customer?: { email?: string }
  customer?: { email?: string }
  Product?: { product_name?: string }
  product?: { product_name?: string }
}

// Kiwify aceita dois esquemas de segurança (configuráveis no painel de webhooks):
// 1. Header estático `x-webhook-token` comparado com KIWIFY_WEBHOOK_TOKEN
// 2. Header `x-kiwify-signature` = HMAC-SHA256 do corpo bruto com KIWIFY_WEBHOOK_SECRET
function verificarAssinatura(body: string, req: Request): { ok: boolean; motivo: string } {
  const token = process.env.KIWIFY_WEBHOOK_TOKEN
  if (token) {
    const recebido = req.headers.get('x-webhook-token')
    if (!recebido) return { ok: false, motivo: 'x-webhook-token ausente' }
    return recebido === token
      ? { ok: true, motivo: 'token ok' }
      : { ok: false, motivo: 'x-webhook-token inválido' }
  }

  const segredo = process.env.KIWIFY_WEBHOOK_SECRET
  if (segredo) {
    const recebido = req.headers.get('x-kiwify-signature')
    if (!recebido) return { ok: false, motivo: 'x-kiwify-signature ausente' }
    const esperado = createHmac('sha256', segredo).update(body).digest('hex')
    const a = Buffer.from(esperado, 'utf8')
    const b = Buffer.from(recebido, 'utf8')
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false, motivo: 'assinatura divergente' }
    }
    return { ok: true, motivo: 'hmac ok' }
  }

  // Nenhum segredo configurado: bloqueia em produção, permite em dev local.
  if (process.env.VERCEL_ENV === 'production') {
    return { ok: false, motivo: 'KIWIFY_WEBHOOK_TOKEN/SECRET não configurado' }
  }
  console.warn('[kiwify] webhook aceito sem segredo configurado (apenas fora de produção)')
  return { ok: true, motivo: 'sem segredo (dev)' }
}

// Varre a paginação do Auth: listUsers() sem página acha só os primeiros registros.
async function acharUsuarioPorEmail(
  cliente: SupabaseClient,
  email: string,
): Promise<{ id: string } | null> {
  const PAGINA_MAX = 20
  for (let pagina = 1; pagina <= PAGINA_MAX; pagina++) {
    const { data, error } = await cliente.auth.admin.listUsers({ page: pagina, perPage: 100 })
    if (error) throw error
    const achado = data.users.find((u) => (u.email ?? '').toLowerCase() === email)
    if (achado) return { id: achado.id }
    if (data.users.length < 100) break
  }
  return null
}

async function atualizarPlano(email: string, plano: string): Promise<NextResponse> {
  const usuario = await acharUsuarioPorEmail(supabase, email)
  if (!usuario) {
    console.warn(`[kiwify] pagamento recebido para ${email}, mas o usuário não existe ainda`)
    return NextResponse.json({ received: true, usuario: false }, { status: 200 })
  }

  const { error } = await supabase.from('perfis').update({ plano }).eq('id', usuario.id)
  if (error) {
    console.error('[kiwify] erro ao atualizar plano:', error.message)
    return NextResponse.json({ error: 'Erro ao atualizar plano' }, { status: 500 })
  }

  console.log(`[kiwify] plano de ${email} atualizado para ${plano}`)
  return NextResponse.json({ received: true, plano }, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text()

    const verificacao = verificarAssinatura(bodyText, req)
    if (!verificacao.ok) {
      console.error(`[kiwify] entrega rejeitada: ${verificacao.motivo}`)
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 })
    }

    let payload: PayloadKiwify
    try {
      payload = JSON.parse(bodyText) as PayloadKiwify
    } catch {
      // A Kiwify às vezes envia urlencoded
      payload = Object.fromEntries(new URLSearchParams(bodyText)) as PayloadKiwify
    }

    const order_status = payload.order_status
    const customer = payload.Customer ?? payload.customer
    const product = payload.Product ?? payload.product

    if (!order_status || !customer?.email) {
      return NextResponse.json({ error: 'Payload incompleto' }, { status: 400 })
    }
    const email = customer.email.toLowerCase()

    if (order_status === 'paid') {
      const nomeProduto = (product?.product_name ?? '').toLowerCase()
      const plano = nomeProduto.includes('pro') || nomeProduto.includes('premium')
        ? 'aurora_pro'
        : 'aurora_plus'
      return await atualizarPlano(email, plano)
    }

    if (order_status === 'refunded' || order_status === 'chargedback') {
      return await atualizarPlano(email, 'gratuito')
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('[kiwify] erro no webhook:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
