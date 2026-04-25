import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import userEvent from "@testing-library/user-event";

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

function ThrowingPage(): JSX.Element {
  throw new Error("Route crash");
}

function SafePage() {
  return <div>Safe page</div>;
}

function NavButton({ to }: { to: string }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)}>
      Go to {to}
    </button>
  );
}

describe("RouteErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("recovers from error when route changes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/crash"]} future={routerFuture}>
        <NavButton to="/safe" />
        <RouteErrorBoundary>
          <Routes>
            <Route path="/crash" element={<ThrowingPage />} />
            <Route path="/safe" element={<SafePage />} />
          </Routes>
        </RouteErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /go to \/safe/i }));

    expect(screen.getByText("Safe page")).toBeInTheDocument();
  });
});
