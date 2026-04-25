import type { Plugin } from "vite";
import { SITE_CONFIG } from "../src/data/site-config";
import { getLocalBusinessJsonLd } from "../src/lib/seo/local-business-jsonld";

/** Replace __SITE_URL__ and __LOCAL_BUSINESS_JSON_LD__ placeholders in index.html */
export function siteUrlPlugin(): Plugin {
  return {
    name: "vite-plugin-site-url",
    transformIndexHtml(html) {
      return html
        .replaceAll("__SITE_URL__", SITE_CONFIG.url)
        .replaceAll("__LOCAL_BUSINESS_JSON_LD__", JSON.stringify(getLocalBusinessJsonLd(), null, 2));
    },
  };
}
