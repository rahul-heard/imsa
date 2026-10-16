/* ==========================================================================
   SITE CONTENT
   All headings, copy and labels live here, separate from the layout code.
   Edit the text between the quotes. Keep the commas and brackets as they are.
   ========================================================================== */

window.SITE_CONTENT = {
  /* ---------- Wordmark (temporary, easy to replace) ----------
     To use a real logo later: save it in /assets and set `logoSrc`
     to its path, e.g. "assets/logo.svg". The text is then used as
     the image's alternative text. */
  wordmark: {
    line1: "Indian Music Supervisors",
    line2: "Association (IMSA)",
    logoSrc: ""
  },

  /* ---------- Navigation ---------- */
  nav: [
    { label: "What Is Music Supervision?", href: "#what-is-music-supervision" },
    { label: "Focus Areas", href: "#focus-areas" },
    { label: "Members", href: "#members" }
  ],
  navCta: { label: "Get Involved", href: "#express-interest" },

  /* ---------- Hero / About (the landing section) ---------- */
  hero: {
    meta: ["Association in formation"],
    headline: "Making space for music supervision in India.",
    /* The first paragraph is set larger than the second. */
    paragraphs: [
      "Music is central to the way stories are told across Indian cinema, television, advertising, gaming and digital media. Yet the work of music supervisors often remains behind the scenes, and the profession is still not widely understood.",
      "We are bringing people together to build awareness, share knowledge and strengthen music supervision in India."
    ],
    status:
      "Music supervisors and music coordinators are at the heart of the association; everyone in music, screen and gaming is welcome to stay connected.",
    primaryCta: { label: "Get involved", href: "#express-interest" },
    secondaryCta: { label: "What is music supervision?", href: "#what-is-music-supervision" },
    /* Decorative timeline under the text. The four markers echo
       the stages of the work described further down the page. */
    cues: [
      { at: 9, label: "Find" },
      { at: 33, label: "Place" },
      { at: 58, label: "Clear" },
      { at: 83, label: "Deliver" }
    ]
  },

  /* ---------- What is music supervision? ---------- */
  what: {
    eyebrow: "The role",
    title: "What is music supervision?",
    intro:
      "Music supervision is the process of shaping, sourcing and managing music for film, television, advertising, gaming and other screen-based storytelling.",
    triad: [
      { label: "Creative", text: "What serves the story, the scene and the mood." },
      { label: "Commercial", text: "What fits the budget, the schedule and the release." },
      { label: "Rights", text: "What can be used, and on what terms." }
    ],
    listTitle: "The work can include",
    items: [
      {
        title: "Music research, discovery and curation",
        text: "Finding music that fits a scene, character or moment."
      },
      {
        title: "Licensing and clearance of compositions and master recordings",
        text: "Getting permission to use both, the song and the recording."
      },
      {
        title: "Coordination with artists, labels, publishers, composers and other rights holders",
        text: "Being the point of contact for the people who own or create the music."
      },
      {
        title: "Collaboration with directors, producers, editors and production teams",
        text: "Shaping musical choices with the creative team."
      },
      {
        title: "Music budgeting, scheduling, cue sheets and delivery requirements",
        text: "Tracking costs and deadlines, and the paperwork for every cue."
      }
    ],
    note:
      "Every project is different. A supervisor may take on a portion of this work, as required."
  },

  /* ---------- Focus areas ---------- */
  focus: {
    eyebrow: "Focus areas",
    title: "Where we hope to focus.",
    intro: "Areas we hope to build, together with the industry.",
    /* `keywords` is optional. Add e.g. keywords: ["Workshops", "Events"] to an
       item to show a short scannable list under it; leave it out for none. */
    items: [
      {
        title: "Awareness and education",
        text: "Conduct workshops and discussions on all matters at the intersection of music and visual media - from curation and music rights to cue sheets."
      },
      {
        title: "Credit and recognition",
        text: "Wider recognition for the craft through inclusion in awards, and clear, consistent credits on screen."
      },
      {
        title: "Community and resources",
        text: "Create and share localised repositories of music professionals across the country."
      },
      {
        title: "Collaboration and connections",
        text: "Working alongside industry bodies and international peers."
      }
    ]
  },

  /* ---------- Members / founding group ---------- */
  members: {
    eyebrow: "",
    title: "Members",
    subtitle: "The people behind the initiative.",
    intro: "",
    placeholderNote:
      "Placeholder profiles. Add people in members.js and these will be replaced.",
    placeholderCount: 4
  },

  /* ---------- Get involved ---------- */
  involve: {
    eyebrow: "Get involved",
    title: "Be part of the conversation.",
    intro:
      "We're building a community around music supervision in India. Tell us you're interested and we'll keep you updated as the association takes shape."
  },

  /* ---------- Form ----------
     Used for the labelled placeholder panel shown until an Airtable form
     is connected. It is also a handy checklist for building the form in
     Airtable, so the fields match what the page describes. */
  form: {
    title: "Express your interest",
    pendingBadge: "Form not connected yet",
    pendingText:
      "This is where the expression-of-interest form will appear. Nothing entered on this page is sent or stored anywhere. To switch the form on, add your Airtable form link in config.js.",
    specTitle: "Planned form fields",
    fields: [
      { label: "Full name", meta: "Required · Short text" },
      { label: "Email address", meta: "Required · Email" },
      { label: "Phone number", meta: "Optional · Phone" },
      {
        label: "Primary role / designation",
        meta: "Required · Single select",
        options: [
          "Music supervisor",
          "Music coordinator",
          "Director",
          "Producer",
          "Editor",
          "Post-production professional",
          "Composer",
          "Songwriter or lyricist",
          "Music producer",
          "Musician or artist",
          "Other"
        ]
      },
      {
        label: "How would you like to engage with us?",
        meta: "Required · Multiple select",
        options: [
          "Get involved with the association (including participation, networking, events, workshops and collaborations)",
          "Stay connected and learn more (including association updates and learning more about music supervision)"
        ]
      },
      {
        label: "Areas of interest",
        meta: "Optional · Multiple select",
        options: [
          "Awareness and education",
          "Rights, credits and compensation",
          "Knowledge and resources",
          "Industry collaboration",
          "Global connections"
        ]
      },
      { label: "Additional information", meta: "Optional · Long text" },
      {
        label: "I agree to receive relevant updates from the association",
        meta: "Required · Checkbox"
      }
    ],
    linkLabel: "Open the form in a new tab",
    embedFallback: "Form not loading?",
    embedTitle: "Expression of interest form"
  },

  /* ---------- Footer ---------- */
  footer: {
    description:
      "Building a stronger connection between the music and media industries in India.",
    emailPlaceholder: "contact@your-domain.example",
    emailLabel: "Contact",
    cta: "Express your interest",
    copyright: "Indian Music Supervisors Association (IMSA). All rights reserved."
  }
};
