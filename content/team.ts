import type { TeamCategoryItem, TeamMemberItem } from "@/lib/types";

// Generated from the client's design data files (docs/design/*.js). Edit the content here,
// or manage it in the admin panel once the database is connected.
// Profiles and photos are taken from the firm's Profile 2026 (v5). Do not add details that
// are not in client-supplied material — never invent names, qualifications or biographies.
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
    "slug": "associates",
    "name": "Associates",
    "note": "Research, compliance mapping and governance support."
  }
];

export const team: TeamMemberItem[] = [
  {
    "slug": "vinod-hans",
    "name": "Vinod Hans",
    "designation": "Managing Partner",
    "qualification": "B.E., MBA, GMP INSEAD (France), Leadership Cranefield (UK)",
    "category": "leadership",
    "categoryName": "Leadership",
    "expertise": [
      "P&L Leadership",
      "Business Turnaround",
      "Growth Strategy",
      "Operational Excellence",
      "M&A / Joint Ventures"
    ],
    "bio": "Automotive and manufacturing leader with 40 years of experience, P&L management, strategic transactions, business turnaround and growth. Combines engineering depth with commercial leadership and operational improvement. P&L responsibility for a ₹4,000 Cr automotive business vertical (JBM) and a ₹2,200 Cr Powertrain vertical (Tenneco) during last assignments.",
    "focus": [
      "Secured 100% ownership of two joint ventures and managed transitions across 2 ownership changes and 3 JVs",
      "Built a stable leadership culture with no strikes or industrial relations issues over a 5-year period",
      "Improved EBITDA margins, delivered growth and launched 4 new product lines",
      "Cut development lead time by 6 months and development cost by 30% through a local testing centre",
      "Member of the Global Leadership Group and Strategic Management Group"
    ],
    "photo": "/team/vinod-hans.jpg",
    "linkedin": null,
    "featured": true
  },
  {
    "slug": "khalid-iqbal-khan",
    "name": "Dr. Khalid Iqbal Khan",
    "designation": "Advisor",
    "qualification": "Advocate • FCS • Ph.D. in Corporate Governance",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "IPO & Capital Markets",
      "M&A, Joint Ventures & Restructuring",
      "ESG & Sustainability Governance",
      "Corporate Governance & Boards",
      "Ethics & Compliance"
    ],
    "bio": "Over 33 years of experience across IPOs and capital markets, M&A, corporate governance, ESG and compliance, including more than a decade as Whole-time Director of a listed company and General Counsel of a global automotive group.",
    "focus": [
      "At Insight Advora his work centres on taking companies to market and through transactions: IPO readiness and listing strategy, mergers, acquisitions and restructurings, and the governance and ESG foundations that listed companies and investors expect."
    ],
    "photo": "/team/khalid-iqbal-khan.jpg",
    "linkedin": null,
    "featured": true
  },
  {
    "slug": "prasanna-kumar-dh",
    "name": "Prasanna Kumar D.H.",
    "designation": "Advisor",
    "qualification": "Senior Principal Consultant – EHS Strategy & Global Compliance",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "EHS Strategy & Governance",
      "ISO 14001 & ISO 45001 Audits",
      "Regulatory Compliance & Legal Mapping",
      "Environmental Due Diligence",
      "Risk Assessment & Safety Culture"
    ],
    "bio": "Over 29 years of leadership in Environmental, Health & Safety, including senior roles as Executive Director and Global EHS Director in Fortune 500 manufacturing organisations.",
    "focus": [
      "At Insight Advora he leads the EHS Advisory and supports the ESG & Sustainability practice, helping organisations translate complex regulations into practical EHS strategy, risk management and sustainability alignment across manufacturing, renewable energy and global operations."
    ],
    "photo": "/team/prasanna-kumar-dh.jpg",
    "linkedin": null,
    "featured": true
  },
  {
    "slug": "mohammad-sazid",
    "name": "FCS Mohammad Sazid",
    "designation": "Advisor",
    "qualification": "FCS • LL.B. • B.Com. • Governance, Risk, Compliance & Sustainability",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "Corporate Governance",
      "Risk Management & Internal Controls",
      "Regulatory Compliance & Assurance",
      "Sustainability & ESG Governance",
      "Due Diligence & Transaction Readiness"
    ],
    "bio": "A Company Secretary with over 10 years of experience in corporate compliance, secretarial governance and regulatory affairs across large corporate groups.",
    "focus": [
      "At Insight Advora he supports governance, risk, compliance and sustainability work: regulatory compliance and governance frameworks, enterprise risk and internal-control reviews, sustainability and ESG governance, transaction readiness and due diligence, and cross-border compliance, helping boards and management build sound, resilient and sustainable systems."
    ],
    "photo": "/team/mohammad-sazid.jpg",
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "syed-mantasha-abid",
    "name": "Syed Mantasha Abid",
    "designation": "Advisor",
    "qualification": "LL.B. • M.Com. • B.Com. • Governance, Risk, Compliance & Sustainability",
    "category": "advisory",
    "categoryName": "Advisory Team",
    "expertise": [
      "Regulatory Compliance",
      "Corporate Governance",
      "Risk & Compliance Assessment",
      "ESG & Sustainability Support",
      "Policy Development & Training",
      "POSH & Ethics Awareness"
    ],
    "bio": "A legal and compliance professional experienced in corporate legal, secretarial and compliance functions.",
    "focus": [
      "At Insight Advora she supports governance, regulatory compliance, risk, and ESG and sustainability work. She also develops workplace policies and delivers policy and compliance training, including POSH and ethics awareness programmes, that strengthen ethics, safety and inclusion within client organisations."
    ],
    "photo": "/team/syed-mantasha-abid.jpg",
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "ashish",
    "name": "Ashish",
    "designation": "Associate",
    "qualification": "Corporate Governance • Compliance & Advisory",
    "category": "associates",
    "categoryName": "Associates",
    "expertise": [
      "Compliance Management",
      "Governance Documentation",
      "Advisory Research"
    ],
    "bio": "Supports Insight Advora's advisory engagements with research, compliance mapping and governance documentation, bringing a practical, detail-focused approach to helping clients strengthen their compliance and governance frameworks.",
    "focus": [],
    "photo": "/team/ashish.jpg",
    "linkedin": null,
    "featured": false
  },
  {
    "slug": "mansi-yadav",
    "name": "Mansi Yadav",
    "designation": "Associate",
    "qualification": "Governance • Compliance & Sustainability Advisory",
    "category": "associates",
    "categoryName": "Associates",
    "expertise": [
      "Compliance Reviews",
      "Corporate Governance",
      "Research & Reporting"
    ],
    "bio": "Supports Insight Advora's advisory engagements with compliance reviews, research and reporting, helping clients strengthen governance processes and promote transparency and accountability.",
    "focus": [],
    "photo": "/team/mansi-yadav.jpg",
    "linkedin": null,
    "featured": false
  }
];

/** Show the "Build the Future With Us" careers block (overridden by Website Settings once the DB is connected). */
export const careersActive = true;
