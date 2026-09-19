import type { ReactNode } from "react";
import { IconBubble } from "./IconBubble";
import { cx } from "./cx";

interface FeatureListItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/** Linha ícone + título + descrição — lista de diferenciais do produto/marca. */
export function FeatureListItem({
  icon,
  title,
  description,
  className,
}: FeatureListItemProps) {
  return (
    <div className={cx("flex items-start gap-4", className)}>
      <IconBubble variant="crema" size="md">
        {icon}
      </IconBubble>
      <div>
        <p className="font-body text-base font-semibold text-espresso-950">{title}</p>
        <p className="font-body text-sm text-espresso-600">{description}</p>
      </div>
    </div>
  );
}
