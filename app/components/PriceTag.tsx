import { cx } from "./cx";

interface PriceTagProps {
  /** Amount in currency units (e.g. 3.4 for £3.40). */
  amount: number;
  currency?: "GBP" | "USD";
  variant?: "compact" | "hero";
  className?: string;
}

const CURRENCY_SYMBOL: Record<NonNullable<PriceTagProps["currency"]>, string> = {
  GBP: "£",
  USD: "$",
};

/** Featured price — compact mono in cards, large display on hero contexts. */
export function PriceTag({
  amount,
  currency = "GBP",
  variant = "compact",
  className,
}: PriceTagProps) {
  const formatted = amount.toFixed(2);

  return (
    <span
      className={cx(
        "inline-flex items-baseline gap-1 text-espresso-950",
        variant === "hero"
          ? "font-display text-3xl font-semibold"
          : "font-mono text-lg font-medium tabular-nums",
        className
      )}
    >
      <span className="text-sm opacity-70">{CURRENCY_SYMBOL[currency]}</span>
      {formatted}
    </span>
  );
}
