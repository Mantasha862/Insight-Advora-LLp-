import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

export type LeadFilters = { q?: string; status?: string; area?: string; from?: string; to?: string };

export function leadWhere(f: LeadFilters): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};
  if (f.q) {
    where.OR = ["name", "email", "company", "message"].map((k) => ({ [k]: { contains: f.q, mode: "insensitive" } }));
  }
  if (f.status) where.status = f.status;
  if (f.area) where.areaOfInterest = f.area;
  const created: Prisma.DateTimeFilter = {};
  if (f.from && !Number.isNaN(Date.parse(f.from))) created.gte = new Date(f.from);
  if (f.to && !Number.isNaN(Date.parse(f.to))) created.lte = new Date(`${f.to}T23:59:59Z`);
  if (Object.keys(created).length) where.createdAt = created;
  return where;
}

export function listLeads(f: LeadFilters, take = 500) {
  return prisma.lead.findMany({ where: leadWhere(f), orderBy: { createdAt: "desc" }, take });
}

/** RFC 4180 CSV with formula-injection protection. */
export function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const esc = (v: unknown) => {
    let s = v instanceof Date ? v.toISOString() : v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [columns.join(","), ...rows.map((r) => columns.map((c) => esc(r[c])).join(","))].join("\r\n");
}

export function filtersFrom(sp: Record<string, string | string[] | undefined>): LeadFilters {
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string).slice(0, 200) : undefined);
  return { q: g("q"), status: g("status"), area: g("area"), from: g("from"), to: g("to") };
}
