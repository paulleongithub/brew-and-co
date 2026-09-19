import { IconBubble } from "./IconBubble";
import { cx } from "./cx";
import { formatEventDate, getNextOccurrence, type RecurringEvent } from "@/app/data/events";

const ICONS: Record<string, React.ReactNode> = {
  "open-mic-night": (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
      <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" />
      <path d="M4.5 10.5a5.5 5.5 0 0 0 11 0" strokeLinecap="round" />
      <path d="M10 16v2.5" strokeLinecap="round" />
      <path d="M7 18.5h6" strokeLinecap="round" />
    </svg>
  ),
  "saturday-cupping": (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" strokeWidth={1.75} className="stroke-espresso-950">
      <path d="M3.5 6.5h10v5a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5v-5z" strokeLinejoin="round" />
      <path d="M13.5 8h1a2 2 0 0 1 0 4h-1" strokeLinecap="round" />
      <path d="M6 3.5c0 .8-.7 1-.7 1.8S6 6.5 6 6.5" strokeLinecap="round" />
      <path d="M9 3.5c0 .8-.7 1-.7 1.8S9 6.5 9 6.5" strokeLinecap="round" />
    </svg>
  ),
};

interface EventCardProps {
  event: RecurringEvent;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const nextDate = getNextOccurrence(event.weekday);

  return (
    <div
      className={cx(
        "flex items-start gap-5 rounded-card bg-crema p-6 shadow-warm-sm",
        className
      )}
    >
      <IconBubble variant="rust" size="lg">
        {ICONS[event.slug]}
      </IconBubble>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl font-semibold text-espresso-950">{event.title}</h3>
        <p className="font-body text-sm font-semibold text-moss">
          {formatEventDate(nextDate)} · {event.time}
        </p>
        <p className="font-body text-sm text-espresso-600">{event.description}</p>
      </div>
    </div>
  );
}
