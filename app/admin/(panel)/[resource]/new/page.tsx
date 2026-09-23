import { notFound } from "next/navigation";
import { saveResource } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/PageHeader";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { relationOptions } from "@/lib/admin/crud";
import { getResourceDef } from "@/lib/admin/resources";
import { requireUser } from "@/lib/auth";

export default async function NewResource({ params }: PageProps<"/admin/[resource]/new">) {
  await requireUser();
  const { resource } = await params;
  const def = getResourceDef(resource);
  if (!def) notFound();
  const options = await relationOptions(def);
  return (
    <>
      <PageHeader title={`New ${def.singular.toLowerCase()}`} back={{ href: `/admin/${def.key}`, label: def.label }} />
      <ResourceForm def={def} row={null} options={options} action={saveResource.bind(null, def.key, null)} />
    </>
  );
}
