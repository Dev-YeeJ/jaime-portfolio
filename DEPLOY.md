# Deploying jaimeyee.online

The site runs on **Cloudflare Workers**, built by the OpenNext adapter. Pushing to
`main` builds and deploys automatically.

---

## Step 1 — Put the repo on GitHub

The code is committed locally but has no remote yet.

1. Create a new **empty** repository at <https://github.com/new>. Name it
   `jaime-portfolio`. Do **not** add a README, .gitignore or licence — the repo
   already has them, and those options create a conflicting first commit.
2. Back in this folder:

```bash
git remote add origin https://github.com/<your-username>/jaime-portfolio.git
git push -u origin main
```

Private repos work fine — Cloudflare asks for access during Step 3.

---

## Step 2 — Move the domain onto Cloudflare

You bought `jaimeyee.online` at GoDaddy. Cloudflare needs to run its DNS.

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), choose
   **Add a domain**, enter `jaimeyee.online`, and pick the **Free** plan.
2. Cloudflare scans the existing records and shows you **two nameservers**, e.g.
   `aria.ns.cloudflare.com` / `rob.ns.cloudflare.com`. Copy both — yours will
   differ from anyone else's.
3. At GoDaddy: **My Products → Domains → jaimeyee.online → DNS → Nameservers →
   Change → I'll use my own nameservers**. Replace both entries with the
   Cloudflare pair and save.
4. Back in Cloudflare, click **Check nameservers now**.

Propagation is usually minutes but can take up to 24 hours. The site keeps
working throughout; you just can't attach the custom domain until Cloudflare
reports the zone **Active**.

> Do this step before Step 4 — a custom domain can only be attached to a Worker
> once Cloudflare is authoritative for the zone.

---

## Step 3 — Connect the repo (this is the "push = live" part)

1. Cloudflare dashboard → **Compute (Workers)** → **Create** → **Workers** →
   **Import a repository**.
2. Authorise GitHub and pick `jaime-portfolio`.
3. Set the build settings exactly:

   | Field | Value |
   | --- | --- |
   | Project name | `jaime-portfolio` |
   | Production branch | `main` |
   | Build command | `npm run build:cf` |
   | Deploy command | `npx opennextjs-cloudflare deploy` |
   | Build output directory | *(leave empty)* |

   Workers Builds names the Worker after the repository, so it must stay
   `jaime-portfolio` — matching `name` and the `WORKER_SELF_REFERENCE` service
   binding in `wrangler.jsonc`. A mismatch passes the build and then fails at
   deploy with "Service binding 'WORKER_SELF_REFERENCE' references Worker
   '<name>' which was not found."

4. **Save and Deploy.**

Both commands matter. `build:cf` regenerates the blog module and compiles the
Worker; `opennextjs-cloudflare deploy` uploads the prerendered page cache before
calling `wrangler deploy`. Skipping the second and running plain `wrangler deploy`
ships a Worker with an empty page cache.

From here, every push to `main` rebuilds and goes live. Pull requests get their
own preview URL.

---

## Step 4 — Point the domain at the Worker

Once the zone is **Active** and the first deploy is green:

1. Open the `jaime-portfolio` Worker → **Settings** → **Domains & Routes** → **Add** →
   **Custom domain**.
2. Add `jaimeyee.online`. Add `www.jaimeyee.online` too if you want it.

Cloudflare creates the DNS records and issues the TLS certificate itself — you do
not add A or CNAME records by hand, and you do not need a certificate from
GoDaddy. Certificate issuance takes a few minutes.

---

## Everyday use

```bash
npm run dev        # local development
npm run build      # production build (no Cloudflare involved)
npm run preview    # build the Worker and run it in the real Cloudflare runtime
npm run deploy     # manual deploy, bypassing CI
npm run blog:gen   # regenerate the blog module by hand
```

**Adding a blog post:** drop a `.mdx` file in `content/blog/`, then commit and
push. The build regenerates `src/lib/blog-data.generated.ts` automatically — you
never edit that file.

### Windows: `npm run preview` needs Developer Mode

OpenNext's bundler creates symlinks, which Windows refuses without elevation, so
`npm run preview` fails locally with `EPERM: operation not permitted, symlink`.

Fix: **Settings → System → For developers → Developer Mode → On**, then reopen the
terminal. This affects local preview only — Cloudflare builds on Linux and is
unaffected. `npm run dev` works either way.

---

## Things that will bite you

**Don't add `revalidate` to a route without changing the cache.**
`open-next.config.ts` uses the static-assets incremental cache, which serves
prerendered pages and supports no revalidation. If a route ever needs ISR, switch
to the R2 or KV cache override and provision the bucket/namespace.

**Never read the filesystem at request time.** The Worker has no filesystem.
`src/lib/blog.ts` used to walk `content/blog` with `node:fs`; it worked locally
and at build time, then silently produced an empty `/blog`, a sitemap with no post
URLs and a 404 on every article — while still returning HTTP 200. That is why
posts are bundled into a module at build time instead.

**If a replaced image doesn't update in dev**, delete `.next/dev/cache/images`
and restart. Next 16 with Turbopack caches optimized images there — not in
`.next/cache/images` — and serves the stale copy indefinitely.

---

## Still outstanding

- `public/resume.pdf` — the Resume button in the nav points at it; the file does
  not exist yet.
- `linkedin` and `github` in `src/lib/site.ts` — those links stay hidden until set.
- Image placeholders across projects and the design gallery, each labelled `[ ]`
  with what belongs there.
- Three testimonial cards, rendered as visible "awaiting quote" placeholders.
