import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "@/test/test-utils";
import RealisationDetail from "@/pages/RealisationDetail";
import { PROJECTS } from "@/data/projects";

function renderDetail(path: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/realisations/:slug" element={<RealisationDetail />} />
    </Routes>,
    {
      routerProps: {
        initialEntries: [path],
      },
    }
  );
}

describe("RealisationDetail standard landing pages", () => {
  it("renders the key choices block on a standard project detail page", () => {
    renderDetail("/realisations/sejour-veranda-contemporain");

    expect(
      screen.getByRole("heading", { name: "Choix clés du projet" })
    ).toBeInTheDocument();
  });

  it("renders related service and category links with the expected hrefs", () => {
    renderDetail("/realisations/sejour-veranda-contemporain");

    const serviceLinks = screen.getAllByRole("link", { name: /projet complet/i });
    const categoryLinks = screen.getAllByRole("link", {
      name: /voir les séjours sur mesure/i,
    });

    expect(
      serviceLinks.some((link) => link.getAttribute("href") === "/services/projet-complet/")
    ).toBe(true);
    expect(
      categoryLinks.some(
        (link) => link.getAttribute("href") === "/realisations/categorie/sejours/"
      )
    ).toBe(true);
    expect(
      screen.getByRole("link", { name: /toutes les réalisations/i })
    ).toHaveAttribute("href", "/realisations/");
  });

  it("renders the client-fit block on a standard project detail page", () => {
    renderDetail("/realisations/sejour-veranda-contemporain");

    expect(
      screen.getByRole("heading", { name: "Pour quel type de projet" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("pour un séjour prolongé par une véranda très vitrée")
    ).toBeInTheDocument();
  });

  it("keeps a single 'Le projet en bref' intro label and surfaces the highlight in the story lead", () => {
    renderDetail("/realisations/sejour-veranda-contemporain");

    expect(screen.getAllByText("Le projet en bref")).toHaveLength(1);
    expect(screen.getByText("Point fort")).toBeInTheDocument();
    expect(
      screen.getAllByText("Ouverture du séjour sur la véranda avec lumière naturelle à 270°")
    ).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Fiche projet" })
    ).toBeInTheDocument();
  });

  it("keeps a representative subset of enriched standard projects data-complete", () => {
    const representativeSlugs = [
      "sejour-veranda-contemporain",
      "cuisine-faux-plafond-courbe",
      "sdb-noire-combles",
      "chambre-sur-mesure-combles",
      "bibliotheque-vitrine-retro-eclairee",
    ] as const;

    for (const slug of representativeSlugs) {
      const project = PROJECTS.find((entry) => entry.slug === slug);

      expect(project).toBeDefined();
      expect(project?.projectContext).toBeTruthy();
      expect(project?.projectType).toBeTruthy();
      expect(project?.relatedService?.href).toMatch(/^\/services\//);
      expect(project?.relatedCategory?.href).toMatch(/^\/realisations\/categorie\//);
      expect(project?.keyChoices?.length).toBeGreaterThanOrEqual(3);
      expect(project?.keyChoices?.length).toBeLessThanOrEqual(5);
      expect(project?.clientFit?.length).toBeGreaterThanOrEqual(3);
      expect(project?.clientFit?.length).toBeLessThanOrEqual(5);
      expect(project?.needPoints?.length).toBeGreaterThan(0);
      expect(project?.constraintPoints?.length).toBeGreaterThan(0);
      expect(project?.solutionPoints?.length).toBeGreaterThan(0);
      expect(project?.resultPoints?.length).toBeGreaterThan(0);
    }
  });
});
