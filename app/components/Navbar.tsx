"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBubble } from "./IconBubble";
import { ReservationTrigger } from "./ReservationDialog";
import { cx } from "./cx";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
];

interface NavbarProps {
  activeHref: string;
}

/**
 * Adapted from docs/design/components/Navbar.tsx for Brew & Co: no cart/search
 * (there's no online ordering), the right-hand action opens the reservation
 * dialog, and a mobile menu is added (left unspecified by the reference doc).
 */
export function Navbar({ activeHref }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between gap-6 bg-cream py-6">
      <Link href="/" className="font-display text-xl font-semibold text-espresso-950">
        Brew &amp; Co
      </Link>

      <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
        {LINKS.map((link) => {
          const isActive = link.href === activeHref;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-espresso-800",
                "transition-colors hover:text-espresso-950",
                isActive &&
                  "text-espresso-950 underline decoration-rust decoration-2 underline-offset-8"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <ReservationTrigger variant="accent" size="md">
            Reserve a table
          </ReservationTrigger>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="lg:hidden"
        >
          <IconBubble variant="crema" size="md">
            {isMenuOpen ? (
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
                <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
              </svg>
            )}
          </IconBubble>
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full z-20 flex flex-col gap-1 rounded-card bg-crema p-4 shadow-warm-md lg:hidden"
        >
          {LINKS.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={cx(
                  "rounded-sm px-4 py-3 font-body text-sm font-semibold uppercase tracking-[0.06em] text-espresso-800",
                  isActive ? "bg-espresso-100 text-espresso-950" : "hover:bg-espresso-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="px-4 pt-2 sm:hidden">
            <ReservationTrigger variant="accent" size="md" className="w-full">
              Reserve a table
            </ReservationTrigger>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
