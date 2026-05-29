import Link from 'next/link'
import { Clock } from 'lucide-react'
export const metadata = { title: 'Pagamento pendente' }
export default function PendentePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: '#0a0a14' }}>
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(245,158,11,0.15)' }}>
          <Clock size={40} className="text-amber-400" />
        </div>
        <h1 className="font-black text-3xl text-white mb-3">Pagamento em processamento</h1>
        <p className="text-slate-400 mb-8">Seu pagamento está sendo confirmado (boleto/PIX podem levar alguns minutos). Você receberá o acesso assim que for aprovado.</p>
        <Link href="/" className="font-bold text-white px-6 py-3 rounded-xl" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>Voltar ao início</Link>
      </div>
    </div>
  )
}
