/**
 * Pure HTML manipulation helpers extracted from scripts/prerender-routes.ts.
 * These functions operate on raw HTML strings — no filesystem, no side effects.
 */

import type { SeoRouteEntry } from "./route-manifest";

/** Remove placeholder SEO tags from the template so SSR-injected tags don't duplicate. */
export function stripSeoHead(html: string): string {
  return html
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta[^>]*\bname\s*=\s*["']description["'][^>]*\/?>\s*/gi, "")
    .replace(/<meta[^>]*\bname\s*=\s*["']robots["'][^>]*\/?>\s*/gi, "")
    .replace(/<link[^>]*\brel\s*=\s*["']canonical["'][^>]*\/?>\s*/gi, "")
    .replace(/<meta[^>]*\bproperty\s*=\s*["']og:[^"']+["'][^>]*\/?>\s*/gi, "")
    .replace(/<meta[^>]*\bname\s*=\s*["']twitter:[^"']+["'][^>]*\/?>\s*/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
}

/** Replace the empty #root div with server-rendered markup. */
export function injectRenderedMarkup(html: string, appHtml: string): string {
  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root" data-server-rendered="true">${appHtml}</div>`,
  );
}

/** Inject SSR head tags (and optionally JSON-LD) before </head>. */
export function injectHead(
  html: string,
  route: SeoRouteEntry,
  headTags: string,
  localBusinessScript: string,
): string {
  const jsonLd = route.includeLocalBusinessJsonLd ? localBusinessScript : "";
  const injectedHead = [headTags, jsonLd].filter(Boolean).join("\n");
  return html.replace("</head>", `${injectedHead}\n  </head>`);
}
