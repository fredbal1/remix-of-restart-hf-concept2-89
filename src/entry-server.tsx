import { renderToString } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "@/app/AppShell";
import { routeDefinitions } from "@/app/routeDefinitions";

/** Shared future flags — keep aligned with App.tsx */
const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true } as const;

/* ------------------------------------------------------------------ */
/*  All pages resolved eagerly for SSR — no lazy, no static imports    */
/* ------------------------------------------------------------------ */

const eagerModules = import.meta.glob<{ default: React.ComponentType }>(
  "/src/pages/*.tsx",
  { eager: true },
);

interface HelmetContextValue {
  helmet?: HelmetServerState;
}

interface PrerenderedPage {
  appHtml: string;
  headTags: string;
}

export function render(url: string): PrerenderedPage {
  const helmetContext: HelmetContextValue = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} future={ROUTER_FUTURE}>
        <AppShell includeToaster={false} includeScrollToTop={false}>
          <Routes>
            {routeDefinitions.map((def) => {
              const mod = eagerModules[def.modulePath];
              if (!mod) {
                throw new Error(
                  `Unable to resolve route module for path "${def.path}" (modulePath: "${def.modulePath}")`,
                );
              }
              const Component = mod.default;
              return (
                <Route
                  key={def.path}
                  path={def.path}
                  element={<Component />}
                />
              );
            })}
          </Routes>
        </AppShell>
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  if (!helmet) {
    throw new Error(`Helmet state missing while rendering "${url}"`);
  }

  const headTags = [
    helmet.title.toString(),
    helmet.priority?.toString() ?? "",
    helmet.base.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
    helmet.style.toString(),
    helmet.noscript.toString(),
  ]
    .filter(Boolean)
    .join("\n");

  return { appHtml, headTags };
}
