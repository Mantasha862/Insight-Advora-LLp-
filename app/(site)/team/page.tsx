import { TeamGrid } from "@/components/site/TeamGrid";
import { CtaBand, PageHero } from "@/components/ui/Blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Ecosystem } from "@/components/ui/Ecosystem";
import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Section, SectionIntro } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { getSettings, getTeam, getTeamCategories } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/team",
    title: "Meet Our Team | Insight Advora LLP",
    description: "Meet the multidisciplinary team at Insight Advora LLP — expertise with perspective.",
  });
}

const expertiseMap = [
  "Strategy", "Operations", "Growth", "Transactions", "EHS", "ESG", "Finance", "Technology", "People",
].map((k) => ({ key: k.toLowerCase(), label: k, title: k, description: `Expertise in ${k.toLowerCase()} contributes to an integrated view of each engagement.` }));

const network = [
  "Sector Specialists", "Technical Experts", "Research Partners", "Implementation Specialists",
  "Sustainability Practitioners", "Safety Professionals", "Academic Advisers",
];

export default async function TeamPage() {
  const [members, categories, settings] = await Promise.all([getTeam(), getTeamCategories(), getSettings()]);

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Our Team" }]}
        eyebrow="Our Team"
        lead="Expertise With"
        accent="Perspective."
        intro="A multidisciplinary team bringing complementary experience to every engagement."
      />

      <Section tone="ivory-2" labelledBy="perspective">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Expertise With Perspective</p>
            <h2 id="perspective" className="h-section mt-5">
              Diverse Backgrounds, <em className="font-normal italic text-charcoal">Shared Purpose.</em>
            </h2>
            <GoldRule className="mt-7" />
          </Reveal>
          <Reveal index={1}>
            <blockquote className="statement border-l border-gold pl-6 text-forest">
              The best answers emerge when different perspectives are brought to the same problem.
            </blockquote>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="people">
        <h2 id="people" className="sr-only">Team members</h2>
        <TeamGrid members={members} categories={categories} />
      </Section>

      <Section tone="forest" labelledBy="collective">
        <SectionIntro eyebrow="Collective Expertise" lead="Nine Perspectives," accent="One Team." dark id="collective" />
        <div className="mt-16">
          <Ecosystem nodes={expertiseMap} />
        </div>
      </Section>

      <Section labelledBy="together">
        <SectionIntro eyebrow="Expertise That Works Together" lead="How Our Team" accent="Collaborates." id="together" />
        <div className="mt-16">
          <Timeline
            steps={[
              { title: "Frame", text: "Clarify the question with you." },
              { title: "Assemble", text: "Bring together the right expertise." },
              { title: "Analyse", text: "Build a shared fact base." },
              { title: "Shape", text: "Develop practical options." },
              { title: "Deliver", text: "Support action and follow-through." },
            ]}
          />
        </div>
      </Section>

      <Section tone="ivory-2" labelledBy="philosophy">
        <SectionIntro eyebrow="Our Shared Philosophy" lead="People | Process |" accent="Planet | Progress." id="philosophy">
          Whatever their discipline, our people share a commitment to clarity, practicality and responsible progress.
        </SectionIntro>
      </Section>

      <Section labelledBy="network">
        <SectionIntro eyebrow="Extended Advisory Network" lead="Specialist Support" accent="When Needed." id="network">
          Where an engagement requires it, we can draw on an extended network of specialist practitioners across the following
          areas.
        </SectionIntro>
        <ul className="ruled-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {network.map((n, i) => (
            <Reveal as="li" key={n} index={i} className="flex items-center gap-4 p-7">
              <span className="numeral text-[26px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-[21px] text-forest">{n}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {settings.careersActive && (
        <Section tone="ivory-2" labelledBy="careers">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <SectionIntro eyebrow="Careers" lead="Build the Future" accent="With Us." id="careers" />
            <Reveal index={1}>
              <p className="body-copy">We are always interested in hearing from thoughtful, practical professionals who share our values.</p>
              <div className="mt-8">
                <ButtonLink href="/contact?area=Other">Get in Touch</ButtonLink>
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
