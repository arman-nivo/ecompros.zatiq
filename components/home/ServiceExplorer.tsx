"use client";

import gsap from "gsap";
import { ArrowRight, ArrowUpRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import ServiceIcon from "@/components/services/ServiceIcon";
import Button from "@/components/ui/Button";
import type { ServiceSlug } from "@/lib/services";

export type ExplorerService = {
  capabilityCount: number;
  headline: string;
  image: { alt: string; src: string };
  points: readonly string[];
  shortTitle: string;
  slug: ServiceSlug;
  summary: string;
  title: string;
};

/**
 * Tabbed overview of every service: pick one on the left, see what it covers on the right.
 * Arrow keys move between tabs; the panel content animates in on change.
 */
export default function ServiceExplorer({ services }: { services: ExplorerService[] }) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstRender = useRef(true);
  const service = services[active];

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const panel = panelRef.current;

    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeline = gsap.timeline();
    timeline
      .fromTo(panel.querySelector("[data-explorer-media]"), { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, duration: 0.6, ease: "power3.out", scale: 1 })
      .fromTo(
        panel.querySelectorAll("[data-explorer-item]"),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, duration: 0.45, ease: "power3.out", stagger: 0.06, y: 0 },
        0.05,
      );

    return () => {
      timeline.kill();
    };
  }, [active]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1 };
    const step = keys[event.key];

    if (!step) {
      return;
    }

    event.preventDefault();
    const next = (index + step + services.length) % services.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="hm-explorer">
      <div aria-label="Our services" className="hm-explorer__tabs" role="tablist">
        {services.map((item, index) => (
          <button
            aria-controls="hm-explorer-panel"
            aria-selected={index === active}
            className="hm-explorer__tab"
            id={`hm-explorer-tab-${index}`}
            key={item.slug}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            type="button"
          >
            <span className="hm-explorer__tab-icon">
              <ServiceIcon aria-hidden="true" slug={item.slug} />
            </span>
            <span className="hm-explorer__tab-text">
              <strong>{item.title}</strong>
              <small>{item.headline}</small>
            </span>
            <ArrowRight aria-hidden="true" className="hm-explorer__tab-arrow" />
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`hm-explorer-tab-${active}`}
        className="hm-explorer__panel"
        id="hm-explorer-panel"
        ref={panelRef}
        role="tabpanel"
      >
        <div className="hm-explorer__media" data-explorer-media>
          <Image
            alt={service.image.alt}
            fill
            key={service.image.src}
            sizes="(min-width: 64rem) 44rem, 100vw"
            src={service.image.src}
          />
          <span className="hm-explorer__badge">
            <ServiceIcon aria-hidden="true" slug={service.slug} />
            {service.capabilityCount} ways we help
          </span>
        </div>

        <div className="hm-explorer__body">
          <h3 data-explorer-item>{service.headline}</h3>
          <p data-explorer-item>{service.summary}</p>
          <ul className="hm-explorer__points" data-explorer-item>
            {service.points.map((point) => (
              <li key={point}>
                <CircleCheck aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="hm-explorer__actions" data-explorer-item>
            <Button href={`/services/${service.slug}`} size="md">
              Explore {service.shortTitle}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
            <Link className="hm-textlink" href="/services">
              All services
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
