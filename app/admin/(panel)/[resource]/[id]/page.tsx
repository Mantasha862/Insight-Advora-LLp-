import { notFound } from "next/navigation";
import { removeResource, saveResource } from "@/app/admin/actions";
import { PageHeader, StatusBadge } from "@/components/admin/PageHeader";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { ConfirmButton } from "@/components/admin/ui";
import { getRow, relationOptions } from "@/lib/admin/crud";
import { getResourceDef } from "@/lib/admin/resources";
import { requireUser } from "@/lib/auth";

export default async function EditResource({ params, searchParams }: PageProps<"/admin/[resource]/[id]">) {
  const user = await requireUser();
  const { resource, id } = await params;
  const def = getResourceDef(resource);
  if (!def) notFound();
  const [row, options] = await Promise.all([getRow(def, id), relationOptions(def)]);
  if (!row) notFound();
  const saved = Boolean((await searchParams).saved);
  const status = String(row.status ?? "");

  return (
    <>
      <PageHeader
        title={String(row[def.titleField] ?? def.singular)}
        back={{ href: `/admin/${def.key}`, label: def.label }}
        sub={
          <span className="flex items-center gap-3">
            <StatusBadge status={status} />
            {row.isDemo ? <span className="text-gold-ink">Demo seed content — replace or delete before launch.</span> : null}
          </span>
        }
        actions={
          <>
            {def.publicPath && status === "published" && (
              <a href={`${def.publicPath}/${String(row.slug)}`} target="_blank" className="text-[12px] text-body-2 hover:text-gold-ink">
                View on site ↗
              </a>
            )}
            {user.role === "admin" && (
              <ConfirmButton action={removeResource.bind(null, def.key, id)} label="Delete" confirm={`Permanently delete this ${def.singular.toLowerCase()}?`} />
            )}
          </>
        }
      />
      <ResourceForm key={String(row.updatedAt)} def={def} row={row} options={options} action={saveResource.bind(null, def.key, id)} saved={saved} />
    </>
  );
}
