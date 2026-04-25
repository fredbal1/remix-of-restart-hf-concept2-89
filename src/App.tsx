import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "@/app/AppRoutes";
import { AppShell } from "@/app/AppShell";
import "./App.css";

/** Shared future flags — keep aligned with entry-server.tsx */
const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true } as const;

const App = () => (
  <HelmetProvider>
    <BrowserRouter future={ROUTER_FUTURE}>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
