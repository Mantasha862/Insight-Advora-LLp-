"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honour prefers-reduced-motion site-wide: framer skips transform animations (slides, scales)
 * for users who ask for reduced motion, while opacity still settles so server-rendered
 * content never stays hidden.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
