import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_CONFIG } from "@/data/site-config";

function renderFooter() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SiteFooter />
    </MemoryRouter>
  );
}

describe("SiteFooter", () => {
  it("renders the logo", () => {
    renderFooter();
    const logo = screen.getByAltText(SITE_CONFIG.name);
    expect(logo).toBeInTheDocument();
  });

  it("displays current year in copyright", () => {
    renderFooter();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders legal links", () => {
    renderFooter();
    expect(screen.getByText("Mentions légales")).toBeInTheDocument();
    expect(screen.getByText("Confidentialité")).toBeInTheDocument();
  });

  it("renders social links with noopener noreferrer", () => {
    renderFooter();
    const igLink = screen.getByLabelText("Instagram");
    expect(igLink).toHaveAttribute("target", "_blank");
    expect(igLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders navigation and services sections", () => {
    renderFooter();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getAllByText("Services").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Suivre")).toBeInTheDocument();
  });
});
