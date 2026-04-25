import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";

import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { StudioAbout, StudioMethod, StudioPrinciples } from "@/components/sections/studio";
import { STUDIO_CONTENT } from "@/data/studio-content";
import heroStudioImg from "@/assets/images/hero/hero-studio.webp";
import { HERO_STUDIO_VARIANTS } from "@/data/image-variants";
import studioPortraitImg from "@/assets/images/hero/hero-studio.webp";
import finalCtaImg from "@/assets/images/hero/hero-services.webp";

const Studio = () => {
  const c = STUDIO_CONTENT;
  const seo = requireSeoRoute("/studio/");
  const heroMetaLine = c.hero.proofs.map((proof) => `${proof.value} ${proof.label}`).join(" • ");

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
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.text}
        metaLine={heroMetaLine}
        image={heroStudioImg}
        imageVariants={HERO_STUDIO_VARIANTS}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={c.hero.ctaPrimaryHref} variant="primary" size="lg">
            {c.hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href={c.hero.ctaSecondaryHref} variant="secondary" size="lg">
            {c.hero.ctaSecondary}
          </ButtonLink>
        </div>
      </PageHero>
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Le Studio" }]} />

      <StudioAbout content={c.aboutUs} imageSrc={studioPortraitImg} />
      <StudioPrinciples content={c.principlesSection} />
      <StudioMethod content={c.methodSection} />

      <FinalCtaSection
        eyebrow={c.finalCta.eyebrow}
        title={c.finalCta.title}
        text={c.finalCta.text}
        reassurance={c.finalCta.reassurance}
        ctaPrimary={c.finalCta.ctaPrimary}
        ctaPrimaryHref="/contact/"
        ctaSecondary={c.finalCta.ctaSecondary}
        ctaSecondaryHref="/services/"
        image={finalCtaImg}
        imageAlt="Cuisine contemporaine projetée en 3D — HFconcept"
        tone="light"
      />
    </>
  );
};

export default Studio;


