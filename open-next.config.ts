import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Prerendered pages are served from Workers static assets.
 *
 * This is load-bearing, not an optimisation. Without an incremental cache the
 * Worker re-renders prerendered routes on every request, and the blog reads its
 * posts off disk (`src/lib/blog.ts` walks `content/blog` with node:fs). That
 * filesystem is not there at request time, so re-rendering silently produced an
 * empty `/blog`, a sitemap with no post URLs, and a 404 on every article — all
 * while still returning 200 on the pages that had no content to lose.
 *
 * This override answers the cache from the assets uploaded at build time, so the
 * HTML that `next build` prerendered is the HTML that ships.
 *
 * It deliberately supports no revalidation, which suits a site whose every route
 * is either prerendered or rendered per request (`/design`, for its filters).
 * Adopting `revalidate` anywhere means swapping this for the R2 or KV cache.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
