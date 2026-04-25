import { Route, Routes } from "react-router-dom";
import { routeDefinitions } from "@/app/routeDefinitions";

/* ------------------------------------------------------------------ */
/*  All pages loaded eagerly — no lazy/Suspense.                       */
/*  This ensures the client tree matches entry-server.tsx exactly,     */
/*  preventing hydration mismatch (#418 / #423).                       */
/* ------------------------------------------------------------------ */

const eagerModules = import.meta.glob<{ default: React.ComponentType }>(
  "/src/pages/*.tsx",
  { eager: true },
);

export function AppRoutes() {
  return (
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
          <Route key={def.path} path={def.path} element={<Component />} />
        );
      })}
    </Routes>
  );
}
