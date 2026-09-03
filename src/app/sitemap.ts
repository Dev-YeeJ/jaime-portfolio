import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { legalLinks } from "@/lib/legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/design", "/experience", "/blog"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Policy pages belong in the sitemap — search engines and app stores look for
  // them — but they are not what the site is for, hence the low priority.
  const legal = legalLinks.map((link) => ({
    url: `${site.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts, ...legal];
}
