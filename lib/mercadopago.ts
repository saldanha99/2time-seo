/**
 * 2time SEO — Integração Mercado Pago (Checkout Pro)
 *
 * Planos definidos em PLANOS. O checkout cria uma preferência e
 * redireciona para o init_point do MP.
 */

export interface Plano {
  id:     string
  nome:   string
  preco:  number
  tipo:   'mensal' | 'unico'
  descricao: string
}

export const PLANOS: Record<string, Plano> = {
  starter: { id: 'starter', nome: 'Starter',  preco: 97,    tipo: 'mensal', descricao: '2time SEO — Plano Starter (1 site)' },
  agencia: { id: 'agencia', nome: 'Agência',  preco: 297,   tipo: 'mensal', descricao: '2time SEO — Plano Agência (até 10 sites)' },
  licenca: { id: 'licenca', nome: 'Licença',  preco: 1997,  tipo: 'unico',  descricao: '2time SEO — Licença vitalícia (código-fonte)' },
}

export async function criarPreferencia(planoId: string, email?: string) {
  const plano = PLANOS[planoId]
  if (!plano) throw new Error('Plano inválido')

  const token = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!token) throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado')

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const body = {
    items: [{
      id:          plano.id,
      title:       plano.descricao,
      quantity:    1,
      unit_price:  plano.preco,
      currency_id: 'BRL',
    }],
    ...(email ? { payer: { email } } : {}),
    external_reference: `2time-${plano.id}-${Date.now()}`,
    back_urls: {
      success: `${baseUrl}/checkout/sucesso?plano=${plano.id}`,
      failure: `${baseUrl}/checkout/erro`,
      pending: `${baseUrl}/checkout/pendente`,
    },
    auto_return: 'approved',
    statement_descriptor: '2TIME SEO',
    metadata: { plano: plano.id, tipo: plano.tipo },
  }

  const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method:  'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Erro Mercado Pago: ${await res.text()}`)
  }

  const data = await res.json()
  return { id: data.id, init_point: data.init_point as string }
}
