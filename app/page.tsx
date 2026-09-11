import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  ClipboardList,
  Clock,
  Layers,
  LineChart,
  PackageCheck,
  Rocket,
  Star,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import CompareToggle from "@/components/home/CompareToggle";
import ServiceExplorer, { type ExplorerService } from "@/components/home/ServiceExplorer";
import TaskPicker from "@/components/home/TaskPicker";
import "@/components/services/service-pages.css";
import "@/components/home/home.css";
import "@/components/pricing/pricing.css";
import Ferrofluid from "@/components/effects/Ferrofluid";
import RollingStats from "@/components/effects/RollingStats";
import HeroVideoScale from "@/components/motion/HeroVideoScale";
import ScrollCinematics from "@/components/motion/ScrollCinematics";
import { departmentIcons } from "@/components/pricing/departmentIcons";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";
import ServiceMotion from "@/components/services/ServiceMotion";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import Button from "@/components/ui/Button";
import { companyStats } from "@/lib/company";
import { portfolioProjects, portfolioTabs } from "@/lib/portfolio";
import { departments, formatPrice, monthlyPlans, recommendedPlanIndex } from "@/lib/pricing";
import { services } from "@/lib/services";

type ClientLogo = {
  height: number;
  name: string;
  src: string;
  width: number;
};

type Reason = {
  body: string;
  icon: LucideIcon;
  title: string;
};

const clientLogos: ClientLogo[] = [
  { name: "Instaheadshots", src: "/clients/Instaheadshots.png", width: 2412, height: 960 },
  { name: "Ultra", src: "/clients/Ultra.png", width: 2816, height: 628 },
  { name: "Zest", src: "/clients/Zest.png", width: 880, height: 196 },
  { name: "Deos", src: "/clients/deos.png", width: 2296, height: 1024 },
  { name: "OnePlateMeal", src: "/clients/one%20plate%20meal.png", width: 500, height: 500 },
  { name: "Solarstock", src: "/clients/solarstock.png", width: 8812, height: 1736 },
  { name: "TapCon", src: "/clients/tapcon.png", width: 611, height: 725 },
  { name: "vidIQ", src: "/clients/vidiq.png", width: 3200, height: 1344 },
];

const clientLogoMarqueeGroups = ["primary", "duplicate"] as const;

const reasons: Reason[] = [
  {
    icon: PackageCheck,
    title: "Ecommerce specialists",
    body: "Online stores are all we do. We already know Shopify, Amazon, Etsy, Walmart, and the tools around them.",
  },
  {
    icon: Layers,
    title: "One team for everything",
    body: "Operations, creative, marketing, and tech under one plan, with one person to talk to.",
  },
  {
    icon: Clock,
    title: "Open 24/7",
    body: "Orders and customer messages are handled around the clock, so nothing waits for Monday.",
  },
  {
    icon: Bot,
    title: "People, automation, and AI",
    body: "Experienced people make the calls. Workflows and AI tools make the repetitive work faster.",
  },
];

const steps = [
  { icon: CalendarCheck, title: "Book a call", body: "Tell us about your store, your platforms, and what is slowing you down." },
  { icon: ClipboardList, title: "Get your plan", body: "We map the tasks, pick the right plan, and agree how we report back." },
  { icon: Rocket, title: "We get to work", body: "Your team starts on the daily work with one point of contact." },
  { icon: LineChart, title: "Review and grow", body: "A weekly report shows what is done, what is next, and where to improve." },
];

const homeFaqs = [
  {
    question: "What does EcomPros do?",
    answer:
      "We run the day-to-day work of online stores: orders, customer support, product listings, design and video, marketing and SEO, and store technology. You choose the departments you need.",
  },
  {
    question: "How much does it cost?",
    answer: `Plans start at ${formatPrice(monthlyPlans[0].monthlyPrice)} a month for store operations and go up to ${formatPrice(
      monthlyPlans[monthlyPlans.length - 1].monthlyPrice,
    )} a month for a complete ecommerce team, including tech. Every plan covers up to 30,000 orders a month.`,
  },
  {
    question: "Which platforms do you work with?",
    answer:
      "Shopify, Amazon, Etsy, Walmart, and the tools around them, such as Google Sheets, Gmail, WhatsApp, Meta, and Google Analytics.",
  },
  {
    question: "Do I need to hire or manage anyone?",
    answer:
      "No. We provide and manage the team. You get one point of contact, updates on WhatsApp or email, and a weekly report.",
  },
  {
    question: "Can I start small?",
    answer:
      "Yes. You can start with a short list of virtual assistant tasks on the Operations plan, then add creative, marketing, or tech support when they are ready.",
  },
];

function delay(index: number) {
  return { "--i": index } as CSSProperties;
}

export default function Home() {
  const explorerServices: ExplorerService[] = services.map((service) => ({
    capabilityCount: service.capabilities.length,
    headline: service.headline,
    image: service.image,
    points: service.heroPoints ?? service.deliverables.slice(0, 3),
    shortTitle: service.shortTitle,
    slug: service.slug,
    summary: service.summary,
    title: service.title,
  }));

  return (
    <div className="page-shell sv-page hm-page">
      <ScrollCinematics />
      <ServiceMotion />

      <section
        aria-labelledby="hero-title"
        className="hero-showcase"
        data-hero-video-scale
        data-video-state="paused"
      >
        <HeroVideoScale />
        <div className="hero-showcase__bg">
          <Ferrofluid
            colors={["#EB461D", "#EB461D", "#EB461D"]}
            flowDirection="down"
            fluidity={0.15}
            glow={1.5}
            mouseDampening={0.15}
            mouseInteraction={true}
            mouseRadius={0.4}
            mouseStrength={0.8}
            opacity={0.5}
            rimWidth={0.25}
            scale={1.6}
            sharpness={2.5}
            shimmer={1.5}
            speed={0.3}
            turbulence={0.8}
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
            <div className="hero-showcase__actions" data-cinematic="rise" data-cinematic-delay="2">
              <Button href="/booking" size="lg">
                Book a call
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Button href="/pricing" size="lg" variant="secondary">
                See pricing
              </Button>
            </div>
            <p className="hm-hero-trust" data-cinematic="rise" data-cinematic-delay="3">
              <span aria-hidden="true" className="sv-stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} />
                ))}
              </span>
              <span>
                <strong>5.0</strong> client rating · Plans from <strong>{formatPrice(monthlyPlans[0].monthlyPrice)}/month</strong>
              </span>
            </p>
          </div>

          <div className="hero-showcase__media-area">
            <div className="hero-showcase__media">
              <span aria-hidden="true" className="hero-showcase__play-indicator" />
              <video
                aria-hidden="true"
                className="hero-showcase__video"
                data-desktop-src="/assets/F6.mp4"
                data-mobile-src="/assets/F4_MOBILE.MP4"
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source media="(max-width: 39.99rem)" src="/assets/F4_MOBILE.MP4" type="video/mp4" />
                <source src="/assets/F6.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="clients-title" className="hm-clients">
        <p className="hm-clients__title" id="clients-title">
          Trusted by <strong>1,000+ ecommerce brands</strong> in 6+ countries
        </p>
        <div aria-label="Client logos" className="client-marquee">
          <ul className="client-marquee__sr-list">
            {clientLogos.map((client) => (
              <li key={client.name}>{client.name}</li>
            ))}
          </ul>

          <div aria-label="Client logo strip" className="client-marquee__viewport" tabIndex={0}>
            <div aria-hidden="true" className="client-marquee__track">
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

      <section aria-labelledby="services-title" className="sv-section" id="services">
        <div className="sv-container">
          <div className="sv-head hm-head-split" data-reveal>
            <div>
              <p className="sv-kicker">What we do</p>
              <h2 className="sv-title" id="services-title">
                Everything your online store needs, <span className="sv-accent">in one team.</span>
              </h2>
            </div>
            <p className="sv-lead">
              Pick a service to see what it covers. Use one on its own, or combine them in a
              single monthly plan.
            </p>
          </div>
          <div data-reveal>
            <ServiceExplorer services={explorerServices} />
          </div>
        </div>
      </section>

      <section aria-labelledby="va-title" className="sv-section sv-section--tint" id="virtual-assistant">
        <div className="sv-container">
          <div className="sv-head hm-head-split" data-reveal>
            <div>
              <p className="sv-kicker">Virtual assistant</p>
              <h2 className="sv-title" id="va-title">
                What would you hand off first?
              </h2>
            </div>
            <p className="sv-lead">
              Tap the tasks that take up your week. We will build your assistant&apos;s daily
              routine around your list, and you can send it with your booking.
            </p>
          </div>
          <div data-reveal>
            <TaskPicker />
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title" className="sv-section portfolio-preview" id="portfolio-preview">
        <div className="sv-container">
          <div className="sv-head hm-head-split" data-reveal>
            <div>
              <p className="sv-kicker">Our work</p>
              <h2 className="sv-title" id="work-title">
                Real work for real ecommerce brands.
              </h2>
            </div>
            <div className="hm-head-split__aside">
              <p className="sv-lead">
                Product videos, marketing campaigns, and store operations we have delivered.
                Pick a category to explore.
              </p>
              <Button href="/portfolio" size="sm" variant="secondary">
                View full portfolio
                <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="section__inner section__inner--wide">
          <PortfolioPreview projects={portfolioProjects} tabs={portfolioTabs} />
        </div>
      </section>

      <section aria-labelledby="why-title" className="sv-section sv-section--tint" id="why">
        <div className="sv-container hm-why">
          <div className="hm-why__copy">
            <div className="sv-head" data-reveal>
              <p className="sv-kicker">Why EcomPros</p>
              <h2 className="sv-title" id="why-title">
                A whole ecommerce team, without the hiring.
              </h2>
            </div>
            <ul className="sv-reasons">
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <li data-reveal key={reason.title}>
                    <span className="sv-reasons__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{reason.title}</strong>
                      <span>{reason.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div data-reveal>
            <CompareToggle />
          </div>
        </div>

        <div className="sv-container">
          <dl className="sv-stats sv-stats--band hm-why__stats">
            {companyStats.map((stat) => (
              <div data-reveal key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  <span data-count={stat.value}>{stat.value.toLocaleString("en-US")}</span>
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="process-title" className="sv-section" id="process">
        <div className="sv-container">
          <div className="sv-head sv-head--center" data-reveal>
            <p className="sv-kicker">How it works</p>
            <h2 className="sv-title" id="process-title">
              Up and running in four simple steps.
            </h2>
          </div>

          <ol className="sv-steps" data-progress style={{ "--steps": steps.length } as CSSProperties}>
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li className="sv-step" data-progress-step key={step.title}>
                  <span className="sv-step__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="sv-step__number">Step {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="plans-title" className="sv-section sv-section--tint" id="plans">
        <div className="sv-container">
          <div className="sv-head hm-head-split" data-reveal>
            <div>
              <p className="sv-kicker">Pricing</p>
              <h2 className="sv-title" id="plans-title">
                Simple monthly plans. Add departments as you grow.
              </h2>
            </div>
            <div className="hm-head-split__aside">
              <p className="sv-lead">
                Every plan includes one point of contact, 24/7 coverage, weekly reports, and up
                to 30,000 orders a month.
              </p>
              <Button href="/pricing" size="sm" variant="secondary">
                Compare all plans
                <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </div>
          </div>

          <ol className="hm-plans">
            {monthlyPlans.map((plan, index) => (
              <li
                className={index === recommendedPlanIndex ? "hm-plan hm-plan--on" : "hm-plan"}
                data-reveal
                key={plan.name}
                style={delay(index)}
              >
                {index === recommendedPlanIndex ? <span className="hm-plan__badge">Recommended</span> : null}
                <span className="hm-plan__depts">
                  {departments.map((department) => {
                    const Icon = departmentIcons[department.id];

                    return (
                      <span
                        className={plan.departments.includes(department.id) ? "pp-dept pp-dept--on" : "pp-dept"}
                        key={department.id}
                        title={department.label}
                      >
                        <Icon aria-hidden="true" />
                      </span>
                    );
                  })}
                </span>
                <strong className="hm-plan__name">{plan.displayName}</strong>
                <span className="hm-plan__tagline">{plan.tagline}</span>
                <span className="hm-plan__price">
                  <strong>{formatPrice(plan.monthlyPrice)}</strong>/month
                </span>
                <Link className="hm-textlink" href="/pricing#plans">
                  See what is included
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TestimonialCarousel />

      <section aria-labelledby="faq-title" className="sv-section" id="faq">
        <div className="sv-container sv-faq">
          <div className="sv-faq__intro" data-reveal>
            <p className="sv-kicker">FAQ</p>
            <h2 className="sv-title" id="faq-title">
              Questions we hear a lot.
            </h2>
            <div className="sv-help">
              <strong>Still have a question?</strong>
              <span>Message us and we will get back to you.</span>
              <Link className="sv-whatsapp" href="/whatsapp" prefetch={false} rel="noopener noreferrer" target="_blank">
                <IconBrandWhatsapp aria-hidden="true" />
                Chat on WhatsApp
              </Link>
            </div>
          </div>

          <div className="sv-accordion">
            {homeFaqs.map((faq, index) => (
              <details data-reveal key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-title" className="sv-section sv-section--flush">
        <div className="sv-container">
          <div className="sv-cta" data-reveal>
            <div className="sv-cta__copy">
              <h2 id="final-cta-title">Focus on growing. We will run the rest.</h2>
              <p>
                Tell us about your store and we will reply with a clear plan, the right team, and
                the price.
              </p>
            </div>
            <div className="sv-cta__actions">
              <Button href="/booking" size="lg">
                Book a call
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Link className="sv-whatsapp sv-whatsapp--light" href="/whatsapp" prefetch={false} rel="noopener noreferrer" target="_blank">
                <IconBrandWhatsapp aria-hidden="true" />
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
