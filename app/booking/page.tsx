import { IconBrandWhatsapp } from "@tabler/icons-react";
import { ClipboardList, MailCheck, MessageSquareText, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import "@/components/services/service-pages.css";
import "@/components/home/home.css";
import "@/components/pricing/pricing.css";
import "@/components/sections/booking.css";
import ScrollCinematics from "@/components/motion/ScrollCinematics";
import BookingForm, { type BookingPrefill } from "@/components/sections/BookingForm";
import ServiceMotion from "@/components/services/ServiceMotion";
import { brand } from "@/lib/brand";

const pageTitle = "Book a Call | EcomPros";
const pageDescription =
  "Tell us about your store, pick a plan if you know it, and we will reply by email or WhatsApp to set up a short call.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/booking",
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
};

type BookingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const nextSteps = [
  {
    icon: MessageSquareText,
    title: "We read your note",
    body: "We look at your store, the platforms you sell on, and the plan you picked.",
  },
  {
    icon: MailCheck,
    title: "We reply to set up a call",
    body: "By email, or on WhatsApp if you leave your number, at a time that suits you.",
  },
  {
    icon: ClipboardList,
    title: "You get a clear plan",
    body: "Tasks, team, and price agreed with you before any work starts.",
  },
];

const bookingFaqs = [
  {
    question: "Do I have to choose a plan now?",
    answer: "No. Pick “Not sure yet” and we will recommend a plan once we understand your store and order volume.",
  },
  {
    question: "What should I write in my note?",
    answer:
      "The platforms you sell on, roughly how many orders you handle, and the tasks you want off your plate. A few lines is plenty.",
  },
  {
    question: "How will you get back to me?",
    answer: "By email, or on WhatsApp if you add your number.",
  },
  {
    question: "Can I just message you instead?",
    answer: "Yes. Tap “Chat on WhatsApp” and tell us what you need. We will take it from there.",
  },
];

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const prefill: BookingPrefill = {
    period: firstValue(params.period),
    plan: firstValue(params.plan),
    tasks: firstValue(params.tasks),
  };

  return (
    <div className="page-shell sv-page bk-page">
      <ScrollCinematics />
      <ServiceMotion />

      <section aria-labelledby="booking-title" className="sv-hero bk-hero" id="booking">
        <div className="sv-container bk-layout">
          <div className="bk-intro">
            <p className="sv-eyebrow sv-hero__item">
              <span className="sv-eyebrow__dot" />
              Book a call
            </p>
            <h1 className="sv-hero__title bk-title sv-hero__item" id="booking-title" style={{ "--i": 1 } as CSSProperties}>
              Tell us about your store. <span className="sv-accent">We will plan the rest.</span>
            </h1>
            <p className="sv-hero__lead sv-hero__item" style={{ "--i": 2 } as CSSProperties}>
              It takes about two minutes. Share what you sell and what you need, and we will come back with a clear
              plan and price.
            </p>
          </div>

          <div className="bk-card sv-hero__item" style={{ "--i": 2 } as CSSProperties}>
            <BookingForm prefill={prefill} />
          </div>

          <div className="bk-aside">
            <div className="bk-next sv-hero__item" style={{ "--i": 3 } as CSSProperties}>
              <p className="bk-next__title">What happens next</p>
              <ol>
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <li key={step.title}>
                      <span className="bk-next__icon">
                        <Icon aria-hidden="true" />
                        <small>{index + 1}</small>
                      </span>
                      <span>
                        <strong>{step.title}</strong>
                        <span>{step.body}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="bk-trust sv-hero__item" style={{ "--i": 4 } as CSSProperties}>
              <div className="bk-trust__rating">
                <span aria-hidden="true" className="sv-stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} />
                  ))}
                </span>
                <span>
                  <strong>5.0</strong> client rating · <strong>1,000+</strong> ecommerce clients
                </span>
              </div>
              <div className="bk-trust__alt">
                <span>Prefer to chat?</span>
                <Link className="sv-whatsapp" href="/whatsapp" prefetch={false} rel="noopener noreferrer" target="_blank">
                  <IconBrandWhatsapp aria-hidden="true" />
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="booking-faq-title" className="sv-section sv-section--tint">
        <div className="sv-container sv-faq">
          <div className="sv-faq__intro" data-reveal>
            <p className="sv-kicker">Before you book</p>
            <h2 className="sv-title" id="booking-faq-title">
              Quick answers.
            </h2>
            <p className="sv-lead">
              Want to compare plans first? <Link className="bk-inline-link" href="/pricing">See pricing</Link> or{" "}
              <Link className="bk-inline-link" href="/services">explore our services</Link>.
            </p>
          </div>

          <div className="sv-accordion">
            {bookingFaqs.map((faq, index) => (
              <details data-reveal key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
