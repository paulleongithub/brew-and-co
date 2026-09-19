import { cx } from "./cx";

interface RatingBadgeProps {
  /** 0–5, uma casa decimal. */
  rating: number;
  className?: string;
}

/** Chip flutuante usado sobre fotografia de produto e dentro de ProductCard. */
export function RatingBadge({ rating, className }: RatingBadgeProps) {
  return (
    <span
      aria-label={`Avaliação: ${rating.toFixed(1)} de 5 estrelas`}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-pill bg-crema px-3 py-1.5 shadow-warm-sm",
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        strokeWidth={1}
        className="h-3.5 w-3.5 fill-honey stroke-espresso-950"
      >
        <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.9l-5.18 2.54.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
      </svg>
      <span className="font-mono text-sm font-medium tabular-nums text-espresso-950">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
