import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  FileBarChart,
  MessageCircle,
  Minus,
  PackageCheck,
  Star,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import "@/components/services/service-pages.css";
import "@/components/home/home.css";
import ScrollCinematics from "@/components/motion/ScrollCinematics";
import { departmentIcons } from "@/components/pricing/departmentIcons";
import PlanPicker from "@/components/pricing/PlanPicker";
import "@/components/pricing/pricing.css";
import ServiceMotion from "@/components/services/ServiceMotion";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import {
  bookingHref,
  departments,
  everyPlanIncludes,
  formatNumber,
  formatPrice,
  monthlyOrderCap,
  monthlyPlans,
  pricingFaqs,
} from "@/lib/pricing";

const pageTitle = "Pricing | EcomPros";
const pageDescription = `Simple monthly plans for ecommerce operations, creative, marketing, and tech. From ${formatPrice(
  monthlyPlans[0].monthlyPrice,
)}/month, with up to ${formatNumber(monthlyOrderCap)} orders a month on every plan.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/pricing",
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
};

const includeIcons: LucideIcon[] = [UserRound, Clock, FileBarChart, Wrench, MessageCircle, PackageCheck];

export default function PricingPage() {
  return (
    <div className="page-shell sv-page pp-page">
      <ScrollCinematics />
      <ServiceMotion />

      <section aria-labelledby="pricing-title" className="sv-hero pp-hero">
        <div className="sv-container pp-hero__inner">
          <p className="sv-eyebrow sv-hero__item">
            <span className="sv-eyebrow__dot" />
            Pricing
          </p>
          <h1 className="sv-hero__title pp-hero__title sv-hero__item" id="pricing-title" style={{ "--i": 1 } as CSSProperties}>
            One monthly price for your <span className="sv-accent">whole ecommerce team.</span>
          </h1>
          <p className="sv-hero__lead pp-hero__lead sv-hero__item" style={{ "--i": 2 } as CSSProperties}>
            No hiring, training, or managing. Choose the departments you need, and we run
            them for you, 24/7.
          </p>
          <ul className="sv-proof pp-hero__proof sv-hero__item" style={{ "--i": 3 } as CSSProperties}>
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
              <strong>{formatNumber(monthlyOrderCap)}</strong> orders a month included
            </li>
          </ul>
        </div>
      </section>

      <section aria-label="Plans" className="sv-section pp-plans-section">
        <div className="sv-container">
          <PlanPicker />
        </div>
      </section>

      <section aria-labelledby="included-title" className="sv-section sv-section--tint">
        <div className="sv-container">
          <div className="sv-head sv-head--center" data-reveal>
            <p className="sv-kicker">Every plan</p>
            <h2 className="sv-title" id="included-title">
              Included in every plan, whatever you choose.
            </h2>
          </div>
          <ul className="pp-included">
            {everyPlanIncludes.map((item, index) => {
              const Icon = includeIcons[index] ?? Check;

              return (
                <li data-reveal key={item.title}>
                  <span className="sv-reasons__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="sv-section">
        <div className="sv-container">
          <div className="sv-head" data-reveal>
            <p className="sv-kicker">Compare plans</p>
            <h2 className="sv-title" id="compare-title">
              See exactly what each plan covers.
            </h2>
            <p className="sv-lead">Each plan adds one department to the one before it.</p>
          </div>

          <p className="pp-table-hint">Swipe the table sideways to see every plan.</p>
          <div className="pp-table-wrap" data-reveal>
            <table className="pp-table">
              <caption className="sr-only">What each plan includes</caption>
              <thead>
                <tr>
                  <td />
                  {monthlyPlans.map((plan) => (
                    <th key={plan.name} scope="col">
                      <span className="pp-table__plan">{plan.displayName}</span>
                      <span className="pp-table__price">{formatPrice(plan.monthlyPrice)}/mo</span>
                    </th>
                  ))}
                </tr>
              </thead>
              {departments.map((department) => {
                const Icon = departmentIcons[department.id];

                return (
                  <tbody key={department.id}>
                    <tr className="pp-table__group">
                      <th colSpan={monthlyPlans.length + 1} scope="colgroup">
                        <Icon aria-hidden="true" />
                        {department.label}
                      </th>
                    </tr>
                    {department.items.map((item) => (
                      <tr key={item}>
                        <th scope="row">{item}</th>
                        {monthlyPlans.map((plan) =>
                          plan.departments.includes(department.id) ? (
                            <td key={plan.name}>
                              <span className="pp-yes">
                                <Check aria-hidden="true" />
                                <span className="sr-only">Included</span>
                              </span>
                            </td>
                          ) : (
                            <td key={plan.name}>
                              <span className="pp-no">
                                <Minus aria-hidden="true" />
                                <span className="sr-only">Not included</span>
                              </span>
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                );
              })}
              <tbody>
                <tr className="pp-table__group">
                  <th colSpan={monthlyPlans.length + 1} scope="colgroup">
                    <Check aria-hidden="true" />
                    Every plan
                  </th>
                </tr>
                {everyPlanIncludes.map((item) => (
                  <tr key={item.title}>
                    <th scope="row">{item.title}</th>
                    {monthlyPlans.map((plan) => (
                      <td key={plan.name}>
                        <span className="pp-yes">
                          <Check aria-hidden="true" />
                          <span className="sr-only">Included</span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  {monthlyPlans.map((plan) => (
                    <td key={plan.name}>
                      <Link className="hm-textlink" href={bookingHref(plan.name, "monthly")}>
                        Choose
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="enterprise-title" className="sv-section sv-section--flush">
        <div className="sv-container">
          <div className="pp-enterprise" data-reveal>
            <span className="pp-enterprise__icon">
              <Building2 aria-hidden="true" />
            </span>
            <div>
              <h2 id="enterprise-title">Over 1 million orders a year?</h2>
              <p>
                Enterprise plans get a dedicated team sized to your volume, channels, and peak
                seasons. Tell us what you need and we will scope it with you.
              </p>
            </div>
            <Button href={bookingHref()} size="md" variant="secondary">
              Talk about Enterprise
              <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section aria-labelledby="faq-title" className="sv-section">
        <div className="sv-container sv-faq">
          <div className="sv-faq__intro" data-reveal>
            <p className="sv-kicker">FAQ</p>
            <h2 className="sv-title" id="faq-title">
              Pricing questions, answered.
            </h2>
            <div className="sv-help">
              <strong>Still not sure which plan fits?</strong>
              <span>Message us and we will recommend one.</span>
              <Link className="sv-whatsapp" href="/whatsapp" prefetch={false} rel="noopener noreferrer" target="_blank">
                <IconBrandWhatsapp aria-hidden="true" />
                Chat on WhatsApp
              </Link>
            </div>
          </div>

          <div className="sv-accordion">
            {pricingFaqs.map((faq, index) => (
              <details data-reveal key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-cta-title" className="sv-section sv-section--flush">
        <div className="sv-container">
          <div className="sv-cta" data-reveal>
            <div className="sv-cta__copy">
              <h2 id="pricing-cta-title">Not sure which plan is right?</h2>
              <p>Book a short call. We will look at your store and order volume, then recommend the plan that fits.</p>
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
