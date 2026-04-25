import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const assetsDir = join(__dirname, "..", "dist", "assets");

interface Budget {
  label: string;
  pattern: RegExp;
  maxBytes: number;
}

const budgets: Budget[] = [
  { label: "JS principal", pattern: /^index-.*\.js$/, maxBytes: 800 * 1_000 },
  { label: "CSS principal", pattern: /^index-.*\.css$/, maxBytes: 300 * 1_000 },
];

let files: string[];
try {
  files = readdirSync(assetsDir);
} catch {
  console.error(`❌  dist/assets introuvable. Lancez le build d'abord.`);
  process.exitCode = 1;
  process.exit();
}

let failed = false;

for (const budget of budgets) {
  const matches = files.filter((f) => budget.pattern.test(f)).sort();

  if (matches.length === 0) {
    console.error(
      `❌  ${budget.label} : aucun fichier correspondant à ${budget.pattern} dans dist/assets`,
    );
    failed = true;
    continue;
  }

  const file = matches[0];
  const size = statSync(join(assetsDir, file)).size;
  const sizeKB = (size / 1_000).toFixed(1);
  const budgetKB = (budget.maxBytes / 1_000).toFixed(0);
  const ok = size <= budget.maxBytes;

  console.log(
    `${ok ? "✅" : "❌"}  ${budget.label}  ${file}  ${sizeKB} kB / ${budgetKB} kB  ${ok ? "OK" : "FAIL"}`,
  );

  if (!ok) failed = true;
}

if (failed) {
  console.error("\nBundle budget dépassé.");
  process.exitCode = 1;
}
