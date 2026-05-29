#!/usr/bin/env node
/**
 * 2time SEO — Instalador CLI
 *
 * Uso:
 *   npx 2time-seo init        Instala o gerador no projeto atual
 *   npx 2time-seo --help      Mostra ajuda
 *
 * O que faz:
 *   1. Detecta projeto Next.js (App Router) + Prisma
 *   2. Copia lib/, app/api/glossario, app/glossario, components/
 *   3. Acrescenta os models ao prisma/schema.prisma
 *   4. Imprime os próximos passos (env vars, prisma generate, deps)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATES = join(__dirname, '..', 'templates')
const CWD = process.cwd()

// ── Cores ─────────────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  indigo: '\x1b[38;5;99m', green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m', cyan: '\x1b[36m',
}
const log   = (m) => console.log(m)
const ok    = (m) => console.log(`${c.green}✓${c.reset} ${m}`)
const warn  = (m) => console.log(`${c.yellow}⚠${c.reset}  ${m}`)
const err   = (m) => console.log(`${c.red}✗${c.reset} ${m}`)
const step  = (m) => console.log(`\n${c.indigo}${c.bold}${m}${c.reset}`)

// ── Banner ──────────────────────────────────────────────────────────────────
function banner() {
  log(`
${c.indigo}${c.bold}  ▄▄▄▖▗▖   ▄▄▄▖▄▄▄▖    ▄▄▄▖▄▄▄▖▄▄▄▖${c.reset}
${c.indigo}${c.bold}   ▘▌ ▐▌    ▘▌ ▐▌      ▐▌  ▐▌  ▐▌ ▌${c.reset}
${c.indigo}${c.bold}  ▗▙▖ ▐▙▟▖ ▗▙▖ ▐▙▟▖    ▝▙▄ ▐▙▄ ▝▙▟▘${c.reset}
${c.dim}  Gerador de Glossário SEO com IA${c.reset}
`)
}

// ── Detecção do projeto ───────────────────────────────────────────────────────
function detectarProjeto() {
  const pkgPath = join(CWD, 'package.json')
  if (!existsSync(pkgPath)) {
    err('Nenhum package.json encontrado. Rode dentro de um projeto Next.js.')
    process.exit(1)
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  if (!deps.next) {
    err('Este não parece um projeto Next.js (dependência "next" ausente).')
    process.exit(1)
  }

  // App dir: app/ ou src/app/
  const appDir = existsSync(join(CWD, 'src', 'app')) ? 'src/app' : 'app'
  const libDir = existsSync(join(CWD, 'src')) ? 'src/lib' : 'lib'
  const compDir = existsSync(join(CWD, 'src')) ? 'src/components' : 'components'
  const temPrisma = !!deps.prisma || !!deps['@prisma/client'] || existsSync(join(CWD, 'prisma', 'schema.prisma'))

  return { pkg, deps, appDir, libDir, compDir, temPrisma }
}

// ── Copia 1 template processando o destino ──────────────────────────────────
function copiarTpl(origemRel, destinoRel) {
  const origem  = join(TEMPLATES, origemRel)
  const destino = join(CWD, destinoRel)
  if (existsSync(destino)) {
    warn(`Já existe, pulando: ${c.dim}${destinoRel}${c.reset}`)
    return false
  }
  mkdirSync(dirname(destino), { recursive: true })
  const conteudo = readFileSync(origem, 'utf8')
  writeFileSync(destino, conteudo)
  ok(`Criado: ${destinoRel}`)
  return true
}

// ── Patch do schema Prisma ───────────────────────────────────────────────────
function patchPrisma() {
  const schemaPath = join(CWD, 'prisma', 'schema.prisma')
  if (!existsSync(schemaPath)) {
    warn('prisma/schema.prisma não encontrado — pulei o patch do schema.')
    warn(`Adicione manualmente o conteúdo de: ${c.dim}node_modules/2time-seo/templates/prisma-fragment.prisma${c.reset}`)
    return
  }
  const schema = readFileSync(schemaPath, 'utf8')
  if (schema.includes('model GlossaryTerm')) {
    warn('Schema já contém GlossaryTerm — pulei o patch.')
    return
  }
  const fragment = readFileSync(join(TEMPLATES, 'prisma-fragment.prisma'), 'utf8')
  writeFileSync(schemaPath, schema.trimEnd() + '\n' + fragment)
  ok('Models adicionados ao prisma/schema.prisma')
}

// ── init ──────────────────────────────────────────────────────────────────────
function init() {
  banner()
  step('1. Detectando projeto...')
  const { appDir, libDir, compDir, temPrisma } = detectarProjeto()
  ok(`Next.js detectado · app em "${appDir}"`)
  if (!temPrisma) warn('Prisma não detectado — você precisará instalá-lo (npm i -D prisma; npm i @prisma/client)')

  step('2. Copiando módulos...')
  // libs
  copiarTpl('lib/glossario/multi-provider.ts.tpl', `${libDir}/glossario/multi-provider.ts`)
  copiarTpl('lib/glossario/ai-models.ts.tpl',      `${libDir}/glossario/ai-models.ts`)
  copiarTpl('lib/glossario/queries.ts.tpl',        `${libDir}/glossario/queries.ts`)
  copiarTpl('lib/seo/instant-indexing.ts.tpl',     `${libDir}/seo/instant-indexing.ts`)
  copiarTpl('lib/seo/indexing.ts.tpl',             `${libDir}/seo/indexing.ts`)
  // api
  copiarTpl('app/api/glossario/route.ts.tpl',                `${appDir}/api/glossario/route.ts`)
  copiarTpl('app/api/glossario/gerar-termos/route.ts.tpl',   `${appDir}/api/glossario/gerar-termos/route.ts`)
  copiarTpl('app/api/glossario/gerar-conteudo/route.ts.tpl', `${appDir}/api/glossario/gerar-conteudo/route.ts`)
  // componente
  copiarTpl('components/GlossarioAdmin.tsx.tpl', `${compDir}/GlossarioAdmin.tsx`)
  // páginas públicas
  copiarTpl('app/glossario/page.tsx.tpl',      `${appDir}/glossario/page.tsx`)
  copiarTpl('app/glossario/slug-page.tsx.tpl', `${appDir}/glossario/[slug]/page.tsx`)

  step('3. Aplicando schema Prisma...')
  patchPrisma()

  step('4. Pronto! Próximos passos:')
  log(`
  ${c.bold}a)${c.reset} Instale as dependências:
     ${c.cyan}npm install slugify lucide-react react-hot-toast${c.reset}

  ${c.bold}b)${c.reset} Configure as variáveis de ambiente (.env):
     ${c.dim}# Pelo menos uma chave de IA:${c.reset}
     ${c.cyan}GEMINI_API_KEY=...${c.reset}        ${c.dim}(ou OPENAI_API_KEY, ANTHROPIC_API_KEY...)${c.reset}
     ${c.dim}# Indexação (opcional):${c.reset}
     ${c.cyan}INDEXNOW_KEY=...${c.reset}
     ${c.cyan}GOOGLE_SERVICE_ACCOUNT_JSON=...${c.reset}

  ${c.bold}c)${c.reset} Gere o client e aplique o schema:
     ${c.cyan}npx prisma generate && npx prisma db push${c.reset}

  ${c.bold}d)${c.reset} Renderize o painel onde quiser (ex: app/admin/glossario/page.tsx):
     ${c.dim}import { GlossarioAdmin } from '@/components/GlossarioAdmin'${c.reset}
     ${c.dim}// busque os termos via prisma e passe como initialTermos${c.reset}

  ${c.green}${c.bold}O glossário público fica em /glossario 🚀${c.reset}

  ${c.dim}Dúvidas? Documentação completa em github.com/saldanha99/2time-seo${c.reset}
`)
}

// ── Roteador ──────────────────────────────────────────────────────────────────
const cmd = process.argv[2]
if (cmd === 'init') {
  init()
} else if (cmd === '--help' || cmd === '-h' || !cmd) {
  banner()
  log(`${c.bold}Uso:${c.reset}
  ${c.cyan}npx 2time-seo init${c.reset}     Instala o gerador de glossário no projeto atual
  ${c.cyan}npx 2time-seo --help${c.reset}   Mostra esta ajuda
`)
} else {
  err(`Comando desconhecido: "${cmd}". Use "npx 2time-seo --help".`)
  process.exit(1)
}
