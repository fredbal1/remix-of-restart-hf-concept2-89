import { routePaths } from "@/app/routePaths";

export interface RouteDefinition {
  path: string;
  modulePath: string;
}

export const routeDefinitions: RouteDefinition[] = [
  { path: routePaths.home, modulePath: "/src/pages/Index.tsx" },
  { path: routePaths.realisations, modulePath: "/src/pages/Realisations.tsx" },
  { path: routePaths.realisationsCategorie, modulePath: "/src/pages/RealisationsCategorie.tsx" },
  { path: routePaths.services, modulePath: "/src/pages/Services.tsx" },
  { path: routePaths.realisationDetail, modulePath: "/src/pages/RealisationDetail.tsx" },
  { path: routePaths.serviceDetail, modulePath: "/src/pages/ServiceDetail.tsx" },
  { path: routePaths.studio, modulePath: "/src/pages/Studio.tsx" },
  { path: routePaths.contact, modulePath: "/src/pages/Contact.tsx" },
  { path: routePaths.zoneIntervention, modulePath: "/src/pages/ZoneIntervention.tsx" },
  { path: routePaths.merci, modulePath: "/src/pages/Merci.tsx" },
  { path: routePaths.mentionsLegales, modulePath: "/src/pages/MentionsLegales.tsx" },
  { path: routePaths.politiqueConfidentialite, modulePath: "/src/pages/PolitiqueConfidentialite.tsx" },
  { path: routePaths.error500, modulePath: "/src/pages/Error500.tsx" },
  { path: routePaths.error404, modulePath: "/src/pages/NotFound.tsx" },
  { path: routePaths.wildcard, modulePath: "/src/pages/NotFound.tsx" },
];
