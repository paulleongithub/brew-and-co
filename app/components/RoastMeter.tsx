"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "./cx";

type RoastLevel = "light" | "medium" | "dark";

const LEVEL_INDEX: Record<RoastLevel, number> = {
  light: 1,
  medium: 2,
  dark: 3,
};

const LEVEL_LABEL: Record<RoastLevel, string> = {
  light: "Light roast",
  medium: "Medium roast",
  dark: "Dark roast",
};

const SEGMENT_COLOR: Record<RoastLevel, string> = {
  light: "bg-honey",
  medium: "bg-rust",
  dark: "bg-espresso-800",
};

interface RoastMeterProps {
  level: RoastLevel;
  label?: string;
  className?: string;
}

/**
 * Brand signature visual — see docs/design/01-style-guide.md §7.
 * A segment never relies on color alone: the text label always accompanies it.
 */
export function RoastMeter({ level, label, className }: RoastMeterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const filledSegments = LEVEL_INDEX[level];
  const accessibleLabel = label ?? LEVEL_LABEL[level];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={accessibleLabel}
      className={cx("flex items-center gap-3", className)}
    >
      <div className="flex flex-1 gap-1">
        {([1, 2, 3] as const).map((segment) => {
          const isFilled = segment <= filledSegments;
          return (
            <span
              key={segment}
              className="h-1.5 flex-1 overflow-hidden rounded-pill bg-espresso-100"
            >
              <span
                className={cx(
                  "block h-full origin-left rounded-pill transition-transform duration-slow ease-brew motion-reduce:transition-none",
                  isFilled ? SEGMENT_COLOR[level] : "bg-transparent",
                  isFilled && isVisible ? "scale-x-100" : "scale-x-0"
                )}
              />
            </span>
          );
        })}
      </div>
      <span aria-hidden="true" className="font-body text-xs font-medium text-espresso-600">
        {accessibleLabel}
      </span>
    </div>
  );
}
