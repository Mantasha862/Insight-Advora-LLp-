import type { Metadata } from "next";
import { SITE_URL } from "@/content/site";
import { getPageSeo } from "@/lib/data";

/**
 * Builds per-page metadata. Admin "SEO settings" (PageSeo rows keyed by path)
 * override the defaults passed here.
 */
export async function pageMetadata({
  path,
  title,
  description,
  ogImage,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  ogImage?: string | null;
  type?: "website" | "article" | "profile";
}): Promise<Metadata> {
  let seo = null;
  try {
    seo = await getPageSeo(path);
  } catch {
    seo = null;
  }
  const finalTitle = seo?.title || title;
  const finalDescription = seo?.description || description;
  const canonical = seo?.canonical || `${SITE_URL}${path === "/" ? "" : path}`;
  const image = seo?.ogImage || ogImage || undefined;
  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: "Insight Advora LLP",
      type,
      locale: "en_IN",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: finalTitle, description: finalDescription },
  };
}
