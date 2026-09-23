"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Stepped timeline: 1px track with a gold progress bar that fills over ~2.3s when
 * in view; 9px dots turn gold and scale 1.25 in sequence (~390ms apart).
 */
export function Timeline({
  steps,
  dark = false,
  numbered = true,
}: {
  steps: { title: string; text?: string }[];
  dark?: boolean;
  numbered?: boolean;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const on = inView || reduce;
  const total = 2.3;

  return (
    <ol ref={ref} className="relative grid gap-10 md:gap-6" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))` }}>
      <span aria-hidden className={cn("absolute left-0 right-0 top-[4px] hidden h-px md:block", dark ? "bg-ivory/15" : "bg-hairline-strong")} />
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 top-[4px] hidden h-px origin-left bg-gold md:block"
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: on ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : total, ease: [0.2, 0.7, 0.2, 1] }}
      />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <motion.span
            aria-hidden
            className="block h-[9px] w-[9px] rounded-full"
            initial={{ backgroundColor: reduce ? "#B58A3A" : "#CFD6CF", scale: 1 }}
            animate={on ? { backgroundColor: "#B58A3A", scale: 1.25 } : {}}
            transition={{ delay: reduce ? 0 : 0.2 + i * 0.39, duration: 0.4 }}
          />
          {numbered && (
            <span className={cn("numeral mt-6 block text-[30px]", dark ? "text-gold-light" : "text-gold")}>
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <h3 className={cn("mt-3 text-[25px] leading-tight", dark && "text-ivory")}>{s.title}</h3>
          {s.text && <p className={cn("card-copy mt-3", dark && "text-on-dark")}>{s.text}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Horizontal chain (e.g. Insight → Strategy → Action → Impact) whose gold dots light in sequence. */
export function Chain({ items, dark = false, className }: { items: string[]; dark?: boolean; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const on = inView || reduce;
  return (
    <ol ref={ref} className={cn("flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-center", className)}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-4 py-3 sm:py-0">
          <motion.span
            aria-hidden
            className="h-[9px] w-[9px] flex-none rounded-full"
            initial={{ backgroundColor: reduce ? "#B58A3A" : dark ? "rgba(250,249,245,0.25)" : "#CFD6CF" }}
            animate={on ? { backgroundColor: "#B58A3A", scale: [1, 1.35, 1.2] } : {}}
            transition={{ delay: reduce ? 0 : i * 0.38, duration: 0.5 }}
          />
          <span className={cn("font-serif text-[24px] leading-none", dark ? "text-ivory" : "text-forest")}>{item}</span>
          {i < items.length - 1 && (
            <motion.span
              aria-hidden
              className={cn("mx-3 hidden h-px w-10 origin-left sm:block", dark ? "bg-gold-light/60" : "bg-gold/60")}
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={on ? { scaleX: 1 } : {}}
              transition={{ delay: reduce ? 0 : i * 0.38 + 0.2, duration: 0.4 }}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
