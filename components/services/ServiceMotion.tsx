"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/**
 * Scroll-driven motion for the services pages. Markup opts in with data attributes:
 *
 * - data-reveal          fades and lifts in when scrolled into view (batched + staggered)
 * - data-parallax="12"   drifts vertically while its frame crosses the viewport
 * - data-float           gently bobs forever (floating hero cards)
 * - data-count="1000"    counts up from zero the first time it is seen
 * - data-progress        fills its line and lights up [data-progress-step] children as you scroll
 *
 * Without JavaScript, or with reduced motion, everything renders in its final state.
 */
export default function ServiceMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      gsap.set(reveals, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(reveals, {
        once: true,
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
            stagger: 0.08,
            y: 0,
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const amount = Number(element.dataset.parallax) || 10;

        gsap.fromTo(
          element,
          { yPercent: -amount / 2 },
          {
            ease: "none",
            yPercent: amount / 2,
            scrollTrigger: {
              end: "bottom top",
              scrub: true,
              start: "top bottom",
              trigger: element.parentElement ?? element,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((element, index) => {
        gsap.to(element, {
          delay: index * 0.35,
          duration: 2.6 + index * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          y: -10,
          yoyo: true,
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const end = Number(element.dataset.count) || 0;
        const counter = { value: 0 };

        element.textContent = "0";
        ScrollTrigger.create({
          once: true,
          start: "top 92%",
          trigger: element,
          onEnter: () =>
            gsap.to(counter, {
              duration: 1.6,
              ease: "power2.out",
              value: end,
              onUpdate: () => {
                element.textContent = Math.round(counter.value).toLocaleString("en-US");
              },
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((track) => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-progress-step]", track);

        track.dataset.progressReady = "";
        track.style.setProperty("--progress", "0");

        ScrollTrigger.create({
          end: "bottom 55%",
          scrub: 0.6,
          start: "top 75%",
          trigger: track,
          onUpdate: ({ progress }) => {
            track.style.setProperty("--progress", progress.toFixed(3));
            steps.forEach((step, index) => {
              const threshold = steps.length > 1 ? index / (steps.length - 1) : 0;
              step.classList.toggle("is-active", progress >= threshold * 0.96);
            });
          },
        });
      });

      return () => {
        document.querySelectorAll<HTMLElement>("[data-progress]").forEach((track) => {
          delete track.dataset.progressReady;
          track.style.removeProperty("--progress");
        });
      };
    });

    // Images and fonts can shift layout after hydration; recompute trigger positions once settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
