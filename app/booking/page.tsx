import type { Metadata } from "next";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import BookingForm from "@/components/sections/BookingForm";
import BookingSection from "@/components/sections/BookingSection";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";

const pageTitle = "Book a Call | EcomPros";
const pageDescription =
  "Share your project scope, preferred plan, timeline, and a quick note — we'll reply by email or WhatsApp.";

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

export default function BookingPage() {
  return (
    <div className="page-shell">
      <ScrollCinematics />

      <section className="section section--tight booking-scale" aria-labelledby="scale-title">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Scale
              </p>
              <h1
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="scale-title"
              >
                Ready for Your Biggest Days.
              </h1>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              From everyday operations to major campaigns, holidays and sudden demand
              spikes, EcomPros provides the team and capacity to keep your operation
              moving.
            </p>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="3">
              Your business grows. Your operation scales with it.
            </p>
          </div>
        </div>
      </section>

      <BookingSection>
        <div className="section__inner section__inner--wide">
          <p className="section__label booking-section__label">Book a call</p>

          <div className="booking-layout">
          <div data-cinematic="rise">
            <h2 className="section__title" id="booking-title">
              Bring the surface that needs to ship.
            </h2>
            <p className="section__copy">
              Share the rough shape, your preferred plan, the timeline you&apos;re
              considering, and a quick note about the project. We&apos;ll reply by email
              or WhatsApp.
            </p>

            <Button
              className="booking-whatsapp"
              href="/whatsapp"
              prefetch={false}
              rel="noopener noreferrer"
              size="md"
              target="_blank"
              variant="secondary"
            >
              <svg
                aria-hidden="true"
                className="booking-whatsapp__icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Chat on WhatsApp
            </Button>
          </div>

          <div className="booking-panel" data-cinematic="rise" data-cinematic-delay="2">
            <BookingForm />
          </div>
          </div>
        </div>
      </BookingSection>
    </div>
  );
}
