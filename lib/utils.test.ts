import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate, generateId, maskCPF, maskPhone } from './utils'

describe('formatCurrency', () => {
  // O Intl usa espaço inquebrável (U+00A0) entre "R$" e o valor.
  it('formata centavos em reais', () => {
    expect(formatCurrency(2990)).toBe('R$\u00A029,90')
    expect(formatCurrency(0)).toBe('R$\u00A00,00')
  })
})

describe('formatDate', () => {
  it('formata data no padrão brasileiro', () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe('05/01/2026')
  })
})

describe('maskCPF', () => {
  it('mascara o CPF mantendo os 3 primeiros e os últimos 2 dígitos', () => {
    expect(maskCPF('123.456.789-00')).toBe('123.***.789-00')
  })

  it('devolve a entrada quando o CPF é inválido', () => {
    expect(maskCPF('123')).toBe('123')
  })
})

describe('maskPhone', () => {
  it('mascara celular com DDD', () => {
    expect(maskPhone('11987654321')).toBe('(11) 98765-4321')
  })

  it('devolve a entrada quando o número é curto', () => {
    expect(maskPhone('999')).toBe('999')
  })
})

describe('generateId', () => {
  it('gera UUIDs válidos e distintos', () => {
    const a = generateId()
    const b = generateId()
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    expect(a).not.toBe(b)
  })
})
