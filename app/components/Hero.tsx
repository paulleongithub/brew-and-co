import Image from "next/image";
import Link from "next/link";
import { ReservationTrigger } from "./ReservationDialog";

interface HeroProps {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
}

export function Hero({ image, eyebrow, title, description }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-card">
      <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/35 to-espresso-950/10" />
      </div>

      <div className="on-dark absolute inset-0 flex flex-col justify-end gap-5 p-8 sm:p-12 lg:max-w-2xl lg:p-16">
        <span className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-honey">
          {eyebrow}
        </span>
        <h1 className="display-hero font-display text-4xl font-semibold text-crema sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-lg font-body text-base text-espresso-100 sm:text-lg">{description}</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <ReservationTrigger variant="accent" size="lg">
            Reserve a table
          </ReservationTrigger>
          <Link
            href="/menu"
            className="inline-flex h-14 items-center justify-center rounded-pill border border-crema px-8 font-body text-lg font-medium text-crema shadow-warm-sm transition-all duration-fast ease-brew hover:-translate-y-0.5 hover:bg-crema/10 hover:shadow-warm-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
          >
            View menu
          </Link>
        </div>
      </div>
    </section>
  );
}
