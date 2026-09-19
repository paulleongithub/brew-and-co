import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { FeatureListItem } from "../components/FeatureListItem";
import { ReservationCTAPanel } from "../components/ReservationCTAPanel";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How two market stalls in Walthamstow became Brew & Co — a neighbourhood café built by Nora Whitfield and Sam Okafor.",
};

const VALUES = [
  {
    title: "Slow-roasted in small batches",
    description: "We'd rather run out on a Tuesday than compromise on a roast.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
        <path d="M10 2.5c1.5 2 2.5 3.5 2.5 5.5a2.5 2.5 0 1 1-5 0c0-.7.3-1.3.7-2 .3 1 1 1.3 1 1.3s.8-2.1.8-4.8z" strokeLinejoin="round" />
        <path d="M6 12.5a4 4 0 1 0 8 0c0-.9-.3-1.6-.7-2.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Local suppliers",
    description: "Milk from a dairy in Essex, flour from a mill in Hackney, roasted a mile from the counter.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
        <path d="M10 17.5s6-5.2 6-9.8a6 6 0 1 0-12 0c0 4.6 6 9.8 6 9.8z" strokeLinejoin="round" />
        <circle cx="10" cy="7.7" r="2" />
      </svg>
    ),
  },
  {
    title: "Door's always open",
    description: "Regulars get their usual without asking. First-timers get the same.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
        <rect x="4.5" y="2.5" width="9" height="15" rx="1" strokeLinejoin="round" />
        <path d="M13.5 6.5l2 .7v9l-2 .8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="10" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-20 px-5 pb-16 sm:gap-28 sm:px-10 lg:px-16">
        <Navbar activeHref="/about" />

        <header className="flex flex-col gap-4 lg:max-w-2xl">
          <SectionEyebrow tone="moss">Our story</SectionEyebrow>
          <h1 className="font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">
            Two market stalls, one shop
          </h1>
          <p className="font-body text-lg text-espresso-800">
            Brew &amp; Co didn&apos;t start with a business plan. It started with two stalls at
            Walthamstow Market, three feet apart, and a lot of regulars asking why they didn&apos;t
            just share a shop.
          </p>
        </header>

        <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5 font-body text-base text-espresso-800">
            <p>
              In 2016, Nora Whitfield was pulling shots from a second-hand La Marzocco machine on
              Saturday mornings, and Sam Okafor was three stalls down selling banana bread his
              grandmother taught him to bake in Lagos. Neither of them planned to open a café —
              they just kept ending up at each other&apos;s stalls.
            </p>
            <p>
              They found a disused locksmith&apos;s on Church Hill Road, brass fittings still in the
              window, and spent four months restoring it themselves: sanding the original
              floorboards, building the bar from reclaimed scaffold planks. Brew &amp; Co opened its
              doors in March 2017.
            </p>
            <p>
              The name is a small promise. Everyone who walks in becomes part of the &ldquo;&amp;
              Co.&rdquo; Friday nights the tables get pushed back for open mic. Saturday mornings the
              espresso machine goes quiet for twenty minutes while Nora walks a table of strangers
              through a cupping — because the best way to explain a roast is to let people taste it
              side by side.
            </p>
            <p>
              Ten years and one bigger roaster later, it still feels like someone&apos;s front room.
              Because in a way, it&apos;s Nora&apos;s and Sam&apos;s.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src="/images/about/about-counter.webp"
              alt="The counter at Brew & Co, with the espresso machine and shelves of coffee bags"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <SectionEyebrow tone="moss">What guides us</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">
              Slow, precise, unhurried
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <FeatureListItem
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:order-2">
            <Image
              src="/images/about/about-barista.webp"
              alt="A barista pulling an espresso shot with a portafilter at the counter"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 lg:order-1">
            <SectionEyebrow tone="moss">Every Friday &amp; Saturday</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-espresso-950">
              A shop, not just a counter
            </h2>
            <p className="font-body text-base text-espresso-800">
              Open mic on Fridays and cupping sessions on Saturdays aren&apos;t marketing —
              they&apos;re how Nora and Sam keep the shop what it was always meant to be: somewhere
              the neighbourhood actually gathers, not just passes through.
            </p>
          </div>
        </section>
      </div>

      <ReservationCTAPanel
        eyebrow="Come say hello"
        title="Pull up a chair"
        description="Reserve a table for a quiet coffee, or come by on Friday night when the tables get pushed back for open mic."
        ctaLabel="Reserve a table"
      />
      <Footer />
    </>
  );
}
