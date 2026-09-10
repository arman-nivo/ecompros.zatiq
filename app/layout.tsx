import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import CustomCursor from "@/components/effects/CustomCursor";
import FloatingContact from "@/components/layout/FloatingContact";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { brand } from "@/lib/brand";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  display: "swap",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  subsets: ["latin"],
});

const siteTitle = "Ecommerce Operations & Marketplace Support |EcomPros";
const siteKeywords = [
  "ecommerce operations",
  "marketplace management",
  "order processing and fulfillment",
  "ecommerce customer support",
  "product listing management",
  "ecommerce marketing",
  "ecommerce website development",
];
const socialImage = {
  url: "/assets/home/EcomPros-hero-command.png",
  width: 1672,
  height: 941,
  alt: "Ecom ProDesk digital product interface system preview",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://EcomPros.org"),
  title: siteTitle,
  description: brand.description,
  applicationName: brand.name,
  keywords: siteKeywords,
  creator: brand.name,
  publisher: brand.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: brand.description,
    url: "/",
    siteName: brand.name,
    images: [socialImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: brand.description,
    images: [socialImage],
  },
  icons: {
    icon: [
      { url: brand.icons.app },
      { url: brand.icons.favicon16, sizes: "16x16", type: "image/png" },
      { url: brand.icons.favicon32, sizes: "32x32", type: "image/png" },
      { url: brand.icons.faviconIco },
    ],
    apple: [
      {
        url: brand.icons.appleTouch,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [brand.icons.shortcut],
  },
  manifest: brand.icons.manifest,
};

export const viewport: Viewport = {
  colorScheme: "light",
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${plusJakartaSans.variable}`}
    >
      <body className="site-body">
        <CustomCursor />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  );
}
