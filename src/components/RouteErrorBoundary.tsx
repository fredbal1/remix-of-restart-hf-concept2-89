import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

export function RouteErrorBoundary({ children }: RouteErrorBoundaryProps) {
  const location = useLocation();
  const resetKey = `${location.pathname}${location.search}${location.hash}`;

  return <ErrorBoundary resetKey={resetKey}>{children}</ErrorBoundary>;
}
