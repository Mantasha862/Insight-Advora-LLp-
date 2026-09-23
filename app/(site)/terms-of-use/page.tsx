import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return pageMetadata({ path: "/terms-of-use", title: "Terms of Use | Insight Advora LLP", description: "Terms of Use for www.insightadvora.com." });
}

// Final wording to be supplied by the client / legal counsel.
export default function TermsofUsePage() {
  return (
    <LegalPage title="Terms of Use">
      <p>[ Terms of Use content to be supplied by the client or its legal counsel. ]</p>
      <h2>Use of this website</h2>
      <p>[ To be supplied. ]</p>
    </LegalPage>
  );
}
