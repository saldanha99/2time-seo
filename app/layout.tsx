import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: '2time SEO', template: '%s — 2time SEO' },
  description: 'Gerador de Glossário SEO com IA — mais tráfego orgânico no piloto automático',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
