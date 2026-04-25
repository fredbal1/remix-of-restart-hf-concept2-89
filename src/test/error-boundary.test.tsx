import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

function ThrowingChild(): JSX.Element {
  throw new Error("Test explosion");
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders fallback error page when child throws", () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
    expect(
      screen.getByText(/vous pouvez réessayer ou revenir à l'accueil/i)
    ).toBeInTheDocument();
  });

  it("shows 'Retour à l'accueil' link", () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /retour à l'accueil/i })).toHaveAttribute("href", "/");
  });

  it("shows 'Réessayer' button", () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /réessayer/i })).toBeInTheDocument();
  });

  it("shows 'Rafraîchir la page' button", () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary>
          <ThrowingChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /rafraîchir la page/i })).toBeInTheDocument();
  });

  it("renders children normally when no error", () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary>
          <div>OK content</div>
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("OK content")).toBeInTheDocument();
  });

  it("resets when resetKey changes", () => {
    let throwError = true;

    function MaybeThrow() {
      if (throwError) throw new Error("boom");
      return <div>Recovered</div>;
    }

    const { rerender } = render(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary resetKey="/page-a">
          <MaybeThrow />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();

    throwError = false;

    rerender(
      <MemoryRouter future={routerFuture}>
        <ErrorBoundary resetKey="/page-b">
          <MaybeThrow />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
