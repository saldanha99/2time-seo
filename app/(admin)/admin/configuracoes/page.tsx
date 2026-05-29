'use client'

import { useState, useEffect } from 'react'
import { Save, CheckCircle, Globe, Target, MapPin, Key, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const FIELDS = [
  { key: 'site_name',    label: 'Nome do site',       placeholder: 'Minha Loja',          icon: Globe,  type: 'text',     help: 'Aparece no título das páginas e no rodapé.' },
  { key: 'site_url',     label: 'URL do site',         placeholder: 'https://meusite.com', icon: Globe,  type: 'url',      help: 'URL base para indexação e sitemap.' },
  { key: 'site_niche',   label: 'Nicho / segmento',    placeholder: 'pneus e peças de moto para Campinas, SP', icon: Target, type: 'text', help: 'Contexto passado para a IA gerar conteúdo relevante.' },
  { key: 'site_city',    label: 'Cidade / região',     placeholder: 'Campinas, SP',        icon: MapPin, type: 'text',     help: 'Usado para SEO local e citações geográficas.' },
  { key: 'indexnow_key', label: 'IndexNow Key (Bing)', placeholder: 'abc123...',           icon: Key,    type: 'text',     help: 'Chave do IndexNow para indexação no Bing. Crie em bing.com/indexnow.' },
  { key: 'google_service_account', label: 'Google Service Account (JSON)', placeholder: '{"type":"service_account",...}', icon: Search, type: 'textarea', help: 'JSON da conta de serviço Google para a Indexing API.' },
]

export default function ConfiguracoesPage() {
  const [values,  setValues]  = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)

  useEffect(() => {
    fetch('/api/configuracoes')
      .then((r) => r.json())
      .then((d) => setValues(d))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/configuracoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      setSaved(true)
      toast.success('Configurações salvas!')
      setTimeout(() => setSaved(false), 3000)
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-sm" style={{ color: 'var(--muted)' }}>Carregando...</div>

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Configurações</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Configure o nicho, domínio e integrações de indexação.</p>
      </div>

      <div className="space-y-4">
        {FIELDS.map(({ key, label, placeholder, icon: Icon, type, help }) => (
          <div key={key} className="glass rounded-2xl p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
              <Icon size={14} style={{ color: 'var(--accent)' }} /> {label}
            </label>
            <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{help}</p>
            {type === 'textarea' ? (
              <textarea
                rows={4}
                value={values[key] || ''}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full rounded-xl px-3 py-2 text-sm font-mono resize-none outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            ) : (
              <input
                type={type}
                value={values[key] || ''}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full rounded-xl px-3 py-2 text-sm outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-white transition-all"
          style={{ background: saved ? 'rgba(34,197,94,0.20)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: saved ? '#22c55e' : '#fff' }}
        >
          {saved ? <><CheckCircle size={16} /> Configurações salvas!</> : saving ? 'Salvando...' : <><Save size={16} /> Salvar configurações</>}
        </button>
      </div>
    </div>
  )
}
