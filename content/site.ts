import type { SiteSettingsItem } from "@/lib/types";
import { careersActive } from "@/content/team";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.insightadvora.com").replace(/\/$/, "");

// Defaults used until SiteSettings are saved in the admin panel.
// Contact details are client-supplied; bracketed values render as placeholders.
export const defaultSettings: SiteSettingsItem = {
  firmName: "Insight Advora LLP",
  tagline: "Partnering for Smarter Decisions",
  email: "info@insightjuris.in",
  phone: "+91 124-4462410",
  address: "363A, JMD Empire, 3rd Floor, Block D,\nSector 62, Gurugram, Haryana 122102",
  officeHours: "Monday to Friday, 10:00 – 18:00 IST",
  mapEmbedUrl: "https://maps.google.com/maps?q=JMD%20Empire%2C%20Sector%2062%2C%20Gurugram%2C%20Haryana%20122102&z=16&output=embed",
  linkedin: null,
  footerText:
    "Strategic advisory, operational excellence and sustainability solutions for organizations navigating growth and transformation.",
  copyrightYear: 2026,
  gaId: process.env.NEXT_PUBLIC_GA_ID || null,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  careersActive,
};

/** "Open in Google Maps" link for the registered office. */
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=JMD%20Empire%2C%20Sector%2062%2C%20Gurugram%2C%20Haryana%20122102";

/** tel: href from a display phone number, e.g. "+91 124-4462410" → "tel:+911244462410". */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our Team" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/contact", label: "Contact" },
];

export const philosophy = ["People", "Process", "Planet", "Progress"] as const;

export const areasOfInterest = [
  "Operational Excellence",
  "Business Growth",
  "M&A / Transactions",
  "EHS",
  "ESG & Sustainability",
  "Strategy & Advisory",
  "Other",
] as const;

export const approach = [
  { title: "Understand", text: "Context, objectives and constraints, clarified with the people who run the business." },
  { title: "Diagnose", text: "Structured analysis of processes, performance, risk and compliance realities." },
  { title: "Strategize", text: "Options framed with trade-offs, sequencing and decision criteria made explicit." },
  { title: "Transform", text: "Execution support that turns decisions into operating changes on the ground." },
  { title: "Sustain", text: "Governance, measurement and capability so improvement holds over time." },
];

export const howWeWork = [
  { title: "Understand", text: "Clarify objectives, context and what success should look like." },
  { title: "Diagnose", text: "Analyse data and processes to identify root causes." },
  { title: "Design", text: "Co-create practical solutions with the people who will own them." },
  { title: "Enable", text: "Support implementation, capability building and change." },
  { title: "Sustain", text: "Embed measures and routines that help improvements hold." },
];
