import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export function Footer() {
  return (
    <footer className="on-dark rounded-b-card bg-espresso-950 px-8 py-12 sm:px-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg font-semibold text-crema">Brew &amp; Co</span>
          <p className="font-body text-sm text-espresso-200">
            145 Church Hill Road
            <br />
            Walthamstow, London E17
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-honey">
            Opening hours
          </span>
          <p className="font-body text-sm text-espresso-200">
            Mon–Fri: 7:30am – 5:00pm
            <br />
            Saturday: 8:00am – 5:00pm
            <br />
            Sunday: 8:00am – 5:00pm
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-honey">
            Follow along
          </span>
          <div className="flex flex-col gap-1">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-espresso-200 underline-offset-4 hover:text-crema hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 font-body text-xs text-espresso-400">
        © {new Date().getFullYear()} Brew &amp; Co. All rights reserved.
      </p>
    </footer>
  );
}
