import { cx } from "./cx";

type EyebrowTone = "rust" | "moss";

const TONE_CLASSES: Record<EyebrowTone, string> = {
  rust: "text-rust before:bg-rust",
  moss: "text-moss before:bg-moss",
};

interface SectionEyebrowProps {
  children: string;
  tone?: EyebrowTone;
  className?: string;
}

/** Rótulo curto acima de um título de seção. Usar com moderação (ver guia §1). */
export function SectionEyebrow({ children, tone = "rust", className }: SectionEyebrowProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em]",
        "before:block before:h-px before:w-4",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
