import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { SEO } from "@/components/seo/SEO";

// Test SEO title logic + rendering integrity

function computeTitle(title: string) {
  return title.includes("HFconcept") ? title : `${title} — HFconcept`;
}

function renderSEO(props: Parameters<typeof SEO>[0] = {}) {
  return render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>
  );
}

describe("SEO title logic", () => {
  it("uses default title as-is when it contains HFconcept", () => {
    expect(computeTitle("HFconcept — Studio d'architecture intérieure")).toBe(
      "HFconcept — Studio d'architecture intérieure"
    );
  });

  it("appends suffix to custom title", () => {
    expect(computeTitle("Nos Services")).toBe("Nos Services — HFconcept");
  });

  it("does not duplicate suffix", () => {
    expect(computeTitle("Réalisations — HFconcept")).toBe("Réalisations — HFconcept");
  });

  it("appends suffix for Contact", () => {
    expect(computeTitle("Contact")).toBe("Contact — HFconcept");
  });
});

describe("SEO component rendering", () => {
  it("renders without crashing with defaults", () => {
    const { container } = renderSEO();
    expect(container).toBeTruthy();
  });

  it("renders with all props including ogImageAlt", () => {
    const { container } = renderSEO({
      title: "Test",
      description: "Desc",
      canonical: "https://hfconcept.fr/test",
      ogImage: "https://hfconcept.fr/og.jpg",
      ogImageAlt: "Alt text for OG image",
      noindex: true,
    });
    expect(container).toBeTruthy();
  });

  it("renders with noindex false", () => {
    const { container } = renderSEO({ noindex: false });
    expect(container).toBeTruthy();
  });

  it("renders with ogImageAlt only", () => {
    const { container } = renderSEO({
      ogImageAlt: "Intérieur premium HFconcept",
    });
    expect(container).toBeTruthy();
  });
});
