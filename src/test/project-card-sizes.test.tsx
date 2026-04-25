import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ProjectCard } from "@/components/ui/ProjectCard";

function renderCard(variant: "hero" | "wide" | "standard") {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProjectCard
        title="Test"
        href="/test"
        imageSrc="/img/test.jpg"
        imageAlt="Test"
        variant={variant}
      />
    </MemoryRouter>,
  );
}

describe("ProjectCard sizes attribute", () => {
  it("hero variant uses 66vw sizes", () => {
    renderCard("hero");
    const img = screen.getByRole("img", { name: "Test" });
    expect(img).toHaveAttribute(
      "sizes",
      "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw",
    );
  });

  it("wide variant uses 66vw sizes", () => {
    renderCard("wide");
    const img = screen.getByRole("img", { name: "Test" });
    expect(img).toHaveAttribute(
      "sizes",
      "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw",
    );
  });

  it("standard variant uses 33vw sizes", () => {
    renderCard("standard");
    const img = screen.getByRole("img", { name: "Test" });
    expect(img).toHaveAttribute(
      "sizes",
      "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    );
  });
});
