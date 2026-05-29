import Link from 'next/link'
import { XCircle } from 'lucide-react'
export const metadata = { title: 'Pagamento não concluído' }
export default function ErroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: '#0a0a14' }}>
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(239,68,68,0.15)' }}>
          <XCircle size={40} className="text-red-400" />
        </div>
        <h1 className="font-black text-3xl text-white mb-3">Pagamento não concluído</h1>
        <p className="text-slate-400 mb-8">Algo deu errado ou o pagamento foi cancelado. Tente novamente ou fale com a gente.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/#precos" className="font-bold text-white px-6 py-3 rounded-xl" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>Tentar de novo</Link>
          <a href="https://wa.me/5519974049445" target="_blank" rel="noopener noreferrer" className="font-bold text-white px-6 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
