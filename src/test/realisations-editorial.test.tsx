import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "@/test/test-utils";
import { FilterChips } from "@/components/ui/FilterChips";
import Realisations from "@/pages/Realisations";
import RealisationsCategorie from "@/pages/RealisationsCategorie";

describe("Realisations editorial SEO pass", () => {
  it("renders browse cards on /realisations without a self-link to the current page", () => {
    renderWithProviders(
      <Routes>
        <Route path="/realisations" element={<Realisations />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: ["/realisations"],
        },
      }
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Parcourir le portfolio",
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /structurer les volumes/i })).toHaveAttribute(
      "href",
      "/realisations/categorie/sejours/"
    );
    expect(screen.getByRole("link", { name: /intégrer le sur-mesure/i })).toHaveAttribute(
      "href",
      "/realisations/categorie/sur-mesure/"
    );
    expect(screen.getByRole("link", { name: /explorer les cuisines/i })).toHaveAttribute(
      "href",
      "/realisations/categorie/cuisines/"
    );

    const browseRegion = screen.getByRole("region", { name: "Parcourir le portfolio" });
    const selfLinks = within(browseRegion)
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/realisations/");

    expect(selfLinks).toHaveLength(0);
  }, 15000);

  it("renders the proof highlights block on /realisations/categorie/chambres with two distinct projects", () => {
    renderWithProviders(
      <Routes>
        <Route path="/realisations/categorie/:slug" element={<RealisationsCategorie />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: ["/realisations/categorie/chambres"],
        },
      }
    );

    const proofRegion = screen.getByRole("region", { name: "À retenir de cette sélection" });
    const proofLinks = within(proofRegion).getAllByRole("link");
    const proofHrefs = proofLinks.map((link) => link.getAttribute("href"));

    expect(proofLinks).toHaveLength(2);
    expect(new Set(proofHrefs).size).toBe(2);
    expect(
      proofHrefs.every((href) =>
        href === "/realisations/chambre-sur-mesure-combles/" ||
        href === "/realisations/chambre-ado-bureau-integre/"
      )
    ).toBe(true);

    expect(screen.getAllByText("Chambre sur mesure sous combles").length).toBeGreaterThanOrEqual(1);
  });

  it("keeps filter chips mobile-safe by wrapping instead of forcing horizontal overflow", () => {
    const { container } = renderWithProviders(
      <FilterChips
        options={["Tous", "Salle de bain", "Sur mesure"]}
        value="Tous"
        onChange={() => {}}
      />
    );

    const fieldset = container.querySelector("fieldset");
    expect(fieldset).not.toBeNull();
    expect(fieldset).toHaveClass("flex-wrap");
    expect(fieldset).not.toHaveClass("overflow-x-auto");
  });
});
