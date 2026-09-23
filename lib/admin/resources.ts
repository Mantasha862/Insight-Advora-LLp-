// Config-driven CRUD definitions for the admin panel. Pure data so it can be
// shared by server actions (validation/persistence) and client forms.

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "list"
  | "faq"
  | "select"
  | "image"
  | "date"
  | "relation"
  | "m2m";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  max?: number;
  help?: string;
  options?: string[];
  /** relation / m2m: resource key of the options source */
  source?: string;
  /** m2m: join model + keys */
  join?: { model: string; selfKey: string; otherKey: string };
  /** Group into the right-hand "Settings" column */
  side?: boolean;
};

export type ResourceDef = {
  key: string;
  label: string;
  singular: string;
  model: string;
  titleField: string;
  /** Public URL prefix for "View" links */
  publicPath?: string;
  bucket?: "team" | "services" | "knowledge" | "general";
  columns: { name: string; label: string }[];
  fields: Field[];
  hasStatus: boolean;
};

const seoFields: Field[] = [
  { name: "seoTitle", label: "SEO title", type: "text", max: 160, side: true },
  { name: "metaDescription", label: "Meta description", type: "textarea", max: 320, side: true },
  { name: "ogImage", label: "OG image URL", type: "image", side: true },
];

const common = (extra: Field[] = []): Field[] => [
  { name: "slug", label: "Slug", type: "text", max: 96, help: "Leave blank to generate from the title.", side: true },
  { name: "displayOrder", label: "Display order", type: "number", side: true },
  ...extra,
  ...seoFields,
];

const simpleTaxonomy = (key: string, label: string, singular: string, model: string, extra: Field[] = []): ResourceDef => ({
  key,
  label,
  singular,
  model,
  titleField: "name",
  columns: [
    { name: "name", label: "Name" },
    { name: "slug", label: "Slug" },
  ],
  hasStatus: true,
  fields: [{ name: "name", label: "Name", type: "text", required: true, max: 120 }, ...extra, ...common()],
});

export const resources: ResourceDef[] = [
  {
    key: "articles",
    label: "Articles",
    singular: "Article",
    model: "article",
    titleField: "title",
    publicPath: "/knowledge-hub",
    bucket: "knowledge",
    hasStatus: true,
    columns: [
      { name: "title", label: "Title" },
      { name: "publishedAt", label: "Published" },
      { name: "featured", label: "Featured" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 200 },
      { name: "subtitle", label: "Subtitle", type: "text", max: 300 },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true, max: 600 },
      { name: "body", label: "Body", type: "richtext", required: true },
      { name: "keyTakeaways", label: "Key takeaways", type: "list", help: "One per line." },
      { name: "featuredImage", label: "Featured image", type: "image" },
      { name: "categoryId", label: "Category", type: "relation", source: "categories", side: true },
      { name: "contentTypeId", label: "Content type", type: "relation", source: "content-types", side: true },
      { name: "authorId", label: "Author", type: "relation", source: "authors", side: true },
      { name: "industries", label: "Industries", type: "m2m", source: "industries", join: { model: "articleIndustry", selfKey: "articleId", otherKey: "industryId" }, side: true },
      { name: "services", label: "Services", type: "m2m", source: "services", join: { model: "articleService", selfKey: "articleId", otherKey: "serviceId" }, side: true },
      { name: "tags", label: "Tags", type: "m2m", source: "tags", join: { model: "articleTag", selfKey: "articleId", otherKey: "tagId" }, side: true },
      { name: "featured", label: "Featured insight (only one)", type: "boolean", side: true },
      { name: "publishedAt", label: "Publish date", type: "date", side: true, help: "Set automatically on first publish." },
      { name: "readingTime", label: "Reading time (min)", type: "number", side: true, help: "Leave 0 to calculate." },
      ...common(),
    ],
  },
  {
    key: "team",
    label: "Team",
    singular: "Team member",
    model: "teamMember",
    titleField: "name",
    publicPath: "/team",
    bucket: "team",
    hasStatus: true,
    columns: [
      { name: "name", label: "Name" },
      { name: "designation", label: "Designation" },
      { name: "featured", label: "Featured" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 120 },
      { name: "designation", label: "Designation", type: "text", required: true, max: 160 },
      { name: "qualification", label: "Qualification", type: "text", max: 200 },
      { name: "bio", label: "Biography", type: "textarea", max: 5000 },
      { name: "expertise", label: "Expertise", type: "list", help: "One per line." },
      { name: "focus", label: "Professional focus", type: "list", help: "One per line." },
      { name: "photo", label: "Photo", type: "image" },
      { name: "linkedin", label: "LinkedIn URL", type: "text", max: 300 },
      { name: "categoryId", label: "Category", type: "relation", source: "team-categories", side: true },
      { name: "featured", label: "Featured on home page", type: "boolean", side: true },
      ...common(),
    ],
  },
  {
    key: "services",
    label: "Services",
    singular: "Service",
    model: "service",
    titleField: "title",
    publicPath: "/services",
    bucket: "services",
    hasStatus: true,
    columns: [
      { name: "number", label: "No." },
      { name: "title", label: "Title" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 160 },
      { name: "shortTitle", label: "Short title", type: "text", required: true, max: 40 },
      { name: "number", label: "Number (e.g. 01)", type: "text", required: true, max: 4 },
      { name: "headline", label: "Italic headline", type: "text", required: true, max: 200 },
      { name: "description", label: "Description", type: "textarea", required: true, max: 2000 },
      { name: "challenge", label: "Challenge (for the selector)", type: "text", max: 200 },
      { name: "capabilities", label: "Capabilities", type: "list", help: "One per line." },
      { name: "flow", label: "How the work moves", type: "list", help: "Four states, one per line." },
      { name: "challenges", label: "The challenge", type: "list", help: "One per line." },
      { name: "perspective", label: "Our perspective", type: "textarea", max: 2000 },
      { name: "outcomes", label: "What success can look like", type: "list", help: "Phrase as potential, never guaranteed." },
      { name: "related", label: "Related service slugs", type: "list", help: "One slug per line." },
      { name: "faq", label: "FAQ", type: "faq", help: "Question line, answer line, blank line between items." },
      { name: "icon", label: "Icon", type: "select", options: ["strategy", "operations", "growth", "transactions", "ehs", "esg"], side: true },
      ...common(),
    ],
  },
  {
    key: "industries",
    label: "Industries",
    singular: "Industry",
    model: "industry",
    titleField: "name",
    publicPath: "/industries",
    hasStatus: true,
    columns: [
      { name: "number", label: "No." },
      { name: "name", label: "Name" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 120 },
      { name: "number", label: "Number (e.g. 01)", type: "text", required: true, max: 4 },
      { name: "headline", label: "Italic headline", type: "text", required: true, max: 200 },
      { name: "summary", label: "Summary", type: "textarea", required: true, max: 400 },
      { name: "context", label: "Operating context", type: "textarea", required: true, max: 3000 },
      { name: "scopeNote", label: "Scope note", type: "textarea", max: 1000 },
      { name: "considerations", label: "Key business considerations", type: "list" },
      { name: "challenges", label: "Challenges we can help address", type: "list" },
      { name: "topics", label: "Topic (category) slugs", type: "list", help: "Used to score related articles." },
      { name: "services", label: "Services", type: "m2m", source: "services", join: { model: "industryService", selfKey: "industryId", otherKey: "serviceId" }, side: true },
      ...common(),
    ],
  },
  {
    key: "resources",
    label: "Resources",
    singular: "Resource",
    model: "resource",
    titleField: "title",
    bucket: "knowledge",
    hasStatus: true,
    columns: [
      { name: "title", label: "Title" },
      { name: "resourceType", label: "Type" },
      { name: "gated", label: "Gated" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 200 },
      { name: "description", label: "Description", type: "textarea", required: true, max: 600 },
      { name: "resourceType", label: "Type", type: "text", max: 40 },
      { name: "fileUrl", label: "File", type: "image", help: "Upload in the Media library and paste the URL." },
      { name: "gated", label: "Requires form", type: "boolean", side: true },
      ...common(),
    ],
  },
  simpleTaxonomy("categories", "Categories", "Category", "category", [{ name: "description", label: "Description", type: "textarea", max: 500 }]),
  simpleTaxonomy("content-types", "Content Types", "Content type", "contentType", [{ name: "description", label: "Description", type: "textarea", max: 500 }]),
  simpleTaxonomy("tags", "Tags", "Tag", "tag"),
  simpleTaxonomy("team-categories", "Team Categories", "Team category", "teamCategory", [{ name: "description", label: "Description", type: "textarea", max: 500 }]),
  {
    ...simpleTaxonomy("authors", "Authors", "Author", "author"),
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 120 },
      { name: "role", label: "Role / designation", type: "text", max: 160 },
      { name: "bio", label: "Bio", type: "textarea", max: 2000 },
      { name: "photo", label: "Photo", type: "image" },
      { name: "linkedin", label: "LinkedIn URL", type: "text", max: 300 },
      ...common(),
    ],
  },
];

export function getResourceDef(key: string) {
  return resources.find((r) => r.key === key) ?? null;
}

export const STATUSES = ["draft", "review", "published", "archived"] as const;
