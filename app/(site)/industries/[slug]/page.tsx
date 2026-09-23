import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/site/Cards";
import { CtaBand, PageHero } from "@/components/ui/Blocks";
import { ButtonLink } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/Cards";
import { ServiceIcon } from "@/components/ui/Icons";
import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Section, SectionIntro } from "@/components/ui/Section";
import { Chain } from "@/components/ui/Timeline";
import { getIndustries, getIndustry, getIndustryArticles, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getIndustries()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = await getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({
    path: `/industries/${slug}`,
    title: ind.seoTitle || `${ind.name} | Insight Advora LLP`,
    description: ind.metaDescription || ind.summary,
  });
}

export default async function IndustryDetailPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();
  const [services, articles] = await Promise.all([getServices(), getIndustryArticles(industry, 3)]);
  const relevant = services.filter((s) => industry.services.includes(s.slug));

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/industries", label: "Industries" }, { label: industry.name }]}
        eyebrow={`Industry ${industry.number}`}
        lead={industry.name}
        intro={<p className="statement text-charcoal">{industry.headline}</p>}
      >
        <div className="mt-10">
          <ButtonLink href="/contact">Discuss Your Requirement</ButtonLink>
        </div>
      </PageHero>

      <Section tone="ivory-2" labelledBy="context">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Operating Context</p>
            <h2 id="context" className="h-section mt-5">
              The Landscape <em className="font-normal italic text-charcoal">Today.</em>
            </h2>
            <GoldRule className="mt-7" />
          </Reveal>
          <Reveal index={1}>
            <p className="body-copy">{industry.context}</p>
            {industry.scopeNote && (
              <p className="mt-8 border-l border-gold bg-gold/[0.06] p-5 text-[14px] leading-relaxed text-body-deep">
                <strong className="font-semibold text-forest">Scope note: </strong>
                {industry.scopeNote}
              </p>
            )}
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="considerations">
        <SectionIntro eyebrow="Key Business Considerations" lead="What Leaders" accent="Are Weighing." id="considerations" />
        <div className="ruled-grid mt-14 md:grid-cols-2 lg:grid-cols-4">
          {industry.considerations.map((c, i) => (
            <Reveal key={c} index={i} className="p-8">
              <span className="numeral text-[36px]">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-5 font-serif text-[21px] leading-snug text-forest">{c}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivory-2" labelledBy="challenges">
        <SectionIntro eyebrow="Challenges We Can Help Address" lead="Where We" accent="Can Support." id="challenges" />
        <ul className="mt-12 border-t border-hairline-strong">
          {industry.challenges.map((c, i) => (
            <Reveal as="li" key={c} index={i} className="flex items-center gap-6 border-b border-hairline-strong py-6">
              <span aria-hidden className="h-px w-6 flex-none bg-gold" />
              <span className="body-copy">{c}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {relevant.length > 0 && (
        <Section labelledBy="svc">
          <SectionIntro eyebrow="Relevant Services" lead="Practices for" accent={`${industry.name}.`} id="svc" />
          <div className="ruled-grid mt-14 md:grid-cols-2 lg:grid-cols-3">
            {relevant.map((s, i) => (
              <Reveal key={s.slug} index={i}>
                <NumberedCard href={`/services/${s.slug}`} number={s.number} title={s.title} body={s.headline} icon={<ServiceIcon name={s.icon} />} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section tone="forest" labelledBy="integrated">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow eyebrow-dark">Integrated Perspective</p>
            <h2 id="integrated" className="h-section mt-5 text-ivory">
              Seeing the <em className="font-normal italic text-gold-pale">Whole System.</em>
            </h2>
            <p className="body-copy mt-6 text-on-dark">
              Challenges in {industry.name.toLowerCase()} rarely sit in one function. We connect strategy, operations, safety and
              sustainability so that improvements reinforce one another.
            </p>
          </Reveal>
          <Reveal index={1}>
            <Chain items={["People", "Process", "Planet", "Progress"]} dark />
          </Reveal>
        </div>
      </Section>

      {articles.length > 0 && (
        <Section labelledBy="articles">
          <SectionIntro eyebrow="Related Insights" lead="Perspectives" accent="for This Sector." id="articles" />
          <div className="ruled-grid mt-14 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} index={i}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand lead={`Let's Talk About`} accent={`${industry.name}.`} />
    </>
  );
}
