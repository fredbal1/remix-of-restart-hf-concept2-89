import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "@/test/test-utils";
import ServiceDetail from "@/pages/ServiceDetail";

function renderServiceDetail(path: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/services/:slug" element={<ServiceDetail />} />
    </Routes>,
    {
      routerProps: {
        initialEntries: [path],
      },
    }
  );
}

describe("ServiceDetail", () => {
  it("renders the enriched conseil landing page structure", () => {
    renderServiceDetail("/services/conseil");

    expect(
      screen.getByRole("heading", { name: "Conseil", level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Quand choisir cette formule" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Comment se déroule l'accompagnement" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Réalisations liées" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "FAQ" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Nos autres formules" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Voyons si cette formule est la bonne pour vous.",
      })
    ).toBeInTheDocument();

    const relatedProjectsSection = screen
      .getByRole("heading", { name: "Réalisations liées" })
      .closest("section");

    expect(relatedProjectsSection).not.toBeNull();

    const relatedProjectLinks = within(relatedProjectsSection!).getAllByRole("link");

    expect(relatedProjectLinks).toHaveLength(3);

    for (const link of relatedProjectLinks) {
      expect(link.getAttribute("href")).toMatch(/^\/realisations\//);
    }
  }, 15000);
});
