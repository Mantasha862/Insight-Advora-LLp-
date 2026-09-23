import Link from "next/link";
import { PageHeader, primaryLink, secondaryLink, StatusBadge, table, td, th } from "@/components/admin/PageHeader";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: PageProps<"/admin">) {
  const user = await requireUser();
  const denied = (await searchParams).denied;
  const [team, services, published, drafts, newLeads, recent] = await Promise.all([
    prisma.teamMember.count({ where: { status: "published" } }),
    prisma.service.count({ where: { status: "published" } }),
    prisma.article.count({ where: { status: "published" } }),
    prisma.article.count({ where: { status: { in: ["draft", "review"] } } }),
    user.role === "admin" ? prisma.lead.count({ where: { status: "new" } }) : Promise.resolve(null),
    user.role === "admin" ? prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }) : Promise.resolve([]),
  ]);
  const stats = [
    { label: "Team members", value: team, href: "/admin/team" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Published articles", value: published, href: "/admin/articles?status=published" },
    { label: "Drafts & in review", value: drafts, href: "/admin/articles?status=draft" },
    ...(newLeads !== null ? [{ label: "New enquiries", value: newLeads, href: "/admin/enquiries?status=new" }] : []),
  ];

  return (
    <>
      <PageHeader title="Dashboard" sub={`Welcome back${user.name ? `, ${user.name}` : ""}.`} />
      {denied && <p className="mb-6 border border-danger/40 bg-danger/[0.06] p-3 text-danger">That area requires the admin role.</p>}
      <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white p-6 hover:bg-ivory-2">
            <p className="font-serif text-[44px] leading-none text-forest">{s.value}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-body-2">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/articles/new" className={primaryLink}>New article</Link>
        <Link href="/admin/team/new" className={secondaryLink}>Add team member</Link>
        <Link href="/admin/media" className={secondaryLink}>Upload media</Link>
        {user.role === "admin" && <Link href="/admin/settings" className={secondaryLink}>Website settings</Link>}
      </div>

      {user.role === "admin" && (
        <section className="mt-10">
          <h2 className="text-[24px]">Recent enquiries</h2>
          <table className={`${table} mt-4`}>
            <thead>
              <tr>
                <th className={th}>Received</th>
                <th className={th}>Name</th>
                <th className={th}>Company</th>
                <th className={th}>Area</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((l) => (
                <tr key={l.id} className="hover:bg-ivory-2/60">
                  <td className={td}>{l.createdAt.toLocaleDateString("en-GB")}</td>
                  <td className={td}>
                    <Link href={`/admin/enquiries/${l.id}`} className="font-medium text-forest hover:text-gold-ink">{l.name}</Link>
                  </td>
                  <td className={td}>{l.company}</td>
                  <td className={td}>{l.areaOfInterest}</td>
                  <td className={td}><StatusBadge status={l.status} /></td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td className={td} colSpan={5}>No enquiries yet.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
