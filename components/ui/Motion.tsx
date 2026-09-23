"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Scroll reveal: opacity 0→1, y 22→0, 760ms, stagger by (index mod 3). */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.76, ease: EASE, delay: (index % 3) * 0.075 }}
    >
      {children}
    </Comp>
  );
}

/** 62×1px gold rule that draws from the left when half visible. */
export function GoldRule({ className = "", width = 62, dark = false }: { className?: string; width?: number; dark?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left ${dark ? "bg-gold-light" : "bg-gold"} ${className}`}
      style={{ width }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
