import { notFound } from "next/navigation";
import { updateLead } from "@/app/admin/actions";
import { LeadForm } from "@/components/admin/LeadForm";
import { PageHeader, StatusBadge } from "@/components/admin/PageHeader";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function EnquiryDetail({ params }: PageProps<"/admin/enquiries/[id]">) {
  await requireUser("admin");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();
  const rows: [string, React.ReactNode][] = [
    ["Received", lead.createdAt.toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })],
    ["Email", <a key="e" href={`mailto:${lead.email}`} className="text-gold-ink underline">{lead.email}</a>],
    ["Phone", lead.phone ?? "—"],
    ["Company", lead.company ?? "—"],
    ["Designation", lead.designation ?? "—"],
    ["Area of interest", lead.areaOfInterest],
    ["Source", lead.source],
    ["Page", lead.pageUrl ?? "—"],
  ];
  return (
    <>
      <PageHeader title={lead.name} back={{ href: "/admin/enquiries", label: "Enquiries" }} sub={<StatusBadge status={lead.status} />} />
      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <dl className="grid border border-hairline bg-white sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k} className="border-b border-hairline p-4">
                <dt className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-body-2">{k}</dt>
                <dd className="mt-1 text-forest">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="border border-hairline bg-white p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-body-2">Message</p>
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-body-deep">{lead.message || "—"}</p>
          </div>
        </div>
        <LeadForm action={updateLead.bind(null, lead.id)} status={lead.status} notes={lead.internalNotes ?? ""} />
      </div>
    </>
  );
}
