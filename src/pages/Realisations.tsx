import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionShell } from "@/components/shell/SectionShell";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { FilterChips } from "@/components/ui/FilterChips";
import { ProjectsGrid } from "@/components/ui/ProjectsGrid";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { getImageVariants, HERO_REALS_VARIANTS } from "@/data/image-variants";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_ROUTES,
  getProjectBySlug,
  type ProjectCategory,
  type Project,
} from "@/data/projects";
import heroRealisationsImg from "@/assets/images/hero/hero-realisations.webp";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";
import "@/components/sections/realisations/realisations-page.css";

const INITIAL_COUNT = 8;

interface PortfolioBrowseCardData {
  projectSlug: Project["slug"];
  title: string;
  text: string;
  href: string;
}

const REALISATIONS_EDITORIAL = {
  title: "Un portfolio pensé pour montrer l'usage avant l'effet.",
  paragraphs: [
    "Chaque réalisation présentée ici répond à un lieu, à des contraintes réelles et à une manière d'habiter. Vous y retrouvez notre approche de l'architecture intérieure : clarifier les volumes, hiérarchiser les fonctions, travailler les matières et intégrer le sur-mesure quand il apporte une vraie valeur d'usage.",
    "Cette page permet d'explorer le portfolio par ambiance, par type d'espace ou par problématique. Cuisines, salles de bain, séjours, chambres ou aménagements sur mesure : chaque catégorie montre des réponses concrètes, pensées pour durer et pour rester cohérentes avec le lieu.",
  ],
  cards: [
    {
      title: "Ce que montrent nos réalisations",
      items: [
        "des volumes mieux exploités",
        "des circulations clarifiées",
        "des rangements intégrés quand ils sont utiles",
        "des matières choisies pour leur cohérence et leur tenue dans le temps",
      ],
    },
    {
      title: "Ce que nous cherchons dans chaque projet",
      items: [
        "une réponse juste au lieu existant",
        "un intérieur lisible au quotidien",
        "une esthétique maîtrisée sans effet gratuit",
        "un niveau de détail cohérent avec le budget et l'usage",
      ],
    },
    {
      title: "Comment utiliser cette page",
      items: [
        "filtrer par catégorie pour cibler un besoin précis",
        "repérer les logiques d'agencement récurrentes",
        "comparer les partis pris de matière et de lumière",
        "poursuivre vers la formule d'accompagnement adaptée",
      ],
    },
  ],
  relatedServices: [
    { label: "Conseil", href: "/services/conseil/" },
    { label: "Conception 3D", href: "/services/conception-3d/" },
    { label: "Projet complet", href: "/services/projet-complet/" },
  ],
} as const;

const PORTFOLIO_BROWSE = {
  eyebrow: "Explorer autrement",
  title: "Parcourir le portfolio",
  description:
    "Chaque projet permet de lire un angle différent de notre travail : structurer un volume, intégrer du sur-mesure, ou faire dialoguer matières, lumière et usages.",
  cards: [
    {
      projectSlug: "sejour-veranda-contemporain",
      title: "Structurer les volumes",
      text: "Explorer les projets où l'agencement clarifie la circulation et redonne une lecture nette à l'espace.",
      href: "/realisations/categorie/sejours/",
    },
    {
      projectSlug: "bibliotheque-vitrine-retro-eclairee",
      title: "Intégrer le sur-mesure",
      text: "Voir comment bibliothèques, rangements, escaliers ou séparations deviennent des éléments d'architecture intérieure.",
      href: "/realisations/categorie/sur-mesure/",
    },
    {
      projectSlug: "cuisine-faux-plafond-courbe",
      title: "Explorer les cuisines",
      text: "Découvrir des cuisines où l'agencement, les matières et le lien avec la pièce de vie donnent le ton de l'ensemble.",
      href: "/realisations/categorie/cuisines/",
    },
  ] satisfies readonly PortfolioBrowseCardData[],
  observationItems: [
    "la manière dont un espace est structuré",
    "l'usage réel du sur-mesure",
    "le rôle des matières, de la lumière et des continuités visuelles",
  ],
} as const;

function PortfolioBrowseCard({
  title,
  text,
  href,
  project,
}: {
  title: string;
  text: string;
  href: string;
  project: Project;
}) {
  return (
    <Link
      to={href}
      className="portfolio-browse-card group relative block min-w-0 min-h-[296px] overflow-hidden rounded-xl border border-hf-divider-on-dark shadow-panel"
    >
      <div className="portfolio-browse-card__media absolute inset-0">
        <OptimizedImage
          src={project.cover}
          variants={getImageVariants(project.cover)}
          alt={`Vue du projet — ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-ambient ease-out-expo group-hover-scale-gentle"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
      </div>
      <div className="portfolio-browse-card__overlay absolute inset-0" aria-hidden="true" />
      <div className="portfolio-browse-card__highlight absolute inset-0" aria-hidden="true" />
      <div className="portfolio-browse-card__panel relative z-10 flex h-full min-w-0 flex-col justify-end p-5 sm:p-6 lg:p-7">
        <div className="max-w-[31ch]">
          <p className="portfolio-browse-card__eyebrow hidden text-micro-label text-hf-accent/80 sm:block sm:mb-3">
            {project.title}
          </p>
          <h3 className="text-h4 text-hf-on-dark mb-2.5 max-w-[16ch]">{title}</h3>
          <p className="text-body-sm text-hf-on-dark-soft max-w-[31ch]">{text}</p>
        </div>
        <span className="portfolio-browse-card__cta inline-flex items-center gap-1.5 text-label text-hf-accent mt-5">
          Explorer
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-fast ease-out-expo group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Sort projects: featured first (by editorialOrder), then rest by original order */
function sortEditorial(projects: Project[]): Project[] {
  const featured = projects
    .filter((p) => p.isFeatured)
    .sort((a, b) => (a.editorialOrder ?? 99) - (b.editorialOrder ?? 99));

  const rest = projects.filter((p) => !p.isFeatured);
  return [...featured, ...rest];
}

const Realisations = () => {
  const seo = requireSeoRoute("/realisations/");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filtre") ?? "Tous";
  const [activeFilter, setActiveFilter] = useState<string>(
    PROJECT_CATEGORIES.includes(initialFilter as ProjectCategory) ? initialFilter : "Tous"
  );
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const param = searchParams.get("filtre");
    const valid = param && PROJECT_CATEGORIES.includes(param as ProjectCategory);
    setActiveFilter(valid ? param : "Tous");
    setShowAll(false);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (activeFilter === "Tous") return sortEditorial(PROJECTS);
    return PROJECTS.filter((p) =>
      p.categories.includes(activeFilter as ProjectCategory)
    );
  }, [activeFilter]);

  const isAllFilter = activeFilter === "Tous";
  const hasMore = isAllFilter && filtered.length > INITIAL_COUNT;
  const displayed = isAllFilter && !showAll ? filtered.slice(0, INITIAL_COUNT) : filtered;
  const portfolioBrowseCards = PORTFOLIO_BROWSE.cards.flatMap((card) => {
    const project = getProjectBySlug(card.projectSlug);
    return project ? [{ ...card, project }] : [];
  });
  const heroMetaLine = `${PROJECTS.length} projets • ${PROJECT_CATEGORIES.length - 1} univers • Paris & Île-de-France`;

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setShowAll(false);
    if (value === "Tous") {
      setSearchParams({});
    } else {
      setSearchParams({ filtre: value });
    }
  };

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
        eyebrow="Portfolio"
        title="Nos réalisations"
        description="Des lieux pensés avec exigence, usage et caractère."
        metaLine={heroMetaLine}
        image={heroRealisationsImg}
        imageVariants={HERO_REALS_VARIANTS}
        className="realisations-page-hero"
      />
      <Breadcrumbs tone="dark" items={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]} />

      <SectionShell surface="dark" spacing="dense" className="realisations-main-shell">
        <div className="realisations-intro-grid grid grid-cols-1 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-9 lg:gap-11 xl:gap-14">
          <div className="realisations-editorial-lead min-w-0 max-w-2xl xl:max-w-none">
            <SectionIntro
              title={REALISATIONS_EDITORIAL.title}
              description={REALISATIONS_EDITORIAL.paragraphs[0]}
              inverted
            />
            <p className="realisations-editorial-copy text-body text-hf-on-dark-soft mt-5">
              {REALISATIONS_EDITORIAL.paragraphs[1]}
            </p>
          </div>

          <div className="realisations-editorial-aside min-w-0 space-y-5 lg:space-y-6 xl:pt-2">
            <div className="realisations-editorial-cards grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {REALISATIONS_EDITORIAL.cards.map((card, index) => (
                <article
                  key={card.title}
                  className={`realisations-editorial-card rounded-xl border border-hf-divider-on-dark surface-panel-dark p-5 lg:p-6 ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <h3 className="text-body font-medium text-hf-on-dark mb-3">{card.title}</h3>
                  <ul className="space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-body-sm text-hf-on-dark-soft">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="realisations-services-strip flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hf-divider-on-dark/60 pt-4 text-body-sm">
              <span className="text-label text-hf-on-dark-soft/55">Services associés</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {REALISATIONS_EDITORIAL.relatedServices.map((service) => (
                  <li key={service.href}>
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-2 text-body-sm text-hf-on-dark-soft hover:text-hf-accent transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="portfolio-browse-title"
          className="realisations-browse-section mt-12 lg:mt-14 pt-10 lg:pt-12 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-4">{PORTFOLIO_BROWSE.eyebrow}</p>
          <h2 id="portfolio-browse-title" className="text-h3 text-hf-on-dark max-w-3xl">
            {PORTFOLIO_BROWSE.title}
          </h2>
          <p className="text-body-sm text-hf-on-dark-soft max-w-3xl mt-4">
            {PORTFOLIO_BROWSE.description}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {portfolioBrowseCards.map((card) => (
              <PortfolioBrowseCard
                key={`${card.title}-${card.project.slug}`}
                title={card.title}
                text={card.text}
                href={card.href}
                project={card.project}
              />
            ))}
          </div>

          <div className="realisations-observation-board mt-7 lg:mt-8">
            <p className="text-eyebrow text-hf-on-dark-soft/50">Ce que vous pouvez observer dans les projets</p>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {PORTFOLIO_BROWSE.observationItems.map((item) => (
                <li
                  key={item}
                  className="realisations-observation-item flex items-start gap-3 rounded-xl border border-hf-divider-on-dark/60 px-4 py-4 text-body-sm text-hf-on-dark-soft"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-accent/80" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="realisations-filter-bar mt-12 lg:mt-14 pt-8 lg:pt-10 border-t border-hf-divider-on-dark mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <FilterChips
              options={[...PROJECT_CATEGORIES]}
              value={activeFilter}
              onChange={handleFilterChange}
              className="realisations-filter-chips"
            />
            <span
              key={activeFilter}
              className="realisations-count-pill self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full surface-panel-dark border border-hf-divider-on-dark text-body-sm font-medium text-hf-on-dark-soft tabular-nums animate-fade-in"
            >
              <span className="text-hf-accent">{filtered.length}</span>
              projet{filtered.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <ProjectsGrid
          projects={displayed}
          isEditorial={isAllFilter}
          className="realisations-project-grid"
          cardClassName="realisations-project-card"
          showProjectMeta
        />

        {hasMore && !showAll && (
          <div className="realisations-show-more flex justify-center mt-14 lg:mt-16">
            <Button variant="secondary" onClick={() => setShowAll(true)}>
              Explorer tous nos projets
            </Button>
          </div>
        )}

        <nav
          aria-label="Explorer par catégorie"
          className="realisations-category-nav mt-16 lg:mt-20 pt-10 lg:pt-12 border-t border-hf-divider-on-dark"
        >
          <p className="text-eyebrow text-hf-accent mb-5 text-center">
            Explorer par catégorie
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {PROJECT_CATEGORY_ROUTES.map((route) => (
              <li key={route.slug}>
                <Link
                  to={`/realisations/categorie/${route.slug}/`}
                  className="realisations-category-pill min-h-11 inline-flex items-center px-5 py-2.5 rounded-full text-body-sm font-medium surface-panel-dark text-hf-on-dark-soft border border-hf-divider-on-dark hover:text-hf-on-dark hover:border-hf-accent/25 transition-colors"
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SectionShell>

      <FinalCtaSection
        eyebrow="À votre tour"
        title="Le vôtre peut commencer ici."
        text="À partir de vos usages, de votre lieu et de votre niveau d'exigence, nous posons une direction claire avant d'aller plus loin."
        reassurance="Premier échange offert — sans engagement"
        ctaPrimary="Parler de votre projet"
        ctaPrimaryHref="/contact/"
        ctaSecondary="Découvrir les services"
        ctaSecondaryHref="/services/"
        image={heroServicesImg}
        imageAlt="Réalisation HFconcept — conduite de projet"
        tone="muted"
        className="realisations-final-cta"
      />

    </>
  );
};

export default Realisations;



