import { deleteMedia } from "@/app/admin/actions";
import { CopyUrl, UploadForm } from "@/components/admin/Forms";
import { PageHeader } from "@/components/admin/PageHeader";
import { ConfirmButton } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "Media library" };

export default async function MediaPage({ searchParams }: PageProps<"/admin/media">) {
  const user = await requireUser();
  const bucket = (await searchParams).bucket;
  const items = await prisma.media.findMany({
    where: typeof bucket === "string" && bucket ? { bucket } : {},
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  return (
    <>
      <PageHeader title="Media library" sub="Files are stored in Supabase Storage buckets: team, services, knowledge, general." />
      {!configured && (
        <p className="mb-6 border border-danger/40 bg-danger/[0.06] p-3 text-danger">
          Uploads need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only) to be set.
        </p>
      )}
      <UploadForm />
      <nav className="mt-6 flex gap-4 text-[12px] font-semibold uppercase tracking-[0.08em]">
        {["", "general", "team", "services", "knowledge"].map((b) => (
          <a key={b} href={b ? `/admin/media?bucket=${b}` : "/admin/media"} className={(bucket ?? "") === b ? "text-gold-ink underline" : "text-body-2 hover:text-forest"}>
            {b || "All"}
          </a>
        ))}
      </nav>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {items.map((m) => (
          <li key={m.id} className="border border-hairline bg-white">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-card-alt">
              {m.mimeType.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-body-2">{m.mimeType.split("/")[1]}</span>
              )}
            </div>
            <div className="space-y-2 p-3">
              <p className="truncate text-[13px] text-forest" title={m.name}>{m.name}</p>
              <p className="text-[11.5px] text-body-2">{m.bucket} · {(m.size / 1024).toFixed(0)} KB</p>
              <div className="flex items-center gap-4">
                <CopyUrl url={m.url} />
                <a href={m.url} target="_blank" className="text-[11.5px] text-body-2 hover:text-forest">Open ↗</a>
                {user.role === "admin" && <ConfirmButton action={deleteMedia.bind(null, m.id)} label="Delete" confirm="Delete this file permanently?" className="!text-[11.5px]" />}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className="mt-6 text-body-2">No files yet.</p>}
    </>
  );
}
