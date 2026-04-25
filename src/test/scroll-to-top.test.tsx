import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ScrollToTop } from "@/components/seo/ScrollToTop";

function NavigateButton({ to }: { to: string }) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>Go</button>;
}

describe("ScrollToTop", () => {
  beforeEach(() => {
    (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
  });

  it("calls scrollTo on route change", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<NavigateButton to="/other" />} />
          <Route path="/other" element={<div>Other page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Initial render triggers scrollTo
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
    (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();

    // Navigate
    await act(async () => {
      getByText("Go").click();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });
});
