"use client";

import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import Button from "@/components/ui/Button";

export type NeedFinderGuide = {
  need: string;
  note: string;
  services: {
    headline: string;
    image: { alt: string; src: string };
    slug: string;
    title: string;
  }[];
};

export default function NeedFinder({ guides }: { guides: NeedFinderGuide[] }) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstRender = useRef(true);
  const guide = guides[active];

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const panel = panelRef.current;

    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tween = gsap.fromTo(
      panel.querySelectorAll("[data-finder-item]"),
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.07, y: 0 },
    );

    return () => {
      tween.kill();
    };
  }, [active]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -1,
    };
    const step = keys[event.key];

    if (!step) {
      return;
    }

    event.preventDefault();
    const next = (index + step + guides.length) % guides.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="sv-finder">
      <div aria-label="What do you need help with?" className="sv-finder__tabs" role="tablist">
        {guides.map((item, index) => (
          <button
            aria-controls="sv-finder-panel"
            aria-selected={index === active}
            className="sv-finder__tab"
            id={`sv-finder-tab-${index}`}
            key={item.need}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            type="button"
          >
            <span className="sv-finder__radio" aria-hidden="true" />
            {item.need}
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`sv-finder-tab-${active}`}
        className="sv-finder__panel"
        id="sv-finder-panel"
        ref={panelRef}
        role="tabpanel"
      >
        <p className="sv-finder__label" data-finder-item>
          <Sparkles aria-hidden="true" />
          Our recommendation
        </p>
        <p className="sv-finder__note" data-finder-item>
          {guide.note}
        </p>

        <div className="sv-finder__picks">
          {guide.services.map((service) => (
            <Link className="sv-pick" data-finder-item href={`/services/${service.slug}`} key={service.slug}>
              <span className="sv-pick__media">
                <Image alt={service.image.alt} fill sizes="6rem" src={service.image.src} />
              </span>
              <span className="sv-pick__body">
                <strong>{service.title}</strong>
                <span>{service.headline}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="sv-pick__arrow" />
            </Link>
          ))}
        </div>

        <div data-finder-item>
          <Button href="/booking" size="md">
            Talk to us about this
            <ArrowRight aria-hidden="true" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
