import { deletePageSeo } from "@/app/admin/actions";
import { SeoForm } from "@/components/admin/Forms";
import { PageHeader, table, td, th } from "@/components/admin/PageHeader";
import { ConfirmButton } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "SEO settings" };

const PATHS = ["/", "/about", "/services", "/industries", "/team", "/knowledge-hub", "/contact", "/privacy-policy", "/terms-of-use", "/disclaimer"];

export default async function SeoPage({ searchParams }: PageProps<"/admin/seo">) {
  await requireUser();
  const rows = await prisma.pageSeo.findMany({ orderBy: { path: "asc" } });
  const edit = (await searchParams).edit;
  const editing = rows.find((r) => r.path === edit);
  return (
    <>
      <PageHeader title="SEO settings" sub="Per-page overrides for title, description, OG image and canonical. Detail pages can also be overridden from each item's SEO fields." />
      <div className="grid gap-8 xl:grid-cols-[1fr_400px]">
        <table className={table}>
          <thead><tr>{["Path", "Title", "Description", ""].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={td}><a href={`/admin/seo?edit=${encodeURIComponent(r.path)}`} className="font-medium text-forest hover:text-gold-ink">{r.path}</a></td>
                <td className={td}>{r.title ?? "—"}</td>
                <td className={`${td} max-w-[320px] truncate`}>{r.description ?? "—"}</td>
                <td className={td}><ConfirmButton action={deletePageSeo.bind(null, r.id)} label="Remove" confirm={`Remove SEO override for ${r.path}?`} /></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td className={td} colSpan={4}>No overrides — pages use their built-in titles and descriptions.</td></tr>}
          </tbody>
        </table>
        <SeoForm key={editing?.id ?? "new"} paths={PATHS} initial={editing} />
      </div>
    </>
  );
}
