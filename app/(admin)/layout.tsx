import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Settings, BarChart3, LogOut, Zap } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">2time</span>
              <span className="font-bold text-sm" style={{ color: '#6366f1' }}> SEO</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItem href="/admin/glossario" icon={<BookOpen size={16} />} label="Glossário" />
          <NavItem href="/admin/indexacao"  icon={<BarChart3 size={16} />} label="Indexação" />
          <NavItem href="/admin/configuracoes" icon={<Settings size={16} />} label="Configurações" />
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{session.user?.email}</p>
          <Link href="/api/auth/signout" className="flex items-center gap-2 mt-2 text-xs hover:text-red-400 transition-colors" style={{ color: 'var(--muted)' }}>
            <LogOut size={13} /> Sair
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all"
      style={{ color: 'var(--muted)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.10)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)' }}
    >
      {icon} {label}
    </Link>
  )
}
