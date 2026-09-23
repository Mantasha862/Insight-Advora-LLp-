# Insight Advora LLP — Developer Guide

Implementation of the handoff in [docs/HANDOFF.md](docs/HANDOFF.md): Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Prisma 6 · PostgreSQL (Supabase).

## Quick start

```bash
npm install
cp .env.example .env      # fill in values (see below)
npm run dev               # http://localhost:3000
```

With **no `DATABASE_URL`** the public site renders from the seed content in `content/` so it can be previewed immediately. The admin panel and CMS require the database.

## Connecting the live Supabase database

`leads` and `subscribers` already exist and contain real enquiries — **never reset or drop them**.

1. Set `DATABASE_URL` (pooled, port 6543, `?pgbouncer=true`) and `DIRECT_URL` (direct, port 5432) from *Supabase → Settings → Database*.
2. Confirm the live tables match the baseline: `npm run db:pull -- --print` (compare with `prisma/schema.prisma`; do **not** overwrite the schema file).
3. Mark the baseline migration (which recreates `backend/schema.sql`) as already applied:
   ```bash
   npx prisma migrate resolve --applied 0_init
   ```
4. Create the CMS tables, full-text search column/GIN index and RLS policies:
   ```bash
   npm run db:deploy        # applies 1_cms
   ```
5. Seed content and the first admin (set `ADMIN_BOOTSTRAP_EMAIL`, optionally `ADMIN_BOOTSTRAP_PASSWORD`):
   ```bash
   npm run db:seed
   ```
   Every seeded row has `is_demo = true` — replace or delete before launch.
6. Create **public** Storage buckets `team`, `services`, `knowledge`, `general` in Supabase (for the media library).

Never run `prisma migrate reset` or `prisma db push --accept-data-loss` against production.

## Environment variables

See `.env.example`. Notes:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Contact form and newsletter insert through PostgREST with the anon key, so the live RLS policies and column grants apply. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (media uploads). Never prefix with `NEXT_PUBLIC_`. |
| `AUTH_SECRET` | ≥ 32 chars (`openssl rand -base64 32`). Signs the admin session cookie. |
| `UPSTASH_REDIS_REST_URL/TOKEN` | Optional. Without them rate limiting is in-memory per instance. |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID` | Optional; can also be set in Website Settings. Loaded only when set. |

## Scripts

| Script | |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run typecheck` | Route type generation + `tsc` |
| `npm run db:deploy` | Apply migrations |
| `npm run db:seed` | Seed CMS content + first admin |
| `npm run assets` | Regenerate logos/icons/OG image from `assets/logo-source.png` |

## Project layout

```
app/(site)/…            Public pages (ISR, revalidate 5 min; admin saves revalidate immediately)
app/admin/login         Sign-in
app/admin/(panel)/…     Dashboard, generic CRUD ([resource]), enquiries, subscribers, media, SEO, settings, users
app/admin/actions.ts    All admin server actions (each re-checks the session + role)
app/actions.ts          Public form actions (zod validation, honeypot, rate limit)
app/api/insights        Knowledge Hub search/pagination (published only)
proxy.ts                apex → www 301, /admin session guard, noindex headers
content/                Seed content (services, industries, team placeholders, demo insights)
lib/data.ts             Public data access (Prisma, or seed content without a DB)
lib/admin/resources.ts  Config-driven CMS definitions (fields, relations)
prisma/migrations       0_init = live baseline, 1_cms = CMS tables + FTS + RLS
components/ui           Design-system primitives (buttons, sections, timeline, ecosystem, network canvas)
```

## Admin roles

- **admin** — everything, including enquiries, subscribers, website settings, users and deletes.
- **editor** — content CRUD, publish/unpublish/archive, media upload, SEO.

## Content & credibility

All `[ bracketed ]` values are client-supplied placeholders (team profiles, contact details, legal pages, author). Do not replace them with invented content — see "Critical credibility rule" in docs/HANDOFF.md. Contact details are edited in **Admin → Website Settings**.

## Design sources not in this repository

The handoff references `design/*.dc.html`, `data/*.js` and derived logo files that were not included in the repo. The build follows the README specification; logo assets were derived from the client's supplied logo (`assets/logo-source.png`). If the prototypes become available, compare pages against them and update copy in `content/`.

## Deployment

Any Node 20.9+ host (Vercel, Netlify, a VM). Set the env vars, run `npm run build` and `npm start`. Point both `insightadvora.com` and `www.insightadvora.com` at the app; the proxy 301-redirects apex → www.
