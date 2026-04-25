import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionShell } from "@/components/shell/SectionShell";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { ContactProofBand } from "@/components/sections/contact/ContactProofBand";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import heroContactImg from "@/assets/images/hero/hero-contact.webp";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";
import "@/components/sections/contact/contact-section.css";

const PROOF_ITEMS = [
  { value: "+15 ans", label: "d'expérience" },
  { value: "100%", label: "sur-mesure" },
  { value: "24h", label: "délai de réponse" },
  { value: "Paris & IdF", label: "zone d'intervention" },
];

export default function Contact() {
  const seo = requireSeoRoute("/contact/");

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
        eyebrow="Contact"
        title={"Parlons de\nvotre projet"}
        description="Premier échange gratuit, sans engagement. Réponse sous 24h."
        image={heroContactImg}
        className="contact-page-hero"
      />
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />

      {/* ── Section formulaire ── */}
      <SectionShell surface="light" spacing="standard" className="contact-main-shell">
        <div className="contact-main-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
          <div className="contact-form-column lg:col-span-7 xl:col-span-8">
            <div className="contact-form-card">
              <ContactForm className="contact-form-shell" />
            </div>
          </div>
          <aside className="contact-info-column lg:col-span-5 xl:col-span-4">
            <div className="contact-info-card lg:sticky lg:top-28">
              <ContactInfo />
            </div>
          </aside>
        </div>
      </SectionShell>

      <ContactProofBand items={PROOF_ITEMS} className="contact-proof-band" />

      <FinalCtaSection
        eyebrow="Avant notre échange"
        title="Explorez l'univers HFconcept."
        text="Réalisations et services vous donneront un aperçu plus concret de notre niveau d'exigence et de notre manière de concevoir."
        reassurance="Des repères utiles avant le premier échange"
        ctaPrimary="Voir nos réalisations"
        ctaPrimaryHref="/realisations/"
        ctaSecondary="Découvrir les services"
        ctaSecondaryHref="/services/"
        image={heroServicesImg}
        imageAlt="Projection d'intérieur — HFconcept"
        tone="light"
        className="contact-final-cta"
      />
    </>
  );
}



