import Link from "next/link";
import { PageHeader, secondaryLink, StatusBadge, table, td, th } from "@/components/admin/PageHeader";
import { areasOfInterest } from "@/content/site";
import { filtersFrom, listLeads } from "@/lib/admin/leads";
import { requireUser } from "@/lib/auth";

export const metadata = { title: "Enquiries" };

export default async function EnquiriesPage({ searchParams }: PageProps<"/admin/enquiries">) {
  await requireUser("admin");
  const sp = await searchParams;
  const f = filtersFrom(sp);
  const leads = await listLeads(f);
  const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <>
      <PageHeader
        title="Enquiries"
        sub={`${leads.length} shown · contact-form submissions from the live leads table`}
        actions={<a href={`/admin/export/enquiries${qs ? `?${qs}` : ""}`} className={secondaryLink}>Export CSV</a>}
      />
      <form className="mb-5 flex flex-wrap items-end gap-3">
        <input name="q" defaultValue={f.q} placeholder="Search name, email, company, message…" className="field !w-72 !py-2 !text-[14px]" />
        <select name="status" defaultValue={f.status ?? ""} className="field !w-40 !py-2 !text-[14px]">
          <option value="">All statuses</option>
          {["new", "contacted", "in_progress", "closed"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <select name="area" defaultValue={f.area ?? ""} className="field !w-52 !py-2 !text-[14px]">
          <option value="">All areas</option>
          {areasOfInterest.map((a) => <option key={a}>{a}</option>)}
        </select>
        <label className="text-[11px] text-body-2">From <input type="date" name="from" defaultValue={f.from} className="field !w-40 !py-2 !text-[14px]" /></label>
        <label className="text-[11px] text-body-2">To <input type="date" name="to" defaultValue={f.to} className="field !w-40 !py-2 !text-[14px]" /></label>
        <button className="h-[42px] border border-hairline-strong px-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-forest hover:border-gold">Filter</button>
        <Link href="/admin/enquiries" className="text-[12px] text-body-2 underline">Reset</Link>
      </form>
      <div className="overflow-x-auto">
        <table className={table}>
          <thead>
            <tr>
              {["Received", "Name", "Email", "Company", "Area", "Status"].map((h) => <th key={h} className={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-ivory-2/60">
                <td className={`${td} whitespace-nowrap`}>{l.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td className={td}><Link href={`/admin/enquiries/${l.id}`} className="font-medium text-forest hover:text-gold-ink">{l.name}</Link></td>
                <td className={td}>{l.email}</td>
                <td className={td}>{l.company ?? "—"}</td>
                <td className={td}>{l.areaOfInterest}</td>
                <td className={td}><StatusBadge status={l.status} /></td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td className={td} colSpan={6}>No enquiries match.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
