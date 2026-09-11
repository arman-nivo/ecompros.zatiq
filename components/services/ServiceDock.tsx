"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type DockSection = { id: string; label: string };

/**
 * Bottom "on this page" dock for a service page. It appears once the hero has scrolled
 * away, highlights the section in view, and hides again when the footer arrives.
 */
export default function ServiceDock({ sections }: { sections: DockSection[] }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const hero = document.querySelector("[data-dock-start]");
    const footer = document.querySelector("footer");
    const state = { pastHero: false, atFooter: false };

    const edgeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) {
          state.pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else {
          state.atFooter = entry.isIntersecting;
        }
      });
      setVisible(state.pastHero && !state.atFooter);
    });

    if (hero) edgeObserver.observe(hero);
    if (footer) edgeObserver.observe(footer);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => {
      edgeObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sv-dock" data-visible={visible || undefined} inert={!visible}>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a aria-current={active === section.id ? "true" : undefined} href={`#${section.id}`}>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
      <Link className="sv-dock__cta" href="/booking">
        Book this service
        <ArrowRight aria-hidden="true" />
      </Link>
    </nav>
  );
}
