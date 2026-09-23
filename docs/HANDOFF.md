# Handoff: Insight Advora LLP — Corporate Website + CMS

## Overview
Production build of the Insight Advora LLP website (www.insightadvora.com): a premium public marketing site for a multidisciplinary consulting and advisory firm, plus a secure admin panel/CMS. Tagline: **"Partnering for Smarter Decisions"**. Brand philosophy: **PEOPLE | PROCESS | PLANET | PROGRESS**.

Target stack (client requirement): **Next.js (App Router) + React + TypeScript + Tailwind CSS + Framer Motion + Prisma + PostgreSQL (Supabase)**, deployable independently of any design tool, on the client's own domain and hosting.

## About the Design Files
The `.dc.html` files in `design/` are **design references built in HTML** — working prototypes that show the intended look, copy, layout, animation and behaviour. They are **not production code to copy**. Recreate them as Next.js/React components using Tailwind and Framer Motion. The `.js` data files in `data/` define the content and are the seed for the Prisma models.

Open any `.dc.html` file directly in a browser to see it running (they load `support.js` from the same folder).

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy and interactions. Recreate pixel-accurately. All copy is final unless shown in `[ square brackets ]`, which marks client-supplied placeholders (never replace them with invented content).

---

## CRITICAL CREDIBILITY RULE
The firm is newly established. **Never fabricate**: clients, client logos, testimonials, case studies, awards, certifications, statistics, years of experience, project counts, partnerships, team members, qualifications or authors. Placeholders stay as placeholders until the client supplies real data. Statistics in articles use a `[ source: ... ]` field, never invented numbers.

Regulated-services wording must be preserved:
- M&A: "advisory support" — not legal, audit, tax, investment banking.
- EHS: advisory support; certification is by accredited bodies.
- ESG: reporting support; assurance is by independent providers.
- Financial services industry: no regulated investment/securities/banking advice.
- Healthcare: no clinical, medical or regulatory approval services.

---

## Existing backend (already live — reuse it)
Supabase project **"Insight Advora LLP"**, ref `kgyrgmylblfsznqbpdyv`, region ap-south-1 (Mumbai).
Dashboard: https://supabase.com/dashboard/project/kgyrgmylblfsznqbpdyv

Tables already created (see `backend/schema.sql`):
- `public.leads` — contact enquiries. RLS on. anon/authenticated may INSERT only a whitelisted set of columns with `status = 'new'`; SELECT/UPDATE only for authenticated users. **Contains real enquiries — do not drop.**
- `public.subscribers` — newsletter sign-ups. RLS on, insert-only for anon, unique email.

Point Prisma at this same database (`DATABASE_URL` = Supabase pooled connection string, `DIRECT_URL` = direct connection for migrations). Use `prisma db pull` first so the two existing tables are adopted rather than recreated, then add the new models with migrations.

---

## Routes
| Route | Design reference | Notes |
|---|---|---|
| `/` | Home.dc.html | Animated network hero |
| `/about` | About.dc.html | |
| `/services` | Services.dc.html | |
| `/services/[slug]` | *(not yet designed — compose from Services + IndustryDetail patterns)* | 6 slugs, see services.js |
| `/industries` | Industries.dc.html | |
| `/industries/[slug]` | IndustryDetail.dc.html | 8 slugs |
| `/team` | Team.dc.html | |
| `/team/[slug]` | TeamProfile.dc.html | |
| `/knowledge-hub` | Insights.dc.html | |
| `/knowledge-hub/[slug]` | Article.dc.html | |
| `/contact` | Contact.dc.html | Writes to `leads` |
| `/privacy-policy`, `/terms-of-use`, `/disclaimer` | *(not designed — simple editorial text pages using Article typography)* | Content from client/legal |
| `/admin/**` | *(not designed — see Admin section)* | Auth required |
| 404 / 500 | *(not designed — ivory page, serif headline, gold rule, link home)* | |

In the prototypes, detail pages use `?slug=`; in Next.js use real dynamic segments with `generateStaticParams` + ISR.

Canonical host: **https://www.insightadvora.com** — 301 redirect apex → www in middleware or at the host.

---

## Design Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| forest | #17352B | Primary: headings, dark sections, primary buttons, footer |
| forest-2 | #1B3327 | Alternate dark panel |
| charcoal | #1D2421 | Body text on light, italic headline accents |
| gold | #B58A3A | Rules, dots, borders, hover fill on primary buttons |
| gold-light | #C79A55 | Gold on dark backgrounds, numerals, gold button fill |
| gold-pale | #D4B478 | Gold text/hover on dark backgrounds |
| gold-ink | #8C6A2C | Gold **text** on light backgrounds (eyebrows, links) — contrast-safe |
| ivory | #FAF9F5 | Page background |
| ivory-2 | #F3F1EA | Alternate section background |
| card-alt | #EDEAE1 | Photo placeholders |
| body | #4B574F | Body copy on light |
| body-2 | #5C685F | Secondary text, labels, breadcrumbs (≥4.5:1) |
| body-deep | #35403A | Long-form article paragraphs |
| hairline | rgba(23,53,43,0.10–0.16) | Borders and dividers |
| on-dark body | rgba(250,249,245,0.72–0.78) | Body text on forest |

Gold is an accent — use sparingly. No blue, purple, neon or gradients (the only gradient is the fading footer rule).

### Typography
- **Serif (headings, numerals, italic statements):** Cormorant Garamond 400/500/600 + italic 400/500.
- **Sans (body, UI, labels):** Manrope 300/400/500/600/700.
- Load via `next/font/google`.

| Role | Font | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero H1 | Serif, UPPERCASE on Home | clamp(35px, 4.6vw, 66px) | 500 | 1.06–1.08 | 0.006em |
| Page H1 | Serif | clamp(34px, 4.8vw, 70px) | 500 | 1.05–1.08 | 0 |
| Section H2 | Serif | clamp(32px, 3.7vw, 54px) | 500 | 1.1 | 0 |
| Card H3 | Serif | 23–27px | 500 | 1.2 | 0 |
| Italic statement / tagline | Serif italic | 19–27px | 400 | 1.4–1.45 | 0.02em |
| Big numerals (01–08) | Serif | 30–58px | 400 | 1 | 0 |
| Eyebrow | Sans UPPERCASE | 11px | 600 | — | 0.22em |
| Body | Sans | clamp(15.5px, 1.15vw, 17px) | 300 | 1.8–1.86 | 0 |
| Card body | Sans | 13.5–14.5px | 300 | 1.72–1.78 | 0 |
| Button | Sans UPPERCASE | 12–12.5px | 600 (700 on gold) | — | 0.1em |
| Chip / tag | Sans UPPERCASE | 10.5–11.5px | 600 | — | 0.1em |

Heading emphasis pattern: second clause in *italic* (e.g. "Where Insight *Meets Action.*").

### Layout
- Container: max-width 1360px (hero 1440px), horizontal padding clamp(20px, 4vw, 56px).
- Section vertical padding: clamp(60px, 8vw, 118px).
- Grids: CSS grid `repeat(auto-fit, minmax(290–330px, 1fr))`. Card grids use **1px gaps over a hairline background** so cells read as a ruled table.
- Corners: **square everywhere** (radius 0). Only dots/nodes are circular.
- Shadows: only on hover — `0 26px 50px -30px rgba(23,53,43,0.45)`; header when scrolled `0 1px 24px -12px rgba(23,53,43,0.45)`.
- Gold rule motif: 62×1px `#B58A3A` under section headings; 34×1px before eyebrows.

### Buttons
- **Primary:** bg forest, text ivory, 1px forest border, padding 18px 32px. Hover → bg gold #B58A3A, text forest.
- **Secondary:** transparent, 1px rgba(181,138,58,0.65) border, forest text. Hover → bg rgba(181,138,58,0.12), text gold-ink.
- **Gold (on dark):** bg #C79A55, text forest, weight 700. Hover → transparent, text #D4B478, letter-spacing 0.11em → 0.16em.
- **Text link:** uppercase 12.5px/600, 1px gold underline offset 8px, trailing 18–20×1px line.
- All buttons end with a short horizontal line "arrow" (`width 16–20px; height 1px; currentColor`), not an arrow glyph.

---

## Global Components

### Header (SiteNav.dc.html)
Sticky, bg rgba(250,249,245,0.92) + backdrop-blur(10px), 1px hairline bottom border. Height 92px → **68px after 40px scroll** (300ms), logo 50px → 40px tall, border turns gold-tinted, shadow appears.
Left: horizontal logo lockup (`assets/logo-h.png`). Right: About Us · Our Services · Industries · Our Team · Knowledge Hub · Contact (13.5px/500 uppercase, 0.06em, active item has 1px gold underline), then **Let's Talk** primary button.
Below 1080px: monogram logo + 48px square hamburger (three 20px lines, last one gold) → full-width dropdown with serif 24px links and full-width Let's Talk.

### Footer (SiteFooter.dc.html)
bg forest #17352B, 2px gold top border. Columns (auto-fit, min 220px): brand block (INSIGHT ADVORA / LLP in serif, fading gold rule, italic gold tagline, one-line description) · Company · Services · Contact (email/phone/address from settings, LinkedIn, gold "Start a Conversation" button). Bottom bar: © 2026 Insight Advora LLP. All Rights Reserved. · Privacy Policy | Terms of Use | Disclaimer. Headings 11.5px/600 uppercase #C79A55; links rgba(250,249,245,0.76), hover #D4B478.

### Shared section patterns
- **Eyebrow + H2 + gold rule** (left) with **body copy** (right) in a 2-column auto-fit grid.
- **Numbered card:** serif numeral in #C79A55, title, body, "Explore" link; on hover a 2px gold line draws across the top (width 0→100%, 520ms) and the trailing arrow line slides 8px right.
- **Stepped timeline:** 1px track with a gold progress bar that fills to 100% over 2.2–2.4s when in view; 9px dots turn from #CFD6CF to gold and scale 1.25 in sequence (380–400ms apart).
- **Ecosystem diagram (SVG):** central 90–100px circle "INSIGHT / ADVORA", dashed outer ring, nodes on spokes. Hover/focus a node → dot r5→7 and gold, spoke brightens and thickens, label turns #D4B478, side panel swaps title/description/chips/link. Must be keyboard-focusable.
- **Final CTA band:** forest bg with a slowly drifting gold diagonal lattice (two repeating-linear-gradients at ±45°, opacity 0.13, 26–28s alternate), serif H2 with italic gold clause, gold button.

---

## Screens

### Home (Home.dc.html)
1. **Hero** (~90vh): left column — eyebrow "Consulting & Corporate Advisory", H1 "TURNING INSIGHT / INTO MEASURABLE / *PROGRESS.*" (three lines lift in sequence, 140ms apart), tagline "Partnering for Smarter Decisions" in italic gold with an underline that draws in, supporting copy, rotating focus word (Strategy → Transformation → Growth → Sustainability → Progress, every 3s, fade/slide 600ms), buttons Explore Our Services / Let's Talk. Right column — **animated 3D network**: ~96 nodes on a Fibonacci sphere, each linked to its 2 nearest neighbours, ~16% of edges gold; three orbital rings; 11 gold particles travelling along edges; slow yaw rotation (0.00009 rad/ms), pitch sway, ±2.2% breathing scale; mouse parallax (lerp 0.045) and brightening of edges near the cursor; faint IA monogram watermark at 5.5% opacity behind. "Scroll to Explore" cue with an animated 1px gold line, smooth-scrolls to next section.
   - Build with **React Three Fiber** (or keep the 2D-canvas projection from the prototype — it's lighter). Mobile: ~54 nodes, 5 particles, no mouse interaction. Pause on `visibilitychange`, static frame under `prefers-reduced-motion`, and a static SVG fallback when WebGL is unavailable.
2. **Tagline ticker** — ivory-2 band, serif uppercase items separated by gold dots, scrolling 46s linear infinite.
3. **Who We Are** — "Where Insight *Meets Action.*", paragraph, Discover link; 4-step chain Insight → Strategy → Action → Impact whose gold dots appear in sequence.
4. **Areas of Expertise** — 6 cards with 26px two-tone line icons in a 52px bordered box (box turns gold on hover).
5. **Connecting the Elements of Progress** — forest band, 6-node ecosystem (Strategy, Growth, Performance, Planet, Process, People); spokes draw via stroke-dashoffset on scroll.
6. **Our Approach** — 5-stage timeline: Understand, Diagnose, Strategize, Transform, Sustain.
7. **Industries** — 8-cell ruled grid; hover inverts to forest with gold text.
8. **Our Team** — 3 featured profiles from CMS (photo, name, designation, expertise, LinkedIn).
9. **Knowledge Hub** — latest 3 published articles from CMS.
10. **Final CTA** — "Ready to Turn Insight Into Action?"

### About (About.dc.html)
Hero with breadcrumb, background node network (right-weighted) and IA watermark, "Explore Our Approach ↓" (bouncing arrow). Then: Who We Are (three-line H2) · Why We Exist (pull-quote + Complexity→Insight→Strategy→Action→Progress ladder lighting in sequence) · Vision (forest split, slowly orbiting SVG rings 84s/56s) · Mission + 3 pillars (Clarity, Action, Impact) · Philosophy (People/Process/Planet/Progress blocks under a gold line that draws across; hover lifts with gold outline) · Integrated Perspective (7-node ecosystem) · Expertise (6 cards) · From Insight to Impact timeline · Partnership, Not Prescription (Listen / Collaborate / Enable rows) · Team preview · Knowledge preview · closing CTA.

### Services (Services.dc.html)
Hero with drifting 2D node network · Our Approach + Challenge→Progress ladder · Services Ecosystem (6 nodes; hover shows description, first 5 capabilities as chips, and retargets "Explore Service") · six practice sections, each: numeral, title, italic headline, description, capability chips, "how the work moves" flow (e.g. Current State → Diagnosis → Improvement → Optimized State), Explore + Discuss links · **"What Are You Looking to Solve?"** challenge selector (left: 6 challenge buttons; right: forest panel with the matched practice) · Where Disciplines Come Together · How We Work (Understand, Diagnose, Design, Enable, Sustain) · Sectors grid · Go Deeper · final CTA with two buttons.

### Service detail — /services/[slug] *(to build; not prototyped)*
Required sections in order: Hero (numeral, title, italic headline, description, Discuss button) · 01 The Challenge (`challenges[]`) · 02 Our Perspective (`perspective`) · 03 What We Do (`capabilities[]` as chips or 2-col list) · 04 How We Work (5-step timeline) · 05 What Success Can Look Like (`outcomes[]` — phrase as *potential*, never guaranteed) · 06 Related Services (`related[]` cards) · Related Industries (`industries[]`) · 07 Knowledge Hub (articles whose `services` include this slug) · FAQ (`faq[]`, accordion) · 08 CTA "Discuss Your Requirement". Reuse IndustryDetail.dc.html layout patterns.

### Industries (Industries.dc.html) and /industries/[slug] (IndustryDetail.dc.html)
Listing: forest hero with 8-node ecosystem + live side panel, intro, 8 cards (numeral, name, italic headline, service tags), disclaimer line, CTA. Detail: hero, Operating Context (+ scope note for healthcare/financial), Key Business Considerations, Challenges We Can Help Address, relevant services (from relation), integrated perspective band, related articles (scored: same industry +3, topic match +2, +1 per shared service), CTA.

### Team (Team.dc.html) and /team/[slug] (TeamProfile.dc.html)
Hero with drifting network · Expertise With Perspective + italic pull-quote · category tabs (All, Leadership, Advisory Team, Functional Specialists, Strategic Associates, Domain Experts — with counts) filtering a 3/2/1-column card grid · Collective Expertise 9-node map · Expertise That Works Together 5-stage flow · Our Shared Philosophy · Extended Advisory Network (7 categories, no named affiliates) · Build the Future With Us (toggle via `careersActive` setting) · CTA. Card: 304px photo, name, designation, qualification, expertise tags, truncated bio, View Profile + LinkedIn; hover lifts, gold top line draws, border turns gold. Profile: photo, category, name, designation, qualification, About [Name], Areas of Expertise, Professional Focus, LinkedIn + Enquire, Back to Our Team, other profiles. Use `Person` JSON-LD.

### Knowledge Hub (Insights.dc.html) and /knowledge-hub/[slug] (Article.dc.html)
Listing: hero with subtle network · filter bar (search spanning 2 columns; Topic, Content Type, Industry selects; live "N results for 'q'"; Clear filters) — on mobile collapse into a Filter button opening a bottom sheet · Featured Insight (hidden while filtering) · Latest Insights grid, 6 per page, **Load more** (server-side pagination) · Resources grid (gated items show "Form required" and route through a lead-capture form) · Newsletter (writes to `subscribers`; duplicate email = quiet success) · CTA. Empty states: "No insights have been published yet." / "No results found." **Only `status = published` is ever public.**
Search across title, subtitle, excerpt, body, tags, category — use Postgres full-text search (`tsvector` + GIN index).
Article: breadcrumb, category | type, H1, italic subtitle, author · date · reading time, featured image, 3-column grid with **sticky table of contents** (from H2s) and share (LinkedIn, Email, Copy Link → "Copied" 1.8s) on the left, body on the right (max 68ch, 17.5px/1.88), Key Takeaways panel (gold border, 6% gold wash), related services/industries chips, author block, "Discuss This Topic With Our Team" button, Related Insights (score: category +3, industry +2, +1 per shared service or tag). Use `Article` JSON-LD with author, datePublished, dateModified.

### Contact (Contact.dc.html)
Hero "Let's Start a *Conversation.*" · two columns: form (Name*, Company, Designation, Email*, Phone, Area of Interest select, Message ≤4000 chars) and Firm Details (email, phone, office, hours, LinkedIn — **from SiteSettings, not hard-coded**) + Google Maps embed · practice-area strip. Validation: name ≥2 chars, email regex, message ≤4000. States: submitting (spinner, button disabled), success (gold panel "Thank you — your enquiry has been received."), error (muted red panel with fallback email). Area options: Operational Excellence, Business Growth, M&A / Transactions, EHS, ESG & Sustainability, Strategy & Advisory, Other.

---

## Admin panel — /admin (to build; not prototyped)
Style: same tokens, denser. Left sidebar (forest) + ivory content area, square tables with hairline rules, gold primary actions.
- **Auth:** Supabase Auth (email + password, optional magic link) or Auth.js — hashed passwords, httpOnly secure cookies, server-side session checks in middleware for every `/admin` route and every admin server action. Roles: `admin`, `editor`.
- **Dashboard:** counts (team members, services, published articles, drafts, new enquiries), recent enquiries, quick actions.
- **CRUD with publish/unpublish/archive:** Team, Services, Industries, Articles, Categories, Content Types, Authors, Tags, Resources.
- **Relationships:** Industry↔Service, Article↔Industry, Article↔Service, Article↔Tag (many-to-many join tables).
- **Articles:** rich-text editor producing clean semantic HTML (Tiptap recommended): headings, lists, quotes, links, images, tables. Status Draft → Review → Published → Archived; select one Featured.
- **Enquiries:** table of `leads` with search, filter by status/area/date, status change (new/contacted/in_progress/closed), internal notes, CSV export. Never exposed publicly.
- **Subscribers:** list + CSV export.
- **Media library:** Supabase Storage buckets (`team`, `services`, `knowledge`, `general`); upload, preview, copy URL, delete.
- **Website settings:** firm name, logo, tagline, email, phone, address, map embed URL, LinkedIn/social, footer text, copyright year, analytics IDs, careersActive.
- **SEO settings:** per-page title/description/OG image/canonical.

## Data model (Prisma — suggested)
`User`, `TeamMember`, `TeamCategory`, `Service`, `Industry`, `Article`, `Category`, `ContentType`, `Author`, `Tag`, `Resource`, `Media`, `SiteSettings` (singleton), `PageSeo`, plus the existing `leads` and `subscribers` (adopt via `db pull`, map to `Lead`/`Subscriber`). Every content model: `id`, `slug` (unique), `status` enum, `displayOrder`, `seoTitle`, `metaDescription`, `ogImage`, `createdAt`, `updatedAt`. Field lists per model match the objects in `data/*.js` exactly — seed from those files and mark all seed rows `isDemo = true` so they can be removed.

## Interactions & motion (Framer Motion)
- Scroll reveal: opacity 0→1, y 22→0, 760ms, ease cubic-bezier(.2,.7,.2,1), stagger 70–80ms (index mod 3), trigger at ~6% into viewport, once.
- Gold rules: scaleX 0→1 from left, 900ms, when 50% visible.
- Card hover: y −5/−6px, 320ms; gold top line 520ms; arrow line x +8px.
- Header shrink: 300ms.
- Everything respects `prefers-reduced-motion` (render final state, no loops).
- Canvas/3D: requestAnimationFrame, DPR capped at 2, pause when tab hidden.

## SEO
Per-page `generateMetadata` (titles from prototypes' `<title>`, e.g. "Services | Insight Advora LLP", "Meet Our Team | Insight Advora LLP"). Canonical to www. `app/sitemap.ts` including services, industries, team, published articles. `app/robots.ts` disallowing `/admin`. JSON-LD: Organization (home), Person (team), Article (knowledge hub). Semantic landmarks and one H1 per page.

## Security
Server-side validation (zod) on every form and admin action. Rate limiting on contact, newsletter and login (e.g. Upstash Ratelimit). CSRF protection via same-site cookies + server actions. Secrets only in env vars; the Supabase **service_role key must never reach the client**. Keep RLS enabled on every table; add policies for each new table (public SELECT only where `status = 'published'`).

## Analytics
`NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` env vars (or SiteSettings); load only when set. No hard-coded IDs.

## Assets (in `assets/`)
- `logo-h.png` — horizontal lockup (monogram + wordmark + tagline), header.
- `logo-monogram.png` — IA monogram, mobile header.
- `monogram-alpha.png` — transparent monogram for 5% watermark.
- `logo-v.png` — vertical lockup, OG image.
- `favicon-ia.png` — 160px favicon source (generate full icon set).
- `logo-source.png` — original client logo (1254×1254).
All derived from the client's supplied logo. Team/article photos are client-supplied; use neutral placeholders until provided — no stock photography.

## Files
- `design/*.dc.html` — page prototypes (open in a browser; requires `support.js` alongside).
- `data/team.js, services.js, industries.js, insights.js` — content + field shapes → seed data.
- `backend/schema.sql` — the live Supabase tables and RLS policies.
- `backend/.env.example` — required environment variables.
- `assets/` — logo files.
