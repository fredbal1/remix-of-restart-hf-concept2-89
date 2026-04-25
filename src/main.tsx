import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const PRELOAD_RELOAD_GUARD_KEY = "vite:preload-reload";
const PRELOAD_RELOAD_COOLDOWN_MS = 10_000;
const PRELOAD_RELOAD_RESET_DELAY_MS = 5_000;

interface PreloadReloadGuard {
  target: string;
  timestamp: number;
}

function getCurrentTarget() {
  const { pathname, search, hash } = window.location;
  return `${pathname}${search}${hash}`;
}

function isPreloadReloadGuard(value: unknown): value is PreloadReloadGuard {
  return (
    typeof value === "object" &&
    value !== null &&
    "target" in value &&
    typeof value.target === "string" &&
    "timestamp" in value &&
    typeof value.timestamp === "number"
  );
}

function readPreloadReloadGuard() {
  const storedGuard = window.sessionStorage.getItem(PRELOAD_RELOAD_GUARD_KEY);
  if (!storedGuard) {
    return null;
  }

  try {
    const parsedGuard: unknown = JSON.parse(storedGuard);
    if (isPreloadReloadGuard(parsedGuard)) {
      return parsedGuard;
    }
  } catch {
    // Ignore malformed storage values and reset to a known-good state.
  }

  window.sessionStorage.removeItem(PRELOAD_RELOAD_GUARD_KEY);
  return null;
}

function writePreloadReloadGuard(guard: PreloadReloadGuard) {
  window.sessionStorage.setItem(
    PRELOAD_RELOAD_GUARD_KEY,
    JSON.stringify(guard),
  );
}

let preloadErrorSeenDuringBoot = false;

window.addEventListener("vite:preloadError", (event) => {
  preloadErrorSeenDuringBoot = true;
  event.preventDefault();

  const nextGuard = {
    target: getCurrentTarget(),
    timestamp: Date.now(),
  };
  const previousGuard = readPreloadReloadGuard();
  const isRecentRetry =
    previousGuard?.target === nextGuard.target &&
    nextGuard.timestamp - previousGuard.timestamp < PRELOAD_RELOAD_COOLDOWN_MS;

  if (isRecentRetry) {
    return;
  }

  writePreloadReloadGuard(nextGuard);
  window.location.reload();
});

function schedulePreloadReloadGuardReset() {
  window.setTimeout(() => {
    if (!preloadErrorSeenDuringBoot) {
      window.sessionStorage.removeItem(PRELOAD_RELOAD_GUARD_KEY);
    }
  }, PRELOAD_RELOAD_RESET_DELAY_MS);
}

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

const logRecoverableHydrationError = import.meta.env.DEV
  ? (
      error: unknown,
      errorInfo: {
        componentStack?: string;
      },
    ) => {
      console.warn(
        "[hydration] recoverable error:",
        error,
        errorInfo.componentStack ?? "",
      );
    }
  : (_error: unknown, _errorInfo: { componentStack?: string }) => {};

if (root.dataset.serverRendered === "true") {
  root.removeAttribute("data-server-rendered");
  hydrateRoot(root, app, {
    onRecoverableError(error, errorInfo) {
      logRecoverableHydrationError(error, errorInfo as { componentStack?: string });
    },
  });
} else {
  createRoot(root).render(app);
}

schedulePreloadReloadGuardReset();
