import { toolRegistry } from "@/components/services/tools";

export default function PlatformMarquee({ label, tools }: { label: string; tools: readonly string[] }) {
  const entries = tools.flatMap((tool) => {
    const entry = toolRegistry[tool];
    return entry ? [{ ...entry, key: tool }] : [];
  });

  return (
    <div className="sv-marquee">
      <p className="sv-marquee__label">{label}</p>
      <div className="sv-marquee__viewport">
        <div className="sv-marquee__track">
          {[0, 1].map((copy) => (
            <ul aria-hidden={copy === 1 || undefined} key={copy}>
              {entries.map(({ brand, icon: Icon, key, label: name }) => (
                <li key={key}>
                  <Icon aria-hidden className={`sv-marquee__icon cv-brand--${brand}`} />
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
