/**
 * Every word of copy on this site lives here, so it can be edited without
 * touching layout code. Anything still unknown is marked with a `[ ]` so it is
 * visible both in the source and, where appropriate, on the rendered page.
 */

/* -------------------------------------------------------------------------- */
/*  Lanes                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The three lanes are the organising spine of the whole site: a generalist is
 * only credible if each lane is legible on its own. The same three ids tag
 * services, projects and blog posts, and drive the filters on /projects.
 */
export type LaneId = "build" | "design" | "support";

export type Lane = {
  id: LaneId;
  label: string;
  title: string;
  blurb: string;
  href: string;
};

export const lanes: Lane[] = [
  {
    id: "build",
    label: "Build",
    title: "Software development",
    blurb:
      "Web and mobile products, front to back — React and Next.js, Laravel and Node, Flutter on Firebase.",
    href: "/projects",
  },
  {
    id: "design",
    label: "Design",
    title: "UI/UX & graphic design",
    blurb:
      "Interfaces, brand marks and campaign work in Figma, the Adobe tools, Canva and Blender.",
    href: "/design",
  },
  {
    id: "support",
    label: "Support",
    title: "Virtual assistance",
    blurb:
      "Customer support, social media, email and calendar, data entry — the work that keeps a day running.",
    href: "/experience#services",
  },
];

/* -------------------------------------------------------------------------- */
/*  Hero + About                                                               */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Hi, I'm",
  name: ["Jaime", "Yee II"],
  role: "IT Student · Developer & Designer · Virtual Assistant",
  subhead:
    "I build and design digital products — and I keep the day-to-day work behind them running, from customer support to social media to data entry. Whatever the job needs, I can build it, design it, or handle it.",
  /*
    The hero figure is a *cut-out* portrait — a PNG with the background removed —
    standing in front of the nameplate, with the name drawn behind it so the two
    read as one composition rather than a photo parked beside a heading.

    Set `portraitSrc` back to "" at any time and the hero falls back to a
    silhouette stand-in with the identical footprint — useful while swapping the
    photo, since the layout will not shift either way.
  */
  portraitSrc: "/portrait.png",
  portraitAlt:
    "Jaime Yee II, wearing glasses and a blue and white polo shirt, arms folded with one hand raised to his face.",
  portraitLabel: "[ ] Cut-out portrait — background-removed PNG",
  /*
    Intrinsic size of the cut-out. Only the ratio is used — to reserve the slot
    and prevent layout shift — so it need only match the real file's proportions.
    The file in place is 908x1024.
  */
  portraitWidth: 908,
  portraitHeight: 1024,
};

export const about = {
  heading: "A bit about me",
  paragraphs: [
    "I'm a 4th-year BS Information Technology student at Urdaneta City University, graduating in 2027. My work covers three lanes: building software, designing how it looks and feels, and doing the hands-on support work that keeps a business or organization running day to day.",
    "On the development side, I work across web and mobile: React and Next.js on the frontend, Laravel and Node.js on the backend, and Flutter/Dart for mobile apps backed by Firebase. On the design side, I do UI/UX, branding, and graphic design in Figma, Photoshop, Illustrator, and Canva, plus some 3D work in Blender. And on the support side, I've handled customer support, social media management, email management, and data entry for real clients and organizations — the kind of reliable, detail-heavy work a Virtual Assistant role is built on.",
    "Outside of coursework, I'm Public Relations Officer for the Junior Information Technology Society (JITS) and an elected Sangguniang Kabataan (SK) Councilor — both roles built around communication, coordination, and follow-through, which carries directly into VA work. I also have a background in film, including a Best Director win at the Orata Film Festival, which shows up in how I think about pacing and storytelling — on screen, in a UI, and in how I write for social media.",
  ],
};

export type Stat = { value: string; detail: string };

export const stats: Stat[] = [
  {
    value: "Two-time competitor",
    detail: "13th & 14th IT Olympics, Computer Network Category",
  },
  { value: "Best Director", detail: "Orata Film Festival" },
  {
    value: "Public Relations Officer",
    detail: "Junior Information Technology Society (JITS)",
  },
  {
    value: "Elected Councilor",
    detail: "Sangguniang Kabataan (SK), since 2023",
  },
];

/* -------------------------------------------------------------------------- */
/*  Achievements                                                               */
/* -------------------------------------------------------------------------- */

export type Achievement = { title: string; detail: string; year?: string };

export const achievements: Achievement[] = [
  {
    title: "13th IT Olympics",
    detail: "Computer Network Category — national-level competitor",
  },
  {
    title: "14th IT Olympics",
    detail: "Computer Network Category — national-level competitor",
  },
  {
    title: "Champion, Tarpaulin Making",
    detail: "Cluster VI Technolympics",
    year: "2023",
  },
  {
    title: "2nd Place, Tarpaulin Making",
    detail: "Division Technolympics",
    year: "2023",
  },
  {
    title: "With High Honors",
    detail: "Grade 12, ICT Strand",
    year: "S.Y. 2022–2023",
  },
  {
    title: "Students' Leadership Course",
    detail: "UCU Academy — Certificate of Completion",
  },
];

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export type SkillGroup = { group: string; lane: LaneId | "all"; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    group: "Languages",
    lane: "build",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "PHP", "Dart", "SQL"],
  },
  {
    group: "Web development",
    lane: "build",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "Laravel", "Node.js", "REST APIs"],
  },
  {
    group: "Mobile development",
    lane: "build",
    items: ["Flutter", "React Native", "Expo"],
  },
  {
    group: "Backend, cloud & data",
    lane: "build",
    items: ["Firebase", "MySQL", "Cloudflare", "Google APIs"],
  },
  {
    group: "UI/UX & graphic design",
    lane: "design",
    items: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Canva",
      "Blender (3D)",
      "Wireframing & prototyping",
    ],
  },
  {
    group: "Virtual assistance & support",
    lane: "support",
    items: [
      "Customer support",
      "Social media management",
      "Email management",
      "Data entry",
      "Scheduling",
      "General admin",
    ],
  },
  {
    group: "Also",
    lane: "all",
    items: [
      "OpenCV & Python desktop apps (CustomTkinter)",
      "Video editing (CapCut)",
      "Photo editing",
      "Cisco Packet Tracer / networking",
      "Public speaking",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * NOTE: the brief referenced a separate copy-draft doc holding one paragraph per
 * service. That doc was not supplied, so these paragraphs describe the offering
 * itself and make no claims about clients, dates or results. Swap them for the
 * drafted copy verbatim when it is available.
 */
export type Service = {
  title: string;
  lane: LaneId;
  description: string;
};

export const services: Service[] = [
  {
    title: "Customer support",
    lane: "support",
    description:
      "First-line support over email, chat and social inboxes: answering questions, tracking issues until they are closed, and keeping the tone consistent with the brand. I write clear replies, escalate what I cannot resolve, and keep a record of what keeps coming up so it can be fixed at the source.",
  },
  {
    title: "Social media management",
    lane: "support",
    description:
      "Planning, scheduling and publishing posts, writing captions, and staying on top of comments and messages. My film background shows up here: I think about pacing and sequence, not just individual posts, so a feed reads as a run of related beats instead of scattered uploads.",
  },
  {
    title: "Data entry",
    lane: "support",
    description:
      "Accurate, structured entry and clean-up of records, spreadsheets and databases — deduping, normalising formats, and flagging the rows that do not add up rather than quietly passing them through. Detail-heavy work that has to be right the first time.",
  },
  {
    title: "Email & calendar management",
    lane: "support",
    description:
      "Inbox triage, drafted replies, and filters and labels that hold up over time, plus scheduling and reminders so nothing slips. The goal is that you open your inbox and only see what actually needs you.",
  },
  {
    title: "Mobile app UI/UX",
    lane: "design",
    description:
      "End-to-end app interface work — flows, wireframes and high-fidelity screens in Figma, drawn with the constraints of a real Flutter or React Native build in mind, because I am often the one building it too.",
  },
  {
    title: "Web design & development",
    lane: "build",
    description:
      "Responsive marketing sites, dashboards and web apps, designed and then actually shipped: React and Next.js on the front, Laravel or Node behind it, with the accessibility and performance basics handled rather than bolted on later.",
  },
  {
    title: "Logo & brand design",
    lane: "design",
    description:
      "Logos, wordmarks and the small system around them — colour, type, and the alternate lockups you need the moment a mark has to sit on a dark background, a sticker, or an app icon.",
  },
  {
    title: "3D & layout design",
    lane: "design",
    description:
      "Blender renders and product mockups for when a flat graphic will not carry the idea, plus print and publication layout — programs, certificates, spreads and infographics set for real output.",
  },
  {
    title: "Campaign & poster design",
    lane: "design",
    description:
      "Event posters, tarpaulins and campaign sets built to be read across a room and to hold together as a series — the format I have competed in and won at, at cluster and division level.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                 */
/* -------------------------------------------------------------------------- */

export type Role = {
  title: string;
  org: string;
  period: string;
  lane: LaneId;
  points: string[];
};

export const experience: Role[] = [
  {
    title: "Virtual Assistant (Freelance)",
    org: "Nexus Digital Management (Mockup)",
    period: "Jan 2023 – Dec 2023",
    lane: "support",
    points: [
      "Handled daily social media, email, and data entry for freelance clients.",
      "Managed support channels for three accounts, keeping response times under two hours and ensuring accurate record-keeping.",
    ],
  },
  {
    title: "Graphic Designer (Freelance)",
    org: "Independent",
    period: "Since Grade 12",
    lane: "design",
    points: [
      "Designed logos, posters, and layouts for local clients and school organizations.",
      "Created branding and marketing materials for local businesses like Coftea Umingan.",
    ],
  },
  {
    title: "Public Relations Officer",
    org: "Junior Information Technology Society (JITS)",
    period: "August 2026 – present",
    lane: "support",
    points: [
      "Handles announcements, event promotion, and communication between the org and its members.",
      "Coordinates with officers on scheduling and follow-through for org activities.",
    ],
  },
  {
    title: "Elected Councilor",
    org: "Sangguniang Kabataan (SK)",
    period: "Since August 2023",
    lane: "support",
    points: [
      "Elected youth council role covering community coordination, communication, and programme follow-through.",
    ],
  },
];

export type Certification = {
  title: string;
  org: string;
  detail: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    title: "IAS SUMMIT 2.0 - Empowering Future-Ready Professionals through Cyber Resilience and Ethical Information Assurance",
    org: "Urdaneta City University",
    detail: "Certificate of Participation",
    href: "/certificates/ias-summit-2026.pdf",
  },
  {
    title: "Students' Leadership Course",
    org: "UCU Academy",
    detail: "Certificate of Completion",
  },
];

export const education = {
  degree: "BS Information Technology",
  school: "Urdaneta City University",
  period: "4th year · graduating 2027",
  note: "With High Honors — Grade 12, ICT Strand (S.Y. 2022–2023)",
};

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  lane: LaneId;
  status: "Shipped" | "In progress" | "Concept";
  featured: boolean;
  imageLabel: string;
  imageRatio: string;
  highlights?: string[];
  links: ProjectLink[];
  /** Rendered under the card when a link is deliberately missing. */
  linkNote?: string;
  /** Optional Lottie animation JSON file path to use instead of image. */
  lottieSrc?: string;
};

export const projects: Project[] = [
  {
    slug: "i-peso",
    title: "i-PESO: Smart Employment System",
    summary:
      "My main capstone project: a multi-platform system digitizing and improving PESO Urdaneta's employment and recruitment processes.",
    description:
      "A comprehensive smart employment system designed specifically for Urdaneta City. Currently in active development, this capstone project bridges the gap between local job seekers, employers, and the local government. The system spans three platforms: a React web frontend, a React Native mobile app, and a Laravel backend. Key features being built include AI-based job matching, an ATS/Kanban recruitment flow, automated DOLE reports, a Hybrid Job Fair QR system, and deep labor market analytics.",
    stack: ["React", "Vite", "Laravel", "MySQL", "React Native", "Expo"],
    lane: "build",
    status: "In progress",
    featured: true,
    imageLabel: "[ ] i-PESO — dashboard or app mockups",
    imageRatio: "16/10",
    highlights: [
      "AI/skill-based job matching and ATS/Kanban recruitment",
      "React + Vite frontend, React Native mobile app, Laravel backend",
      "Hybrid Job Fair QR system and automated DOLE reporting",
    ],
    links: [],
    linkNote: "In development — repository & live link coming soon",
  },
  {
    slug: "barangay-calbueg-ims",
    title: "Barangay Calbueg Information Management System",
    summary:
      "A civic records system with eight role-based dashboards, built around one barangay's real workflow.",
    description:
      "A full-stack information system for barangay operations. Eight separate role-based dashboards — Captain, Secretary, Treasurer, Kagawad, SK, Health, Tanod, and a resident portal — each scoped to what that role actually does: resident and household records, document requests and issuance, incident and blotter reports, health and medicine tracking, financial transactions, project monitoring, and announcements.",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Bootstrap"],
    lane: "build",
    status: "Shipped",
    featured: true,
    imageLabel: "[ ] Barangay IMS — Captain dashboard screenshot",
    imageRatio: "16/10",
    highlights: [
      "Eight role-scoped dashboards behind one auth system",
      "Document requests, issuance and blotter reports end to end",
      "Health, medicine, finance and project monitoring modules",
    ],
    links: [],
    // [ ] Confirm whether this is actively deployed and in use, then either add a
    // live link above or delete this note.
    linkNote: "[ ] Confirm deployment status",
  },
  {
    slug: "automated-event-photobooth",
    title: "Automated Event Photobooth System",
    summary:
      "A dual-screen photobooth that shoots, brands, uploads and hands back a QR code — offline-tolerant by design.",
    description:
      "A Python desktop application that runs a live event photobooth across two screens at once: an operator console and a guest-facing display. It captures a four-photo sequence automatically, composites the results onto a branded layout, syncs to the cloud through a retry queue that survives a dropped connection, and returns the finished set to the guest as a QR code. Layout and branding are driven by a JSON config, so a new event is a config change rather than a code change.",
    stack: ["Python", "OpenCV", "CustomTkinter", "Cloudflare R2", "Google Drive API"],
    lane: "build",
    status: "Shipped",
    featured: true,
    imageLabel: "[ ] Photobooth — demo GIF or video of the capture sequence",
    imageRatio: "16/10",
    highlights: [
      "Dual-screen operator console and guest display",
      "Offline-first cloud sync with a retry queue",
      "Instant QR-code delivery, JSON-configurable branding",
    ],
    links: [],
  },
  {
    slug: "petsy",
    title: "Petsy",
    summary:
      "An e-commerce app for pet products, with a customer storefront and an admin dashboard in one Flutter codebase.",
    description:
      "A Flutter and Firebase e-commerce app for pet products. It ships two experiences from one codebase: a customer-facing storefront for browsing and ordering, and an admin dashboard for managing the catalogue. Along the way it grew a reusable multi-source image component that resolves network, asset, and uploaded images through a single interface — the kind of small primitive that quietly removes a whole class of bugs.",
    stack: ["Flutter", "Dart", "Firebase"],
    lane: "build",
    status: "Shipped",
    featured: true,
    imageLabel: "[ ] Petsy — storefront and admin dashboard screens",
    imageRatio: "16/10",
    highlights: [
      "Customer storefront and admin dashboard in one codebase",
      "Firebase-backed catalogue and orders",
      "Reusable multi-source image component",
    ],
    lottieSrc: "/petsy.lottie",
    links: [
      {
        label: "User manual on Behance",
        href: "https://www.behance.net/gallery/218837781/Petsy-Application",
      },
      // [ ] Paste the GitHub Pages URL for the Petsy landing page between the quotes
      // below and the "View live" button appears on its own.
      { label: "View live", href: "" },
    ],
  },
  {
    slug: "captura",
    title: "Captura",
    summary:
      "A booking app concept for photography and videography services, designed around how a shoot actually gets booked.",
    description:
      "A Flutter booking app concept for photography and videography services: portfolio browsing, package selection, a booking flow, and contact. The design work went into the order of that flow — portfolio first, because clients decide on the work before they care about the price list.",
    stack: ["Flutter", "Dart"],
    lane: "design",
    status: "Concept",
    featured: false,
    imageLabel: "[ ] Captura — booking flow screens",
    imageRatio: "16/10",
    highlights: [
      "Portfolio browsing, packages, booking flow and contact",
      "Splash-screen pattern reused in this site's intro",
    ],
    // [ ] Paste the design or Jitter prototype link here to reveal the button.
    links: [{ label: "View prototype", href: "" }],
  },
  {
    slug: "web-dev-yee",
    title: "WEB-DEV-YEE — Design Portfolio Showcase",
    summary:
      "A multi-page portfolio built from scratch — and the source material for this site's design gallery.",
    description:
      "A hand-built, multi-page portfolio organised into design galleries by category, written in plain HTML, CSS, and JavaScript for a school project. Its large condensed nameplate is where this site's Anton hero treatment comes from, and its galleries are the source material for the design section here.",
    stack: ["HTML", "CSS", "JavaScript"],
    lane: "design",
    status: "Shipped",
    featured: false,
    imageLabel: "[ ] WEB-DEV-YEE — gallery page screenshot",
    imageRatio: "16/10",
    links: [{ label: "See the gallery", href: "/design" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* -------------------------------------------------------------------------- */
/*  Design gallery                                                             */
/* -------------------------------------------------------------------------- */

export type DesignItem = { label: string; ratio: string };

export type DesignCategory = {
  id: string;
  name: string;
  blurb: string;
  items: DesignItem[];
};

export const designIntro =
  "A selection of UI/UX, branding, and visual design work across categories — built in Figma, Photoshop, Illustrator, Canva, and Blender.";

export const designCategories: DesignCategory[] = [
  {
    id: "campaign",
    name: "Campaign Posters",
    blurb: "Event posters and tarpaulins built to be read across a room.",
    items: [
      { label: "[ ] Tarpaulin — Cluster VI Technolympics 2023 (Champion)", ratio: "3/4" },
      { label: "[ ] Tarpaulin — Division Technolympics 2023 (2nd Place)", ratio: "3/4" },
      { label: "[ ] JITS event poster", ratio: "3/4" },
      { label: "[ ] SK community announcement poster", ratio: "3/4" },
    ],
  },
  {
    id: "web",
    name: "Web Design",
    blurb: "Page layouts and interface design for the browser.",
    items: [
      { label: "[ ] WEB-DEV-YEE — homepage layout", ratio: "16/10" },
      { label: "[ ] Barangay IMS — dashboard UI", ratio: "16/10" },
      { label: "[ ] Petsy — landing page", ratio: "16/10" },
    ],
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    blurb: "Flows, wireframes, and high-fidelity product screens.",
    items: [
      { label: "[ ] Captura — booking flow screens", ratio: "4/5" },
      { label: "[ ] Petsy — storefront screens", ratio: "4/5" },
      { label: "[ ] Petsy — admin dashboard screens", ratio: "4/5" },
      { label: "[ ] Wireframe set — [ ] project name", ratio: "4/5" },
    ],
  },
  {
    id: "layout",
    name: "Layout Design",
    blurb: "Print and publication work set for real output.",
    items: [
      { label: "[ ] Publication spread — [ ] title", ratio: "4/3" },
      { label: "[ ] Program / certificate layout", ratio: "4/3" },
      { label: "[ ] Infographic layout", ratio: "4/3" },
    ],
  },
  {
    id: "3d",
    name: "3D Design",
    blurb: "Blender renders and product mockups.",
    items: [
      { label: "[ ] Blender render — [ ] subject", ratio: "1/1" },
      { label: "[ ] Blender render — [ ] subject", ratio: "1/1" },
      { label: "[ ] Product mockup — [ ] subject", ratio: "1/1" },
    ],
  },
  {
    id: "logo",
    name: "Logo & Brand Design",
    blurb: "Marks, wordmarks, and the small systems around them.",
    items: [
      { label: "[ ] Logo — [ ] client name", ratio: "1/1" },
      { label: "[ ] Logo — [ ] client name", ratio: "1/1" },
      { label: "[ ] Wordmark — [ ] client name", ratio: "1/1" },
      { label: "[ ] Brand mark exploration sheet", ratio: "1/1" },
    ],
  },
  {
    id: "petsy",
    name: "Petsy Branding",
    blurb: "The identity built alongside the Petsy app.",
    items: [
      { label: "[ ] Petsy logo — primary lockup", ratio: "1/1" },
      { label: "[ ] Petsy logo — white version", ratio: "1/1" },
      { label: "[ ] Petsy app icon", ratio: "1/1" },
      { label: "[ ] Petsy colour and type sheet", ratio: "1/1" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* -------------------------------------------------------------------------- */

/**
 * These render as visible "awaiting quote" cards on purpose — no invented
 * praise, and no forgetting to replace them. Fill in `quote`, `name` and `role`
 * and the card switches to its finished state automatically.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  prompt: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "jits",
    quote: "",
    name: "",
    role: "",
    prompt: "A JITS officer or colleague, on what it is like to work with Jaime.",
  },
  {
    id: "sk",
    quote: "",
    name: "",
    role: "",
    prompt: "A fellow councilor or constituent, on follow-through in the SK role.",
  },
  {
    id: "client",
    quote: "",
    name: "",
    role: "",
    prompt: "A freelance or VA client, on reliability and communication.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contact = {
  heading: "Let's talk",
  subhead:
    "Open to internships, freelance projects, Virtual Assistant work, and collaborations — reach out below.",
};
