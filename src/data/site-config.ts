/**
 * Source unique des informations business / contact.
 * Importé partout où ces données sont nécessaires pour éviter les doublons.
 */
export const SITE_CONFIG = {
  name: "HFconcept",
  legalName: "HFconcept",
  founder: "Fabien Benon",
  foundingDate: "2009",
  tagline: "Studio d'architecture intérieure",
  description:
    "Conception sur mesure, alliant esthétique, fonctionnalité et savoir-faire artisanal. Possibilité de projections 3D photoréalistes pour visualiser avant les travaux ou à distance.",
  taglineShort: "Architecture intérieure sur mesure",
  descriptionShort:
    "Conception, visualisation 3D et accompagnement de projet",
  url: "https://www.hfconcept.com",

  contact: {
    email: "contact@hfconcept.com",
    phone: "+33615079905",
    phoneDisplay: "06 15 07 99 05",
    responseDelay: "Réponse sous 24h",
  },

  social: {
    instagram: "https://www.instagram.com/hfconcept91/",
    facebook: "https://www.facebook.com/HFconcept",
    googleBusinessProfile: "https://share.google/W0Moo7oLXyw7nHBLw",
    houzz: "https://www.houzz.fr/professionnels/architecte-d-interieur/hfconcept-pfvwfr-pf~1671164986",
  },

  /** Adresse légale — affichée publiquement uniquement au niveau ville */
  address: {
    street: "boulevard Henri Dunant",
    city: "Corbeil-Essonnes",
    postalCode: "91100",
    country: "FR",
    /** Région administrative pour balises geo et JSON-LD */
    region: "Île-de-France",
  },

  /** Coordonnées géographiques (Corbeil-Essonnes) — utilisées par JSON-LD geo + meta geo legacy */
  geo: {
    latitude: 48.6107,
    longitude: 2.4827,
    /** Format ISO 3166-2 pour meta geo.region legacy */
    regionCode: "FR-IDF",
    placename: "Corbeil-Essonnes, Île-de-France",
  },

  intervention: {
    zones: "Paris · Île-de-France",
    modes: "à domicile & à distance",
    /**
     * Liste structurée des zones d'intervention pour JSON-LD areaServed.
     * Ordre : ville centrale, puis départements desservis.
     */
    areas: [
      { name: "Paris", type: "City" as const },
      { name: "Hauts-de-Seine", type: "AdministrativeArea" as const },
      { name: "Yvelines", type: "AdministrativeArea" as const },
      { name: "Essonne", type: "AdministrativeArea" as const },
      { name: "Val-de-Marne", type: "AdministrativeArea" as const },
      { name: "Seine-et-Marne", type: "AdministrativeArea" as const },
      { name: "Val-d'Oise", type: "AdministrativeArea" as const },
      { name: "Seine-Saint-Denis", type: "AdministrativeArea" as const },
    ] as const,
  },

  /** Horaires d'ouverture — utilisés par openingHoursSpecification JSON-LD */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
      opens: "09:00",
      closes: "18:00",
    },
  ] as const,

  projectTypes: "Résidentiel · Rénovation · Neuf",
} as const;
