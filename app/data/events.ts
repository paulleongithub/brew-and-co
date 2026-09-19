export interface RecurringEvent {
  slug: string;
  title: string;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  time: string;
  description: string;
  imageId: number;
}

export const events: RecurringEvent[] = [
  {
    slug: "open-mic-night",
    title: "Open Mic Night",
    weekday: 5, // Friday
    time: "7:30–10:00pm",
    description:
      "Sign up at the counter from 7pm. All instruments, all skill levels, one open floor.",
    imageId: 1745762,
  },
  {
    slug: "saturday-cupping",
    title: "Saturday Cupping",
    weekday: 6, // Saturday
    time: "10:00–11:00am",
    description:
      "Free. Taste three roasts side by side and learn what ‘washed’ versus ‘natural’ actually means.",
    imageId: 34505585,
  },
];

/** Next date (today included) on which the given weekday (0 = Sun … 6 = Sat) occurs. */
export function getNextOccurrence(weekday: number, from: Date = new Date()): Date {
  const result = new Date(from);
  result.setHours(0, 0, 0, 0);
  const diff = (weekday - result.getDay() + 7) % 7;
  result.setDate(result.getDate() + diff);
  return result;
}

export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}
