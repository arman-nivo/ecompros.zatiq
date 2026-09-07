import { ArrowRight, Sparkles, Users, Workflow, type LucideIcon } from "lucide-react";
import Image from "next/image";

import HeroVideoScale from "@/components/motion/HeroVideoScale";
import Ferrofluid from "@/components/effects/Ferrofluid";
import RollingStats from "@/components/effects/RollingStats";
import ServicesSection from "@/components/ServicesSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollCinematics from "@/components/motion/ScrollCinematics";
import Button from "@/components/ui/Button";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";
import { portfolioProjects, portfolioTabs } from "@/lib/portfolio";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";

type Capability = {
  body: string;
  icon: LucideIcon;
  title: string;
};

type ProcessStep = {
  body: string;
  mark: string;
  title: string;
};

type ClientLogo = {
  height: number;
  name: string;
  src: string;
  width: number;
};

const processSteps: ProcessStep[] = [
  {
    mark: "Map",
    title: "Understand your store",
    body:
      "Review your ecommerce platform, product catalog, marketplaces, recurring tasks, access needs, and the work that needs attention first.",
  },
  {
    mark: "Set",
    title: "Set the daily workflow",
    body:
      "Agree on task priorities, update checklists, approval points, communication channels, and clear rules for escalating issues.",
  },
  {
    mark: "Run",
    title: "Run the operations",
    body:
      "Handle product uploads, catalog updates, marketplace work, order follow-up, customer messages, and other agreed store tasks consistently.",
  },
  {
    mark: "Report",
    title: "Keep the next action visible",
    body:
      "Share completed work, blockers, customer patterns, and next priorities so your team always knows what moved forward and what needs a decision.",
  },
];

const capabilities: Capability[] = [
  {
    icon: Users,
    title: "People",
    body: "Experienced ecommerce specialists providing human judgment, communication and execution.",
  },
  {
    icon: Workflow,
    title: "Automation",
    body: "Efficient workflows that streamline repetitive operations and keep your business moving.",
  },
  {
    icon: Sparkles,
    title: "AI",
    body: "Smarter tools, content and processes that help your ecommerce operation work better.",
  },
];

const clientLogos: ClientLogo[] = [
  {
    name: "Instaheadshots",
    src: "/clients/Instaheadshots.png",
    width: 2412,
    height: 960,
  },
  {
    name: "Ultra",
    src: "/clients/Ultra.png",
    width: 2816,
    height: 628,
  },
  {
    name: "Zest",
    src: "/clients/Zest.png",
    width: 880,
    height: 196,
  },
  {
    name: "Deos",
    src: "/clients/deos.png",
    width: 2296,
    height: 1024,
  },
  {
    name: "OnePlateMeal",
    src: "/clients/one%20plate%20meal.png",
    width: 500,
    height: 500,
  },
  {
    name: "Solarstock",
    src: "/clients/solarstock.png",
    width: 8812,
    height: 1736,
  },
  {
    name: "TapCon",
    src: "/clients/tapcon.png",
    width: 611,
    height: 725,
  },
  {
    name: "vidIQ",
    src: "/clients/vidiq.png",
    width: 3200,
    height: 1344,
  },
];

const clientLogoMarqueeGroups = ["primary", "duplicate"] as const;

export default function Home() {
  return (
    <div className="page-shell">
      <ScrollCinematics />
      <section
          className="hero-showcase"
        aria-labelledby="hero-title"
        data-hero-video-scale
        data-video-state="paused"
      >
        <HeroVideoScale />
        <div className="hero-showcase__bg">
          <Ferrofluid
            colors={["#EB461D", "#EB461D", "#EB461D"]}
            speed={0.3}
            scale={1.6}
            turbulence={0.8}
            fluidity={0.15}
            rimWidth={0.25}
            sharpness={2.5}
            shimmer={1.5}
            glow={1.5}
            flowDirection="down"
            opacity={0.5}
            mouseInteraction={true}
            mouseStrength={0.8}
            mouseRadius={0.4}
            mouseDampening={0.15}
          />
        </div>
        <div className="hero-showcase__sticky">
          <div className="hero-showcase__copy">
            <p className="hero-showcase__eyebrow" data-cinematic="rise">
              HUMAN-POWERED ECOMMERCE OPERATIONS. 24/7.
            </p>
            <h1 className="hero-showcase__title" data-cinematic="clip" id="hero-title">
              Great Ecommerce Has Great People Behind It.
            </h1>
            <p className="hero-showcase__text" data-cinematic="rise" data-cinematic-delay="1">
              A dedicated ecommerce team handling your operations, customer support,
              creative, marketing and technology — powered by people, automation and AI.
            </p>
            <RollingStats />
            <div
              className="hero-showcase__actions"
              data-cinematic="rise"
              data-cinematic-delay="2"
            >
              <Button href="/pricing" size="lg">
                Explore Plans
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
            </div>
          </div>

          <div className="hero-showcase__media-area">
            <div className="hero-showcase__media">
              <span className="hero-showcase__play-indicator" aria-hidden="true" />
              <video
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="hero-showcase__video"
                data-desktop-src="/assets/F6.mp4"
                data-mobile-src="/assets/F4_MOBILE.MP4"
              >
                <source
                  media="(max-width: 39.99rem)"
                  src="/assets/F4_MOBILE.MP4"
                  type="video/mp4"
                />
                <source src="/assets/F6.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="section__inner section__inner--wide">
          <div className="section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Services
              </p>
              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="services-title"
              >
                Everything your ecommerce business needs to grow.
              </h2>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              One practical partner for catalog management, marketplace
              operations, order fulfillment, customer care, marketing, and
              ecommerce development.
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      <ServicesSection />

      <section
        className="section"
        id="difference"
        aria-labelledby="difference-title"
      >
        <div className="section__inner section__inner--wide">

          <div className="section__head">
            <div>
              <p
                className="section__label"
                data-cinematic="rise"
              >
                The Difference
              </p>

              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="difference-title"
              >
                People + Technology.
                <br />
                Working Together.
              </h2>
            </div>

            <p
              className="section__copy"
              data-cinematic="rise"
              data-cinematic-delay="2"
            >
              EcomPros combines experienced ecommerce specialists with
              automation and AI to make your operations faster, smarter
              and more responsive.
            </p>
          </div>

          <div
            className="capability-list"
            data-cinematic="rise"
            data-cinematic-delay="3"
          >
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  className="capability-item"
                  key={capability.title}
                >
                  <span className="capability-item__icon">
                    <Icon
                      aria-hidden={true}
                      size={20}
                    />
                  </span>

                  <div className="capability-item__content">
                    <h3>{capability.title}</h3>
                    <p>{capability.body}</p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>


      <section
        className="section portfolio-preview"
        id="portfolio-preview"
        aria-labelledby="portfolio-preview-title"
      >
        <div className="section__inner section__inner--wide">
          <div className="section__head portfolio-preview__head">
            <div>
              <h2
                className="section__title"
                data-cinematic="clip"
                id="portfolio-preview-title"
              >
                Working systems, not placeholder case studies.
              </h2>
            </div>
            <div className="portfolio-preview__intro" data-cinematic="rise" data-cinematic-delay="2">
              <p className="section__copy">
                From marketplace operations and customer support to storefronts,
                creative work, and growth, explore the services that keep your
                ecommerce business moving.
              </p>
              <Button href="/portfolio" size="sm" variant="secondary">
                View portfolio
                <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </div>
          </div>

          <PortfolioPreview projects={portfolioProjects} tabs={portfolioTabs} />
        </div>
      </section>



      <section className="section section--tight client-section" id="proof" aria-labelledby="proof-title">
        <div className="section__inner section__inner--wide">
          <div className="section__head client-section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Client logos
              </p>
              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="proof-title"
              >
                Client marks, carried as proof.
              </h2>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              The strip uses the logos currently supplied in the project, without
              inventing quotes, metrics, or case-study claims.
            </p>
          </div>

          <div className="client-proof">
            <p className="client-proof__eyebrow">Already Powering Ecommerce Worldwide.</p>
            <div className="client-proof__grid">
              <div className="client-proof__item">
                <span className="client-proof__value">1,000+</span>
                <span className="client-proof__label">Clients</span>
              </div>
              <div className="client-proof__item">
                <span className="client-proof__value">6+</span>
                <span className="client-proof__label">Countries</span>
              </div>
              <div className="client-proof__item">
                <span className="client-proof__value">4M+</span>
                <span className="client-proof__label">Annual Orders Processed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="client-marquee" aria-label="Client logos" data-cinematic="rise" data-cinematic-delay="3">
          <ul className="client-marquee__sr-list">
            {clientLogos.map((client) => (
              <li key={client.name}>{client.name}</li>
            ))}
          </ul>

          <div className="client-marquee__viewport" aria-label="Client logo strip" tabIndex={0}>
            <div className="client-marquee__track" aria-hidden="true">
              {clientLogoMarqueeGroups.map((group) => (
                <div className="client-marquee__group" key={group}>
                  {clientLogos.map((client) => (
                    <figure className="client-marquee__item" key={`${group}-${client.name}`}>
                      <Image
                        alt=""
                        className="client-marquee__image"
                        draggable={false}
                        height={client.height}
                        loading={group === "primary" ? "eager" : "lazy"}
                        sizes="(max-width: 639px) 9rem, 11rem"
                        src={client.src}
                        width={client.width}
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="section section--tight" id="process" aria-labelledby="process-title">
        <div className="section__inner">
          <div className="section__head">
            <div>
              {/* <p className="section__label" data-cinematic="rise">
                Process
              </p> */}
              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="process-title"
              >
                From store backlog to steady operations.
              </h2>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              Our virtual assistant process is designed for ecommerce teams that
              need reliable execution, clear communication, and fewer daily tasks
              competing for the founder&apos;s attention.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article
                className="process-step"
                data-cinematic="rise"
                data-cinematic-delay={`${index + 1}`}
                key={step.title}
              >
                <span className="process-step__mark">{step.mark}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      

      <section className="pricing-cta section section--tight" id="final-cta" aria-labelledby="final-cta-title">
        <div className="section__inner pricing-cta__inner">
          <div className="pricing-cta__copy" data-cinematic="rise">
            {/* <p className="section__label">Human-powered ecommerce operations. 24/7.</p> */}
            <h2 className="section__title" id="final-cta-title">
              Focus on Growing Your Business.
            </h2>
            <p className="section__copy">
              Leave the day-to-day ecommerce operation to a team that&apos;s ready to
              keep things moving, around the clock.
            </p>
          </div>

          <div className="pricing-cta__action" data-cinematic="rise" data-cinematic-delay="2">
            <Button href="/booking" size="lg">
              Explore Plans
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          </div>
        </div>
      </section>

      
      <TestimonialCarousel />

    </div>
  );
}
