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
      "Insight Advora LLP is a strategic advisory and consulting firm helping organizations improve performance, navigate transformation, manage risk and create sustainable long-term value.",
      "We bring together strategic thinking, operational understanding and sustainability-focused perspectives — working alongside leadership teams to turn informed decisions into practical action."
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
