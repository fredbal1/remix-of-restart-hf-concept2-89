import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "@/test/test-utils";
import ZoneIntervention from "@/pages/ZoneIntervention";

function renderZone(path = "/zones-intervention/paris") {
  return renderWithProviders(
    <Routes>
      <Route path="/zones-intervention/:slug" element={<ZoneIntervention />} />
    </Routes>,
    {
      routerProps: {
        initialEntries: [path],
      },
    }
  );
}

function getSectionByHeading(name: string) {
  const heading = screen.getByRole("heading", { name });
  const section = heading.closest("section");

  expect(section, `Missing section for heading "${name}"`).not.toBeNull();

  return section as HTMLElement;
}

describe("ZoneIntervention", () => {
  it("renders the local content blocks for a representative zone", () => {
    renderZone();

    const featuredProjectsSection = getSectionByHeading(
      "Réalisations pertinentes dans cette zone"
    );
    const featuredLinks = within(featuredProjectsSection).getAllByRole("link");

    expect(featuredLinks).toHaveLength(3);
    expect(
      within(featuredProjectsSection).getByRole("link", {
        name: /cuisine ouverte & faux-plafond courbe/i,
      })
    ).toHaveAttribute("href", "/realisations/cuisine-faux-plafond-courbe/");
    expect(
      within(featuredProjectsSection).getByRole("link", {
        name: /salle de bain grise & miroir led/i,
      })
    ).toHaveAttribute("href", "/realisations/sdb-grise-miroir-led/");
    expect(
      within(featuredProjectsSection).getByRole("link", {
        name: /couloir dressing & portes coulissantes/i,
      })
    ).toHaveAttribute(
      "href",
      "/realisations/couloir-dressing-portes-coulissantes/"
    );

    const relatedServicesSection = getSectionByHeading(
      "Services les plus adaptés"
    );

    expect(
      within(relatedServicesSection).getByRole("link", {
        name: /conception 3d \(à domicile\)/i,
      })
    ).toHaveAttribute("href", "/services/conception-3d/");
    expect(
      within(relatedServicesSection).getByRole("link", {
        name: /projet complet/i,
      })
    ).toHaveAttribute("href", "/services/projet-complet/");

    const projectTypesSection = getSectionByHeading(
      "Types de projets les plus fréquents dans cette zone"
    );
    expect(
      within(projectTypesSection).getByText("optimisation de petite surface")
    ).toBeInTheDocument();

    const localProcessSection = getSectionByHeading(
      "Comment se déroule un projet dans cette zone"
    );
    expect(
      within(localProcessSection).getByText(
        "Préparation copropriété et logistique chantier"
      )
    ).toBeInTheDocument();

    const faqSection = getSectionByHeading("FAQ locale");
    expect(
      within(faqSection).getByText(
        "Travaillez-vous sur des appartements de petite surface à Paris ?"
      )
    ).toBeInTheDocument();
  });
});
