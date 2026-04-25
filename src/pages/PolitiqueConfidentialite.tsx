import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionShell } from "@/components/shell/SectionShell";
import { PageHero } from "@/components/layout/PageHero";
import { SITE_CONFIG } from "@/data/site-config";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import heroServiceDetailImg from "@/assets/images/hero/hero-service-detail.webp";

export default function PolitiqueConfidentialite() {
  const seo = requireSeoRoute("/politique-de-confidentialite/");

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
        eyebrow="Données personnelles"
        title={"Politique de\nconfidentialité"}
        image={heroServiceDetailImg}
        imageAlt="Ambiance architecturale HFconcept"
      />
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Politique de confidentialité" }]} />

      <SectionShell surface="light">
        <div className="prose prose-lg max-w-3xl mx-auto text-legal text-hf-soft prose-headings:text-hf-strong prose-h2:text-h3 prose-h2:mt-12 prose-h2:mb-4 prose-p:text-hf-soft prose-li:text-hf-soft prose-a:text-hf-accent-deep hover:prose-a:text-hf-accent prose-a:underline prose-a:underline-offset-4">
          <p>
            HFconcept attache une importance particulière à la protection de vos données
            personnelles et s'engage à traiter les informations que vous lui confiez de manière
            claire, proportionnée et sécurisée.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données collectées sur ce site est Fabien Benon,
            entrepreneur individuel (EI), exerçant sous le nom commercial HFconcept, sous le
            régime de la micro-entreprise (auto-entrepreneur). Vous pouvez le contacter à
            l'adresse suivante&nbsp;:{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>.
          </p>

          <h2>2. Données susceptibles d'être collectées</h2>
          <p>
            Lorsque vous utilisez le formulaire de contact ou que vous prenez contact avec
            HFconcept, les données susceptibles d'être collectées sont celles que vous
            renseignez volontairement, telles que&nbsp;:
          </p>
          <ul>
            <li>votre nom,</li>
            <li>votre adresse e-mail,</li>
            <li>votre numéro de téléphone,</li>
            <li>le contenu de votre message,</li>
            <li>et, plus largement, toute information que vous choisissez de transmettre dans le cadre de votre demande.</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Ces données sont utilisées uniquement pour&nbsp;:</p>
          <ul>
            <li>répondre à votre demande,</li>
            <li>échanger avec vous au sujet de votre projet,</li>
            <li>assurer le suivi des échanges préalables à une éventuelle prestation,</li>
            <li>et gérer la relation de contact initiée depuis le site.</li>
          </ul>

          <h2>4. Base légale</h2>
          <p>
            Le traitement repose sur l'intérêt légitime de HFconcept à répondre aux demandes
            reçues via son site internet et à assurer le suivi des échanges engagés à
            l'initiative du visiteur.
          </p>

          <h2>5. Destinataires des données</h2>
          <p>
            Les données collectées sont destinées à HFconcept. Elles peuvent toutefois être
            techniquement transmises via le prestataire Formspree, utilisé uniquement pour
            l'acheminement sécurisé des demandes envoyées depuis le formulaire de contact, pour
            le compte de HFconcept. Elles ne sont ni vendues, ni louées, ni cédées à des tiers
            à des fins commerciales.
          </p>

          <h2>6. Durée de conservation</h2>
          <p>
            Les données transmises via le formulaire de contact sont conservées pendant une durée
            n'excédant pas le temps nécessaire au traitement de la demande, puis archivées ou
            supprimées dans un délai raisonnable, sauf obligation légale contraire ou nécessité
            de conservation liée au suivi du dossier.
          </p>

          <h2>7. Vos droits</h2>
          <p>Conformément à la réglementation applicable, vous disposez d'un&nbsp;:</p>
          <ul>
            <li>droit d'accès,</li>
            <li>droit de rectification,</li>
            <li>droit d'effacement,</li>
            <li>droit à la limitation du traitement,</li>
            <li>et, selon les cas, d'un droit d'opposition.</li>
          </ul>
          <p>
            Vous pouvez exercer ces droits en écrivant à&nbsp;:{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a>.
          </p>

          <h2>8. Réclamation</h2>
          <p>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés,
            vous pouvez adresser une réclamation à la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
          </p>

          <h2>9. Cookies</h2>
          <p>
            À ce jour, le site n'utilise pas de dispositif de suivi publicitaire ni de dépôt de
            cookies non essentiels nécessitant un consentement préalable. En cas d'évolution du
            site, notamment en cas d'ajout d'outils de mesure d'audience, de marketing ou de
            services tiers impliquant des traceurs non essentiels, la présente politique pourra
            être mise à jour.
          </p>

          <h2>10. Mise à jour</h2>
          <p>
            La présente politique de confidentialité peut être modifiée à tout moment afin de
            refléter les évolutions du site, des services proposés ou des obligations légales et
            réglementaires applicables.
          </p>
        </div>
      </SectionShell>
    </>
  );
}


