export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { CheckCircle, XCircle, Clock, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Indexação' }

export default async function IndexacaoPage() {
  const [logs, totalGoogle, totalIndexNow, erros] = await Promise.all([
    prisma.seoIndexingLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
    prisma.seoIndexingLog.count({ where: { motor: 'google', status: 'sent' } }),
    prisma.seoIndexingLog.count({ where: { motor: 'indexnow', status: 'sent' } }),
    prisma.seoIndexingLog.count({ where: { status: 'error' } }),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Indexação SEO</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Histórico de notificações Google + Bing IndexNow</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Google enviados</p>
          <p className="text-3xl font-bold text-blue-400">{totalGoogle}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Bing IndexNow</p>
          <p className="text-3xl font-bold text-orange-400">{totalIndexNow}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Erros</p>
          <p className="text-3xl font-bold text-red-400">{erros}</p>
        </div>
      </div>

      {/* Logs */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b" style={{ borderColor: 'var(--border)' }}>
            <tr className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              <th className="px-5 py-3 text-left">URL</th>
              <th className="px-4 py-3 text-left w-24">Motor</th>
              <th className="px-4 py-3 text-left w-24">Status</th>
              <th className="px-4 py-3 text-left w-32">Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <td className="px-5 py-3 font-mono text-xs truncate max-w-xs" style={{ color: 'var(--muted)' }}>
                  {log.url}
                  {log.erro && <p className="text-red-400 text-[10px] mt-0.5">{log.erro}</p>}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold" style={{ color: log.motor === 'google' ? '#60a5fa' : '#fb923c' }}>
                    {log.motor === 'google' ? '🔵 Google' : '🟠 Bing'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {log.status === 'sent'
                    ? <span className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle size={11} /> Enviado</span>
                    : log.status === 'error'
                    ? <span className="flex items-center gap-1 text-red-400 text-xs"><XCircle size={11} /> Erro</span>
                    : <span className="flex items-center gap-1 text-yellow-400 text-xs"><Clock size={11} /> Pendente</span>
                  }
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{formatDate(log.createdAt)}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-sm" style={{ color: 'var(--muted)' }}>
                <Globe size={28} className="mx-auto mb-2 opacity-30" />
                Nenhuma indexação ainda. Publique termos no glossário para começar.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
