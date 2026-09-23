"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ServiceItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/** "What Are You Looking to Solve?" — challenge buttons on the left, matched practice on the right. */
export function ChallengeSelector({ services }: { services: ServiceItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = services[active];
  if (!s) return null;
  return (
    <div className="grid border border-hairline lg:grid-cols-[1fr_1.1fr]">
      <div role="tablist" aria-label="Challenges" aria-orientation="vertical" className="flex flex-col bg-ivory">
        {services.map((svc, i) => (
          <button
            key={svc.slug}
            role="tab"
            id={`challenge-${svc.slug}`}
            aria-selected={i === active}
            aria-controls="challenge-panel"
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") setActive((active + 1) % services.length);
              if (e.key === "ArrowUp") setActive((active - 1 + services.length) % services.length);
            }}
            className={cn(
              "group flex items-center justify-between gap-6 border-b border-hairline px-8 py-6 text-left transition-colors last:border-b-0",
              i === active ? "bg-ivory-2" : "hover:bg-ivory-2/60",
            )}
          >
            <span className={cn("font-serif text-[21px] leading-snug", i === active ? "text-forest" : "text-body")}>{svc.challenge}</span>
            <span aria-hidden className={cn("h-px flex-none bg-gold transition-all duration-300", i === active ? "w-8" : "w-3 opacity-50")} />
          </button>
        ))}
      </div>
      <div id="challenge-panel" role="tabpanel" aria-labelledby={`challenge-${s.slug}`} className="relative overflow-hidden bg-forest p-10 text-ivory md:p-14">
        <div aria-hidden className="lattice absolute inset-0 opacity-60" />
        <motion.div key={s.slug} className="relative" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="eyebrow eyebrow-dark">Recommended Practice</p>
          <p className="numeral mt-8 text-[58px]">{s.number}</p>
          <h3 className="mt-4 text-[clamp(28px,2.6vw,38px)] leading-tight text-ivory">{s.title}</h3>
          <p className="statement mt-4 text-gold-pale">{s.headline}</p>
          <p className="body-copy mt-6 text-on-dark">{s.description}</p>
          <Link
            href={`/services/${s.slug}`}
            className="group mt-10 inline-flex items-center gap-3 border border-gold-light bg-gold-light px-7 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-forest transition-all hover:bg-transparent hover:tracking-[0.16em] hover:text-gold-pale"
          >
            Explore {s.shortTitle} <span aria-hidden className="h-px w-4 bg-current" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
