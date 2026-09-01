export const site = {
  name: "Jaime Yee II",
  shortName: "Jaime Yee",
  initials: "JY",
  role: "IT Student · Developer & Designer · Virtual Assistant",
  description:
    "Jaime Yee II builds and designs digital products — and keeps the day-to-day work behind them running. Portfolio, resume, and notes from a 4th-year BS Information Technology student in Pangasinan, Philippines.",
  url: "https://jaimeyee.online",
  email: "jaimeyeev.2@gmail.com",
  location: "Pangasinan, Philippines",

  // [ ] Add the LinkedIn profile URL here — it is referenced by the nav,
  // the contact card and the footer, and those links stay hidden until it is set.
  linkedin: "",

  // [ ] Add the GitHub profile URL here (same behaviour as `linkedin`).
  github: "",

  // [ ] Drop the exported PDF at `public/resume.pdf`. The button is already wired
  // to this path everywhere, so no code change is needed once the file exists.
  resumeHref: "/resume.pdf",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Design", href: "/design" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;
