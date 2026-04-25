import heroHomeImg from "@/assets/images/hero/hfconcept-hero.webp";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HERO_HOME_VARIANTS } from "@/data/image-variants";
import type { HomeHeroContent, HomeTrustItems } from "./types";

interface HomeHeroProps {
  hero: HomeHeroContent;
  trustItems: HomeTrustItems;
}

export function HomeHero({ hero, trustItems }: HomeHeroProps) {
  const titleLines = hero.title.split("\n");
  const titleForA11y = titleLines.join(" ");

  return (
    <SectionFrame
      id="accueil-hero"
      tone="dark"
      spacing="hero"
      className="overflow-hidden"
      containerClassName="relative z-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,hsl(var(--brand-accent)/0.24),transparent_28%),radial-gradient(circle_at_82%_14%,hsl(var(--brand-accent-deep)/0.22),transparent_28%)]"
      />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
        <div className="space-y-7">
          <BrandWordmark />

          <div className="space-y-4">
            <p className="text-eyebrow text-hf-on-dark-soft">{hero.eyebrow}</p>
            <h1 className="text-display-xl text-hf-on-dark" aria-label={titleForA11y}>
              {titleLines.map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-body-lead max-w-[56ch] text-hf-on-dark-soft">{hero.text}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <ButtonLink href="/contact/" variant="primary" size="lg">
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="/realisations/" variant="secondary" size="lg">
              {hero.ctaSecondary}
            </ButtonLink>
          </div>

          <ul className="grid gap-3 pt-2 sm:grid-cols-2">
            {trustItems.map((item) => (
              <li
                key={`${item.accent}-${item.text}`}
                className="rounded-md border border-hf-surface-translucent-border bg-hf-surface-translucent-subtle px-4 py-3"
              >
                <p className="text-label text-hf-on-dark">
                  <span className="font-semibold text-hf-accent">{item.accent}</span>{" "}
                  <span className="text-hf-on-dark-soft">{item.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <figure className="surface-panel-dark overflow-hidden rounded-xl p-2">
            <OptimizedImage
              src={heroHomeImg}
              variants={HERO_HOME_VARIANTS}
              alt="Intérieur premium signé HFconcept"
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 42vw"
              width={1280}
              height={860}
              className="aspect-[5/4] w-full rounded-lg object-cover"
            />
          </figure>

          <ul className="grid gap-3 sm:grid-cols-3">
            {hero.proofs.map((proof) => (
              <li
                key={proof.label}
                className="rounded-md border border-hf-surface-translucent-border bg-hf-surface-translucent-subtle px-4 py-3 text-center"
              >
                <p className="text-h3 text-hf-on-dark">{proof.value}</p>
                <p className="text-micro text-hf-on-dark-soft">{proof.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionFrame>
  );
}
