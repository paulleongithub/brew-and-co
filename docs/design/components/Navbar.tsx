import Link from "next/link";
import { IconBubble } from "./IconBubble";
import { cx } from "./cx";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
  activeHref?: string;
  cartCount?: number;
  className?: string;
}

/**
 * Barra de navegação — fundo igual ao da página (sem "cartão" de navbar).
 * Colapso de `links` em menu mobile fica a cargo de quem consome este componente.
 */
export function Navbar({ links, activeHref, cartCount = 0, className }: NavbarProps) {
  return (
    <header className={cx("flex items-center justify-between gap-6 bg-cream py-6", className)}>
      <Link href="/" className="font-display text-xl font-semibold text-espresso-950">
        Brew & Co
      </Link>

      <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
        {links.map((link) => {
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

      <div className="flex items-center gap-4">
        <label htmlFor="site-search" className="sr-only">
          Buscar produtos
        </label>
        <div className="hidden items-center gap-2 rounded-pill bg-crema px-4 py-2.5 shadow-warm-sm sm:flex">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            strokeWidth={1.75}
            className="h-4 w-4 stroke-espresso-600"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M17 17l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            id="site-search"
            type="search"
            placeholder="Buscar"
            className="w-32 bg-transparent font-body text-sm text-espresso-950 placeholder:text-espresso-400 focus:outline-none"
          />
        </div>

        <span className="relative inline-flex" aria-label={`Carrinho, ${cartCount} itens`}>
          <IconBubble variant="crema" size="md">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              strokeWidth={1.75}
              className="h-4 w-4 stroke-espresso-950"
            >
              <path d="M5 6h11l-1 8H6L5 6z" strokeLinejoin="round" />
              <path d="M5 6L4 3H2" strokeLinecap="round" />
            </svg>
          </IconBubble>
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rust font-mono text-[10px] font-semibold text-espresso-950">
              {cartCount}
            </span>
          ) : null}
        </span>
      </div>
    </header>
  );
}
