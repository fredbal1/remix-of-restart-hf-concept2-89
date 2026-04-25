import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";

import Index from "@/pages/Index";
import Services from "@/pages/Services";
import Realisations from "@/pages/Realisations";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<div>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/realisations" element={<Realisations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe("Route rendering", () => {
  it("renders home page at /", async () => {
    renderRoute("/");
    expect(
      await screen.findByRole(
        "heading",
        { name: /transformons vos espaces/i },
        { timeout: 10000 }
      )
    ).toBeInTheDocument();
  }, 10000);

  it("renders services page at /services", async () => {
    renderRoute("/services");
    await waitFor(() => {
      // Page hero title is "Nos formules sur mesure"
      expect(screen.getAllByText(/nos formules sur mesure/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders realisations page at /realisations", async () => {
    renderRoute("/realisations");
    await waitFor(() => {
      expect(screen.getAllByText(/nos réalisations/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders contact page at /contact", async () => {
    renderRoute("/contact");
    await waitFor(() => {
      expect(screen.getAllByText(/parlons de/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders 404 for unknown routes", async () => {
    renderRoute("/xyz-unknown");
    await waitFor(() => {
      expect(screen.getByText(/page introuvable/i)).toBeInTheDocument();
    });
  });
});
