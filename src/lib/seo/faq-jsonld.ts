/**
 * FAQ JSON-LD — content-curated, SSR-injected on selected routes.
 * Replies must remain factually accurate and aligned with content sources.
 */

import type { ServiceFaqItem } from "../../types/services";
import { getServiceFaqBySlug } from "../../data/service-faq";
import { getZoneBySlug } from "../../data/zones-intervention";

export type FaqEntry = ServiceFaqItem;

export const SERVICES_FAQ: readonly FaqEntry[] = [
  {
    question: "Quelle est la zone d'intervention du studio HFconcept ?",
    answer:
      "Nous intervenons à Paris et dans toute l'Île-de-France (Hauts-de-Seine, Yvelines, Essonne, Val-de-Marne, Seine-et-Marne, Val-d'Oise, Seine-Saint-Denis). La formule à distance est accessible partout en France et à l'international.",
  },
  {
    question: "Quel est le tarif d'une consultation ?",
    answer:
      "La formule Conseil débute à 99 € pour une heure de consultation à domicile en Île-de-France. La conception 3D commence à 369 € pour une pièce de moins de 20 m². Le projet complet est sur devis.",
  },
  {
    question: "Quels sont les délais d'un projet ?",
    answer:
      "Les délais varient selon la formule choisie : une consultation se planifie sous 2 à 3 semaines, une conception 3D photoréaliste demande généralement 3 à 5 semaines, et un projet complet s'étale sur plusieurs mois selon l'ampleur du chantier.",
  },
  {
    question: "Peut-on travailler avec vous à distance ?",
    answer:
      "Oui. La formule Projet à distance permet de concevoir votre intérieur intégralement par visioconférence, avec plans, 3D photoréalistes et palette matériaux livrés à distance. Accessible partout en France et à l'international.",
  },
  {
    question: "Le premier échange est-il payant ?",
    answer:
      "Non. Le premier échange est offert et sans engagement. Il permet de cadrer votre besoin, vos contraintes et de vous orienter vers la formule la plus adaptée.",
  },
];

function buildFaqPayload(entries: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildFaqJsonLd(entries: readonly FaqEntry[]) {
  return buildFaqPayload(entries);
}

export function getFaqJsonLd() {
  return buildFaqPayload(SERVICES_FAQ);
}

export function getServiceFaqEntries(slug: string) {
  return getServiceFaqBySlug(slug);
}

export function getServiceFaqJsonLd(slug: string) {
  return buildFaqPayload(getServiceFaqEntries(slug));
}

export function getZoneFaqJsonLd(slug: string) {
  const zone = getZoneBySlug(slug);

  if (!zone) {
    throw new Error(`Zone introuvable pour slug "${slug}"`);
  }

  if (!zone.faq || zone.faq.length === 0) {
    throw new Error(`FAQ introuvable pour la zone "${slug}"`);
  }

  return buildFaqPayload(zone.faq);
}
