import { describe, it, expect } from "vitest";
import {
  stripSeoHead,
  injectRenderedMarkup,
  injectHead,
} from "@/lib/seo/prerender-html";
import type { SeoRouteEntry } from "@/lib/seo/route-manifest";

/* ------------------------------------------------------------------ */
/*  Fixtures                                                           */
/* ------------------------------------------------------------------ */

const TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Fallback Title</title>
  <meta name="description" content="Fallback description" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://hfconcept.fr/" />
  <meta property="og:title" content="Fallback OG Title" />
  <meta property="og:description" content="Fallback OG description" />
  <meta property="og:url" content="https://hfconcept.fr/" />
  <meta name="twitter:title" content="Fallback Twitter Title" />
  <meta name="twitter:description" content="Fallback Twitter description" />
  <meta name="twitter:image" content="https://hfconcept.fr/og.jpg" />
  <script type="application/ld+json">{"@type":"LocalBusiness"}</script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

const SSR_HEAD_TAGS = `<title>SSR Title — HFconcept</title>
<meta name="description" content="SSR description" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="https://hfconcept.fr/test" />`;

const JSON_LD_SCRIPT = '<script type="application/ld+json">{"@type":"LocalBusiness","name":"HFconcept"}</script>';

function makeRoute(overrides: Partial<SeoRouteEntry> = {}): SeoRouteEntry {
  return {
    id: "test",
    path: "/test",
    kind: "marketing",
    title: "Test",
    description: "Test description",
    canonical: "https://hfconcept.fr/test",
    canonicalPath: "/test",
    robots: "index, follow, max-image-preview:large",
    indexable: true,
    ogType: "website",
    ogImagePath: "/og/og-test.jpg",
    ogImage: "https://hfconcept.fr/og/og-test.jpg",
    ogImageAlt: "Test alt",
    twitterImageAlt: "Test alt",
    prerender: true,
    includeInSitemap: true,
    includeLocalBusinessJsonLd: true,
    validation: { minParagraphs: 1, minWords: 5 },
    extraOutputPaths: [],
    ...overrides,
  };
}

/* ------------------------------------------------------------------ */
/*  stripSeoHead                                                       */
/* ------------------------------------------------------------------ */

describe("stripSeoHead", () => {
  it("removes all SEO placeholder tags", () => {
    const stripped = stripSeoHead(TEMPLATE);
    expect(stripped).not.toContain("<title>");
    expect(stripped).not.toContain('name="description"');
    expect(stripped).not.toContain('name="robots"');
    expect(stripped).not.toContain('rel="canonical"');
    expect(stripped).not.toContain('property="og:');
    expect(stripped).not.toContain('name="twitter:');
    expect(stripped).not.toContain("application/ld+json");
  });

  it("preserves non-SEO head content", () => {
    const stripped = stripSeoHead(TEMPLATE);
    expect(stripped).toContain('charset="utf-8"');
  });

  it("preserves body content", () => {
    const stripped = stripSeoHead(TEMPLATE);
    expect(stripped).toContain('<div id="root"></div>');
  });
});

/* ------------------------------------------------------------------ */
/*  injectRenderedMarkup                                               */
/* ------------------------------------------------------------------ */

describe("injectRenderedMarkup", () => {
  it("replaces empty #root with server-rendered content", () => {
    const result = injectRenderedMarkup(TEMPLATE, "<h1>Hello</h1>");
    expect(result).toContain('data-server-rendered="true"');
    expect(result).toContain("<h1>Hello</h1>");
    expect(result).not.toContain('<div id="root"></div>');
  });
});

/* ------------------------------------------------------------------ */
/*  injectHead                                                         */
/* ------------------------------------------------------------------ */

describe("injectHead", () => {
  it("injects head tags before </head>", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute();
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, JSON_LD_SCRIPT);
    expect(result).toContain("SSR Title — HFconcept");
    expect(result).toContain("SSR description");
    expect(result).toContain("</head>");
  });

  it("injects JSON-LD when includeLocalBusinessJsonLd is true", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute({ includeLocalBusinessJsonLd: true });
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, JSON_LD_SCRIPT);
    expect(result).toContain("LocalBusiness");
  });

  it("does NOT inject JSON-LD when includeLocalBusinessJsonLd is false", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute({ includeLocalBusinessJsonLd: false });
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, "");
    expect(result).not.toContain("LocalBusiness");
  });

  it("produces no duplicate title after strip + inject", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute();
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, JSON_LD_SCRIPT);
    const titleCount = (result.match(/<title[\s>]/gi) || []).length;
    expect(titleCount).toBe(1);
  });

  it("produces no duplicate meta description after strip + inject", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute();
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, JSON_LD_SCRIPT);
    const descCount = (result.match(/<meta[^>]*name=["']description["'][^>]*>/gi) || []).length;
    expect(descCount).toBe(1);
  });

  it("produces no duplicate canonical after strip + inject", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute();
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, JSON_LD_SCRIPT);
    const canonCount = (result.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) || []).length;
    expect(canonCount).toBe(1);
  });

  it("produces no duplicate JSON-LD after strip + inject", () => {
    const stripped = stripSeoHead(TEMPLATE);
    const route = makeRoute({ includeLocalBusinessJsonLd: true });
    const result = injectHead(stripped, route, SSR_HEAD_TAGS, JSON_LD_SCRIPT);
    const jsonLdCount = (result.match(/<script type="application\/ld\+json">/gi) || []).length;
    expect(jsonLdCount).toBe(1);
  });
});
