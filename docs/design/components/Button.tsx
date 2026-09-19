"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { IconBubble } from "./IconBubble";
import { cx } from "./cx";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-espresso-950 text-crema hover:bg-espresso-800 focus-visible:outline-rust",
  accent:
    "bg-rust font-semibold text-espresso-950 hover:bg-rust-600 focus-visible:outline-espresso-950",
  outline:
    "border border-espresso-200 bg-transparent text-espresso-950 hover:bg-espresso-100 focus-visible:outline-rust",
  ghost:
    "bg-transparent text-espresso-800 underline-offset-4 hover:text-espresso-950 hover:underline focus-visible:outline-rust",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-4 text-sm",
  md: "h-12 gap-3 px-6 text-base",
  lg: "h-14 gap-3 px-8 text-lg",
};

const ICON_BUBBLE_SIZE: Record<ButtonSize, "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

/** Ação principal da interface — sempre pílula, nunca cantos retos. */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cx(
        "group inline-flex items-center justify-center rounded-pill font-body font-medium",
        "shadow-warm-sm transition-all duration-fast ease-brew",
        "hover:-translate-y-0.5 hover:shadow-warm-md active:translate-y-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-45 disabled:shadow-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      <span>{children}</span>
      {icon ? (
        <IconBubble
          size={ICON_BUBBLE_SIZE[size]}
          variant={variant === "primary" ? "rust" : "crema"}
          className="transition-transform duration-fast ease-brew group-hover:rotate-12"
        >
          {icon}
        </IconBubble>
      ) : null}
    </button>
  );
}
