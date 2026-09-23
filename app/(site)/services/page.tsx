import Link from "next/link";
import { ArticleCard } from "@/components/site/Cards";
import { ChallengeSelector } from "@/components/site/ChallengeSelector";
import { CtaBand, PageHero } from "@/components/ui/Blocks";
import { TextLink } from "@/components/ui/Button";
import { Ecosystem } from "@/components/ui/Ecosystem";
import { ServiceIcon } from "@/components/ui/Icons";
import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Chips, Section, SectionIntro } from "@/components/ui/Section";
import { Chain, Timeline } from "@/components/ui/Timeline";
import { howWeWork } from "@/content/site";
import { getArticles, getIndustries, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { serviceArea } from "@/lib/areas";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/services",
    title: "Services | Insight Advora LLP",
    description:
      "Strategy & advisory, operational excellence, business growth, M&A advisory support, EHS advisory support and ESG reporting support — integrated consulting for measurable progress.",
  });
}

export default async function ServicesPage() {
  const [services, industries, articles] = await Promise.all([getServices(), getIndustries(), getArticles()]);

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Our Services" }]}
        eyebrow="Our Services"
        lead="Integrated Advisory for"
        accent="Measurable Progress."
        intro="Six connected practices helping organisations move from complexity to clarity — and from clarity to action."
      />

      <Section tone="ivory-2" labelledBy="our-approach">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Our Approach</p>
            <h2 id="our-approach" className="h-section mt-5">
              Every challenge is <em className="font-normal italic text-charcoal">connected.</em>
            </h2>
            <GoldRule className="mt-7" />
            <p className="body-copy mt-8 max-w-[560px]">
              Operational issues affect growth. Growth decisions shape risk. Sustainability influences strategy. We bring the
              relevant disciplines together so that solutions work as a whole.
            </p>
          </Reveal>
          <Reveal index={1}>
            <Chain items={["Challenge", "Insight", "Solution", "Progress"]} />
          </Reveal>
        </div>
      </Section>

      <Section tone="forest" labelledBy="eco">
        <SectionIntro eyebrow="Services Ecosystem" lead="Six Practices," accent="One Integrated View." dark id="eco">
          Hover or focus a practice to see what it covers.
        </SectionIntro>
        <div className="mt-16">
          <Ecosystem
            nodes={services.map((s) => ({
              key: s.slug,
              label: s.shortTitle,
              title: s.title,
              description: s.description,
              chips: s.capabilities.slice(0, 5),
              href: `/services/${s.slug}`,
              linkLabel: "Explore Service",
            }))}
          />
        </div>
      </Section>

      {services.map((s, idx) => (
        <Section key={s.slug} tone={idx % 2 ? "ivory-2" : "ivory"} id={s.slug} labelledBy={`svc-${s.slug}`}>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="flex items-center gap-5">
                <span className="numeral text-[58px]">{s.number}</span>
                <span className="flex h-[52px] w-[52px] items-center justify-center border border-hairline-strong text-forest">
                  <ServiceIcon name={s.icon} />
                </span>
              </div>
              <h2 id={`svc-${s.slug}`} className="h-section mt-8">{s.title}</h2>
              <p className="statement mt-4 text-charcoal">{s.headline}</p>
              <GoldRule className="mt-7" />
            </Reveal>
            <Reveal index={1}>
              <p className="body-copy">{s.description}</p>
              <Chips items={s.capabilities} className="mt-8" />
              <div className="mt-10 border-t border-hairline pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-body-2">How the work moves</p>
                <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
                  {s.flow.map((f, i) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="font-serif text-[20px] text-forest">{f}</span>
                      {i < s.flow.length - 1 && <span aria-hidden className="h-px w-8 bg-gold" />}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-10 flex flex-wrap gap-8">
                <TextLink href={`/services/${s.slug}`}>Explore {s.shortTitle}</TextLink>
                <TextLink href={`/contact?area=${encodeURIComponent(serviceArea(s.slug))}`}>Discuss Your Requirement</TextLink>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section labelledBy="solve">
        <SectionIntro eyebrow="Find the Right Practice" lead="What Are You Looking" accent="to Solve?" id="solve">
          Select the challenge closest to yours to see where we can help.
        </SectionIntro>
        <div className="mt-14">
          <ChallengeSelector services={services} />
        </div>
      </Section>

      <Section tone="ivory-2" labelledBy="together">
        <SectionIntro eyebrow="Integrated Delivery" lead="Where Disciplines" accent="Come Together." id="together">
          Many engagements draw on more than one practice. A growth strategy may need operational readiness; an acquisition may
          raise EHS and ESG considerations. We assemble the right combination for each situation.
        </SectionIntro>
        <div className="ruled-grid mt-14 md:grid-cols-3">
          {[
            ["Strategy + Operations", "Connecting direction with the processes and routines that deliver it."],
            ["Growth + Transactions", "Evaluating organic and inorganic routes to growth side by side."],
            ["EHS + ESG", "Aligning safety, environmental performance and sustainability reporting processes."],
          ].map(([t, d], i) => (
            <Reveal key={t} index={i} className="p-10">
              <h3 className="h-card">{t}</h3>
              <p className="card-copy mt-3">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section labelledBy="how">
        <SectionIntro eyebrow="How We Work" lead="A Structured," accent="Collaborative Process." id="how" />
        <div className="mt-16">
          <Timeline steps={howWeWork} />
        </div>
      </Section>

      <Section tone="ivory-2" labelledBy="sectors">
        <SectionIntro eyebrow="Sectors" lead="Industries" accent="We Serve." id="sectors" />
        <ul className="ruled-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link href={`/industries/${ind.slug}`} className="group flex h-full items-center justify-between gap-4 bg-ivory p-7 transition-colors hover:bg-forest">
                <span className="font-serif text-[22px] text-forest group-hover:text-gold-pale">{ind.name}</span>
                <span className="numeral text-[22px] text-gold">{ind.number}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {articles.length > 0 && (
        <Section labelledBy="deeper">
          <SectionIntro eyebrow="Go Deeper" lead="Insights From" accent="Our Practices." id="deeper" />
          <div className="ruled-grid mt-14 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} index={i}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        lead="Not Sure Where"
        accent="to Start?"
        text="Share the challenge in front of you. We will help identify the right combination of expertise."
        primary={{ href: "/contact", label: "Discuss Your Requirement" }}
        secondary={{ href: "/industries", label: "Explore Industries" }}
      />
    </>
  );
}

