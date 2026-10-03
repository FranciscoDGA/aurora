# Aurora — Seus Direitos, Claros 💜
Navegadora de direitos da mulher: triagem por IA + documentos jurídicos + passo a passo.

## Stack
Next.js 14 (App Router) • Supabase (Postgres + Auth + RLS) • Vercel • WhatsApp Business API

## Rodar local
```bash
npm install
cp .env.example .env.local  # preencha SUPABASE_URL + ANON_KEY
npm run dev                 # http://localhost:3000
```

## Supabase (criar projeto grátis)
1. https://supabase.com → New project
2. SQL Editor → cole `supabase/migrations/20260918000000_init.sql` → Run
3. Authentication → ative Email + (opcional) Google
4. Copie URL + anon key para `.env.local`
5. Deploy: conecte o repo no Vercel e configure as env vars

## Deploy Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
- Root: `./`
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`, `KIWIFY_WEBHOOK_TOKEN`
- Região: `gru1` (vercel.json já configurado)

## Checklist pós-rebrand (Clara → Aurora)
- [ ] `npm run db:push` — aplica as migrações `20261003000000` (planos `aurora_plus`/`aurora_pro`) e `20261003000100` (RLS de `logs_ia`)
- [ ] Painel Vercel: novo nome do projeto + env `NEXT_PUBLIC_APP_URL` com o domínio real (sem ela, robots/sitemap/canonical caem em localhost)
- [ ] Meta Developers: se o webhook do WhatsApp estiver ativo, o Verify Token passou a ser `aurora_verify_123`
- [ ] Kiwify: conferir nomes/produtos dos checkout de `Aurora+` e `Aurora Pro` (links em `app/page.tsx`) e configurar o **token do webhook** (`KIWIFY_WEBHOOK_TOKEN`) — sem segredo, entregas são recusadas em produção
- [ ] E-mail de contato: trocar `oi@aurora.direito.br` pelo endereço real (hoje é placeholder)

## Verificações
```bash
npm run lint   # ESLint (next/core-web-vitals)
npm test       # Vitest (unit tests)
npm run build  # type-check + build
```


## Rotas
- `/` landing • `/triagem` triagem gratuita (sem login) • `/login` `/cadastro`
- `/dashboard` meus casos • `/casos/[id]` gerar documentos
- `POST /api/triagem` (Edge, sem auth) • `POST /api/casos` • `GET /api/casos/[id]`
- `POST /api/casos/[id]/documentos` • `GET/POST /api/webhook/whatsapp` • `GET /api/health`

## Aviso legal
Documentos-base para levar à Defensoria/advogada. Não substitui orientação jurídica individual. Em risco: 180 / 190.
