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
import { getTeam, getTeamMember } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { isPlaceholder } from "@/lib/utils";

export const revalidate = 300;

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
  const firstName = isPlaceholder(member.name) ? member.name : member.name.split(" ")[0];
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
                  <Image src={member.photo} alt={member.name} fill priority sizes="420px" className="object-cover" />
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

      <Section tone="ivory-2" labelledBy="about-member">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 id="about-member" className="h-section">About {firstName}</h2>
            <p className="body-copy mt-6 whitespace-pre-line">{member.bio}</p>
          </Reveal>
          <Reveal index={1} className="space-y-10">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Areas of Expertise</h3>
              <Chips items={member.expertise} className="mt-4" />
            </div>
            {member.focus.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Professional Focus</h3>
                <ul className="mt-4 space-y-3">
                  {member.focus.map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-[15px] text-body">
                      <span aria-hidden className="h-px w-5 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
        <Link href="/team" className="group mt-14 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:text-gold-ink">
          <span aria-hidden className="h-px w-[18px] bg-current transition-transform group-hover:-translate-x-2" /> Back to Our Team
        </Link>
      </Section>

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
