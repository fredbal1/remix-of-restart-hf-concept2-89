import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getImageVariants } from "@/data/image-variants";
import type { ServiceOfferCardData } from "@/types/services";

interface ServicesOffersProps {
  eyebrow: string;
  title: string;
  description: string;
  reassuranceLine: string;
  offers: readonly ServiceOfferCardData[];
}

export function ServicesOffers({
  eyebrow,
  title,
  description,
  reassuranceLine,
  offers,
}: ServicesOffersProps) {
  return (
    <SectionFrame tone="light" spacing="standard">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {offers.map((offer) => (
          <article
            key={offer.slug}
            id={`service-offer-${offer.slug}`}
            className="surface-card rounded-xl p-5 md:p-6"
          >
            <figure className="relative overflow-hidden rounded-lg">
              <OptimizedImage
                src={offer.imageSrc}
                variants={getImageVariants(offer.imageSrc)}
                alt={offer.imageAlt}
                sizes="(max-width: 1024px) 100vw, 46vw"
                width={960}
                height={640}
                className="aspect-[16/10] w-full object-cover"
              />
              {(offer.featuredLabel || offer.newLabel) && (
                <span className="absolute left-3 top-3 rounded-full bg-hf-ink/80 px-3 py-1 text-micro-label text-hf-on-dark">
                  {offer.featuredLabel ?? offer.newLabel}
                </span>
              )}
            </figure>

            <div className="mt-5 space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-micro-label text-hf-accent-deep">{offer.number}</p>
                  <h3 className="text-h3 text-hf-strong">{offer.title}</h3>
                </div>
                <p className="text-h4 text-hf-strong">{offer.priceLabel}</p>
              </div>
              <p className="text-body-sm text-hf-soft">{offer.intro}</p>

              <ul className="space-y-2">
                {offer.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="text-body-sm text-hf-soft">
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href={offer.primaryCtaHref} variant="primary" size="sm">
                  {offer.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink href={offer.secondaryCtaHref} variant="ghost" size="sm">
                  {offer.secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-hf-accent/20 bg-white/65 px-5 py-4 text-body-sm text-hf-soft">
        {reassuranceLine}
      </div>
    </SectionFrame>
  );
}

