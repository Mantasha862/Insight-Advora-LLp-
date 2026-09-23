import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsForm } from "@/components/admin/Forms";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "Website settings" };

export default async function SettingsPage() {
  await requireUser("admin");
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const values = s
    ? { ...s, socialLinks: null, updatedAt: null }
    : { firmName: "Insight Advora LLP", tagline: "Partnering for Smarter Decisions", copyrightYear: 2026, careersActive: false };
  return (
    <>
      <PageHeader title="Website settings" sub="Contact details here are shown in the footer and on the Contact page." />
      <SettingsForm values={values as Record<string, string | number | boolean | null>} />
    </>
  );
}
