import type { Offering } from "@/lib/types";

/** "Our Services" grid — the detailed offerings under a practice. */
export function Offerings({ items, className = "" }: { items: Offering[]; className?: string }) {
  if (!items.length) return null;
  return (
    <div className={className}>
      <div className="flex items-center gap-3.5">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-ink">Our Services</span>
        <span aria-hidden className="block h-px flex-1 bg-gold/40" />
      </div>
      <ul className="mt-5 grid border-b border-r border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {items.map((o, i) => (
          <li
            key={o.title}
            className="flex flex-col gap-3 border-l border-t border-hairline bg-ivory p-[clamp(22px,2.4vw,32px)] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white hover:shadow-[0_0_0_1px_rgba(181,138,58,0.5),0_22px_44px_-30px_rgba(23,59,47,0.4)]"
          >
            <span className="font-serif text-[26px] leading-none text-gold-light">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-[22px] leading-[1.24]">{o.title}</h3>
            <p className="text-[14px] font-light leading-[1.72] text-body">{o.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
