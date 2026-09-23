import Link from "next/link";
import { HomeHero } from "@/components/site/HomeHero";
import { ArticleCard, TeamCard } from "@/components/site/Cards";
import { CtaBand, JsonLd, Ticker } from "@/components/ui/Blocks";
import { TextLink } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/Cards";
import { Ecosystem } from "@/components/ui/Ecosystem";
import { ServiceIcon } from "@/components/ui/Icons";
import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Heading, Section, SectionIntro } from "@/components/ui/Section";
import { Chain, Timeline } from "@/components/ui/Timeline";
import { approach, SITE_URL } from "@/content/site";
import { getArticles, getFeaturedTeam, getIndustries, getServices, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { isPlaceholder } from "@/lib/utils";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/",
    title: "Insight Advora LLP | Partnering for Smarter Decisions",
    description:
      "A multidisciplinary consulting and advisory firm — strategy, operational excellence, growth, M&A advisory support, EHS and ESG — turning insight into measurable progress.",
  });
}

const ecosystem = [
  { key: "strategy", label: "Strategy", title: "Strategy", description: "Clear direction and priorities, grounded in evidence and owned by leadership.", href: "/services/strategy-advisory" },
  { key: "growth", label: "Growth", title: "Growth", description: "Deliberate choices about markets, customers and propositions — pursued with discipline.", href: "/services/business-growth" },
  { key: "performance", label: "Performance", title: "Performance", description: "Measures and routines that connect strategy to day-to-day results.", href: "/services/operational-excellence" },
  { key: "planet", label: "Planet", title: "Planet", description: "Environmental responsibility and ESG practice integrated with how the business is run.", href: "/services/esg-sustainability" },
  { key: "process", label: "Process", title: "Process", description: "Simpler, safer and more reliable ways of working across the organisation.", href: "/services/ehs" },
  { key: "people", label: "People", title: "People", description: "Capability, ownership and culture — the foundation for change that lasts.", href: "/about" },
];

export default async function HomePage() {
  const [services, industries, team, articles, settings] = await Promise.all([
    getServices(),
    getIndustries(),
    getFeaturedTeam(3),
    getArticles(),
    getSettings(),
  ]);
  const latest = articles.slice(0, 3);

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Insight Advora LLP",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-v.png`,
    slogan: "Partnering for Smarter Decisions",
    ...(settings.email && !isPlaceholder(settings.email) ? { email: settings.email } : {}),
    ...(settings.phone && !isPlaceholder(settings.phone) ? { telephone: settings.phone } : {}),
    ...(settings.linkedin && !isPlaceholder(settings.linkedin) ? { sameAs: [settings.linkedin] } : {}),
  };

  return (
    <>
      <JsonLd data={org} />
      <HomeHero />
      <Ticker items={["People", "Process", "Planet", "Progress", "Partnering for Smarter Decisions"]} />

      {/* Who we are */}
      <Section id="who-we-are" labelledBy="who-heading">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <Heading id="who-heading" lead="Where Insight" accent="Meets Action." className="mt-5" />
            <GoldRule className="mt-7" />
            <p className="body-copy mt-8 max-w-[600px]">
              Insight Advora LLP brings together strategy, operations, growth, transactions, EHS and ESG expertise under one
              roof. We help organisations see their challenges clearly, choose a practical way forward and put it into action —
              balancing people, process, planet and progress.
            </p>
            <div className="mt-9">
              <TextLink href="/about">Discover Our Story</TextLink>
            </div>
          </Reveal>
          <Reveal index={1} className="border-l border-gold/40 pl-8 md:pl-12">
            <p className="eyebrow">How Value Is Created</p>
            <Chain items={["Insight", "Strategy", "Action", "Impact"]} className="mt-8 sm:gap-y-6" />
          </Reveal>
        </div>
      </Section>

      {/* Areas of expertise */}
      <Section tone="ivory-2" labelledBy="expertise-heading">
        <SectionIntro eyebrow="Areas of Expertise" lead="Integrated Advisory," accent="Practical Outcomes." id="expertise-heading">
          Six connected practices, each grounded in practical experience and designed to work together where your challenges
          cross boundaries.
        </SectionIntro>
        <div className="ruled-grid mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} index={i}>
              <NumberedCard
                href={`/services/${s.slug}`}
                title={s.title}
                body={s.description.split(". ")[0] + "."}
                icon={<ServiceIcon name={s.icon} />}
                number={s.number}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Ecosystem */}
      <Section tone="forest" labelledBy="eco-heading">
        <SectionIntro eyebrow="An Integrated Perspective" lead="Connecting the Elements" accent="of Progress." dark id="eco-heading">
          Organisations are systems. Strategy, growth, performance, planet, process and people influence one another — so we
          look at them together.
        </SectionIntro>
        <div className="mt-16">
          <Ecosystem nodes={ecosystem} />
        </div>
      </Section>

      {/* Approach */}
      <Section labelledBy="approach-heading">
        <SectionIntro eyebrow="Our Approach" lead="A Clear Path From" accent="Insight to Impact." id="approach-heading">
          Every engagement follows a disciplined path — flexible enough to fit your context, structured enough to deliver.
        </SectionIntro>
        <div className="mt-16">
          <Timeline steps={approach} />
        </div>
      </Section>

      {/* Industries */}
      <Section tone="ivory-2" labelledBy="industries-heading">
        <SectionIntro eyebrow="Industries" lead="Sector Understanding," accent="Cross-Sector Perspective." id="industries-heading">
          We bring practical understanding of the operating realities in the sectors we serve.
        </SectionIntro>
        <ul className="ruled-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} index={i}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-300 hover:bg-forest"
              >
                <span className="numeral text-[32px] text-gold">{ind.number}</span>
                <span className="mt-6 font-serif text-[24px] leading-tight text-forest transition-colors group-hover:text-gold-pale">
                  {ind.name}
                </span>
                <span className="card-copy mt-3 transition-colors group-hover:text-ivory/75">{ind.summary}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <TextLink href="/industries">View All Industries</TextLink>
        </div>
      </Section>

      {/* Team */}
      {team.length > 0 && (
        <Section labelledBy="team-heading">
          <SectionIntro eyebrow="Our Team" lead="Expertise With" accent="Perspective." id="team-heading">
            A multidisciplinary team bringing complementary experience to every engagement.
          </SectionIntro>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.slug} index={i}>
                <TeamCard member={m} compact />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <TextLink href="/team">Meet Our Team</TextLink>
          </div>
        </Section>
      )}

      {/* Knowledge hub */}
      <Section tone="ivory-2" labelledBy="kh-heading">
        <SectionIntro eyebrow="Knowledge Hub" lead="Perspectives for" accent="Better Decisions." id="kh-heading">
          Practical thinking on strategy, operations, growth, transactions, EHS and sustainability.
        </SectionIntro>
        {latest.length ? (
          <div className="ruled-grid mt-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {latest.map((a, i) => (
              <Reveal key={a.slug} index={i}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="body-copy mt-14">No insights have been published yet.</p>
        )}
        <div className="mt-10">
          <TextLink href="/knowledge-hub">Visit the Knowledge Hub</TextLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
