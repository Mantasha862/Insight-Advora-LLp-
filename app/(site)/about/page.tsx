import { ArticleCard, TeamCard } from "@/components/site/Cards";
import { CtaBand, PageHero } from "@/components/ui/Blocks";
import { TextLink } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/Cards";
import { Ecosystem } from "@/components/ui/Ecosystem";
import { ServiceIcon } from "@/components/ui/Icons";
import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Heading, Section, SectionIntro } from "@/components/ui/Section";
import { Chain, Timeline } from "@/components/ui/Timeline";
import { AboutPhilosophy } from "@/components/site/AboutPhilosophy";
import { approach } from "@/content/site";
import { getArticles, getFeaturedTeam, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/about",
    title: "About Us | Insight Advora LLP",
    description: "Who we are, why we exist and how we work — a multidisciplinary consulting and advisory firm partnering for smarter decisions.",
  });
}

const integrated = [
  { key: "strategy", label: "Strategy", title: "Strategy", description: "Setting direction and priorities that the organisation can act on." },
  { key: "operations", label: "Operations", title: "Operations", description: "Improving how work flows so performance becomes repeatable." },
  { key: "growth", label: "Growth", title: "Growth", description: "Choosing where and how to grow with discipline." },
  { key: "transactions", label: "Transactions", title: "Transactions", description: "Advisory support for informed decisions across the deal lifecycle." },
  { key: "ehs", label: "EHS", title: "Environment, Health & Safety", description: "Advisory support for safer operations and stronger management systems." },
  { key: "esg", label: "ESG", title: "ESG & Sustainability", description: "Reporting support and practical roadmaps connected to business strategy." },
  { key: "people", label: "People", title: "People", description: "Capability and ownership — the foundation of change that lasts." },
];

const partnership = [
  { title: "Listen", text: "We begin by understanding your context, ambitions and constraints — before offering answers." },
  { title: "Collaborate", text: "We work alongside your teams, combining our perspective with their knowledge of the business." },
  { title: "Enable", text: "We build capability and ownership so progress continues after our involvement ends." },
];

export default async function AboutPage() {
  const [services, team, articles] = await Promise.all([getServices(), getFeaturedTeam(3), getArticles()]);

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "About Us" }]}
        eyebrow="About Insight Advora"
        lead="Partnering for"
        accent="Smarter Decisions."
        intro="We are a multidisciplinary consulting and advisory firm helping organisations turn insight into measurable progress."
      >
        <a href="#approach" className="group mt-10 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:text-gold-ink">
          Explore Our Approach <span aria-hidden className="inline-block animate-bob text-gold">↓</span>
        </a>
      </PageHero>

      <Section tone="ivory-2" labelledBy="who">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 id="who" className="h-section mt-5">
              <span className="block">Multidisciplinary.</span>
              <span className="block">Practical.</span>
              <em className="block font-normal italic text-charcoal">Partnership-led.</em>
            </h2>
            <GoldRule className="mt-7" />
          </Reveal>
          <Reveal index={1} className="body-copy space-y-5">
            <p>
              Insight Advora LLP brings together expertise in strategy, operational excellence, business growth, transaction
              advisory support, environment, health &amp; safety, and ESG &amp; sustainability.
            </p>
            <p>
              We believe the most important business challenges rarely sit neatly within one discipline. By connecting perspectives,
              we help leadership teams see the whole picture and act with confidence.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="why">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Why We Exist</p>
            <Heading id="why" lead="From Complexity" accent="to Progress." className="mt-5" />
            <GoldRule className="mt-7" />
            <blockquote className="statement mt-10 border-l border-gold pl-6 text-forest">
              Organisations do not need more information. They need clarity — and a practical path from insight to action.
            </blockquote>
          </Reveal>
          <Reveal index={1}>
            <Chain items={["Complexity", "Insight", "Strategy", "Action", "Progress"]} className="sm:flex-col sm:items-start sm:gap-5 [&_li>span:last-child]:hidden" />
          </Reveal>
        </div>
      </Section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-forest text-ivory" aria-labelledby="vision">
        <div className="grid lg:grid-cols-2">
          <div className="container-site section-y relative lg:pr-16">
            <Reveal>
              <p className="eyebrow eyebrow-dark">Our Vision</p>
              <h2 id="vision" className="h-section mt-5 text-ivory">
                To be a trusted partner for <em className="font-normal italic text-gold-pale">smarter, more sustainable decisions.</em>
              </h2>
              <GoldRule className="mt-7" dark />
            </Reveal>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-forest-2">
            <svg viewBox="0 0 400 400" aria-hidden className="h-[80%] max-h-[420px] w-auto">
              <g className="origin-center animate-orbit-slow" style={{ transformBox: "fill-box" }}>
                <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(212,180,120,0.35)" strokeDasharray="2 8" />
                <circle cx="200" cy="30" r="5" fill="#C79A55" />
              </g>
              <g className="origin-center animate-orbit-fast" style={{ transformBox: "fill-box" }}>
                <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(250,249,245,0.2)" />
                <circle cx="320" cy="200" r="4" fill="#FAF9F5" />
              </g>
              <circle cx="200" cy="200" r="60" fill="none" stroke="#C79A55" />
              <text x="200" y="206" textAnchor="middle" fill="#D4B478" style={{ font: "italic 400 22px var(--font-serif)" }}>
                Progress
              </text>
            </svg>
          </div>
        </div>
      </section>

      <Section labelledBy="mission">
        <SectionIntro eyebrow="Our Mission" lead="Clarity, Action," accent="Impact." id="mission">
          To help organisations make better decisions and turn them into practical, measurable progress — responsibly and in
          partnership.
        </SectionIntro>
        <div className="ruled-grid mt-14 md:grid-cols-3">
          {[
            { t: "Clarity", d: "Build a shared, evidence-based understanding of the issues that matter." },
            { t: "Action", d: "Translate insight into practical plans with clear ownership." },
            { t: "Impact", d: "Focus on outcomes that can be measured and sustained." },
          ].map((p, i) => (
            <Reveal key={p.t} index={i} className="p-10">
              <span className="numeral text-[44px]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-card mt-6">{p.t}</h3>
              <p className="card-copy mt-3">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <AboutPhilosophy />

      <Section tone="forest" labelledBy="integrated">
        <SectionIntro eyebrow="Integrated Perspective" lead="Seven Disciplines," accent="One View." dark id="integrated">
          Our practices are designed to connect. Explore how each perspective contributes to the whole.
        </SectionIntro>
        <div className="mt-16">
          <Ecosystem nodes={integrated} />
        </div>
      </Section>

      <Section labelledBy="expertise">
        <SectionIntro eyebrow="Our Expertise" lead="Six Practices," accent="Working Together." id="expertise" />
        <div className="ruled-grid mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} index={i}>
              <NumberedCard href={`/services/${s.slug}`} number={s.number} title={s.title} body={s.headline} icon={<ServiceIcon name={s.icon} />} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivory-2" labelledBy="approach" id="approach">
        <SectionIntro eyebrow="How We Work" lead="From Insight" accent="to Impact." id="approach-h" />
        <div className="mt-16">
          <Timeline steps={approach} />
        </div>
      </Section>

      <Section labelledBy="partnership">
        <SectionIntro eyebrow="Our Way of Working" lead="Partnership," accent="Not Prescription." id="partnership">
          We do not arrive with ready-made answers. We work with you to find the right ones.
        </SectionIntro>
        <ol className="mt-14 border-t border-hairline-strong">
          {partnership.map((p, i) => (
            <Reveal as="section" key={p.title} index={i} className="grid gap-4 border-b border-hairline-strong py-9 md:grid-cols-[120px_280px_1fr] md:items-baseline">
              <span className="numeral text-[40px]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[30px]">{p.title}</h3>
              <p className="body-copy">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {team.length > 0 && (
        <Section tone="ivory-2" labelledBy="team">
          <SectionIntro eyebrow="Our Team" lead="The People" accent="Behind the Work." id="team" />
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

      {articles.length > 0 && (
        <Section labelledBy="knowledge">
          <SectionIntro eyebrow="Knowledge Hub" lead="Latest" accent="Perspectives." id="knowledge" />
          <div className="ruled-grid mt-14 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} index={i}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand lead="Let's Build Progress" accent="Together." />
    </>
  );
}
