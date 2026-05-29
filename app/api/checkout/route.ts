import { NextRequest, NextResponse } from 'next/server'
import { criarPreferencia } from '@/lib/mercadopago'

export async function POST(req: NextRequest) {
  try {
    const { plano, email } = await req.json().catch(() => ({}))
    if (!plano) return NextResponse.json({ error: 'Plano obrigatório' }, { status: 400 })

    const pref = await criarPreferencia(plano, email)
    return NextResponse.json({ init_point: pref.init_point })
  } catch (e: any) {
    console.error('[checkout]', e?.message)
    return NextResponse.json({ error: e?.message || 'Erro ao criar checkout' }, { status: 500 })
  }
}
