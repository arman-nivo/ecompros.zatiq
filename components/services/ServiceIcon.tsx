import { Clapperboard, Palette, ShieldCheck, ShoppingBag, TrendingUp, type LucideIcon, type LucideProps } from "lucide-react";
import { createElement } from "react";

import type { ServiceSlug } from "@/lib/services";

const serviceIcons: Partial<Record<ServiceSlug, LucideIcon>> = {
  "brand-ready-systems": Palette,
  "cybersecurity-helper": ShieldCheck,
  "e-commerce-virtual-assistant": ShoppingBag,
  "marketing-branding-seo": TrendingUp,
  "motion-video-design": Clapperboard,
};

export default function ServiceIcon({ slug, ...props }: LucideProps & { slug: ServiceSlug }) {
  return createElement(serviceIcons[slug] ?? ShoppingBag, props);
}
