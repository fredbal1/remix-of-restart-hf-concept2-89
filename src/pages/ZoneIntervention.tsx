import { Link, useParams } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionShell } from "@/components/shell/SectionShell";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { ZONES_INTERVENTION, getZoneBySlug } from "@/data/zones-intervention";
import { getProjectBySlug } from "@/data/projects";
import { SITE_CONFIG } from "@/data/site-config";
import NotFound from "@/pages/NotFound";
import heroRealisationsImg from "@/assets/images/hero/hero-realisations.webp";
import { HERO_REALS_VARIANTS } from "@/data/image-variants";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";

const ZoneIntervention = () => {
  const { slug } = useParams<{ slug: string }>();
  const zone = slug ? getZoneBySlug(slug) : undefined;

  if (!zone) {
    return <NotFound />;
  }

  const seo = requireSeoRoute(`/zones-intervention/${zone.slug}`);
  const otherZones = ZONES_INTERVENTION.filter((z) => z.slug !== zone.slug);
  const featuredProjects = zone.featuredProjects.map((item) => {
    const project = getProjectBySlug(item.slug);

    if (!project) {
      throw new Error(
        `Unknown featured project "${item.slug}" for zone "${zone.slug}"`
      );
    }

    return { ...item, project };
  });

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
        eyebrow={zone.heroEyebrow}
        title={zone.heroTitle}
        description={zone.heroDescription}
        metaLine={`${zone.region} · ${zone.postalCodePrefix}`}
        image={heroRealisationsImg}
        imageVariants={HERO_REALS_VARIANTS}
      />
      <Breadcrumbs
        tone="dark"
        items={[
          { label: "Accueil", href: "/" },
          { label: "Zones d'intervention" },
          { label: zone.name },
        ]}
      />

      {/* ─── Intro éditoriale ─── */}
      <SectionShell surface="dark" spacing="dense">
        <div className="max-w-3xl mx-auto">
          <p className="text-eyebrow text-hf-accent mb-5">
            Notre intervention
          </p>
          <h2 className="text-h2 text-hf-on-dark mb-8">
            Un studio implanté en Île-de-France, attentif aux usages locaux.
          </h2>
          {zone.intro.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-body text-hf-on-dark-soft mt-5 first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* ─── Notre approche — grille 2x2 ─── */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark">
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Notre approche
          </p>
          <h2 className="text-h3 text-hf-on-dark text-center max-w-2xl mx-auto mb-12 lg:mb-14">
            Une méthode adaptée aux spécificités du territoire.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {zone.approche.map((item) => (
              <article
                key={item.title}
                className="p-7 lg:p-8 rounded-lg surface-panel-dark border border-hf-divider-on-dark"
              >
                <h3 className="text-h5 text-hf-on-dark mb-3">{item.title}</h3>
                <p className="text-body-sm text-hf-on-dark-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <section
          aria-labelledby="zone-featured-projects-title"
          className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Réalisations pertinentes
          </p>
          <h2
            id="zone-featured-projects-title"
            className="text-h3 text-hf-on-dark text-center max-w-3xl mx-auto"
          >
            Réalisations pertinentes dans cette zone
          </h2>
          <p className="text-body-sm text-hf-on-dark-soft text-center max-w-3xl mx-auto mt-4">
            Une sélection de projets dont la logique d'agencement répond à des
            demandes fréquemment rencontrées sur ce territoire.
          </p>
          <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {featuredProjects.map((item) => (
              <Link
                key={item.slug}
                to={`/realisations/${item.slug}/`}
                className="group rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7 transition-colors hover:border-hf-accent/25"
              >
                <p className="text-micro-label text-hf-accent/80 mb-3">
                  {item.label}
                </p>
                <h3 className="text-h5 text-hf-on-dark mb-3">
                  {item.project.title}
                </h3>
                <p className="text-body-sm text-hf-on-dark-soft">
                  {item.reason}
                </p>
                <span className="inline-flex items-center mt-5 text-label text-hf-on-dark group-hover:text-hf-accent transition-colors">
                  Voir la réalisation
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="zone-related-services-title"
          className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Services adaptés
          </p>
          <h2
            id="zone-related-services-title"
            className="text-h3 text-hf-on-dark text-center max-w-3xl mx-auto"
          >
            Services les plus adaptés
          </h2>
          <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {zone.relatedServices.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7 transition-colors hover:border-hf-accent/25"
              >
                <h3 className="text-h5 text-hf-on-dark mb-3">
                  {service.label}
                </h3>
                <p className="text-body-sm text-hf-on-dark-soft">
                  {service.reason}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="zone-project-types-title"
          className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Projets fréquents
          </p>
          <h2
            id="zone-project-types-title"
            className="text-h3 text-hf-on-dark text-center max-w-3xl mx-auto"
          >
            Types de projets les plus fréquents dans cette zone
          </h2>
          <div className="mt-8 lg:mt-10 max-w-4xl mx-auto rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {zone.frequentProjectTypes.map((projectType) => (
                <li
                  key={projectType}
                  className="flex items-start gap-3 text-body-sm text-hf-on-dark-soft"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-accent"
                    aria-hidden="true"
                  />
                  <span>{projectType}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="zone-local-process-title"
          className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Déroulé du projet
          </p>
          <h2
            id="zone-local-process-title"
            className="text-h3 text-hf-on-dark text-center max-w-3xl mx-auto"
          >
            Comment se déroule un projet dans cette zone
          </h2>
          <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {zone.localProcess.map((step, index) => (
              <article
                key={step.title}
                className="rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7"
              >
                <p className="text-micro-label text-hf-accent/80 mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-h5 text-hf-on-dark mb-3">{step.title}</h3>
                <p className="text-body-sm text-hf-on-dark-soft">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="zone-faq-title"
          className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            FAQ locale
          </p>
          <h2
            id="zone-faq-title"
            className="text-h3 text-hf-on-dark text-center max-w-3xl mx-auto"
          >
            FAQ locale
          </h2>
          <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {zone.faq.map((item) => (
              <article
                key={item.question}
                className="rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7"
              >
                <h3 className="text-h5 text-hf-on-dark mb-3">
                  {item.question}
                </h3>
                <p className="text-body-sm text-hf-on-dark-soft">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── Secteurs couverts — chips ─── */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark">
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Secteurs couverts
          </p>
          <h2 className="text-h3 text-hf-on-dark text-center max-w-2xl mx-auto mb-10 lg:mb-12">
            Une présence sur l'ensemble du territoire concerné.
          </h2>
          <ul className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {zone.villesDesservies.map((ville) => (
              <li
                key={ville}
                className="min-h-11 inline-flex items-center px-5 py-2.5 rounded-full text-body-sm font-medium surface-panel-dark text-hf-on-dark-soft border border-hf-divider-on-dark"
              >
                {ville}
              </li>
            ))}
          </ul>
          <p className="text-label text-hf-on-dark-soft/70 text-center mt-8 max-w-2xl mx-auto">
            {zone.logistique}
          </p>
        </div>

        {/* ─── Réassurance NAP locale ─── */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-eyebrow text-hf-accent mb-3">Studio</p>
              <p className="text-body text-hf-on-dark">
                {SITE_CONFIG.address.city}
              </p>
              <p className="text-label text-hf-on-dark-soft mt-1">
                {zone.region}
              </p>
            </div>
            <div>
              <p className="text-eyebrow text-hf-accent mb-3">Téléphone</p>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-body text-hf-on-dark hover:text-hf-accent transition-colors"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <p className="text-label text-hf-on-dark-soft mt-1">
                {SITE_CONFIG.contact.responseDelay}
              </p>
            </div>
            <div>
              <p className="text-eyebrow text-hf-accent mb-3">Email</p>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-body text-hf-on-dark hover:text-hf-accent transition-colors break-all"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* ─── Liens internes vers les autres zones ─── */}
        {otherZones.length > 0 && (
          <nav
            aria-label="Autres zones d'intervention"
            className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-hf-divider-on-dark"
          >
            <p className="text-eyebrow text-hf-accent mb-5 text-center">
              Autres zones d'intervention
            </p>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {otherZones.map((other) => (
                <li key={other.slug}>
                  <Link
                    to={`/zones-intervention/${other.slug}/`}
                    className="min-h-11 inline-flex items-center px-5 py-2.5 rounded-full text-body-sm font-medium surface-panel-dark text-hf-on-dark-soft border border-hf-divider-on-dark hover:text-hf-on-dark hover:border-hf-accent/25 transition-colors"
                  >
                    {other.heroTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* ─── CTA principal ─── */}
        <div className="flex justify-center mt-16 lg:mt-20">
          <ButtonLink href="/contact/" variant="primary">
            Parler de votre projet {zone.ctaLocative}
          </ButtonLink>
        </div>
      </SectionShell>

      <FinalCtaSection
        eyebrow="À votre tour"
        title={`Votre projet ${zone.ctaLocative} commence ici.`}
        text="À partir de vos usages, de votre lieu et de votre niveau d'exigence, nous posons une direction claire avant d'aller plus loin."
        reassurance="Premier échange offert — sans engagement"
        ctaPrimary="Parler de votre projet"
        ctaPrimaryHref="/contact/"
        ctaSecondary="Voir nos réalisations"
        ctaSecondaryHref="/realisations/"
        image={heroServicesImg}
        imageAlt="Réalisation HFconcept — conduite de projet"
        tone="muted"
      />
    </>
  );
};

export default ZoneIntervention;


