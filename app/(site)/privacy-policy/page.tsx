import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return pageMetadata({ path: "/privacy-policy", title: "Privacy Policy | Insight Advora LLP", description: "Privacy Policy for www.insightadvora.com." });
}

// Final wording to be supplied by the client / legal counsel.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>[ Privacy Policy content to be supplied by the client or its legal counsel. ]</p>
      <h2>Information we collect</h2>
      <p>[ Describe the information collected through the contact form, newsletter sign-up and resource requests. ]</p>
      <h2>How we use information</h2>
      <p>[ To be supplied. ]</p>
      <h2>Contact</h2>
      <p>[ Data protection contact details. ]</p>
    </LegalPage>
  );
}
