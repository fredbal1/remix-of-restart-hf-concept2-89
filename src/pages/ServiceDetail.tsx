import { Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getImageVariants } from "@/data/image-variants";
import { SERVICE_OFFERS } from "@/data/services-content";
import { ServiceComparisonSection } from "@/components/services/detail/ServiceComparisonSection";
import { ServiceFaqSection } from "@/components/services/detail/ServiceFaqSection";
import { ImmersiveHero } from "@/components/services/detail/ImmersiveHero";
import { OtherServicesRail } from "@/components/services/detail/OtherServicesRail";
import { ServiceIntroSection } from "@/components/services/detail/ServiceIntroSection";
import { ServiceProcessSection } from "@/components/services/detail/ServiceProcessSection";
import { ServiceRelatedProjectsSection } from "@/components/services/detail/ServiceRelatedProjectsSection";
import { ServiceScopeSection } from "@/components/services/detail/ServiceScopeSection";
import { ServiceUseCasesSection } from "@/components/services/detail/ServiceUseCasesSection";
import { getServiceSeoRoute } from "@/lib/seo/route-manifest";
import NotFound from "@/pages/NotFound";

function BenefitsBand({
  benefits,
  heroImage,
}: {
  benefits: readonly string[];
  heroImage: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <OptimizedImage
        src={heroImage}
        variants={getImageVariants(heroImage)}
        alt=""
        aria-hidden="true"
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-hf-overlay-strong" />
      <div className="noise-grain absolute inset-0 pointer-events-none" />
      <div className="container-hf relative z-10 spacing-section-standard">
        <div className="max-w-3xl mx-auto text-center">
          <SectionIntro
            eyebrow="Bénéfices / impact"
            title="Ce que ça change pour vous"
            description="Des bénéfices concrets pour avancer avec plus de justesse et moins de friction."
            align="center"
            inverted
          />
        </div>

        <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <article
              key={benefit}
              className="flex items-start gap-4 rounded-xl bg-hf-surface-translucent-subtle ring-1 ring-hf-surface-translucent-border p-5 lg:p-6"
            >
              <div className="w-9 h-9 rounded-full bg-hf-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-hf-accent" />
              </div>
              <p className="text-body text-hf-on-dark-soft">{benefit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <NotFound />;
  }

  const service = SERVICE_OFFERS.find((entry) => entry.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  const seo = getServiceSeoRoute(service.slug);

  if (!seo) {
    return <NotFound />;
  }

  const isOnQuote = !service.price.includes("€");

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

      <ImmersiveHero service={service} isOnQuote={isOnQuote} />

      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services/" },
          { label: service.title },
        ]}
        tone="dark"
      />

      <ServiceIntroSection service={service} />
      <ServiceUseCasesSection items={service.useCases} />
      <ServiceProcessSection steps={service.process} />
      <ServiceScopeSection service={service} />
      <BenefitsBand benefits={service.benefits} heroImage={service.heroImage} />
      <ServiceRelatedProjectsSection
        serviceSlug={service.slug}
        items={service.relatedProjects}
      />
      <ServiceFaqSection items={service.faq} />
      <ServiceComparisonSection
        currentServiceSlug={service.slug}
        comparison={service.comparison}
      />
      <OtherServicesRail currentSlug={service.slug} />

      <FinalCtaSection
        eyebrow="Passons au concret"
        title="Voyons si cette formule est la bonne pour vous."
        text="Nous clarifions votre besoin, vos contraintes et le périmètre utile avant de vous orienter."
        reassurance="Réponse claire — sans engagement initial"
        ctaPrimary="Nous contacter"
        ctaPrimaryHref="/contact/"
        ctaSecondary="Voir toutes les formules"
        ctaSecondaryHref="/services/"
        image={service.heroImage}
        imageAlt={`${service.title} — HFconcept`}
        tone="light"
      />
    </>
  );
}


