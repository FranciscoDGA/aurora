import { describe, expect, it } from 'vitest'
import { ipDaRequisicao, limiteAtingido } from './rate-limit'

function chaveUnica() {
  return `teste:${Date.now()}:${Math.random()}`
}

describe('limiteAtingido', () => {
  it('permite até o limite e bloqueia a partir da chamada seguinte', () => {
    const chave = chaveUnica()
    const dentroDoLimite = Array.from({ length: 5 }, () => limiteAtingido(chave, 5))
    expect(dentroDoLimite).toEqual([false, false, false, false, false])
    expect(limiteAtingido(chave, 5)).toBe(true)
    expect(limiteAtingido(chave, 5)).toBe(true)
  })

  it('mantém janelas independentes por chave', () => {
    const a = chaveUnica()
    const b = chaveUnica()
    for (let i = 0; i < 3; i++) limiteAtingido(a, 3)
    expect(limiteAtingido(a, 3)).toBe(true)
    expect(limiteAtingido(b, 3)).toBe(false)
  })

  it('expira a janela após o período configurado', () => {
    const chave = chaveUnica()
    expect(limiteAtingido(chave, 1, 0)).toBe(false)
    expect(limiteAtingido(chave, 1, 0)).toBe(false)
  })
})

describe('ipDaRequisicao', () => {
  it('lê o primeiro IP do x-forwarded-for', () => {
    const req = new Request('http://localhost/api', {
      headers: { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' },
    })
    expect(ipDaRequisicao(req)).toBe('203.0.113.7')
  })

  it('cai para "desconhecido" sem cabeçalhos', () => {
    expect(ipDaRequisicao(new Request('http://localhost/api'))).toBe('desconhecido')
  })
})
