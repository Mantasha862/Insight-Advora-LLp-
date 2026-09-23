import type { IndustryItem } from "@/lib/types";

export const industries: IndustryItem[] = [
  {
    slug: "manufacturing",
    number: "01",
    name: "Manufacturing",
    headline: "Productive, resilient and responsible operations.",
    summary: "Improving productivity, safety and sustainability across plants and supply chains.",
    context:
      "Manufacturers balance cost pressure, supply volatility, workforce capability and rising expectations on safety and environmental performance — often across multiple sites.",
    considerations: [
      "Cost and productivity pressure across plants",
      "Supply chain resilience and supplier performance",
      "Safety performance and management systems",
      "Energy use, emissions and resource efficiency",
    ],
    challenges: [
      "Standardising processes across sites",
      "Reducing waste and downtime",
      "Preparing for EHS certification audits",
      "Building credible ESG data",
    ],
    topics: ["operations", "ehs", "sustainability"],
    services: ["operational-excellence", "ehs", "esg-sustainability", "strategy-advisory", "mergers-acquisitions"],
  },
  {
    slug: "healthcare",
    number: "02",
    name: "Healthcare",
    headline: "Operational clarity for care-focused organisations.",
    summary: "Operational, strategic and organisational support for healthcare businesses.",
    context:
      "Healthcare organisations operate under capacity constraints, cost pressure and high expectations for quality and patient experience, alongside non-clinical operational complexity.",
    scopeNote:
      "Our support is limited to strategic, operational and organisational matters. We do not provide clinical, medical or regulatory approval services.",
    considerations: [
      "Capacity and throughput of non-clinical processes",
      "Cost management and resource planning",
      "Growth and network expansion decisions",
      "Workplace health and safety",
    ],
    challenges: [
      "Streamlining administrative and support processes",
      "Planning expansion and new facilities",
      "Integrating acquired businesses",
      "Strengthening EHS systems in facilities",
    ],
    topics: ["operations", "strategy"],
    services: ["operational-excellence", "strategy-advisory", "mergers-acquisitions", "ehs"],
  },
  {
    slug: "financial-services",
    number: "03",
    name: "Financial Services",
    headline: "Efficient operations in a demanding environment.",
    summary: "Strategy and operational improvement support for financial services organisations.",
    context:
      "Financial services firms face margin pressure, digital competition and growing operational complexity, alongside rising expectations on governance and sustainability.",
    scopeNote:
      "We do not provide regulated investment, securities or banking advice. Our support covers strategy, operations, organisation and ESG reporting processes.",
    considerations: [
      "Operating model efficiency",
      "Customer journey and service processes",
      "Growth strategy and new propositions",
      "ESG disclosure expectations",
    ],
    challenges: [
      "Simplifying back-office processes",
      "Prioritising growth opportunities",
      "Designing ESG data processes",
      "Aligning governance and performance measures",
    ],
    topics: ["strategy", "operations", "sustainability"],
    services: ["strategy-advisory", "operational-excellence", "business-growth", "esg-sustainability"],
  },
  {
    slug: "infrastructure-real-estate",
    number: "04",
    name: "Infrastructure & Real Estate",
    headline: "Delivering long-term assets responsibly.",
    summary: "Project, safety and sustainability support for asset-intensive businesses.",
    context:
      "Infrastructure and real estate organisations manage long project cycles, complex contractor ecosystems, significant safety exposure and growing sustainability expectations.",
    considerations: [
      "Contractor and site safety management",
      "Environmental impact of assets and projects",
      "Project delivery and governance",
      "Portfolio strategy",
    ],
    challenges: [
      "Strengthening site EHS systems",
      "Building ESG baselines for assets",
      "Improving project governance",
      "Evaluating portfolio options",
    ],
    topics: ["ehs", "sustainability", "strategy"],
    services: ["ehs", "esg-sustainability", "strategy-advisory", "operational-excellence"],
  },
  {
    slug: "energy-utilities",
    number: "05",
    name: "Energy & Utilities",
    headline: "Reliable operations through a changing landscape.",
    summary: "Operational, safety and transition-planning support for energy businesses.",
    context:
      "Energy and utility businesses are navigating the energy transition while maintaining reliable, safe operations and managing ageing assets.",
    considerations: [
      "Operational reliability and asset performance",
      "Process safety and environmental management",
      "Transition and decarbonisation planning",
      "Stakeholder and community expectations",
    ],
    challenges: [
      "Improving maintenance and operational processes",
      "Strengthening EHS management systems",
      "Planning decarbonisation pathways",
      "Improving sustainability reporting processes",
    ],
    topics: ["ehs", "sustainability", "operations"],
    services: ["ehs", "esg-sustainability", "operational-excellence", "strategy-advisory"],
  },
  {
    slug: "consumer-retail",
    number: "06",
    name: "Consumer & Retail",
    headline: "Growth built around the customer.",
    summary: "Growth, commercial and operational support for consumer-facing businesses.",
    context:
      "Consumer and retail businesses compete on customer experience, channel reach and operational efficiency, while responding to changing preferences and sustainability expectations.",
    considerations: [
      "Channel and market expansion",
      "Customer and segment insight",
      "Store and supply chain efficiency",
      "Responsible sourcing and packaging",
    ],
    challenges: [
      "Prioritising new markets and channels",
      "Improving commercial effectiveness",
      "Reducing operational cost",
      "Building a practical ESG roadmap",
    ],
    topics: ["growth", "operations", "sustainability"],
    services: ["business-growth", "strategy-advisory", "operational-excellence", "esg-sustainability", "mergers-acquisitions"],
  },
  {
    slug: "technology-services",
    number: "07",
    name: "Technology & Services",
    headline: "Scaling with focus and discipline.",
    summary: "Strategy, growth and transaction support for technology and professional services firms.",
    context:
      "Technology and services businesses scale quickly, and their operating models, commercial approach and governance must keep pace with growth.",
    considerations: [
      "Scaling delivery and operating models",
      "Go-to-market and pricing",
      "Acquisitions and partnerships",
      "Governance for growth",
    ],
    challenges: [
      "Designing a scalable operating model",
      "Sharpening go-to-market focus",
      "Planning acquisition integration",
      "Setting up performance frameworks",
    ],
    topics: ["growth", "strategy", "transactions"],
    services: ["business-growth", "strategy-advisory", "mergers-acquisitions", "operational-excellence"],
  },
  {
    slug: "logistics-supply-chain",
    number: "08",
    name: "Logistics & Supply Chain",
    headline: "Connected, efficient and safe networks.",
    summary: "Network, process and safety support for logistics and supply chain operations.",
    context:
      "Logistics and supply chain operators manage tight margins, complex networks, workforce safety and growing pressure to reduce emissions.",
    considerations: [
      "Network and warehouse efficiency",
      "Workforce and fleet safety",
      "Service levels and customer expectations",
      "Transport emissions",
    ],
    challenges: [
      "Improving warehouse and transport productivity",
      "Strengthening safety systems",
      "Measuring logistics emissions",
      "Evaluating network options",
    ],
    topics: ["operations", "ehs", "sustainability"],
    services: ["operational-excellence", "ehs", "esg-sustainability", "strategy-advisory"],
  },
];
