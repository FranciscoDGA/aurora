import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Cria o cliente do Supabase usando a service_role key para ter permissão de admin (burlar RLS) e poder atualizar os perfis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    // Kiwify envia os dados via form-data ou JSON. Vamos tentar pegar o texto primeiro
    const bodyText = await req.text()
    
    // Opcional: Validar o webhook signature da Kiwify para segurança
    const kiwifySignature = req.headers.get('x-kiwify-signature')
    // Se você configurou um Token de Webhook na Kiwify, deveria validar aqui.
    
    // Parseia o payload
    let payload: any
    try {
      payload = JSON.parse(bodyText)
    } catch {
      // Se não for JSON, pode estar vindo como urlencoded (Kiwify manda urlencoded as vezes)
      const params = new URLSearchParams(bodyText)
      payload = Object.fromEntries(params.entries())
    }

    const { order_status, Customer, Product } = payload

    // order_status da Kiwify pode ser: 'paid', 'refunded', 'chargedback', etc.
    if (!order_status || !Customer || !Customer.email) {
      return NextResponse.json({ error: 'Payload incompleto' }, { status: 400 })
    }

    const email = Customer.email.toLowerCase()
    
    if (order_status === 'paid') {
      // Determina qual plano foi comprado através do nome do produto ou ID na Kiwify
      // Ajuste os nomes de acordo com o que você criar na Kiwify
      const productName = (Product?.product_name || '').toLowerCase()
      
      let novoPlano = 'clara_plus'
      if (productName.includes('pro') || productName.includes('premium')) {
        novoPlano = 'clara_pro'
      }

      // Atualiza no Supabase baseado no e-mail do usuário
      // Precisamos achar o usuário pelo e-mail (Supabase Auth) ou diretamente na tabela de perfis
      
      // Assumindo que a tabela de perfis tem um campo email ou que você busca o usuário na auth.users
      // Como não temos acesso direto ao e-mail na tabela perfis (se ele ficar só no Auth), 
      // precisamos de uma query. Se o e-mail não estiver em 'perfis', podemos buscar na auth:
      
      const { data: usersData, error: authError } = await supabase.auth.admin.listUsers()
      if (authError) throw authError

      const user = usersData.users.find(u => u.email === email)
      
      if (user) {
        // Atualiza a tabela perfil com o novo plano
        const { error: updateError } = await supabase
          .from('perfis')
          .update({ plano: novoPlano })
          .eq('id', user.id)

        if (updateError) {
          console.error('Erro ao atualizar plano no Supabase:', updateError)
          return NextResponse.json({ error: 'Erro ao atualizar BD' }, { status: 500 })
        }
        
        console.log(`Sucesso: Plano de ${email} atualizado para ${novoPlano}`)
      } else {
        console.log(`Aviso: Pagamento recebido para ${email}, mas usuário não encontrado no banco.`)
        // Opcional: Criar uma tabela "compras_pendentes" para vincular quando o usuário criar a conta.
      }
    } 
    else if (order_status === 'refunded' || order_status === 'chargedback') {
      // Se estornou, volta pro gratuito
      const { data: usersData } = await supabase.auth.admin.listUsers()
      const user = usersData?.users.find(u => u.email === email)
      if (user) {
        await supabase.from('perfis').update({ plano: 'gratuito' }).eq('id', user.id)
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
