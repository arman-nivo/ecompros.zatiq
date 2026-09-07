"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

import { horizontalLoop, type HorizontalLoop } from "@/components/pricing/horizontalLoop";
import type { ComputedPlanCard } from "@/lib/pricing";

type InfiniteCardCarouselProps = {
  ariaLabel: string;
  cards: readonly ComputedPlanCard[];
};

// Cards scale/fade the further their center sits from the carousel's
// center, giving the coverflow-style "focus" look at rest and while dragging.
//
// This must NOT touch the elements horizontalLoop itself owns (`items`):
// that engine reads each item's live scaleX on every drag press to compute
// loop distances, so mutating scale on those same nodes feeds it garbage
// and sends cards flying off-screen. `cards` here are separate inner
// elements the loop never measures or transforms.
function updateProximity(items: HTMLElement[], cards: HTMLElement[], container: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width === 0) return;

  const centerX = containerRect.left + containerRect.width / 2;
  const halfWidth = containerRect.width / 2;

  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const distance = gsap.utils.clamp(0, 1.4, Math.abs(itemCenterX - centerX) / halfWidth);
    const scale = gsap.utils.mapRange(0, 1.4, 1, 0.66, distance);
    const opacity = gsap.utils.mapRange(0, 1.4, 1, 0.32, distance);
    const glow = gsap.utils.mapRange(0, 1.4, 1, 0.12, distance);

    gsap.set(cards[i], { "--card-glow": glow, opacity, scale });
  });
}

export default function InfiniteCardCarousel({ ariaLabel, cards }: InfiniteCardCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HorizontalLoop | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const items = Array.from(track.children) as HTMLElement[];
    if (items.length < 2) return;

    const cardEls = items.map((item) => item.firstElementChild as HTMLElement);

    const loop = horizontalLoop(items, {
      autoPlay: false,
      draggable: true,
      paddingRight: 24,
      speed: 0.65,
    });
    loopRef.current = loop;

    const runUpdate = () => updateProximity(items, cardEls, viewport);
    loop.timeline.eventCallback("onUpdate", runUpdate);
    runUpdate();

    return () => {
      loopRef.current = null;
      loop.timeline.eventCallback("onUpdate", null);
      loop.kill();
      gsap.set(items, { clearProps: "x,xPercent" });
      gsap.set(cardEls, { clearProps: "scale,opacity" });
    };
  }, [cards]);

  return (
    <div className="pricing-carousel-wrap">
      <div aria-label={ariaLabel} className="pricing-carousel" ref={viewportRef}>
        <div className="pricing-carousel__track" ref={trackRef}>
          {cards.map((card, index) => (
            <div className="pricing-carousel__item" key={card.key}>
              <article className="pricing-card">
                <span className="pricing-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pricing-card__name">{card.name}</span>
                <span className="pricing-card__body">
                  <span className="pricing-card__price">
                    {card.price}
                   
                  </span>
                  <span className="pricing-card__cap">{card.orderCapLabel}</span>
                </span>
                <Link className="pricing-card__cta" href="/booking">
                  Choose plan
                  <ArrowRight aria-hidden="true" size={14} />
                </Link>
                <span aria-hidden="true" className="pricing-card__name pricing-card__name--mirror">
                  {card.name}
                </span>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="pricing-carousel__nav">
        <button
          aria-label="Previous plan"
          className="pricing-carousel__nav-btn"
          onClick={() => loopRef.current?.previous({ duration: 0.6, ease: "power3.out" })}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={18} />
          Previous
        </button>
        <button
          aria-label="Next plan"
          className="pricing-carousel__nav-btn"
          onClick={() => loopRef.current?.next({ duration: 0.6, ease: "power3.out" })}
          type="button"
        >
          Next
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}
