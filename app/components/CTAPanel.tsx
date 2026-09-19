import type { ReactNode } from "react";
import { Button } from "./Button";
import { cx } from "./cx";

interface CTAPanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  children?: ReactNode;
  className?: string;
}

/** Painel escuro de largura total — segunda vitrine ou chamada final de conversão. */
export function CTAPanel({
  eyebrow,
  title,
  description,
  ctaLabel,
  onCtaClick,
  children,
  className,
}: CTAPanelProps) {
  return (
    <section className={cx("rounded-t-card bg-espresso-950 px-8 py-16 sm:px-16", className)}>
      <div className="flex flex-col items-start gap-4 sm:max-w-lg">
        {eyebrow ? (
          <span className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-honey">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-display text-4xl font-semibold text-crema">{title}</h2>
        <p className="font-body text-base text-espresso-200">{description}</p>
        <Button variant="accent" onClick={onCtaClick} className="mt-2">
          {ctaLabel}
        </Button>
      </div>
      {children ? <div className="mt-12">{children}</div> : null}
    </section>
  );
}
