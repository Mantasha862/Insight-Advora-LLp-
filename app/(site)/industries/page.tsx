import Link from "next/link";
import { Breadcrumb, CtaBand } from "@/components/ui/Blocks";
import { Ecosystem } from "@/components/ui/Ecosystem";
import { Reveal } from "@/components/ui/Motion";
import { Section, SectionIntro } from "@/components/ui/Section";
import { getIndustries, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/industries",
    title: "Industries | Insight Advora LLP",
    description: "Sector understanding with a cross-sector perspective — the industries Insight Advora LLP serves.",
  });
}

export default async function IndustriesPage() {
  const [industries, services] = await Promise.all([getIndustries(), getServices()]);
  const svcName = (slug: string) => services.find((s) => s.slug === slug)?.shortTitle ?? slug;

  return (
    <>
      <section className="relative overflow-hidden bg-forest text-ivory">
        <div className="container-site relative pb-[clamp(56px,7vw,104px)] pt-[clamp(40px,5vw,72px)]">
          <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Industries" }]} dark />
          <Reveal className="mt-[clamp(40px,6vw,80px)] max-w-[860px]">
            <p className="eyebrow eyebrow-dark">Industries</p>
            <h1 className="h-page mt-6 text-ivory">
              Sector Understanding, <em className="font-normal italic text-gold-pale">Integrated Perspective.</em>
            </h1>
          </Reveal>
          <div className="mt-16">
            <Ecosystem
              nodes={industries.map((i) => ({
                key: i.slug,
                label: i.name.split(" & ")[0],
                title: i.name,
                description: i.summary,
                chips: i.services.slice(0, 4).map(svcName),
                href: `/industries/${i.slug}`,
                linkLabel: "Explore Industry",
              }))}
            />
          </div>
        </div>
      </section>

      <Section labelledBy="intro">
        <SectionIntro eyebrow="Our Sector Focus" lead="Practical Understanding" accent="of Operating Realities." id="intro">
          Each sector has its own pressures, regulations and ways of working. We combine that context with a cross-sector
          perspective — bringing ideas that have worked elsewhere, adapted to your environment.
        </SectionIntro>
        <div className="ruled-grid mt-14 md:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} index={i}>
              <Link href={`/industries/${ind.slug}`} className="group relative flex h-full flex-col bg-ivory p-9 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[var(--shadow-hover)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] w-0 bg-gold transition-[width] duration-[520ms] group-hover:w-full" />
                <span className="numeral text-[46px]">{ind.number}</span>
                <h2 className="h-card mt-6">{ind.name}</h2>
                <p className="statement mt-3 !text-[20px] text-charcoal">{ind.headline}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ind.services.map((s) => (
                    <li key={s} className="chip">
                      {svcName(s)}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-3 pt-8 text-[12px] font-semibold uppercase tracking-[0.1em] text-gold-ink">
                  Explore <span aria-hidden className="h-px w-[18px] bg-current transition-transform group-hover:translate-x-2" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-[860px] text-[13px] leading-relaxed text-body-2">
          Our support is advisory in nature. We do not provide clinical, medical or regulatory approval services, or regulated
          investment, securities or banking advice. Certification and assurance are carried out by accredited and independent
          providers respectively.
        </p>
      </Section>

      <CtaBand lead="Facing a Sector-Specific" accent="Challenge?" />
    </>
  );
}
