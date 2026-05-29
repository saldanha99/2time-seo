'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Zap, Sparkles, Search, TrendingUp, Bot, Globe, Check, ChevronDown,
  ArrowRight, Rocket, Clock, BarChart3, FileText, Star, ShieldCheck,
} from 'lucide-react'

// ════════════════════════════════════════════════════════════════════════════
// 2time SEO — Landing de vendas
// Estilo: estrutura SaaS (Método 3h) + energia bold/scarcity (W-Tech)
// Paleta: indigo/violet (#6366f1 / #8b5cf6) sobre dark
// ════════════════════════════════════════════════════════════════════════════

export function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-200"
      style={{
        background: '#0a0a14',
        backgroundImage: 'radial-gradient(rgba(99,102,241,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}>
      <Nav />
      <Hero />
      <SocialProof />
      <Problema />
      <ComoFunciona />
      <Features />
      <Comparativo />
      <Pricing />
      <FAQ />
      <CtaFinal />
      <Footer />
    </main>
  )
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ borderColor: 'rgba(99,102,241,0.15)', background: 'rgba(10,10,20,0.7)' }}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-white">2time<span style={{ color: '#818cf8' }}> SEO</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#precos" className="hover:text-white transition-colors">Preços</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <Link href="#precos" className="text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          Começar agora
        </Link>
      </div>
    </nav>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative max-w-5xl mx-auto px-5 pt-20 pb-16 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
        <Sparkles size={13} /> Powered by IA · Gemini · GPT · Claude
      </div>

      <h1 className="font-black text-4xl md:text-6xl leading-[1.05] tracking-tight text-white mb-6">
        Centenas de páginas que<br />
        <span style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ranqueiam no Google
        </span><br />
        no piloto automático
      </h1>

      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        O 2time SEO gera glossários completos otimizados com IA e indexa
        cada página no Google e Bing <strong className="text-white">automaticamente</strong>.
        Mais tráfego orgânico sem escrever uma linha.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <Link href="#precos" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-white px-8 py-4 rounded-2xl transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
          <Rocket size={18} /> Quero gerar meu glossário
        </Link>
        <a href="#como-funciona" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
          Ver como funciona <ChevronDown size={14} />
        </a>
      </div>

      <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
        <Check size={12} className="text-green-400" /> Sem precisar programar
        <span className="mx-1">·</span>
        <Check size={12} className="text-green-400" /> Setup em 5 minutos
      </p>

      {/* Mockup */}
      <div className="mt-16 rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(99,102,241,0.2)', boxShadow: '0 20px 80px rgba(99,102,241,0.15)' }}>
        <div className="h-9 flex items-center gap-1.5 px-4" style={{ background: '#16162a' }}>
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ background: '#0f0f1e' }}>
          {['O que é Pneu Radial', 'Como escolher SEDEX', 'O que é Kit Relação', 'Pastilha Cerâmica'].map((t, i) => (
            <div key={i} className="rounded-xl p-4 text-left" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}>✓ Publicado</span>
              </div>
              <p className="text-xs font-semibold text-white">{t}</p>
              <p className="text-[10px] text-slate-500 mt-1">Indexado no Google</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Social proof ──────────────────────────────────────────────────────────────
function SocialProof() {
  const stats = [
    { num: '6', label: 'Provedores de IA' },
    { num: '30s', label: 'Por verbete gerado' },
    { num: '2', label: 'Buscadores indexados' },
    { num: '∞', label: 'Páginas SEO' },
  ]
  return (
    <section className="border-y" style={{ borderColor: 'rgba(99,102,241,0.12)', background: 'rgba(99,102,241,0.03)' }}>
      <div className="max-w-5xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="font-black text-3xl md:text-4xl" style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Problema ──────────────────────────────────────────────────────────────────
function Problema() {
  const dores = [
    'Escrever conteúdo SEO manualmente leva horas por página',
    'Páginas novas demoram semanas para o Google indexar',
    'Plugins como Rank Math custam caro e travam o site',
    'Sem glossário, você perde buscas long-tail valiosas',
  ]
  return (
    <section className="max-w-4xl mx-auto px-5 py-20">
      <h2 className="font-black text-3xl md:text-4xl text-white text-center mb-4 tracking-tight">
        Criar conteúdo SEO do zero é <span className="text-red-400">lento e caro</span>
      </h2>
      <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
        A maioria dos sites desperdiça tráfego orgânico porque não consegue produzir conteúdo em escala.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {dores.map((d, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <span className="text-red-400 mt-0.5">✕</span>
            <p className="text-sm text-slate-300">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Como funciona ───────────────────────────────────────────────────────────
function ComoFunciona() {
  const passos = [
    { icon: <Bot size={22} />,        titulo: 'Configure o nicho', desc: 'Diga o segmento do seu negócio e conecte sua chave de IA preferida (Gemini, GPT, Claude...).' },
    { icon: <Sparkles size={22} />,   titulo: 'Gere em lote',       desc: 'A IA sugere dezenas de termos por letra e escreve verbetes completos otimizados para SEO.' },
    { icon: <Globe size={22} />,      titulo: 'Indexa sozinho',     desc: 'Cada página publicada é enviada automaticamente ao Google e Bing para indexação imediata.' },
  ]
  return (
    <section id="como-funciona" className="max-w-5xl mx-auto px-5 py-20">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#818cf8' }}>Como funciona</span>
        <h2 className="font-black text-3xl md:text-4xl text-white mt-2 tracking-tight">3 passos para dominar o Google</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {passos.map((p, i) => (
          <div key={i} className="relative rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>{i + 1}</div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' }}>{p.icon}</div>
            <h3 className="font-bold text-white text-lg mb-2">{p.titulo}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
function Features() {
  const feats = [
    { icon: <Bot size={20} />,        t: 'Multi-provider de IA',     d: 'Gemini, OpenAI, Anthropic, OpenRouter, Groq e DeepSeek. Escolha o modelo e o custo.' },
    { icon: <Sparkles size={20} />,   t: 'Gerador Ninja',            d: 'Sugestão de termos por letra A-Z com prefixos ("O que é", "Como funciona") e geração em lote.' },
    { icon: <Search size={20} />,     t: 'Indexação instantânea',    d: 'Google Indexing API + IndexNow (Bing) com log de auditoria de cada envio.' },
    { icon: <FileText size={20} />,   t: 'Schema.org automático',    d: 'Cada verbete sai com DefinedTerm, meta tags e Open Graph perfeitos.' },
    { icon: <BarChart3 size={20} />,  t: 'Dashboard de indexação',   d: 'Acompanhe quais páginas foram enviadas, aceitas ou com erro, em tempo real.' },
    { icon: <ShieldCheck size={20} />,t: 'Suas chaves, seu controle',d: 'API keys ficam no seu navegador. Nada trafega para servidores terceiros.' },
  ]
  return (
    <section id="recursos" className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#818cf8' }}>Recursos</span>
        <h2 className="font-black text-3xl md:text-4xl text-white mt-2 tracking-tight">Tudo que um Rank Math faz — e mais</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {feats.map((f, i) => (
          <div key={i} className="rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.12)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc' }}>{f.icon}</div>
            <h3 className="font-bold text-white mb-2">{f.t}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Comparativo ─────────────────────────────────────────────────────────────
function Comparativo() {
  const rows = [
    ['Geração de conteúdo com IA', true, false],
    ['Indexação automática Google + Bing', true, false],
    ['Multi-provider de IA', true, false],
    ['Sem mensalidade de plugin', true, false],
    ['Glossário A-Z otimizado', true, false],
    ['Funciona em qualquer site Next.js', true, false],
  ]
  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <h2 className="font-black text-3xl md:text-4xl text-white text-center mb-12 tracking-tight">2time SEO vs. plugins tradicionais</h2>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="grid grid-cols-3 text-center py-4 font-bold text-sm" style={{ background: 'rgba(99,102,241,0.08)' }}>
          <span className="text-slate-400">Recurso</span>
          <span style={{ color: '#818cf8' }}>2time SEO</span>
          <span className="text-slate-500">Plugins SEO</span>
        </div>
        {rows.map(([label, a, b], i) => (
          <div key={i} className="grid grid-cols-3 items-center text-center py-3.5 text-sm border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <span className="text-slate-300 text-left px-4 text-xs sm:text-sm">{label as string}</span>
            <span>{a ? <Check size={18} className="mx-auto text-green-400" /> : <span className="text-slate-600">—</span>}</span>
            <span>{b ? <Check size={18} className="mx-auto text-green-400" /> : <span className="text-slate-600">—</span>}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)

  async function assinar(planoId: string) {
    setLoading(planoId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plano: planoId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.init_point
    } catch (e) {
      // Fallback: WhatsApp se o checkout falhar
      window.open('https://wa.me/5519974049445?text=Tenho%20interesse%20no%202time%20SEO', '_blank')
      setLoading(null)
    }
  }

  const planos = [
    {
      id: 'starter', nome: 'Starter', preco: '97', periodo: '/mês', destaque: false,
      desc: 'Para um site próprio',
      itens: ['1 site / domínio', 'Glossário ilimitado', 'Indexação Google + Bing', 'Multi-provider de IA', 'Suporte por e-mail'],
    },
    {
      id: 'agencia', nome: 'Agência', preco: '297', periodo: '/mês', destaque: true,
      desc: 'Para quem gerencia vários clientes',
      itens: ['Até 10 sites / domínios', 'Tudo do Starter', 'Instâncias separadas por cliente', 'Marca branca (white-label)', 'Suporte prioritário WhatsApp'],
    },
    {
      id: 'licenca', nome: 'Licença', preco: '1.997', periodo: 'único', destaque: false,
      desc: 'Código-fonte para devs',
      itens: ['Código-fonte completo', 'Instale em projetos ilimitados', 'Atualizações por 1 ano', 'Instalador via CLI', 'Sem mensalidade'],
    },
  ]
  return (
    <section id="precos" className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#818cf8' }}>Preços</span>
        <h2 className="font-black text-3xl md:text-4xl text-white mt-2 tracking-tight">Escolha seu plano</h2>
        <p className="text-slate-400 mt-3">Sem fidelidade. Cancele quando quiser.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {planos.map((p, i) => (
          <div key={i} className="relative rounded-2xl p-7"
            style={{
              background: p.destaque ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
              border: p.destaque ? '1.5px solid rgba(99,102,241,0.5)' : '1px solid rgba(99,102,241,0.12)',
              boxShadow: p.destaque ? '0 0 50px rgba(99,102,241,0.2)' : 'none',
            }}>
            {p.destaque && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-white px-3 py-1 rounded-full" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                Mais popular
              </div>
            )}
            <h3 className="font-bold text-white text-lg">{p.nome}</h3>
            <p className="text-xs text-slate-500 mb-4">{p.desc}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm text-slate-400">R$</span>
              <span className="font-black text-4xl text-white">{p.preco}</span>
              <span className="text-sm text-slate-500">{p.periodo}</span>
            </div>
            <ul className="space-y-2.5 mb-7">
              {p.itens.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-400 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button onClick={() => assinar(p.id)} disabled={loading === p.id}
              className="block w-full text-center font-bold py-3 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60"
              style={p.destaque
                ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }
                : { background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(99,102,241,0.2)' }}>
              {loading === p.id ? 'Redirecionando...' : `Assinar ${p.nome}`}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const faqs = [
    { q: 'Preciso saber programar?', a: 'Não. Nos planos Starter e Agência você recebe um painel pronto — só configurar o nicho, colar a chave de IA e clicar em gerar.' },
    { q: 'De onde vem o conteúdo?', a: 'Da IA que você escolher (Gemini, GPT, Claude e outras). Você usa sua própria chave de API, então paga só o custo real dos tokens — sem markup.' },
    { q: 'Como funciona a indexação?', a: 'Cada página publicada é enviada automaticamente ao Google (Indexing API) e ao Bing (IndexNow). Você acompanha tudo num dashboard de auditoria.' },
    { q: 'Posso usar no meu site que já existe?', a: 'Sim. Na Licença você recebe o código-fonte e um instalador via CLI que integra o gerador a qualquer projeto Next.js + Prisma.' },
    { q: 'Tem fidelidade?', a: 'Não. Os planos mensais podem ser cancelados a qualquer momento. A Licença é pagamento único.' },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="max-w-3xl mx-auto px-5 py-20">
      <h2 className="font-black text-3xl md:text-4xl text-white text-center mb-12 tracking-tight">Perguntas frequentes</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.12)' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-semibold text-white text-sm">{f.q}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── CTA final ─────────────────────────────────────────────────────────────────
function CtaFinal() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-20">
      <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.15))', border: '1px solid rgba(99,102,241,0.3)' }}>
        <h2 className="font-black text-3xl md:text-5xl text-white mb-4 tracking-tight">
          Comece a ranquear hoje
        </h2>
        <p className="text-slate-300 mb-8 max-w-lg mx-auto">
          Configure em 5 minutos e veja suas primeiras páginas indexadas no Google ainda hoje.
        </p>
        <a href="https://wa.me/5519974049445?text=Quero%20come%C3%A7ar%20com%20o%202time%20SEO"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-2xl transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
          <Rocket size={18} /> Falar com a equipe
        </a>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'rgba(99,102,241,0.12)' }}>
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-sm">2time<span style={{ color: '#818cf8' }}> SEO</span></span>
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} 2time SEO. Todos os direitos reservados.</p>
        <Link href="/login" className="text-xs text-slate-400 hover:text-white transition-colors">Acessar painel →</Link>
      </div>
    </footer>
  )
}
