"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type EcoNode = {
  key: string;
  label: string;
  title: string;
  description: string;
  chips?: string[];
  href?: string;
  linkLabel?: string;
};

/**
 * Ecosystem diagram: central INSIGHT / ADVORA circle, dashed outer ring, nodes on spokes.
 * Hover/focus a node → dot grows and turns gold, spoke brightens, label turns gold-pale,
 * side panel swaps content. Nodes are keyboard-focusable buttons.
 */
export function Ecosystem({ nodes, dark = true, panelFirst = false }: { nodes: EcoNode[]; dark?: boolean; panelFirst?: boolean }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const panelId = useId();
  const size = 520;
  const c = size / 2;
  const R = 190;
  const node = nodes[active];

  const line = dark ? "rgba(250,249,245,0.22)" : "rgba(23,53,43,0.22)";
  const labelColor = dark ? "rgba(250,249,245,0.82)" : "#17352B";

  return (
    <div ref={ref} className={cn("grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]", panelFirst && "lg:grid-cols-[1fr_1.15fr]")}>
      <div className={cn("relative mx-auto w-full max-w-[560px]", panelFirst && "lg:order-2")}>
        <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full overflow-visible" role="group" aria-label="Ecosystem diagram">
          <circle cx={c} cy={c} r={R + 34} fill="none" stroke={dark ? "rgba(212,180,120,0.35)" : "rgba(181,138,58,0.45)"} strokeDasharray="3 7" />
          <circle cx={c} cy={c} r={R - 60} fill="none" stroke={line} />
          {nodes.map((n, i) => {
            const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = c + Math.cos(a) * R;
            const y = c + Math.sin(a) * R;
            const on = i === active;
            const lx = c + Math.cos(a) * (R + 58);
            const ly = c + Math.sin(a) * (R + 58);
            return (
              <g key={n.key}>
                <motion.line
                  x1={c}
                  y1={c}
                  x2={x}
                  y2={y}
                  stroke={on ? "#C79A55" : line}
                  strokeWidth={on ? 1.6 : 1}
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: inView || reduce ? 1 : 0 }}
                  transition={{ duration: 1.1, delay: reduce ? 0 : 0.15 * i, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-controls={panelId}
                  aria-label={n.label}
                  className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-gold"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                >
                  <circle cx={x} cy={y} r={22} fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 7 : 5}
                    fill={on ? "#C79A55" : dark ? "#FAF9F5" : "#17352B"}
                    stroke={on ? "rgba(199,154,85,0.35)" : "transparent"}
                    strokeWidth={8}
                    style={{ transition: "all 260ms" }}
                  />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end"}
                    dominantBaseline="middle"
                    fill={on ? (dark ? "#D4B478" : "#8C6A2C") : labelColor}
                    style={{ font: "600 12px var(--font-sans)", letterSpacing: "0.14em", textTransform: "uppercase", transition: "fill 260ms" }}
                  >
                    {n.label.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}
          <circle cx={c} cy={c} r={50} fill={dark ? "#1B3327" : "#17352B"} stroke="#C79A55" />
          <text x={c} y={c - 7} textAnchor="middle" fill="#FAF9F5" style={{ font: "500 14px var(--font-serif)", letterSpacing: "0.18em" }}>
            INSIGHT
          </text>
          <text x={c} y={c + 13} textAnchor="middle" fill="#D4B478" style={{ font: "500 14px var(--font-serif)", letterSpacing: "0.18em" }}>
            ADVORA
          </text>
        </svg>
      </div>

      <div id={panelId} aria-live="polite" className={cn("border-l pl-8", dark ? "border-gold-light/40" : "border-gold/50", panelFirst && "lg:order-1")}>
        <motion.div key={node.key} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className={cn("eyebrow", dark && "eyebrow-dark")}>{String(active + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}</p>
          <h3 className={cn("mt-5 text-[clamp(28px,2.6vw,38px)] leading-tight", dark && "text-ivory")}>{node.title}</h3>
          <p className={cn("body-copy mt-5", dark && "text-on-dark")}>{node.description}</p>
          {node.chips && node.chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {node.chips.map((ch) => (
                <li key={ch} className={cn("chip", dark && "chip-dark")}>
                  {ch}
                </li>
              ))}
            </ul>
          )}
          {node.href && (
            <Link
              href={node.href}
              className={cn(
                "group mt-8 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] underline decoration-1 underline-offset-8",
                dark ? "text-gold-pale decoration-gold-light/70 hover:text-ivory" : "text-forest decoration-gold hover:text-gold-ink",
              )}
            >
              {node.linkLabel ?? "Explore"}
              <span aria-hidden className="inline-block h-px w-[18px] bg-current transition-transform group-hover:translate-x-2" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
