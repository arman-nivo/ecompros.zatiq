import {
  IconBrandAdobeAfterEffects,
  IconBrandAdobeIllustrator,
  IconBrandAdobePremiere,
  IconBrandAmazon,
  IconBrandAuth0,
  IconBrandChrome,
  IconBrandCloudflare,
  IconBrandDropbox,
  IconBrandEtsy,
  IconBrandFacebook,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandGoogle,
  IconBrandGoogleAnalytics,
  IconBrandGoogleDrive,
  IconBrandGoogleMaps,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMessenger,
  IconBrandMeta,
  IconBrandNotion,
  IconBrandSpotify,
  IconBrandTiktok,
  IconBrandWalmart,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { Sheet, ShoppingBag } from "lucide-react";
import type { ComponentType } from "react";

import "@/components/services/capabilities.css";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export const toolRegistry: Record<string, { brand: string; icon: IconComponent; label: string }> = {
  "after-effects": { brand: "adobe-video", icon: IconBrandAdobeAfterEffects, label: "After Effects" },
  amazon: { brand: "amazon", icon: IconBrandAmazon, label: "Amazon" },
  auth0: { brand: "auth0", icon: IconBrandAuth0, label: "Auth0" },
  chrome: { brand: "google", icon: IconBrandChrome, label: "Lighthouse" },
  cloudflare: { brand: "cloudflare", icon: IconBrandCloudflare, label: "Cloudflare" },
  drive: { brand: "drive", icon: IconBrandGoogleDrive, label: "Google Drive" },
  dropbox: { brand: "dropbox", icon: IconBrandDropbox, label: "Dropbox" },
  etsy: { brand: "etsy", icon: IconBrandEtsy, label: "Etsy" },
  facebook: { brand: "facebook", icon: IconBrandFacebook, label: "Facebook" },
  figma: { brand: "figma", icon: IconBrandFigma, label: "Figma" },
  github: { brand: "ink", icon: IconBrandGithub, label: "GitHub" },
  gmail: { brand: "gmail", icon: IconBrandGmail, label: "Gmail" },
  google: { brand: "google", icon: IconBrandGoogle, label: "Google" },
  "google-analytics": { brand: "analytics", icon: IconBrandGoogleAnalytics, label: "Google Analytics" },
  "google-maps": { brand: "maps", icon: IconBrandGoogleMaps, label: "Google Business" },
  illustrator: { brand: "illustrator", icon: IconBrandAdobeIllustrator, label: "Illustrator" },
  instagram: { brand: "instagram", icon: IconBrandInstagram, label: "Instagram" },
  linkedin: { brand: "linkedin", icon: IconBrandLinkedin, label: "LinkedIn" },
  messenger: { brand: "messenger", icon: IconBrandMessenger, label: "Messenger" },
  meta: { brand: "meta", icon: IconBrandMeta, label: "Meta Ads" },
  notion: { brand: "ink", icon: IconBrandNotion, label: "Notion" },
  premiere: { brand: "adobe-video", icon: IconBrandAdobePremiere, label: "Premiere Pro" },
  sheets: { brand: "sheets", icon: Sheet, label: "Google Sheets" },
  shopify: { brand: "shopify", icon: ShoppingBag, label: "Shopify" },
  spotify: { brand: "spotify", icon: IconBrandSpotify, label: "Spotify" },
  tiktok: { brand: "ink", icon: IconBrandTiktok, label: "TikTok" },
  walmart: { brand: "walmart", icon: IconBrandWalmart, label: "Walmart" },
  whatsapp: { brand: "whatsapp", icon: IconBrandWhatsapp, label: "WhatsApp" },
  youtube: { brand: "youtube", icon: IconBrandYoutube, label: "YouTube" },
};

export function ToolChip({ tool }: { tool: string }) {
  const entry = toolRegistry[tool];

  if (!entry) {
    return null;
  }

  const Icon = entry.icon;

  return (
    <li className="capability-tool">
      <Icon aria-hidden className={`capability-tool__icon cv-brand--${entry.brand}`} />
      {entry.label}
    </li>
  );
}
