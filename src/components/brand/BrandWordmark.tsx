import { OptimizedImage } from "@/components/common/OptimizedImage";
import logoHfconcept from "@/assets/logo_hfconcept.webp";
import { LOGO_HFCONCEPT_VARIANTS } from "@/data/image-variants/brand";
import { cn } from "@/lib/utils";

interface BrandWordmarkProps {
  className?: string;
  tone?: "light" | "dark";
}

export function BrandWordmark({ className, tone = "dark" }: BrandWordmarkProps) {
  const textToneClass = tone === "dark" ? "text-hf-on-dark" : "text-hf-strong";
  const subToneClass = tone === "dark" ? "text-hf-on-dark-soft" : "text-hf-soft";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <OptimizedImage
        src={logoHfconcept}
        variants={LOGO_HFCONCEPT_VARIANTS}
        alt="HFconcept"
        width={96}
        height={25}
        className="h-auto w-20 md:w-24"
      />
      <div className="h-8 w-px bg-hf-divider-on-dark/60" aria-hidden="true" />
      <p className={cn("text-micro-label", subToneClass)}>
        studio d&apos;architecture intérieure
      </p>
      <span className={cn("sr-only", textToneClass)}>HFconcept</span>
    </div>
  );
}

