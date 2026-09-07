"use client";

import { useRef, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

import Button from "@/components/ui/Button";
import ThemeLogo from "@/components/ui/ThemeLogo";
import { brand } from "@/lib/brand";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#enterprise", label: "Enterprise" },
  { href: "/booking", label: "Booking" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/zatiq/posts/?feedView=all",
    label: "LinkedIn",
    icon: <LinkedinIcon />,
  },
  {
    href: "https://www.facebook.com/Zatiqglobal",
    label: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    href: "https://www.youtube.com/@zatiqglobal",
    label: "YouTube",
    icon: <YoutubeIcon />,
  },
  {
    href: "https://www.upwork.com/freelancers/~0187959fb09f4377ab",
    label: "Freelancer Profile",
    icon: <BriefcaseBusiness aria-hidden="true" className="Upwork-icon" size={18} />,

  },
];

function LinkedinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="site-footer__social-icon"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="site-footer__social-icon"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="site-footer__social-icon"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45a2.78 2.78 0 0 0-1.95 1.97A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = footerRef.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    el.style.setProperty("--torch-x", `${event.clientX - bounds.left}px`);
    el.style.setProperty("--torch-y", `${event.clientY - bounds.top}px`);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    footerRef.current?.setAttribute("data-torch-active", "true");
  };

  const handlePointerLeave = () => {
    footerRef.current?.removeAttribute("data-torch-active");
  };

  return (
    <footer
      className="site-footer"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={footerRef}
    >
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <p className="site-footer__statement" data-cinematic="clip">
            Human-powered ecommerce operations. 24/7.
          </p>

          <div className="site-footer__aside" data-cinematic="rise" data-cinematic-delay="1">
            <p className="site-footer__note">
              EcomPros brings marketplace operations, order fulfillment,
              customer support, creative, marketing, and ecommerce development
              into one practical service partner.
            </p>

            <div className="site-footer__chips" aria-label="EcomPros service focus">
              <span>Operations</span>
              <span>Creative</span>
              <span>Marketing</span>
              <span>Technology</span>
            </div>

            <Button href="/booking" size="sm" className="site-footer__cta">
              Book call
              <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </div>

        <div className="site-footer__meta" data-cinematic="rise" data-cinematic-delay="2">
          <Link href="/" className="site-footer__brand" aria-label={`${brand.name} home`}>
            <ThemeLogo alt={`${brand.name} logo`} className="site-footer__logo" priority />
          </Link>

          <nav aria-label="Footer" className="site-footer__links">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Social media" className="site-footer__socials">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                aria-label={`${brand.name} on ${item.label}`}
                className="site-footer__social-link"
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
                title={item.label}
              >
                {item.icon}
              </a>
            ))}
          </nav>

          
        </div>
        <div className="site-footer__copyright text-center" data-cinematic="rise" data-cinematic-delay="3" >
          &copy; {year} {brand.name}. All rights reserved. support by <a href="https://zatiqeasy.com/" target="_blank" rel="noopener noreferrer">ZatiqEasy</a>
        </div>
      </div>
    </footer>
  );
}
