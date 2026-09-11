import { IconBrandWhatsapp } from "@tabler/icons-react";
import { ArrowRight, ArrowUpRight, Check, CircleCheck, MoveRight, PackageCheck, Sparkles, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import ServiceCapabilities, { capabilityIcons } from "@/components/services/ServiceCapabilities";
import ServiceDock from "@/components/services/ServiceDock";
import ServiceMotion from "@/components/services/ServiceMotion";
import ServiceIcon from "@/components/services/ServiceIcon";
import "@/components/services/service-pages.css";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { companyStats } from "@/lib/company";
import { portfolioProjects, type PortfolioProject } from "@/lib/portfolio";
import { getServiceBySlug, services } from "@/lib/services";

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
      title: "Service not found | EcomPros",
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

const dockSections = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "What we do" },
  { id: "process", label: "Process" },
  { id: "deliverables", label: "What you get" },
  { id: "faq", label: "FAQ" },
];

function delay(index: number) {
  return { "--i": index } as CSSProperties;
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
  const heroPoints = service.heroPoints ?? service.deliverables.slice(0, 3);
  const detailImage = service.detailImage ?? service.image;
  const relatedProjects = getRelatedProjects(service.relatedPortfolioSlugs);
  const otherServices = services.filter((item) => item.slug !== service.slug);
  const areaCount = service.capabilityGroups?.length ?? 1;
  const floatingAreas = (service.capabilityGroups ?? []).slice(0, 2).map((group) => {
    const first = service.capabilities.find((capability) => capability.group === group.title);
    return { icon: capabilityIcons[first?.icon ?? ""] ?? Sparkles, title: group.title };
  });

  return (
    <div className="sv-page page-shell">
      <ScrollCinematics />
      <ServiceMotion />

      <section aria-labelledby="service-title" className="sv-hero sv-hero--detail" data-dock-start>
        <div className="sv-container">
          <nav aria-label="Breadcrumb" className="sv-crumbs sv-hero__item" style={delay(0)}>
            <ol>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li aria-current="page">{service.shortTitle}</li>
            </ol>
          </nav>
        </div>

        <div className="sv-container sv-hero__grid">
          <div className="sv-hero__copy">
            <h1 id="service-title">
              <span className="sv-eyebrow sv-hero__item" style={delay(0)}>
                <span className="sv-eyebrow__icon">
                  <ServiceIcon aria-hidden="true" slug={service.slug} />
                </span>
                {service.title}
              </span>
              <span className="sv-hero__title sv-hero__item" style={delay(1)}>
                {service.headline ?? service.title}
              </span>
            </h1>
            <p className="sv-hero__lead sv-hero__item" style={delay(2)}>
              {service.summary}
            </p>
            <ul className="sv-checks sv-hero__item" style={delay(3)}>
              {heroPoints.map((point) => (
                <li key={point}>
                  <CircleCheck aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="sv-hero__actions sv-hero__item" style={delay(4)}>
              <Button href="/booking" size="lg">
                Book this service
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Link className="sv-whatsapp" href="/whatsapp" prefetch={false} rel="noopener noreferrer" target="_blank">
                <IconBrandWhatsapp aria-hidden="true" />
                Chat on WhatsApp
              </Link>
            </div>
            <ul className="sv-proof sv-hero__item" style={delay(5)}>
              <li>
                <span aria-hidden="true" className="sv-stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} />
                  ))}
                </span>
                <span><strong>5.0</strong> client rating</span>
              </li>
              <li>
                <strong>1,000+</strong> clients
              </li>
              <li>
                <strong>24/7</strong> support
              </li>
            </ul>
          </div>

          <div className="sv-hero__media sv-hero__item" style={delay(2)}>
            <div className="sv-frame">
              <div className="sv-frame__img" data-parallax="10">
                <Image alt={service.image.alt} fill preload sizes="(min-width: 64rem) 44rem, 100vw" src={service.image.src} />
              </div>
            </div>
            {floatingAreas.map((area, index) => {
              const AreaIcon = area.icon;

              return (
                <div className={`sv-float ${index === 0 ? "sv-float--top" : "sv-float--bottom"}`} data-float key={area.title}>
                  <span className={index === 0 ? "sv-float__icon sv-float__icon--ok" : "sv-float__icon"}>
                    <AreaIcon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{area.title}</strong>
                    <small>Included</small>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-label={`${brand.name} in numbers`} className="sv-band">
        <div className="sv-container">
          <dl className="sv-stats sv-stats--band">
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

      <section aria-labelledby="overview-title" className="sv-section" id="overview">
        <div className="sv-container sv-fit">
          <div className="sv-head" data-reveal>
            <p className="sv-kicker">Is this right for you?</p>
            <h2 className="sv-title" id="overview-title">
              A great fit if this sounds familiar.
            </h2>
            <p className="sv-lead">{service.homeDescription}</p>
            <Button href="/booking" size="md" variant="secondary">
              Sounds like us, let&apos;s talk
              <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </div>

          <ul className="sv-fit__list">
            {service.audienceFit.map((fit, index) => (
              <li data-reveal key={fit}>
                <span className="sv-fit__number">{String(index + 1).padStart(2, "0")}</span>
                <p>{fit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="capabilities-title" className="sv-section sv-section--tint" id="capabilities">
        <div className="sv-container sv-capwrap">
          <aside className="sv-capwrap__aside" data-reveal>
            <p className="sv-kicker">What we do</p>
            <h2 className="sv-title sv-title--sm" id="capabilities-title">
              Capabilities
            </h2>
            <p>
              {service.capabilities.length} ways we help, organised into {areaCount}{" "}
              {areaCount === 1 ? "area" : "areas"}. Each card shows what the work looks like and
              the tools we use.
            </p>
            <Button href="/booking" size="md">
              Discuss your scope
              <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </aside>
          <div className="sv-capwrap__body">
            <ServiceCapabilities
              capabilities={service.capabilities}
              groups={service.capabilityGroups}
              serviceTitle={service.title}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="sv-section" id="process">
        <div className="sv-container">
          <div className="sv-head sv-head--center" data-reveal>
            <p className="sv-kicker">How it works</p>
            <h2 className="sv-title" id="process-title">
              From the first call to steady results.
            </h2>
          </div>

          <ol className="sv-steps" data-progress style={{ "--steps": service.process.length } as CSSProperties}>
            {service.process.map((step, index) => (
              <li className="sv-step" data-progress-step key={step.title}>
                <span className="sv-step__icon sv-step__icon--number">{index + 1}</span>
                <span className="sv-step__number">Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="deliverables-title" className="sv-section sv-section--tint" id="deliverables">
        <div className="sv-container sv-split sv-split--reverse">
          <div className="sv-split__media" data-reveal>
            <div className="sv-frame sv-frame--tall">
              <div className="sv-frame__img" data-parallax="12">
                <Image alt={detailImage.alt} fill sizes="(min-width: 64rem) 36rem, 100vw" src={detailImage.src} />
              </div>
            </div>
            <div className="sv-float sv-float--bottom" data-float>
              <span className="sv-float__icon sv-float__icon--ok">
                <PackageCheck aria-hidden="true" />
              </span>
              <span>
                <strong>Handoff included</strong>
                <small>Notes, files, and next steps</small>
              </span>
            </div>
          </div>

          <div className="sv-split__copy">
            <div className="sv-head" data-reveal>
              <p className="sv-kicker">What you get</p>
              <h2 className="sv-title" id="deliverables-title">
                Clear deliverables. No guesswork.
              </h2>
            </div>

            <ul className="sv-deliver">
              {service.deliverables.map((deliverable) => (
                <li data-reveal key={deliverable}>
                  <span>
                    <Check aria-hidden="true" />
                  </span>
                  {deliverable}
                </li>
              ))}
            </ul>

            <div className="sv-handoff" data-reveal>
              <strong>How the handoff works</strong>
              <p>{service.handoff}</p>
              <ul aria-label={`${service.title} working stack`}>
                {service.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mid-cta-title" className="sv-section sv-section--flush">
        <div className="sv-container">
          <div className="sv-cta" data-reveal>
            <div className="sv-cta__copy">
              <h2 id="mid-cta-title">Ready to get started with {service.shortTitle}?</h2>
              <p>Tell us about your store and goals. We will reply with a clear plan and next steps.</p>
            </div>
            <div className="sv-cta__actions">
              <Button href="/booking" size="lg">
                Book this service
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

      <TestimonialCarousel />

      {relatedProjects.length > 0 ? (
        <section aria-labelledby="related-title" className="sv-section">
          <div className="sv-container">
            <div className="sv-head" data-reveal>
              <p className="sv-kicker">Related work</p>
              <h2 className="sv-title" id="related-title">
                See this service in action.
              </h2>
            </div>
            <div className="sv-related">
              {relatedProjects.slice(0, 4).map((project) => (
                <Link className="sv-related__card" data-reveal href="/portfolio" key={project.slug}>
                  <strong>{project.title}</strong>
                  <span>{project.summary}</span>
                  <span className="sv-card__link">
                    Open portfolio
                    <MoveRight aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="sv-section" id="faq">
        <div className="sv-container sv-faq">
          <div className="sv-faq__intro" data-reveal>
            <p className="sv-kicker">FAQ</p>
            <h2 className="sv-title" id="faq-title">
              Questions about {service.shortTitle}.
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
            {service.faqs.map((faq, index) => (
              <details data-reveal key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="sv-section sv-section--tint">
        <div className="sv-container">
          <div className="sv-head" data-reveal>
            <p className="sv-kicker">Explore more</p>
            <h2 className="sv-title" id="more-title">
              Other ways we can help your store.
            </h2>
          </div>

          <div className="sv-minis">
            {otherServices.map((item) => {
              return (
                <Link className="sv-mini" data-reveal href={`/services/${item.slug}`} key={item.slug}>
                  <span className="sv-mini__media">
                    <Image alt={item.image.alt} fill sizes="(min-width: 64rem) 20rem, 50vw" src={item.image.src} />
                  </span>
                  <span className="sv-mini__body">
                    <span className="sv-mini__icon">
                      <ServiceIcon aria-hidden="true" slug={item.slug} />
                    </span>
                    <strong>{item.title}</strong>
                    <span>{item.headline}</span>
                    <span className="sv-card__link">
                      View service
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceDock sections={dockSections} />
    </div>
  );
}
