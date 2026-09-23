import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/site/Cards";
import { Accordion, CtaBand, PageHero } from "@/components/ui/Blocks";
import { ButtonLink } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/Cards";
import { ServiceIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Motion";
import { Section, SectionIntro } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { howWeWork } from "@/content/site";
import { serviceArea } from "@/lib/areas";
import { getIndustries, getService, getServiceArticles, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return {};
  return pageMetadata({
    path: `/services/${slug}`,
    title: s.seoTitle || `${s.title} | Insight Advora LLP`,
    description: s.metaDescription || s.description.slice(0, 158),
  });
}

function Numbered({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="numeral text-[30px]">{n}</span>
      {children}
    </div>
  );
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [allServices, allIndustries, articles] = await Promise.all([getServices(), getIndustries(), getServiceArticles(slug, 3)]);
  const related = service.related.map((r) => allServices.find((s) => s.slug === r)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const industries = allIndustries.filter((i) => service.industries.includes(i.slug) || i.services.includes(service.slug));
  const contactHref = `/contact?area=${encodeURIComponent(serviceArea(service.slug))}`;

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Our Services" }, { label: service.title }]}
        eyebrow={`Practice ${service.number}`}
        lead={service.title}
        intro={
          <>
            <p className="statement text-charcoal">{service.headline}</p>
            <p className="mt-6">{service.description}</p>
          </>
        }
      >
        <div className="mt-10">
          <ButtonLink href={contactHref}>Discuss Your Requirement</ButtonLink>
        </div>
      </PageHero>

      <Section tone="ivory-2" labelledBy="challenge">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Numbered n="01">
              <h2 id="challenge" className="h-section">The Challenge</h2>
            </Numbered>
          </Reveal>
          <ul className="border-t border-hairline-strong">
            {service.challenges.map((c, i) => (
              <Reveal as="li" key={c} index={i} className="flex gap-5 border-b border-hairline-strong py-6">
                <span aria-hidden className="mt-3 h-[7px] w-[7px] flex-none rounded-full bg-gold" />
                <span className="body-copy">{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="perspective">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Numbered n="02">
              <h2 id="perspective" className="h-section">Our Perspective</h2>
            </Numbered>
          </Reveal>
          <Reveal index={1}>
            <p className="statement border-l border-gold pl-6 text-forest">{service.perspective}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory-2" labelledBy="what">
        <Numbered n="03">
          <h2 id="what" className="h-section">What We Do</h2>
        </Numbered>
        <ul className="ruled-grid mt-12 sm:grid-cols-2">
          {service.capabilities.map((c, i) => (
            <Reveal as="li" key={c} index={i} className="flex items-center gap-4 p-6">
              <span aria-hidden className="h-px w-5 flex-none bg-gold" />
              <span className="text-[15.5px] font-normal text-forest">{c}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="how">
        <Numbered n="04">
          <h2 id="how" className="h-section">How We Work</h2>
        </Numbered>
        <div className="mt-14">
          <Timeline steps={howWeWork} />
        </div>
      </Section>

      <Section tone="forest" labelledBy="success">
        <div className="flex items-baseline gap-4">
          <span className="numeral text-[30px]">05</span>
          <h2 id="success" className="h-section text-ivory">
            What Success <em className="font-normal italic text-gold-pale">Can Look Like</em>
          </h2>
        </div>
        <p className="body-copy mt-6 max-w-[680px] text-on-dark">
          Every organisation is different. These are potential outcomes that an engagement may work towards — not guaranteed results.
        </p>
        <ul className="mt-12 grid gap-px bg-ivory/10 md:grid-cols-2">
          {service.outcomes.map((o, i) => (
            <Reveal as="li" key={o} index={i} className="flex gap-5 bg-forest p-8">
              <span className="numeral text-[26px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="body-copy text-on-dark">{o}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related">
          <Numbered n="06">
            <h2 id="related" className="h-section">Related Services</h2>
          </Numbered>
          <div className="ruled-grid mt-12 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} index={i}>
                <NumberedCard href={`/services/${r.slug}`} number={r.number} title={r.title} body={r.headline} icon={<ServiceIcon name={r.icon} />} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {industries.length > 0 && (
        <Section tone="ivory-2" labelledBy="rel-ind">
          <SectionIntro eyebrow="Related Industries" lead="Where This" accent="Practice Applies." id="rel-ind" />
          <ul className="mt-10 flex flex-wrap gap-3">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="chip transition-colors hover:border-gold hover:text-gold-ink">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section labelledBy="kh">
        <Numbered n="07">
          <h2 id="kh" className="h-section">Knowledge Hub</h2>
        </Numbered>
        {articles.length ? (
          <div className="ruled-grid mt-12 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} index={i}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="body-copy mt-8">No insights have been published for this practice yet.</p>
        )}
      </Section>

      {service.faq.length > 0 && (
        <Section tone="ivory-2" labelledBy="faq">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq" className="h-section mt-5">
                Frequently <em className="font-normal italic text-charcoal">Asked.</em>
              </h2>
            </div>
            <Accordion items={service.faq} />
          </div>
        </Section>
      )}

      <CtaBand lead="Discuss Your" accent="Requirement." primary={{ href: contactHref, label: "Discuss Your Requirement" }} />
    </>
  );
}
