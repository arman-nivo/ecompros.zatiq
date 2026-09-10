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
import {
  Boxes,
  Bug,
  CalendarRange,
  Captions,
  ChartLine,
  Check,
  CirclePlay,
  Clapperboard,
  ClipboardCheck,
  Component,
  FolderOpen,
  Gauge,
  GraduationCap,
  KeyRound,
  ListChecks,
  MapPin,
  Megaphone,
  MessagesSquare,
  Mic,
  MousePointerClick,
  Package,
  Palette,
  PanelsTopLeft,
  PenTool,
  Presentation,
  Quote,
  Repeat,
  ScrollText,
  Search,
  Sheet,
  ShieldCheck,
  ShoppingBag,
  Siren,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Target,
  Truck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import CapabilityVisual from "@/components/services/CapabilityVisual";
import "@/components/services/capabilities.css";
import type { ServiceCapability, ServiceCapabilityGroup } from "@/lib/services";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const capabilityIcons: Record<string, LucideIcon> = {
  boxes: Boxes,
  bug: Bug,
  calendar: CalendarRange,
  captions: Captions,
  chart: ChartLine,
  "circle-play": CirclePlay,
  clapperboard: Clapperboard,
  "clipboard-check": ClipboardCheck,
  component: Component,
  "folder-open": FolderOpen,
  gauge: Gauge,
  "graduation-cap": GraduationCap,
  "key-round": KeyRound,
  "list-checks": ListChecks,
  "map-pin": MapPin,
  megaphone: Megaphone,
  messages: MessagesSquare,
  mic: Mic,
  package: Package,
  palette: Palette,
  panels: PanelsTopLeft,
  "pen-tool": PenTool,
  pointer: MousePointerClick,
  presentation: Presentation,
  quote: Quote,
  repeat: Repeat,
  "scroll-text": ScrollText,
  search: Search,
  "shield-check": ShieldCheck,
  siren: Siren,
  sliders: SlidersHorizontal,
  smartphone: Smartphone,
  sparkles: Sparkles,
  store: Store,
  tag: Tag,
  target: Target,
  truck: Truck,
  "users-round": UsersRound,
};

const toolRegistry: Record<string, { brand: string; icon: IconComponent; label: string }> = {
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

function ToolChip({ tool }: { tool: string }) {
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

function groupCapabilities(
  capabilities: readonly ServiceCapability[],
  groups: readonly ServiceCapabilityGroup[] | undefined,
) {
  const grouped = groups?.length
    ? groups
        .map((group) => ({
          ...group,
          items: capabilities.filter((capability) => capability.group === group.title),
        }))
        .filter((group) => group.items.length > 0)
    : [{ summary: "", title: "", items: capabilities }];

  // Number cards in the order they are displayed, not the order they are defined.
  let number = 0;

  return grouped.map((group) => ({
    ...group,
    items: group.items.map((capability) => ({ capability, number: ++number })),
  }));
}

export default function ServiceCapabilities({
  capabilities,
  groups,
  serviceTitle,
}: {
  capabilities: readonly ServiceCapability[];
  groups?: readonly ServiceCapabilityGroup[];
  serviceTitle: string;
}) {
  const grouped = groupCapabilities(capabilities, groups);
  const tools = Array.from(new Set(capabilities.flatMap((capability) => capability.tools ?? [])));
  const hasGroups = grouped.length > 1 || Boolean(grouped[0]?.title);

  return (
    <section className="service-detail-panel capabilities" aria-labelledby="service-capabilities-title">
      <div className="capabilities__intro">
        <h3 id="service-capabilities-title">Capabilities</h3>
        <p>
          {capabilities.length} ways we help, organised into {grouped.length}{" "}
          {grouped.length === 1 ? "area" : "areas"}. Each card shows what the work looks like
          and the tools we use.
        </p>
      </div>

      {hasGroups ? (
        <nav className="capabilities__jump" aria-label={`${serviceTitle} capability areas`}>
          {grouped.map((group, index) => {
            const Icon = capabilityIcons[group.items[0]?.capability.icon ?? ""] ?? Sparkles;

            return (
              <a className="capabilities__jump-link" href={`#capability-area-${index + 1}`} key={group.title}>
                <Icon aria-hidden="true" />
                <span>{group.title}</span>
                <small>{group.items.length}</small>
              </a>
            );
          })}
        </nav>
      ) : null}

      {tools.length > 0 ? (
        <div className="capabilities__platforms">
          <p>Platforms &amp; tools we work with</p>
          <ul>
            {tools.map((tool) => (
              <ToolChip key={tool} tool={tool} />
            ))}
          </ul>
        </div>
      ) : null}

      {grouped.map((group, groupIndex) => (
        <div
          className="capability-area"
          id={hasGroups ? `capability-area-${groupIndex + 1}` : undefined}
          key={group.title || "all"}
        >
          {group.title ? (
            <header className="capability-area__head" data-cinematic="rise">
              <span className="capability-area__index">{String(groupIndex + 1).padStart(2, "0")}</span>
              <div>
                <h4>{group.title}</h4>
                {group.summary ? <p>{group.summary}</p> : null}
              </div>
            </header>
          ) : null}

          <div className="capability-cards">
            {group.items.map(({ capability, number }, index) => {
              const Icon = capabilityIcons[capability.icon ?? ""] ?? Sparkles;

              return (
                <article
                  className="capability-card"
                  data-cinematic="rise"
                  data-cinematic-delay={Math.min(index + 1, 4)}
                  key={capability.title}
                >
                  <CapabilityVisual fallbackIcon={<Icon />} visual={capability.visual} />

                  <div className="capability-card__body">
                    <div className="capability-card__head">
                      <span className="capability-card__icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="capability-card__number">{String(number).padStart(2, "0")}</span>
                    </div>
                    <h5>{capability.title}</h5>
                    <p>{capability.body}</p>

                    {capability.highlights?.length ? (
                      <ul className="capability-card__highlights" aria-label="Includes">
                        {capability.highlights.map((highlight) => (
                          <li key={highlight}>
                            <Check aria-hidden="true" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {capability.tools?.length ? (
                      <div className="capability-card__tools">
                        <span>Works with</span>
                        <ul>
                          {capability.tools.map((tool) => (
                            <ToolChip key={tool} tool={tool} />
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
