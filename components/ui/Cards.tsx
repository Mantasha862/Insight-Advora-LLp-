import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Numbered card: serif numeral, title, body, "Explore" link. On hover a 2px gold
 * line draws across the top and the trailing arrow line slides right.
 */
export function NumberedCard({
  href,
  number,
  title,
  body,
  cta = "Explore",
  children,
  className,
  icon,
}: {
  href: string;
  number?: string;
  title: string;
  body?: string;
  cta?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[var(--shadow-hover)] md:p-10",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] w-0 bg-gold transition-[width] duration-[520ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:w-full" />
      <div className="flex items-start justify-between gap-6">
        {number && <span className="numeral text-[40px]">{number}</span>}
        {icon && (
          <span className="flex h-[52px] w-[52px] items-center justify-center border border-hairline-strong text-forest transition-colors duration-300 group-hover:border-gold group-hover:text-gold-ink">
            {icon}
          </span>
        )}
      </div>
      <h3 className="h-card mt-8">{title}</h3>
      {body && <p className="card-copy mt-4">{body}</p>}
      {children}
      <span className="mt-auto inline-flex items-center gap-3 pt-8 text-[12px] font-semibold uppercase tracking-[0.1em] text-gold-ink">
        {cta}
        <span aria-hidden className="inline-block h-px w-[18px] bg-current transition-transform duration-300 group-hover:translate-x-2" />
      </span>
    </Link>
  );
}

/** Neutral photo placeholder — no stock photography until the client supplies images. */
export function PhotoPlaceholder({ label = "Photo to be supplied", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden bg-card-alt", className)}>
      <svg aria-hidden viewBox="0 0 80 80" className="h-16 w-16 text-forest/15">
        <circle cx="40" cy="30" r="14" fill="currentColor" />
        <path d="M12 76c2-16 14-26 28-26s26 10 28 26" fill="currentColor" />
      </svg>
      <span className="absolute bottom-4 left-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-body-2/70">{label}</span>
    </div>
  );
}
