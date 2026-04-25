import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { OptimizedImage } from "@/components/common/OptimizedImage";

describe("OptimizedImage", () => {
  const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("renders a simple img with src and default attributes", () => {
    render(<OptimizedImage src="/img/photo.jpg" alt="A photo" />);
    const img = screen.getByRole("img", { name: "A photo" });
    expect(img).toHaveAttribute("src", "/img/photo.jpg");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
    expect(img).not.toHaveAttribute("srcset");
    expect(img).not.toHaveAttribute("fetchpriority");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("sets loading=eager when priority is true and does not emit fetchpriority", () => {
    render(<OptimizedImage src="/img/hero.jpg" alt="Hero" priority />);
    const img = screen.getByRole("img", { name: "Hero" });
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).not.toHaveAttribute("fetchpriority");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("builds a sorted, deduplicated srcSet from variants", () => {
    const variants = [
      { src: "/img/photo-1200.jpg", width: 1200 },
      { src: "/img/photo-400.jpg", width: 400 },
      { src: "/img/photo-800.jpg", width: 800 },
      { src: "/img/photo-400-dup.jpg", width: 400 },
    ];
    render(
      <OptimizedImage
        alt="Responsive"
        variants={variants}
        sizes="(max-width: 768px) 100vw, 50vw"
      />,
    );
    const img = screen.getByRole("img", { name: "Responsive" });

    expect(img).toHaveAttribute(
      "srcset",
      "/img/photo-400.jpg 400w, /img/photo-800.jpg 800w, /img/photo-1200.jpg 1200w",
    );
    expect(img).toHaveAttribute("src", "/img/photo-400.jpg");
    expect(img).toHaveAttribute("sizes", "(max-width: 768px) 100vw, 50vw");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("uses the smallest valid variant as rendered src when explicit src and variants are both provided", () => {
    const variants = [
      { src: "/img/photo-800.jpg", width: 800 },
      { src: "/img/photo-400.jpg", width: 400 },
    ];
    render(
      <OptimizedImage
        src="/img/custom-fallback.jpg"
        alt="With explicit src"
        variants={variants}
      />,
    );
    const img = screen.getByRole("img", { name: "With explicit src" });
    expect(img).toHaveAttribute("src", "/img/photo-400.jpg");
    expect(img).not.toHaveAttribute("src", "/img/custom-fallback.jpg");
    expect(img).toHaveAttribute("srcset", "/img/photo-400.jpg 400w, /img/photo-800.jpg 800w");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("falls back to explicit src when variants has no valid entries", () => {
    render(
      <OptimizedImage
        src="/img/custom-fallback.jpg"
        alt="Fallback only"
        variants={[
          { src: "", width: 400 },
          { src: "/img/invalid-width.jpg", width: 0 },
        ]}
      />,
    );
    const img = screen.getByRole("img", { name: "Fallback only" });
    expect(img).toHaveAttribute("src", "/img/custom-fallback.jpg");
    expect(img).not.toHaveAttribute("srcset");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders without srcSet when variants is empty", () => {
    render(<OptimizedImage src="/img/solo.jpg" alt="Solo" variants={[]} />);
    const img = screen.getByRole("img", { name: "Solo" });
    expect(img).toHaveAttribute("src", "/img/solo.jpg");
    expect(img).not.toHaveAttribute("srcset");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders nothing when both src and variants are absent", () => {
    const { container } = render(<OptimizedImage alt="Ghost" />);
    expect(container.querySelector("img")).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("renders nothing when variants has no valid entries and src is absent", () => {
    const { container } = render(
      <OptimizedImage alt="Invalid" variants={[{ src: "", width: 0 }]} />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
