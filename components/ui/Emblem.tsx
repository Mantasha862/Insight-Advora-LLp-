"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

// Dimensional IA watermark (port of the design's <ia-emblem>). The supplied monogram
// is used purely as an alpha mask, so the logo shape is never redrawn: brushed-metal
// body, antique-gold rim on the light-facing edge, darker rim on the shadow side, soft
// cast shadow, an occasional light sweep and a reflection that follows the cursor.

const SRC = "/assets/monogram-mark.png";

const VARIANTS = {
  hero: { body: 0.34, lift: 1, sat: 1.05, rim: 0.9, shade: 0.5, cast: 0.2, glow: 0.14, sheen: 0.5, travel: 16 },
  light: { body: 0.17, lift: 1, sat: 1, rim: 0.65, shade: 0.3, cast: 0.1, glow: 0.08, sheen: 0.4, travel: 8 },
  dark: { body: 0.34, lift: 1.9, sat: 0.95, rim: 0.85, shade: 0.55, cast: 0.3, glow: 0.16, sheen: 0.45, travel: 8 },
} as const;

const url = `url("${SRC}")`;
const mask: CSSProperties = {
  WebkitMaskImage: url,
  maskImage: url,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};
const rimMask = (dir: "+" | "-"): CSSProperties => ({
  WebkitMaskImage: `${url},${url}`,
  maskImage: `${url},${url}`,
  WebkitMaskSize: "contain,contain",
  maskSize: "contain,contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: `calc(50% ${dir} var(--o)) calc(50% ${dir} var(--o)),center`,
  maskPosition: `calc(50% ${dir} var(--o)) calc(50% ${dir} var(--o)),center`,
  WebkitMaskComposite: "source-out",
  maskComposite: "subtract",
});
const layer: CSSProperties = { position: "absolute", inset: 0 };

export function Emblem({
  variant = "light",
  className,
  style,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
  style?: CSSProperties;
}) {
  const v = VARIANTS[variant];
  const host = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    const p = plate.current;
    if (!el || !p) return;
    const setRim = () => {
      const w = el.getBoundingClientRect().width || 400;
      el.style.setProperty("--o", `${Math.max(1.4, Math.min(3.2, w * 0.0036)).toFixed(2)}px`);
    };
    setRim();
    const ro = new ResizeObserver(setRim);
    ro.observe(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 760) return () => ro.disconnect();
    let raf = 0;
    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        p.style.transform = `translate3d(${(mx * v.travel).toFixed(1)}px,${(my * v.travel * 0.7).toFixed(1)}px,0)`;
        el.style.setProperty("--lx", `${(32 + mx * 36).toFixed(1)}%`);
        el.style.setProperty("--ly", `${(20 + my * 30).toFixed(1)}%`);
        el.style.setProperty("--la", `${(146 + mx * 30).toFixed(0)}deg`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [v.travel]);

  return (
    <div
      ref={host}
      aria-hidden
      className={cn("ia-emblem pointer-events-none select-none", className)}
      style={{ aspectRatio: "670 / 534", ["--o" as string]: "2px", ["--lx" as string]: "32%", ["--ly" as string]: "20%", ["--la" as string]: "146deg", ...style }}
    >
      <div ref={plate} className="ia-emblem-plate" style={{ ...layer, transition: "transform 1400ms cubic-bezier(.2,.7,.2,1)", willChange: "transform" }}>
        <div className="ia-emblem-glow" style={{ ...layer, ...mask, background: "rgb(184,152,88)", filter: "blur(28px)", opacity: 0, ["--glow" as string]: v.glow }} />
        <div style={{ ...layer, ...mask, background: "rgb(8,22,18)", opacity: v.cast, transform: "translate(0,2.2%)", filter: "blur(14px)" }} />
        <div className="ia-emblem-body" style={{ ...layer, opacity: v.body }}>
          <div style={{ ...layer, background: `${url} center/contain no-repeat`, filter: `brightness(${v.lift}) saturate(${v.sat}) contrast(1.08)` }} />
          <div
            style={{
              ...layer,
              ...mask,
              background:
                "repeating-linear-gradient(94deg, rgba(255,255,255,.05) 0 1px, rgba(0,0,0,0) 1px 3px),linear-gradient(146deg, rgba(255,255,255,.22) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,.18) 52%, rgba(255,255,255,.12) 70%, rgba(0,0,0,.22) 100%)",
              mixBlendMode: "soft-light",
            }}
          />
          <div style={{ ...layer, ...mask, background: "radial-gradient(70% 55% at var(--lx) var(--ly), rgba(236,222,190,.34), rgba(236,222,190,0) 60%)" }} />
          <div
            className="ia-emblem-sheen"
            style={{
              ...layer,
              ...mask,
              background: `linear-gradient(112deg, rgba(255,244,214,0) 42%, rgba(255,244,214,${v.sheen}) 49.5%, rgba(212,180,120,${v.sheen * 0.6}) 51.5%, rgba(212,180,120,0) 57%)`,
              backgroundSize: "300% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "175% 0",
              mixBlendMode: "screen",
            }}
          />
        </div>
        <div style={{ ...layer, ...rimMask("+"), background: "rgb(16,26,18)", opacity: v.shade }} />
        <div
          style={{
            ...layer,
            ...rimMask("-"),
            background:
              "linear-gradient(var(--la), rgba(232,206,150,1) 0%, rgba(216,184,120,.9) 24%, rgba(184,152,88,.22) 54%, rgba(184,152,88,0) 70%, rgba(168,136,72,.4) 100%)",
            opacity: v.rim,
          }}
        />
      </div>
    </div>
  );
}
