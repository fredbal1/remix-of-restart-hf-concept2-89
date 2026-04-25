// ---------------------------------------------------------------------------
// Project types — HFconcept réalisations
// ---------------------------------------------------------------------------

export type ProjectCategory = "Tous" | "Séjour" | "Salle de bain" | "Chambre" | "Cuisine" | "Sur mesure";

export type EditorialSize = "hero" | "tall" | "wide" | "standard" | "standardSquare";

export type ProjectDestination = "modal" | "detail";

export interface ProjectDetailLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  description?: string;
  projectContext?: string;
  projectType?: string;
  location?: string;
  highlight?: string;
  categories: ProjectCategory[];
  clientFit?: string[];
  keyChoices?: string[];
  relatedService?: ProjectDetailLink;
  relatedCategory?: ProjectDetailLink;
  cover: string;
  images: string[];
  isFeatured?: boolean;
  editorialSize?: EditorialSize;
  editorialOrder?: number;
  futureDestination?: ProjectDestination;
  needPoints?: string[];
  constraintPoints?: string[];
  solutionPoints?: string[];
  galleryIntro?: string;
  resultPoints?: string[];
}

export type ProjectContent = Omit<Project, "slug">;
