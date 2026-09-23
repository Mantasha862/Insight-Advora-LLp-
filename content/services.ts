import type { ServiceItem } from "@/lib/types";

// Seed content for the six practices. Regulated-services wording is deliberate —
// see README "CRITICAL CREDIBILITY RULE" before editing.
export const services: ServiceItem[] = [
  {
    slug: "strategy-advisory",
    number: "01",
    title: "Strategy & Advisory",
    shortTitle: "Strategy",
    headline: "Clarity of direction, grounded in evidence.",
    description:
      "We help leadership teams define where to play and how to win — translating ambition into a focused strategy, a practical roadmap and the governance needed to see it through.",
    icon: "strategy",
    challenge: "Our direction is unclear and priorities compete",
    capabilities: [
      "Corporate & business-unit strategy",
      "Strategic planning & roadmaps",
      "Market & competitive assessment",
      "Business model review",
      "Board & leadership advisory",
      "Portfolio prioritisation",
      "Governance & performance frameworks",
      "Scenario planning",
    ],
    flow: ["Current Position", "Strategic Options", "Chosen Direction", "Aligned Execution"],
    challenges: [
      "Leadership priorities that pull in different directions",
      "Plans that stay on paper and never reach operations",
      "Limited visibility of market shifts and competitive moves",
      "Decisions made without a shared, evidence-based view",
    ],
    perspective:
      "Strategy is only as good as the decisions it enables. We work alongside leadership to build a shared fact base, test options openly and agree a direction that the organisation can actually carry — with clear ownership, milestones and measures.",
    outcomes: [
      "A shared understanding of priorities across the leadership team",
      "A practical roadmap with clear ownership and milestones",
      "A governance rhythm that keeps strategy connected to operations",
      "Better-informed decisions on where to invest time and capital",
    ],
    related: ["business-growth", "operational-excellence", "mergers-acquisitions"],
    industries: ["manufacturing", "financial-services", "technology-services", "consumer-retail"],
    faq: [
      {
        q: "How long does a strategy engagement typically take?",
        a: "Scope and timelines are agreed with each client after an initial conversation, based on the questions to be answered and the depth of analysis required.",
      },
      {
        q: "Do you stay involved after the strategy is agreed?",
        a: "Where helpful, we support implementation planning and governance so the strategy is translated into action.",
      },
    ],
  },
  {
    slug: "operational-excellence",
    number: "02",
    title: "Operational Excellence",
    shortTitle: "Operations",
    headline: "Better processes, measurably stronger performance.",
    description:
      "We diagnose how work really flows, remove waste and friction, and build the systems, routines and capabilities that sustain higher performance over time.",
    icon: "operations",
    challenge: "Our costs are rising and processes feel inefficient",
    capabilities: [
      "Process diagnostics & mapping",
      "Lean & continuous improvement",
      "Cost optimisation",
      "Productivity & capacity planning",
      "Performance management systems",
      "Standard operating procedures",
      "Supply chain review",
      "Capability building",
    ],
    flow: ["Current State", "Diagnosis", "Improvement", "Optimized State"],
    challenges: [
      "Rising costs without a clear view of their drivers",
      "Inconsistent processes across sites, teams or shifts",
      "Improvement initiatives that fade after launch",
      "Limited performance data to guide decisions",
    ],
    perspective:
      "Sustainable improvement comes from the people who do the work. We combine structured diagnostics with hands-on collaboration so that improvements are designed with, not for, the teams who will own them.",
    outcomes: [
      "A clear, data-backed picture of where value is lost",
      "Simplified, standardised processes that teams understand",
      "Performance routines that help improvements hold",
      "Internal capability to continue improving independently",
    ],
    related: ["strategy-advisory", "ehs", "business-growth"],
    industries: ["manufacturing", "logistics-supply-chain", "healthcare", "energy-utilities"],
    faq: [
      {
        q: "Do you work on-site with our teams?",
        a: "Yes — operational work is most effective when carried out alongside the people who run the process. The working model is agreed at the start of each engagement.",
      },
      {
        q: "Is this only relevant to manufacturing?",
        a: "No. The same principles apply to service, back-office and support operations.",
      },
    ],
  },
  {
    slug: "business-growth",
    number: "03",
    title: "Business Growth",
    shortTitle: "Growth",
    headline: "Growth that is deliberate, not accidental.",
    description:
      "We help organisations identify, prioritise and pursue growth opportunities — from new markets and customer segments to commercial effectiveness and go-to-market design.",
    icon: "growth",
    challenge: "We want to grow but lack a clear path",
    capabilities: [
      "Growth strategy",
      "Market entry & expansion",
      "Customer & segment analysis",
      "Go-to-market design",
      "Pricing & commercial review",
      "Sales effectiveness",
      "Partnership & channel strategy",
      "New venture assessment",
    ],
    flow: ["Opportunity", "Assessment", "Go-to-Market", "Scaled Growth"],
    challenges: [
      "Growth ambitions without a prioritised set of opportunities",
      "Uncertainty about which markets or segments to pursue",
      "Commercial processes that do not scale",
      "Limited insight into customer needs and buying behaviour",
    ],
    perspective:
      "Durable growth is built on a clear understanding of customers and a realistic view of the organisation's capabilities. We help teams choose fewer, better opportunities and pursue them with discipline.",
    outcomes: [
      "A prioritised pipeline of growth opportunities",
      "A go-to-market approach matched to target customers",
      "Commercial processes designed to scale",
      "Clear measures to track progress against ambition",
    ],
    related: ["strategy-advisory", "mergers-acquisitions", "operational-excellence"],
    industries: ["consumer-retail", "technology-services", "manufacturing", "financial-services"],
    faq: [
      {
        q: "Can you help us assess a new market?",
        a: "Yes. We support market assessment and entry planning, drawing on primary and secondary research agreed with you.",
      },
    ],
  },
  {
    slug: "mergers-acquisitions",
    number: "04",
    title: "M&A / Transaction Advisory Support",
    shortTitle: "M&A",
    headline: "Informed decisions at every stage of a transaction.",
    description:
      "We provide advisory support across the transaction lifecycle — from target screening and commercial and operational review to integration planning and post-deal value tracking. We do not provide legal, audit, tax or investment banking services; we work alongside your appointed specialists.",
    icon: "transactions",
    challenge: "We are evaluating an acquisition, merger or partnership",
    capabilities: [
      "Target screening support",
      "Commercial review support",
      "Operational review support",
      "Synergy assessment",
      "Integration planning",
      "Post-merger integration support",
      "Carve-out & separation planning",
      "Value-tracking frameworks",
    ],
    flow: ["Opportunity", "Evaluation", "Integration", "Realised Value"],
    challenges: [
      "Limited visibility of operational risks in a target business",
      "Synergy estimates that are difficult to validate",
      "Integration planning that starts too late",
      "Value expected at signing that is not realised after close",
    ],
    perspective:
      "Transactions succeed or fail on the quality of preparation and integration. We bring a commercial and operational lens that complements the work of legal, financial and tax advisers you appoint.",
    outcomes: [
      "A clearer view of commercial and operational considerations",
      "Integration plans prepared ahead of close",
      "Structured tracking of expected synergies",
      "Smoother transition for people and processes",
    ],
    related: ["strategy-advisory", "business-growth", "operational-excellence"],
    industries: ["manufacturing", "technology-services", "healthcare", "consumer-retail"],
    faq: [
      {
        q: "Do you provide legal, audit, tax or investment banking services?",
        a: "No. Our role is advisory support on commercial, operational and integration matters. Legal, audit, tax and investment banking services should be obtained from appropriately qualified and licensed providers.",
      },
    ],
  },
  {
    slug: "ehs",
    number: "05",
    title: "Environment, Health & Safety",
    shortTitle: "EHS",
    headline: "Safer operations, stronger systems.",
    description:
      "We provide EHS advisory support — helping organisations assess risk, strengthen management systems and build a culture where safety and environmental performance are part of everyday work. Certification is carried out by accredited certification bodies.",
    icon: "ehs",
    challenge: "We need to strengthen safety and environmental performance",
    capabilities: [
      "EHS risk assessment support",
      "Management system development",
      "Certification readiness support",
      "Gap assessments",
      "Safety culture programmes",
      "Incident investigation support",
      "Environmental performance review",
      "Training & capability building",
    ],
    flow: ["Risk Exposure", "Assessment", "Controls", "Safer Operations"],
    challenges: [
      "Management systems that exist on paper but not in practice",
      "Recurring incidents without clear root causes",
      "Preparing for certification against recognised standards",
      "Engaging frontline teams in safety ownership",
    ],
    perspective:
      "Good EHS performance is a sign of a well-run organisation. We help embed practical systems and behaviours that reduce risk while supporting productivity.",
    outcomes: [
      "Clearer visibility of EHS risks and controls",
      "Management systems that reflect how work is actually done",
      "Better readiness for external certification audits",
      "Stronger ownership of safety across teams",
    ],
    related: ["esg-sustainability", "operational-excellence", "strategy-advisory"],
    industries: ["manufacturing", "energy-utilities", "infrastructure-real-estate", "logistics-supply-chain"],
    faq: [
      {
        q: "Do you certify organisations?",
        a: "No. Certification is carried out by accredited certification bodies. We provide advisory support to help organisations prepare.",
      },
    ],
  },
  {
    slug: "esg-sustainability",
    number: "06",
    title: "ESG & Sustainability",
    shortTitle: "ESG",
    headline: "Sustainability that strengthens the business.",
    description:
      "We help organisations understand material ESG issues, set practical goals and build the data and processes needed for credible reporting. We provide reporting support; independent assurance is carried out by independent assurance providers.",
    icon: "esg",
    challenge: "We need a credible approach to ESG and sustainability",
    capabilities: [
      "Materiality assessment",
      "ESG strategy & roadmap",
      "Reporting support",
      "ESG data & process design",
      "Decarbonisation planning support",
      "Stakeholder engagement",
      "Policy development",
      "Assurance readiness support",
    ],
    flow: ["Baseline", "Materiality", "Roadmap", "Embedded Practice"],
    challenges: [
      "Growing stakeholder expectations on ESG disclosure",
      "Fragmented or incomplete sustainability data",
      "Goals that are not connected to business strategy",
      "Uncertainty about which frameworks apply",
    ],
    perspective:
      "ESG is most valuable when it is integrated with how the business is run. We focus on what is material, practical and measurable — building foundations that can support credible reporting.",
    outcomes: [
      "A clear view of material ESG topics",
      "A roadmap connected to business priorities",
      "More reliable ESG data processes",
      "Readiness for independent assurance where required",
    ],
    related: ["ehs", "strategy-advisory", "operational-excellence"],
    industries: ["manufacturing", "energy-utilities", "infrastructure-real-estate", "consumer-retail"],
    faq: [
      {
        q: "Do you provide assurance on ESG reports?",
        a: "No. We provide reporting support. Independent assurance should be obtained from an independent assurance provider.",
      },
    ],
  },
];
