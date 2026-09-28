import type { IndustryItem } from "@/lib/types";

// Generated from the client's design data files (docs/design/*.js). Edit the content here,
// or manage it in the admin panel once the database is connected.
// Industry pages are retired (redirected to /services); this list still drives the
// Knowledge Hub industry filter, related-article scoring and the sectors grid.
export const industries: IndustryItem[] = [
  {
    "slug": "manufacturing",
    "number": "01",
    "name": "Manufacturing",
    "headline": "Building More Efficient, Resilient and Responsible Operations.",
    "summary": "Building More Efficient, Resilient and Responsible Operations.",
    "context": "Manufacturing organizations balance throughput, cost, quality and compliance at the same time, usually across several sites with different maturity levels. Improvement has to survive contact with the shop floor.",
    "scopeNote": null,
    "considerations": [
      "Variability between sites, shifts and lines",
      "Compliance obligations spanning environment and safety",
      "Capital and capacity decisions with long lead times",
      "Customer and lender expectations on sustainability data"
    ],
    "challenges": [
      "Processes shaped by workarounds rather than design",
      "Audit findings that repeat between cycles",
      "Improvement programmes that fade after the pilot",
      "Growth plans without an operating readiness view"
    ],
    "topics": [
      "operational-excellence",
      "ehs",
      "esg-and-sustainability"
    ],
    "services": [
      "operational-excellence",
      "ehs-advisory",
      "esg-sustainability",
      "business-growth-transformation"
    ]
  },
  {
    "slug": "infrastructure",
    "number": "02",
    "name": "Infrastructure",
    "headline": "Supporting Complex Operations and Long-Term Value Creation.",
    "summary": "Supporting Complex Operations and Long-Term Value Creation.",
    "context": "Infrastructure businesses operate long-cycle assets where operating discipline, safety and stakeholder confidence determine performance over decades rather than quarters.",
    "scopeNote": null,
    "considerations": [
      "Multi-party delivery with contractors and authorities",
      "Safety performance as a licence to operate",
      "Asset lifecycle and maintenance economics",
      "Long-horizon environmental and social commitments"
    ],
    "challenges": [
      "Accountability diluted across contracting layers",
      "Operating data that does not support decisions",
      "Transformation competing with day-to-day delivery",
      "Sustainability commitments without operating mechanisms"
    ],
    "topics": [
      "operational-excellence",
      "ehs",
      "business-transformation"
    ],
    "services": [
      "operational-excellence",
      "ehs-advisory",
      "esg-sustainability",
      "strategy-corporate-advisory"
    ]
  },
  {
    "slug": "energy-environment",
    "number": "03",
    "name": "Energy & Environment",
    "headline": "Connecting Business Performance With Environmental Responsibility.",
    "summary": "Connecting Business Performance With Environmental Responsibility.",
    "context": "Organizations in energy and environmental services sit where regulation, operating risk and sustainability expectations meet — and where the same data has to serve compliance and strategy.",
    "scopeNote": null,
    "considerations": [
      "Evolving regulatory and reporting obligations",
      "Environmental risk across sites and operations",
      "Transition planning alongside current performance",
      "Scrutiny from regulators, lenders and communities"
    ],
    "challenges": [
      "Compliance tracked in several disconnected places",
      "Remediation planning without a clear operating owner",
      "Disclosure demands outpacing internal data capability",
      "Transition ambition not reflected in the operating plan"
    ],
    "topics": [
      "ehs",
      "esg-and-sustainability",
      "strategy"
    ],
    "services": [
      "ehs-advisory",
      "esg-sustainability",
      "operational-excellence",
      "strategy-corporate-advisory"
    ]
  },
  {
    "slug": "technology-services",
    "number": "04",
    "name": "Technology & Services",
    "headline": "Helping Service-Led Businesses Navigate Growth and Transformation.",
    "summary": "Helping Service-Led Businesses Navigate Growth and Transformation.",
    "context": "In service-led businesses, capability and process are the product. Growth exposes whichever of the two is weaker.",
    "scopeNote": null,
    "considerations": [
      "Scaling delivery without scaling cost proportionally",
      "Utilisation, margin and quality trade-offs",
      "Organizational design as headcount grows",
      "Client concentration and expansion choices"
    ],
    "challenges": [
      "Delivery quality varying by team or engagement",
      "Growth ambition without a structured path",
      "Process debt accumulating faster than it is paid down",
      "Transformation initiatives competing for the same people"
    ],
    "topics": [
      "strategy",
      "business-growth",
      "business-transformation"
    ],
    "services": [
      "business-growth-transformation",
      "strategy-corporate-advisory",
      "operational-excellence"
    ]
  },
  {
    "slug": "healthcare-life-sciences",
    "number": "05",
    "name": "Healthcare & Life Sciences",
    "headline": "Supporting Organizations Operating in Complex and Evolving Environments.",
    "summary": "Supporting Organizations Operating in Complex and Evolving Environments.",
    "context": "Healthcare and life sciences organizations carry unusually high standards of process discipline, documentation and safety, alongside pressure on cost and access.",
    "scopeNote": "Insight Advora provides business and operational advisory support. We do not provide clinical, medical or regulatory approval services.",
    "considerations": [
      "Process consistency where variance carries real risk",
      "Documentation and traceability expectations",
      "Workforce capability and retention",
      "Environment, health and safety across facilities"
    ],
    "challenges": [
      "Administrative load competing with core work",
      "Process improvement that must not compromise compliance",
      "Capacity constraints in critical pathways",
      "Sustainability expectations arriving through procurement"
    ],
    "topics": [
      "operational-excellence",
      "ehs",
      "corporate-advisory"
    ],
    "services": [
      "operational-excellence",
      "ehs-advisory",
      "esg-sustainability",
      "strategy-corporate-advisory"
    ]
  },
  {
    "slug": "consumer-retail",
    "number": "06",
    "name": "Consumer & Retail",
    "headline": "Creating Stronger Processes, Better Performance and Sustainable Growth.",
    "summary": "Creating Stronger Processes, Better Performance and Sustainable Growth.",
    "context": "Consumer businesses compete on execution speed and consistency across channels, while sustainability expectations increasingly reach into sourcing and packaging decisions.",
    "scopeNote": null,
    "considerations": [
      "Consistency across channels and formats",
      "Working capital and availability trade-offs",
      "Expansion economics by location or channel",
      "Sustainability expectations in sourcing and packaging"
    ],
    "challenges": [
      "Store or channel performance varying without clear cause",
      "Expansion decisions taken ahead of process readiness",
      "Sustainability claims without traceable data",
      "Transformation slowed by seasonal operating peaks"
    ],
    "topics": [
      "business-growth",
      "operational-excellence",
      "esg-and-sustainability"
    ],
    "services": [
      "operational-excellence",
      "business-growth-transformation",
      "esg-sustainability"
    ]
  },
  {
    "slug": "financial-professional-services",
    "number": "07",
    "name": "Financial & Professional Services",
    "headline": "Supporting Strategic Growth and Organizational Transformation.",
    "summary": "Supporting Strategic Growth and Organizational Transformation.",
    "context": "For financial and professional services firms, performance depends on organizational design, governance and process discipline as much as on market position.",
    "scopeNote": "Insight Advora provides business and management advisory support. We do not provide regulated investment advice, securities advice or banking services.",
    "considerations": [
      "Governance and control expectations",
      "Organizational design and partner or leadership models",
      "Process efficiency in client-facing operations",
      "Reporting and stakeholder transparency"
    ],
    "challenges": [
      "Growth constrained by organizational structure",
      "Manual processes carrying avoidable operational risk",
      "Strategy not translated below leadership level",
      "ESG and disclosure expectations from clients and lenders"
    ],
    "topics": [
      "strategy",
      "business-transformation",
      "corporate-advisory"
    ],
    "services": [
      "strategy-corporate-advisory",
      "business-growth-transformation",
      "operational-excellence",
      "esg-sustainability"
    ]
  },
  {
    "slug": "diversified-enterprises",
    "number": "08",
    "name": "Diversified Enterprises",
    "headline": "Bringing an Integrated Perspective to Complex Organizations.",
    "summary": "Bringing an Integrated Perspective to Complex Organizations.",
    "context": "Group structures carry portfolio questions alongside operating ones: where to invest, what to standardise, and what should stay deliberately different.",
    "scopeNote": null,
    "considerations": [
      "Portfolio priorities and capital allocation",
      "What to standardise across businesses, and what not to",
      "Group governance and reporting discipline",
      "Group-level sustainability and risk posture"
    ],
    "challenges": [
      "Performance comparisons that are not like-for-like",
      "Group functions unclear on their mandate",
      "Transaction and restructuring decisions across units",
      "Sustainability reporting aggregated from uneven data"
    ],
    "topics": [
      "strategy",
      "m-and-a",
      "esg-and-sustainability"
    ],
    "services": [
      "strategy-corporate-advisory",
      "ma-corporate-transactions",
      "operational-excellence",
      "esg-sustainability"
    ]
  }
];
