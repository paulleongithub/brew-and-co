import { cx } from "./cx";

interface PriceTagProps {
  /** Valor em unidades da moeda (ex.: 8.6 para R$ 8,60). */
  amount: number;
  currency?: "BRL" | "USD";
  variant?: "compact" | "hero";
  className?: string;
}

const CURRENCY_SYMBOL: Record<NonNullable<PriceTagProps["currency"]>, string> = {
  BRL: "R$",
  USD: "$",
};

/** Preço em destaque — mono compacto em cards, display grande em página de produto. */
export function PriceTag({
  amount,
  currency = "BRL",
  variant = "compact",
  className,
}: PriceTagProps) {
  const formatted = amount.toFixed(2).replace(".", ",");

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
