/**
 * Settings — chave/valor configurável pelo admin.
 * Cada instância do 2time SEO tem seu próprio conjunto de configurações.
 */

import { prisma } from './prisma'

export const SETTINGS_KEYS = {
  SITE_NAME:    'site_name',
  SITE_URL:     'site_url',
  SITE_NICHE:   'site_niche',
  SITE_CITY:    'site_city',
  INDEXNOW_KEY: 'indexnow_key',
  GOOGLE_SA:    'google_service_account', // JSON da service account
} as const

export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } })
  return row?.value ?? null
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany({ where: { key: { in: keys } } })
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}

export async function setSetting(key: string, value: string) {
  return prisma.setting.upsert({
    where:  { key },
    create: { key, value },
    update: { value },
  })
}

export async function setSettings(data: Record<string, string>) {
  await Promise.all(Object.entries(data).map(([key, value]) => setSetting(key, value)))
}

/** Retorna config completa com fallbacks para env vars */
export async function getConfig() {
  const s = await getSettings(Object.values(SETTINGS_KEYS))
  return {
    siteName:  s[SETTINGS_KEYS.SITE_NAME]  || process.env.NEXT_PUBLIC_SITE_NAME || '2time SEO',
    siteUrl:   s[SETTINGS_KEYS.SITE_URL]   || process.env.NEXTAUTH_URL           || 'http://localhost:3000',
    siteNiche: s[SETTINGS_KEYS.SITE_NICHE] || '',
    siteCity:  s[SETTINGS_KEYS.SITE_CITY]  || '',
    indexNowKey: s[SETTINGS_KEYS.INDEXNOW_KEY] || process.env.INDEXNOW_KEY || '',
    googleSA:    s[SETTINGS_KEYS.GOOGLE_SA]    || process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '',
  }
}
