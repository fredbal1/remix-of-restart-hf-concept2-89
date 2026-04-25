import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildBreadcrumbJsonLd, type BreadcrumbItemSeed } from "@/lib/seo/breadcrumb-jsonld";

const TEXT_BREADCRUMB = "text-micro-label";

export type BreadcrumbItem = BreadcrumbItemSeed;

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  className?: string;
}

export function Breadcrumbs({ items, tone = "light", className }: BreadcrumbsProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn(isDark ? "surface-dark" : "surface-light", className)}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbJsonLd(items))}</script>
      </Helmet>
      <div className="container-hf py-3">
        <nav aria-label="Fil d'Ariane">
          <ol className={cn("flex flex-wrap items-center gap-1.5", TEXT_BREADCRUMB)}>
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <li key={i} className="inline-flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight
                      className={cn("w-3 h-3", isDark ? "text-hf-on-dark-soft/30" : "text-hf-secondary/30")}
                      aria-hidden="true"
                    />
                  )}
                  {isLast || !item.href ? (
                    <span
                      className={
                        isLast
                          ? (isDark ? "text-hf-on-dark-soft/60" : "text-hf-secondary/60")
                          : (isDark ? "text-hf-on-dark-soft/40" : "text-hf-secondary/40")
                      }
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "transition-colors focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2",
                        isDark
                          ? "text-hf-on-dark-soft/60 hover:text-hf-accent"
                          : "text-hf-secondary/40 hover:text-hf-accent-deep"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
