import type { TriagemResult, TipoCaso, Urgencia, PerguntaEsclarecimento } from '../types'
import { TIPO_CASO_CATEGORIAS, TIPO_CASO_LABELS } from '../constants'

// Classificador preliminar por regras + termos-chave para orientação informativa.
// Não substitui parecer individual nem diagnóstico emitido por profissional jurídica.

interface Regra {
  tipo: TipoCaso
  keywords: string[]
  urgenciaBase: Urgencia
  docs: string[]
  passos: string[]
}

const REGRAS: Regra[] = [
  {
    tipo: 'medida_protetiva_urgente',
    keywords: ['ameaçou', 'ameaca', 'morte', 'bateu', 'agrediu', 'agressão', 'violência', 'violencia', 'medo', 'persegue', 'stalk', 'maria da penha', 'protetiva'],
    urgenciaBase: 'critica',
    docs: ['medida_protetiva', 'boletim_ocorrencia_guia'],
    passos: [
      'Ligue 180 (Central de Atendimento à Mulher) ou 190 em caso de risco imediato',
      'A medida protetiva pode ser solicitada na Delegacia da Mulher, na Defensoria Pública ou no Juizado de Violência Doméstica',
      'Peça as medidas necessárias (ex.: afastamento do agressor da residência, proibição de contato e aproximação)',
      'Se possível e seguro, guarde mensagens, fotos, áudios e nomes de pessoas que presenciaram os fatos',
    ],
  },
  {
    tipo: 'pensao_alimenticia_inicial',
    keywords: ['pensão', 'pensao', 'alimento', 'filho', 'não paga', 'nao paga', 'sustento', 'guarda', 'paga pouco'],
    urgenciaBase: 'alta',
    docs: ['peticao_alimentos', 'alimentos_provisorios', 'gratuidade'],
    passos: [
      'Reúna certidões de nascimento dos filhos e comprovante de endereço atualizado',
      'Faça um levantamento das despesas regulares dos filhos (escola, alimentação, saúde, vestuário)',
      'Consulte a Defensoria Pública ou advogada para verificar a viabilidade de acordo prévio ou pedido judicial',
      'Em caso de necessidade imediata, pode ser requerido ao juiz arbitramento de alimentos provisórios',
    ],
  },
  {
    tipo: 'divorcio_consensual',
    keywords: ['divórcio', 'divorcio', 'separar', 'concordam', 'acordo', 'amigável', 'amigavel', 'partilha'],
    urgenciaBase: 'normal',
    docs: ['peticao_divorcio_consensual', 'partilha_bens', 'gratuidade'],
    passos: [
      'Verifiquem o consenso sobre partilha de bens, convivência com filhos e necessidade de pensão',
      'Reúnam certidão de casamento atualizada e comprovantes de propriedade dos bens comuns',
      'Apresentem minuta conjunta à Defensoria Pública ou advogada para protocolo ou encaminhamento ao cartório',
    ],
  },
  {
    tipo: 'divorcio_litigioso',
    keywords: ['divórcio', 'divorcio', 'não concorda', 'nao concorda', 'briga', 'litígio', 'litigio', 'saiu de casa'],
    urgenciaBase: 'alta',
    docs: ['peticao_divorcio_litigioso', 'alimentos_provisorios', 'gratuidade'],
    passos: [
      'Anote a data aproximada da separação de fato',
      'Faça uma listagem detalhada do patrimônio comum e eventuais dívidas adquiridas',
      'Procure a Defensoria Pública ou advogada para ajuizamento da ação e eventual pedido de medidas liminares',
    ],
  },
  {
    tipo: 'guarda_compartilhada',
    keywords: ['guarda compartilhada', 'guarda', 'visita', 'ver meu filho', 'não deixa ver', 'regulamentar'],
    urgenciaBase: 'alta',
    docs: ['regulamentacao_visitas', 'guarda_compartilhada', 'gratuidade'],
    passos: [
      'Documente tentativas de convivência e a rotina atual dos filhos',
      'A regra geral da legislação é a guarda compartilhada, sempre visando ao melhor interesse da criança',
      'Consulte assistência jurídica para formalizar o plano de convivência e visitas',
    ],
  },
  {
    tipo: 'assedio_sexual',
    keywords: ['assédio sexual', 'assedio sexual', 'chefe', 'toque', 'cantada', 'trabalho', 'demitida', 'chantagem'],
    urgenciaBase: 'alta',
    docs: ['denuncia_assedio', 'rescisao_indireta_guia'],
    passos: [
      'Preserve com segurança todos os registros (mensagens, e-mails, registros de ponto, nomes de colegas)',
      'Avalie relatar nos canais de compliance da empresa ou no Ministério Público do Trabalho (MPT)',
      'Consulte a Defensoria Pública (seção trabalhista) ou advogada sobre a possibilidade de rescisão indireta',
    ],
  },
  {
    tipo: 'assedio_moral',
    keywords: ['assédio moral', 'assedio moral', 'humilha', 'grita', 'perseguição no trabalho', 'pressão'],
    urgenciaBase: 'normal',
    docs: ['denuncia_assedio', 'rescisao_indireta_guia'],
    passos: [
      'Mantenha um diário com datas, horários, locais, fatos ocorridos e possíveis testemunhas',
      'Consulte o sindicato da categoria profissional e canais de orientação trabalhista',
      'Converse com uma profissional para analisar os caminhos legais cabíveis',
    ],
  },
  {
    tipo: 'licenca_maternidade_negada',
    keywords: ['licença maternidade', 'licenca maternidade', 'grávida', 'gravida', 'gestante', 'demitiram grávida', 'estabilidade'],
    urgenciaBase: 'alta',
    docs: ['reclamatoria_trabalhista', 'estabilidade_gestante'],
    passos: [
      'A legislação prevê estabilidade provisória da gestante desde a confirmação da gravidez até 5 meses após o parto',
      'Guarde laudos médicos, exames com data e a carteira de trabalho',
      'Busque atendimento na Defensoria Pública ou advogada trabalhista para pleitear reintegração ou indenização',
    ],
  },
  {
    tipo: 'nome_sujo_indevido',
    keywords: ['spc', 'serasa', 'nome sujo', 'dívida que não fiz', 'cobrança indevida', 'negativação'],
    urgenciaBase: 'normal',
    docs: ['declaratoria_inexistencia_debito', 'dano_moral_guia'],
    passos: [
      'Obtenha o extrato formal do órgão de proteção ao crédito comprovando a negativação',
      'Formalize contestação administrativa perante a empresa cobradora e guarde o protocolo',
      'Consulte a Defensoria Pública ou Juizado Especial Cível para contestar a dívida indevida',
    ],
  },
  {
    tipo: 'inventario',
    keywords: ['inventário', 'inventario', 'falecido', 'herança', 'heranca', 'partilha herança', 'pai morreu', 'mãe morreu'],
    urgenciaBase: 'normal',
    docs: ['inventario_inicial', 'nomeacao_inventariante'],
    passos: [
      'Reúna a certidão de óbito, documentos dos herdeiros e certidões de bens do falecido',
      'Fique atenta ao prazo legal de 60 dias para abertura do procedimento sem incidência de multa fiscal',
      'Havendo concordância e ausência de herdeiros menores, o procedimento pode ser realizado em cartório',
    ],
  },
]

const RISCO_CRITICO = ['morte', 'matar', 'faca', 'arma', 'bateu', 'sangue', 'ontem me bateu', 'ameaçou de morte', 'subtração', 'levou meu filho', 'sumiu com']
const RISCO_ALTO = ['medida protetiva', 'boletim', 'não paga há meses', 'despejo', 'demitida grávida']

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function obterPerguntasEsclarecimento(tipo: TipoCaso): PerguntaEsclarecimento[] {
  const padraoOpcoes = ['Não sei', 'Prefiro não responder']
  switch (tipo) {
    case 'pensao_alimenticia_inicial':
      return [
        {
          id: 'decisao_previa',
          pergunta: 'Já existe algum valor de pensão fixado formalmente por juiz ou em cartório?',
          opcoes: ['Não, nunca foi fixado formalmente', 'Sim, já existe decisão judicial ou acordo homologado', ...padraoOpcoes],
        },
        {
          id: 'filhos_menores',
          pergunta: 'Há filhos menores de 18 anos ou dependentes com necessidades especiais?',
          opcoes: ['Sim, há filhos menores de 18 anos', 'Não há menores dependentes', ...padraoOpcoes],
        },
      ]
    case 'medida_protetiva_urgente':
      return [
        {
          id: 'seguranca_imediata',
          pergunta: 'Você e seus dependentes estão em um local seguro neste momento?',
          opcoes: ['Sim, estou em local seguro', 'Não / sinto risco iminente à minha segurança', ...padraoOpcoes],
        },
        {
          id: 'convivencia_agressor',
          pergunta: 'O autor das agressões/ameaças reside no mesmo imóvel ou tem livre acesso?',
          opcoes: ['Sim, reside no mesmo imóvel ou tem livre acesso', 'Não reside no local', ...padraoOpcoes],
        },
      ]
    case 'divorcio_consensual':
    case 'divorcio_litigioso':
      return [
        {
          id: 'acordo_partes',
          pergunta: 'Existe concordância entre as partes sobre a partilha de bens e os cuidados com filhos?',
          opcoes: ['Sim, há acordo mútuo', 'Não, há divergência ou disputa', ...padraoOpcoes],
        },
      ]
    case 'guarda_compartilhada':
    case 'guarda_unilateral':
      return [
        {
          id: 'residencia_filhos',
          pergunta: 'Com quem os filhos estão residindo atualmente?',
          opcoes: ['Residem comigo', 'Residem com o outro genitor', 'Alternam moradia', ...padraoOpcoes],
        },
      ]
    case 'assedio_moral':
    case 'assedio_sexual':
      return [
        {
          id: 'vinculo_empregaticio',
          pergunta: 'Você ainda está trabalhando ativamente na empresa/instituição?',
          opcoes: ['Sim, continuo trabalhando', 'Não, fui demitida ou já me afastei', ...padraoOpcoes],
        },
      ]
    default:
      return [
        {
          id: 'contato_defensoria',
          pergunta: 'Você já tentou algum contato ou atendimento prévio com a Defensoria Pública?',
          opcoes: ['Não, este é o primeiro contato', 'Sim, já fui atendida anteriormente', ...padraoOpcoes],
        },
      ]
  }
}

export function triar(relato: string): TriagemResult {
  const texto = norm(relato)
  let melhor: Regra | null = null
  let melhorScore = 0

  for (const regra of REGRAS) {
    let score = 0
    for (const kw of regra.keywords) {
      if (texto.includes(norm(kw))) score += kw.length > 6 ? 2 : 1
    }
    if (score > melhorScore) {
      melhorScore = score
      melhor = regra
    }
  }

  if (!melhor || melhorScore === 0) {
    return {
      tipo_caso: 'fora_escopo',
      categoria: 'outro',
      urgencia: 'baixa',
      confianca: 0.3,
      assunto_identificado: 'Assunto não identificado com clareza',
      dados_insuficientes: true,
      perguntas_esclarecimento: [
        {
          id: 'detalhe_geral',
          pergunta: 'Seu caso envolve família (divórcio, pensão, guarda), situação de violência ou relação de trabalho?',
          opcoes: ['Direito de Família', 'Situação de Violência / Ameaça', 'Direito do Trabalho', 'Não sei', 'Prefiro não responder'],
        },
      ],
      dados_extraidos: extrairDados(relato),
      proximos_passos: [
        'Descreva com um pouco mais de detalhes o que aconteceu, datas aproximadas e quem está envolvido.',
        'Se você estiver sob risco imediato, ligue 190 (Polícia Militar) ou 180 (Central da Mulher).',
        'Consulte uma defensora pública ou advogada para avaliação personalizada do seu relato.',
      ],
      documentos_sugeridos: [],
      tokens_estimados: Math.ceil(relato.length / 4),
      aviso_legal: 'Dados insuficientes para estruturar minutas no momento. Recomendamos detalhar melhor ou buscar atendimento presencial.',
    }
  }

  let urgencia: Urgencia = melhor.urgenciaBase
  if (RISCO_CRITICO.some((k) => texto.includes(norm(k)))) urgencia = 'critica'
  else if (RISCO_ALTO.some((k) => texto.includes(norm(k))) && urgencia !== 'critica') urgencia = 'alta'

  const confianca = Math.min(0.55 + melhorScore * 0.08, 0.95)
  const dadosInsuficientes = melhorScore < 2 || relato.trim().split(/\s+/).length < 6

  return {
    tipo_caso: melhor.tipo,
    categoria: TIPO_CASO_CATEGORIAS[melhor.tipo] ?? 'família',
    urgencia,
    confianca: Math.round(confianca * 100) / 100,
    assunto_identificado: TIPO_CASO_LABELS[melhor.tipo] ?? melhor.tipo,
    dados_insuficientes: dadosInsuficientes,
    perguntas_esclarecimento: obterPerguntasEsclarecimento(melhor.tipo),
    dados_extraidos: extrairDados(relato),
    proximos_passos: melhor.passos,
    // Quando os dados forem muito vagos/insuficientes, não sugerimos documentos precipitadamente sem ressalva
    documentos_sugeridos: dadosInsuficientes ? [] : melhor.docs,
    tokens_estimados: Math.ceil(relato.length / 4),
    aviso_legal: 'Classificação preliminar baseada em termos informados. Não substitui consulta jurídica individual.',
  }
}

export function extrairDados(relato: string): Record<string, unknown> {
  const dados: Record<string, unknown> = {}
  const cpf = relato.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/)
  if (cpf) dados.cpf_mencionado = true
  const filhos = relato.match(/(\d+)\s*filhos?/i)
  if (filhos) dados.qtd_filhos_mencionada = parseInt(filhos[1], 10)
  const valor = relato.match(/R\$\s?([\d.,]*\d)/)
  if (valor) dados.valor_mencionado = valor[1]
  const cidades = relato.match(/(São Paulo|Rio de Janeiro|Belo Horizonte|Salvador|Fortaleza|Recife|Porto Alegre|Curitiba|Goiânia|Brasília|Manaus|Belém)/i)
  if (cidades) dados.cidade_mencionada = cidades[1]
  return dados
}
