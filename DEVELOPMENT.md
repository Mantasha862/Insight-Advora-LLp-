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
   npm run db:deploy        # applies 1_cms and later migrations
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

## Design reference

The client's latest HTML prototypes and data files are in `docs/design/` (open any `.dc.html` in a browser with internet access; they load React from a CDN). The site content in `content/*.ts` is generated from `docs/design/{services,industries,team,insights,home-content}.js`.

Changes adopted from the September 2026 design update:
- Brand green `#173B2F`, deep green `#0E2921` (footer, dark bands), sage `#879B87`.
- Industry pages retired: `/industries` and `/industries/*` redirect to `/services`; the industry list still powers the Knowledge Hub filter.
- Each service has an "Our Services" offerings grid (`Service.offerings`, migration `2_service_offerings`).
- Animated IA emblem (`components/ui/Emblem.tsx`, port of `ia-emblem.js`) in page heroes; it uses `public/assets/monogram-mark.png` — the official `monogram-alpha.png` with the stray wordmark strip trimmed.
- New Home page: hero, About + integrated philosophy, "Advisory in Session", expertise, philosophy, approach, team, Knowledge Hub, ticker, CTA.
- Advisory-meeting video: add licensed footage to `public/videos/` and set the paths in `content/home.ts`. The placeholder frame supplied with the prototype was a third-party screenshot and is intentionally not published.

## Homepage content & media

- **Admin → Website settings → Homepage** edits the hero focus words, About paragraphs and pillars,
  closing CTA, advisory video/poster and hero monogram (migration `3_homepage_settings`). Empty
  fields fall back to `content/home.ts`.
- Contact details (registered office, phone, email, map) live in the same settings row; the seed
  fills them only where empty.
- **Advisory video:** use licensed footage only. Put it at `public/videos/advisory-meeting.mp4`
  (+ `advisory-meeting-poster.jpg`), where it is picked up automatically, or set URLs in admin.
  Stock footage with a visible watermark must not be cropped or scaled to hide it — buy the
  licence and use the clean file.
- `/industries` and `/industries/*` permanently redirect to `/services`; the Industry model and
  its admin screens remain.
- Reduced motion: `MotionProvider` (site layout) sets `reducedMotion="user"`. Don't branch on
  `useReducedMotion()` to drop `initial` — the server can't know the preference.

## Deployment

Any Node 20.9+ host (Vercel, Netlify, a VM). Set the env vars, run `npm run build` and `npm start`. Point both `insightadvora.com` and `www.insightadvora.com` at the app; the proxy 301-redirects apex → www.
