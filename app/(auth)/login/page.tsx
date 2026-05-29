'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.ok) { router.push('/admin/glossario') }
    else { setError('E-mail ou senha incorretos'); setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">2time <span style={{ color: '#6366f1' }}>SEO</span></h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Gerador de Glossário com IA</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--muted)' }}>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--muted)' }}>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
