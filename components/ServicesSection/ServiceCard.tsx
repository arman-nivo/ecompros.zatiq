"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "./data";
import { useTilt } from "./useTilt";

// CSS custom properties (--glare-x / --glare-y) aren't part of the
// standard CSSProperties type, so we widen it locally for this one style.
type CardStyle = CSSProperties & {
  "--glare-x"?: string | number;
  "--glare-y"?: string | number;
};

const initialGlareStyle: CardStyle = {
  "--glare-x": 50,
  "--glare-y": 50,
};

export default function ServiceCard({ item }: { item: ServiceItem }) {
  const ref = useTilt<HTMLAnchorElement>(8);
  const Icon = item.icon;

  return (
    <Link
      ref={ref}
      href="/booking"
      aria-label={`${item.label} — book a call`}
      className="service-card group relative flex items-center gap-3 rounded-[1.35rem] border border-[var(--color-rule)] bg-[var(--color-paper)] p-3.5 shadow-[0_1px_2px_rgba(17,17,18,0.04)] outline-none transition-all duration-500 ease-out will-change-transform hover:shadow-[0_18px_40px_-16px_rgba(76,29,149,0.35)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] dark:border-[var(--color-rule)]"
      style={initialGlareStyle}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(220px_circle_at_calc(var(--glare-x)*1%)_calc(var(--glare-y)*1%),rgba(234,88,12,0.14),transparent_70%)]"
      />
      <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.8rem] bg-[var(--color-accent-soft)] text-[var(--color-brand-accent)] transition-colors duration-300 group-hover:bg-[var(--color-brand-accent)] group-hover:text-white">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <span className="relative z-[1] flex-1 text-[13.5px] font-medium leading-[1.3] text-[var(--color-ink)]">
        {item.label}
      </span>
      <ArrowRight
        aria-hidden="true"
        size={17}
        strokeWidth={1.75}
        className="relative z-[1] shrink-0 -translate-x-2 text-[var(--color-brand-accent)] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      />
    </Link>
  );
}
