import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { Reveal } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

export function Breadcrumb({ items, dark = false }: { items: { href?: string; label: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.14em]", dark ? "text-on-dark" : "text-body-2")}>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className={cn("h-px w-3", dark ? "bg-gold-light" : "bg-gold")} />}
            {it.href ? (
              <Link href={it.href} className={cn("transition-colors", dark ? "hover:text-gold-pale" : "hover:text-gold-ink")}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-gold-pale" : "text-forest"}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard inner-page hero with breadcrumb, subtle network and IA watermark. */
export function PageHero({
  eyebrow,
  lead,
  accent,
  intro,
  crumbs,
  dark = false,
  network = true,
  children,
  aside,
}: {
  eyebrow: string;
  lead: string;
  accent?: string;
  intro?: ReactNode;
  crumbs: { href?: string; label: string }[];
  dark?: boolean;
  network?: boolean;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-forest text-ivory" : "bg-ivory")}>
      {network && !aside && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-70 md:w-[62%]">
          <NetworkCanvas variant="drift" tone={dark ? "dark" : "light"} weightRight interactive={false} />
        </div>
      )}
      <Image
        src="/assets/monogram-alpha.png"
        alt=""
        aria-hidden
        width={582}
        height={471}
        className="pointer-events-none absolute -right-10 top-10 hidden w-[440px] select-none opacity-[0.055] md:block"
        priority={false}
      />
      <div className="container-site relative pb-[clamp(56px,7vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <Breadcrumb items={crumbs} dark={dark} />
        <div className={cn("mt-[clamp(40px,6vw,88px)]", aside ? "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]" : "")}>
          <Reveal className="max-w-[860px]">
            <p className={cn("eyebrow", dark && "eyebrow-dark")}>{eyebrow}</p>
            <h1 className={cn("h-page mt-6", dark && "text-ivory")}>
              {lead}
              {accent && (
                <>
                  {" "}
                  <em className={cn("font-normal italic", dark ? "text-gold-pale" : "text-charcoal")}>{accent}</em>
                </>
              )}
            </h1>
            {intro && <div className={cn("body-copy mt-8 max-w-[640px]", dark && "text-on-dark")}>{intro}</div>}
            {children}
          </Reveal>
          {aside}
        </div>
      </div>
    </section>
  );
}

/** Forest CTA band with a slowly drifting gold diagonal lattice. */
export function CtaBand({
  lead = "Ready to Turn Insight",
  accent = "Into Action?",
  text = "Tell us about the decisions in front of you. We will listen first, then explore how we can help.",
  primary = { href: "/contact", label: "Start a Conversation" },
  secondary,
}: {
  lead?: string;
  accent?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <div aria-hidden className="lattice absolute inset-0" />
      <div className="container-site section-y relative text-center">
        <Reveal>
          <p className="eyebrow eyebrow-dark justify-center">Let&apos;s Talk</p>
          <h2 className="h-section mx-auto mt-6 max-w-[900px] text-ivory">
            {lead} <em className="font-normal italic text-gold-pale">{accent}</em>
          </h2>
          <p className="body-copy mx-auto mt-6 max-w-[620px] text-on-dark">{text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href={primary.href} variant="gold">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="ghost-dark">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Ticker({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={i} className="flex items-center font-serif text-[clamp(20px,2vw,28px)] uppercase tracking-[0.08em] text-forest">
          <span className="px-8">{t}</span>
          <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-gold" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-hairline bg-ivory-2 py-6">
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-hairline-strong">
      {items.map((f, i) => (
        <details key={i} className="group border-b border-hairline-strong">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-[22px] text-forest [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="relative h-4 w-4 flex-none">
              <span className="absolute left-0 top-1/2 h-px w-4 bg-gold" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-gold transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="card-copy max-w-[760px] pb-7 text-[15px]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
