import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  getDistHtmlPath,
  getPrerenderRoutes,
  type SeoRouteEntry,
} from "../src/lib/seo/route-manifest";
import {
  stripSeoHead,
  injectRenderedMarkup,
  injectHead,
} from "../src/lib/seo/prerender-html";
import { getWebSiteJsonLd } from "../src/lib/seo/website-jsonld";
import { getServiceJsonLd } from "../src/lib/seo/service-jsonld";
import { getCreativeWorkJsonLd } from "../src/lib/seo/creative-work-jsonld";
import {
  getFaqJsonLd,
  getServiceFaqJsonLd,
  getZoneFaqJsonLd,
} from "../src/lib/seo/faq-jsonld";

const DIST_DIR = resolve("dist");
const SSR_DIR = resolve(".ssr");
const TEMPLATE_PATH = resolve(DIST_DIR, "index.html");
const SSR_ENTRY_PATH = resolve(SSR_DIR, "entry-server.js");

if (!existsSync(TEMPLATE_PATH)) {
  console.error("❌ dist/index.html introuvable. Exécutez d'abord `vite build`.");
  process.exit(1);
}

if (!existsSync(SSR_ENTRY_PATH)) {
  console.error("❌ bundle SSR introuvable. Exécutez d'abord le build SSR.");
  process.exit(1);
}

interface RenderModule {
  render(url: string): {
    appHtml: string;
    headTags: string;
  };
}

const { render } = (await import(
  pathToFileURL(SSR_ENTRY_PATH).href
)) as RenderModule;

const template = readFileSync(TEMPLATE_PATH, "utf-8");
const jsonLdMatch = template.match(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/i
);
const localBusinessScript = jsonLdMatch?.[0] ?? "";

function jsonLdScript(payload: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(payload)}</script>`;
}

function buildAuxJsonLd(route: SeoRouteEntry): string {
  const blocks: string[] = [];

  if (route.includeWebSiteJsonLd) {
    blocks.push(jsonLdScript(getWebSiteJsonLd()));
  }

  if (route.includeServiceJsonLd && route.canonical) {
    blocks.push(
      jsonLdScript(
        getServiceJsonLd({
          slug: route.includeServiceJsonLd.slug,
          canonicalUrl: route.canonical,
        })
      )
    );
  }

  if (route.includeCreativeWorkJsonLd && route.canonical) {
    blocks.push(
      jsonLdScript(
        getCreativeWorkJsonLd({
          slug: route.includeCreativeWorkJsonLd.slug,
          canonicalUrl: route.canonical,
          ogImageUrl: route.ogImage,
          ogImageAlt: route.ogImageAlt,
        })
      )
    );
  }

  if (route.includeFaqJsonLd) {
    blocks.push(jsonLdScript(getFaqJsonLd()));
  }

  if (route.includeServiceFaqJsonLd) {
    blocks.push(
      jsonLdScript(getServiceFaqJsonLd(route.includeServiceFaqJsonLd.slug))
    );
  }

  if (route.includeZoneFaqJsonLd) {
    blocks.push(
      jsonLdScript(getZoneFaqJsonLd(route.includeZoneFaqJsonLd.slug))
    );
  }

  return blocks.join("\n");
}

function writeRouteHtml(route: SeoRouteEntry, html: string): void {
  const outputs = [getDistHtmlPath(route), ...route.extraOutputPaths];

  for (const relativeOutputPath of outputs) {
    const absoluteOutputPath = resolve(DIST_DIR, relativeOutputPath);
    mkdirSync(dirname(absoluteOutputPath), { recursive: true });
    writeFileSync(absoluteOutputPath, html, "utf-8");
  }
}

const baseTemplate = stripSeoHead(template);
const routes = getPrerenderRoutes();

for (const route of routes) {
  const { appHtml, headTags } = render(route.path);
  const withMarkup = injectRenderedMarkup(baseTemplate, appHtml);
  const auxJsonLd = buildAuxJsonLd(route);
  const headWithAux = auxJsonLd ? `${headTags}\n${auxJsonLd}` : headTags;
  const prerenderedHtml = injectHead(withMarkup, route, headWithAux, localBusinessScript);
  writeRouteHtml(route, prerenderedHtml);
}

rmSync(SSR_DIR, { force: true, recursive: true });

console.log(`✓ HTML pré-rendu complet généré pour ${routes.length} route(s)`);
