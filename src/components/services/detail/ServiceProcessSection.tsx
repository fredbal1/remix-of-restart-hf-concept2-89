import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ServiceProcessStep } from "@/types/services";

export function ServiceProcessSection({
  steps,
}: {
  steps: readonly ServiceProcessStep[];
}) {
  return (
      <SectionShell surface="light" spacing="standard">
      <div className="max-w-3xl">
        <SectionIntro
          eyebrow="Méthode"
          title="Comment se déroule l'accompagnement"
          description="Un déroulé clair pour faire avancer le projet sans friction inutile."
        />
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-xl bg-hf-surface-card shadow-soft ring-1 ring-hf-border-soft/30 p-6 lg:p-7"
          >
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-hf-accent/12 text-hf-accent-deep text-body-sm font-medium mb-5">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-h4 text-hf-strong mb-3">{step.title}</h3>
            <p className="text-body-sm text-hf-soft">{step.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
