import { LandingPage } from '@/components/landing/LandingPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2time SEO — Glossário SEO com IA no piloto automático',
  description: 'Gere centenas de páginas otimizadas com IA e indexe no Google e Bing automaticamente. Mais tráfego orgânico sem escrever uma linha.',
}

export default function Home() {
  return <LandingPage />
}
