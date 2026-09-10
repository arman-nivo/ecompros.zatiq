import { ArrowRight, MoveRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import {
  combinedEngagements,
  getServiceLinks,
  serviceDecisionGuides,
  services,
  servicesFaqs,
} from "@/lib/services";

const pageTitle = "Services |EcomPros";
const pageDescription =
  "Ecom ProDesk services for startup founders: web design and development, software product development, motion video design, cybersecurity helper work, brand-ready systems, and marketing, branding and SEO.";

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
        url: "/assets/home/EcomPros-hero-command.png",
        width: 1672,
        height: 941,
        alt: "Ecom ProDesk digital product interface system preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/assets/home/EcomPros-hero-command.png"],
  },
};

export default function ServicesPage() {
  return (
    <div className="services-page page-shell">
      <ScrollCinematics />

      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero__inner">
          <div className="services-hero__content">
            <p className="section__label" data-cinematic="rise">
              Services
            </p>
            <h1 className="services-hero__title" data-cinematic="clip" id="services-title">
              Services for shipping startups.
            </h1>
          </div>
          <div className="services-hero__aside" data-cinematic="rise" data-cinematic-delay="1">
            <p>
             EcomPros connects the public website, product build, launch motion, brand
              system, security helper work, and growth surface so founders do not have
              to stitch the work together later.
            </p>
            <div className="services-hero__actions">
              <Button href="/booking" size="lg">
                Book a call
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Button href="/portfolio" size="lg" variant="secondary">
                View portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="services-index" aria-labelledby="services-index-title">
        <div className="services-index__inner">
          <div className="services-index__head">
            <h2 className="section__title" data-cinematic="clip" id="services-index-title">
              Open the service that matches the work.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              Each service has its own page with capabilities, deliverables, process,
              handoff notes, related work, and common questions.
            </p>
          </div>

          <div className="services-index__list">
            {services.map((service, index) => (
              <Link
                className="services-index-card"
                data-cinematic="rise"
                data-cinematic-delay={Math.min(index + 1, 6)}
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <span className="services-index-card__count">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="services-index-card__media">
                  <Image
                    fill
                    sizes="(min-width: 60rem) 16rem, 100vw"
                    src={service.image.src}
                    alt={service.image.alt}
                  />
                </span>
                <span className="services-index-card__body">
                  <span className="services-index-card__title">{service.title}</span>
                  <span className="services-index-card__summary">{service.summary}</span>
                  <span className="services-index-card__chips" aria-label={`${service.title} capabilities`}>
                    {service.capabilities.slice(0, 4).map((capability) => (
                      <span key={capability.title}>{capability.title}</span>
                    ))}
                  </span>
                </span>
                <span className="services-index-card__action">
                  Open service
                  <MoveRight aria-hidden="true" size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="services-chooser section" aria-labelledby="services-chooser-title">
        <div className="services-chooser__inner">
          <div className="services-chooser__intro">
            <h2 className="section__title" data-cinematic="clip" id="services-chooser-title">
              How to choose.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              Start with the problem in front of the team. The service pages give the
              details, but the combinations below are how startup work usually fits.
            </p>
          </div>

          <div className="services-chooser__grid">
            {serviceDecisionGuides.map((guide, index) => (
              <article
                className="services-guide"
                data-cinematic="rise"
                data-cinematic-delay={Math.min(index + 1, 5)}
                key={guide.need}
              >
                <h3>{guide.need}</h3>
                <p>{guide.note}</p>
                <div className="services-guide__links">
                  {getServiceLinks(guide.serviceSlugs).map((service) => (
                    <Link href={`/services/${service.slug}`} key={service.slug}>
                      {service.shortTitle}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-combos section" aria-labelledby="services-combos-title">
        <div className="services-combos__inner">
          <div className="services-combos__head">
            <h2 className="section__title" data-cinematic="clip" id="services-combos-title">
              Combined engagements.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              A single service can be scoped by itself. When the launch needs more than
              one surface, the work is grouped into one practical operating track.
            </p>
          </div>

          <div className="services-combos__grid">
            {combinedEngagements.map((engagement, index) => (
              <article
                className="services-combo"
                data-cinematic="rise"
                data-cinematic-delay={Math.min(index + 1, 3)}
                key={engagement.title}
              >
                <h3>{engagement.title}</h3>
                <p>{engagement.body}</p>
                <div className="services-combo__services">
                  {getServiceLinks(engagement.serviceSlugs).map((service) => (
                    <span key={service.slug}>{service.shortTitle}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq section" aria-labelledby="services-faq-title">
        <div className="services-faq__inner">
          <div className="services-faq__head">
            <h2 className="section__title" data-cinematic="clip" id="services-faq-title">
              Before the first call.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              Short answers for the questions that usually decide whether the service
              pages are worth opening.
            </p>
          </div>

          <div className="services-faq__list">
            {servicesFaqs.map((faq, index) => (
              <details
                className="services-faq-item"
                data-cinematic="rise"
                data-cinematic-delay={Math.min(index + 1, 3)}
                key={faq.question}
              >
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta section section--tight" aria-labelledby="services-cta-title">
        <div className="services-cta__inner">
          <h2 data-cinematic="clip" id="services-cta-title">
            Bring the rough brief. Leave with a route.
          </h2>
          <p data-cinematic="rise" data-cinematic-delay="1">
            Send the product, website, campaign, or security problem.EcomPros will help
            sort the right service path before the work expands.
          </p>
          <div className="services-cta__actions" data-cinematic="rise" data-cinematic-delay="2">
            <Button href="/#booking" size="lg">
              Book a call
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
            <Button href="/portfolio" size="lg" variant="secondary">
              Review work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
