import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { act } from "react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "@/app/AppShell";
import { AppRoutes } from "@/app/AppRoutes";

const ROUTER_FUTURE = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;

/**
 * Renders the real app tree via SSR, injects it into the DOM,
 * then hydrates on the client side — asserting zero mismatches.
 */
async function assertHydrationParity(url: string) {
  // 1. Server render
  const ssrHtml = renderToString(
    <HelmetProvider context={{}}>
      <StaticRouter location={url} future={ROUTER_FUTURE}>
        <AppShell includeToaster={false} includeScrollToTop={false}>
          <AppRoutes />
        </AppShell>
      </StaticRouter>
    </HelmetProvider>,
  );

  // 2. Inject into DOM
  const container = document.createElement("div");
  container.id = "root";
  container.dataset.serverRendered = "true";
  container.innerHTML = ssrHtml;
  document.body.appendChild(container);

  // 3. Spy on console noise
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  try {
    const recoverableErrors: unknown[] = [];

    // 4. Hydrate inside act() — client uses includeScrollToTop=true (real path)
    let root: ReturnType<typeof hydrateRoot> | undefined;

    await act(async () => {
      root = hydrateRoot(
        container,
        <HelmetProvider>
          <MemoryRouter initialEntries={[url]} future={ROUTER_FUTURE}>
            <AppShell includeToaster={false} includeScrollToTop={true}>
              <AppRoutes />
            </AppShell>
          </MemoryRouter>
        </HelmetProvider>,
        {
          onRecoverableError(err) {
            recoverableErrors.push(err);
          },
        },
      );
    });

    // 5. Assert no noise
    expect(recoverableErrors).toEqual([]);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();

    // 6. Cleanup
    await act(async () => {
      root!.unmount();
    });
    container.remove();
  } finally {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  }
}

describe("SSR → hydrate parity (real app tree)", () => {
  it("hydrates '/' without mismatch or console noise", async () => {
    await assertHydrationParity("/");
  }, 15000);

  it("hydrates '/services/conseil' without mismatch or console noise", async () => {
    await assertHydrationParity("/services/conseil");
  });
});
