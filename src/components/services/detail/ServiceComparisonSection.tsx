import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SERVICE_OFFERS } from "@/data/services-content";
import type { ServiceComparison } from "@/types/services";

export function ServiceComparisonSection({
  currentServiceSlug,
  comparison,
}: {
  currentServiceSlug: string;
  comparison: ServiceComparison;
}) {
  const alternativeServices = comparison.otherOptions.map((item) => {
    if (item.slug === currentServiceSlug) {
      throw new Error(
        `Service comparison for "${currentServiceSlug}" cannot reference itself`
      );
    }

    const service = SERVICE_OFFERS.find((entry) => entry.slug === item.slug);

    if (!service) {
      throw new Error(
        `Service comparison for "${currentServiceSlug}" references unknown slug "${item.slug}"`
      );
    }

    return { ...item, service };
  });

  return (
      <SectionShell surface="muted" spacing="dense">
      <div className="max-w-3xl">
        <SectionIntro
          eyebrow="Comparaison"
          title="Comparer avec les autres formules"
          description="Un repère simple pour situer cette formule par rapport aux autres niveaux d'accompagnement."
        />
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <article className="rounded-xl bg-hf-surface-card shadow-soft ring-1 ring-hf-accent/18 p-6 lg:p-7">
          <h3 className="text-h4 text-hf-strong mb-4">Idéal pour</h3>
          <ul className="space-y-3">
            {comparison.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body-sm text-hf-soft">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-accent-deep" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl bg-hf-surface-card shadow-soft ring-1 ring-hf-border-soft/30 p-6 lg:p-7">
          <h3 className="text-h4 text-hf-strong mb-4">Moins adapté si</h3>
          <ul className="space-y-3">
            {comparison.lessSuitableFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body-sm text-hf-soft">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-secondary/50" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {alternativeServices.map(({ service, reason }) => (
          <Link
            key={service.slug}
            to={service.href}
            className="group rounded-xl bg-hf-surface-card shadow-soft ring-1 ring-hf-border-soft/30 p-6 lg:p-7 transition-[transform,box-shadow] duration-fast ease-out-expo hover:-translate-y-0.5 hover:shadow-panel"
          >
            <p className="text-micro-label text-hf-accent-deep/75 mb-2">
              {service.selectorSummary}
            </p>
            <h3 className="text-h4 text-hf-strong mb-3">{service.title}</h3>
            <p className="text-body-sm text-hf-soft">{reason}</p>
            <span className="inline-flex items-center gap-1.5 text-label text-hf-accent-deep mt-5">
              Voir cette formule
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-fast ease-out-expo group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
