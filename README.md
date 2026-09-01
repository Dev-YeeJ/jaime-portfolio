# jaimeyee.vercel.app

Personal portfolio, resume and blog for Jaime Yee II — presenting three lanes of
work (development, design, virtual assistance) on one site.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Framer Motion ·
next-themes · MDX via next-mdx-remote.

---

## Before this is "finished"

Everything below is wired up and waiting on content. Search the codebase for `[ ]`
to find every one of them in place.

### Files to add

| File | Used by |
| --- | --- |
| `public/resume.pdf` | The Resume button in the nav, the footer, the contact card, and the experience page. All four already point here. |
| A hero portrait | `src/components/sections/hero.tsx` — a 4:5 slot is reserved. |

### Values to fill in

| Where | What |
| --- | --- |
| `src/lib/site.ts` | `linkedin` and `github` URLs. The social buttons and the contact card's LinkedIn row appear automatically once these are non-empty. |
| `src/lib/content.ts` → `projects` | The Petsy landing page URL and the Captura prototype link. A link button only renders when its `href` is non-empty, so nothing links to nowhere in the meantime. |
| `src/lib/content.ts` → `experience` | The VA client name, dates and measurable results; notable graphic design clients or pieces. |
| `src/lib/content.ts` → `testimonials` | Three real quotes. These render as visible "awaiting quote" cards until `quote`, `name` and `role` are set — deliberately, so they are hard to forget. |
| `src/lib/content.ts` → `services` | The brief referenced a copy-draft doc with one paragraph per service that was not supplied. The current paragraphs describe each offering and make no factual claims; swap them for the drafted copy when available. |

### Images

Every image slot uses `<ImagePlaceholder>`, which owns its aspect ratio and is a
drop-in swap:

```tsx
// before
<ImagePlaceholder label="[ ] Petsy — storefront screens" ratio="16/10" />

// after — no layout change
<Image src="/work/petsy.png" alt="Petsy storefront" fill
       sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
```

The design gallery's slots are listed in `designCategories` in
`src/lib/content.ts`, each captioned with what belongs there.

---

## Writing a post

Add an `.mdx` file to `content/blog/`:

```mdx
---
title: "Post title"
description: "One sentence, used on the list page and in link previews."
date: "2026-08-31"
lane: "build"   # build | design | support
tags: ["Flutter", "Firebase"]
---
```

Posts are sorted newest-first, appear on `/blog`, and the three most recent show
on the homepage. Reading time is calculated, not written.

Code blocks are highlighted at build time in a monochrome-blue theme defined in
`globals.css`. Dart is registered explicitly in `src/app/blog/[slug]/page.tsx`
because it is not in lowlight's default language bundle — add any other
non-common language the same way.

---

## Deploying

The Vercel project must be named **`jaimeyee`** for it to resolve to
`jaimeyee.vercel.app`. `package.json` is already named to match, so an import
from Git defaults to it. No environment variables are needed — the contact form
opens the visitor's own mail client rather than calling a backend.

---

## Notes on the build

A few decisions worth knowing about before editing:

- **The intro is CSS, not JavaScript.** An inline script in `layout.tsx` sets
  `data-intro="play"` before first paint, based on `sessionStorage` and
  `prefers-reduced-motion`; everything else is keyframes. That is why a returning
  visitor never sees a flash of it, and why the hero still animates in with
  JavaScript disabled.
- **The hero's entrance and the intro are one sequence.** `--hero-delay` shifts
  the hero's stagger so the name rises exactly as the intro mark lifts away.
- **Three motion verbs, used everywhere**: a fade-and-rise reveal, a hairline
  that wipes in from the left, and a small lift on hover. Adding a fourth is what
  would make the site feel busy.
- **Two corner radii, consistently**: actions are `rounded-full`, containers are
  `rounded-xl`.
- **White stays dominant.** Solid `--accent` is reserved for small elements —
  buttons, badges, the cursor dot, active filter chips. Section backgrounds are
  white or `--background-soft`, at most one tinted section per page.
