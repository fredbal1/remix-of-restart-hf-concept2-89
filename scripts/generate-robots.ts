/**
 * robots.txt generator — called by Vite plugin at build time.
 * Uses SITE_CONFIG as canonical URL source.
 */

import { SITE_CONFIG } from "../src/data/site-config";

export function generateRobotsTxt(): string {
  return [
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Bingbot",
    "Allow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_CONFIG.url}/sitemap.xml`,
    "",
  ].join("\n");
}
