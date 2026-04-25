/**
 * Pure validation helpers extracted from scripts/validate-dist-seo.ts.
 * These functions operate on raw HTML strings — no filesystem, no side effects.
 */

import { buildDocumentTitle, type SeoRouteEntry } from "./route-manifest";

/* ------------------------------------------------------------------ */
/*  Low-level extraction helpers                                       */
/* ------------------------------------------------------------------ */

export function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) || []).length;
}

export function escapeForRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

export function extractMetaContent(
  html: string,
  attr: "name" | "property",
  key: string,
): string | null {
  const pattern = new RegExp(
    `<meta[^>]*\\b${attr}\\s*=\\s*["']${escapeForRegex(key)}["'][^>]*\\bcontent\\s*=\\s*["']([^"']+)["'][^>]*>`,
    "i",
  );
  const match = html.match(pattern)?.[1];
  return match ? decodeHtmlEntities(match) : null;
}

export function extractCanonicalHref(html: string): string | null {
  const match = html.match(
    /<link[^>]*\brel\s*=\s*["']canonical["'][^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/i,
  )?.[1];
  return match ? decodeHtmlEntities(match) : null;
}

export function extractBody(html: string): string {
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
}

export function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(text: string): number {
  const words = text.match(/\p{L}[\p{L}\p{N}''-]*/gu);
  return words?.length ?? 0;
}

/* ------------------------------------------------------------------ */
/*  Tag-count expectations                                             */
/* ------------------------------------------------------------------ */

export interface TagExpectation {
  label: string;
  pattern: RegExp;
  expected: number;
}

export function buildTagExpectations(route: SeoRouteEntry): TagExpectation[] {
  const expectations: TagExpectation[] = [
    { label: "<title>", pattern: /<title[\s>]/gi, expected: 1 },
    { label: "meta description", pattern: /<meta\s[^>]*name=["']description["'][^>]*>/gi, expected: 1 },
    { label: "meta robots", pattern: /<meta\s[^>]*name=["']robots["'][^>]*>/gi, expected: 1 },
    { label: "meta og:title", pattern: /<meta\s[^>]*property=["']og:title["'][^>]*>/gi, expected: 1 },
    { label: "meta og:description", pattern: /<meta\s[^>]*property=["']og:description["'][^>]*>/gi, expected: 1 },
    { label: "meta og:type", pattern: /<meta\s[^>]*property=["']og:type["'][^>]*>/gi, expected: 1 },
    { label: "meta og:image", pattern: /<meta\s[^>]*property=["']og:image["'][^>]*>/gi, expected: 1 },
    { label: "meta og:image:alt", pattern: /<meta\s[^>]*property=["']og:image:alt["'][^>]*>/gi, expected: 1 },
    { label: "meta twitter:title", pattern: /<meta\s[^>]*name=["']twitter:title["'][^>]*>/gi, expected: 1 },
    { label: "meta twitter:description", pattern: /<meta\s[^>]*name=["']twitter:description["'][^>]*>/gi, expected: 1 },
    { label: "meta twitter:image", pattern: /<meta\s[^>]*name=["']twitter:image["'][^>]*>/gi, expected: 1 },
    { label: "meta twitter:image:alt", pattern: /<meta\s[^>]*name=["']twitter:image:alt["'][^>]*>/gi, expected: 1 },
    { label: "link canonical", pattern: /<link\s[^>]*rel=["']canonical["'][^>]*>/gi, expected: route.canonical ? 1 : 0 },
    { label: "meta og:url", pattern: /<meta\s[^>]*property=["']og:url["'][^>]*>/gi, expected: route.canonical ? 1 : 0 },
  ];
  return expectations;
}

/* ------------------------------------------------------------------ */
/*  Validation: returns error strings (empty = pass)                   */
/* ------------------------------------------------------------------ */

export function validateCounts(route: SeoRouteEntry, html: string, relPath: string): string[] {
  const errors: string[] = [];
  for (const exp of buildTagExpectations(route)) {
    const count = countMatches(html, exp.pattern);
    if (count !== exp.expected) {
      errors.push(`${relPath}: expected ${exp.expected} ${exp.label}, found ${count}`);
    }
  }
  return errors;
}

export function validateHeadValues(route: SeoRouteEntry, html: string, relPath: string): string[] {
  const errors: string[] = [];
  const expectedTitle = buildDocumentTitle(route.title);

  const rawTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const title = decodeHtmlEntities(rawTitle);
  if (title !== expectedTitle) {
    errors.push(`${relPath}: expected title "${expectedTitle}", found "${title}"`);
  }

  const description = extractMetaContent(html, "name", "description");
  if (description !== route.description) {
    errors.push(`${relPath}: expected meta description "${route.description}", found "${description ?? "none"}"`);
  }

  const robots = extractMetaContent(html, "name", "robots");
  if (robots !== route.robots) {
    errors.push(`${relPath}: expected robots "${route.robots}", found "${robots ?? "none"}"`);
  }

  const canonical = extractCanonicalHref(html);
  if ((route.canonical ?? null) !== canonical) {
    errors.push(`${relPath}: expected canonical "${route.canonical ?? "none"}", found "${canonical ?? "none"}"`);
  }

  return errors;
}
