import type { CSSProperties } from "react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import heroStudioImg from "@/assets/images/hero/hero-studio.webp";
import { HERO_STUDIO_VARIANTS } from "@/data/image-variants";

import "./home-hero.css";

type HomeHeroContent = (typeof import("@/data/home-content").HOME_CONTENT)["hero"];
type HomeTrustItems = (typeof import("@/data/home-content").HOME_CONTENT)["trustBand"]["items"];

interface HomeHeroProps {
  hero: HomeHeroContent;
  trustItems: HomeTrustItems;
}

const HERO_ANNOTATIONS = [
  "Valider les volumes",
  "Choisir les matières",
  "Fluidifier la circulation",
] as const;

const HERO_PROOF_KINDS = ["experience", "plans", "location", "price"] as const;

function HeroTechnicalLines() {
  return (
    <div className="home-hero-technical" aria-hidden="true">
      <svg viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M460 20C240 80 120 260 160 520"
          stroke="#B88A55"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M420 70C230 150 160 300 210 620"
          stroke="#B88A55"
          strokeWidth="1"
          strokeDasharray="6 8"
          opacity="0.22"
        />
        <path
          d="M80 390H280V610H80V390Z"
          stroke="#8C7A68"
          strokeWidth="1"
          opacity="0.16"
        />
        <path
          d="M120 390V610M80 460H280M180 390V520"
          stroke="#8C7A68"
          strokeWidth="1"
          opacity="0.12"
        />
        <path
          d="M20 260H220M120 160V360"
          stroke="#B88A55"
          strokeWidth="1"
          opacity="0.25"
        />
      </svg>
    </div>
  );
}

function HeroAnnotationIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2L12 3Z" />
        <path d="M12 12 4.8 7.6M12 12l7.2-4.4M12 12v8.4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h9l3 3v13H6V4Z" />
        <path d="M15 4v4h4M9 15l6-6M9 19l9-9M13 20l5-5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v14H5V5Z" />
      <path d="M12 5v14M5 12h14M8 8h2M14 16h2M15 8h2M8 16h2" />
    </svg>
  );
}

function HeroProofIcon({
  kind,
}: {
  kind: (typeof HERO_PROOF_KINDS)[number];
}) {
  if (kind === "experience") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9 20c-3-3-4-7-3-11M23 20c3-3 4-7 3-11" />
        <path d="M10 22c-1.8 1.7-4 2.8-6.5 3.2M22 22c1.8 1.7 4 2.8 6.5 3.2" />
        <path d="m16 7 2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.5 5-.7L16 7Z" />
      </svg>
    );
  }

  if (kind === "plans") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 6h20v15H6V6ZM12 26h8M16 21v5" />
        <path d="m16 9 5 3v5l-5 3-5-3v-5l5-3Z" />
        <path d="M16 14v6M11.4 12.2 16 15l4.6-2.8" />
      </svg>
    );
  }

  if (kind === "location") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 28s8-8.1 8-15A8 8 0 0 0 8 13c0 6.9 8 15 8 15Z" />
        <path d="M16 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 17.5 17.5 5H27v9.5L14.5 27 5 17.5Z" />
      <path d="M23 10.5h.1" />
    </svg>
  );
}

function HeroBenefitRail() {
  return (
    <ol className="home-hero-benefit-rail" aria-label="Points de validation du projet">
      {HERO_ANNOTATIONS.map((item, index) => (
        <li className="home-hero-benefit-item" key={item}>
          <span className="home-hero-benefit-icon">
            <HeroAnnotationIcon index={index} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function HeroProofBar({ items }: { items: readonly string[] }) {
  return (
    <div className="home-hero-proof-bar" aria-label="Preuves HFconcept">
      <ul className="home-hero-proof-list">
        {items.map((item, index) => (
          <li className="home-hero-proof-item" key={item}>
            <span className="home-hero-proof-icon">
              <HeroProofIcon kind={HERO_PROOF_KINDS[index] ?? "experience"} />
            </span>
            <span className="home-hero-proof-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeHero({ hero, trustItems: _trustItems }: HomeHeroProps) {
  const titleLines = hero.title.split("\n");
  const titleForA11y = titleLines.join(" ");
  const heroVisualStyle = {
    "--home-hero-image": `url(${heroStudioImg})`,
  } as CSSProperties;

  return (
    <section id="accueil-hero" className="home-hero">
      <div className="home-hero-main">
        <div className="home-hero-copy">
          <p className="home-hero-eyebrow">{hero.eyebrow}</p>
          <h1 className="home-hero-title" aria-label={titleForA11y}>
            {titleLines.map((line) => (
              <span className="home-hero-title-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="home-hero-text">{hero.text}</p>
          <div className="home-hero-actions" aria-label="Actions principales">
            <ButtonLink
              className="home-hero-cta home-hero-cta--primary"
              href="/contact/"
              size="lg"
              variant="primary"
            >
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              className="home-hero-cta home-hero-cta--secondary"
              href="/services/"
              size="lg"
              variant="ghost"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </div>
          {hero.servicesLine ? (
            <p className="home-hero-services">{hero.servicesLine}</p>
          ) : null}
        </div>

        <HeroTechnicalLines />

        <div className="home-hero-visual" style={heroVisualStyle}>
          <OptimizedImage
            alt="Plans, échantillons de matières et rendu 3D pour visualiser un projet d’intérieur avant travaux"
            className="home-hero-image"
            decoding="async"
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1024px) 60vw, 100vw"
            src={heroStudioImg}
            variants={HERO_STUDIO_VARIANTS}
          />
          <HeroBenefitRail />
        </div>
      </div>

      <HeroProofBar items={hero.proofBar} />
    </section>
  );
}
