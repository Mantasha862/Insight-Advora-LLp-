import type { ArticleItem, AuthorItem, ResourceItem, Taxonomy } from "@/lib/types";

export const categories: Taxonomy[] = [
  { slug: "strategy", name: "Strategy" },
  { slug: "operations", name: "Operations" },
  { slug: "growth", name: "Growth" },
  { slug: "transactions", name: "Transactions" },
  { slug: "ehs", name: "EHS" },
  { slug: "sustainability", name: "Sustainability" },
];

export const contentTypes: Taxonomy[] = [
  { slug: "article", name: "Article" },
  { slug: "perspective", name: "Perspective" },
  { slug: "guide", name: "Guide" },
  { slug: "checklist", name: "Checklist" },
];

export const authors: AuthorItem[] = [
  { slug: "placeholder-author", name: "[ Author Name ]", role: "[ Designation ]", bio: "[ Author biography — to be supplied by the client. ]", linkedin: null },
];

const author = authors[0];

// Demo articles (isDemo = true when seeded). Statistics must never be invented —
// use a "[ source: ... ]" placeholder until a verified source is supplied.
export const articles: ArticleItem[] = [
  {
    slug: "from-strategy-to-execution",
    title: "From Strategy to Execution: Closing the Gap",
    subtitle: "Why well-crafted strategies stall — and the practical disciplines that keep them moving.",
    excerpt:
      "Most organisations do not lack strategy. They lack the connective tissue between a plan and the daily decisions that bring it to life.",
    category: "strategy",
    categoryName: "Strategy",
    contentType: "perspective",
    contentTypeName: "Perspective",
    author,
    industries: ["manufacturing", "technology-services"],
    services: ["strategy-advisory", "operational-excellence"],
    tags: ["execution", "governance", "leadership"],
    publishedAt: "2026-06-02",
    updatedAt: "2026-06-02",
    readingTime: 6,
    featured: true,
    featuredImage: null,
    keyTakeaways: [
      "Translate strategic priorities into a small number of owned initiatives.",
      "Connect initiatives to the operating rhythm — reviews, budgets and targets.",
      "Measure leading indicators, not only lagging outcomes.",
      "Revisit assumptions deliberately as conditions change.",
    ],
    body: `<h2>The gap between plan and practice</h2>
<p>A strategy document can be clear, well-researched and endorsed by the board — and still make little difference to what happens on a Monday morning. The gap is rarely about the quality of thinking. It is about whether the strategy has been translated into choices that people can act on.</p>
<p>[ source: add a verified research reference here if a statistic on strategy execution is required ]</p>
<h2>Fewer priorities, clearer ownership</h2>
<p>Execution improves when priorities are few and ownership is unambiguous. Each strategic priority should map to a handful of initiatives, each with a named owner, a defined scope and a realistic timeline.</p>
<ul><li>Limit the number of enterprise-wide priorities.</li><li>Name a single accountable owner for each initiative.</li><li>Make trade-offs explicit — what will stop to make room?</li></ul>
<h2>Connecting strategy to the operating rhythm</h2>
<p>Strategy should appear in the places where decisions are already made: monthly reviews, budget cycles, capital allocation and performance conversations. When it lives only in an annual offsite, it quickly loses momentum.</p>
<blockquote><p>Strategy is only as good as the decisions it enables.</p></blockquote>
<h2>Measuring what matters</h2>
<p>Lagging measures such as revenue or margin tell you what has already happened. Leading indicators — adoption of a new process, pipeline quality, capability milestones — show whether the organisation is moving in the right direction early enough to adjust.</p>
<h2>Keeping the strategy alive</h2>
<p>Conditions change. A healthy strategy process revisits its core assumptions on a defined cadence, so that the organisation adapts deliberately rather than drifting.</p>`,
  },
  {
    slug: "building-a-practical-esg-roadmap",
    title: "Building a Practical ESG Roadmap",
    subtitle: "Starting with what is material, measurable and connected to the business.",
    excerpt:
      "An effective ESG roadmap begins with materiality and data foundations — not with the most ambitious target on the market.",
    category: "sustainability",
    categoryName: "Sustainability",
    contentType: "guide",
    contentTypeName: "Guide",
    author,
    industries: ["manufacturing", "energy-utilities", "consumer-retail"],
    services: ["esg-sustainability", "strategy-advisory"],
    tags: ["esg", "reporting", "materiality"],
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    readingTime: 7,
    featured: false,
    featuredImage: null,
    keyTakeaways: [
      "Begin with a structured materiality assessment.",
      "Invest early in data ownership and processes.",
      "Connect ESG goals to business strategy and capital plans.",
      "Plan for independent assurance from the outset where it is required.",
    ],
    body: `<h2>Start with materiality</h2>
<p>Not every ESG topic matters equally to every organisation. A materiality assessment identifies the issues that are most significant to the business and its stakeholders, and gives the roadmap a defensible focus.</p>
<h2>Build the data foundations</h2>
<p>Credible reporting depends on reliable data. Define owners, sources, calculation methods and review steps for each metric before committing to public targets.</p>
<ul><li>Map where each data point originates.</li><li>Document calculation methodologies.</li><li>Introduce review and sign-off steps.</li></ul>
<h2>Connect goals to the business</h2>
<p>ESG goals carry weight when they are reflected in operational plans, capital allocation and performance measures — not only in a sustainability report.</p>
<h2>Prepare for assurance</h2>
<p>Where independent assurance is required or expected, designing processes with auditability in mind makes the assurance engagement — carried out by an independent provider — more efficient.</p>`,
  },
  {
    slug: "making-safety-systems-work-in-practice",
    title: "Making Safety Systems Work in Practice",
    subtitle: "Closing the distance between documented procedures and everyday work.",
    excerpt:
      "A management system that exists only on paper offers little protection. The real test is whether it shapes how work is done on the floor.",
    category: "ehs",
    categoryName: "EHS",
    contentType: "article",
    contentTypeName: "Article",
    author,
    industries: ["manufacturing", "logistics-supply-chain", "infrastructure-real-estate"],
    services: ["ehs", "operational-excellence"],
    tags: ["safety", "management-systems", "culture"],
    publishedAt: "2026-04-27",
    updatedAt: "2026-04-27",
    readingTime: 5,
    featured: false,
    featuredImage: null,
    keyTakeaways: [
      "Design procedures with the people who carry out the work.",
      "Treat incidents and near-misses as learning opportunities.",
      "Make leadership visible in safety routines.",
    ],
    body: `<h2>Work as imagined versus work as done</h2>
<p>Procedures are often written for an idealised version of the task. When conditions differ, people adapt. Understanding those adaptations is the starting point for procedures that are both safe and workable.</p>
<h2>Learning from events</h2>
<p>Incident investigation should focus on understanding conditions and systems rather than assigning blame. Near-misses are particularly valuable, offering lessons without harm.</p>
<h2>Visible leadership</h2>
<p>Safety culture is shaped by what leaders pay attention to. Regular, genuine engagement on the floor signals that safety is an operational priority, not a compliance exercise.</p>
<h2>Preparing for certification</h2>
<p>Where organisations pursue certification against a recognised standard, the certification itself is carried out by an accredited certification body. Advisory support can help close gaps beforehand.</p>`,
  },
  {
    slug: "integration-planning-before-day-one",
    title: "Integration Planning Starts Before Day One",
    subtitle: "Why the value of a transaction is shaped long before the deal closes.",
    excerpt:
      "Integration planning that begins at signing is already late. Early preparation protects value, people and momentum.",
    category: "transactions",
    categoryName: "Transactions",
    contentType: "perspective",
    contentTypeName: "Perspective",
    author,
    industries: ["technology-services", "healthcare", "manufacturing"],
    services: ["mergers-acquisitions", "strategy-advisory"],
    tags: ["integration", "synergies", "change"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-06",
    readingTime: 6,
    featured: false,
    featuredImage: null,
    keyTakeaways: [
      "Link integration priorities to the deal rationale.",
      "Plan Day One essentials early.",
      "Track synergies with clear owners and measures.",
    ],
    body: `<h2>Anchor integration in the deal rationale</h2>
<p>Every transaction has a reason. Integration priorities should flow directly from it — whether that is market access, capability, scale or cost.</p>
<h2>Day One essentials</h2>
<p>Customers, employees and suppliers need continuity. Identify the processes and communications that must work on Day One, and prepare them early.</p>
<h2>Tracking value</h2>
<p>Synergy estimates become real only when they are owned, planned and measured. A simple, consistent tracking framework helps leadership see progress and intervene early.</p>
<p><em>Note: this article describes commercial and operational advisory support. It is not legal, audit, tax or investment banking advice.</em></p>`,
  },
];

export const resources: ResourceItem[] = [
  {
    slug: "strategy-execution-checklist",
    title: "Strategy Execution Checklist",
    description: "A short checklist to test whether strategic priorities are translated into owned, measurable initiatives.",
    resourceType: "Checklist",
    fileUrl: null,
    gated: true,
  },
  {
    slug: "esg-data-readiness-guide",
    title: "ESG Data Readiness Guide",
    description: "Questions to help assess whether ESG data processes are ready to support credible reporting.",
    resourceType: "Guide",
    fileUrl: null,
    gated: true,
  },
  {
    slug: "ehs-gap-assessment-template",
    title: "EHS Gap Assessment Template",
    description: "A structured template for reviewing management system gaps ahead of certification readiness work.",
    resourceType: "Template",
    fileUrl: null,
    gated: true,
  },
];
