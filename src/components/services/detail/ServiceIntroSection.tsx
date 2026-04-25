import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ServiceOffer } from "@/types/services";

export function ServiceIntroSection({ service }: { service: ServiceOffer }) {
  return (
      <SectionShell surface="muted" spacing="dense">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-10 lg:gap-12 items-start">
        <div className="max-w-3xl">
          <SectionIntro
            eyebrow="Intro éditoriale"
            title={service.detailIntroTitle}
          />
          <div className="mt-6 lg:mt-7 space-y-5">
            {service.detailIntro.map((paragraph) => (
              <p key={paragraph} className="text-body text-hf-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="rounded-xl bg-hf-surface-card shadow-panel ring-1 ring-hf-accent/20 p-7 lg:p-8">
          <div>
            <p className="text-eyebrow text-hf-accent-deep mb-3">
              Positionnement
            </p>
            <p className="text-body text-hf-soft">
              {service.card.positioningNote}
            </p>
          </div>

          <div className="mt-7 pt-7 border-t border-hf-accent/15">
            <p className="text-eyebrow text-hf-accent-deep mb-3">
              Disponibilité
            </p>
            <p className="text-body-sm text-hf-soft">
              {service.availabilityNote}
            </p>
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
