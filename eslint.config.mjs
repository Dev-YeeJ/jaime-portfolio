import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Cloudflare/OpenNext build output. `.wrangler` holds generated bundle
    // facades that trip no-unused-vars, and neither directory is source.
    ".open-next/**",
    ".wrangler/**",
    "cloudflare-env.d.ts",
    // Emitted by scripts/generate-blog-data.mjs from content/blog/*.mdx.
    "src/lib/blog-data.generated.ts",
  ]),
]);

export default eslintConfig;
