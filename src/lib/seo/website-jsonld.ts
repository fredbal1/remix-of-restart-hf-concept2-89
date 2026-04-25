import { SITE_CONFIG } from "../../data/site-config";

/**
 * WebSite JSON-LD — global, links sitelinks searchbox is intentionally omitted
 * (no on-site search). Publisher references the LocalBusiness @id.
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE_CONFIG.url}/#business` },
  };
}
