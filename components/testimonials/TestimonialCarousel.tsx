"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { testimonials } from "@/data/Testimonials";
import TestimonialCard from "./TestimonialCard";
import styles from "./testimonial-carousel.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

// How many cards are visibly stacked behind the front card.
const STACK_DEPTH = 3;

function getPosition(index: number, frontIndex: number, total: number) {
  return (index - frontIndex + total) % total;
}

export default function TestimonialCarousel() {
  const [frontIndex, setFrontIndex] = useState(0);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const total = testimonials.length;

  const applyLayout = (front: number) => {
    testimonials.forEach((t, i) => {
      const el = cardRefs.current.get(t.id);
      if (!el) return;
      const pos = getPosition(i, front, total);
      el.style.setProperty("--pos", String(pos));
      el.style.zIndex = String(total - pos);
      el.style.visibility = pos > STACK_DEPTH ? "hidden" : "visible";
      el.style.pointerEvents = pos === 0 ? "auto" : "none";
    });
  };

  useLayoutEffect(() => {
    applyLayout(frontIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontIndex]);

  const animateTo = (nextIndex: number) => {
    if (nextIndex === frontIndex) return;
    const cards = Array.from(cardRefs.current.values());
    const state = Flip.getState(cards, { props: "zIndex,visibility" });

    flushSync(() => setFrontIndex(nextIndex));

    Flip.from(state, {
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.035,
      absolute: true,
    });
  };

  const step = (direction: 1 | -1) => {
    animateTo((frontIndex + direction + total) % total);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <section
      className={styles.wrap}
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <div className={styles.intro} style={{ marginBottom: "6rem" }} >
        <p className={styles.counter}>
          <span className={styles.counterCurrent}>
            {String(frontIndex + 1).padStart(2, "0")}
          </span>
          <span className={styles.counterDivider}>/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </p>
        <h2 className={styles.heading}>Client reviews</h2>
      </div>

      <div
        className={styles.stage}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-label="Review stack, use arrow keys to navigate"
      >
        {testimonials.map((t, i) => (
          <TestimonialCard 
            key={t.id}
            testimonial={t}
            isFront={i === frontIndex}
            depth={getPosition(i, frontIndex, total)}
            ref={(el) => {
              if (el) cardRefs.current.set(t.id, el);
              else cardRefs.current.delete(t.id);
            }}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.punchBtn}
          onClick={() => step(-1)}
          aria-label="Previous review"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M10 2 4 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={styles.dot}
              data-active={i === frontIndex}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => animateTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.punchBtn}
          onClick={() => step(1)}
          aria-label="Next review"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M6 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
