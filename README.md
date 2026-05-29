# 2time SEO

> Gerador de Glossário SEO com IA — mais tráfego orgânico no piloto automático.

Gera centenas de páginas otimizadas com IA (Gemini, OpenAI, Anthropic, OpenRouter, Groq, DeepSeek) e indexa cada uma no Google e Bing automaticamente.

---

## 🎯 Dois modos de uso

### Modo 1 — App standalone (SaaS)

Deploy completo no Vercel + Neon. Cada cliente/projeto tem sua própria instância com painel, glossário público e configurações.

```bash
git clone https://github.com/saldanha99/2time-seo
cd 2time-seo
npm install
cp .env.example .env.local   # preencha DATABASE_URL, NEXTAUTH_SECRET e a chave de IA
npx prisma db push
npm run dev
```

### Modo 2 — Plugin instalável (CLI)

Adiciona o gerador a **qualquer projeto Next.js + Prisma existente**:

```bash
npx 2time-seo init
```

O instalador:
1. Detecta seu projeto Next.js (App Router) e Prisma
2. Copia `lib/glossario`, `lib/seo`, rotas de API, componente admin e páginas públicas
3. Acrescenta os models `GlossaryTerm` e `SeoIndexingLog` ao seu `schema.prisma`
4. Imprime os próximos passos

Depois é só:
```bash
npm install slugify lucide-react react-hot-toast
npx prisma generate && npx prisma db push
```

---

## ⚙️ Variáveis de ambiente

```env
# Banco (Neon recomendado)
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."

# Auth (standalone)
NEXTAUTH_URL="https://seusite.com"
NEXTAUTH_SECRET="openssl rand -base64 32"

# IA — pelo menos uma
GEMINI_API_KEY=""
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
OPENROUTER_API_KEY=""
GROQ_API_KEY=""
DEEPSEEK_API_KEY=""

# Indexação (opcional)
INDEXNOW_KEY=""
GOOGLE_SERVICE_ACCOUNT_JSON=""
```

> As chaves de IA também podem ser configuradas pelo painel admin (salvas no navegador, nunca no banco).

---

## 🧩 O que está incluído

| Módulo | Descrição |
|--------|-----------|
| **Gerador Ninja** | Sugestão de termos A-Z por nicho, prefixos customizáveis, geração em lote |
| **Multi-provider IA** | 6 provedores com seletor de modelo e tokens |
| **Indexação** | Google Indexing API + IndexNow (Bing) com auditoria em banco |
| **Glossário público** | Páginas A-Z com schema.org `DefinedTerm`, meta tags e Open Graph |
| **Painel admin** | CRUD, edição inline, filtros, dashboard de indexação |

---

## 📄 Licença

Uso comercial mediante licença. Veja os planos em [2time-seo.vercel.app](https://2time-seo.vercel.app).
