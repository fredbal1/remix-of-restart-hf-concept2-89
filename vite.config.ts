import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { seoFilesPlugin } from "./scripts/vite-plugin-seo-files";
import { siteUrlPlugin } from "./scripts/vite-plugin-site-url";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    !isSsrBuild && seoFilesPlugin(),
    !isSsrBuild && siteUrlPlugin(),
  ].filter(Boolean),
  build: isSsrBuild
    ? {
        minify: false,
        ssrEmitAssets: true,
        rollupOptions: {
          output: {
            entryFileNames: "entry-server.js",
          },
        },
      }
    : {
        rollupOptions: {
          output: {
            manualChunks(id) {
              const normalizedId = id.replace(/\\/g, "/");

              if (!normalizedId.includes("/node_modules/")) {
                return undefined;
              }

              const matchesPackage = (packageName: string) =>
                normalizedId.includes(`/node_modules/${packageName}/`) ||
                normalizedId.endsWith(`/node_modules/${packageName}`);

              if (
                matchesPackage("react-router-dom") ||
                matchesPackage("react-router") ||
                matchesPackage("@remix-run/router")
              ) {
                return "router";
              }

              if (matchesPackage("react-helmet-async")) {
                return "seo-vendor";
              }

              if (matchesPackage("lucide-react")) {
                return "icons";
              }

              if (matchesPackage("sonner")) {
                return "ui-vendor";
              }

              if (
                matchesPackage("clsx") ||
                matchesPackage("tailwind-merge") ||
                matchesPackage("class-variance-authority")
              ) {
                return "ui-utils";
              }

              return "vendor";
            },
          },
        },
      },
  ssr: isSsrBuild
    ? {
        noExternal: ["react-helmet-async"],
      }
    : undefined,
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
