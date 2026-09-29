"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { cn } from "@/lib/utils";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function HomeHero({ phrase, watermark }: { phrase: readonly string[]; watermark: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % phrase.length), 1700);
    return () => clearInterval(id);
  }, [reduce, phrase.length]);

  // Always animate (see Reveal); under reduced motion MotionProvider drops the slide, keeping the fade.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  });

  const scrollNext = () => {
    const el = document.getElementById("about");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-hairline bg-ivory">
      <div className="grid min-h-[min(88vh,860px)] lg:grid-cols-[1.15fr_1fr]">
        <div className="relative flex min-w-0 flex-col justify-center py-[clamp(44px,6vw,92px)] pb-[clamp(96px,9vw,120px)] pl-[max(clamp(20px,4vw,56px),calc((100vw-1360px)/2+56px))] pr-[clamp(20px,4vw,64px)]">
          <div className="relative z-10">
            <motion.div className="mb-7 flex items-center gap-3.5" {...rise(0)}>
              <span aria-hidden className="h-px w-[34px] bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-forest">Insight Advora LLP</span>
            </motion.div>
            <h1 id="hero-title" className="text-[clamp(30px,4.4vw,68px)] uppercase leading-[1.05] tracking-[0.006em] [&>span]:whitespace-nowrap">
              <motion.span className="block" {...rise(0.12)}>Turning Insight</motion.span>
              <motion.span className="block" {...rise(0.26)}>Into Measurable</motion.span>
              <motion.span className="block font-normal italic text-charcoal" {...rise(0.4)}>Progress.</motion.span>
            </h1>
            <motion.div className="mt-6 inline-flex flex-col gap-2" {...rise(0.56)}>
              <span className="font-serif text-[clamp(20px,1.9vw,26px)] italic tracking-[0.02em] text-gold-ink">Partnering for Smarter Decisions</span>
              <motion.span
                aria-hidden
                className="h-px origin-left bg-gradient-to-r from-gold to-gold/10"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 1.1 }}
              />
            </motion.div>
            <motion.p className="mt-6 max-w-[50ch] text-[clamp(15.5px,1.15vw,17.5px)] font-light leading-[1.8] text-body" {...rise(0.7)}>
              Strategic advisory, operational excellence and sustainability solutions for organizations navigating growth and
              transformation.
            </motion.p>
            <motion.ul
              aria-label="Areas of focus"
              className="mt-7 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[11.5px] font-semibold uppercase tracking-[0.18em]"
              {...rise(0.82)}
            >
              {phrase.map((w, i) => (
                <li key={w} className="inline-flex items-center gap-3.5">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-sage" />}
                  <span className={cn("transition-colors duration-500", i === active ? "text-gold-ink" : "text-sage")}>{w}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div className="mt-9 flex flex-wrap gap-3.5" {...rise(0.94)}>
              <ButtonLink href="/services">Explore Our Services</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Let&apos;s Talk
              </ButtonLink>
            </motion.div>
          </div>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Scroll to explore"
            className="absolute bottom-0 left-[max(clamp(20px,4vw,56px),calc((100vw-1360px)/2+56px))] z-10 flex items-end gap-3.5 pb-6"
          >
            <span aria-hidden className="relative block h-[46px] w-px overflow-hidden bg-hairline-strong">
              <span className="absolute inset-0 animate-scroll-line bg-gold" />
            </span>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-body-2">Scroll to Explore</span>
          </button>
        </div>

        <motion.div
          className="relative min-h-[clamp(340px,56vw,660px)] min-w-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
        >
          <div className="absolute inset-0">
            <NetworkCanvas variant="sphere" monogram={watermark} />
          </div>
          <div className="pointer-events-none absolute bottom-[clamp(24px,3vw,40px)] right-[clamp(20px,3vw,44px)] flex items-center gap-3">
            <span aria-hidden className="block h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_0_5px_rgba(181,138,58,0.16)]" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-body-2">People · Process · Planet · Progress</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
