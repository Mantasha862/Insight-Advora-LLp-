"use client";

import { useEffect, useRef, useState } from "react";
import { ArticleCard } from "@/components/site/Cards";
import { ResourceRequest } from "@/components/site/Forms";
import type { ArticleItem, ResourceItem, Taxonomy } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filters = { q: string; category: string; type: string; industry: string };
const EMPTY: Filters = { q: "", category: "", type: "", industry: "" };
const PAGE = 6;

export function InsightsBrowser({
  initial,
  initialTotal,
  featured,
  categories,
  contentTypes,
  industries,
}: {
  initial: ArticleItem[];
  initialTotal: number;
  featured: React.ReactNode;
  categories: Taxonomy[];
  contentTypes: Taxonomy[];
  industries: Taxonomy[];
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [items, setItems] = useState(initial);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [sheet, setSheet] = useState(false);
  const first = useRef(true);
  const filtering = Object.values(filters).some(Boolean);

  const load = async (f: Filters, offset: number) => {
    const sp = new URLSearchParams({ offset: String(offset), limit: String(PAGE) });
    for (const [k, v] of Object.entries(f)) if (v) sp.set(k, v);
    const res = await fetch(`/api/insights?${sp}`);
    if (!res.ok) throw new Error("Failed");
    return (await res.json()) as { items: ArticleItem[]; total: number };
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    let cancelled = false;
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await load(filters, 0);
        if (!cancelled) {
          setItems(r.items);
          setTotal(r.total);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [filters]);

  const more = async () => {
    setLoading(true);
    try {
      const r = await load(filters, items.length);
      setItems((prev) => [...prev, ...r.items]);
      setTotal(r.total);
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFilters((f) => ({ ...f, [k]: e.target.value }));

  const selects = (
    <>
      <Select label="Topic" value={filters.category} onChange={set("category")} options={categories} />
      <Select label="Content Type" value={filters.type} onChange={set("type")} options={contentTypes} />
      <Select label="Industry" value={filters.industry} onChange={set("industry")} options={industries} />
    </>
  );

  return (
    <>
      <div className="sticky top-[68px] z-30 border-y border-hairline bg-ivory/95 py-5 backdrop-blur">
        <div className="container-site">
          <div className="grid gap-4 md:grid-cols-5 md:items-end">
            <div className="md:col-span-2">
              <label htmlFor="kh-search" className="field-label">
                Search
              </label>
              <input id="kh-search" type="search" value={filters.q} onChange={set("q")} placeholder="Search insights…" className="field" />
            </div>
            <div className="hidden md:contents">{selects}</div>
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="border border-hairline-strong px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-forest md:hidden"
              aria-haspopup="dialog"
            >
              Filter
            </button>
          </div>
          {filtering && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-body-2" aria-live="polite">
              <span>
                {total} result{total === 1 ? "" : "s"}
                {filters.q && <> for &lsquo;{filters.q}&rsquo;</>}
              </span>
              <button type="button" onClick={() => setFilters(EMPTY)} className="font-semibold uppercase tracking-[0.1em] text-gold-ink underline underline-offset-4">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {sheet && (
        <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-[60] flex items-end bg-forest/50 md:hidden" onClick={() => setSheet(false)}>
          <div className="w-full space-y-5 bg-ivory p-6" onClick={(e) => e.stopPropagation()}>
            {selects}
            <button type="button" onClick={() => setSheet(false)} className="w-full bg-forest py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory">
              Show {total} results
            </button>
          </div>
        </div>
      )}

      {!filtering && featured}

      <section className="section-y" aria-labelledby="latest">
        <div className="container-site">
          <p className="eyebrow">Latest Insights</p>
          <h2 id="latest" className="h-section mt-5">
            {filtering ? "Search" : "Latest"} <em className="font-normal italic text-charcoal">{filtering ? "Results." : "Insights."}</em>
          </h2>
          <div className={cn("mt-12 transition-opacity", loading && "opacity-60")}>
            {items.length ? (
              <div className="ruled-grid md:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            ) : (
              <p className="body-copy">{filtering ? "No results found." : "No insights have been published yet."}</p>
            )}
          </div>
          {items.length < total && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={more}
                disabled={loading}
                className="inline-flex items-center gap-3 border border-gold/65 px-8 py-[18px] text-[12px] font-semibold uppercase tracking-[0.1em] text-forest hover:bg-gold/12 hover:text-gold-ink disabled:opacity-60"
              >
                {loading ? "Loading…" : "Load more"} <span aria-hidden className="h-px w-4 bg-current" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: Taxonomy[] }) {
  const id = `kh-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} className="field">
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.slug} value={o.slug}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ResourcesGrid({ resources }: { resources: Omit<ResourceItem, "fileUrl">[] }) {
  const [open, setOpen] = useState<{ slug: string; title: string } | null>(null);
  return (
    <>
      <div className="ruled-grid ruled-grid-alt md:grid-cols-3">
        {resources.map((r) => (
          <article key={r.slug} className="flex h-full flex-col p-8">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-ink">{r.resourceType}</p>
            <h3 className="mt-4 text-[24px] leading-tight">{r.title}</h3>
            <p className="card-copy mt-3">{r.description}</p>
            <div className="mt-auto flex items-center justify-between pt-8">
              {r.gated && <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-body-2">Form required</span>}
              <button
                type="button"
                onClick={() => setOpen({ slug: r.slug, title: r.title })}
                className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-forest underline decoration-gold underline-offset-8 hover:text-gold-ink"
              >
                Request <span aria-hidden className="h-px w-[18px] bg-current transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </article>
        ))}
      </div>
      {open && <ResourceRequest slug={open.slug} title={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}
