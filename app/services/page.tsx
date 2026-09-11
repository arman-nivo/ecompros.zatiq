import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ClipboardList,
  Layers,
  LineChart,
  PackageCheck,
  Rocket,
  Star,
  UsersRound,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import NeedFinder, { type NeedFinderGuide } from "@/components/services/NeedFinder";
import PlatformMarquee from "@/components/services/PlatformMarquee";
import ServiceMotion from "@/components/services/ServiceMotion";
import ServiceIcon from "@/components/services/ServiceIcon";
import "@/components/services/service-pages.css";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { companyStats, platformTools } from "@/lib/company";
import {
  combinedEngagements,
  getServiceLinks,
  serviceDecisionGuides,
  services,
  servicesFaqs,
} from "@/lib/services";

const pageTitle = "Ecommerce Services | EcomPros";
const pageDescription =
  "Ecommerce virtual assistants, marketing and SEO, brand systems, motion video, and account security for online stores. One team, planned together.";
const heroImage = "/services/photos/services-hero.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/services",
    siteName: brand.name,
    images: [
      {
        url: heroImage,
        width: 1600,
        height: 1200,
        alt: "Ecommerce operations team handling customer chats, product listings, and order packing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImage],
  },
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a call",
    body: "Tell us about your store, the platforms you sell on, and what is slowing you down.",
  },
  {
    icon: ClipboardList,
    title: "Get a clear plan",
    body: "We map the tasks, priorities, and timeline, and agree how we will report back.",
  },
  {
    icon: Rocket,
    title: "We get to work",
    body: "The work runs day to day with one point of contact who knows your store.",
  },
  {
    icon: LineChart,
    title: "Review and grow",
    body: "Regular updates on what is done, what is next, and where to improve.",
  },
];

const reasons = [
  {
    icon: PackageCheck,
    title: "Ecommerce specialists",
    body: "We work inside Shopify, Amazon, Etsy, Walmart, and the tools you already use.",
  },
  {
    icon: Layers,
    title: "One team, many skills",
    body: "Operations, marketing, design, video, and security, planned as one track.",
  },
  {
    icon: UsersRound,
    title: "Clear communication",
    body: "Updates by email or WhatsApp, so you always know what was done and what comes next.",
  },
];

function delay(index: number) {
  return { "--i": index } as CSSProperties;
}

function Rating() {
  return (
    <span aria-hidden="true" className="sv-stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} />
      ))}
    </span>
  );
}

export default function ServicesPage() {
  const finderGuides: NeedFinderGuide[] = serviceDecisionGuides.map((guide) => ({
    need: guide.need,
    note: guide.note,
    services: getServiceLinks(guide.serviceSlugs).map((service) => ({
      headline: service.headline ?? service.summary,
      image: service.image,
      slug: service.slug,
      title: service.title,
    })),
  }));

  return (
    <div className="sv-page page-shell">
      <ServiceMotion />

      <section aria-labelledby="services-title" className="sv-hero">
        <div className="sv-container sv-hero__grid">
          <div className="sv-hero__copy">
            <p className="sv-eyebrow sv-hero__item" style={delay(0)}>
              <span className="sv-eyebrow__dot" />
              Ecommerce services
            </p>
            <h1 className="sv-hero__title sv-hero__item" id="services-title" style={delay(1)}>
              Everything your online store needs, <span className="sv-accent">handled by one team.</span>
            </h1>
            <p className="sv-hero__lead sv-hero__item" style={delay(2)}>
              Daily store operations, marketing and SEO, brand design, video, and account
              security, planned together and delivered by people who know ecommerce.
            </p>
            <div className="sv-hero__actions sv-hero__item" style={delay(3)}>
              <Button href="/booking" size="lg">
                Book a call
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Button href="#services-list" size="lg" variant="secondary">
                Explore services
              </Button>
            </div>
            <ul className="sv-proof sv-hero__item" style={delay(4)}>
              <li>
                <Rating />
                <span><strong>5.0</strong> client rating</span>
              </li>
              <li>
                <strong>1,000+</strong> clients
              </li>
              <li>
                <strong>6+</strong> countries
              </li>
            </ul>
          </div>

          <div className="sv-hero__media sv-hero__item" style={delay(2)}>
            <div className="sv-frame">
              <div className="sv-frame__img" data-parallax="10">
                <Image
                  alt="Ecommerce operations team handling customer chats, product listings, and order packing"
                  fill
                  preload
                  sizes="(min-width: 64rem) 44rem, 100vw"
                  src={heroImage}
                />
              </div>
            </div>
            <div className="sv-float sv-float--top" data-float>
              <span className="sv-float__icon sv-float__icon--ok">
                <Check aria-hidden="true" />
              </span>
              <span>
                <strong>Order shipped</strong>
                <small>Customer notified</small>
              </span>
            </div>
            <div className="sv-float sv-float--bottom" data-float>
              <span className="sv-float__icon">
                <LineChart aria-hidden="true" />
              </span>
              <span>
                <strong>Weekly report ready</strong>
                <small>Done, open, and next</small>
              </span>
            </div>
          </div>
        </div>

        <div className="sv-container">
          <PlatformMarquee label="Platforms we work on" tools={platformTools} />
        </div>
      </section>

      <section aria-labelledby="services-list-title" className="sv-section" id="services-list">
        <div className="sv-container">
          <div className="sv-head" data-reveal>
            <p className="sv-kicker">Our services</p>
            <h2 className="sv-title" id="services-list-title">
              Pick a service to see exactly what is included.
            </h2>
            <p className="sv-lead">
              Every service page shows what we do, how we work, what you receive, and
              answers to common questions.
            </p>
          </div>

          <div className="sv-cards">
            {services.map((service, index) => {
              return (
                <Link
                  className={index < 2 ? "sv-card sv-card--wide" : "sv-card"}
                  data-reveal
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  <span className="sv-card__media">
                    <Image
                      alt={service.image.alt}
                      fill
                      sizes={index < 2 ? "(min-width: 64rem) 40rem, 100vw" : "(min-width: 64rem) 26rem, 100vw"}
                      src={service.image.src}
                    />
                    <span className="sv-card__icon">
                      <ServiceIcon aria-hidden="true" slug={service.slug} />
                    </span>
                  </span>
                  <span className="sv-card__body">
                    <span className="sv-card__title">{service.title}</span>
                    <span className="sv-card__text">{service.headline}</span>
                    <span className="sv-card__points">
                      {service.heroPoints.map((point) => (
                        <span key={point}>
                          <Check aria-hidden="true" />
                          {point}
                        </span>
                      ))}
                    </span>
                    <span className="sv-card__link">
                      Explore service
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="finder-title" className="sv-section sv-section--tint">
        <div className="sv-container">
          <div className="sv-head sv-head--center" data-reveal>
            <p className="sv-kicker">Not sure where to start?</p>
            <h2 className="sv-title" id="finder-title">
              Tell us what is going on. We will point you to the right service.
            </h2>
          </div>
          <div data-reveal>
            <NeedFinder guides={finderGuides} />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="sv-section">
        <div className="sv-container">
          <div className="sv-head sv-head--center" data-reveal>
            <p className="sv-kicker">How we work</p>
            <h2 className="sv-title" id="process-title">
              Simple from the very first call.
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

      <section aria-labelledby="why-title" className="sv-section sv-section--tint">
        <div className="sv-container sv-split">
          <div className="sv-split__media" data-reveal>
            <div className="sv-frame sv-frame--tall">
              <div className="sv-frame__img" data-parallax="12">
                <Image
                  alt="EcomPros team collaborating around laptops and waving to a client on a video call"
                  fill
                  sizes="(min-width: 64rem) 36rem, 100vw"
                  src="/services/photos/services-team.jpg"
                />
              </div>
            </div>
          </div>

          <div className="sv-split__copy">
            <div className="sv-head" data-reveal>
              <p className="sv-kicker">Why EcomPros</p>
              <h2 className="sv-title" id="why-title">
                Real people who know how online stores run.
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

            <dl className="sv-stats" data-reveal>
              {companyStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>
                    <span data-count={stat.value}>{stat.value.toLocaleString("en-US")}</span>
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="packages-title" className="sv-section">
        <div className="sv-container">
          <div className="sv-head" data-reveal>
            <p className="sv-kicker">Popular combinations</p>
            <h2 className="sv-title" id="packages-title">
              Need more than one? We plan them together.
            </h2>
            <p className="sv-lead">
              Each service works on its own. When your store needs several, we run them as
              one plan with one point of contact.
            </p>
          </div>

          <div className="sv-packages">
            {combinedEngagements.map((engagement, index) => (
              <article className={index === 0 ? "sv-package sv-package--featured" : "sv-package"} data-reveal key={engagement.title}>
                {index === 0 ? <span className="sv-package__badge">Most requested</span> : null}
                <h3>{engagement.title}</h3>
                <p>{engagement.body}</p>
                <ul>
                  {getServiceLinks(engagement.serviceSlugs).map((service) => {
                    return (
                      <li key={service.slug}>
                        <Link href={`/services/${service.slug}`}>
                          <ServiceIcon aria-hidden="true" slug={service.slug} />
                          {service.shortTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Button href="/booking" size="md" variant={index === 0 ? "primary" : "secondary"}>
                  Ask about {engagement.title}
                  <ArrowRight aria-hidden="true" size={16} />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section aria-labelledby="faq-title" className="sv-section">
        <div className="sv-container sv-faq">
          <div className="sv-faq__intro" data-reveal>
            <p className="sv-kicker">FAQ</p>
            <h2 className="sv-title" id="faq-title">
              Questions before the first call.
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
            {servicesFaqs.map((faq, index) => (
              <details data-reveal key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="sv-section sv-section--flush">
        <div className="sv-container">
          <div className="sv-cta" data-reveal>
            <div className="sv-cta__copy">
              <h2 id="cta-title">Ready to take work off your plate?</h2>
              <p>
                Share your store and what you need. We will reply with a clear plan and the
                right service for your goals.
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
