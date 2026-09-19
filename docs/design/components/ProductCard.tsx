import Image from "next/image";
import { Button } from "./Button";
import { PriceTag } from "./PriceTag";
import { RatingBadge } from "./RatingBadge";
import { RoastMeter } from "./RoastMeter";
import { cx } from "./cx";

type RoastLevel = "light" | "medium" | "dark";

interface ProductCardProps {
  name: string;
  href?: string;
  imageSrc: string;
  rating: number;
  price: number;
  roastLevel: RoastLevel;
  discColor?: "rust" | "moss";
  onAddToOrder?: () => void;
  className?: string;
}

/** Card de listagem de produto — foto sobre disco de cor, Roast Meter, preço e ação. */
export function ProductCard({
  name,
  href = "#",
  imageSrc,
  rating,
  price,
  roastLevel,
  discColor = "rust",
  onAddToOrder,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cx(
        "group flex flex-col gap-4 rounded-card bg-crema p-5 shadow-warm-sm",
        "transition-all duration-base ease-brew hover:-translate-y-1 hover:shadow-warm-md",
        className
      )}
    >
      <div
        className={cx(
          "relative aspect-square overflow-hidden rounded-card",
          discColor === "rust" ? "bg-rust" : "bg-moss"
        )}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 1024px) 320px, 50vw"
          className="object-contain p-6 transition-transform duration-base ease-brew group-hover:scale-105"
        />
        <RatingBadge rating={rating} className="absolute bottom-3 right-3" />
      </div>

      <h3 className="font-display text-2xl font-semibold text-espresso-950">
        <a href={href} className="underline-offset-4 hover:underline">
          {name}
        </a>
      </h3>

      <RoastMeter level={roastLevel} />

      <div className="mt-auto flex items-center justify-between pt-2">
        <PriceTag amount={price} variant="compact" />
        <Button variant="ghost" size="sm" onClick={onAddToOrder}>
          Adicionar ao pedido +
        </Button>
      </div>
    </article>
  );
}
