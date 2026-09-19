import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { MenuItemCard } from "../components/MenuItemCard";
import { Footer } from "../components/Footer";
import { menu } from "../data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Specialty coffee, fresh pastries and light lunches at Brew & Co — a neighbourhood café in Walthamstow, London.",
};

export default function MenuPage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-5 pb-24 sm:gap-20 sm:px-10 lg:px-16">
        <Navbar activeHref="/menu" />

        <header className="flex flex-col gap-4 lg:max-w-2xl">
          <SectionEyebrow tone="moss">Menu</SectionEyebrow>
          <h1 className="font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">
            What we&apos;re pouring &amp; baking
          </h1>
          <p className="font-body text-lg text-espresso-800">
            Everything below is made in-house or roasted a mile from the counter. Ask what&apos;s
            pouring on filter — it changes weekly.
          </p>
        </header>

        {menu.map((category) => (
          <section key={category.slug} className="flex flex-col gap-8">
            <SectionEyebrow tone="moss">{category.title}</SectionEyebrow>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, index) => (
                <MenuItemCard
                  key={item.slug}
                  item={item}
                  discColor={index % 2 === 0 ? "rust" : "moss"}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </>
  );
}
