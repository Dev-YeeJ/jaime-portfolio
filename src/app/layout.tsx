import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClientChrome } from "@/components/client-chrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Anton is used for exactly one thing per page: the nameplate.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Developer, Designer & Virtual Assistant`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Jaime Yee",
    "web developer",
    "UI/UX designer",
    "graphic designer",
    "virtual assistant",
    "Next.js",
    "Flutter",
    "Laravel",
    "Philippines",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Developer, Designer & Virtual Assistant`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Developer, Designer & Virtual Assistant`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before first paint. Decides once per session whether the intro plays, so
 * a returning visitor never sees a flash of an overlay that is about to be
 * skipped. Everything else about the intro is CSS.
 */
const introScript = `(function(){try{var d=document.documentElement;
if(sessionStorage.getItem("jy-intro")==="1")return;
sessionStorage.setItem("jy-intro","1");
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
d.setAttribute("data-intro","play");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />

        {/*
          Scroll-triggered reveals render their hidden state into the HTML, so
          without JavaScript they would never appear. These two rules target
          exactly the inline styles Framer Motion emits during SSR and leave
          every other transform on the page alone.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important}[style*="translateY"],[style*="scaleX(0)"]{transform:none!important}`}</style>
        </noscript>

        <Providers>
          <ClientChrome />
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

        {/*
          Intro overlay. Hidden by default and revealed only when the script
          above sets data-intro="play", so it is inert on repeat visits, under
          reduced motion, and with JavaScript off.
        */}
        <div
          aria-hidden
          className="intro-overlay fixed inset-0 z-[100] flex-col items-center justify-center gap-4 bg-background"
        >
          <span className="intro-mark font-nameplate text-6xl uppercase leading-none tracking-tight text-foreground md:text-7xl">
            {site.initials}
          </span>
          <span className="intro-rule h-px w-16 origin-left bg-accent" />
          <span className="intro-caption font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
            Jaime Yee II
          </span>
        </div>
      </body>
    </html>
  );
}
