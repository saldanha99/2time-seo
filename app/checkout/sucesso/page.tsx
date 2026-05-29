import Link from 'next/link'
import { CheckCircle2, Zap } from 'lucide-react'

export const metadata = { title: 'Pagamento confirmado' }

export default function SucessoPage({ searchParams }: { searchParams: { plano?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: '#0a0a14' }}>
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(34,197,94,0.15)' }}>
          <CheckCircle2 size={40} className="text-green-400" />
        </div>
        <h1 className="font-black text-3xl text-white mb-3">Pagamento confirmado! 🎉</h1>
        <p className="text-slate-400 mb-8">
          Obrigado por assinar o <strong className="text-white">2time SEO</strong>.
          Em instantes você receberá os dados de acesso por e-mail e WhatsApp.
        </p>
        <div className="rounded-2xl p-5 mb-8 text-left" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <p className="text-sm text-slate-300 mb-2 font-semibold">Próximos passos:</p>
          <ol className="text-sm text-slate-400 space-y-1.5 list-decimal list-inside">
            <li>Aguarde o e-mail com seu login</li>
            <li>Acesse o painel e configure seu nicho</li>
            <li>Cole sua chave de IA e comece a gerar</li>
          </ol>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          <Zap size={16} /> Voltar ao início
        </Link>
      </div>
    </div>
  )
}
