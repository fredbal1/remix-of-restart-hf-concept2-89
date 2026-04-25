import { SEO } from "@/components/seo/SEO";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionShell } from "@/components/shell/SectionShell";
import { PageHero } from "@/components/layout/PageHero";
import { SITE_CONFIG } from "@/data/site-config";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import heroServiceDetailImg from "@/assets/images/hero/hero-service-detail.webp";

export default function MentionsLegales() {
  const seo = requireSeoRoute("/mentions-legales/");

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
        eyebrow="Informations légales"
        title="Mentions légales"
        image={heroServiceDetailImg}
        imageAlt="Ambiance architecturale HFconcept"
      />
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]} />

      <SectionShell surface="light">
        <div className="prose prose-lg max-w-3xl mx-auto text-legal text-hf-soft prose-headings:text-hf-strong prose-h2:text-h3 prose-h2:mt-12 prose-h2:mb-4 prose-p:text-hf-soft prose-a:text-hf-accent-deep hover:prose-a:text-hf-accent prose-a:underline prose-a:underline-offset-4">
          <p>
            Le présent site est édité par Fabien Benon, entrepreneur individuel (EI),
            exerçant sous le nom commercial HFconcept, sous le régime de la micro-entreprise
            (auto-entrepreneur).
          </p>

          <ul className="list-none pl-0 space-y-1 text-hf-soft">
            <li><strong className="text-hf-strong">SIRET :</strong> 52934801300010</li>
            <li><strong className="text-hf-strong">Code APE :</strong> 7410Z</li>
            <li><strong className="text-hf-strong">Adresse :</strong> {SITE_CONFIG.address.street}, {SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}, France</li>
            <li><strong className="text-hf-strong">E-mail :</strong> {SITE_CONFIG.contact.email}</li>
            <li><strong className="text-hf-strong">Téléphone :</strong> {SITE_CONFIG.contact.phoneDisplay}</li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>Le directeur de la publication est Monsieur Fabien Benon.</p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par OVH, Société par actions simplifiée au capital de
            10&nbsp;069&nbsp;020 euros, dont le siège social est situé 2 rue Kellermann,
            59100 Roubaix, immatriculée au RCS de Lille sous le numéro 424&nbsp;761&nbsp;419.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site, incluant notamment les textes, images,
            photographies, éléments graphiques, logo, mise en page et structure, est protégé par
            le droit de la propriété intellectuelle. Sauf autorisation écrite préalable, toute
            reproduction, représentation, adaptation, modification, publication, transmission ou
            exploitation, totale ou partielle, de tout ou partie du site, quel qu'en soit le
            procédé ou le support, est interdite.
          </p>

          <h2>Responsabilité</h2>
          <p>
            HFconcept s'efforce d'assurer, au mieux, l'exactitude et la mise à jour des
            informations diffusées sur ce site. Toutefois, l'éditeur ne saurait être tenu
            responsable des omissions, inexactitudes ou carences dans la mise à jour, ni des
            dommages directs ou indirects pouvant résulter de l'accès au site ou de son
            utilisation.
          </p>

          <h2>Liens externes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers. HFconcept ne peut être tenu
            responsable du contenu, des politiques ou du fonctionnement de ces sites externes.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant le site ou son contenu, vous pouvez écrire à{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a> ou appeler
            le {SITE_CONFIG.contact.phoneDisplay.replace(/ /g, "\u00a0")}.
          </p>
        </div>
      </SectionShell>
    </>
  );
}


