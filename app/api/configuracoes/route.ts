import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings, setSettings, SETTINGS_KEYS } from '@/lib/settings'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await getSettings(Object.values(SETTINGS_KEYS))
  return NextResponse.json(settings)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  await setSettings(body)
  return NextResponse.json({ ok: true })
}
