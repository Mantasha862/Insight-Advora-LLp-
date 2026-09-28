/* Insight Advora LLP — Knowledge Hub content.
   Maps to an `Article` model (title, slug, subtitle, excerpt, body, author,
   category, contentType, industry, services, tags, readingTime, date, status,
   seoTitle, metaDescription, featured).
   Only 'published' items appear publicly. Statistics and external research are
   left as clearly marked [ source: ... ] placeholders — never invented.
*/
window.IA_CATEGORIES = ['Strategy', 'Operational Excellence', 'Business Growth', 'M&A & Transactions', 'EHS', 'ESG & Sustainability', 'Business Transformation', 'Corporate Advisory'];
window.IA_CONTENT_TYPES = ['Insight', 'Article', 'Research & Report', 'Whitepaper', 'News & Update', 'Guide & Resource'];

window.IA_AUTHORS = [
  { slug: 'insight-advora', name: 'Insight Advora LLP', designation: 'Firm perspective', bio: '[ Author biography — replace with the named author once assigned. ]', linkedin: '#' }
];

window.IA_ARTICLES = [
  {
    slug: 'operational-efficiency-to-business-performance', status: 'published', featured: true,
    title: 'From Operational Efficiency to Business Performance',
    subtitle: 'Efficiency gains only count when they reach the income statement.',
    excerpt: 'Efficiency programmes often deliver real process improvement and no visible commercial change. The gap is usually structural, not analytical.',
    category: 'Operational Excellence', contentType: 'Insight', industry: 'manufacturing',
    services: ['operational-excellence', 'strategy-corporate-advisory'],
    tags: ['process improvement', 'performance management', 'operating model'],
    author: 'insight-advora', date: '2026-09-10', readingTime: '6 min read',
    takeaways: [
      'Define the commercial outcome before the process metric.',
      'Name an owner who controls both the process and the decision it feeds.',
      'Hold the baseline still long enough to measure against it.',
      'Retire measures that no longer change a decision.'
    ],
    sections: [
      { h: 'Where the value leaks', p: ['Efficiency work usually begins with a process and ends with a process metric. Cycle time falls, rework falls, and the improvement is real. What often does not happen is a change in what the business sells, spends or commits.', 'The break is rarely analytical. It is structural: the person accountable for the process is not the person accountable for the decision the process feeds.'] },
      { h: 'Make the commercial link explicit', p: ['Before selecting a process to improve, state the commercial outcome expected: capacity released and then sold, cost avoided and then removed from budget, quality improved and then reflected in price or retention.', 'If the sentence cannot be completed, the improvement may still be worth doing — but it should not be presented as a performance initiative.'] },
      { h: 'Hold the baseline', p: ['Improvement claims collapse when the baseline moves. Fix the definition, the period and the data source before changes begin, and keep them fixed through the programme.', '[ source: add internal baseline reference or external study here if cited ]'] },
      { h: 'Govern fewer measures, better', p: ['Most improvement dashboards accumulate measures nobody acts on. A short set of measures, each attached to a decision and an owner, outperforms a comprehensive set that informs nothing.'] }
    ]
  },
  {
    slug: 'esg-compliance-to-sustainable-value', status: 'published', featured: false,
    title: 'From ESG Compliance to Sustainable Value',
    subtitle: 'Treating ESG as an operating discipline rather than a reporting obligation.',
    excerpt: 'When the same data serves a decision and a disclosure, ESG stops being a parallel workstream and starts informing how value is created.',
    category: 'ESG & Sustainability', contentType: 'Insight', industry: 'energy-environment',
    services: ['esg-sustainability', 'ehs-advisory'],
    tags: ['ESG', 'reporting', 'governance', 'materiality'],
    author: 'insight-advora', date: '2026-09-03', readingTime: '7 min read',
    takeaways: [
      'Start from material issues specific to the business, not a framework index.',
      'Assign data ownership before selecting a reporting standard.',
      'Route ESG data into operating decisions, not only disclosures.',
      'Sequence commitments against capability rather than announcing all at once.'
    ],
    sections: [
      { h: 'The reporting trap', p: ['ESG often enters an organization as a request: a customer questionnaire, a lender covenant, a regulatory timeline. Answering the request becomes the programme, and a parallel reporting function grows beside the business.', 'The cost of that structure is that nothing in the operating rhythm changes.'] },
      { h: 'Materiality before frameworks', p: ['A framework tells you how to report. It does not tell you which issues determine your risk and opportunity. That judgement is specific to the operation, geography and customer base, and it should be made first.'] },
      { h: 'Data ownership is the hard part', p: ['Most ESG programmes stall on data: definitions differ by site, ownership is unclear, and figures are assembled manually each cycle. Resolving ownership and definitions is unglamorous work that determines whether anything else holds.'] },
      { h: 'Sequence commitments honestly', p: ['Commitments made ahead of capability create reporting risk. A sequenced roadmap — fewer commitments, each with an owner and a mechanism — is more credible to lenders, customers and regulators than a comprehensive pledge.'] }
    ]
  },
  {
    slug: 'due-diligence-and-post-transaction-integration', status: 'published', featured: false,
    title: 'Due Diligence and the Quiet Cost of Weak Integration',
    subtitle: 'Where transaction value is created — and most often lost.',
    excerpt: 'Diligence findings and integration plans are frequently produced by different people, at different times, for different audiences. That handover is where value goes.',
    category: 'M&A & Transactions', contentType: 'Article', industry: 'diversified-enterprises',
    services: ['ma-corporate-transactions', 'business-growth-transformation'],
    tags: ['due diligence', 'integration', 'restructuring'],
    author: 'insight-advora', date: '2026-08-26', readingTime: '8 min read',
    takeaways: [
      'Carry operational diligence findings directly into the integration plan.',
      'Give every synergy assumption an owner and a baseline before close.',
      'Plan the first hundred days as an operating programme, not an announcement.',
      'Separate what must be integrated from what can remain distinct.'
    ],
    sections: [
      { h: 'Two documents, one business', p: ['Commercial and financial diligence answer whether to proceed and at what price. Integration planning answers how the combined business will operate. When those workstreams do not meet, assumptions are inherited without being tested.'] },
      { h: 'Give assumptions owners', p: ['A synergy without a named owner, a baseline and a date is a number in a model. Assigning each one before close turns the model into a plan management can govern.'] },
      { h: 'Decide what not to integrate', p: ['Full integration is not always the value-maximising answer. Deciding deliberately what stays distinct — systems, brands, operating routines — protects the parts of the acquired business that were worth buying.'] },
      { h: 'Advisory support, not regulated services', p: ['Insight Advora provides business, operational and commercial advisory support on transactions. Legal, audit, tax and regulated financial services are provided by appropriately licensed professionals, with whom we work alongside.'] }
    ]
  },
  {
    slug: 'turning-strategic-priorities-into-action', status: 'published', featured: false,
    title: 'Turning Strategic Priorities Into Action',
    subtitle: 'Why strategy stalls between the decision and the delivery.',
    excerpt: 'Most strategies are not rejected; they are diluted. The dilution happens in sequencing, ownership and the absence of a decision rhythm.',
    category: 'Strategy', contentType: 'Insight', industry: 'technology-services',
    services: ['strategy-corporate-advisory', 'business-growth-transformation'],
    tags: ['strategy execution', 'prioritisation', 'governance'],
    author: 'insight-advora', date: '2026-08-18', readingTime: '6 min read',
    takeaways: [
      'State the trade-off explicitly; a priority list without one is a wish list.',
      'Sequence initiatives against capacity, not against enthusiasm.',
      'Give each priority a single accountable owner.',
      'Review decisions on a rhythm, not only at annual planning.'
    ],
    sections: [
      { h: 'Dilution, not rejection', p: ['Strategies rarely fail at the decision point. They fail in the months afterwards, as initiatives are added without anything being removed and the same people are asked to deliver all of them.'] },
      { h: 'Trade-offs make priorities real', p: ['A priority that costs nothing to hold is not a priority. Making the trade-off explicit — what will be slower, smaller or stopped — is what converts intent into a plan.'] },
      { h: 'A rhythm for revisiting', p: ['Conditions change faster than annual cycles. A short, regular forum with the authority to re-sequence keeps strategy current without reopening it constantly.'] }
    ]
  },
  {
    slug: 'building-a-culture-of-continuous-improvement', status: 'published', featured: false,
    title: 'Building a Culture of Continuous Improvement',
    subtitle: 'Moving beyond one-off efficiency projects.',
    excerpt: 'Continuous improvement is a supervisory routine before it is a methodology. Where the routine is missing, training rarely compensates.',
    category: 'Operational Excellence', contentType: 'Guide & Resource', industry: 'consumer-retail',
    services: ['operational-excellence'],
    tags: ['continuous improvement', 'capability', 'supervision'],
    author: 'insight-advora', date: '2026-08-11', readingTime: '5 min read',
    takeaways: [
      'Improvement capacity must be scheduled, not found.',
      'Supervisors carry the routine; training alone does not.',
      'Small, visible changes build more credibility than large programmes.',
      'Close the loop on ideas, including the ones declined.'
    ],
    sections: [
      { h: 'Routine before method', p: ['Organizations often adopt a methodology and expect behaviour to follow. In practice the behaviour depends on whether supervisors have time, mandate and a forum to act on what their teams raise.'] },
      { h: 'Schedule the capacity', p: ['Improvement work competes with delivery and loses by default. Protecting a small, predictable amount of time is the difference between a programme and an intention.'] },
      { h: 'Close the loop', p: ['Ideas that disappear teach people not to raise them. Responding to every suggestion — including a clear no with a reason — sustains participation better than incentives.'] }
    ]
  },
  {
    slug: 'ehs-management-systems-that-hold', status: 'published', featured: false,
    title: 'EHS Management Systems That Hold Between Audits',
    subtitle: 'Compliance follows the operating system, not the policy document.',
    excerpt: 'When findings repeat year after year, the issue is usually the corrective-action loop rather than the standard itself.',
    category: 'EHS', contentType: 'Article', industry: 'infrastructure',
    services: ['ehs-advisory', 'operational-excellence'],
    tags: ['EHS', 'audits', 'risk assessment', 'safety culture'],
    author: 'insight-advora', date: '2026-08-04', readingTime: '6 min read',
    takeaways: [
      'Consolidate obligations into one register with named owners.',
      'Treat repeat findings as a loop failure, not a training failure.',
      'Base risk assessment on work as actually performed.',
      'Make supervisory routines the primary control.'
    ],
    sections: [
      { h: 'The repeat-finding signal', p: ['A finding that recurs is information about the system that closes actions, not about the people who received the training. Tracing one repeat finding end to end usually explains several others.'] },
      { h: 'Work as done', p: ['Risk assessments written against the documented method miss the deviations that actually create exposure. Observing work as performed is the shortest route to an assessment that holds.'] },
      { h: 'Certification and scope', p: ['Insight Advora provides advisory support to prepare, strengthen and audit EHS systems. Certification is issued by accredited certification bodies.'] }
    ]
  },
  {
    slug: 'managing-transformation-in-a-changing-environment', status: 'draft', featured: false,
    title: 'Managing Transformation in a Changing Business Environment',
    subtitle: 'Draft — not published.',
    excerpt: 'A draft entry demonstrating that unpublished content never appears on the public Knowledge Hub.',
    category: 'Business Transformation', contentType: 'Article', industry: 'diversified-enterprises',
    services: ['business-growth-transformation'], tags: ['transformation'],
    author: 'insight-advora', date: '2026-09-18', readingTime: '7 min read',
    takeaways: [], sections: []
  }
];

/* Downloadable resources. Set `gated: true` to require the enquiry form first. */
window.IA_RESOURCES = [
  { title: 'Operational Diagnostic Checklist', type: 'Checklist', category: 'Operational Excellence', description: 'A structured set of questions for assessing where operating performance is created and lost.', gated: false, file: '' },
  { title: 'ESG Readiness Framework', type: 'Framework', category: 'ESG & Sustainability', description: 'A staged view of materiality, data ownership, governance and reporting readiness.', gated: true, file: '' },
  { title: 'Transaction Readiness Guide', type: 'Guide', category: 'M&A & Transactions', description: 'What to establish before diligence begins, and what to carry into integration.', gated: true, file: '' },
  { title: 'EHS Obligations Register Template', type: 'Template', category: 'EHS', description: 'A single-register format for applicable obligations, owners and review dates.', gated: false, file: '' }
];
