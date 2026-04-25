import { describe, it, expect, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { renderWithProviders } from "./test-utils";

// Mock the logo import
vi.mock("@/assets/logo_hfconcept.webp", () => ({ default: "/logo.webp" }));

describe("SiteHeader", () => {
  it("renders logo with correct alt text", () => {
    renderWithProviders(<SiteHeader />);
    const logos = screen.getAllByAltText("HFconcept");
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it("has mobile menu closed by default", () => {
    renderWithProviders(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens mobile menu on trigger click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: /ouvrir le menu/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", "site-mobile-menu");
    expect(screen.getByRole("dialog", { name: /menu de navigation/i })).toHaveAttribute("id", "site-mobile-menu");
  });

  it("shows close button when mobile menu is open", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));

    // Both the trigger (now showing X) and the close button in the panel exist
    const closeButtons = screen.getAllByRole("button", { name: /fermer le menu/i });
    expect(closeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("closes mobile menu on Escape", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
    expect(screen.getByRole("dialog", { name: /menu de navigation/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    const trigger = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile menu on backdrop click", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));

    const backdrop = container.querySelector(".header-backdrop-transition");
    expect(backdrop).toBeTruthy();
    await user.click(backdrop as HTMLElement);

    const trigger = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile menu when the contact CTA is activated", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
    const mobileCta = screen.getAllByRole("link", { name: /parler de votre projet/i })[1];

    await user.click(mobileCta);

    expect(screen.getByRole("button", { name: /ouvrir le menu/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("marks active link with aria-current='page'", () => {
    renderWithProviders(<SiteHeader />, {
      routerProps: { initialEntries: ["/services/"] },
    });

    // Desktop nav is the first one
    const navs = screen.getAllByRole("navigation", { name: /navigation principale/i });
    const desktopNav = navs[0];
    const activeLink = within(desktopNav).getByText("Services");
    expect(activeLink.closest("a")).toHaveAttribute("aria-current", "page");
  });

  it("CTA points to /contact", () => {
    renderWithProviders(<SiteHeader />);
    // Multiple CTAs (desktop + mobile), check the first
    const ctas = screen.getAllByRole("link", { name: /parler de votre projet/i });
    expect(ctas[0]).toHaveAttribute("href", "/contact/");
  });
});
