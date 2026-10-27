// Generated from the client's design data files (docs/design/*.js). Edit the content here,
// or manage it in the admin panel once the database is connected.
//
// Advisory-meeting section: add licensed footage to /public/videos and set the paths below.
// Keep it small: 15–20 s seamless loop, 1600x900, H.264 MP4 (<5 MB) + WebM, no audio.
// With no video or poster set, the section shows a branded panel instead.
export const home = {
  "heroPhrase": [
    "Strategy",
    "Operations",
    "EHS",
    "ESG",
    "Transformation"
  ],
  "about": {
    "heading": "Where Insight Meets Action.",
    "paragraphs": [
      "Insight Advora advises promoter-led and listed companies in India on strategy, transactions, governance, EHS and ESG. Our advisors have run these functions inside large organisations.",
      "By connecting these perspectives, we help leadership teams see the whole picture and act with confidence."
    ],
    "pillars": [
      {
        "title": "People",
        "body": "Building capable, engaged and empowered people."
      },
      {
        "title": "Process",
        "body": "Creating efficient, consistent and scalable systems."
      },
      {
        "title": "Planet",
        "body": "Integrating environmental responsibility and sustainability into business thinking."
      },
      {
        "title": "Progress",
        "body": "Turning strategy and insight into meaningful, measurable advancement."
      }
    ]
  },
  "cta": {
    "heading": "Ready to Turn Insight Into Action?",
    "body": "Let’s discuss the challenge, opportunity or transformation ahead.",
    "button": "Start a Conversation"
  },
  "meetingVideo": {
    "mp4": "/videos/advisory-meeting.mp4",
    "webm": "",
    "poster": "/videos/advisory-meeting-poster.jpg",
    "playOnMobile": true
  },
  "watermark": "/assets/monogram-mark.png"
} as const;

/** Conventional locations picked up automatically when the files exist in /public. */
export const DEFAULT_VIDEO = { mp4: "/videos/advisory-meeting.mp4", poster: "/videos/advisory-meeting-poster.jpg" };

/**
 * Fixed-scope entry engagements — the low-risk first step a buyer can say yes to.
 * Duration/fee are left as bracketed placeholders until the firm sets them (edit here).
 * Keep these mandated / time-bound, not open-ended strategy.
 */
export const entryOffers = [
  {
    title: "IPO Readiness Diagnostic",
    meta: "[ set duration ]",
    body: "A structured review of listing readiness — governance, compliance, disclosures and the gaps to close before going to market.",
    href: "/services/ma-corporate-transactions",
  },
  {
    title: "BRSR & ESG Reporting Readiness",
    meta: "[ set duration ]",
    body: "A review of your BRSR and ESG disclosure obligations, the data you can support today and a sequenced plan to close the gap.",
    href: "/services/esg-sustainability",
  },
  {
    title: "EHS Compliance Audit",
    meta: "[ set duration ]",
    body: "An independent audit against applicable EHS laws and standards, with a prioritised list of risks and corrective actions.",
    href: "/services/ehs-advisory",
  },
] as const;
