import { site } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*  Legal & policy documents                                                   */
/* -------------------------------------------------------------------------- */

/**
 * These describe how the site *actually* behaves, and nothing more. Every claim
 * below was checked against the code: the contact form really is a `mailto:`
 * hand-off with no server behind it, the only browser storage really is the
 * intro flag plus the theme, and the fonts really are self-hosted by
 * `next/font`. If any of that changes, the wording here has to change with it —
 * a policy describing collection that does not happen is as wrong as one hiding
 * collection that does.
 */

/** Paragraph, or a bullet list. Both accept `[label](href)` inline links. */
export type LegalBlock = string | { list: string[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDocument = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Shown in the masthead and in the page metadata. */
  updated: string;
  sections: LegalSection[];
};

export const LEGAL_UPDATED = "4 September 2026";

export const privacy: LegalDocument = {
  slug: "privacy",
  eyebrow: "Privacy",
  title: "Privacy policy",
  description:
    "What this site collects, what your browser stores, and what happens to a message you send me. The short answer is: very little, and no tracking.",
  updated: LEGAL_UPDATED,
  sections: [
    {
      heading: "The short version",
      blocks: [
        "This is a personal portfolio. There are no accounts, no advertising, no analytics scripts, and no tracking cookies. Nothing you type into the contact form is sent to a server I control.",
        "The only personal information I hold is what you choose to email me, and the technical connection records my hosting provider keeps in order to serve the page to you.",
      ],
    },
    {
      heading: "Who is responsible",
      blocks: [
        `This site is run by ${site.name}, based in ${site.location}. For anything on this page — including a request to see or delete what I hold — write to [${site.email}](mailto:${site.email}).`,
      ],
    },
    {
      heading: "The contact form",
      blocks: [
        "The form on the contact section has no backend. It validates what you have typed in your own browser and then opens your email application with the subject and message already filled in. Nothing leaves your device until you press send in your own mail client, and I never receive a copy through this website.",
        "That also means an unsent draft goes nowhere: if you close the tab without sending, no record of it exists anywhere.",
      ],
    },
    {
      heading: "Cookies and browser storage",
      blocks: [
        "This site sets no cookies. None for analytics, none for advertising, and none from the host — a request for any page here comes back without a single `Set-Cookie` header.",
        "It does keep two small values in your browser's own storage. The rules on this cover anything stored on your device, not only cookies, so both are listed here even though neither is one. Both are functional, both stay on your device, and neither is ever transmitted anywhere:",
        {
          list: [
            "`jy-intro` in session storage — remembers that you have already seen the opening animation, so it plays once per browsing session rather than on every page. It disappears when you close the tab.",
            "`theme` in local storage — written only if you choose light or dark from the theme switch. Without a choice, the site follows your system setting and writes nothing.",
          ],
        },
        "Neither identifies you, neither follows you to another site, and clearing your browser's site data removes both. There is no cookie banner because there is nothing here to consent to — and a banner asking permission for storage that does not exist would be theatre rather than transparency. If that ever changes, this section changes first.",
      ],
    },
    {
      heading: "What the hosting provider records",
      blocks: [
        "The site runs on Cloudflare. Like any web host, Cloudflare processes technical connection data — IP address, browser user-agent, the page requested and the time — in order to deliver pages and to protect against attack and abuse. That processing is covered by [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/).",
        "I may see aggregate traffic figures through Cloudflare's dashboard, such as how many people visited a page. These are counts, not profiles, and I cannot use them to identify individual visitors.",
      ],
    },
    {
      heading: "Third parties, and the ones that are absent",
      blocks: [
        "The typefaces are downloaded at build time and served from this domain, so displaying the site sends no request to Google Fonts or any other font host. There are no embedded videos, no social media widgets, no comment system, no advertising network, and no analytics product.",
        "Links to other places — LinkedIn, GitHub, Behance, and any project link — are ordinary links. Once you follow one, that site's own privacy policy governs what happens next.",
      ],
    },
    {
      heading: "Email you send me",
      blocks: [
        `Messages arrive in a Gmail mailbox, so Google processes them as my email provider. I keep correspondence for as long as it is useful — to reply, and to keep a record of enquiries and work — and I do not add anyone to a mailing list or share addresses with anyone else. Ask me at [${site.email}](mailto:${site.email}) and I will delete what I hold.`,
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        "Under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), you have the right to be informed, to access what I hold about you, to have it corrected, to object to processing, to have it erased or blocked, to data portability, and to be indemnified for damages. You can exercise any of these by email, and I will respond as quickly as I reasonably can.",
        "If you believe I have handled your information badly, you may complain to the [National Privacy Commission](https://www.privacy.gov.ph/). If you are in the UK or the European Economic Area, the equivalent rights under the UK GDPR and the EU GDPR apply, and you may complain to your local supervisory authority.",
      ],
    },
    {
      heading: "Children",
      blocks: [
        "This site is a professional portfolio aimed at employers, clients and collaborators. It is not directed at children, and it asks no one for their age or any other personal detail.",
      ],
    },
    {
      heading: "Changes to this policy",
      blocks: [
        `If the site starts doing something new — an analytics tool, a form that posts to a server, a newsletter — this page gets updated before that ships, and the date at the top changes with it. This version is from ${LEGAL_UPDATED}.`,
      ],
    },
  ],
};

export const terms: LegalDocument = {
  slug: "terms",
  eyebrow: "Terms",
  title: "Terms of use",
  description:
    "The ground rules for using this site: who owns the work shown here, what you are welcome to do with it, and the limits of what it promises.",
  updated: LEGAL_UPDATED,
  sections: [
    {
      heading: "Using this site",
      blocks: [
        "By browsing this site you accept the terms on this page. They are deliberately short, because this is a portfolio rather than a service: there is nothing to sign up for and nothing to buy.",
      ],
    },
    {
      heading: "Who owns what",
      blocks: [
        `The writing, code, layout, photographs and design work on this site are mine — © ${new Date().getFullYear()} ${site.name} — unless stated otherwise on the piece itself.`,
        "Some work was made for or alongside other people and organisations: schools, a barangay, campaign teams, clients and classmates. Their names, seals, logos and likenesses belong to them and appear here only to show the context the work was made in. If you are one of those parties and want a piece taken down, email me and I will remove it.",
      ],
    },
    {
      heading: "What you are welcome to do",
      blocks: [
        "Read it, share links to it, and quote a short passage with attribution and a link back. If you want to use a design, an image or a longer excerpt for something of your own, ask first — the answer is usually yes.",
      ],
    },
    {
      heading: "What you should not do",
      blocks: [
        {
          list: [
            "Republish substantial parts of the site, or present the work shown here as your own.",
            "Use the work, my name or my likeness to imply that I endorse a product, a person or an organisation.",
            "Bulk-copy the site by automated means, including scraping for dataset or model training. I reserve those rights; ordinary search-engine indexing is welcome.",
            "Attempt to disrupt the site or to reach parts of it that are not published.",
          ],
        },
      ],
    },
    {
      heading: "About the work shown",
      blocks: [
        "Project pages describe work at a point in time. Some pieces are academic or volunteer work, some were built with a team, and some are no longer live — where a project has no public link, the page says so rather than inventing one. Screenshots and animations illustrate the work; they are not a guarantee that a system is currently running.",
      ],
    },
    {
      heading: "No warranty, and no professional advice",
      blocks: [
        "This site is provided as it is. I write the technical notes on the blog carefully, but they are notes from my own experience, not professional advice, and any code in them comes without warranty of any kind. Test anything you borrow before it touches something that matters. To the extent the law allows, I am not liable for loss arising from use of this site or anything taken from it.",
      ],
    },
    {
      heading: "Links out",
      blocks: [
        "Where this site links elsewhere, I do not control what is on the other end and I am not responsible for it.",
      ],
    },
    {
      heading: "An enquiry is not a contract",
      blocks: [
        "Nothing here is a binding offer of work or services, and sending me a message does not create an engagement. Any actual work is agreed separately, in writing, including scope, price and timing.",
      ],
    },
    {
      heading: "Changes and governing law",
      blocks: [
        `These terms may change as the site does; the date at the top says when they last did. This version is from ${LEGAL_UPDATED}. They are governed by the laws of the Republic of the Philippines.`,
      ],
    },
  ],
};

export const accessibility: LegalDocument = {
  slug: "accessibility",
  eyebrow: "Accessibility",
  title: "Accessibility statement",
  description:
    "What has been built into this site so it can be used with a keyboard, a screen reader, or reduced motion — and where it still falls short.",
  updated: LEGAL_UPDATED,
  sections: [
    {
      heading: "The goal",
      blocks: [
        "This site aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. It has not been independently audited, so treat that as an intention I work towards rather than a certified result.",
      ],
    },
    {
      heading: "What is in place",
      blocks: [
        {
          list: [
            "A skip link to the main content, as the first thing a keyboard reaches on every page.",
            "One consistent focus outline on every interactive element, which follows each element's own shape.",
            "Reduced motion is respected: with that setting on, the page animations settle, smooth scrolling stops, hover lifts are removed, and the custom cursor never mounts at all. It is also never used on touch devices.",
            "Headings, landmarks and lists are marked up semantically, and the gallery announces its result count as you filter.",
            "Meaningful images carry alt text that describes the piece; frames still waiting on an asset are labelled rather than left as broken images.",
            "Light and dark themes, following your system setting until you choose otherwise.",
            "The gallery lightbox opens from a real button, closes with Escape, and moves focus to the close button when it opens.",
          ],
        },
      ],
    },
    {
      heading: "Where it still falls short",
      blocks: [
        {
          list: [
            "The design gallery includes poster and tarpaulin work whose text lives inside the image. The alt text summarises each one, but that text cannot be selected, searched or resized.",
            "PDFs — the resume and the certificate — are exported documents whose internal tagging I do not fully control, so a screen reader may find them harder going than the pages themselves.",
            "The lightbox does not yet trap focus inside itself while open.",
            "Some parts of the site are still placeholder frames while the real assets are prepared.",
          ],
        },
      ],
    },
    {
      heading: "If something blocks you",
      blocks: [
        `Email me at [${site.email}](mailto:${site.email}) with the page, what you were trying to do, and what got in the way — including the browser or assistive technology you use, if you can. I will reply, and I would rather fix a real barrier than keep a tidy statement.`,
      ],
    },
  ],
};

export const legalDocuments = [privacy, terms, accessibility] as const;

export const legalLinks = legalDocuments.map((doc) => ({
  label: doc.eyebrow,
  href: `/${doc.slug}`,
}));

export const getLegalDocument = (slug: string) =>
  legalDocuments.find((doc) => doc.slug === slug);
