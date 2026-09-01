/**
 * Bundles content/blog/*.mdx into a TypeScript module.
 *
 * Why this exists: the Worker has no filesystem at request time. Reading posts
 * with node:fs worked in `next dev` and during `next build`, then silently
 * returned an empty list once deployed — an empty /blog, a sitemap with no post
 * URLs, and a 404 on every article, all still answering 200. Bundling the posts
 * as a real module removes the runtime filesystem from the path entirely, so the
 * blog renders identically whether a request hits the prerender cache or falls
 * through to the server.
 *
 * Run automatically by `npm run build` and `npm run build:cf`.
 */
import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const OUT = path.join(process.cwd(), "src", "lib", "blog-data.generated.ts");

const files = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f)).sort()
  : [];

const posts = files.map((file) => ({
  slug: file.replace(/\.mdx?$/, ""),
  raw: fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
}));

const banner = `// GENERATED FILE — do not edit.
// Source: content/blog/*.mdx
// Regenerate: npm run blog:gen  (also runs automatically on build)
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  `${banner}
export type RawPost = { slug: string; raw: string };

export const rawPosts: RawPost[] = ${JSON.stringify(posts, null, 2)};
`,
);

console.log(`blog:gen — bundled ${posts.length} post(s) into src/lib/blog-data.generated.ts`);
