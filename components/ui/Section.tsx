import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GoldRule, Reveal } from "@/components/ui/Motion";

export function Section({
  children,
  tone = "ivory",
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: "ivory" | "ivory-2" | "forest" | "forest-2";
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    ivory: "bg-ivory",
    "ivory-2": "bg-ivory-2",
    forest: "bg-forest text-ivory",
    "forest-2": "bg-forest-2 text-ivory",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("section-y relative", tones[tone], className)}>
      <div className="container-site relative">{children}</div>
    </section>
  );
}

/** Heading emphasis pattern: second clause in italic. */
export function Heading({
  lead,
  accent,
  as: Tag = "h2",
  dark = false,
  className,
  id,
}: {
  lead: string;
  accent?: string;
  as?: "h1" | "h2" | "h3";
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn(Tag === "h1" ? "h-page" : "h-section", dark && "text-ivory", className)}>
      {lead}
      {accent && (
        <>
          {" "}
          <em className={cn("font-normal italic", dark ? "text-gold-pale" : "text-charcoal")}>{accent}</em>
        </>
      )}
    </Tag>
  );
}

/** Eyebrow + H2 + gold rule on the left, body copy on the right. */
export function SectionIntro({
  eyebrow,
  lead,
  accent,
  children,
  dark = false,
  id,
}: {
  eyebrow: string;
  lead: string;
  accent?: string;
  children?: ReactNode;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div className="grid gap-x-16 gap-y-8 md:grid-cols-2 md:items-end">
      <Reveal>
        <p className={cn("eyebrow", dark && "eyebrow-dark")}>{eyebrow}</p>
        <Heading lead={lead} accent={accent} dark={dark} className="mt-5" id={id} />
        <GoldRule className="mt-7" dark={dark} />
      </Reveal>
      {children && (
        <Reveal index={1}>
          <div className={cn("body-copy", dark && "text-on-dark")}>{children}</div>
        </Reveal>
      )}
    </div>
  );
}

export function Chips({ items, dark = false, className }: { items: string[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((c, i) => (
        <li key={`${c}-${i}`} className={cn("chip", dark && "chip-dark")}>
          {c}
        </li>
      ))}
    </ul>
  );
}
