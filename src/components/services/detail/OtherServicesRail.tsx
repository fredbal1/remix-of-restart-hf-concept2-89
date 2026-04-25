import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { getImageVariants } from "@/data/image-variants";
import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SERVICE_OFFERS } from "@/data/services-content";

const OtherServiceCard = forwardRef<HTMLAnchorElement, { service: (typeof SERVICE_OFFERS)[0] }>(
  function OtherServiceCard({ service }, ref) {
    return (
      <Link ref={ref} to={service.href} className="group block focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2 rounded-lg">
        <div className={cn(
          "bg-hf-surface-card shadow-soft rounded-lg overflow-hidden ring-1 ring-hf-border-soft/30",
          "group-hover:shadow-panel transition-[box-shadow] duration-fast ease-out-expo"
        )}>
          <div className="relative aspect-[16/9] overflow-hidden">
            <OptimizedImage src={service.heroImage} variants={getImageVariants(service.heroImage)} alt={`${service.title} — HFconcept`} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-medium ease-out-expo" />
            <div className="absolute inset-0 bg-gradient-to-t from-hf-ink/30 to-transparent" />
            <span className="absolute bottom-3 left-4 text-body-lg text-hf-on-dark/80">{service.number}</span>
          </div>
          <div className="p-5 lg:p-6">
            <h3 className="text-h4 text-hf-strong mb-2 group-hover:text-hf-accent-deep transition-colors">{service.title}</h3>
            <p className="text-body-sm text-hf-secondary line-clamp-2 mb-4">{service.subtitle}</p>
            <span className="inline-flex items-center gap-1.5 text-label text-hf-accent-deep">
              Découvrir <ArrowRight className="w-3.5 h-3.5 transition-transform duration-fast ease-out-expo group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  },
);

export function OtherServicesRail({ currentSlug }: { currentSlug: string }) {
  const others = SERVICE_OFFERS.filter((s) => s.slug !== currentSlug);
  return (
      <SectionShell surface="muted" spacing="dense">
      <div className="flex justify-center mb-12">
        <span className="h-px w-24 bg-hf-accent/40" aria-hidden="true" />
      </div>
      <div className="mb-10">
        <SectionIntro
          eyebrow="Découvrez aussi"
          title="Nos autres formules"
          description="Chaque projet est unique — explorez l'offre qui correspond à vos besoins."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {others.map((s) => (
          <OtherServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </SectionShell>
  );
}
