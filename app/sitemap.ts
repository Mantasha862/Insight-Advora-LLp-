import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { getArticles, getIndustries, getServices, getTeam } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, team, articles] = await Promise.all([getServices(), getIndustries(), getTeam(), getArticles()]);
  const staticPaths = ["", "/about", "/services", "/industries", "/team", "/knowledge-hub", "/contact", "/privacy-policy", "/terms-of-use", "/disclaimer"];
  return [
    ...staticPaths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, priority: 0.8 })),
    ...industries.map((i) => ({ url: `${SITE_URL}/industries/${i.slug}`, priority: 0.7 })),
    ...team.map((m) => ({ url: `${SITE_URL}/team/${m.slug}`, priority: 0.5 })),
    ...articles.map((a) => ({ url: `${SITE_URL}/knowledge-hub/${a.slug}`, lastModified: new Date(a.updatedAt), priority: 0.6 })),
  ];
}
