import slugifyLib from 'slugify'

export function slugify(text: string): string {
  return slugifyLib(text, { lower: true, strict: true, locale: 'pt' })
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}
