"use client";

import { useState } from "react";
import { LinkedInIcon } from "@/components/ui/Icons";

export function ArticleShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  const btn = "flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-forest hover:text-gold-ink";
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-body-2">Share</p>
      <ul className="mt-4 space-y-3">
        <li>
          <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
            <LinkedInIcon /> LinkedIn
          </a>
        </li>
        <li>
          <a className={btn} href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}>
            <span aria-hidden className="h-px w-4 bg-gold" /> Email
          </a>
        </li>
        <li>
          <button type="button" onClick={copy} className={btn} aria-live="polite">
            <span aria-hidden className="h-px w-4 bg-gold" /> {copied ? "Copied" : "Copy Link"}
          </button>
        </li>
      </ul>
    </div>
  );
}
