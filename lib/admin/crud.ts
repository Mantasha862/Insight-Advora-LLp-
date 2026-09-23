import "server-only";
import { prisma } from "@/lib/db";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { readingTimeFromHtml, slugify } from "@/lib/utils";
import { getResourceDef, STATUSES, type Field, type ResourceDef } from "@/lib/admin/resources";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Delegate = any;
const model = (name: string): Delegate => (prisma as unknown as Record<string, Delegate>)[name];

export async function listRows(def: ResourceDef, opts: { q?: string; status?: string }) {
  const where: Record<string, unknown> = {};
  if (opts.status && (STATUSES as readonly string[]).includes(opts.status)) where.status = opts.status;
  if (opts.q) where[def.titleField] = { contains: opts.q, mode: "insensitive" };
  return model(def.model).findMany({ where, orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }], take: 500 }) as Promise<Record<string, unknown>[]>;
}

export async function getRow(def: ResourceDef, id: string) {
  const row = (await model(def.model).findUnique({ where: { id } })) as Record<string, unknown> | null;
  if (!row) return null;
  for (const f of def.fields) {
    if (f.type === "m2m" && f.join) {
      const links = (await model(f.join.model).findMany({ where: { [f.join.selfKey]: id } })) as Record<string, string>[];
      row[f.name] = links.map((l) => l[f.join!.otherKey]);
    }
  }
  return row;
}

/** Options for relation / m2m pickers. */
export async function relationOptions(def: ResourceDef) {
  const out: Record<string, { id: string; label: string }[]> = {};
  for (const f of def.fields) {
    if ((f.type === "relation" || f.type === "m2m") && f.source && !out[f.source]) {
      const src = getResourceDef(f.source);
      if (!src) continue;
      const rows = (await model(src.model).findMany({ orderBy: { displayOrder: "asc" }, take: 500 })) as Record<string, string>[];
      out[f.source] = rows.map((r) => ({ id: r.id, label: r[src.titleField] }));
    }
  }
  return out;
}

export class ValidationError extends Error {
  constructor(public fieldErrors: Record<string, string>) {
    super("Validation failed");
  }
}

const isUrl = (v: string) => /^https?:\/\/[^\s]+$/i.test(v) || /^\/[^\s]*$/.test(v);

function parseField(f: Field, fd: FormData, errors: Record<string, string>): unknown {
  const raw = fd.get(f.name);
  const s = typeof raw === "string" ? raw.trim() : "";
  const tooLong = f.max && s.length > f.max;
  if (tooLong) errors[f.name] = `Maximum ${f.max} characters.`;

  switch (f.type) {
    case "text":
    case "textarea":
      if (f.required && !s) errors[f.name] = "Required.";
      if (f.name === "linkedin" && s && !/^https:\/\/([a-z]+\.)?linkedin\.com\//i.test(s)) errors[f.name] = "Must be a linkedin.com URL.";
      return s || null;
    case "richtext": {
      const clean = sanitizeArticleHtml(s);
      if (f.required && !clean.replace(/<[^>]+>/g, "").trim()) errors[f.name] = "Required.";
      return clean;
    }
    case "number": {
      const n = parseInt(s || "0", 10);
      return Number.isFinite(n) ? n : 0;
    }
    case "boolean":
      return raw === "on" || raw === "true";
    case "list":
      return s
        .split(/\r?\n/)
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 50)
        .map((x) => x.slice(0, 300));
    case "faq":
      return s
        .split(/\r?\n\s*\r?\n/)
        .map((block) => {
          const [q, ...a] = block.split(/\r?\n/);
          return { q: (q ?? "").trim().slice(0, 300), a: a.join(" ").trim().slice(0, 2000) };
        })
        .filter((x) => x.q && x.a);
    case "select":
      if (s && f.options && !f.options.includes(s)) errors[f.name] = "Invalid option.";
      return s || f.options?.[0] || null;
    case "image":
      if (s && !isUrl(s)) errors[f.name] = "Must be an https:// URL or a site path.";
      return s || null;
    case "date": {
      if (!s) return null;
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) errors[f.name] = "Invalid date.";
      return d;
    }
    case "relation":
      return s || null;
    case "m2m":
      return fd.getAll(f.name).filter((v): v is string => typeof v === "string" && v.length > 0);
  }
}

export async function saveRow(def: ResourceDef, id: string | null, fd: FormData): Promise<string> {
  const errors: Record<string, string> = {};
  const data: Record<string, unknown> = {};
  const m2m: { f: Field; ids: string[] }[] = [];

  for (const f of def.fields) {
    const v = parseField(f, fd, errors);
    if (f.type === "m2m") m2m.push({ f, ids: v as string[] });
    else data[f.name] = v;
  }

  const status = String(fd.get("status") ?? "draft");
  if (def.hasStatus) data.status = (STATUSES as readonly string[]).includes(status) ? status : "draft";

  data.slug = slugify(String(data.slug || data[def.titleField] || ""));
  if (!data.slug) errors.slug = "A slug is required.";
  if (Object.keys(errors).length) throw new ValidationError(errors);

  // Article-specific rules
  if (def.model === "article") {
    if (!data.readingTime) data.readingTime = readingTimeFromHtml(String(data.body ?? ""));
    if (data.status === "published" && !data.publishedAt) data.publishedAt = new Date();
  }
  if (def.model === "service" && !data.icon) data.icon = "strategy";

  const delegate = model(def.model);
  try {
    const saved = id ? await delegate.update({ where: { id }, data }) : await delegate.create({ data });
    for (const { f, ids } of m2m) {
      const j = f.join!;
      await model(j.model).deleteMany({ where: { [j.selfKey]: saved.id } });
      if (ids.length) await model(j.model).createMany({ data: ids.map((o) => ({ [j.selfKey]: saved.id, [j.otherKey]: o })), skipDuplicates: true });
    }
    if (def.model === "article") await afterArticleSave(saved.id, Boolean(data.featured));
    return saved.id as string;
  } catch (e: unknown) {
    if (typeof e === "object" && e && "code" in e && (e as { code: string }).code === "P2002") throw new ValidationError({ slug: "This slug is already in use." });
    throw e;
  }
}

async function afterArticleSave(id: string, featured: boolean) {
  if (featured) await prisma.article.updateMany({ where: { id: { not: id } }, data: { featured: false } });
  const a = await prisma.article.findUnique({ where: { id }, include: { category: true, tags: { include: { tag: true } } } });
  if (!a) return;
  const extra = [a.category?.name ?? "", ...a.tags.map((t) => t.tag.name)].join(" ");
  await prisma.article.update({ where: { id }, data: { searchExtra: extra } });
}

export async function setRowStatus(def: ResourceDef, id: string, status: string) {
  if (!(STATUSES as readonly string[]).includes(status)) return;
  const data: Record<string, unknown> = { status };
  if (def.model === "article" && status === "published") {
    const row = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!row?.publishedAt) data.publishedAt = new Date();
  }
  await model(def.model).update({ where: { id }, data });
}

export async function deleteRow(def: ResourceDef, id: string) {
  await model(def.model).delete({ where: { id } });
}
