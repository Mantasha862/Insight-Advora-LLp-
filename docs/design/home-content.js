/* Insight Advora LLP — homepage content & media.
   Everything the admin panel will later manage for the homepage lives here.
   Advisory-meeting video (section 04): drop licensed footage into assets/ and fill in the paths below.
   Keep files small: 15–20 s seamless loop, 1600x900, H.264 MP4 (<5 MB) + WebM, no audio.
   It lazy-loads as the section approaches. Leave mp4/webm empty to show the poster / photo slot instead. */
window.IA_HOME = {
  meetingVideo: {
    mp4: '',            // e.g. 'videos/advisory-meeting.mp4'  (production: /public/videos/advisory-meeting.mp4)
    webm: '',           // e.g. 'videos/advisory-meeting.webm'
    poster: 'videos/advisory-meeting-poster.png', // TEMPORARY placeholder frame — replace with your licensed footage's poster
    playOnMobile: false // false = show the poster only on phones for speed
  },
  watermark: 'assets/monogram-alpha.png',
  heroPhrase: ['Strategy', 'Operations', 'EHS', 'ESG', 'Transformation'],
  about: {
    heading: 'Where Insight Meets Action.',
    paragraphs: [
      'Insight Advora LLP is a strategic advisory and consulting firm helping organizations improve performance, navigate transformation, manage risk and create sustainable long-term value.',
      'We bring together strategic thinking, operational understanding and sustainability-focused perspectives — working alongside leadership teams to turn informed decisions into practical action.'
    ],
    pillars: [
      { title: 'People', body: 'Building capable, engaged and empowered people.' },
      { title: 'Process', body: 'Creating efficient, consistent and scalable systems.' },
      { title: 'Planet', body: 'Integrating environmental responsibility and sustainability into business thinking.' },
      { title: 'Progress', body: 'Turning strategy and insight into meaningful, measurable advancement.' }
    ]
  },
  cta: {
    heading: 'Ready to Turn Insight Into Action?',
    body: 'Let\u2019s discuss the challenge, opportunity or transformation ahead.',
    button: 'Start a Conversation'
  }
};
