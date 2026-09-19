import Image from "next/image";
import { PriceTag } from "./PriceTag";
import { RatingBadge } from "./RatingBadge";
import { RoastMeter } from "./RoastMeter";
import { cx } from "./cx";
import type { MenuItem } from "@/app/data/menu";

interface MenuItemCardProps {
  item: MenuItem;
  /** Color disc staged behind the photo — pass alternating by grid position, per style guide §5. */
  discColor: "rust" | "moss";
  /** Only the homepage "Popular picks" showcase surfaces a rating badge. */
  showRating?: boolean;
  className?: string;
}

/**
 * Menu listing card — adapted from the design system's ProductCard for a
 * display-only café menu (no cart/"add to order" affordance, no online ordering).
 */
export function MenuItemCard({ item, discColor, showRating = false, className }: MenuItemCardProps) {
  return (
    <article
      className={cx(
        "flex flex-col gap-4 rounded-card bg-crema p-5 shadow-warm-sm",
        "transition-all duration-base ease-brew hover:-translate-y-1 hover:shadow-warm-md",
        className
      )}
    >
      <div
        className={cx(
          "relative aspect-square overflow-hidden rounded-card p-3",
          discColor === "rust" ? "bg-rust" : "bg-moss"
        )}
      >
        <div className="group relative h-full w-full overflow-hidden rounded-[1.25rem]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover transition-transform duration-base ease-brew group-hover:scale-105"
          />
        </div>
        {showRating && item.rating ? (
          <RatingBadge rating={item.rating} className="absolute bottom-6 right-6" />
        ) : null}
      </div>

      <h3 className="font-display text-2xl font-semibold text-espresso-950">{item.name}</h3>
      <p className="-mt-2 font-body text-sm text-espresso-600">{item.description}</p>

      {item.roastLevel ? <RoastMeter level={item.roastLevel} /> : null}

      <div className="mt-auto pt-2">
        <PriceTag amount={item.price} variant="compact" />
      </div>
    </article>
  );
}
