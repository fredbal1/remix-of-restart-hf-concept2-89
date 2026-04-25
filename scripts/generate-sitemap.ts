/**
 * Sitemap generator — reads the centralized SEO route manifest.
 * Emits an image:image entry per URL using the route's canonical OG image.
 */

import { assertValidSitemapDate, requireSitemapDate } from "../src/data/sitemap-dates";
import { SEO_ROUTES, type SeoRouteEntry } from "../src/lib/seo/route-manifest";
import { SITE_CONFIG } from "../src/data/site-config";

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq?: string;
  lastmod?: string;
  imageLoc: string;
  imageTitle: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildEntry(entry: SitemapEntry): string {
  const lines = [
    `    <loc>${SITE_CONFIG.url}${entry.loc}</loc>`,
    `    <priority>${entry.priority}</priority>`,
  ];
  if (entry.lastmod) lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  if (entry.changefreq) lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  lines.push(
    "    <image:image>",
    `      <image:loc>${entry.imageLoc}</image:loc>`,
    `      <image:title>${escapeXml(entry.imageTitle)}</image:title>`,
    "    </image:image>"
  );
  return `  <url>\n${lines.join("\n")}\n  </url>`;
}

function buildSitemapEntry(route: SeoRouteEntry): SitemapEntry {
  const context = `Sitemap route "${route.path}"`;
  const requiresExplicitLastmod =
    route.indexable &&
    (route.kind === "service" || route.kind === "project" || route.kind === "category");
  const lastmod = requiresExplicitLastmod
    ? requireSitemapDate(route.sitemap?.lastmod, `${context} requires an explicit lastmod`)
    : route.sitemap?.lastmod
      ? assertValidSitemapDate(route.sitemap.lastmod, context)
      : undefined;

  return {
    loc: route.canonicalPath ?? route.path,
    priority: route.sitemap!.priority,
    changefreq: route.sitemap!.changefreq,
    lastmod,
    imageLoc: route.ogImage,
    imageTitle: route.ogImageAlt,
  };
}

export function generateSitemap(): string {
  const entries = SEO_ROUTES.filter(
    (route) => route.includeInSitemap && route.sitemap
  ).map(buildSitemapEntry);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.map(buildEntry),
    "</urlset>",
    "",
  ].join("\n");
}
