import type { TeamCategoryItem, TeamMemberItem } from "@/lib/types";

// Generated from the client's design data files (docs/design/*.js). Edit the content here,
// or manage it in the admin panel once the database is connected.
// Placeholder profiles only. Replace every [ bracketed ] value with client-supplied
// details — never invent names, qualifications or biographies.
export const teamCategories: TeamCategoryItem[] = [
  {
    "slug": "leadership",
    "name": "Leadership",
    "note": "Guiding the firm. Shaping the perspective."
  },
  {
    "slug": "advisory",
    "name": "Advisory Team",
    "note": "Client-facing advisory across practices."
  },
  {
    "slug": "functional",
    "name": "Functional Specialists",
    "note": "Deep expertise in a single discipline."
  },
  {
    "slug": "associates",
    "name": "Strategic Associates",
    "note": "Engaged for specific assignments and mandates."
  },
  {
    "slug": "domain",
    "name": "Domain Experts",
    "note": "Sector and regulatory perspective."
  }
];

export const team: TeamMemberItem[] = [
  {
    "slug": "leadership-1",
    "name": "[ Team Member Name ]",
    "designation": "[ Designated Partner ]",
    "qualification": "[ Qualifications ]",
    "category": "leadership",
    "categoryName": "Leadership",
    "expertise": [
      "Strategy",
      "Operations",
      "Corporate Advisory"
    ],
    "bio": "[ Short biography — 80 to 120 words. Describe professional background, the kinds of engagements this person leads, the disciplines they bring together and the perspective they contribute to client work. Keep it factual: roles held, functional depth and areas of focus, without claims that cannot be evidenced. ]",
    "focus": [
      "[ Professional focus — two or three sentences on the problems this person works on most often and how they approach them. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": true
  },
  {
    "slug": "leadership-2",
    "name": "[ Team Member Name ]",
    "designation": "[ Designated Partner ]",
    "qualification": "[ Qualifications ]",
    "category": "leadership",
    "categoryName": "Leadership",
    "expertise": [
      "ESG",
      "EHS",
      "Sustainability"
    ],
    "bio": "[ Short biography — 80 to 120 words. Describe professional background, the kinds of engagements this person leads, the disciplines they bring together and the perspective they contribute to client work. ]",
    "focus": [
      "[ Professional focus — two or three sentences on the problems this person works on most often and how they approach them. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": true
  },
  {
    "slug": "advisory-1",
    "name": "[ Team Member Name ]",
    "designation": "[ Designation ]",
    "qualification": "[ Qualifications ]",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "Operational Excellence",
      "Process Improvement"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": true
  },
  {
    "slug": "advisory-2",
    "name": "[ Team Member Name ]",
    "designation": "[ Designation ]",
    "qualification": "[ Qualifications ]",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "M&A",
      "Due Diligence",
      "Integration"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "advisory-3",
    "name": "[ Team Member Name ]",
    "designation": "[ Designation ]",
    "qualification": "[ Qualifications ]",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "Business Growth",
      "Transformation"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "functional-1",
    "name": "[ Team Member Name ]",
    "designation": "[ Designation ]",
    "qualification": "[ Qualifications ]",
    "category": "functional",
    "categoryName": "Functional Specialists",
    "expertise": [
      "EHS Compliance",
      "Audits",
      "Risk"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "functional-2",
    "name": "[ Team Member Name ]",
    "designation": "[ Designation ]",
    "qualification": "[ Qualifications ]",
    "category": "functional",
    "categoryName": "Functional Specialists",
    "expertise": [
      "Sustainability Reporting",
      "ESG Assessment"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "associates-1",
    "name": "[ Team Member Name ]",
    "designation": "[ Strategic Associate ]",
    "qualification": "[ Qualifications ]",
    "category": "associates",
    "categoryName": "Strategic Associates",
    "expertise": [
      "Strategy",
      "Decision Support"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "associates-2",
    "name": "[ Team Member Name ]",
    "designation": "[ Strategic Associate ]",
    "qualification": "[ Qualifications ]",
    "category": "associates",
    "categoryName": "Strategic Associates",
    "expertise": [
      "Performance Management"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "domain-1",
    "name": "[ Team Member Name ]",
    "designation": "[ Domain Expert ]",
    "qualification": "[ Qualifications ]",
    "category": "domain",
    "categoryName": "Domain Experts",
    "expertise": [
      "Manufacturing",
      "Infrastructure"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "domain-2",
    "name": "[ Team Member Name ]",
    "designation": "[ Domain Expert ]",
    "qualification": "[ Qualifications ]",
    "category": "domain",
    "categoryName": "Domain Experts",
    "expertise": [
      "Energy & Environment",
      "Regulatory"
    ],
    "bio": "[ Short biography — 80 to 120 words. ]",
    "focus": [
      "[ Professional focus. ]"
    ],
    "photo": null,
    "linkedin": null,
    "featured": false
  }
];

/** Show the "Build the Future With Us" careers block (overridden by Website Settings once the DB is connected). */
export const careersActive = true;
