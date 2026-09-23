import Link from "next/link";
import { getServices, getSettings } from "@/lib/data";
import { isPlaceholder } from "@/lib/utils";
import { LinkedInIcon } from "@/components/ui/Icons";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/industries", label: "Industries" },
  { href: "/team", label: "Our Team" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/contact", label: "Contact" },
];

const linkCls = "text-[14px] font-light text-ivory/76 transition-colors hover:text-gold-pale";
const headCls = "text-[11.5px] font-semibold uppercase tracking-[0.16em] text-gold-light";

export async function Footer() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <footer className="border-t-2 border-gold bg-forest text-ivory">
      <div className="container-site grid gap-12 py-[clamp(56px,7vw,96px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div>
          <p className="font-serif text-[28px] leading-tight tracking-[0.12em] text-ivory">
            INSIGHT ADVORA
            <span className="block text-[18px] tracking-[0.3em] text-gold-pale">LLP</span>
          </p>
          <span aria-hidden className="mt-6 block h-px w-40 bg-gradient-to-r from-gold-light to-transparent" />
          <p className="mt-6 font-serif text-[20px] italic text-gold-light">{settings.tagline}</p>
          {settings.footerText && <p className="mt-4 text-[14px] font-light leading-relaxed text-ivory/72">{settings.footerText}</p>}
        </div>

        <nav aria-label="Company">
          <h2 className={headCls}>Company</h2>
          <ul className="mt-6 space-y-3">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className={headCls}>Services</h2>
          <ul className="mt-6 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkCls}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headCls}>Contact</h2>
          <ul className="mt-6 space-y-3 text-[14px] font-light text-ivory/76">
            {settings.email && (
              <li>{isPlaceholder(settings.email) ? settings.email : <a className={linkCls} href={`mailto:${settings.email}`}>{settings.email}</a>}</li>
            )}
            {settings.phone && (
              <li>{isPlaceholder(settings.phone) ? settings.phone : <a className={linkCls} href={`tel:${settings.phone.replace(/\s+/g, "")}`}>{settings.phone}</a>}</li>
            )}
            {settings.address && <li className="whitespace-pre-line">{settings.address}</li>}
            {settings.linkedin && !isPlaceholder(settings.linkedin) && (
              <li>
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}>
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
            )}
          </ul>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 border border-gold-light bg-gold-light px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-forest transition-all duration-300 hover:bg-transparent hover:tracking-[0.16em] hover:text-gold-pale"
          >
            Start a Conversation
            <span aria-hidden className="h-px w-4 bg-current" />
          </Link>
        </div>
      </div>
      <div className="border-t border-ivory/12">
        <div className="container-site flex flex-col gap-4 py-6 text-[12.5px] font-light text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>© {settings.copyrightYear} Insight Advora LLP. All Rights Reserved.</p>
          <ul className="flex flex-wrap items-center gap-3">
            <li><Link href="/privacy-policy" className="hover:text-gold-pale">Privacy Policy</Link></li>
            <li aria-hidden>|</li>
            <li><Link href="/terms-of-use" className="hover:text-gold-pale">Terms of Use</Link></li>
            <li aria-hidden>|</li>
            <li><Link href="/disclaimer" className="hover:text-gold-pale">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
