"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";

type Media = { mp4: string; webm: string; poster: string; playOnMobile: boolean };

const WORDS = ["Collaborate.", "Challenge.", "Create.", "Progress."];
const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * "Advisory in Session" media panel. Plays licensed footage from content/home.ts when set
 * (lazy-loaded near the viewport, muted, looped; skipped under reduced motion and — unless
 * playOnMobile — on phones). With no media configured it shows a branded network panel.
 */
export function AdvisoryMedia({ media }: { media: Media }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const reduce = useReducedMotion();
  const [small, setSmall] = useState(false);

  useEffect(() => setSmall(window.matchMedia("(max-width: 759px)").matches), []);

  const hasVideo = Boolean(media.mp4 || media.webm);
  const playVideo = hasVideo && !reduce && (!small || media.playOnMobile) && inView;

  return (
    <div
      ref={ref}
      className="relative aspect-[2/1] min-h-[280px] min-w-0 flex-[1.7_1_480px] overflow-hidden rounded-lg bg-forest shadow-[0_50px_90px_-50px_rgba(0,0,0,0.7)]"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {playVideo ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={media.poster || undefined}>
            {media.webm && <source src={media.webm} type="video/webm" />}
            {media.mp4 && <source src={media.mp4} type="video/mp4" />}
          </video>
        ) : media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#1f4a3b,#0E2921)]">
            <NetworkCanvas variant="drift" tone="dark" weightRight interactive={false} />
          </div>
        )}
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,41,33,0.62) 0%, rgba(23,59,47,0.18) 44%, rgba(23,59,47,0.06) 100%), linear-gradient(0deg, rgba(14,41,33,0.5) 0%, rgba(14,41,33,0) 42%)",
        }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-3.5 rounded border border-gold-light/35" />
      <div className="pointer-events-none absolute bottom-[clamp(26px,3.4vw,50px)] left-[clamp(26px,3.4vw,52px)] flex flex-col gap-0.5">
        {WORDS.map((w, i) => (
          <motion.span
            key={w}
            className="font-serif text-[clamp(24px,2.6vw,38px)] font-medium leading-[1.14] tracking-[0.02em] text-ivory"
            initial={reduce ? false : { opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 + i * 0.18 }}
          >
            {w}
          </motion.span>
        ))}
        <motion.span
          aria-hidden
          className="mt-3.5 block h-px w-[46px] origin-left bg-gold-light"
          initial={reduce ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
        />
      </div>
    </div>
  );
}
