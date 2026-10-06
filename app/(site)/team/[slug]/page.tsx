import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TeamCard } from "@/components/site/Cards";
import { Breadcrumb, CtaBand, JsonLd } from "@/components/ui/Blocks";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/Cards";
import { LinkedInIcon } from "@/components/ui/Icons";
import { GoldRule, Reveal } from "@/components/ui/Motion";
import { Chips, Section } from "@/components/ui/Section";
import { SITE_URL } from "@/content/site";
import { getServices, getTeam, getTeamMember } from "@/lib/data";
import { parseBio } from "@/lib/team-bio";
import { pageMetadata } from "@/lib/seo";
import { isPlaceholder } from "@/lib/utils";

export const revalidate = 300;

/** Practices each person is stated to work in, per the firm profile. */
const PRACTICES: Record<string, string[]> = {
  "vinod-hans": ["strategy-corporate-advisory", "business-growth-transformation", "operational-excellence", "ma-corporate-transactions"],
  "khalid-iqbal-khan": ["ma-corporate-transactions", "esg-sustainability"],
  "prasanna-kumar-dh": ["ehs-advisory", "esg-sustainability"],
  "mohammad-sazid": ["esg-sustainability", "ma-corporate-transactions"],
  "syed-mantasha-abid": ["esg-sustainability"],
  "mansi-yadav": ["esg-sustainability"],
};

export async function generateStaticParams() {
  return (await getTeam()).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const m = await getTeamMember(slug);
  if (!m) return {};
  return pageMetadata({
    path: `/team/${slug}`,
    title: `${m.name} | Insight Advora LLP`,
    description: `${m.name}, ${m.designation} at Insight Advora LLP.`,
    type: "profile",
  });
}

export default async function TeamProfilePage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) notFound();
  const others = (await getTeam()).filter((m) => m.slug !== slug).slice(0, 3);
  const firstName = isPlaceholder(member.name) ? member.name : member.name.replace(/^(Dr\.|FCS|CS|Adv\.)\s+/i, "").split(" ")[0];
  const allServices = await getServices();
  const practices = (PRACTICES[member.slug] ?? [])
    .map((sl) => allServices.find((x) => x.slug === sl))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const highlights = member.focus.length > 1;
  const bio = parseBio(member.bio);
  const hasLinkedIn = member.linkedin && !isPlaceholder(member.linkedin);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.designation,
    url: `${SITE_URL}/team/${member.slug}`,
    worksFor: { "@type": "Organization", name: "Insight Advora LLP", url: SITE_URL },
    ...(member.photo ? { image: member.photo } : {}),
    ...(hasLinkedIn ? { sameAs: [member.linkedin] } : {}),
    ...(member.expertise.length ? { knowsAbout: member.expertise } : {}),
  };

  return (
    <>
      <JsonLd data={person} />
      <section className="bg-ivory">
        <div className="container-site pb-[clamp(56px,7vw,104px)] pt-[clamp(40px,5vw,72px)]">
          <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/team", label: "Our Team" }, { label: member.name }]} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[420px_1fr]">
            <Reveal>
              {member.photo ? (
                <div className="relative aspect-[4/5] overflow-hidden bg-card-alt">
                  <Image src={member.photo} alt={member.name} fill priority sizes="420px" className="object-cover object-top" />
                </div>
              ) : (
                <PhotoPlaceholder className="aspect-[4/5]" />
              )}
            </Reveal>
            <Reveal index={1}>
              {member.categoryName && <p className="eyebrow">{member.categoryName}</p>}
              <h1 className="h-page mt-6">{member.name}</h1>
              <p className="mt-4 text-[18px] font-medium text-body">{member.designation}</p>
              {member.qualification && <p className="mt-1 text-[15px] text-body-2">{member.qualification}</p>}
              <GoldRule className="mt-8" />
              {bio.lead && <p className="body-copy mt-8 max-w-[62ch]">{bio.lead}</p>}
              {member.expertise.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Areas of Expertise</h2>
                  <Chips items={member.expertise} className="mt-4" />
                </div>
              )}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {hasLinkedIn && (
                  <a
                    href={member.linkedin!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-gold/65 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-forest hover:bg-gold/12 hover:text-gold-ink"
                  >
                    <LinkedInIcon /> LinkedIn
                  </a>
                )}
                <ButtonLink href="/contact">Enquire</ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {(member.focus.length > 0 || bio.blocks.length > 0 || practices.length > 0) && (
      <Section tone="ivory-2" labelledBy="about-member">
        <h2 id="about-member" className="sr-only">
          More about {firstName}
        </h2>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            {bio.blocks.map((b, i) =>
              b.kind === "heading" ? (
                <h3 key={i} className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink first:mt-0">
                  {b.text}
                </h3>
              ) : b.kind === "list" ? (
                <ul key={i} className="mt-4 space-y-3">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-4 text-[15.5px] leading-[1.7] text-body">
                      <span aria-hidden className="mt-[0.8em] h-px w-5 flex-none bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="body-copy mt-4">
                  {b.text}
                </p>
              ),
            )}
            {member.focus.length > 0 && !highlights && (
              <>
                <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink first:mt-0">At Insight Advora</h3>
                <p className="body-copy mt-4">{member.focus[0]}</p>
              </>
            )}
            {highlights && (
              <>
                <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink first:mt-0">Strategy &amp; Execution Highlights</h3>
                <ul className="mt-5 space-y-4">
                  {member.focus.map((f, i) => (
                    <li key={i} className="flex items-start gap-4 text-[15.5px] leading-[1.7] text-body">
                      <span aria-hidden className="mt-[0.8em] h-px w-5 flex-none bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
          <Reveal index={1}>
            {practices.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Practice Areas</h3>
                <ul className="mt-4 space-y-3">
                  {practices.map((x) => (
                    <li key={x.slug}>
                      <Link href={`/services/${x.slug}`} className="group inline-flex items-center gap-4 text-[15px] text-forest hover:text-gold-ink">
                        <span aria-hidden className="h-px w-5 bg-gold transition-transform group-hover:translate-x-1" />
                        {x.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </Section>
      )}
      <section className="bg-ivory">
        <div className="container-site pt-10">
        <Link href="/team" className="group mt-14 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:text-gold-ink">
          <span aria-hidden className="h-px w-[18px] bg-current transition-transform group-hover:-translate-x-2" /> Back to Our Team
        </Link>
        </div>
      </section>

      {others.length > 0 && (
        <Section labelledBy="others">
          <h2 id="others" className="h-section">
            Other <em className="font-normal italic text-charcoal">Profiles.</em>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((m) => (
              <TeamCard key={m.slug} member={m} compact />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
