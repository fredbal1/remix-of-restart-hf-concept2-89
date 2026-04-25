import {
  Check,
  ClipboardList,
  Compass,
  Eye,
  FileText,
  HardHat,
  LayoutGrid,
  Layers,
  Link2,
  Paintbrush,
  Palette,
  PenTool,
  Ruler,
  Search,
  ShoppingBag,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ServiceOffer, ServiceScopeGroup } from "@/types/services";

const DELIVERABLE_ICONS: Record<string, LucideIcon[]> = {
  conseil: [Search, Palette, LayoutGrid, FileText],
  "conception-3d": [Ruler, Eye, Layers, ShoppingBag],
  "projet-complet": [ClipboardList, PenTool, Users, HardHat],
  "projet-a-distance": [Video, Compass, Paintbrush, Link2],
};

function getScopeClasses(group: ServiceScopeGroup) {
  if (group.tone === "included") {
    return "bg-hf-surface-card ring-hf-accent/18";
  }

  if (group.tone === "optional") {
    return "bg-hf-surface-card ring-hf-border-soft/30";
  }

  return "bg-hf-surface-card ring-hf-border-soft/20";
}

export function ServiceScopeSection({
  service,
}: {
  service: Pick<ServiceOffer, "slug" | "scope" | "deliverables">;
}) {
  const icons = DELIVERABLE_ICONS[service.slug] ?? [];

  return (
    <SectionShell surface="muted" spacing="standard">
      <div className="max-w-3xl">
        <SectionIntro
          eyebrow="Périmètre"
          title="Ce que comprend la formule"
          description="Un cadrage lisible pour savoir ce qui est inclus, ce qui s'ajoute selon le besoin et ce qui relève d'un autre niveau d'accompagnement."
        />
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        {service.scope.map((group) => (
          <article
            key={group.title}
            className={`rounded-xl shadow-soft ring-1 p-6 lg:p-7 ${getScopeClasses(group)}`}
          >
            <h3 className="text-h4 text-hf-strong mb-3">{group.title}</h3>
            <p className="text-body-sm text-hf-soft mb-5">{group.intro}</p>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body-sm text-hf-soft">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-accent-deep" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 lg:mt-14 pt-10 lg:pt-12 border-t border-hf-accent/15 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-12 items-start">
        <div className="max-w-xl">
          <SectionIntro
            eyebrow="Livrables"
            title="Vos livrables, en détail"
            description="Des supports et arbitrages concrets pensés pour faire avancer le projet, pas pour ajouter du décor au dossier."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:gap-5">
          {service.deliverables.map((item, index) => {
            const Icon = icons[index] ?? Check;

            return (
              <article
                key={item}
                className="rounded-xl bg-hf-surface-card shadow-soft ring-1 ring-hf-border-soft/30 p-5 lg:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-hf-accent/12 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-hf-accent-deep" />
                  </div>
                  <div>
                    <p className="text-micro-label text-hf-accent-deep/70 mb-2">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-body text-hf-soft">{item}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
