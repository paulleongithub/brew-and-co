"use client";

import type { ReactNode } from "react";
import { CTAPanel } from "./CTAPanel";
import { RESERVATION_DIALOG_ID } from "./ReservationDialog";
import { cx } from "./cx";

interface ReservationCTAPanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  children?: ReactNode;
  className?: string;
}

/** CTAPanel wired to open the shared ReservationDialog (kept as its own client component so pages stay Server Components). */
export function ReservationCTAPanel({ className, ...props }: ReservationCTAPanelProps) {
  return (
    <CTAPanel
      {...props}
      className={cx("on-dark", className)}
      onCtaClick={() => {
        const dialog = document.getElementById(RESERVATION_DIALOG_ID);
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
    />
  );
}
