import Link from "next/link";
import { LegalPage } from "@/components/site/LegalPage";
import { defaultSettings } from "@/content/site";
import { getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export function generateMetadata() {
  return pageMetadata({
    path: "/privacy-policy",
    title: "Privacy Policy | Insight Advora LLP",
    description: "How Insight Advora LLP collects, uses and protects personal data submitted through www.insightadvora.com.",
  });
}

// Drafted for review by the firm's legal counsel before relying on it.
export default async function PrivacyPolicyPage() {
  const s = await getSettings();
  const email = s.email || "info@insightjuris.in";
  const address = (s.address || defaultSettings.address || "").replace(/\n/g, " ");

  return (
    <LegalPage title="Privacy Policy">
      <p>
        <em>Last updated: 30 September 2026</em>
      </p>
      <p>
        This Privacy Policy explains how Insight Advora LLP (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, stores and protects
        personal data when you visit www.insightadvora.com (the &ldquo;website&rdquo;) or contact us through it. We process personal
        data in accordance with the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000 and the rules
        made under them.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Insight Advora LLP is a limited liability partnership with its registered office at {address}. For this website, we are the
        data fiduciary: we decide why and how your personal data is processed.
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect only the information you choose to give us, and a small amount of technical information needed to run the website.</p>
      <ul>
        <li>
          <strong>Enquiry form:</strong> your name, organisation, designation, email address, phone number, area of interest, your
          message and the page from which you sent it.
        </li>
        <li>
          <strong>Newsletter sign-up:</strong> your email address and, if you provide them, your name, organisation and topics of
          interest.
        </li>
        <li>
          <strong>Emails and calls:</strong> the information you share when you write to us or speak with us.
        </li>
        <li>
          <strong>Technical information:</strong> your IP address is processed briefly to protect our forms from spam and abuse. It is
          not stored with your enquiry. Our hosting provider keeps standard server logs for security and reliability.
        </li>
      </ul>
      <p>Please do not send us sensitive personal data, such as financial, health or identity documents, through the website.</p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and discuss how we might work with you.</li>
        <li>To send the newsletter or insights you asked for. You can unsubscribe at any time by emailing us.</li>
        <li>To keep the website secure, prevent spam and fix technical problems.</li>
        <li>To meet our legal, accounting and regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal data, and we do not use it for advertising profiles.</p>

      <h2>4. Your consent</h2>
      <p>
        By submitting a form, you consent to us processing the information in it for the purpose described above. You may withdraw
        your consent at any time by writing to <a href={`mailto:${email}`}>{email}</a>. Withdrawal does not affect processing that
        took place before it.
      </p>

      <h2>5. Who we share it with</h2>
      <p>We share personal data only with service providers that help us run the website, under contracts that require them to protect it:</p>
      <ul>
        <li>
          <strong>Supabase</strong>, which hosts our database in its Mumbai (India) region and stores enquiries and newsletter sign-ups.
        </li>
        <li>
          <strong>Vercel</strong>, which hosts the website. Its servers and logs may be located outside India.
        </li>
        <li>
          <strong>Google</strong>, which provides the map on our Contact page. When you view that map, Google may receive your IP
          address and set its own cookies under its privacy policy.
        </li>
      </ul>
      <p>
        We may also disclose information where the law requires it, or to protect our rights, our clients or the public. Where data
        is processed outside India, we do so only to countries not restricted by the Government of India.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep enquiry details for as long as needed to respond to you and maintain our business records, and newsletter details until
        you unsubscribe. After that we delete or anonymise them, unless the law requires us to keep them longer.
      </p>

      <h2>7. How we protect it</h2>
      <p>
        The website uses encrypted connections (HTTPS). Our database is protected by access controls and row-level security, and only
        authorised members of our team can view enquiries through a password-protected admin area. No method of transmission or storage
        is completely secure, but we take reasonable steps to protect your data.
      </p>

      <h2>8. Your rights</h2>
      <p>Subject to applicable law, you have the right to:</p>
      <ul>
        <li>ask for a summary of the personal data we hold about you and how we use it;</li>
        <li>ask us to correct, complete or update it;</li>
        <li>ask us to erase it, where we no longer need it or you withdraw consent;</li>
        <li>withdraw consent and unsubscribe from our communications;</li>
        <li>raise a grievance with us, and escalate it to the Data Protection Board of India if it is not resolved; and</li>
        <li>nominate another person to exercise these rights on your behalf in the event of death or incapacity.</li>
      </ul>
      <p>
        To exercise any of these rights, email <a href={`mailto:${email}`}>{email}</a>. We may need to verify your identity before
        acting on a request.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Our public pages do not use advertising or tracking cookies. We use one strictly necessary cookie to keep authorised staff
        signed in to the admin area. The Google map on the Contact page may set Google&rsquo;s own cookies. If we add analytics in
        future, we will update this policy first.
      </p>

      <h2>10. Children</h2>
      <p>This website is intended for businesses and professionals. We do not knowingly collect personal data from anyone under 18.</p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it last changed. Significant changes will be
        highlighted on this page.
      </p>

      <h2>12. Contact and grievances</h2>
      <p>
        For questions, requests or complaints about your personal data, contact our Grievance Officer at{" "}
        <a href={`mailto:${email}`}>{email}</a>
        {s.phone ? <>, {s.phone}</> : null}, or write to Insight Advora LLP, {address}. We will acknowledge your request promptly and
        aim to resolve it within 30 days.
      </p>
      <p>
        See also our <Link href="/terms-of-use">Terms of Use</Link> and <Link href="/disclaimer">Disclaimer</Link>.
      </p>
    </LegalPage>
  );
}
