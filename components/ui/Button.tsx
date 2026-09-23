import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "gold" | "ghost-dark";

const base =
  "group inline-flex items-center justify-center gap-3 border px-8 py-[18px] text-[12px] uppercase tracking-[0.1em] transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "border-forest bg-forest font-semibold text-ivory hover:border-gold hover:bg-gold hover:text-forest",
  secondary: "border-gold/65 bg-transparent font-semibold text-forest hover:bg-gold/12 hover:text-gold-ink",
  gold: "border-gold-light bg-gold-light font-bold text-forest hover:bg-transparent hover:text-gold-pale hover:tracking-[0.16em]",
  "ghost-dark": "border-ivory/35 bg-transparent font-semibold text-ivory hover:border-gold-pale hover:text-gold-pale",
};

/** Short horizontal-line "arrow" used by every button. */
export function LineArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-px w-4 bg-current transition-transform duration-300 group-hover:translate-x-1.5", className)}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
  ...rest
}: { href: string; variant?: Variant; children: ReactNode; className?: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      <LineArrow />
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  arrow = true,
  ...rest
}: { variant?: Variant; children: ReactNode; className?: string; arrow?: boolean } & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {arrow && <LineArrow />}
    </button>
  );
}

/** Uppercase text link with gold underline and trailing line. */
export function TextLink({
  href,
  children,
  dark = false,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "group inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] underline decoration-1 underline-offset-8 transition-colors",
    dark ? "text-gold-pale decoration-gold-light/70 hover:text-ivory" : "text-forest decoration-gold hover:text-gold-ink",
    className,
  );
  const inner = (
    <>
      {children}
      <span aria-hidden className="inline-block h-px w-[18px] bg-current transition-transform duration-300 group-hover:translate-x-2" />
    </>
  );
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
