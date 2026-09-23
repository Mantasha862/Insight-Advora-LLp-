import { PageHeader, secondaryLink, table, td, th } from "@/components/admin/PageHeader";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "Subscribers" };

export default async function SubscribersPage({ searchParams }: PageProps<"/admin/subscribers">) {
  await requireUser("admin");
  const q = (await searchParams).q;
  const subs = await prisma.subscriber.findMany({
    where: typeof q === "string" && q ? { email: { contains: q, mode: "insensitive" } } : {},
    orderBy: { createdAt: "desc" },
    take: 1000,
  });
  return (
    <>
      <PageHeader title="Subscribers" sub={`${subs.length} shown`} actions={<a href="/admin/export/subscribers" className={secondaryLink}>Export CSV</a>} />
      <form className="mb-5"><input name="q" defaultValue={typeof q === "string" ? q : ""} placeholder="Search email…" className="field !w-72 !py-2 !text-[14px]" /></form>
      <table className={table}>
        <thead><tr>{["Subscribed", "Email", "Name", "Organisation", "Source", "Status"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s.id}>
              <td className={td}>{s.createdAt.toLocaleDateString("en-GB")}</td>
              <td className={td}>{s.email}</td>
              <td className={td}>{s.name ?? "—"}</td>
              <td className={td}>{s.organisation ?? "—"}</td>
              <td className={td}>{s.source}</td>
              <td className={td}>{s.unsubscribedAt ? "Unsubscribed" : s.confirmed ? "Confirmed" : "Pending"}</td>
            </tr>
          ))}
          {subs.length === 0 && <tr><td className={td} colSpan={6}>No subscribers yet.</td></tr>}
        </tbody>
      </table>
    </>
  );
}
