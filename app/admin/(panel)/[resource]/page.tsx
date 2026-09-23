import Link from "next/link";
import { notFound } from "next/navigation";
import { changeStatus } from "@/app/admin/actions";
import { PageHeader, primaryLink, StatusBadge, table, td, th } from "@/components/admin/PageHeader";
import { listRows } from "@/lib/admin/crud";
import { getResourceDef, STATUSES } from "@/lib/admin/resources";
import { requireUser } from "@/lib/auth";

function cell(v: unknown) {
  if (v instanceof Date) return v.toLocaleDateString("en-GB");
  if (typeof v === "boolean") return v ? "Yes" : "—";
  return v == null ? "—" : String(v);
}

export default async function ResourceList({ params, searchParams }: PageProps<"/admin/[resource]">) {
  await requireUser();
  const { resource } = await params;
  const def = getResourceDef(resource);
  if (!def) notFound();
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const status = typeof sp.status === "string" ? sp.status : "";
  const rows = await listRows(def, { q, status });

  return (
    <>
      <PageHeader
        title={def.label}
        sub={`${rows.length} item${rows.length === 1 ? "" : "s"}`}
        actions={<Link href={`/admin/${def.key}/new`} className={primaryLink}>New {def.singular.toLowerCase()}</Link>}
      />
      {sp.deleted && <p className="mb-4 border border-gold bg-gold/[0.08] p-3">Deleted.</p>}
      <form className="mb-5 flex flex-wrap gap-3">
        <input name="q" defaultValue={q} placeholder={`Search ${def.label.toLowerCase()}…`} className="field !w-72 !py-2 !text-[14px]" />
        <select name="status" defaultValue={status} className="field !w-44 !py-2 !text-[14px]">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="border border-hairline-strong px-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:border-gold">Filter</button>
      </form>
      <div className="overflow-x-auto">
        <table className={table}>
          <thead>
            <tr>
              {def.columns.map((c) => <th key={c.name} className={th}>{c.label}</th>)}
              <th className={th}>Status</th>
              <th className={th}>Updated</th>
              <th className={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const id = String(r.id);
              const st = String(r.status ?? "");
              return (
                <tr key={id} className="hover:bg-ivory-2/60">
                  {def.columns.map((c, i) => (
                    <td key={c.name} className={td}>
                      {i === 0 || c.name === def.titleField ? (
                        <Link href={`/admin/${def.key}/${id}`} className="font-medium text-forest hover:text-gold-ink">{cell(r[c.name])}</Link>
                      ) : (
                        cell(r[c.name])
                      )}
                    </td>
                  ))}
                  <td className={td}><StatusBadge status={st} /></td>
                  <td className={td}>{cell(r.updatedAt)}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    <div className="flex flex-wrap gap-3 text-[12px] font-semibold uppercase tracking-[0.06em]">
                      <Link href={`/admin/${def.key}/${id}`} className="text-forest hover:text-gold-ink">Edit</Link>
                      {st !== "published" && (
                        <form action={changeStatus.bind(null, def.key, id, "published")}><button className="text-gold-ink hover:underline">Publish</button></form>
                      )}
                      {st === "published" && (
                        <form action={changeStatus.bind(null, def.key, id, "draft")}><button className="text-body-2 hover:underline">Unpublish</button></form>
                      )}
                      {st !== "archived" && (
                        <form action={changeStatus.bind(null, def.key, id, "archived")}><button className="text-body-2 hover:underline">Archive</button></form>
                      )}
                      {def.publicPath && st === "published" && (
                        <a href={`${def.publicPath}/${String(r.slug)}`} target="_blank" className="text-body-2 hover:text-gold-ink">View ↗</a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td className={td} colSpan={def.columns.length + 3}>Nothing here yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
