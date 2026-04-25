import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { AppShell } from "@/app/AppShell";
import { renderWithProviders } from "./test-utils";

vi.mock("@/assets/logo_hfconcept.webp", () => ({ default: "/logo.webp" }));

describe("AppShell", () => {
  it("keeps the skip link target focusable", () => {
    renderWithProviders(
      <AppShell includeToaster={false}>
        <div>Page content</div>
      </AppShell>,
    );

    expect(screen.getByRole("link", { name: /aller au contenu principal/i })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
  });
});
