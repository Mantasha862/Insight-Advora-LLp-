import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Section, SectionIntro } from "@/components/ui/Section";

const blocks = [
  { t: "People", d: "Capability, ownership and wellbeing are the foundation of every lasting change." },
  { t: "Process", d: "Well-designed processes make good performance repeatable and safe." },
  { t: "Planet", d: "Responsible decisions consider environmental and social impact alongside commercial return." },
  { t: "Progress", d: "Measurable, sustained improvement is the outcome we work towards." },
];

export function AboutPhilosophy() {
  return (
    <Section tone="ivory-2" labelledBy="philosophy">
      <SectionIntro eyebrow="Our Philosophy" lead="People | Process |" accent="Planet | Progress." id="philosophy">
        Four connected principles guide how we think and how we work.
      </SectionIntro>
      <GoldRule width={9999} className="mt-14 !w-full" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {blocks.map((b, i) => (
          <Reveal key={b.t} index={i}>
            <div className="h-full border border-hairline bg-ivory p-8 outline outline-1 outline-transparent transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[var(--shadow-hover)] hover:outline-gold">
              <span className="numeral text-[36px]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-card mt-6">{b.t}</h3>
              <p className="card-copy mt-3">{b.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
