export type Status = "draft" | "review" | "published" | "archived";

export type Faq = { q: string; a: string };

export type ServiceItem = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  headline: string;
  description: string;
  icon: string;
  /** The problem statement used by the "What Are You Looking to Solve?" selector. */
  challenge: string;
  capabilities: string[];
  /** "How the work moves" — four states. */
  flow: string[];
  challenges: string[];
  perspective: string;
  outcomes: string[];
  related: string[];
  industries: string[];
  faq: Faq[];
  seoTitle?: string | null;
  metaDescription?: string | null;
};

export type IndustryItem = {
  slug: string;
  number: string;
  name: string;
  headline: string;
  summary: string;
  context: string;
  scopeNote?: string | null;
  considerations: string[];
  challenges: string[];
  topics: string[];
  services: string[];
  seoTitle?: string | null;
  metaDescription?: string | null;
};

export type TeamCategoryItem = { slug: string; name: string };

export type TeamMemberItem = {
  slug: string;
  name: string;
  designation: string;
  qualification?: string | null;
  category: string;
  categoryName: string;
  expertise: string[];
  bio?: string | null;
  focus: string[];
  photo?: string | null;
  linkedin?: string | null;
  featured: boolean;
};

export type AuthorItem = { slug: string; name: string; role?: string | null; bio?: string | null; linkedin?: string | null };

export type ArticleItem = {
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  body: string;
  keyTakeaways: string[];
  featuredImage?: string | null;
  readingTime: number;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  category: string;
  categoryName: string;
  contentType: string;
  contentTypeName: string;
  author: AuthorItem | null;
  industries: string[];
  services: string[];
  tags: string[];
  seoTitle?: string | null;
  metaDescription?: string | null;
};

export type ResourceItem = {
  slug: string;
  title: string;
  description: string;
  resourceType: string;
  fileUrl?: string | null;
  gated: boolean;
};

export type Taxonomy = { slug: string; name: string };

export type SiteSettingsItem = {
  firmName: string;
  tagline: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  officeHours: string | null;
  mapEmbedUrl: string | null;
  linkedin: string | null;
  footerText: string | null;
  copyrightYear: number;
  gaId: string | null;
  gtmId: string | null;
  careersActive: boolean;
};
