import type { TeamCategoryItem, TeamMemberItem } from "@/lib/types";

export const teamCategories: TeamCategoryItem[] = [
  { slug: "leadership", name: "Leadership" },
  { slug: "advisory-team", name: "Advisory Team" },
  { slug: "functional-specialists", name: "Functional Specialists" },
  { slug: "strategic-associates", name: "Strategic Associates" },
  { slug: "domain-experts", name: "Domain Experts" },
];

// Placeholder profiles only. Replace every [ bracketed ] value with client-supplied
// details — never invent names, qualifications or biographies.
const placeholder = (i: number, category: string, categoryName: string, featured = false): TeamMemberItem => ({
  slug: `team-member-${String(i).padStart(2, "0")}`,
  name: "[ Team Member Name ]",
  designation: "[ Designation ]",
  qualification: "[ Qualification ]",
  category,
  categoryName,
  expertise: ["[ Expertise area ]", "[ Expertise area ]", "[ Expertise area ]"],
  bio: "[ Short professional biography — to be supplied by the client. ]",
  focus: ["[ Professional focus area ]", "[ Professional focus area ]"],
  photo: null,
  linkedin: null,
  featured,
});

export const team: TeamMemberItem[] = [
  placeholder(1, "leadership", "Leadership", true),
  placeholder(2, "leadership", "Leadership", true),
  placeholder(3, "advisory-team", "Advisory Team", true),
  placeholder(4, "functional-specialists", "Functional Specialists"),
  placeholder(5, "strategic-associates", "Strategic Associates"),
  placeholder(6, "domain-experts", "Domain Experts"),
];
