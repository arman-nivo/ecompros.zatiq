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
  ShieldCheck,
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

import CapabilityVisual from "@/components/services/CapabilityVisual";
import { ToolChip } from "@/components/services/tools";
import "@/components/services/capabilities.css";
import type { ServiceCapability, ServiceCapabilityGroup } from "@/lib/services";

export const capabilityIcons: Record<string, LucideIcon> = {
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
    <div className="capabilities">

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
                <h3>{group.title}</h3>
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
                    <h4>{capability.title}</h4>
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
    </div>
  );
}
