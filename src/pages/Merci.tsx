import "./merci.css";
import { SEO } from "@/components/seo/SEO";
import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { getImageVariants } from "@/data/image-variants";
import { SITE_CONFIG } from "@/data/site-config";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import heroImage from "@/assets/images/hero/hero-contact.webp";

const STEPS = [
  {
    title: "Analyse de votre demande",
    text: "Nous prenons connaissance de votre message, de votre besoin et du contexte de votre projet.",
  },
  {
    title: "Premier retour personnalisé",
    text: "Nous vous recontactons sous 24h ouvrées par email ou par téléphone selon votre préférence.",
  },
  {
    title: "Définition de la suite",
    text: "Nous échangeons sur les prochaines étapes, le périmètre de l'accompagnement et la formule la plus adaptée.",
  },
] as const;

export default function Merci() {
  const seo = requireSeoRoute("/merci/");

  return (
    <>
      <SEO
        title={seo.title}
        canonical={seo.canonical ?? undefined}
        description={seo.description}
        ogImage={seo.ogImage}
        ogImageAlt={seo.ogImageAlt}
        twitterImageAlt={seo.twitterImageAlt}
        noindex={!seo.indexable}
        ogType={seo.ogType}
        robots={seo.robots}
      />

      {/* ── SECTION 1 — Hero split ── */}
      <SectionShell surface="light" className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left — text */}
          <div className="max-w-xl">
            <p className="text-eyebrow text-hf-accent-deep mb-4">Contact</p>

            <h1 className="text-h1 text-hf-strong mb-5 tracking-tight">
              Message bien reçu
            </h1>

            <p className="text-body text-hf-soft mb-6 max-w-[40ch] leading-relaxed">
              Merci pour votre message.
              <br />
              Nous revenons vers vous sous 24h ouvrées pour faire un premier
              point sur votre projet, vos besoins et la formule la plus adaptée.
            </p>

            {/* Reassurance — separated with top border */}
            <div className="border-t border-hf-accent/15 pt-5 mb-10">
              <p className="text-label text-hf-secondary tracking-wide">
                Premier échange sans engagement — accompagnement possible à
                distance partout en France
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <ButtonLink variant="primary" size="lg" href="/realisations/">
                Découvrir nos réalisations
              </ButtonLink>
              <ButtonLink variant="secondary" size="lg" href="/">
                Retour à l'accueil
              </ButtonLink>
            </div>
          </div>

          {/* Right — image panel */}
          <div className="merci-hero-frame">
            <OptimizedImage
              src={heroImage}
              variants={getImageVariants(heroImage)}
              alt="Séjour contemporain conçu par HFconcept — intérieur lumineux avec véranda"
              className="w-full h-auto aspect-[4/3] object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </SectionShell>

      {/* ── SECTION 2 — Ce qui se passe maintenant ── */}
      <SectionShell surface="muted">
        <SectionIntro
          eyebrow="Prochaines étapes"
          title="Ce qui se passe maintenant"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-14">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="surface-card-featured rounded-xl p-7 sm:p-8 flex flex-col"
            >
              {/* Step number — architectural accent */}
              <span className="text-[1.5rem] leading-none tracking-tight text-hf-accent/40 mb-4 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-px bg-hf-accent/30 mb-5" aria-hidden="true" />
              <h3 className="text-h4 text-hf-strong mb-3">{step.title}</h3>
              <p className="text-body-sm text-hf-soft leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── SECTION 3 — Clôture discrète ── */}
      <SectionShell surface="light" spacing="dense">
        <div className="max-w-xl mx-auto">
          <div className="surface-card-soft rounded-xl px-8 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="text-h4 text-hf-strong mb-4">
              Besoin d'ajouter une précision à votre demande ?
            </h2>
            <p className="text-body-sm text-hf-soft leading-relaxed">
              Vous pouvez nous écrire à{" "}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-hf-accent-deep font-medium underline underline-offset-2 decoration-hf-accent/40 hover:decoration-hf-accent transition-colors"
              >
                {SITE_CONFIG.contact.email}
              </a>{" "}
              ou nous appeler au{" "}
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-hf-accent-deep font-medium underline underline-offset-2 decoration-hf-accent/40 hover:decoration-hf-accent transition-colors"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

