import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShare } from "@/components/site/ArticleShare";
import { ArticleCard } from "@/components/site/Cards";
import { Breadcrumb, CtaBand, JsonLd } from "@/components/ui/Blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Motion";
import { Section } from "@/components/ui/Section";
import { SITE_URL } from "@/content/site";
import { getArticle, getArticles, getIndustries, getRelatedArticles, getServices } from "@/lib/data";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { pageMetadata } from "@/lib/seo";
import { formatDate, withHeadingIds } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/knowledge-hub/[slug]">) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    path: `/knowledge-hub/${slug}`,
    title: a.seoTitle || `${a.title} | Insight Advora LLP`,
    description: a.metaDescription || a.excerpt,
    ogImage: a.featuredImage,
    type: "article",
  });
}

export default async function ArticlePage({ params }: PageProps<"/knowledge-hub/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const [related, services, industries] = await Promise.all([getRelatedArticles(article, 3), getServices(), getIndustries()]);
  const { html, toc } = withHeadingIds(sanitizeArticleHtml(article.body));
  const url = `${SITE_URL}/knowledge-hub/${article.slug}`;
  const relServices = services.filter((s) => article.services.includes(s.slug));
  const relIndustries = industries.filter((i) => article.industries.includes(i.slug));

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: url,
    ...(article.featuredImage ? { image: article.featuredImage } : {}),
    author: article.author ? { "@type": "Person", name: article.author.name } : { "@type": "Organization", name: "Insight Advora LLP" },
    publisher: { "@type": "Organization", name: "Insight Advora LLP", logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo-v.png` } },
  };

  return (
    <>
      <JsonLd data={ld} />
      <article>
        <header className="bg-ivory">
          <div className="container-site pb-14 pt-[clamp(40px,5vw,72px)]">
            <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/knowledge-hub", label: "Knowledge Hub" }, { label: article.title }]} />
            <Reveal className="mt-12 max-w-[980px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
                {article.categoryName} <span className="text-body-2/60">|</span> <span className="text-body-2">{article.contentTypeName}</span>
              </p>
              <h1 className="h-page mt-6">{article.title}</h1>
              {article.subtitle && <p className="statement mt-6 text-charcoal">{article.subtitle}</p>}
              <p className="mt-8 flex flex-wrap items-center gap-3 text-[13px] text-body-2">
                {article.author && <span className="font-medium text-forest">{article.author.name}</span>}
                {article.author && <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-gold" />}
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-gold" />
                {article.readingTime} min read
              </p>
            </Reveal>
          </div>
          {article.featuredImage && (
            <div className="container-site">
              <div className="relative aspect-[21/9] overflow-hidden bg-card-alt">
                <Image src={article.featuredImage} alt="" fill priority sizes="100vw" className="object-cover" />
              </div>
            </div>
          )}
        </header>

        <div className="container-site grid gap-12 py-14 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr_120px]">
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            {toc.length > 0 && (
              <nav aria-label="Table of contents">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-body-2">Contents</p>
                <ol className="mt-4 space-y-3 border-l border-hairline-strong">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-body hover:border-gold hover:text-gold-ink">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="mt-10">
              <ArticleShare url={url} title={article.title} />
            </div>
          </aside>

          <div>
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />

            {article.keyTakeaways.length > 0 && (
              <section aria-labelledby="takeaways" className="mt-14 max-w-[68ch] border border-gold bg-gold/[0.06] p-8">
                <h2 id="takeaways" className="text-[28px]">Key Takeaways</h2>
                <ul className="mt-5 space-y-3">
                  {article.keyTakeaways.map((k, i) => (
                    <li key={i} className="flex gap-4 text-[16px] leading-relaxed text-body-deep">
                      <span className="numeral text-[20px]">{String(i + 1).padStart(2, "0")}</span>
                      {k}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(relServices.length > 0 || relIndustries.length > 0) && (
              <div className="mt-12 max-w-[68ch] space-y-5">
                {relServices.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-body-2">Services</span>
                    {relServices.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="chip hover:border-gold hover:text-gold-ink">
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
                {relIndustries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-body-2">Industries</span>
                    {relIndustries.map((i) => (
                      <Link key={i.slug} href={`/industries/${i.slug}`} className="chip hover:border-gold hover:text-gold-ink">
                        {i.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {article.author && (
              <div className="mt-12 flex max-w-[68ch] gap-6 border-y border-hairline-strong py-8">
                <span aria-hidden className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-card-alt font-serif text-[22px] text-forest">
                  {article.author.name.replace(/[^A-Za-z ]/g, "").trim().charAt(0) || "IA"}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Author</p>
                  <p className="mt-2 font-serif text-[22px] text-forest">{article.author.name}</p>
                  {article.author.role && <p className="text-[14px] text-body-2">{article.author.role}</p>}
                  {article.author.bio && <p className="card-copy mt-3">{article.author.bio}</p>}
                </div>
              </div>
            )}

            <div className="mt-12">
              <ButtonLink href="/contact">Discuss This Topic With Our Team</ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="ivory-2" labelledBy="related">
          <h2 id="related" className="h-section">
            Related <em className="font-normal italic text-charcoal">Insights.</em>
          </h2>
          <div className="ruled-grid mt-12 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
