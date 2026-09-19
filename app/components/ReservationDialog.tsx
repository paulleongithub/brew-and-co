"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { cx } from "./cx";

export const RESERVATION_DIALOG_ID = "reservation-dialog";

interface Confirmation {
  name: string;
  guests: string;
  date: string;
}

function formatDateForDisplay(value: string): string {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parsed);
}

/** Single dialog instance for the whole page — rendered once in the root layout. */
export function ReservationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    const handleClose = () => setConfirmation(null);

    dialog.addEventListener("click", handleBackdropClick);
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setConfirmation({
      name: String(data.get("name") ?? "").trim(),
      guests: String(data.get("guests") ?? ""),
      date: String(data.get("date") ?? ""),
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <dialog
      id={RESERVATION_DIALOG_ID}
      ref={dialogRef}
      aria-labelledby="reservation-dialog-title"
      className={cx(
        "m-auto w-[min(28rem,calc(100vw-2.5rem))] rounded-card bg-crema p-0 shadow-warm-lg",
        "backdrop:bg-espresso-950/60"
      )}
    >
      <div className="relative p-8">
        <button
          type="button"
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-espresso-600 transition-colors hover:bg-espresso-100 hover:text-espresso-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="h-4 w-4 stroke-current">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>

        {confirmation ? (
          <div className="flex flex-col gap-4">
            <span className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-moss">
              Table reserved
            </span>
            <h2 id="reservation-dialog-title" className="font-display text-2xl font-semibold text-espresso-950">
              See you soon, {confirmation.name}
            </h2>
            <p className="font-body text-base text-espresso-800">
              We&apos;ll have a table ready for {confirmation.guests}{" "}
              {confirmation.guests === "1" ? "guest" : "guests"} on{" "}
              {formatDateForDisplay(confirmation.date)}. Running late or need to change anything?
              Just give us a call.
            </p>
            <Button
              type="button"
              variant="primary"
              onClick={() => dialogRef.current?.close()}
              className="self-start"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <span className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-moss">
                Reserve a table
              </span>
              <h2 id="reservation-dialog-title" className="mt-1 font-display text-2xl font-semibold text-espresso-950">
                We&apos;ll save you a seat
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reservation-name" className="font-body text-sm font-semibold text-espresso-800">
                Name
              </label>
              <input
                id="reservation-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="h-12 rounded-sm border border-espresso-200 bg-cream px-4 font-body text-base text-espresso-950 placeholder:text-espresso-400 focus-visible:border-rust"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reservation-guests" className="font-body text-sm font-semibold text-espresso-800">
                Number of people
              </label>
              <input
                id="reservation-guests"
                name="guests"
                type="number"
                min={1}
                max={12}
                required
                defaultValue={2}
                className="h-12 rounded-sm border border-espresso-200 bg-cream px-4 font-body text-base text-espresso-950 focus-visible:border-rust"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reservation-date" className="font-body text-sm font-semibold text-espresso-800">
                Preferred date
              </label>
              <input
                id="reservation-date"
                name="date"
                type="date"
                min={today}
                required
                className="h-12 rounded-sm border border-espresso-200 bg-cream px-4 font-body text-base text-espresso-950 focus-visible:border-rust"
              />
            </div>

            <Button type="submit" variant="accent" className="mt-2 w-full">
              Confirm reservation
            </Button>
          </form>
        )}
      </div>
    </dialog>
  );
}

interface ReservationTriggerProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Opens the single ReservationDialog instance rendered in the root layout. */
export function ReservationTrigger({
  children,
  variant = "accent",
  size = "md",
  className,
}: ReservationTriggerProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        const dialog = document.getElementById(RESERVATION_DIALOG_ID);
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
    >
      {children}
    </Button>
  );
}
