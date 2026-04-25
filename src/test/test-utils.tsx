import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { ReactElement } from "react";

interface WrapperOptions {
  routerProps?: MemoryRouterProps;
}

function createWrapper({ routerProps }: WrapperOptions = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <HelmetProvider>
        <MemoryRouter {...routerProps} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</MemoryRouter>
      </HelmetProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { routerProps?: MemoryRouterProps }
) {
  const { routerProps, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ routerProps }),
    ...renderOptions,
  });
}
