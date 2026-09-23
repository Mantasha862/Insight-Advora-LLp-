"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { RotatingWord } from "@/components/site/RotatingWord";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const lift = (i: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 34 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.14 } };

  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="container-hero grid min-h-[calc(90vh-92px)] items-center gap-10 py-14 lg:grid-cols-[1.02fr_1fr] lg:py-10">
        <div className="relative z-10">
          <motion.p className="eyebrow" {...lift(0)}>
            Consulting &amp; Corporate Advisory
          </motion.p>
          <h1 className="h-hero mt-7 uppercase">
            <motion.span className="block" {...lift(1)}>Turning Insight</motion.span>
            <motion.span className="block" {...lift(2)}>Into Measurable</motion.span>
            <motion.span className="block font-normal italic text-charcoal" {...lift(3)}>Progress.</motion.span>
          </h1>
          <motion.p className="relative mt-7 inline-block font-serif text-[clamp(20px,1.9vw,26px)] italic tracking-[0.02em] text-gold-ink" {...lift(4)}>
            Partnering for Smarter Decisions
            <motion.span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gold"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.95 }}
            />
          </motion.p>
          <motion.p className="body-copy mt-7 max-w-[560px]" {...lift(5)}>
            Insight Advora LLP is a multidisciplinary consulting and advisory firm. We work alongside leadership teams to bring
            clarity to complex decisions and turn them into practical, measurable action.
          </motion.p>
          <motion.p className="mt-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-body-2" {...lift(5)}>
            <span>Focused on</span>
            <RotatingWord words={["Strategy", "Transformation", "Growth", "Sustainability", "Progress"]} />
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-4" {...lift(6)}>
            <ButtonLink href="/services">Explore Our Services</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Let&apos;s Talk
            </ButtonLink>
          </motion.div>
        </div>

        <div className="relative aspect-square w-full max-lg:mx-auto max-lg:max-w-[560px]">
          <Image
            src="/assets/monogram-alpha.png"
            alt=""
            aria-hidden
            width={582}
            height={471}
            priority
            className="pointer-events-none absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.055]"
          />
          <NetworkCanvas variant="sphere" />
        </div>
      </div>

      <a
        href="#who-we-are"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-body-2 hover:text-gold-ink md:flex"
      >
        Scroll to Explore
        <span className="relative block h-10 w-px overflow-hidden bg-hairline-strong">
          <span className="absolute inset-0 animate-scroll-line bg-gold" />
        </span>
      </a>
    </section>
  );
}
