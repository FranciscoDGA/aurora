import { describe, expect, it } from 'vitest'
import { extrairDados, triar } from './triage'

describe('triar', () => {
  it('classifica ameaça de morte como medida protetiva crítica', () => {
    const r = triar('Ele me ameaçou de morte ontem e bateu em mim. Tenho medo de voltar para casa.')
    expect(r.tipo_caso).toBe('medida_protetiva_urgente')
    expect(r.urgencia).toBe('critica')
    expect(r.documentos_sugeridos).toContain('medida_protetiva')
    expect(r.proximos_passos[0]).toContain('180')
  })

  it('ignora acentos na classificação', () => {
    const r = triar('Quero divorciar e ele não concorda com a partilha de bens.')
    expect(r.tipo_caso).toBe('divorcio_litigioso')
    expect(r.categoria).toBe('família')
  })

  it('classifica pensão alimentícia com urgência alta', () => {
    const r = triar('Meu ex não paga a pensão dos meus filhos há meses.')
    expect(r.tipo_caso).toBe('pensao_alimenticia_inicial')
    expect(r.urgencia).toBe('alta')
  })

  it('devolve fora_escopo com confiança baixa quando não há keywords', () => {
    const r = triar('Gosto de receitas de bolo de fubá e de jardinagem no fim de semana.')
    expect(r.tipo_caso).toBe('fora_escopo')
    expect(r.confianca).toBeLessThanOrEqual(0.3)
    expect(r.documentos_sugeridos).toHaveLength(0)
  })

  it('estima tokens a partir do tamanho do relato', () => {
    const r = triar('ameaçou de morte')
    expect(r.tokens_estimados).toBeGreaterThan(0)
  })
})

describe('extrairDados', () => {
  it('identifica quantidade de filhos, valor e cidade', () => {
    const dados = extrairDados('Tenho 2 filhos e ele paga R$ 400,00. Moro em São Paulo.')
    expect(dados.qtd_filhos_mencionada).toBe(2)
    expect(dados.valor_mencionado).toBe('400,00')
    expect(dados.cidade_mencionada).toBe('São Paulo')
  })

  it('marca CPF mencionado sem expor o número', () => {
    const dados = extrairDados('Meu CPF é 123.456.789-00')
    expect(dados.cpf_mencionado).toBe(true)
    expect(JSON.stringify(dados)).not.toContain('123.456.789-00')
  })
})
