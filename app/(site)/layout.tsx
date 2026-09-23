import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Analytics } from "@/components/site/Analytics";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Analytics gaId={settings.gaId} gtmId={settings.gtmId} />
    </>
  );
}
