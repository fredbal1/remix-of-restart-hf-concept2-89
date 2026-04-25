export interface ServiceOfferCardData {
  number: string;
  slug: string;
  title: string;
  priceLabel: string;
  priceNote?: string;
  priceDetail?: string;
  intro: string;
  highlights: string[];
  positioningNote: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  featuredLabel?: string;
  newLabel?: string;
}

export interface ServiceOfferCard {
  intro: string;
  highlights: string[];
  positioningNote: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageAlt: string;
  featured?: boolean;
  featuredLabel?: string;
  newLabel?: string;
}

export interface ServiceUseCase {
  title: string;
  text: string;
}

export interface ServiceProcessStep {
  title: string;
  text: string;
}

export type ServiceScopeTone = "included" | "optional" | "excluded";

export interface ServiceScopeGroup {
  tone: ServiceScopeTone;
  title: string;
  intro: string;
  items: string[];
}

export interface ServiceRelatedProject {
  slug: string;
  reason: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceComparisonItem {
  slug: string;
  reason: string;
}

export interface ServiceComparison {
  idealFor: string[];
  lessSuitableFor: string[];
  otherOptions: ServiceComparisonItem[];
}

export interface ServiceOffer {
  number: string;
  slug: string;
  title: string;
  href: string;
  price: string;
  priceNote?: string;
  subtitle: string;
  accroche: string;
  text: string;
  deliverables: string[];
  benefits: string[];
  audience: string;
  commitment: string;
  heroImage: string;
  selectorSummary: string;
  card: ServiceOfferCard;
  detailIntroTitle: string;
  detailIntro: string[];
  useCases: ServiceUseCase[];
  process: ServiceProcessStep[];
  scope: ServiceScopeGroup[];
  relatedProjects: ServiceRelatedProject[];
  faq: ServiceFaqItem[];
  availabilityNote: string;
  comparison: ServiceComparison;
}
