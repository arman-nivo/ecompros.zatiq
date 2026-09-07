"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SERVICE_TABS, TAB_ICONS } from "./data";
import ServiceCard from "./ServiceCard";
import MagneticButton from "./MagneticButton";

const AmbientOrb = dynamic(() => import("./AmbientOrb"), { ssr: false });

const animateTextReplacement = (element: HTMLSpanElement | null, nextText: string) => {
  if (!element) return;

  gsap.timeline({ defaults: { ease: "power2.inOut" } })
    .to(element, {
      y: -12,
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        element.textContent = nextText;
      },
    })
    .fromTo(
      element,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.28,
        ease: "power3.out",
        clearProps: "transform, opacity",
      }
    );
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(SERVICE_TABS[0].id);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentGridRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabLabelRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const activeTabData =
    SERVICE_TABS.find((tab) => tab.id === activeTab) ?? SERVICE_TABS[0];

  // Entrance choreography: header fades up, left panel drops in from the
  // top, right panel rises in from below, cards stagger in once the
  // section crosses ~75% of the viewport.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(headerRef.current, { y: 28, opacity: 0, duration: 0.7 })
        .from(
          leftPanelRef.current,
          { y: -90, opacity: 0, duration: 0.9 },
          "-=0.35"
        )
        .from(
          rightPanelRef.current,
          { y: 90, opacity: 0, duration: 0.9 },
          "<0.12"
        )
        .from(
          gsap.utils.toArray(".service-card"),
          {
            y: 24,
            opacity: 0,
            duration: 0.55,
            stagger: 0.035,
            clearProps: "transform",
          },
          "-=0.55"
        );

      gsap.from(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 36,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate the active-tab pill to the selected button's position.
  useLayoutEffect(() => {
    const btn = tabButtonRefs.current[activeTab];
    const highlight = highlightRef.current;
    if (!btn || !highlight) return;

    gsap.to(highlight, {
      y: btn.offsetTop,
      height: btn.offsetHeight,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [activeTab]);

  // Re-run the card stagger whenever the tab content swaps.
  useEffect(() => {
    const list = contentGridRef.current;
    if (!list) return;

    const cards = list.querySelectorAll(".service-card");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      list,
      { opacity: 0, y: 10, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.42,
        clearProps: "filter, transform",
      }
    ).fromTo(
      cards,
      { opacity: 0, y: 16, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.52,
        stagger: 0.04,
        clearProps: "transform, opacity",
      },
      "-=0.18"
    );
  }, [activeTab]);

  useEffect(() => {
    const track = slideRef.current;
    if (!track) return;

    const checkOverflow = () => {
      setIsOverflowing(track.scrollWidth > track.clientWidth + 1);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(track);
    window.addEventListener("resize", checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [activeTab]);

  useLayoutEffect(() => {
    SERVICE_TABS.forEach((tab) => {
      const button = tabButtonRefs.current[tab.id];
      const label = tabLabelRefs.current[tab.id];
      if (!button || !label) return;

      const isActive = tab.id === activeTab;
      gsap.to(button, {
        x: isActive ? 0 : 0,
        opacity: isActive ? 1 : 0.8,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        label,
        { y: isActive ? 16 : 0, opacity: isActive ? 0 : 1, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
          clearProps: "filter",
        }
      );
    });
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="marketplace-operations"
      className="relative overflow-hidden bg-[var(--color-paper-2)] py-12 md:py-16"
    >
      <div className="relative mx-auto max-w-[1500px] px-2 md:px-6 lg:px-8">
        <header ref={headerRef} className="mb-10 max-w-4xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-soft)]">
            WHAT WE DO
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,4.5rem)] italic leading-[0.94] tracking-[-0.05em] text-[var(--color-ink)]">
            Your Ecommerce Team, Fully Taken Care Of.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[var(--color-ink-soft)] md:text-lg">
            Everything you need to keep your ecommerce business running and growing.
          </p>
        </header>

        <div className="grid grid-cols-1 overflow-hidden bg-transparent lg:grid-cols-[0.95fr_1.2fr]">
          <div
            ref={leftPanelRef}
            className="relative h-auto overflow-hidden rounded-[50px]  px-5 py-10 md:px-8 lg:px-10"
          >
            <AmbientOrb />
            <nav
              role="tablist"
              aria-label="Service categories"
              className="relative flex flex-col gap-2.5"
            >
              {SERVICE_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabButtonRefs.current[tab.id] = node;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveTab(tab.id);
                      const button = tabButtonRefs.current[tab.id];
                      const label = tabLabelRefs.current[tab.id];
                      if (!button || !label) return;

                      animateTextReplacement(label, tab.label);

                      gsap.fromTo(
                        button,
                        { scale: 0.99 },
                        {
                          scale: 1,
                          duration: 0.28,
                          ease: "power2.out",
                        }
                      );
                    }}
                    onMouseEnter={(event) => {
                      const target = event.currentTarget;
                      const label = tabLabelRefs.current[tab.id];
                      if (!label || target.getAttribute("aria-selected") === "true") return;

                      gsap.to(target, {
                        x: 6,
                        duration: 0.2,
                        ease: "power2.out",
                      });
                      gsap.to(label, {
                        x: 6,
                        duration: 0.2,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(event) => {
                      const target = event.currentTarget;
                      const label = tabLabelRefs.current[tab.id];
                      if (!label || target.getAttribute("aria-selected") === "true") return;

                      gsap.to(target, {
                        x: 0,
                        duration: 0.25,
                        ease: "power2.out",
                      });
                      gsap.to(label, {
                        x: 0,
                        duration: 0.25,
                        ease: "power2.out",
                      });
                    }}
                    className={`relative z-[1] w-full text-left font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-black transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      transformOrigin: "left center",
                    }}
                  >
                    <span
                      ref={(node) => {
                        tabLabelRefs.current[tab.id] = node;
                      }}
                      className="block text-[clamp(2.2rem,2.8vw,4.4rem)]"
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div ref={rightPanelRef} className=" px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
            <div className="max-w-[980px]">
              <div className="flex items-center gap-3 text-[var(--color-ink)]">
                <h3 className="font-serif text-[clamp(2rem,2.2vw,3rem)] italic leading-[1.15] tracking-[-0.04em]">
                  {activeTabData.label}
                </h3>
                <span className="font-serif text-[clamp(1.4rem,1.8vw,2.2rem)] italic leading-[1.15] text-[var(--color-ink)]">
                  :
                </span>
                <span className="font-serif text-[clamp(1.4rem,1.8vw,2.2rem)] italic leading-[1.15] text-[var(--color-ink)]">
                  {activeTabData.eyebrow.replace(/^\d+\s*[—-]\s*/, "")}
                </span>
              </div>

              {isOverflowing ? (
                <div
                  key={activeTab}
                  ref={(node) => {
                    slideRef.current = node;
                    contentGridRef.current = node;
                  }}
                  className="mt-8 flex min-w-full gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  style={{ scrollBehavior: "auto", scrollSnapType: "x proximity" }}
                >
                  {activeTabData.groups.flatMap((group) =>
                    group.items.map((item) => (
                      <div key={item.label} className="min-w-[15.5rem] flex-1 scroll-snap-align-start">
                        <ServiceCard item={item} />
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div
                  key={activeTab}
                  ref={(node) => {
                    contentGridRef.current = node;
                  }}
                  className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-2"
                >
                  {activeTabData.groups.flatMap((group) =>
                    group.items.map((item) => <ServiceCard key={item.label} item={item} />)
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          ref={bannerRef}
          className="relative mt-16 overflow-hidden rounded-3xl bg-[#111112] px-8 py-10 sm:px-12 sm:py-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-600/30 blur-[100px]"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[1.4rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.7rem]">
                Ready to hand off the operational load?
              </p>
              <p className="mt-2 max-w-md text-[14px] text-neutral-400">
                Tell us which channels you&apos;re on — we&apos;ll map out where we can
                save your team the most time this month.
              </p>
            </div>
            <MagneticButton href="booking" className="shrink-0">
              Talk to our team
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
