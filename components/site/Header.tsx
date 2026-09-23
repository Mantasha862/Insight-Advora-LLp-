"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-ivory/92 backdrop-blur-[10px] transition-all duration-300",
        scrolled ? "border-gold/30 shadow-[var(--shadow-header)]" : "border-hairline",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <div className={cn("container-hero flex items-center justify-between gap-6 transition-all duration-300", scrolled ? "h-[68px]" : "h-[92px]")}>
        <Link href="/" aria-label="Insight Advora LLP — home" className="flex-none">
          <Image
            src="/assets/logo-h.png"
            alt="Insight Advora LLP — Partnering for Smarter Decisions"
            width={1275}
            height={220}
            priority
            className={cn("hidden w-auto transition-all duration-300 min-[1080px]:block", scrolled ? "h-10" : "h-[50px]")}
          />
          <Image
            src="/assets/monogram-alpha.png"
            alt="Insight Advora LLP"
            width={582}
            height={471}
            priority
            className={cn("w-auto transition-all duration-300 min-[1080px]:hidden", scrolled ? "h-10" : "h-[50px]")}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-[clamp(18px,1.8vw,32px)] min-[1080px]:flex">
          <ul className="flex items-center gap-[clamp(16px,1.6vw,28px)]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "border-b py-1 text-[13.5px] font-medium uppercase tracking-[0.06em] text-forest transition-colors hover:text-gold-ink",
                    isActive(item.href) ? "border-gold" : "border-transparent",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border border-forest bg-forest px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-forest"
          >
            Let&apos;s Talk
            <span aria-hidden className="h-px w-4 bg-current transition-transform group-hover:translate-x-1.5" />
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] border border-hairline-strong min-[1080px]:hidden"
        >
          <span className={cn("h-px w-5 bg-forest transition-transform", open && "translate-y-[6px] rotate-45")} />
          <span className={cn("h-px w-5 bg-forest transition-opacity", open && "opacity-0")} />
          <span className={cn("h-px w-5 bg-gold transition-transform", open && "-translate-y-[6px] -rotate-45")} />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-hairline bg-ivory shadow-[var(--shadow-header)] min-[1080px]:hidden"
      >
        <nav aria-label="Mobile" className="container-hero py-6">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-hairline">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("block py-4 font-serif text-[24px]", isActive(item.href) ? "text-gold-ink" : "text-forest")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-6 flex w-full items-center justify-center gap-3 bg-forest py-[18px] text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory"
          >
            Let&apos;s Talk <span aria-hidden className="h-px w-4 bg-current" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
