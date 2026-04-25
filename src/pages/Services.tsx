import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { ServicesCommitments, ServicesOffers } from "@/components/sections/services";
import {
  SERVICE_OFFER_CARDS,
  SERVICES_PAGE,
} from "@/data/services-content";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";
import { HERO_SERVICES_VARIANTS } from "@/data/image-variants";
import finalCtaImg from "@/assets/images/services/service-projet-complet.webp";

/* ─── Page ─── */

export default function Services() {
  const { hero, offersSection, cta } = SERVICES_PAGE;
  const seo = requireSeoRoute("/services/");

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical ?? undefined}
        ogImage={seo.ogImage}
        ogImageAlt={seo.ogImageAlt}
        twitterImageAlt={seo.twitterImageAlt}
        noindex={!seo.indexable}
        ogType={seo.ogType}
        robots={seo.robots}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.text}
        metaLine={offersSection.reassuranceLine}
        image={heroServicesImg}
        imageVariants={HERO_SERVICES_VARIANTS}
      />
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Services" }]} />

      <ServicesOffers
        eyebrow={offersSection.eyebrow}
        title={offersSection.title}
        description={offersSection.description}
        offers={SERVICE_OFFER_CARDS}
        reassuranceLine={offersSection.reassuranceLine}
      />

      <ServicesCommitments />

      <FinalCtaSection
        eyebrow={cta.eyebrow}
        title={cta.title}
        text={cta.text}
        reassurance={cta.reassurance}
        ctaPrimary={cta.ctaPrimary}
        ctaPrimaryHref={cta.ctaPrimaryHref}
        ctaSecondary={cta.ctaSecondary}
        ctaSecondaryHref={cta.ctaSecondaryHref}
        image={finalCtaImg}
        imageAlt="Projet d'architecture intérieure complet — HFconcept"
        tone="muted"
      />
    </>
  );
}


