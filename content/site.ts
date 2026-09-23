import type { SiteSettingsItem } from "@/lib/types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.insightadvora.com").replace(/\/$/, "");

// Defaults used until SiteSettings are saved in the admin panel.
// Contact details are client-supplied; bracketed values render as placeholders.
export const defaultSettings: SiteSettingsItem = {
  firmName: "Insight Advora LLP",
  tagline: "Partnering for Smarter Decisions",
  email: "[ Firm email ]",
  phone: "[ Firm phone ]",
  address: "[ Office address ]",
  officeHours: "[ Office hours ]",
  mapEmbedUrl: null,
  linkedin: null,
  footerText:
    "A multidisciplinary consulting and advisory firm helping organisations turn insight into measurable progress.",
  copyrightYear: 2026,
  gaId: process.env.NEXT_PUBLIC_GA_ID || null,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  careersActive: false,
};

export const nav = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/industries", label: "Industries" },
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
  { title: "Understand", text: "We listen first — to your context, ambitions and constraints." },
  { title: "Diagnose", text: "We build a shared, evidence-based view of the real issues." },
  { title: "Strategize", text: "We shape practical options and agree a clear direction." },
  { title: "Transform", text: "We work alongside your teams to put change into practice." },
  { title: "Sustain", text: "We embed routines and capability so progress endures." },
];

export const howWeWork = [
  { title: "Understand", text: "Clarify objectives, context and what success should look like." },
  { title: "Diagnose", text: "Analyse data and processes to identify root causes." },
  { title: "Design", text: "Co-create practical solutions with the people who will own them." },
  { title: "Enable", text: "Support implementation, capability building and change." },
  { title: "Sustain", text: "Embed measures and routines that help improvements hold." },
];
