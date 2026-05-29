export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { GlossarioAdmin } from '@/components/admin/GlossarioAdmin'
import { getConfig } from '@/lib/settings'

export const metadata = { title: 'Glossário' }

export default async function GlossarioPage() {
  const [termos, totalPublicados, totalPendentes, config] = await Promise.all([
    prisma.glossaryTerm.findMany({
      orderBy: [{ letra: 'asc' }, { termo: 'asc' }],
      take: 500,
    }),
    prisma.glossaryTerm.count({ where: { publicado: true } }),
    prisma.glossaryTerm.count({ where: { publicado: false } }),
    getConfig(),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Gerador de Glossário</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Nicho: <strong className="text-white">{config.siteNiche || 'Não configurado — vá em Configurações'}</strong>
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <KpiCard label="Publicados" value={totalPublicados} color="#22c55e" />
        <KpiCard label="Pendentes"  value={totalPendentes}  color="#f59e0b" />
        <KpiCard label="Total"      value={termos.length}   color="#6366f1" />
      </div>

      <GlossarioAdmin initialTermos={termos as any} defaultNicho={config.siteNiche} siteUrl={config.siteUrl} />
    </div>
  )
}

function KpiCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    </div>
  )
}
