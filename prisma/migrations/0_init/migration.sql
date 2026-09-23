-- Live schema in Supabase project "Insight Advora LLP" (ref kgyrgmylblfsznqbpdyv).
-- Already applied. Adopt with `prisma db pull`; do not drop — leads contains real enquiries.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  company text check (company is null or char_length(company) <= 160),
  designation text check (designation is null or char_length(designation) <= 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 32),
  area_of_interest text not null default 'Other' check (area_of_interest in (
    'Operational Excellence','Business Growth','M&A / Transactions','EHS','ESG & Sustainability','Strategy & Advisory','Other')),
  message text check (message is null or char_length(message) <= 4000),
  source text not null default 'website',
  page_url text check (page_url is null or char_length(page_url) <= 500),
  status text not null default 'new' check (status in ('new','contacted','in_progress','closed')),
  internal_notes text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_area_idx on public.leads (area_of_interest);
alter table public.leads enable row level security;
create policy "website can submit an enquiry" on public.leads for insert to anon, authenticated with check (status = 'new');
create policy "authenticated staff can read enquiries" on public.leads for select to authenticated using (true);
create policy "authenticated staff can update enquiries" on public.leads for update to authenticated using (true) with check (true);
revoke insert on public.leads from anon, authenticated;
grant insert (name, company, designation, email, phone, area_of_interest, message, source, page_url, status) on public.leads to anon, authenticated;
grant select, update on public.leads to authenticated;

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text check (name is null or char_length(name) <= 120),
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  organisation text check (organisation is null or char_length(organisation) <= 160),
  interest text check (interest is null or char_length(interest) <= 120),
  source text not null default 'knowledge-hub',
  confirmed boolean not null default false,
  unsubscribed_at timestamptz
);
alter table public.subscribers enable row level security;
create policy "website can subscribe" on public.subscribers for insert to anon, authenticated with check (confirmed = false and unsubscribed_at is null);
create policy "authenticated staff can read subscribers" on public.subscribers for select to authenticated using (true);
revoke insert on public.subscribers from anon, authenticated;
grant insert (name, email, organisation, interest, source, confirmed) on public.subscribers to anon, authenticated;
grant select on public.subscribers to authenticated;
