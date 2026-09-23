import Link from "next/link";
import { ContactForm } from "@/components/site/Forms";
import { PageHero } from "@/components/ui/Blocks";
import { LinkedInIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Motion";
import { Section } from "@/components/ui/Section";
import { getServices, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { isPlaceholder } from "@/lib/utils";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/contact",
    title: "Contact | Insight Advora LLP",
    description: "Start a conversation with Insight Advora LLP about the decisions in front of you.",
  });
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-hairline py-6">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">{label}</dt>
      <dd className="mt-2 whitespace-pre-line text-[16px] text-forest">{children}</dd>
    </div>
  );
}

/** Only embed maps from Google. */
function safeMapUrl(url: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && /(^|\.)google\.[a-z.]+$/.test(u.hostname) && u.pathname.startsWith("/maps") ? url : null;
  } catch {
    return null;
  }
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const area = typeof sp.area === "string" ? sp.area : undefined;
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const map = safeMapUrl(settings.mapEmbedUrl);
  const link = (v: string | null, href: string) => (v && !isPlaceholder(v) ? <a href={href} className="hover:text-gold-ink">{v}</a> : v);

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow="Contact"
        lead="Let's Start a"
        accent="Conversation."
        intro="Tell us about the decisions in front of you. We will listen first, then explore how we can help."
      />

      <Section tone="ivory-2" labelledBy="enquiry">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 id="enquiry" className="text-[34px]">
              Send an <em className="font-normal italic text-charcoal">Enquiry</em>
            </h2>
            <div className="mt-10">
              <ContactForm defaultArea={area} fallbackEmail={settings.email} />
            </div>
          </Reveal>
          <Reveal index={1}>
            <h2 className="text-[34px]">
              Firm <em className="font-normal italic text-charcoal">Details</em>
            </h2>
            <dl className="mt-6 border-t border-hairline">
              {settings.email && <Detail label="Email">{link(settings.email, `mailto:${settings.email}`)}</Detail>}
              {settings.phone && <Detail label="Phone">{link(settings.phone, `tel:${settings.phone.replace(/\s+/g, "")}`)}</Detail>}
              {settings.address && <Detail label="Office">{settings.address}</Detail>}
              {settings.officeHours && <Detail label="Hours">{settings.officeHours}</Detail>}
              {settings.linkedin && !isPlaceholder(settings.linkedin) && (
                <Detail label="LinkedIn">
                  <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold-ink">
                    <LinkedInIcon /> Insight Advora LLP
                  </a>
                </Detail>
              )}
            </dl>
            <div className="mt-8 aspect-[4/3] w-full bg-card-alt">
              {map ? (
                <iframe title="Office location map" src={map} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="flex h-full items-center justify-center text-[11px] font-semibold uppercase tracking-[0.14em] text-body-2/70">
                  [ Map embed — add in Website Settings ]
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="border-t border-hairline bg-ivory py-10" aria-label="Practice areas">
        <ul className="container-site flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {services.map((s, i) => (
            <li key={s.slug} className="flex items-center gap-8">
              <Link href={`/services/${s.slug}`} className="font-serif text-[20px] text-forest hover:text-gold-ink">
                {s.title}
              </Link>
              {i < services.length - 1 && <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-gold" />}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
