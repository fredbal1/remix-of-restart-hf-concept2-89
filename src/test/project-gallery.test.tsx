import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectGallery } from "@/components/sections/realisations/ProjectGallery";
import cuisineNoireChene01Orig from "@/assets/images/projects/cuisine-noire-chene-ilot/hfconcept-cuisine-noire-chene-01.webp";
import cuisineNoireChene01_640 from "@/assets/images/projects/cuisine-noire-chene-ilot/hfconcept-cuisine-noire-chene-01-640w.webp";

describe("ProjectGallery", () => {
  it("renders nothing when images is empty", () => {
    const { container } = render(
      <ProjectGallery images={[]} projectTitle="Test" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders a single image when images has 1 entry", () => {
    render(
      <ProjectGallery images={["/img1.webp"]} projectTitle="Test" />
    );
    const btn = screen.getByRole("button", { name: /ouvrir test — vue 1/i });
    expect(btn).toBeInTheDocument();
    const img = btn.querySelector("img");
    expect(img).toHaveAttribute("src", "/img1.webp");
  });

  it("renders two image buttons for 2 images (non-regression)", () => {
    render(
      <ProjectGallery images={["/a.webp", "/b.webp"]} projectTitle="Projet" />
    );
    expect(screen.getByRole("button", { name: /vue 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /vue 2/i })).toBeInTheDocument();
  });

  it("focuses the close button when the lightbox opens", () => {
    render(
      <ProjectGallery images={["/img1.webp"]} projectTitle="Test" />
    );
    const thumbBtn = screen.getByRole("button", { name: /ouvrir test — vue 1/i });
    fireEvent.click(thumbBtn);
    const closeBtn = screen.getByRole("button", { name: /fermer la galerie/i });
    expect(closeBtn).toHaveFocus();
  });

  it("restores focus to the trigger thumbnail after closing via Escape", () => {
    render(
      <ProjectGallery images={["/a.webp", "/b.webp"]} projectTitle="Projet" />
    );
    const vue1Btn = screen.getByRole("button", { name: /ouvrir projet — vue 1/i });
    fireEvent.click(vue1Btn);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(vue1Btn).toHaveFocus();
  });

  it("uses the original asset source inside the lightbox", () => {
    render(
      <ProjectGallery
        images={[cuisineNoireChene01Orig]}
        projectTitle="Cuisine"
      />
    );

    const thumbBtn = screen.getByRole("button", { name: /ouvrir cuisine — vue 1/i });
    expect(thumbBtn.querySelector("img")).toHaveAttribute("src", cuisineNoireChene01_640);

    fireEvent.click(thumbBtn);

    const lightbox = screen.getByRole("dialog", {
      name: /galerie cuisine — image 1 sur 1/i,
    });
    expect(lightbox.querySelector("img")).toHaveAttribute("src", cuisineNoireChene01Orig);
  });

  it("renders all buttons for 4+ images (non-regression)", () => {
    render(
      <ProjectGallery
        images={["/a.webp", "/b.webp", "/c.webp", "/d.webp"]}
        projectTitle="Multi"
      />
    );
    expect(screen.getByRole("button", { name: /vue 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /vue 2/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /vue 3/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /vue 4/i })).toBeInTheDocument();
  });
});
