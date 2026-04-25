import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ServiceFaqItem } from "@/types/services";

export function ServiceFaqSection({
  items,
}: {
  items: readonly ServiceFaqItem[];
}) {
  return (
      <SectionShell surface="light" spacing="standard">
      <div className="max-w-3xl mx-auto text-center">
        <SectionIntro
          eyebrow="Questions fréquentes"
          title="FAQ"
          description="Quatre réponses nettes pour cadrer la formule avant de vous engager."
          align="center"
        />
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl bg-hf-surface-card shadow-soft ring-1 ring-hf-border-soft/30 p-6 lg:p-7"
          >
            <h3 className="text-h4 text-hf-strong mb-3">{item.question}</h3>
            <p className="text-body-sm text-hf-soft">{item.answer}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
