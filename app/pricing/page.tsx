import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import HoleRevealButton from "@/components/pricing/HoleRevealButton";
import PricingTabs from "@/components/pricing/PricingTabs";
import PricingHeroTitle from "@/components/pricing/PricingHeroTitle";
import { brand } from "@/lib/brand";

const pageTitle = "Pricing Preview |EcomPros";
const pageDescription =
  "Monthly and long-term ecommerce operations pricing fromEcomPros, scoped by order volume.";

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

export default function PricingPage() {
  return (
    <div className="pricing-page page-shell">
      <ScrollCinematics />

      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="section__inner">
          <p className="section__label" data-cinematic="rise">
            Pricing preview
          </p>
          <PricingHeroTitle title="Choose the support your business needs." />
        </div>
      </section>

      <section className="section pricing-plans" aria-labelledby="pricing-plans-title">
        <div className="section__inner section__inner--wide">
          <div className="section__head">
            <p className="section__label" data-cinematic="rise">
              Plans
            </p>
            <h2
              className="section__title"
              data-cinematic="clip"
              data-cinematic-delay="1"
              id="pricing-plans-title"
            >
              Pick a billing period, see the tier that fits.
            </h2>
          </div>

          <div data-cinematic="rise" data-cinematic-delay="2">
            <PricingTabs />
          </div>
        </div>
      </section>

      <section className="pricing-cta section section--tight" aria-labelledby="pricing-cta-title">
        <div className="section__inner pricing-cta__inner">
          <div className="pricing-cta__copy" data-cinematic="rise">
            <h2 className="section__title" id="pricing-cta-title">
              Ready to see the plan that fits.
            </h2>
            <p className="section__copy">
              Walk through order volume, current gaps, and the tier that matches before
              anything is booked.
            </p>
          </div>

          <div className="pricing-cta__action" data-cinematic="rise" data-cinematic-delay="2">
            <HoleRevealButton className="btn btn--primary btn--lg pricing-cta__button" href="/booking">
              Contact Us
              <ArrowRight aria-hidden="true" size={18} />
            </HoleRevealButton>
          </div>
        </div>
      </section>
    </div>
  );
}
