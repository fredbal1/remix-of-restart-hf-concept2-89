import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ServiceUseCase } from "@/types/services";

export function ServiceUseCasesSection({
  items,
}: {
  items: readonly ServiceUseCase[];
}) {
  return (
      <SectionShell surface="dark" spacing="standard">
      <div className="max-w-3xl mx-auto text-center">
        <SectionIntro
          eyebrow="Décision"
          title="Quand choisir cette formule"
          description="Des situations concrètes où cette formule apporte le bon niveau d'accompagnement."
          align="center"
          inverted
        />
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7"
          >
            <p className="text-micro-label text-hf-accent/80 mb-3">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-h4 text-hf-on-dark mb-3">{item.title}</h3>
            <p className="text-body-sm text-hf-on-dark-soft">{item.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
