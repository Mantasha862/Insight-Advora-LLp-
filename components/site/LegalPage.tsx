import { Breadcrumb } from "@/components/ui/Blocks";

/** Simple editorial text page using Article typography. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="bg-ivory">
      <div className="container-site pb-24 pt-[clamp(40px,5vw,72px)]">
        <Breadcrumb items={[{ href: "/", label: "Home" }, { label: title }]} />
        <h1 className="h-page mt-12">{title}</h1>
        <span aria-hidden className="mt-7 block h-px w-[62px] bg-gold" />
        <div className="prose-article mt-12">{children}</div>
      </div>
    </article>
  );
}
