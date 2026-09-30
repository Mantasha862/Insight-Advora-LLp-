import Image from "next/image";
import Link from "next/link";
import { AdvisoryMedia } from "@/components/site/AdvisoryMedia";
import { HomeHero } from "@/components/site/HomeHero";
import { PhilosophyPanels } from "@/components/site/PhilosophyPanels";
import { JsonLd, Ticker } from "@/components/ui/Blocks";
import { PhotoPlaceholder } from "@/components/ui/Cards";
import { Emblem } from "@/components/ui/Emblem";
import { LinkedInIcon } from "@/components/ui/Icons";
import { DrawLine, Reveal } from "@/components/ui/Motion";
import { Timeline } from "@/components/ui/Timeline";
import { approach, SITE_URL } from "@/content/site";
import { getArticles, getFeaturedTeam, getHome, getServices, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { formatDate, isPlaceholder } from "@/lib/utils";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/",
    title: "Insight Advora LLP | Strategy, Operational Excellence, EHS & ESG Advisory",
    description:
      "Insight Advora LLP provides strategic advisory, operational excellence, EHS, ESG, sustainability and business consulting solutions for organizations seeking smarter decisions and sustainable growth.",
  });
}

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.22em]";
const h2 = "text-[clamp(32px,3.7vw,54px)] leading-[1.1]";
const sectionLink =
  "group inline-flex items-center gap-3 border-b border-gold/50 pb-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:text-gold-ink";
const lineArrow = <span aria-hidden className="h-px w-5 bg-current transition-transform duration-300 group-hover:translate-x-1.5" />;
const cardLine = (
  <span
    aria-hidden
    className="absolute inset-x-0 top-0 z-10 block h-[2px] origin-left scale-x-0 bg-gradient-to-r from-forest to-gold transition-transform duration-[520ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100"
  />
);

export default async function HomePage() {
  const [services, team, articles, settings, home] = await Promise.all([
    getServices(),
    getFeaturedTeam(3),
    getArticles(),
    getSettings(),
    getHome(),
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
      <HomeHero phrase={home.heroPhrase} watermark={home.watermark} />

      {/* 02 About */}
      <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden bg-ivory">
        <Emblem variant="light" className="-z-10" style={{ left: "-9%", bottom: "-10%", width: "min(40%, 520px)" }} />
        <div className="container-site pb-[clamp(64px,8vw,112px)] pt-[clamp(72px,9vw,128px)]">
          <div className="grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-2">
            <Reveal className="min-w-0">
              <p className="eyebrow">About Insight Advora</p>
              <h2 id="about-title" className="mt-6 text-[clamp(38px,4.8vw,70px)] leading-[1.04]">
                Where Insight <em className="font-normal italic text-charcoal">Meets Action.</em>
              </h2>
              <span aria-hidden className="mt-8 block h-px w-[72px] bg-gold" />
              {home.about.paragraphs.map((p) => (
                <p key={p} className="mt-6 max-w-[56ch] text-[clamp(15.5px,1.15vw,17.5px)] font-light leading-[1.86] text-body">
                  {p}
                </p>
              ))}
              <Link
                href="/about"
                className="group mt-[clamp(34px,3.6vw,46px)] inline-flex items-center gap-3 border border-forest bg-forest px-[30px] py-[18px] text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-forest-deep"
              >
                Explore About Us {lineArrow}
              </Link>
            </Reveal>
            <Reveal index={1} className="relative min-w-0 pb-[clamp(26px,3vw,40px)] pr-[clamp(0px,2vw,26px)]">
              <span aria-hidden className="absolute bottom-0 left-[clamp(18px,2.4vw,32px)] right-0 top-[clamp(18px,2.4vw,32px)] border border-gold/55" />
              <div className="group relative h-[clamp(360px,40vw,540px)] w-full overflow-hidden bg-forest">
                <Image
                  src="/assets/about-advisory.jpg"
                  alt="Consultant presenting a strategy review to a leadership team"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[42%_40%] transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </div>
              <div className="absolute bottom-0 right-0 max-w-[300px] bg-forest-deep px-[26px] py-6 shadow-[0_26px_50px_-30px_rgba(14,41,33,0.7)]">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-sage">Partnering for Smarter Decisions</p>
                <p className="mt-2.5 font-serif text-[22px] italic leading-[1.3] text-ivory">
                  Responsible Growth. <span className="text-gold-pale">Sustainable Progress.</span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative mt-[clamp(56px,7vw,96px)] overflow-hidden bg-forest text-ivory">
            <DrawLine className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sage to-gold-light" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-[30px] gap-y-3 px-[clamp(24px,3.4vw,50px)] pt-[clamp(30px,3.4vw,46px)]">
              <span className={`${eyebrow} text-gold-pale`}>Our Integrated Philosophy</span>
              <span className="whitespace-nowrap font-serif text-[clamp(14px,1.7vw,23px)] uppercase tracking-[clamp(0.06em,0.9vw,0.16em)] text-ivory/80">
                People <span className="text-gold-light">|</span> Process <span className="text-gold-light">|</span> Planet{" "}
                <span className="text-gold-light">|</span> Progress
              </span>
            </div>
            <ul className="grid gap-x-[clamp(18px,2vw,30px)] px-[clamp(24px,3.4vw,50px)] pb-[clamp(34px,3.8vw,52px)] pt-[clamp(22px,2.6vw,34px)] sm:grid-cols-2 lg:grid-cols-4">
              {home.about.pillars.map((p, i) => (
                <li key={p.title} className="min-w-0 border-t border-ivory/14 pb-1.5 pr-[clamp(14px,1.8vw,26px)] pt-[22px]">
                  <span className="font-serif text-[30px] leading-none text-gold-light">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3.5 text-[clamp(26px,2.3vw,32px)] uppercase tracking-[0.08em] text-ivory">{p.title}</h3>
                  <p className="mt-2.5 max-w-[30ch] text-[14px] font-light leading-[1.72] text-ivory/76">{p.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 03 Advisory in session */}
      <section id="advisory" aria-labelledby="adv-title" className="overflow-hidden bg-forest-deep text-ivory">
        {/* Mobile: heading, text, video, button. Desktop: text + button left, video right. */}
        <div className="container-hero section-y grid items-center gap-x-[clamp(36px,5vw,80px)] gap-y-9 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
          <Reveal className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="eyebrow eyebrow-dark">Advisory in Session</p>
            <h2 id="adv-title" className="mt-[22px] text-[clamp(34px,4vw,58px)] leading-[1.08] text-ivory">
              Where Insight <em className="font-normal italic text-gold-pale">Meets Action.</em>
            </h2>
            <DrawLine className="mt-[30px] h-px w-[72px] bg-gold-light" duration={0.9} />
            <p className="mt-7 max-w-[46ch] text-[clamp(15.5px,1.15vw,17px)] font-light leading-[1.86] text-ivory/80">
              Better decisions are shaped through collaboration, informed perspectives and a clear understanding of the challenge.
            </p>
          </Reveal>
          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <AdvisoryMedia media={home.meetingVideo} />
          </div>
          <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-gold-light bg-gold-light px-[30px] py-[17px] text-[12.5px] font-bold uppercase tracking-[0.1em] text-forest-deep transition-colors duration-300 hover:bg-transparent hover:text-gold-pale"
            >
              Start a Conversation {lineArrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 04 Services */}
      <section id="expertise" aria-labelledby="exp-title" className="border-t border-forest/8 bg-ivory-2">
        <div className="container-site section-y">
          <Reveal className="mb-[clamp(38px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${eyebrow} text-gold-ink`}>Our Expertise</p>
              <h2 id="exp-title" className={`mt-5 ${h2}`}>
                Our Areas of Expertise
              </h2>
            </div>
            <Link href="/services" className={sectionLink}>
              All Services {lineArrow}
            </Link>
          </Reveal>
          <div className="grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} index={i} className="bg-ivory">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full min-h-[280px] flex-col overflow-hidden bg-ivory p-[clamp(28px,3vw,44px)] transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_26px_50px_-30px_rgba(14,41,33,0.5)]"
                >
                  {cardLine}
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-[36px] leading-none text-gold">{s.number}</span>
                    <span aria-hidden className="block h-[9px] w-[9px] rounded-full border border-sage" />
                  </div>
                  <h3 className="mt-7 text-[27px] leading-[1.2]">{s.title}</h3>
                  <p className="mb-[26px] mt-3.5 text-[14.5px] font-light leading-[1.75] text-body">{s.short || s.headline}</p>
                  <span className="mt-auto inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-forest">
                    Explore
                    <span aria-hidden className="block h-px w-4 bg-gold transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Philosophy */}
      <section id="philosophy" aria-labelledby="ppp-title" className="relative isolate overflow-hidden bg-forest-deep text-ivory">
        <Emblem variant="dark" className="-z-10" style={{ right: "-5%", bottom: "-12%", width: "min(46%, 540px)" }} />
        <div className="container-site section-y relative">
          <Reveal className="mb-[clamp(44px,5vw,70px)] grid items-end gap-[clamp(24px,5vw,80px)] md:grid-cols-2">
            <div className="min-w-0">
              <p className={`${eyebrow} text-gold-light`}>Our Philosophy</p>
              <h2 id="ppp-title" className="mt-5 text-[clamp(34px,4.2vw,62px)] leading-[1.06] tracking-[0.02em] text-ivory">
                People. Process.
                <br />
                <em className="font-normal italic text-gold-pale">Planet. Progress.</em>
              </h2>
            </div>
            <p className="max-w-[50ch] text-[clamp(15px,1.1vw,16.5px)] font-light leading-[1.85] text-ivory/76">
              Four connected forces behind every engagement. Strong organizations are built by capable people, run on clear
              processes, respect the planet they operate in — and turn all three into lasting progress.
            </p>
          </Reveal>
          <PhilosophyPanels />
        </div>
      </section>

      {/* 06 Approach */}
      <section id="approach" aria-labelledby="approach-title" className="bg-ivory">
        <div className="container-site section-y">
          <Reveal className="mb-[clamp(40px,5vw,68px)] grid items-end gap-[clamp(24px,5vw,80px)] md:grid-cols-2">
            <div>
              <p className={`${eyebrow} text-gold-ink`}>Methodology</p>
              <h2 id="approach-title" className={`mt-5 ${h2}`}>
                Our Approach
              </h2>
            </div>
            <p className="max-w-[50ch] text-[clamp(15px,1.1vw,16.5px)] font-light leading-[1.85] text-body">
              From understanding the challenge to creating sustainable progress — structured analysis paired with practical execution.
            </p>
          </Reveal>
          <Timeline steps={approach} />
        </div>
      </section>

      {/* 07 Team */}
      {team.length > 0 && (
        <section id="team" aria-labelledby="team-title" className="bg-ivory">
          <div className="container-site section-y pt-0">
            <Reveal className="mb-[clamp(38px,5vw,60px)] flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={`${eyebrow} text-gold-ink`}>Our Team</p>
                <h2 id="team-title" className={`mt-5 ${h2}`}>
                  People Behind the Insight
                </h2>
              </div>
              <Link href="/team" className={sectionLink}>
                Meet Our Team {lineArrow}
              </Link>
            </Reveal>
            <div className="grid gap-[clamp(20px,2.4vw,32px)] md:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <Reveal as="article" key={m.slug} index={i} className="group relative flex flex-col overflow-hidden border border-forest/13 bg-white transition-all duration-300 hover:-translate-y-[5px] hover:border-gold hover:shadow-[0_24px_46px_-30px_rgba(14,41,33,0.45)]">
                  {cardLine}
                  <PhotoPlaceholder className="h-[300px]" />
                  <div className="flex flex-1 flex-col px-[clamp(18px,2vw,26px)] pb-[26px] pt-6">
                    <h3 className="text-[25px] leading-[1.2]">{m.name}</h3>
                    <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-ink">{m.designation}</p>
                    <p className="mb-5 mt-3.5 text-[13.5px] font-light leading-[1.7] text-body-2">{m.expertise.join(" · ")}</p>
                    <div className="mt-auto flex items-center justify-between gap-3.5 border-t border-forest/10 pt-4">
                      <Link href={`/team/${m.slug}`} className="inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-forest hover:text-gold-ink">
                        View Profile <span aria-hidden className="h-px w-4 bg-gold" />
                      </Link>
                      {m.linkedin && !isPlaceholder(m.linkedin) && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="flex h-[34px] w-[34px] items-center justify-center border border-forest/18 text-forest transition-colors hover:bg-forest hover:text-gold-pale"
                        >
                          <LinkedInIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 08 Knowledge hub */}
      <section id="knowledge" aria-labelledby="kn-title" className="border-t border-forest/8 bg-ivory-2">
        <div className="container-site section-y">
          <Reveal className="mb-[clamp(38px,5vw,62px)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${eyebrow} text-gold-ink`}>Knowledge Hub</p>
              <h2 id="kn-title" className={`mt-5 max-w-[30ch] ${h2}`}>
                Knowledge That Enables Better Decisions.
              </h2>
            </div>
            <Link href="/knowledge-hub" className={sectionLink}>
              Explore Knowledge Hub {lineArrow}
            </Link>
          </Reveal>
          {latest.length ? (
            <div className="grid gap-[clamp(20px,2.4vw,32px)] md:grid-cols-2 lg:grid-cols-3">
              {latest.map((a, i) => (
                <Reveal key={a.slug} index={i}>
                  <Link
                    href={`/knowledge-hub/${a.slug}`}
                    className="group relative flex h-full min-h-[300px] flex-col overflow-hidden border border-forest/10 bg-ivory p-[clamp(26px,2.6vw,38px)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/55 hover:shadow-[0_26px_50px_-30px_rgba(14,41,33,0.42)]"
                  >
                    {cardLine}
                    <p className="flex flex-wrap items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.18em]">
                      <span className="text-gold-ink">{a.categoryName}</span>
                      <span aria-hidden className="block h-1 w-1 rounded-full bg-sage" />
                      <span className="text-body-2">{a.contentTypeName}</span>
                    </p>
                    <h3 className="mt-5 text-[26px] leading-[1.24]">{a.title}</h3>
                    <p className="mb-[26px] mt-3.5 text-[14.5px] font-light leading-[1.75] text-body">{a.excerpt}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-4">
                      <span className="text-[12px] text-body-2">
                        {formatDate(a.publishedAt)} · {a.readingTime} min read
                      </span>
                      <span className="inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-forest">
                        Read More
                        <span aria-hidden className="block h-px w-4 bg-gold transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="py-10 font-serif text-[22px] italic text-body-2">No insights have been published yet.</p>
          )}
        </div>
      </section>

      <Ticker tone="dark" items={["Smart Business", "Responsible Growth", "Sustainable Progress", "People", "Process", "Planet", "Progress"]} />

      {/* 09 CTA */}
      <section id="cta" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-forest text-ivory">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-40 animate-[cta-drift_26s_linear_infinite_alternate] opacity-[0.14] motion-reduce:animate-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(181,138,58,0.9) 0 1px, transparent 1px 72px), repeating-linear-gradient(-45deg, rgba(135,155,135,0.8) 0 1px, transparent 1px 112px)",
          }}
        />
        <Emblem variant="dark" className="-z-10" style={{ left: "-4%", top: "50%", transform: "translateY(-50%)", width: "min(40%, 470px)" }} />
        <Reveal className="container-site relative grid items-center gap-[clamp(30px,5vw,80px)] py-[clamp(68px,8vw,124px)] md:grid-cols-2">
          <div className="min-w-0">
            <p className={`${eyebrow} text-gold-pale`}>Smart Business · Responsible Growth · Sustainable Progress</p>
            <h2 id="cta-title" className="mt-[22px] max-w-[24ch] text-[clamp(34px,4.2vw,60px)] leading-[1.07] text-ivory">
              {home.cta.heading}
            </h2>
            <span aria-hidden className="my-[30px] block h-px w-[62px] bg-gold-light" />
            <p className="max-w-[52ch] text-[clamp(15.5px,1.15vw,17px)] font-light leading-[1.8] text-ivory/80">{home.cta.body}</p>
          </div>
          <div className="flex min-w-0 flex-wrap gap-3.5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3.5 border border-gold-light bg-gold-light px-9 py-[21px] text-[12.5px] font-bold uppercase tracking-[0.11em] text-forest-deep transition-all duration-300 hover:bg-transparent hover:tracking-[0.16em] hover:text-gold-pale"
            >
              {home.cta.button} {lineArrow}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
