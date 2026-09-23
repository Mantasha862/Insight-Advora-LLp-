import Link from "next/link";
import { InsightsBrowser, ResourcesGrid } from "@/components/site/KnowledgeHub";
import { NewsletterForm } from "@/components/site/Forms";
import { CtaBand, PageHero } from "@/components/ui/Blocks";
import { Section, SectionIntro } from "@/components/ui/Section";
import { getFeaturedArticle, getIndustries, getResources, getTaxonomies, searchArticles } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/knowledge-hub",
    title: "Knowledge Hub | Insight Advora LLP",
    description: "Insights, perspectives and resources on strategy, operations, growth, transactions, EHS and sustainability.",
  });
}

export default async function KnowledgeHubPage() {
  const [{ items, total }, featured, tax, industries, resources] = await Promise.all([
    searchArticles({ offset: 0, limit: 6 }),
    getFeaturedArticle(),
    getTaxonomies(),
    getIndustries(),
    getResources(),
  ]);

  const featuredBlock = featured ? (
    <section className="bg-ivory-2 py-[clamp(48px,6vw,88px)]" aria-labelledby="featured">
      <div className="container-site">
        <p className="eyebrow">Featured Insight</p>
        <Link href={`/knowledge-hub/${featured.slug}`} className="group mt-8 grid gap-10 border border-hairline bg-ivory p-8 transition-shadow hover:shadow-[var(--shadow-hover)] md:p-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-ink">
              {featured.categoryName} <span className="text-body-2/60">|</span> <span className="text-body-2">{featured.contentTypeName}</span>
            </p>
            <h2 id="featured" className="mt-5 text-[clamp(30px,3vw,44px)] leading-[1.1] transition-colors group-hover:text-gold-ink">{featured.title}</h2>
            {featured.subtitle && <p className="statement mt-4 !text-[21px] text-charcoal">{featured.subtitle}</p>}
          </div>
          <div className="flex flex-col justify-between border-l border-gold/50 pl-8">
            <p className="body-copy">{featured.excerpt}</p>
            <p className="mt-8 text-[12.5px] text-body-2">
              {formatDate(featured.publishedAt)} · {featured.readingTime} min read
            </p>
          </div>
        </Link>
      </div>
    </section>
  ) : null;

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Knowledge Hub" }]}
        eyebrow="Knowledge Hub"
        lead="Perspectives for"
        accent="Smarter Decisions."
        intro="Practical thinking on strategy, operations, growth, transactions, EHS and sustainability."
      />

      <InsightsBrowser
        initial={items}
        initialTotal={total}
        featured={featuredBlock}
        categories={tax.categories}
        contentTypes={tax.contentTypes}
        industries={industries.map((i) => ({ slug: i.slug, name: i.name }))}
      />

      {resources.length > 0 && (
        <Section tone="ivory-2" labelledBy="resources">
          <SectionIntro eyebrow="Resources" lead="Tools and" accent="Frameworks." id="resources">
            Practical resources to support your thinking. Some resources require a short form.
          </SectionIntro>
          <div className="mt-14">
            <ResourcesGrid resources={resources.map(({ fileUrl: _f, ...r }) => r)} />
          </div>
        </Section>
      )}

      <section className="bg-forest-2 text-ivory" aria-labelledby="newsletter">
        <div className="container-site section-y grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-dark">Newsletter</p>
            <h2 id="newsletter" className="h-section mt-5 text-ivory">
              Insights, <em className="font-normal italic text-gold-pale">Delivered.</em>
            </h2>
            <p className="body-copy mt-5 text-on-dark">Receive new perspectives from our team. No spam — unsubscribe at any time.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <CtaBand lead="Discuss a Topic" accent="With Our Team." />
    </>
  );
}
