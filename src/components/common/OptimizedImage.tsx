import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * OptimizedImage — Shared image primitive with performance best practices.
 *
 * Provides:
 * - Proper `loading` / `decoding` defaults
 * - `sizes` hint for responsive decode sizing
 * - `width` / `height` for aspect-ratio reservation (CLS prevention)
 * - forwardRef support for parent ref forwarding
 *
 * Responsive image delivery:
 * - When `variants` is provided with valid entries, a real `srcSet` is built
 *   from the normalized responsive variants, and the rendered `src` also comes
 *   from those variants to keep the fallback aligned with `srcSet`.
 * - When `variants` is absent or contains no valid entries, `src` is used as
 *   the only fallback source — no fake srcSet is generated from a single image.
 * - If both `variants` and `src` are omitted or invalid, nothing is rendered.
 */

export type ResponsiveImageVariant = {
  /** Variant image URL */
  src: string;
  /** Intrinsic width of this variant in pixels */
  width: number;
  /** MIME type — reserved for future multi-format support, unused in this pass */
  type?: string;
};

interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  /** Image source (Vite import or URL) */
  src?: string;
  alt: string;
  /** Above the fold? Sets eager loading */
  priority?: boolean;
  /** CSS sizes hint — e.g. "(max-width: 768px) 100vw, 50vw" */
  sizes?: string;
  /** Intrinsic width for CLS prevention */
  width?: number;
  /** Intrinsic height for CLS prevention */
  height?: number;
  /** Real responsive image variants — srcSet and rendered src are derived from these when valid */
  variants?: ResponsiveImageVariant[];
  /** Native fetch priority hint, forwarded as lowercase attribute for React 18 compatibility */
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Normalize responsive variants once for the whole component.
 * Filters invalid entries, sorts by width ascending, then deduplicates by width.
 */
function normalizeResponsiveVariants(
  variants?: ResponsiveImageVariant[],
): ResponsiveImageVariant[] {
  if (!variants?.length) return [];

  const sorted = variants
    .filter((variant) => variant.width > 0 && variant.src.trim() !== "")
    .sort((a, b) => a.width - b.width);
  const seen = new Set<number>();
  const normalized: ResponsiveImageVariant[] = [];

  for (const variant of sorted) {
    if (!seen.has(variant.width)) {
      seen.add(variant.width);
      normalized.push(variant);
    }
  }

  return normalized;
}

/** Build a valid srcSet string from normalized responsive variants. */
function buildSrcSet(variants: ResponsiveImageVariant[]): string {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  function OptimizedImage(
    {
      src,
      alt,
      priority = false,
      sizes,
      className,
      width,
      height,
      variants,
      fetchPriority,
      ...rest
    },
    ref,
  ) {
    const normalizedVariants = normalizeResponsiveVariants(variants);
    const srcSet = normalizedVariants.length ? buildSrcSet(normalizedVariants) : "";
    const effectiveSrc = normalizedVariants[0]?.src || src;

    if (!effectiveSrc) return null;

    return (
      <img
        ref={ref}
        src={effectiveSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(srcSet ? { srcSet } : {})}
        {...(sizes ? { sizes } : {})}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        className={cn("", className)}
        {...rest}
      />
    );
  },
);
