"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";

type Media = { mp4: string; webm: string; poster: string; playOnMobile: boolean };

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * "Advisory in Session" 16:9 media box. The video mounts only within ~400px of the viewport,
 * plays muted/looped/inline, pauses while the tab is hidden, and is replaced by its poster under
 * prefers-reduced-motion (or on phones unless playOnMobile). With no media set it shows a branded panel.
 */
export function AdvisoryMedia({ media }: { media: Media }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { once: true, margin: "400px 0px" });
  const reduce = useReducedMotion();
  const [small, setSmall] = useState(false);

  useEffect(() => setSmall(window.matchMedia("(max-width: 759px)").matches), []);

  const hasVideo = Boolean(media.mp4 || media.webm);
  const playVideo = hasVideo && !reduce && (!small || media.playOnMobile) && near;

  useEffect(() => {
    if (!playVideo) return;
    const onVis = () => {
      const v = video.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else void v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playVideo]);

  return (
    <div ref={ref} className="relative aspect-video w-full min-w-0 overflow-hidden rounded-lg bg-forest shadow-[0_50px_90px_-50px_rgba(0,0,0,0.7)]">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.05 }}
        animate={near ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {playVideo ? (
          <video
            ref={video}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.poster || undefined}
            aria-label="Advisory meeting in session"
          >
            {media.webm && <source src={media.webm} type="video/webm" />}
            {media.mp4 && <source src={media.mp4} type="video/mp4" />}
          </video>
        ) : media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.poster} alt="Advisory meeting in session" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#1f4a3b,#0E2921)]">
            <NetworkCanvas variant="drift" tone="dark" weightRight interactive={false} />
          </div>
        )}
      </motion.div>
      {/* Faint bottom shade only — no text over the footage. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/45 to-transparent" />
    </div>
  );
}
