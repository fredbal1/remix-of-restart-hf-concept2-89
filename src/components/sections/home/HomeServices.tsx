import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getImageVariants } from "@/data/image-variants";
import { SERVICE_OFFER_CARDS } from "@/data/services-content";
import { cn } from "@/lib/utils";
import type { HomeServicesContent } from "./types";

interface HomeServicesProps {
  content: HomeServicesContent;
}

export function HomeServices({ content }: HomeServicesProps) {
  const cards = SERVICE_OFFER_CARDS.slice(0, 4);

  return (
    <SectionFrame id="accueil-services" tone="light" spacing="standard">
      <div className="space-y-8">
        <header className="max-w-[72ch] space-y-3">
          <p className="text-eyebrow text-hf-soft">{content.eyebrow}</p>
          <h2 className="text-h1 text-balance text-hf-strong">{content.title}</h2>
          <p className="text-body-lg text-hf-soft">{content.text}</p>
        </header>

        <ul className="grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <li
              key={card.slug}
              className={cn(
                "surface-card relative overflow-hidden rounded-xl p-5 md:p-6",
                card.featured && "surface-card-featured",
              )}
            >
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <OptimizedImage
                    src={card.imageSrc}
                    variants={getImageVariants(card.imageSrc)}
                    alt={card.imageAlt}
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    width={960}
                    height={640}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  {(card.featuredLabel || card.newLabel) && (
                    <span className="absolute left-3 top-3 rounded-full bg-hf-ink/80 px-3 py-1 text-micro-label text-hf-on-dark">
                      {card.featuredLabel ?? card.newLabel}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-h3 text-hf-strong">{card.title}</h3>
                  <p className="text-body-sm text-hf-soft">{card.intro}</p>
                </div>

                <ul className="space-y-2">
                  {card.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="text-body-sm text-hf-soft">
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-end justify-between gap-3 pt-2">
                  <div>
                    <p className="text-h4 text-hf-strong">{card.priceLabel}</p>
                    {card.priceNote && <p className="text-micro text-hf-secondary">{card.priceNote}</p>}
                  </div>
                  <ButtonLink href={card.primaryCtaHref} variant="primary" size="sm">
                    {card.primaryCtaLabel}
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-hf-accent/20 bg-white/65 px-5 py-4">
          <ul className="flex flex-wrap gap-3">
            {content.reassurance.map((item) => (
              <li
                key={item}
                className="rounded-md border border-hf-accent/20 bg-white px-3 py-1.5 text-body-sm text-hf-soft"
              >
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href="/services/" variant="secondary" size="lg">
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </SectionFrame>
  );
}

