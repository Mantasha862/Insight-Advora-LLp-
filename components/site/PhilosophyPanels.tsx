"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  People: (
    <>
      <circle cx="17" cy="17" r="6" />
      <circle cx="32" cy="19" r="5" />
      <path d="M6 40c1.5-7 6-11 11-11s9.5 4 11 11" />
      <path d="M27 29.5c1.6-1 3.3-1.5 5-1.5 4.4 0 8 3.4 9.3 10" />
    </>
  ),
  Process: (
    <>
      <rect x="5" y="18" width="10" height="10" />
      <rect x="19" y="8" width="10" height="10" />
      <rect x="33" y="28" width="10" height="10" />
      <path d="M15 23h4v-5M29 13h4v15" />
    </>
  ),
  Planet: (
    <>
      <circle cx="24" cy="24" r="18" />
      <path d="M24 36c-7-3.5-9-10-6-17 6 1 9.5 5 9 11" />
      <path d="M24 36c1-6 4.5-10 11-11-0.5 6-4.5 10-11 11z" />
      <path d="M24 36V22" />
    </>
  ),
  Progress: (
    <>
      <path d="M5 40h38" />
      <path d="M8 34l10-9 7 5 15-16" />
      <path d="M32 14h8v8" />
    </>
  ),
};

const PANELS = [
  { title: "People", body: "Building capable teams, stronger collaboration and organizational confidence." },
  { title: "Process", body: "Creating efficient systems, clarity and consistency." },
  { title: "Planet", body: "Integrating environmental responsibility and sustainability into business thinking." },
  { title: "Progress", body: "Turning insight into meaningful and sustainable advancement." },
];

/**
 * Four interactive panels. When scrolled into view a connecting line draws, panels light up in
 * sequence, then the highlight cycles every ~3.4s. Hover/focus takes over the highlight.
 * Reduced motion: no cycling, all panels shown in their resting state.
 */
export function PhilosophyPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(-1);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    PANELS.forEach((_, i) => timers.push(setTimeout(() => setLit(i), 500 + i * 420)));
    let cycle: ReturnType<typeof setInterval> | undefined;
    timers.push(
      setTimeout(() => {
        cycle = setInterval(() => setLit((i) => (i + 1) % PANELS.length), 3400);
      }, 500 + PANELS.length * 420),
    );
    return () => {
      timers.forEach(clearTimeout);
      if (cycle) clearInterval(cycle);
    };
  }, [inView, reduce]);

  const active = hover ?? lit;

  return (
    <div ref={ref}>
      <div className="relative h-px bg-ivory/14">
        <motion.span
          aria-hidden
          className="absolute inset-0 block h-px origin-left bg-gradient-to-r from-sage to-gold-light"
          initial={reduce ? false : { scaleX: 0 }}
          animate={inView || reduce ? { scaleX: 1 } : {}}
          transition={{ duration: 2, ease: [0.3, 0.7, 0.2, 1] }}
        />
      </div>
      <ul className="grid gap-px bg-ivory/8 sm:grid-cols-2 lg:grid-cols-4">
        {PANELS.map((p, i) => {
          const on = active === i;
          return (
            <li
              key={p.title}
              tabIndex={0}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={cn(
                "relative flex min-h-[330px] min-w-0 flex-col px-[clamp(24px,2.6vw,36px)] pb-[clamp(34px,3vw,46px)] pt-[clamp(30px,3vw,44px)] outline-none transition-[background-color,box-shadow] duration-500",
                on ? "bg-forest shadow-[inset_0_0_0_1px_rgba(199,154,85,0.55)]" : "bg-forest-deep",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-[5px] left-[clamp(24px,2.6vw,36px)] block h-[9px] w-[9px] rounded-full transition-all duration-500",
                  on || i <= lit ? "bg-gold-light" : "bg-sage-dot",
                  on && "shadow-[0_0_0_5px_rgba(199,154,85,0.18)]",
                )}
              />
              <svg
                viewBox="0 0 48 48"
                width="46"
                height="46"
                fill="none"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={cn("transition-colors duration-500", on ? "stroke-gold-light" : "stroke-sage")}
              >
                {ICONS[p.title]}
              </svg>
              <span className="mt-[26px] text-[11px] font-semibold tracking-[0.2em] text-sage">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2.5 text-[clamp(30px,2.8vw,40px)] uppercase tracking-[0.06em] text-ivory">{p.title}</h3>
              <p className="mt-4 text-[14.5px] font-light leading-[1.78] text-ivory/74">{p.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
