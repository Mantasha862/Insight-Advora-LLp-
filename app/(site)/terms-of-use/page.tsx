import Link from "next/link";
import { LegalPage } from "@/components/site/LegalPage";
import { defaultSettings } from "@/content/site";
import { getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/terms-of-use",
    title: "Terms of Use | Insight Advora LLP",
    description: "The terms that apply when you use www.insightadvora.com.",
  });
}

// Drafted for review by the firm's legal counsel before relying on it.
export default async function TermsOfUsePage() {
  const s = await getSettings();
  const email = s.email || "info@insightjuris.in";
  const address = (s.address || defaultSettings.address || "").replace(/\n/g, " ");

  return (
    <LegalPage title="Terms of Use">
      <p>
        <em>Last updated: 30 September 2026</em>
      </p>
      <p>
        These Terms of Use apply to your use of www.insightadvora.com (the &ldquo;website&rdquo;), operated by Insight Advora LLP
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;), with its registered office at {address}. By using the website you agree to these terms.
        If you do not agree, please do not use the website.
      </p>

      <h2>1. Information only, not professional advice</h2>
      <p>
        The content on this website, including articles, insights and resources in the Knowledge Hub, is general information. It is
        not professional advice and should not be relied on as a basis for any decision without advice specific to your situation.
      </p>
      <p>
        Insight Advora LLP provides advisory support; it does not provide legal, audit, tax, investment banking, regulated investment,
        securities or banking advice, or clinical, medical or regulatory approval services. Certification is carried out by accredited
        certification bodies and assurance by independent assurance providers. See our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>2. No client relationship</h2>
      <p>
        Using the website, reading its content or sending us an enquiry does not create a client or advisory relationship. An
        engagement begins only when both parties sign a written engagement letter or agreement, whose terms then govern our services.
      </p>

      <h2>3. Using the website</h2>
      <p>You may use the website for lawful purposes. You must not:</p>
      <ul>
        <li>submit false, misleading or unlawful information, or impersonate anyone;</li>
        <li>attempt to gain unauthorised access to the website, its admin area, servers or database;</li>
        <li>introduce viruses or harmful code, or interfere with the website&rsquo;s operation or security;</li>
        <li>use automated tools to scrape, copy or overload the website; or</li>
        <li>send spam or unsolicited promotional material through our forms.</li>
      </ul>
      <p>We may restrict or block access where we reasonably believe these terms have been breached.</p>

      <h2>4. Intellectual property</h2>
      <p>
        The Insight Advora name, IA monogram, logos, website design, text, graphics, articles and downloadable resources belong to
        Insight Advora LLP or its licensors and are protected by law. You may view, download and print pages for your own
        non-commercial reference. You may not copy, republish, modify or distribute our content, or use our name or logos, without
        our written permission. Short quotations with a clear attribution and a link to the source page are welcome.
      </p>

      <h2>5. Enquiries and communications</h2>
      <p>
        When you contact us through the website, the information you provide is handled under our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. Please do not send confidential or sensitive information through the website
        before an engagement is agreed.
      </p>

      <h2>6. Third-party links and services</h2>
      <p>
        The website may link to or display content from third parties, such as Google Maps or LinkedIn. We do not control and are not
        responsible for their content, availability or privacy practices.
      </p>

      <h2>7. Accuracy and availability</h2>
      <p>
        We aim to keep the website accurate and available, but we do not guarantee that it is complete, current, uninterrupted or
        error-free. We may change, suspend or remove any part of it at any time without notice.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Insight Advora LLP and its partners and team are not liable for any direct, indirect or
        consequential loss arising from your use of, or reliance on, the website or its content. Nothing in these terms limits
        liability that cannot be limited under applicable law.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top shows when they last changed. Continuing to use the website
        after a change means you accept the updated terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of India. The courts at Gurugram, Haryana have exclusive jurisdiction over any dispute
        arising from them or from your use of the website.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${email}`}>{email}</a>
        {s.phone ? <> or {s.phone}</> : null}.
      </p>
    </LegalPage>
  );
}
