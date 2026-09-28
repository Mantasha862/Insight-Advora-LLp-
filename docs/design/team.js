/* Insight Advora LLP — team data.
   Add, edit or remove members here; the Team page and profile pages read this file.
   No UI code needs to change. Leave bracketed values as placeholders until real
   details are confirmed — nothing here should be invented.

   Fields:
     slug         URL key, used by TeamProfile.dc.html?slug=...  (keep unique, lowercase, hyphenated)
     name         Full name
     designation  Role at the firm
     qualification Degrees / professional qualifications
     photo        Optional image URL. Leave "" to keep the drag-and-drop photo slot.
     expertise    Array of short tags
     bio          80–120 words
     focus        Short "professional focus" paragraph for the profile page
     linkedin     Profile URL, or "" to hide the link
     email        Optional; leave "" unless the person has agreed to publish it
     category     One of: leadership | advisory | functional | associates | domain
*/
window.IA_TEAM_CATEGORIES = [
  { key: 'leadership', num: '01', label: 'Leadership', note: 'Guiding the firm. Shaping the perspective.' },
  { key: 'advisory', num: '02', label: 'Advisory Team', note: 'Client-facing advisory across practices.' },
  { key: 'functional', num: '03', label: 'Functional Specialists', note: 'Deep expertise in a single discipline.' },
  { key: 'associates', num: '04', label: 'Strategic Associates', note: 'Engaged for specific assignments and mandates.' },
  { key: 'domain', num: '05', label: 'Domain Experts', note: 'Sector and regulatory perspective.' }
];

window.IA_TEAM = [
  {
    slug: 'leadership-1', name: '[ Team Member Name ]', designation: '[ Designated Partner ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Strategy', 'Operations', 'Corporate Advisory'],
    bio: '[ Short biography — 80 to 120 words. Describe professional background, the kinds of engagements this person leads, the disciplines they bring together and the perspective they contribute to client work. Keep it factual: roles held, functional depth and areas of focus, without claims that cannot be evidenced. ]',
    focus: '[ Professional focus — two or three sentences on the problems this person works on most often and how they approach them. ]',
    linkedin: '#', email: '', category: 'leadership'
  },
  {
    slug: 'leadership-2', name: '[ Team Member Name ]', designation: '[ Designated Partner ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['ESG', 'EHS', 'Sustainability'],
    bio: '[ Short biography — 80 to 120 words. Describe professional background, the kinds of engagements this person leads, the disciplines they bring together and the perspective they contribute to client work. ]',
    focus: '[ Professional focus — two or three sentences on the problems this person works on most often and how they approach them. ]',
    linkedin: '#', email: '', category: 'leadership'
  },
  {
    slug: 'advisory-1', name: '[ Team Member Name ]', designation: '[ Designation ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Operational Excellence', 'Process Improvement'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'advisory'
  },
  {
    slug: 'advisory-2', name: '[ Team Member Name ]', designation: '[ Designation ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['M&A', 'Due Diligence', 'Integration'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'advisory'
  },
  {
    slug: 'advisory-3', name: '[ Team Member Name ]', designation: '[ Designation ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Business Growth', 'Transformation'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'advisory'
  },
  {
    slug: 'functional-1', name: '[ Team Member Name ]', designation: '[ Designation ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['EHS Compliance', 'Audits', 'Risk'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'functional'
  },
  {
    slug: 'functional-2', name: '[ Team Member Name ]', designation: '[ Designation ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Sustainability Reporting', 'ESG Assessment'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'functional'
  },
  {
    slug: 'associates-1', name: '[ Team Member Name ]', designation: '[ Strategic Associate ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Strategy', 'Decision Support'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'associates'
  },
  {
    slug: 'associates-2', name: '[ Team Member Name ]', designation: '[ Strategic Associate ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Performance Management'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'associates'
  },
  {
    slug: 'domain-1', name: '[ Team Member Name ]', designation: '[ Domain Expert ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Manufacturing', 'Infrastructure'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'domain'
  },
  {
    slug: 'domain-2', name: '[ Team Member Name ]', designation: '[ Domain Expert ]',
    qualification: '[ Qualifications ]', photo: '',
    expertise: ['Energy & Environment', 'Regulatory'],
    bio: '[ Short biography — 80 to 120 words. ]',
    focus: '[ Professional focus. ]', linkedin: '#', email: '', category: 'domain'
  }
];

/* Careers block on the Team page: set to false to hide it entirely. */
window.IA_CAREERS_ACTIVE = true;
