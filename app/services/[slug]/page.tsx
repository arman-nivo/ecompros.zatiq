import { ArrowLeft, ArrowRight, CheckCircle2, MoveRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { portfolioProjects, type PortfolioProject } from "@/lib/portfolio";
import {
  getAdjacentServices,
  getServiceBySlug,
  services,
  type ServiceSlug,
} from "@/lib/services";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found |EcomPros",
    };
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `/services/${service.slug}`,
      siteName: brand.name,
      images: [
        {
          url: service.image.src,
          alt: service.image.alt,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
      images: [service.image.src],
    },
  };
}

function getRelatedProjects(slugs: readonly string[]) {
  return slugs
    .map((slug) => portfolioProjects.find((project) => project.slug === slug))
    .filter((project): project is PortfolioProject => Boolean(project));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { next, previous } = getAdjacentServices(service.slug as ServiceSlug);
  const relatedProjects = getRelatedProjects(service.relatedPortfolioSlugs);

  return (
    <div className="service-detail-page page-shell">
      <ScrollCinematics />

      <section className="service-detail-hero" aria-labelledby="service-title">
        <div className="service-detail-hero__inner">
          <div className="service-detail-hero__content">
            <Link className="service-detail-hero__back" data-cinematic="rise" href="/services">
              <ArrowLeft aria-hidden="true" size={16} />
              All services
            </Link>
            <h1 className="service-detail-hero__title" data-cinematic="clip" id="service-title">
              {service.title}
            </h1>
          </div>

          <div className="service-detail-hero__aside" data-cinematic="rise" data-cinematic-delay="1">
            <p>{service.summary}</p>
            <div className="service-detail-hero__actions">
              <Button href="/booking" size="lg">
                Book this service
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Button href="/portfolio" size="lg" variant="secondary">
                View related work
              </Button>
            </div>
          </div>

          <figure className="service-detail-hero__media" data-cinematic="rise" data-cinematic-delay="2">
            <Image
              fill
              preload
              sizes="(min-width: 90rem) 88rem, 100vw"
              src={service.image.src}
              alt={service.image.alt}
            />
          </figure>
        </div>
      </section>

      <section className="service-detail-fit" aria-labelledby="service-fit-title">
        <div className="service-detail-fit__inner">
          <div className="service-detail-fit__head">
            <h2 className="section__title" data-cinematic="clip" id="service-fit-title">
              Best fit when.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              This service is useful when the founder can point to a surface,
              workflow, asset, or trust problem that needs to become clearer.
            </p>
          </div>

          <div className="service-fit-list">
            {service.audienceFit.map((fit, index) => (
              <div
                className="service-fit-item"
                data-cinematic="rise"
                data-cinematic-delay={Math.min(index + 1, 4)}
                key={fit}
              >
                <CheckCircle2 aria-hidden="true" size={18} />
                <p>{fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-stack" aria-labelledby="service-depth-title">
        <div className="service-detail-stack__inner">
          <aside className="service-detail-stack__aside" data-cinematic="rise">
            <p className="section__label">Service depth</p>
            <h2 id="service-depth-title">What this covers.</h2>
            <p>
              The sections on the right break the service into capabilities,
              deliverables, delivery rhythm, and handoff details.
            </p>
            <Button href="/booking" size="md" variant="secondary">
              Discuss scope
              <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </aside>

          <div className="service-detail-stack__body">
            <section className="service-detail-panel" aria-labelledby="service-capabilities-title">
              <h3 id="service-capabilities-title">Capabilities</h3>
              <div className="service-capability-grid">
                {service.capabilities.map((capability, index) => (
                  <article
                    className="service-capability"
                    data-cinematic="rise"
                    data-cinematic-delay={Math.min(index + 1, 6)}
                    key={capability.title}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{capability.title}</h4>
                    <p>{capability.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="service-detail-panel" aria-labelledby="service-deliverables-title">
              <h3 id="service-deliverables-title">Deliverables</h3>
              <ul className="service-deliverables">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </section>

            <section className="service-detail-panel" aria-labelledby="service-process-title">
              <h3 id="service-process-title">Process</h3>
              <div className="service-process">
                {service.process.map((step, index) => (
                  <article className="service-process-step" key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="service-detail-panel service-detail-panel--handoff" aria-labelledby="service-handoff-title">
              <h3 id="service-handoff-title">Handoff</h3>
              <p>{service.handoff}</p>
              <div className="service-stack-list" aria-label={`${service.title} working stack`}>
                {service.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="service-related section" aria-labelledby="service-related-title">
        <div className="service-related__inner">
          <div className="service-related__head">
            <h2 className="section__title" data-cinematic="clip" id="service-related-title">
              Related public work.
            </h2>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
              These portfolio entries map to the service area. Open the portfolio to
              review videos, platform notes, and project context.
            </p>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="service-related__grid">
              {relatedProjects.slice(0, 4).map((project, index) => (
                <Link
                  className="service-related-card"
                  data-cinematic="rise"
                  data-cinematic-delay={Math.min(index + 1, 4)}
                  href="/portfolio"
                  key={project.slug}
                >
                  <span>{project.title}</span>
                  <p>{project.summary}</p>
                  <span className="service-related-card__action">
                    Open portfolio
                    <MoveRight aria-hidden="true" size={16} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="service-related-empty" data-cinematic="rise">
              <p>
                This service is often paired with web or software work. Public
                examples will be added when client material is cleared for release.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="service-faq section" aria-labelledby="service-faq-title">
        <div className="service-faq__inner">
          <div className="service-faq__head">
            <h2 className="section__title" data-cinematic="clip" id="service-faq-title">
              Questions for this service.
            </h2>
          </div>

          <div className="service-faq__list">
            {service.faqs.map((faq, index) => (
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

      <nav className="service-next" aria-label="Service navigation">
        <div className="service-next__inner">
          <Link className="service-next-card" href={`/services/${previous.slug}`}>
            <span>Previous</span>
            <strong>{previous.title}</strong>
          </Link>
          <Link className="service-next-card service-next-card--next" href={`/services/${next.slug}`}>
            <span>Next</span>
            <strong>{next.title}</strong>
          </Link>
        </div>
      </nav>
    </div>
  );
}
