import { type ReactNode, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { ScrollToTop } from "@/components/seo/ScrollToTop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollToTopButton } from "@/components/common/ScrollToTopButton";

interface AppShellProps {
  children: ReactNode;
  includeToaster?: boolean;
  includeScrollToTop?: boolean;
}

export function AppShell({
  children,
  includeToaster = true,
  includeScrollToTop = true,
}: AppShellProps) {
  // Defer Toaster mount to after hydration to avoid SSR/client mismatch
  // (SSR renders without Toaster, so client must match on first render)
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    if (includeToaster) {
      setShowToaster(true);
    }
  }, [includeToaster]);

  return (
    <ErrorBoundary>
      <div className="app-shell">
        {showToaster && <Toaster />}
        {includeScrollToTop && <ScrollToTop />}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <SiteHeader />
        <RouteErrorBoundary>
          <main id="main-content" className="app-shell__main" tabIndex={-1}>
            {children}
          </main>
        </RouteErrorBoundary>
        <SiteFooter />
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
}
