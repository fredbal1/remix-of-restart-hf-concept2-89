import { describe, it, expect } from "vitest";
import {
  countMatches,
  decodeHtmlEntities,
  extractMetaContent,
  extractCanonicalHref,
  extractBody,
  stripTags,
  countWords,
  buildTagExpectations,
  validateCounts,
  validateHeadValues,
} from "@/lib/seo/validate-seo-html";
import type { SeoRouteEntry } from "@/lib/seo/route-manifest";

/* ------------------------------------------------------------------ */
/*  Fixtures                                                           */
/* ------------------------------------------------------------------ */

function makeRoute(overrides: Partial<SeoRouteEntry> = {}): SeoRouteEntry {
  return {
    id: "test",
    path: "/test",
    kind: "marketing",
    title: "Test Page",
    description: "A test description for SEO validation.",
    canonical: "https://hfconcept.fr/test",
    canonicalPath: "/test",
    robots: "index, follow, max-image-preview:large",
    indexable: true,
    ogType: "website",
    ogImagePath: "/og/og-test.jpg",
    ogImage: "https://hfconcept.fr/og/og-test.jpg",
    ogImageAlt: "Test OG image alt",
    twitterImageAlt: "Test OG image alt",
    prerender: true,
    includeInSitemap: true,
    includeLocalBusinessJsonLd: true,
    validation: { minParagraphs: 1, minWords: 5 },
    extraOutputPaths: [],
    ...overrides,
  };
}

function makeValidHtml(route: SeoRouteEntry): string {
  const title = route.title.includes("HFconcept") ? route.title : `${route.title} — HFconcept`;
  const canonicalTag = route.canonical
    ? `<link rel="canonical" href="${route.canonical}" />`
    : "";
  const ogUrl = route.canonical
    ? `<meta property="og:url" content="${route.canonical}" />`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <meta name="description" content="${route.description}" />
  <meta name="robots" content="${route.robots}" />
  ${canonicalTag}
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${route.description}" />
  <meta property="og:type" content="${route.ogType}" />
  <meta property="og:image" content="${route.ogImage}" />
  <meta property="og:image:alt" content="${route.ogImageAlt}" />
  ${ogUrl}
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${route.description}" />
  <meta name="twitter:image" content="${route.ogImage}" />
  <meta name="twitter:image:alt" content="${route.twitterImageAlt}" />
</head>
<body>
  <div id="root" data-server-rendered="true">
    <h1>Test</h1>
    <p>Some content words here for validation.</p>
  </div>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Low-level helpers                                                  */
/* ------------------------------------------------------------------ */

describe("countMatches", () => {
  it("counts regex matches in HTML", () => {
    const html = '<meta name="robots" content="noindex" /><meta name="robots" content="index" />';
    expect(countMatches(html, /<meta\s[^>]*name=["']robots["'][^>]*>/gi)).toBe(2);
  });

  it("returns 0 when no match", () => {
    expect(countMatches("<p>hello</p>", /<title[\s>]/gi)).toBe(0);
  });
});

describe("decodeHtmlEntities", () => {
  it("decodes common entities", () => {
    expect(decodeHtmlEntities("L&#39;architecte &amp; l&quot;intérieur")).toBe(
      "L'architecte & l\"intérieur",
    );
  });
});

describe("extractMetaContent", () => {
  it("extracts meta name content", () => {
    const html = '<meta name="description" content="Hello world" />';
    expect(extractMetaContent(html, "name", "description")).toBe("Hello world");
  });

  it("extracts meta property content", () => {
    const html = '<meta property="og:title" content="My Title" />';
    expect(extractMetaContent(html, "property", "og:title")).toBe("My Title");
  });

  it("returns null when missing", () => {
    expect(extractMetaContent("<p>no meta</p>", "name", "description")).toBeNull();
  });
});

describe("extractCanonicalHref", () => {
  it("extracts canonical URL", () => {
    const html = '<link rel="canonical" href="https://hfconcept.fr/" />';
    expect(extractCanonicalHref(html)).toBe("https://hfconcept.fr/");
  });

  it("returns null when missing", () => {
    expect(extractCanonicalHref("<head></head>")).toBeNull();
  });
});

describe("extractBody / stripTags / countWords", () => {
  it("extracts body content", () => {
    const html = "<html><body><p>Content</p></body></html>";
    expect(extractBody(html)).toBe("<p>Content</p>");
  });

  it("strips tags and normalizes whitespace", () => {
    expect(stripTags("<p>Hello <strong>world</strong></p>")).toBe("Hello world");
  });

  it("counts words accurately", () => {
    expect(countWords("Architecte d'intérieur à Paris")).toBe(4);
  });

  it("returns 0 for empty string", () => {
    expect(countWords("")).toBe(0);
  });
});

/* ------------------------------------------------------------------ */
/*  Tag count validation                                               */
/* ------------------------------------------------------------------ */

describe("validateCounts", () => {
  it("passes for a valid indexable document", () => {
    const route = makeRoute();
    const html = makeValidHtml(route);
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors).toHaveLength(0);
  });

  it("fails when title is missing", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(/<title[^>]*>[\s\S]*?<\/title>/i, "");
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("<title>"))).toBe(true);
  });

  it("fails when meta description is missing", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(/<meta[^>]*name=["']description["'][^>]*>/i, "");
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("meta description"))).toBe(true);
  });

  it("fails when canonical is duplicated", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(
      "</head>",
      '<link rel="canonical" href="https://hfconcept.fr/test" /></head>',
    );
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("link canonical"))).toBe(true);
  });

  it("fails when og:title is missing", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(/<meta[^>]*property=["']og:title["'][^>]*>/i, "");
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("og:title"))).toBe(true);
  });

  it("fails when og:image is missing", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(/<meta[^>]*property=["']og:image["'][^>]*>/i, "");
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("og:image"))).toBe(true);
  });

  it("fails when twitter:card tags are missing", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(/<meta[^>]*name=["']twitter:title["'][^>]*>/i, "");
    const errors = validateCounts(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("twitter:title"))).toBe(true);
  });

  it("expects 0 canonical / og:url for noindex route without canonical", () => {
    const route = makeRoute({ canonical: null, canonicalPath: null, indexable: false, robots: "noindex, nofollow" });
    const html = makeValidHtml(route);
    const errors = validateCounts(route, html, "404.html");
    expect(errors).toHaveLength(0);
  });
});

/* ------------------------------------------------------------------ */
/*  Head value validation                                              */
/* ------------------------------------------------------------------ */

describe("validateHeadValues", () => {
  it("passes for valid head values", () => {
    const route = makeRoute();
    const html = makeValidHtml(route);
    const errors = validateHeadValues(route, html, "test/index.html");
    expect(errors).toHaveLength(0);
  });

  it("fails when robots content is wrong", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(
      /content="index, follow, max-image-preview:large"/,
      'content="noindex, nofollow"',
    );
    const errors = validateHeadValues(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("robots"))).toBe(true);
  });

  it("fails when canonical URL is wrong", () => {
    const route = makeRoute();
    const html = makeValidHtml(route).replace(
      'href="https://hfconcept.fr/test"',
      'href="https://hfconcept.fr/wrong"',
    );
    const errors = validateHeadValues(route, html, "test/index.html");
    expect(errors.some((e) => e.includes("canonical"))).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/*  Tag expectations structure                                         */
/* ------------------------------------------------------------------ */

describe("buildTagExpectations", () => {
  it("expects canonical=1 for indexable route", () => {
    const route = makeRoute();
    const exps = buildTagExpectations(route);
    const canonExp = exps.find((e) => e.label === "link canonical");
    expect(canonExp?.expected).toBe(1);
  });

  it("expects canonical=0 for noindex route without canonical", () => {
    const route = makeRoute({ canonical: null });
    const exps = buildTagExpectations(route);
    const canonExp = exps.find((e) => e.label === "link canonical");
    expect(canonExp?.expected).toBe(0);
  });
});
