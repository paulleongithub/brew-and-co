import type { ReactNode } from "react";
import { cx } from "./cx";

type IconBubbleVariant = "cream" | "crema" | "rust" | "espresso";
type IconBubbleSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<IconBubbleVariant, string> = {
  cream: "bg-cream text-espresso-950",
  crema: "bg-crema text-espresso-950",
  rust: "bg-rust text-espresso-950",
  espresso: "bg-espresso-950 text-honey",
};

const SIZE_CLASSES: Record<IconBubbleSize, string> = {
  sm: "h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-11 w-11 [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-14 w-14 [&_svg]:h-5 [&_svg]:w-5",
};

interface IconBubbleProps {
  children: ReactNode;
  variant?: IconBubbleVariant;
  size?: IconBubbleSize;
  className?: string;
}

/** Container circular para um ícone — sozinho (FeatureListItem) ou dentro de Button. */
export function IconBubble({
  children,
  variant = "crema",
  size = "md",
  className,
}: IconBubbleProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {children}
    </span>
  );
}
