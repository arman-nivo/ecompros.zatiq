"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconMovie,
  IconPalette,
  IconShieldCheck,
  IconSpeakerphone,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import type { ComponentType } from "react";

import { services, type ServiceSlug } from "@/lib/services";

type ServiceIcon = ComponentType<{
  "aria-hidden"?: boolean;
  className?: string;
  size?: number;
}>;

const serviceIcons: Partial<Record<ServiceSlug, ServiceIcon>> = {
  "brand-ready-systems": IconPalette,
  "cybersecurity-helper": IconShieldCheck,
  "e-commerce-virtual-assistant": IconShoppingCart,
  "marketing-branding-seo": IconSpeakerphone,
  "motion-video-design": IconMovie,
};

const serviceImages: Partial<Record<ServiceSlug, string>> = {
  "brand-ready-systems": "/services/Brand-ready-system.jpeg",
  "cybersecurity-helper": "/services/cybersecurity-helper.jpeg",
  "e-commerce-virtual-assistant": "/services/virtual-assistant.jpeg",
  "marketing-branding-seo": "/services/marketing-branding-seo.jpeg",
  "motion-video-design": "/services/motion-video-design.jpeg",
};

export default function ServicesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const Icon = serviceIcons[activeService.slug] ?? IconShoppingCart;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % services.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + services.length) % services.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % services.length);
  };

  return (
    <div className="home-services-slider" aria-label="Services carousel">
      <div className="home-services-slide" aria-live="polite">
        <div className="home-services-slide__content">
          <span className="home-service-card__top">
            <span className="home-service-card__icon">
              <Icon aria-hidden={true} className="home-service-card__svg" size={24} />
            </span>
            <span className="home-service-card__count">
              {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </span>
          </span>
          <p className="home-services-slide__eyebrow">{activeService.shortTitle}</p>
          <h3 className="home-service-card__title">{activeService.title}</h3>
          <p className="home-service-card__description">{activeService.homeDescription}</p>
          <Link className="home-service-card__action" href={`/services/${activeService.slug}`}>
            View details <IconArrowRight aria-hidden={true} size={17} />
          </Link>
        </div>
        <div className="home-services-slide__media">
          <Image
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 639px) 100vw, 50vw"
            src={serviceImages[activeService.slug] ?? "/services/virtual-assistant.jpeg"}
            alt={`${activeService.title} service preview`}
          />
        </div>
      </div>
      <div className="home-services-slider__controls">
        <div className="home-services-slider__dots" role="tablist" aria-label="Choose a service">
          {services.map((service, index) => (
            <button
              key={service.slug}
              aria-label={`Show ${service.title}`}
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "is-active" : undefined}
              role="tab"
              type="button"
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className="home-services-slider__arrows">
          <button aria-label="Previous service" type="button" onClick={showPrevious}>
            <IconArrowLeft aria-hidden={true} size={18} />
          </button>
          <button aria-label="Next service" type="button" onClick={showNext}>
            <IconArrowRight aria-hidden={true} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
