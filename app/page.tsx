import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SectionEyebrow } from "./components/SectionEyebrow";
import { MenuItemCard } from "./components/MenuItemCard";
import { EventCard } from "./components/EventCard";
import { ReservationCTAPanel } from "./components/ReservationCTAPanel";
import { Footer } from "./components/Footer";
import { popularItems } from "./data/menu";
import { events } from "./data/events";

export const metadata: Metadata = {
  title: "Brew & Co — Specialty Coffee & All-Day Café in London",
  description:
    "A cosy neighbourhood café in Walthamstow, London. Specialty coffee, fresh pastries and light lunches, plus Friday open mic nights and Saturday cupping sessions.",
};

export default function Home() {
  const featured = popularItems().slice(0, 4);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-20 px-5 pb-16 sm:gap-28 sm:px-10 lg:px-16">
        <Navbar activeHref="/" />

        <Hero
          image="/images/hero/hero-home.webp"
          eyebrow="Walthamstow, London"
          title="Coffee that's worth slowing down for"
          description="Specialty coffee, fresh pastries and light lunches in a room that feels like your front room — because it started as one."
        />

        <section className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-3">
              <SectionEyebrow tone="moss">Fan favourites</SectionEyebrow>
              <h2 className="font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">
                Popular picks
              </h2>
            </div>
            <Link
              href="/menu"
              className="font-body text-sm font-semibold text-espresso-800 underline-offset-4 hover:text-espresso-950 hover:underline"
            >
              View full menu →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item, index) => (
              <MenuItemCard
                key={item.slug}
                item={item}
                discColor={index % 2 === 0 ? "rust" : "moss"}
                showRating
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <SectionEyebrow tone="moss">What&apos;s on</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">
              This week at Brew &amp; Co
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      </div>

      <ReservationCTAPanel
        eyebrow="Saturday mornings"
        title="Come taste something new"
        description="Free cupping every Saturday at 10am, no booking needed. Or reserve a table any day of the week and we'll have it ready when you arrive."
        ctaLabel="Reserve a table"
      />
      <Footer />
    </>
  );
}
