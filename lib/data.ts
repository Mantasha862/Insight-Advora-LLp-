import "server-only";
import { cache } from "react";
import { Prisma } from "@prisma/client";
import { hasDb, prisma } from "@/lib/db";
import type {
  ArticleItem,
  Faq,
  IndustryItem,
  ResourceItem,
  ServiceItem,
  SiteSettingsItem,
  Taxonomy,
  TeamCategoryItem,
  TeamMemberItem,
} from "@/lib/types";
import { services as seedServices } from "@/content/services";
import { industries as seedIndustries } from "@/content/industries";
import { team as seedTeam, teamCategories as seedTeamCategories } from "@/content/team";
import {
  articles as seedArticles,
  categories as seedCategories,
  contentTypes as seedContentTypes,
  resources as seedResources,
} from "@/content/insights";
import { defaultSettings } from "@/content/site";

// Every public read goes through this module. When DATABASE_URL is not set the
// site renders from the seed content in /content so it can be previewed before
// the database is connected. Only `status = published` rows are ever returned.

const PUBLISHED = { status: "published" as const };

// ─── Settings ───────────────────────────────────────────────────────────────

export const getSettings = cache(async (): Promise<SiteSettingsItem> => {
  if (!hasDb) return defaultSettings;
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!s) return defaultSettings;
  return {
    firmName: s.firmName,
    tagline: s.tagline,
    email: s.email ?? defaultSettings.email,
    phone: s.phone ?? defaultSettings.phone,
    address: s.address ?? defaultSettings.address,
    officeHours: s.officeHours ?? defaultSettings.officeHours,
    mapEmbedUrl: s.mapEmbedUrl,
    linkedin: s.linkedin,
    footerText: s.footerText ?? defaultSettings.footerText,
    copyrightYear: s.copyrightYear,
    gaId: s.gaId || process.env.NEXT_PUBLIC_GA_ID || null,
    gtmId: s.gtmId || process.env.NEXT_PUBLIC_GTM_ID || null,
    careersActive: s.careersActive,
  };
});

export const getPageSeo = cache(async (path: string) => {
  if (!hasDb) return null;
  return prisma.pageSeo.findUnique({ where: { path } });
});

// ─── Services ───────────────────────────────────────────────────────────────

type DbService = Prisma.ServiceGetPayload<{ include: { industries: { include: { industry: true } } } }>;

function mapService(s: DbService): ServiceItem {
  return {
    slug: s.slug,
    number: s.number,
    title: s.title,
    shortTitle: s.shortTitle,
    headline: s.headline,
    description: s.description,
    icon: s.icon,
    challenge: s.challenge ?? "",
    capabilities: s.capabilities,
    flow: s.flow,
    challenges: s.challenges,
    perspective: s.perspective ?? "",
    outcomes: s.outcomes,
    related: s.related,
    industries: s.industries.filter((i) => i.industry.status === "published").map((i) => i.industry.slug),
    faq: (Array.isArray(s.faq) ? (s.faq as unknown as Faq[]) : []).filter((f) => f && f.q),
    seoTitle: s.seoTitle,
    metaDescription: s.metaDescription,
  };
}

export const getServices = cache(async (): Promise<ServiceItem[]> => {
  if (!hasDb) return seedServices;
  const rows = await prisma.service.findMany({
    where: PUBLISHED,
    orderBy: [{ displayOrder: "asc" }, { number: "asc" }],
    include: { industries: { include: { industry: true } } },
  });
  return rows.map(mapService);
});

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

// ─── Industries ─────────────────────────────────────────────────────────────

export const getIndustries = cache(async (): Promise<IndustryItem[]> => {
  if (!hasDb) return seedIndustries;
  const rows = await prisma.industry.findMany({
    where: PUBLISHED,
    orderBy: [{ displayOrder: "asc" }, { number: "asc" }],
    include: { services: { include: { service: true } } },
  });
  return rows.map((r) => ({
    slug: r.slug,
    number: r.number,
    name: r.name,
    headline: r.headline,
    summary: r.summary,
    context: r.context,
    scopeNote: r.scopeNote,
    considerations: r.considerations,
    challenges: r.challenges,
    topics: r.topics,
    services: r.services.filter((s) => s.service.status === "published").map((s) => s.service.slug),
    seoTitle: r.seoTitle,
    metaDescription: r.metaDescription,
  }));
});

export async function getIndustry(slug: string) {
  return (await getIndustries()).find((i) => i.slug === slug) ?? null;
}

// ─── Team ───────────────────────────────────────────────────────────────────

export const getTeamCategories = cache(async (): Promise<TeamCategoryItem[]> => {
  if (!hasDb) return seedTeamCategories;
  const rows = await prisma.teamCategory.findMany({ where: PUBLISHED, orderBy: { displayOrder: "asc" } });
  return rows.map((r) => ({ slug: r.slug, name: r.name }));
});

export const getTeam = cache(async (): Promise<TeamMemberItem[]> => {
  if (!hasDb) return seedTeam;
  const rows = await prisma.teamMember.findMany({
    where: PUBLISHED,
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    include: { category: true },
  });
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    designation: r.designation,
    qualification: r.qualification,
    category: r.category?.slug ?? "",
    categoryName: r.category?.name ?? "",
    expertise: r.expertise,
    bio: r.bio,
    focus: r.focus,
    photo: r.photo,
    linkedin: r.linkedin,
    featured: r.featured,
  }));
});

export async function getTeamMember(slug: string) {
  return (await getTeam()).find((m) => m.slug === slug) ?? null;
}

export async function getFeaturedTeam(limit = 3) {
  const team = await getTeam();
  const featured = team.filter((m) => m.featured);
  return (featured.length ? featured : team).slice(0, limit);
}

// ─── Knowledge hub ──────────────────────────────────────────────────────────

const articleInclude = {
  category: true,
  contentType: true,
  author: true,
  industries: { include: { industry: true } },
  services: { include: { service: true } },
  tags: { include: { tag: true } },
} satisfies Prisma.ArticleInclude;

type DbArticle = Prisma.ArticleGetPayload<{ include: typeof articleInclude }>;

function mapArticle(a: DbArticle): ArticleItem {
  return {
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    excerpt: a.excerpt,
    body: a.body,
    keyTakeaways: a.keyTakeaways,
    featuredImage: a.featuredImage,
    readingTime: a.readingTime,
    featured: a.featured,
    publishedAt: (a.publishedAt ?? a.createdAt).toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    category: a.category?.slug ?? "",
    categoryName: a.category?.name ?? "",
    contentType: a.contentType?.slug ?? "",
    contentTypeName: a.contentType?.name ?? "",
    author: a.author
      ? { slug: a.author.slug, name: a.author.name, role: a.author.role, bio: a.author.bio, linkedin: a.author.linkedin }
      : null,
    industries: a.industries.map((i) => i.industry.slug),
    services: a.services.map((s) => s.service.slug),
    tags: a.tags.map((t) => t.tag.name),
    seoTitle: a.seoTitle,
    metaDescription: a.metaDescription,
  };
}

export const getArticles = cache(async (): Promise<ArticleItem[]> => {
  if (!hasDb) return [...seedArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const rows = await prisma.article.findMany({
    where: PUBLISHED,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: articleInclude,
  });
  return rows.map(mapArticle);
});

export async function getArticle(slug: string) {
  return (await getArticles()).find((a) => a.slug === slug) ?? null;
}

export async function getFeaturedArticle() {
  const all = await getArticles();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export const getTaxonomies = cache(async (): Promise<{ categories: Taxonomy[]; contentTypes: Taxonomy[] }> => {
  if (!hasDb) return { categories: seedCategories, contentTypes: seedContentTypes };
  const [categories, contentTypes] = await Promise.all([
    prisma.category.findMany({ where: PUBLISHED, orderBy: { displayOrder: "asc" } }),
    prisma.contentType.findMany({ where: PUBLISHED, orderBy: { displayOrder: "asc" } }),
  ]);
  return {
    categories: categories.map((c) => ({ slug: c.slug, name: c.name })),
    contentTypes: contentTypes.map((c) => ({ slug: c.slug, name: c.name })),
  };
});

export const getResources = cache(async (): Promise<ResourceItem[]> => {
  if (!hasDb) return seedResources;
  const rows = await prisma.resource.findMany({ where: PUBLISHED, orderBy: { displayOrder: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    resourceType: r.resourceType,
    fileUrl: r.fileUrl,
    gated: r.gated,
  }));
});

export type ArticleQuery = {
  q?: string;
  category?: string;
  type?: string;
  industry?: string;
  offset?: number;
  limit?: number;
};

/** Server-side search + pagination. Uses Postgres full-text search when a DB is configured. */
export async function searchArticles(query: ArticleQuery): Promise<{ items: ArticleItem[]; total: number }> {
  const offset = Math.max(0, query.offset ?? 0);
  const limit = Math.min(24, Math.max(1, query.limit ?? 6));
  const q = (query.q ?? "").trim().slice(0, 120);

  if (!hasDb) {
    const needle = q.toLowerCase();
    const matched = (await getArticles()).filter((a) => {
      if (query.category && a.category !== query.category) return false;
      if (query.type && a.contentType !== query.type) return false;
      if (query.industry && !a.industries.includes(query.industry)) return false;
      if (!needle) return true;
      const hay = [a.title, a.subtitle, a.excerpt, a.body.replace(/<[^>]+>/g, " "), a.tags.join(" "), a.categoryName]
        .join(" ")
        .toLowerCase();
      return needle.split(/\s+/).every((w) => hay.includes(w));
    });
    return { items: matched.slice(offset, offset + limit), total: matched.length };
  }

  const where: Prisma.ArticleWhereInput = { ...PUBLISHED };
  if (query.category) where.category = { slug: query.category };
  if (query.type) where.contentType = { slug: query.type };
  if (query.industry) where.industries = { some: { industry: { slug: query.industry } } };

  if (q) {
    const ids = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM articles
      WHERE status = 'published' AND search_vector @@ websearch_to_tsquery('english', ${q})`;
    where.id = { in: ids.map((r) => r.id) };
  }

  const [rows, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: offset,
      take: limit,
      include: articleInclude,
    }),
    prisma.article.count({ where }),
  ]);
  return { items: rows.map(mapArticle), total };
}

// ─── Relationship scoring ───────────────────────────────────────────────────

const shared = (a: string[], b: string[]) => a.filter((x) => b.includes(x)).length;

/** Related insights: category +3, industry +2, +1 per shared service or tag. */
export async function getRelatedArticles(article: ArticleItem, limit = 3) {
  const all = await getArticles();
  return all
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score:
        (a.category === article.category ? 3 : 0) +
        (shared(a.industries, article.industries) > 0 ? 2 : 0) +
        shared(a.services, article.services) +
        shared(a.tags, article.tags),
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt))
    .slice(0, limit)
    .map((x) => x.a);
}

/** Industry articles: same industry +3, topic match +2, +1 per shared service. */
export async function getIndustryArticles(industry: IndustryItem, limit = 3) {
  const all = await getArticles();
  return all
    .map((a) => ({
      a,
      score:
        (a.industries.includes(industry.slug) ? 3 : 0) +
        (industry.topics.includes(a.category) ? 2 : 0) +
        shared(a.services, industry.services),
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt))
    .slice(0, limit)
    .map((x) => x.a);
}

export async function getServiceArticles(slug: string, limit = 3) {
  return (await getArticles()).filter((a) => a.services.includes(slug)).slice(0, limit);
}
