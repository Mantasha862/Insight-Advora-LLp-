"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  variant?: "sphere" | "drift";
  /** Light pages draw forest lines; dark pages draw ivory lines. */
  tone?: "light" | "dark";
  /** Drift variant: concentrate nodes on the right-hand side. */
  weightRight?: boolean;
  className?: string;
  interactive?: boolean;
};

type V3 = { x: number; y: number; z: number };

const GOLD = "199,154,85";

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Animated node network drawn on a 2D canvas (a lighter alternative to WebGL).
 * - sphere: ~96 nodes on a Fibonacci sphere, 2 nearest-neighbour links, ~16% gold edges,
 *   three orbital rings, gold particles along edges, slow yaw + pitch sway + breathing,
 *   mouse parallax and cursor-proximity brightening.
 * - drift: flat, slowly drifting node field for page heroes.
 * Pauses when hidden/off-screen; renders a single static frame under prefers-reduced-motion;
 * falls back to a static SVG if canvas is unavailable.
 */
export function NetworkCanvas({ variant = "sphere", tone = "light", weightRight = false, className = "", interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFallback(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const allowMouse = interactive && !mobile && variant === "sphere";
    const ink = tone === "dark" ? "250,249,245" : "23,53,43";
    const rand = rng(7);

    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ─── Sphere data ────────────────────────────────────────────────────
    const N = variant === "sphere" ? (mobile ? 54 : 96) : mobile ? 34 : 64;
    const pts: V3[] = [];
    if (variant === "sphere") {
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const t = phi * i;
        pts.push({ x: Math.cos(t) * rad, y, z: Math.sin(t) * rad });
      }
    } else {
      for (let i = 0; i < N; i++) {
        let x = rand();
        if (weightRight) x = 1 - Math.pow(rand(), 1.8) * 0.85;
        pts.push({ x, y: rand(), z: (rand() - 0.5) * 0.0004 + 0.0002 * (rand() > 0.5 ? 1 : -1) });
      }
    }
    const vel = pts.map(() => ({ x: (rand() - 0.5) * 0.00002, y: (rand() - 0.5) * 0.00002 }));

    // Edges: each node → its 2 nearest neighbours (deduplicated).
    const edges: { a: number; b: number; gold: boolean }[] = [];
    const adj: number[][] = pts.map(() => []);
    if (variant === "sphere") {
      const seen = new Set<string>();
      for (let i = 0; i < N; i++) {
        const d = pts
          .map((p, j) => ({ j, d: (p.x - pts[i].x) ** 2 + (p.y - pts[i].y) ** 2 + (p.z - pts[i].z) ** 2 }))
          .filter((o) => o.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        for (const { j } of d) {
          const k = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen.has(k)) continue;
          seen.add(k);
          edges.push({ a: i, b: j, gold: rand() < 0.16 });
          adj[i].push(edges.length - 1);
          adj[j].push(edges.length - 1);
        }
      }
    }

    const particles = Array.from({ length: variant === "sphere" ? (mobile ? 5 : 11) : 0 }, () => {
      const e = Math.floor(rand() * edges.length);
      return { e, t: rand(), dir: 1, speed: 0.00035 + rand() * 0.00035 };
    });

    const rings = [
      { tilt: 0.35, yaw: 0.2, r: 1.22 },
      { tilt: 1.15, yaw: 1.1, r: 1.34 },
      { tilt: -0.7, yaw: 2.2, r: 1.46 },
    ];

    let mouse = { x: 0, y: 0, px: -9999, py: -9999, active: false };
    const par = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = {
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
        px: e.clientX - r.left,
        py: e.clientY - r.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouse = { ...mouse, x: 0, y: 0, px: -9999, py: -9999, active: false };
    };
    if (allowMouse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
    }

    const project = (p: V3, yaw: number, pitch: number, scale: number) => {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const x1 = p.x * cy - p.z * sy;
      const z1 = p.x * sy + p.z * cy;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const y2 = p.y * cp - z1 * sp;
      const z2 = p.y * sp + z1 * cp;
      const R = Math.min(w, h) * 0.38 * scale;
      const persp = 2.6 / (2.6 + z2);
      return { x: w / 2 + par.x * 18 + x1 * R * persp, y: h / 2 + par.y * 14 + y2 * R * persp, z: z2, s: persp };
    };

    const drawSphere = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      par.x += (mouse.x - par.x) * 0.045;
      par.y += (mouse.y - par.y) * 0.045;
      const yaw = t * 0.00009 + par.x * 0.25;
      const pitch = Math.sin(t * 0.00021) * 0.22 + par.y * 0.12;
      const scale = 1 + Math.sin(t * 0.0006) * 0.022;
      const P = pts.map((p) => project(p, yaw, pitch, scale));

      // Orbital rings
      for (const ring of rings) {
        ctx.beginPath();
        for (let k = 0; k <= 96; k++) {
          const a = (k / 96) * Math.PI * 2;
          const p0 = { x: Math.cos(a) * ring.r, y: 0, z: Math.sin(a) * ring.r };
          const ct = Math.cos(ring.tilt), st = Math.sin(ring.tilt);
          const p1 = { x: p0.x, y: p0.y * ct - p0.z * st, z: p0.y * st + p0.z * ct };
          const q = project(p1, yaw * 0.6 + ring.yaw, pitch, scale);
          if (k === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = `rgba(${GOLD},0.16)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Edges
      for (const e of edges) {
        const a = P[e.a], b = P[e.b];
        const depth = ((a.z + b.z) / 2 + 1) / 2; // 0 back → 1 front
        let alpha = 0.08 + (1 - depth) * 0.32;
        if (mouse.active) {
          const mx = (a.x + b.x) / 2 - mouse.px, my = (a.y + b.y) / 2 - mouse.py;
          const d = Math.sqrt(mx * mx + my * my);
          if (d < 140) alpha += (1 - d / 140) * 0.45;
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = e.gold ? `rgba(${GOLD},${Math.min(0.9, alpha + 0.15)})` : `rgba(${ink},${Math.min(0.75, alpha)})`;
        ctx.lineWidth = e.gold ? 1.1 : 0.8;
        ctx.stroke();
      }

      // Nodes
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const front = 1 - (p.z + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 + front * 1.9, 0, Math.PI * 2);
        ctx.fillStyle = i % 9 === 0 ? `rgba(${GOLD},${0.55 + front * 0.45})` : `rgba(${ink},${0.25 + front * 0.6})`;
        ctx.fill();
      }

      // Particles
      for (const pa of particles) {
        const e = edges[pa.e];
        if (!e) continue;
        const a = P[pa.dir > 0 ? e.a : e.b], b = P[pa.dir > 0 ? e.b : e.a];
        const x = a.x + (b.x - a.x) * pa.t, y = a.y + (b.y - a.y) * pa.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, `rgba(${GOLD},0.95)`);
        g.addColorStop(1, `rgba(${GOLD},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const stepParticles = (dt: number) => {
      for (const pa of particles) {
        pa.t += pa.speed * dt;
        if (pa.t >= 1) {
          const e = edges[pa.e];
          const end = pa.dir > 0 ? e.b : e.a;
          const options = adj[end].filter((x) => x !== pa.e);
          const next = options.length ? options[Math.floor(rand() * options.length)] : pa.e;
          pa.e = next;
          pa.dir = edges[next].a === end ? 1 : -1;
          pa.t = 0;
        }
      }
    };

    const drawDrift = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += vel[i].x * dt;
        p.y += vel[i].y * dt;
        if (p.x < 0 || p.x > 1) vel[i].x *= -1;
        if (p.y < 0 || p.y > 1) vel[i].y *= -1;
      }
      const maxD = Math.min(170, w * 0.16);
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const ax = a.x * w, ay = a.y * h;
        for (let j = i + 1; j < pts.length; j++) {
          const bx = pts[j].x * w, by = pts[j].y * h;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < maxD) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            const gold = (i + j) % 7 === 0;
            ctx.strokeStyle = gold ? `rgba(${GOLD},${0.32 * (1 - d / maxD)})` : `rgba(${ink},${0.2 * (1 - d / maxD)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(ax, ay, i % 8 === 0 ? 2.2 : 1.6, 0, Math.PI * 2);
        ctx.fillStyle = i % 8 === 0 ? `rgba(${GOLD},0.8)` : `rgba(${ink},0.4)`;
        ctx.fill();
      }
    };

    let raf = 0;
    let last = performance.now();
    let running = false;
    let visible = true;
    const t0 = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      if (variant === "sphere") {
        stepParticles(dt);
        drawSphere(now - t0);
      } else drawDrift(dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduce || document.hidden || !visible) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Initial (and reduced-motion) static frame.
    if (variant === "sphere") drawSphere(0);
    else drawDrift(0);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) variant === "sphere" ? drawSphere(0) : drawDrift(0);
    });
    ro.observe(canvas);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [variant, tone, weightRight, interactive]);

  if (fallback) return <StaticNetwork tone={tone} className={className} />;
  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}

/** Static SVG fallback. */
export function StaticNetwork({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const ink = tone === "dark" ? "rgba(250,249,245,0.35)" : "rgba(23,53,43,0.3)";
  const r = rng(3);
  const nodes = Array.from({ length: 40 }, () => ({ x: 20 + r() * 360, y: 20 + r() * 360 }));
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={`h-full w-full ${className}`}>
      <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(181,138,58,0.25)" />
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) =>
          Math.hypot(a.x - b.x, a.y - b.y) < 70 ? (
            <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={(i + j) % 6 === 0 ? "rgba(181,138,58,0.6)" : ink} strokeWidth="0.8" />
          ) : null,
        ),
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 8 === 0 ? 2.6 : 1.8} fill={i % 8 === 0 ? "#B58A3A" : ink} />
      ))}
    </svg>
  );
}
