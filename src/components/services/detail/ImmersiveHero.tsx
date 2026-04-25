import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { getImageVariants } from "@/data/image-variants";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SERVICE_OFFERS } from "@/data/services-content";

const HERO_PANEL_MIN_H = "min-h-[55vh] lg:min-h-[70vh]";

export function ImmersiveHero({
  service,
  isOnQuote,
}: {
  service: (typeof SERVICE_OFFERS)[0];
  isOnQuote: boolean;
}) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className={cn("grid grid-cols-1 lg:grid-cols-[5fr_7fr]", HERO_PANEL_MIN_H)}>
        <div className="surface-dark relative z-10 flex flex-col justify-end px-5 sm:px-8 lg:px-12 xl:px-16 pt-36 pb-12 lg:pb-16">
          <div className="relative z-10 max-w-lg">
            <div className="relative pl-5 mb-5">
              <div className="absolute inset-y-0 left-0 w-px bg-hf-accent/55" aria-hidden="true" />
              <span className="text-eyebrow text-hf-accent inline-block">Formule {service.number}</span>
            </div>
            <h1 className="text-h1 text-hf-on-dark mb-5">{service.title}</h1>
            <p className="text-body-lead text-hf-on-dark-soft reading-width mb-6">{service.subtitle}</p>
            <div className="flex flex-wrap items-baseline gap-3 mb-8">
              {isOnQuote ? (
                <span className="inline-block text-label bg-hf-accent/15 text-hf-accent px-4 py-1.5 rounded-full">{service.price}</span>
              ) : (
                <span className="text-h2 text-hf-accent">{service.price}</span>
              )}
              {service.priceNote && <span className="text-body-sm text-hf-on-dark-soft">{service.priceNote}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href={`/contact/?need=${encodeURIComponent(service.slug)}`} variant="primary">
                Choisir cette formule
              </ButtonLink>
              <Link to="/services/" className="inline-flex items-center gap-2 text-body-sm text-hf-on-dark-soft hover:text-hf-accent transition-colors focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2">
                <ArrowLeft className="w-4 h-4" />Toutes les formules
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-[35vh] lg:h-auto order-last lg:order-none">
          <OptimizedImage src={service.heroImage} variants={getImageVariants(service.heroImage)} alt={`${service.title} — HFconcept`} priority sizes="(max-width: 1024px) 100vw, 58vw" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-hf-ink to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-hf-ink/40 to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}

