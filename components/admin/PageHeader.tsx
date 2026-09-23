import Link from "next/link";

export function PageHeader({ title, back, actions, sub }: { title: string; back?: { href: string; label: string }; actions?: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
      <div>
        {back && (
          <Link href={back.href} className="text-[12px] text-body-2 hover:text-gold-ink">
            ← {back.label}
          </Link>
        )}
        <h1 className="mt-1 text-[32px] leading-tight">{title}</h1>
        {sub && <div className="mt-1 text-[13px] text-body-2">{sub}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

export const primaryLink =
  "inline-flex items-center gap-2 border border-gold bg-gold px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-forest hover:bg-forest hover:text-ivory";
export const secondaryLink =
  "inline-flex items-center gap-2 border border-hairline-strong px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:border-gold hover:text-gold-ink";

export function StatusBadge({ status }: { status: string }) {
  const tone: Record<string, string> = {
    published: "border-forest bg-forest text-ivory",
    draft: "border-hairline-strong text-body-2",
    review: "border-gold text-gold-ink",
    archived: "border-hairline text-body-2/60 line-through",
    new: "border-gold bg-gold/15 text-gold-ink",
    contacted: "border-forest/40 text-forest",
    in_progress: "border-forest bg-forest/10 text-forest",
    closed: "border-hairline text-body-2/70",
  };
  return <span className={`inline-block border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] ${tone[status] ?? "border-hairline"}`}>{status.replace("_", " ")}</span>;
}

export const table = "w-full border-collapse border border-hairline bg-white text-left text-[13.5px]";
export const th = "border-b border-hairline bg-ivory-2 px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-body-2";
export const td = "border-b border-hairline px-4 py-3 align-top";
