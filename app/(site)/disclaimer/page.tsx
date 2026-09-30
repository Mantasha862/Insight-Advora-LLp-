import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return pageMetadata({ path: "/disclaimer", title: "Disclaimer | Insight Advora LLP", description: "Disclaimer for www.insightadvora.com." });
}

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        The information on this website is provided for general information only and does not constitute professional advice.
        Insight Advora LLP provides advisory support; it does not provide legal, audit, tax, investment banking, regulated
        investment, securities or banking advice, or clinical, medical or regulatory approval services. Certification is carried
        out by accredited certification bodies and assurance by independent assurance providers.
      </p>
    </LegalPage>
  );
}
