import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildDocumentTitle,
  getDistHtmlPath,
  getPrerenderRoutes,
  type SeoRouteEntry,
} from "../src/lib/seo/route-manifest";
import {
  countMatches,
  decodeHtmlEntities,
  extractMetaContent,
  extractCanonicalHref,
  extractBody,
  stripTags,
  countWords,
  buildTagExpectations,
} from "../src/lib/seo/validate-seo-html";

const DIST = resolve("dist");

if (!existsSync(DIST)) {
  console.error("❌  dist/ directory not found. Run `vite build` first.");
  process.exit(1);
}

const errors: string[] = [];

function recordError(message: string): void {
  errors.push(message);
  console.error(`❌  ${message}`);
}

function validateCounts(route: SeoRouteEntry, html: string, relPath: string): void {
  for (const exp of buildTagExpectations(route)) {
    const count = countMatches(html, exp.pattern);
    if (count !== exp.expected) {
      recordError(`${relPath}: expected ${exp.expected} ${exp.label}, found ${count}`);
    }
  }
}

function validateHeadValues(route: SeoRouteEntry, html: string, relPath: string): void {
  const expectedTitle = buildDocumentTitle(route.title);
  const rawTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const title = decodeHtmlEntities(rawTitle);
  if (title !== expectedTitle) {
    recordError(`${relPath}: expected title "${expectedTitle}", found "${title}"`);
  }

  const description = extractMetaContent(html, "name", "description");
  if (description !== route.description) {
    recordError(
      `${relPath}: expected meta description "${route.description}", found "${description ?? "none"}"`,
    );
  }

  const robots = extractMetaContent(html, "name", "robots");
  if (robots !== route.robots) {
    recordError(`${relPath}: expected robots "${route.robots}", found "${robots ?? "none"}"`);
  }

  const canonical = extractCanonicalHref(html);
  if ((route.canonical ?? null) !== canonical) {
    recordError(
      `${relPath}: expected canonical "${route.canonical ?? "none"}", found "${canonical ?? "none"}"`,
    );
  }

  const ogType = extractMetaContent(html, "property", "og:type");
  if (ogType !== route.ogType) {
    recordError(`${relPath}: expected og:type "${route.ogType}", found "${ogType ?? "none"}"`);
  }

  const ogTitle = extractMetaContent(html, "property", "og:title");
  if (ogTitle !== expectedTitle) {
    recordError(`${relPath}: expected og:title "${expectedTitle}", found "${ogTitle ?? "none"}"`);
  }

  const ogDescription = extractMetaContent(html, "property", "og:description");
  if (ogDescription !== route.description) {
    recordError(
      `${relPath}: expected og:description "${route.description}", found "${ogDescription ?? "none"}"`,
    );
  }

  const ogUrl = extractMetaContent(html, "property", "og:url");
  if ((route.canonical ?? null) !== ogUrl) {
    recordError(
      `${relPath}: expected og:url "${route.canonical ?? "none"}", found "${ogUrl ?? "none"}"`,
    );
  }

  const ogImage = extractMetaContent(html, "property", "og:image");
  if (ogImage !== route.ogImage) {
    recordError(`${relPath}: expected og:image "${route.ogImage}", found "${ogImage ?? "none"}"`);
  }

  const ogImageAlt = extractMetaContent(html, "property", "og:image:alt");
  if (ogImageAlt !== route.ogImageAlt) {
    recordError(
      `${relPath}: expected og:image:alt "${route.ogImageAlt}", found "${ogImageAlt ?? "none"}"`,
    );
  }

  const twitterTitle = extractMetaContent(html, "name", "twitter:title");
  if (twitterTitle !== expectedTitle) {
    recordError(
      `${relPath}: expected twitter:title "${expectedTitle}", found "${twitterTitle ?? "none"}"`,
    );
  }

  const twitterDescription = extractMetaContent(html, "name", "twitter:description");
  if (twitterDescription !== route.description) {
    recordError(
      `${relPath}: expected twitter:description "${route.description}", found "${twitterDescription ?? "none"}"`,
    );
  }

  const twitterImage = extractMetaContent(html, "name", "twitter:image");
  if (twitterImage !== route.ogImage) {
    recordError(
      `${relPath}: expected twitter:image "${route.ogImage}", found "${twitterImage ?? "none"}"`,
    );
  }

  const twitterImageAlt = extractMetaContent(html, "name", "twitter:image:alt");
  if (twitterImageAlt !== route.twitterImageAlt) {
    recordError(
      `${relPath}: expected twitter:image:alt "${route.twitterImageAlt}", found "${twitterImageAlt ?? "none"}"`,
    );
  }

  const jsonLdCount = countMatches(html, /<script type="application\/ld\+json">/gi);
  const minJsonLdCount = route.includeLocalBusinessJsonLd ? 1 : 0;
  if (jsonLdCount < minJsonLdCount) {
    recordError(
      `${relPath}: expected at least ${minJsonLdCount} JSON-LD block, found ${jsonLdCount}`,
    );
  }
}

function validateBody(route: SeoRouteEntry, html: string, relPath: string): void {
  const body = extractBody(html);
  const h1Count = countMatches(body, /<h1\b[^>]*>/gi);
  if (h1Count < 1) {
    recordError(`${relPath}: expected at least one <h1> in prerendered body`);
  }

  const paragraphCount = countMatches(body, /<p\b[^>]*>/gi);
  if (paragraphCount < route.validation.minParagraphs) {
    recordError(
      `${relPath}: expected at least ${route.validation.minParagraphs} paragraph(s), found ${paragraphCount}`,
    );
  }

  const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/i);
  if (!rootMatch || !rootMatch[1].trim()) {
    recordError(`${relPath}: prerendered #root is empty`);
  }

  const bodyText = stripTags(body);
  const wordCount = countWords(bodyText);
  if (wordCount < route.validation.minWords) {
    recordError(
      `${relPath}: expected at least ${route.validation.minWords} word(s) in body, found ${wordCount}`,
    );
  }
}

function validateRoute(route: SeoRouteEntry): void {
  const primaryOutput = getDistHtmlPath(route);
  const outputs = [primaryOutput, ...route.extraOutputPaths];

  for (const relPath of outputs) {
    const absolutePath = resolve(DIST, relPath);
    if (!existsSync(absolutePath)) {
      recordError(`Missing prerendered route HTML: ${relPath}`);
      continue;
    }

    const html = readFileSync(absolutePath, "utf-8");
    validateCounts(route, html, relPath);
    validateHeadValues(route, html, relPath);
    validateBody(route, html, relPath);
  }
}

const routes = getPrerenderRoutes();

for (const route of routes) {
  validateRoute(route);
}

if (errors.length > 0) {
  console.error(`\n❌  SEO validation failed — ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`\n✅  SEO validation passed`);
console.log(`   • ${routes.length} prerendered route(s) validated`);
