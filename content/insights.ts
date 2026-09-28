import type { AuthorItem, ResourceItem, SeedArticle, Taxonomy } from "@/lib/types";

// Generated from the client's design data files (docs/design/*.js). Edit the content here,
// or manage it in the admin panel once the database is connected.
// Only status "published" is ever shown publicly. Statistics stay as [ source: ... ] placeholders.
export const categories: Taxonomy[] = [
  {
    "slug": "strategy",
    "name": "Strategy"
  },
  {
    "slug": "operational-excellence",
    "name": "Operational Excellence"
  },
  {
    "slug": "business-growth",
    "name": "Business Growth"
  },
  {
    "slug": "m-and-a-and-transactions",
    "name": "M&A & Transactions"
  },
  {
    "slug": "ehs",
    "name": "EHS"
  },
  {
    "slug": "esg-and-sustainability",
    "name": "ESG & Sustainability"
  },
  {
    "slug": "business-transformation",
    "name": "Business Transformation"
  },
  {
    "slug": "corporate-advisory",
    "name": "Corporate Advisory"
  }
];

export const contentTypes: Taxonomy[] = [
  {
    "slug": "insight",
    "name": "Insight"
  },
  {
    "slug": "article",
    "name": "Article"
  },
  {
    "slug": "research-and-report",
    "name": "Research & Report"
  },
  {
    "slug": "whitepaper",
    "name": "Whitepaper"
  },
  {
    "slug": "news-and-update",
    "name": "News & Update"
  },
  {
    "slug": "guide-and-resource",
    "name": "Guide & Resource"
  }
];

export const authors: AuthorItem[] = [
  {
    "slug": "insight-advora",
    "name": "Insight Advora LLP",
    "role": "Firm perspective",
    "bio": "[ Author biography — replace with the named author once assigned. ]",
    "linkedin": null
  }
];

export const articles: SeedArticle[] = [
  {
    "slug": "operational-efficiency-to-business-performance",
    "status": "published",
    "title": "From Operational Efficiency to Business Performance",
    "subtitle": "Efficiency gains only count when they reach the income statement.",
    "excerpt": "Efficiency programmes often deliver real process improvement and no visible commercial change. The gap is usually structural, not analytical.",
    "body": "<h2>Where the value leaks</h2>\n<p>Efficiency work usually begins with a process and ends with a process metric. Cycle time falls, rework falls, and the improvement is real. What often does not happen is a change in what the business sells, spends or commits.</p>\n<p>The break is rarely analytical. It is structural: the person accountable for the process is not the person accountable for the decision the process feeds.</p>\n<h2>Make the commercial link explicit</h2>\n<p>Before selecting a process to improve, state the commercial outcome expected: capacity released and then sold, cost avoided and then removed from budget, quality improved and then reflected in price or retention.</p>\n<p>If the sentence cannot be completed, the improvement may still be worth doing — but it should not be presented as a performance initiative.</p>\n<h2>Hold the baseline</h2>\n<p>Improvement claims collapse when the baseline moves. Fix the definition, the period and the data source before changes begin, and keep them fixed through the programme.</p>\n<p>[ source: add internal baseline reference or external study here if cited ]</p>\n<h2>Govern fewer measures, better</h2>\n<p>Most improvement dashboards accumulate measures nobody acts on. A short set of measures, each attached to a decision and an owner, outperforms a comprehensive set that informs nothing.</p>",
    "keyTakeaways": [
      "Define the commercial outcome before the process metric.",
      "Name an owner who controls both the process and the decision it feeds.",
      "Hold the baseline still long enough to measure against it.",
      "Retire measures that no longer change a decision."
    ],
    "featuredImage": null,
    "readingTime": 6,
    "featured": true,
    "publishedAt": "2026-09-10",
    "updatedAt": "2026-09-10",
    "category": "operational-excellence",
    "categoryName": "Operational Excellence",
    "contentType": "insight",
    "contentTypeName": "Insight",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "manufacturing"
    ],
    "services": [
      "operational-excellence",
      "strategy-corporate-advisory"
    ],
    "tags": [
      "process improvement",
      "performance management",
      "operating model"
    ]
  },
  {
    "slug": "esg-compliance-to-sustainable-value",
    "status": "published",
    "title": "From ESG Compliance to Sustainable Value",
    "subtitle": "Treating ESG as an operating discipline rather than a reporting obligation.",
    "excerpt": "When the same data serves a decision and a disclosure, ESG stops being a parallel workstream and starts informing how value is created.",
    "body": "<h2>The reporting trap</h2>\n<p>ESG often enters an organization as a request: a customer questionnaire, a lender covenant, a regulatory timeline. Answering the request becomes the programme, and a parallel reporting function grows beside the business.</p>\n<p>The cost of that structure is that nothing in the operating rhythm changes.</p>\n<h2>Materiality before frameworks</h2>\n<p>A framework tells you how to report. It does not tell you which issues determine your risk and opportunity. That judgement is specific to the operation, geography and customer base, and it should be made first.</p>\n<h2>Data ownership is the hard part</h2>\n<p>Most ESG programmes stall on data: definitions differ by site, ownership is unclear, and figures are assembled manually each cycle. Resolving ownership and definitions is unglamorous work that determines whether anything else holds.</p>\n<h2>Sequence commitments honestly</h2>\n<p>Commitments made ahead of capability create reporting risk. A sequenced roadmap — fewer commitments, each with an owner and a mechanism — is more credible to lenders, customers and regulators than a comprehensive pledge.</p>",
    "keyTakeaways": [
      "Start from material issues specific to the business, not a framework index.",
      "Assign data ownership before selecting a reporting standard.",
      "Route ESG data into operating decisions, not only disclosures.",
      "Sequence commitments against capability rather than announcing all at once."
    ],
    "featuredImage": null,
    "readingTime": 7,
    "featured": false,
    "publishedAt": "2026-09-03",
    "updatedAt": "2026-09-03",
    "category": "esg-and-sustainability",
    "categoryName": "ESG & Sustainability",
    "contentType": "insight",
    "contentTypeName": "Insight",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "energy-environment"
    ],
    "services": [
      "esg-sustainability",
      "ehs-advisory"
    ],
    "tags": [
      "ESG",
      "reporting",
      "governance",
      "materiality"
    ]
  },
  {
    "slug": "due-diligence-and-post-transaction-integration",
    "status": "published",
    "title": "Due Diligence and the Quiet Cost of Weak Integration",
    "subtitle": "Where transaction value is created — and most often lost.",
    "excerpt": "Diligence findings and integration plans are frequently produced by different people, at different times, for different audiences. That handover is where value goes.",
    "body": "<h2>Two documents, one business</h2>\n<p>Commercial and financial diligence answer whether to proceed and at what price. Integration planning answers how the combined business will operate. When those workstreams do not meet, assumptions are inherited without being tested.</p>\n<h2>Give assumptions owners</h2>\n<p>A synergy without a named owner, a baseline and a date is a number in a model. Assigning each one before close turns the model into a plan management can govern.</p>\n<h2>Decide what not to integrate</h2>\n<p>Full integration is not always the value-maximising answer. Deciding deliberately what stays distinct — systems, brands, operating routines — protects the parts of the acquired business that were worth buying.</p>\n<h2>Advisory support, not regulated services</h2>\n<p>Insight Advora provides business, operational and commercial advisory support on transactions. Legal, audit, tax and regulated financial services are provided by appropriately licensed professionals, with whom we work alongside.</p>",
    "keyTakeaways": [
      "Carry operational diligence findings directly into the integration plan.",
      "Give every synergy assumption an owner and a baseline before close.",
      "Plan the first hundred days as an operating programme, not an announcement.",
      "Separate what must be integrated from what can remain distinct."
    ],
    "featuredImage": null,
    "readingTime": 8,
    "featured": false,
    "publishedAt": "2026-08-26",
    "updatedAt": "2026-08-26",
    "category": "m-and-a-and-transactions",
    "categoryName": "M&A & Transactions",
    "contentType": "article",
    "contentTypeName": "Article",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "diversified-enterprises"
    ],
    "services": [
      "ma-corporate-transactions",
      "business-growth-transformation"
    ],
    "tags": [
      "due diligence",
      "integration",
      "restructuring"
    ]
  },
  {
    "slug": "turning-strategic-priorities-into-action",
    "status": "published",
    "title": "Turning Strategic Priorities Into Action",
    "subtitle": "Why strategy stalls between the decision and the delivery.",
    "excerpt": "Most strategies are not rejected; they are diluted. The dilution happens in sequencing, ownership and the absence of a decision rhythm.",
    "body": "<h2>Dilution, not rejection</h2>\n<p>Strategies rarely fail at the decision point. They fail in the months afterwards, as initiatives are added without anything being removed and the same people are asked to deliver all of them.</p>\n<h2>Trade-offs make priorities real</h2>\n<p>A priority that costs nothing to hold is not a priority. Making the trade-off explicit — what will be slower, smaller or stopped — is what converts intent into a plan.</p>\n<h2>A rhythm for revisiting</h2>\n<p>Conditions change faster than annual cycles. A short, regular forum with the authority to re-sequence keeps strategy current without reopening it constantly.</p>",
    "keyTakeaways": [
      "State the trade-off explicitly; a priority list without one is a wish list.",
      "Sequence initiatives against capacity, not against enthusiasm.",
      "Give each priority a single accountable owner.",
      "Review decisions on a rhythm, not only at annual planning."
    ],
    "featuredImage": null,
    "readingTime": 6,
    "featured": false,
    "publishedAt": "2026-08-18",
    "updatedAt": "2026-08-18",
    "category": "strategy",
    "categoryName": "Strategy",
    "contentType": "insight",
    "contentTypeName": "Insight",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "technology-services"
    ],
    "services": [
      "strategy-corporate-advisory",
      "business-growth-transformation"
    ],
    "tags": [
      "strategy execution",
      "prioritisation",
      "governance"
    ]
  },
  {
    "slug": "building-a-culture-of-continuous-improvement",
    "status": "published",
    "title": "Building a Culture of Continuous Improvement",
    "subtitle": "Moving beyond one-off efficiency projects.",
    "excerpt": "Continuous improvement is a supervisory routine before it is a methodology. Where the routine is missing, training rarely compensates.",
    "body": "<h2>Routine before method</h2>\n<p>Organizations often adopt a methodology and expect behaviour to follow. In practice the behaviour depends on whether supervisors have time, mandate and a forum to act on what their teams raise.</p>\n<h2>Schedule the capacity</h2>\n<p>Improvement work competes with delivery and loses by default. Protecting a small, predictable amount of time is the difference between a programme and an intention.</p>\n<h2>Close the loop</h2>\n<p>Ideas that disappear teach people not to raise them. Responding to every suggestion — including a clear no with a reason — sustains participation better than incentives.</p>",
    "keyTakeaways": [
      "Improvement capacity must be scheduled, not found.",
      "Supervisors carry the routine; training alone does not.",
      "Small, visible changes build more credibility than large programmes.",
      "Close the loop on ideas, including the ones declined."
    ],
    "featuredImage": null,
    "readingTime": 5,
    "featured": false,
    "publishedAt": "2026-08-11",
    "updatedAt": "2026-08-11",
    "category": "operational-excellence",
    "categoryName": "Operational Excellence",
    "contentType": "guide-and-resource",
    "contentTypeName": "Guide & Resource",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "consumer-retail"
    ],
    "services": [
      "operational-excellence"
    ],
    "tags": [
      "continuous improvement",
      "capability",
      "supervision"
    ]
  },
  {
    "slug": "ehs-management-systems-that-hold",
    "status": "published",
    "title": "EHS Management Systems That Hold Between Audits",
    "subtitle": "Compliance follows the operating system, not the policy document.",
    "excerpt": "When findings repeat year after year, the issue is usually the corrective-action loop rather than the standard itself.",
    "body": "<h2>The repeat-finding signal</h2>\n<p>A finding that recurs is information about the system that closes actions, not about the people who received the training. Tracing one repeat finding end to end usually explains several others.</p>\n<h2>Work as done</h2>\n<p>Risk assessments written against the documented method miss the deviations that actually create exposure. Observing work as performed is the shortest route to an assessment that holds.</p>\n<h2>Certification and scope</h2>\n<p>Insight Advora provides advisory support to prepare, strengthen and audit EHS systems. Certification is issued by accredited certification bodies.</p>",
    "keyTakeaways": [
      "Consolidate obligations into one register with named owners.",
      "Treat repeat findings as a loop failure, not a training failure.",
      "Base risk assessment on work as actually performed.",
      "Make supervisory routines the primary control."
    ],
    "featuredImage": null,
    "readingTime": 6,
    "featured": false,
    "publishedAt": "2026-08-04",
    "updatedAt": "2026-08-04",
    "category": "ehs",
    "categoryName": "EHS",
    "contentType": "article",
    "contentTypeName": "Article",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "infrastructure"
    ],
    "services": [
      "ehs-advisory",
      "operational-excellence"
    ],
    "tags": [
      "EHS",
      "audits",
      "risk assessment",
      "safety culture"
    ]
  },
  {
    "slug": "managing-transformation-in-a-changing-environment",
    "status": "draft",
    "title": "Managing Transformation in a Changing Business Environment",
    "subtitle": "Draft — not published.",
    "excerpt": "A draft entry demonstrating that unpublished content never appears on the public Knowledge Hub.",
    "body": "",
    "keyTakeaways": [],
    "featuredImage": null,
    "readingTime": 7,
    "featured": false,
    "publishedAt": "2026-09-18",
    "updatedAt": "2026-09-18",
    "category": "business-transformation",
    "categoryName": "Business Transformation",
    "contentType": "article",
    "contentTypeName": "Article",
    "author": {
      "slug": "insight-advora",
      "name": "Insight Advora LLP",
      "role": "Firm perspective",
      "bio": "[ Author biography — replace with the named author once assigned. ]",
      "linkedin": null
    },
    "industries": [
      "diversified-enterprises"
    ],
    "services": [
      "business-growth-transformation"
    ],
    "tags": [
      "transformation"
    ]
  }
];

export const resources: ResourceItem[] = [
  {
    "slug": "operational-diagnostic-checklist",
    "title": "Operational Diagnostic Checklist",
    "description": "A structured set of questions for assessing where operating performance is created and lost.",
    "resourceType": "Checklist",
    "fileUrl": null,
    "gated": false
  },
  {
    "slug": "esg-readiness-framework",
    "title": "ESG Readiness Framework",
    "description": "A staged view of materiality, data ownership, governance and reporting readiness.",
    "resourceType": "Framework",
    "fileUrl": null,
    "gated": true
  },
  {
    "slug": "transaction-readiness-guide",
    "title": "Transaction Readiness Guide",
    "description": "What to establish before diligence begins, and what to carry into integration.",
    "resourceType": "Guide",
    "fileUrl": null,
    "gated": true
  },
  {
    "slug": "ehs-obligations-register-template",
    "title": "EHS Obligations Register Template",
    "description": "A single-register format for applicable obligations, owners and review dates.",
    "resourceType": "Template",
    "fileUrl": null,
    "gated": false
  }
];
