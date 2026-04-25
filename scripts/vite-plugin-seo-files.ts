import type { Plugin } from "vite";
import path from "path";
import fs from "fs";
import { generateSitemap } from "./generate-sitemap";
import { generateRobotsTxt } from "./generate-robots";

/** Vite plugin that writes sitemap.xml and robots.txt into the build output */
export function seoFilesPlugin(): Plugin {
  return {
    name: "vite-plugin-seo-files",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(__dirname, "..", "dist");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), generateSitemap(), "utf-8");
      fs.writeFileSync(path.join(outDir, "robots.txt"), generateRobotsTxt(), "utf-8");
      console.log("✓ sitemap.xml generated");
      console.log("✓ robots.txt generated");
    },
  };
}
