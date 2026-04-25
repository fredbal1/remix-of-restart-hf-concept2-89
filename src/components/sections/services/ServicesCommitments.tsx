import { SectionFrame } from "@/components/layout/SectionFrame";
import { SectionIntro } from "@/components/ui/SectionIntro";

const ENGAGEMENTS = [
  {
    number: "01",
    title: "Écoute attentive",
    description:
      "Nous prenons le temps de comprendre votre lieu, vos usages, vos contraintes et vos envies.",
  },
  {
    number: "02",
    title: "Réponse sur mesure",
    description:
      "Chaque proposition est pensée pour votre mode de vie, votre budget et la réalité de votre espace.",
  },
  {
    number: "03",
    title: "Échanges réguliers",
    description:
      "Le projet avance avec des points clairs, des validations simples et un dialogue fluide à chaque étape.",
  },
  {
    number: "04",
    title: "Livrables structurés",
    description:
      "Documents, visuels et éléments de travail sont remis de façon claire, selon la formule choisie.",
  },
  {
    number: "05",
    title: "Méthode transparente",
    description:
      "Vous avancez avec une vision lisible du projet, des choix expliqués et un cadre de travail rigoureux.",
  },
] as const;

export function ServicesCommitments() {
  return (
    <SectionFrame tone="dark" spacing="standard">
      <SectionIntro
        eyebrow="Notre engagement"
        title={"La même exigence,\nquelle que soit la formule"}
        description="Une méthode lisible, attentive et rigoureuse."
        inverted
      />

      <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ENGAGEMENTS.map((item) => (
          <li key={item.number} className="surface-panel-dark rounded-xl p-6">
            <p className="text-micro-label text-hf-accent">{item.number}</p>
            <h3 className="mt-2 text-h4 text-hf-on-dark">{item.title}</h3>
            <p className="mt-3 text-body-sm text-hf-on-dark-soft">{item.description}</p>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
