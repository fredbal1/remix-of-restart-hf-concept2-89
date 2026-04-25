import { SITE_CONFIG } from "../../data/site-config";

/** Day name → schema.org DayOfWeek URL */
const DAY_TO_SCHEMA: Record<string, string> = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

function isDefinedUrl<T extends string | null | undefined>(url: T): url is Exclude<T, "" | null | undefined> {
  return typeof url === "string" && url.length > 0;
}

function buildSameAs(): string[] {
  return [
    SITE_CONFIG.social.instagram,
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.googleBusinessProfile,
    SITE_CONFIG.social.houzz,
  ].filter(isDefinedUrl);
}

function buildAreaServed() {
  return SITE_CONFIG.intervention.areas.map((area) => ({
    "@type": area.type,
    name: area.name,
  }));
}

function buildOpeningHoursSpecification() {
  return SITE_CONFIG.openingHours.map((window) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: window.days.map((d) => DAY_TO_SCHEMA[d]).filter(Boolean),
    opens: window.opens,
    closes: window.closes,
  }));
}

/**
 * Pure builder — returns a JSON-LD LocalBusiness object
 * sourced entirely from SITE_CONFIG.
 */
export function getLocalBusinessJsonLd() {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesigner", "ProfessionalService"],
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    alternateName: "HF concept",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    image: `${SITE_CONFIG.url}/og/og-home.jpg`,
    logo: `${SITE_CONFIG.url}/og-symbol.png`,
    foundingDate: SITE_CONFIG.foundingDate,
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.founder,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      postalCode: SITE_CONFIG.address.postalCode,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: buildAreaServed(),
    openingHoursSpecification: buildOpeningHoursSpecification(),
    sameAs: buildSameAs(),
    priceRange: "€€€",
    knowsLanguage: "fr",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services d'architecture intérieure",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conseil en architecture intérieure" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conception 3D photoréaliste" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projet complet" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projet à distance" } },
      ],
    },
  };

  return node;
}
