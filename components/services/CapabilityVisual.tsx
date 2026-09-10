import {
  IconBrandEtsy,
  IconBrandAmazon,
  IconBrandFigma,
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandTiktok,
  IconBrandWalmart,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  ArrowRight,
  Bell,
  Check,
  CircleCheck,
  FileImage,
  FileText,
  Film,
  Folder,
  Layers,
  Lock,
  MapPin,
  MousePointer2,
  Navigation,
  Phone,
  Play,
  Radar,
  Repeat,
  Scissors,
  Search,
  ShieldAlert,
  ShieldCheck,
  Shirt,
  Sparkles,
  Store,
  TriangleAlert,
  Truck,
  Type,
  VolumeX,
  X,
} from "lucide-react";
import { Fragment, type CSSProperties, type ReactNode } from "react";

type Tone = "ok" | "warn" | "bad" | "accent";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function vars(values: Record<string, string | number>) {
  return values as CSSProperties;
}

function Win({
  badge,
  children,
  className,
  title,
}: {
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cx("cv-win", className)}>
      <div className="cv-win__bar">
        <i />
        <i />
        <i />
        {title ? <span>{title}</span> : null}
      </div>
      <div className="cv-win__body">{children}</div>
      {badge ? <span className="cv-badge">{badge}</span> : null}
    </div>
  );
}

function Line({ tone, w }: { tone?: "strong" | "accent"; w: string }) {
  return <span className={cx("cv-line", tone && `cv-line--${tone}`)} style={vars({ "--w": w })} />;
}

function Chip({ children, tone }: { children: ReactNode; tone?: Tone | "" }) {
  return <span className={cx("cv-chip", tone && `cv-chip--${tone}`)}>{children}</span>;
}

function Tick({ on = true }: { on?: boolean }) {
  return <span className={cx("cv-tick", on && "cv-tick--on")}>{on ? <Check /> : null}</span>;
}

function Task({ children, done = true, extra }: { children: ReactNode; done?: boolean; extra?: ReactNode }) {
  return (
    <div className="cv-task">
      <Tick on={done} />
      <span className={cx(done && "cv-done")}>{children}</span>
      {extra}
    </div>
  );
}

function FileRow({
  icon,
  meta,
  name,
  tone,
}: {
  icon: ReactNode;
  meta: string;
  name: string;
  tone: "accent" | "red" | "violet" | "blue" | "ink";
}) {
  return (
    <div className="cv-file">
      <span className={`cv-file__icon cv-file__icon--${tone}`}>{icon}</span>
      <span className="cv-file__name">{name}</span>
      <span className="cv-muted cv-mono">{meta}</span>
    </div>
  );
}

function waveBars(seed: number) {
  return Array.from({ length: 30 }, (_, i) => 22 + ((i * 37 + seed * 53) % 71));
}

const visuals: Record<string, () => ReactNode> = {
  "product-listing": () => (
    <Win badge={<Chip tone="ok"><Check /> Published</Chip>} title="Edit product">
      <div className="cv-row cv-top">
        <div className="cv-thumb"><Shirt /></div>
        <div className="cv-stack cv-grow">
          <span className="cv-text">Linen Shirt · Sand</span>
          <Line w="92%" />
          <Line w="68%" />
          <div className="cv-row">
            <Chip tone="accent">$48.00</Chip>
            <Chip>SKU LS-01</Chip>
          </div>
        </div>
      </div>
      <div className="cv-row cv-between">
        <div className="cv-row">
          <span className="cv-size">S</span>
          <span className="cv-size cv-size--on">M</span>
          <span className="cv-size">L</span>
          <span className="cv-size">XL</span>
        </div>
        <div className="cv-row">
          <i className="cv-swatch" style={vars({ "--c": "#d8c3a0" })} />
          <i className="cv-swatch" style={vars({ "--c": "#4b5563" })} />
          <i className="cv-swatch" style={vars({ "--c": "#8fae98" })} />
        </div>
      </div>
    </Win>
  ),

  inventory: () => (
    <Win badge={<Chip tone="warn">2 need attention</Chip>} title="Inventory">
      {(
        [
          ["LS-01", "82%", "In stock", "ok"],
          ["LS-02", "18%", "Low", "warn"],
          ["LS-03", "4%", "Restock", "bad"],
          ["LS-04", "64%", "In stock", "ok"],
        ] as const
      ).map(([sku, level, label, tone]) => (
        <div className="cv-inv" key={sku}>
          <span className="cv-mono cv-text">{sku}</span>
          <span className={`cv-meter cv-meter--${tone}`}><i style={vars({ "--w": level })} /></span>
          <Chip tone={tone}>{label}</Chip>
        </div>
      ))}
    </Win>
  ),

  "order-timeline": () => (
    <Win badge={<Chip tone="accent"><Bell /> Customer notified</Chip>} title="Order #1042">
      <div className="cv-steps">
        {(
          [
            ["Ordered", "done"],
            ["Packed", "done"],
            ["Shipped", "now"],
            ["Delivered", ""],
          ] as const
        ).map(([label, state]) => (
          <div className={cx("cv-step", state && `cv-step--${state}`)} key={label}>
            <span className="cv-step__dot">
              {state === "done" ? <Check /> : state === "now" ? <Truck /> : null}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="cv-row cv-between cv-rule">
        <span className="cv-muted">Estimated delivery</span>
        <span className="cv-text">Thu, 12 Sep</span>
      </div>
    </Win>
  ),

  chat: () => (
    <div className="cv-chat">
      <div className="cv-msg">
        <span className="cv-avatar">JM</span>
        <p>Hi! Where is my order #1042?</p>
      </div>
      <div className="cv-msg cv-msg--me">
        <p>It shipped today. Here is your tracking link.</p>
        <span className="cv-avatar cv-avatar--brand">EP</span>
      </div>
      <div className="cv-msg">
        <span className="cv-avatar">JM</span>
        <p>Perfect, thank you!</p>
      </div>
      <div className="cv-row cv-chat__meta">
        <Chip tone="ok"><Check /> Resolved in 4 min</Chip>
      </div>
    </div>
  ),

  marketplaces: () => (
    <div className="cv-hub">
      <div className="cv-hub__center">
        <Store />
        <span>Your store</span>
      </div>
      <span className="cv-hub__rail" />
      <div className="cv-hub__nodes">
        {(
          [
            [<IconBrandAmazon key="i" />, "Amazon", "12 orders", "amazon"],
            [<IconBrandEtsy key="i" />, "Etsy", "3 messages", "etsy"],
            [<IconBrandWalmart key="i" />, "Walmart", "Synced", "walmart"],
          ] as const
        ).map(([icon, name, status, brand]) => (
          <div className="cv-hub__node" key={name}>
            <span className={`cv-brand cv-brand--${brand}`}>{icon}</span>
            <span className="cv-text">{name}</span>
            <span className="cv-muted"><i className="cv-dot cv-dot--ok" /> {status}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  "admin-tasks": () => (
    <Win badge={<Chip tone="ok">2 of 3 done</Chip>} title="This week">
      <Task>Update summer collection</Task>
      <Task>Schedule 15% off promo</Task>
      <Task done={false} extra={<Chip tone="accent">Fri</Chip>}>Send weekly report</Task>
      <span className="cv-progress"><i style={vars({ "--w": "66%" })} /></span>
    </Win>
  ),

  storyboard: () => (
    <div className="cv-board">
      {(
        [
          ["01", "Hook", <Sparkles key="i" />],
          ["02", "Problem", <TriangleAlert key="i" />],
          ["03", "Solution", <CircleCheck key="i" />],
        ] as const
      ).map(([number, label, icon]) => (
        <div className="cv-frame" key={number}>
          <div className="cv-frame__art">{icon}</div>
          <div className="cv-row cv-between">
            <span className="cv-mono cv-accent">{number}</span>
            <span className="cv-text">{label}</span>
          </div>
          <Line w="92%" />
          <Line w="60%" />
        </div>
      ))}
    </div>
  ),

  explainer: () => (
    <div className="cv-player">
      <div className="cv-player__screen">
        <div className="cv-player__ui">
          <Line tone="strong" w="55%" />
          <Line w="82%" />
          <Line w="64%" />
          <span className="cv-player__cta" />
        </div>
        <span className="cv-play"><Play /></span>
      </div>
      <div className="cv-player__bar">
        <span className="cv-mono">0:18</span>
        <span className="cv-scrub">
          <i style={vars({ "--w": "40%" })} />
          <b style={vars({ "--x": "28%" })} />
          <b style={vars({ "--x": "72%" })} />
        </span>
        <span className="cv-mono">0:45</span>
      </div>
      <div className="cv-row cv-center">
        <Chip>Intro</Chip>
        <Chip tone="accent">Key feature</Chip>
        <Chip>Call to action</Chip>
      </div>
    </div>
  ),

  loop: () => (
    <Win
      badge={<Chip tone="accent"><Repeat /> Loops <VolumeX /> Muted</Chip>}
      title="yourbrand.com"
    >
      <div className="cv-hero">
        <div className="cv-hero__copy">
          <Line tone="strong" w="88%" />
          <Line tone="strong" w="62%" />
          <Line w="76%" />
          <span className="cv-btn cv-btn--sm">Get started</span>
        </div>
        <div className="cv-hero__art">
          <i />
          <i />
          <i />
        </div>
      </div>
    </Win>
  ),

  keyframes: () => (
    <Win title="Timeline · 00:04">
      <div className="cv-tracks">
        <div className="cv-tracks__labels">
          <span>Title</span>
          <span>Logo</span>
          <span>Screen</span>
        </div>
        <div className="cv-tracks__lanes">
          {[
            ["8%", "44%"],
            ["30%", "62%", "90%"],
            ["16%", "54%"],
          ].map((keys, index) => (
            <div className="cv-lane" key={index}>
              <i style={vars({ "--x0": keys[0], "--x1": keys[keys.length - 1] })} />
              {keys.map((key) => (
                <b key={key} style={vars({ "--x": key })} />
              ))}
            </div>
          ))}
          <span className="cv-playhead" style={vars({ "--x": "48%" })} />
        </div>
      </div>
    </Win>
  ),

  captions: () => (
    <div className="cv-row cv-captions">
      <div className="cv-phone">
        <div className="cv-phone__screen">
          <span className="cv-person" />
          <div className="cv-lower-third">
            <strong>Sarah Lee</strong>
            <span>Founder</span>
          </div>
          <p className="cv-caption">
            Saves <mark>10 hrs</mark> a week
          </p>
        </div>
      </div>
      <div className="cv-stack cv-annotations">
        <Chip tone="accent">Lower third</Chip>
        <Chip tone="accent">Captions</Chip>
        <Chip>Readable on mobile</Chip>
      </div>
    </div>
  ),

  waveform: () => (
    <Win badge={<Chip tone="ok">12 min tightened</Chip>} title="Episode 12 · edit">
      <div className="cv-tracks">
        <div className="cv-tracks__labels">
          <span>Host</span>
          <span>Guest</span>
        </div>
        <div className="cv-tracks__lanes">
          {[1, 4].map((seed) => (
            <div className="cv-wave" key={seed}>
              {waveBars(seed).map((height, index) => (
                <i key={index} style={vars({ "--h": `${height}%` })} />
              ))}
            </div>
          ))}
          <span className="cv-cut-zone" style={vars({ "--x": "36%", "--w": "16%" })} />
          <span className="cv-cut" style={vars({ "--x": "36%" })}><Scissors /></span>
        </div>
      </div>
    </Win>
  ),

  "aspect-ratios": () => (
    <div className="cv-ratios">
      {(
        [
          ["9:16", "Reels & TikTok", "v", <IconBrandTiktok key="i" />],
          ["1:1", "Feed post", "s", <IconBrandInstagram key="i" />],
          ["16:9", "YouTube", "h", <IconBrandYoutube key="i" />],
        ] as const
      ).map(([ratio, label, shape, icon]) => (
        <div className="cv-ratio" key={ratio}>
          <div className={`cv-ratio__frame cv-ratio__frame--${shape}`}>
            {icon}
            <span className="cv-mono">{ratio}</span>
          </div>
          <span className="cv-muted">{label}</span>
        </div>
      ))}
    </div>
  ),

  "export-files": () => (
    <Win badge={<Chip tone="ok"><Check /> Ready</Chip>} title="Delivery / Launch video">
      <FileRow icon={<Film />} meta="24 MB" name="hero-loop_16x9.mp4" tone="accent" />
      <FileRow icon={<Film />} meta="18 MB" name="reel_9x16.mp4" tone="accent" />
      <FileRow icon={<Film />} meta="12 MB" name="post_1x1.mp4" tone="accent" />
      <FileRow icon={<FileImage />} meta="1.2 MB" name="thumbnail.png" tone="blue" />
    </Win>
  ),

  login: () => (
    <Win badge={<Chip tone="ok"><ShieldCheck /> Reviewed</Chip>} className="cv-win--narrow" title="Sign in">
      <div className="cv-field">
        <span>Password</span>
        <span className="cv-input cv-input--pw">
          ••••••••
          <Lock />
        </span>
      </div>
      <div className="cv-field">
        <span>2-step code</span>
        <div className="cv-otp">
          <i>4</i>
          <i>8</i>
          <i>2</i>
          <i>9</i>
          <i className="cv-otp__caret" />
          <i />
        </div>
      </div>
      <span className="cv-btn cv-btn--block">Sign in</span>
    </Win>
  ),

  permissions: () => (
    <Win title="Roles & permissions">
      <div className="cv-matrix">
        <span />
        <span className="cv-matrix__head">View</span>
        <span className="cv-matrix__head">Edit</span>
        <span className="cv-matrix__head">Admin</span>
        {(
          [
            ["Owner", [true, true, true]],
            ["Staff", [true, true, false]],
            ["Guest", [true, false, false]],
          ] as const
        ).map(([role, rights]) => (
          <Fragment key={role}>
            <span className="cv-text">{role}</span>
            {rights.map((allowed, index) => (
              <span className={cx("cv-perm", allowed ? "cv-perm--yes" : "cv-perm--no")} key={index}>
                {allowed ? <Check /> : <X />}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </Win>
  ),

  "security-settings": () => (
    <Win title="Security settings">
      {(
        [
          ["Two-step login", "Recommended", true],
          ["New login alerts", "", true],
          ["Share usage data", "Your choice", false],
        ] as const
      ).map(([label, note, on]) => (
        <div className="cv-setting" key={label}>
          <span className="cv-stack-tight">
            <span className="cv-text">{label}</span>
            {note ? <span className="cv-muted">{note}</span> : null}
          </span>
          <span className={cx("cv-toggle", on && "cv-toggle--on")} />
        </div>
      ))}
      <div className="cv-row cv-rule">
        <CircleCheck className="cv-ok-icon" />
        <span className="cv-muted">Recovery email verified</span>
      </div>
    </Win>
  ),

  scan: () => (
    <Win badge={<Chip tone="warn">3 to fix</Chip>} title="Security scan">
      <div className="cv-row">
        <span className="cv-icon-tile"><Radar /></span>
        <span className="cv-stack-tight">
          <span className="cv-text">128 packages checked</span>
          <span className="cv-muted">Last run 2 min ago</span>
        </span>
      </div>
      {(
        [
          ["High", "bad", "Outdated login package"],
          ["Medium", "warn", "Public config file"],
          ["Low", "", "Missing security header"],
        ] as const
      ).map(([level, tone, issue]) => (
        <div className="cv-issue" key={issue}>
          <Chip tone={tone}>{level}</Chip>
          <span>{issue}</span>
        </div>
      ))}
    </Win>
  ),

  checklist: () => (
    <Win badge={<Chip tone="accent">75% complete</Chip>} title="Launch checklist">
      <span className="cv-progress"><i style={vars({ "--w": "75%" })} /></span>
      <Task>Backups switched on</Task>
      <Task>Admin access reviewed</Task>
      <Task>Vendor list updated</Task>
      <Task done={false}>Incident contacts added</Task>
    </Win>
  ),

  "incident-flow": () => (
    <div className="cv-stack cv-flow-wrap">
      <div className="cv-flow">
        {(
          [
            [<Radar key="i" />, "Detect"],
            [<Phone key="i" />, "Contact"],
            [<ShieldAlert key="i" />, "Contain"],
            [<FileText key="i" />, "Review"],
          ] as const
        ).map(([icon, label], index) => (
          <Fragment key={label}>
            <div className={cx("cv-flow__node", index === 1 && "cv-flow__node--active")}>
              <span>{icon}</span>
              <strong>{label}</strong>
              <small>Step {index + 1}</small>
            </div>
            {index < 3 ? <ArrowRight className="cv-flow__arrow" /> : null}
          </Fragment>
        ))}
      </div>
      <div className="cv-row cv-center">
        <Chip tone="accent"><Phone /> On call: Alex</Chip>
        <Chip>Escalate after 15 min</Chip>
      </div>
    </div>
  ),

  policy: () => (
    <Win badge={<Chip tone="ok">Plain language</Chip>} title="Privacy policy">
      <div className="cv-doc">
        <div className="cv-doc__toc">
          <span className="cv-toc cv-toc--on">1. Data we collect</span>
          <span className="cv-toc">2. How we use it</span>
          <span className="cv-toc">3. Your choices</span>
          <span className="cv-toc">4. Contact us</span>
        </div>
        <div className="cv-stack">
          <span className="cv-text">Data we collect</span>
          <Line w="96%" />
          <Line w="88%" />
          <Line w="92%" />
          <Line w="58%" />
        </div>
      </div>
    </Win>
  ),

  training: () => (
    <Win title="Lesson 2 of 5 · Spot a phishing email">
      <div className="cv-mail">
        <div className="cv-row">
          <span className="cv-avatar cv-avatar--warn">!</span>
          <span className="cv-stack-tight">
            <span className="cv-text">&ldquo;Your account is locked&rdquo;</span>
            <span className="cv-muted cv-mono">billing@secure-update.co</span>
          </span>
        </div>
        <span className="cv-link-warn"><TriangleAlert /> Suspicious link spotted</span>
      </div>
      <div className="cv-row">
        <span className="cv-choice">Looks safe</span>
        <span className="cv-choice cv-choice--on"><Check /> Report it</span>
      </div>
    </Win>
  ),

  identity: () => (
    <div className="cv-identity">
      <div className="cv-stack">
        <div className="cv-logo-card">
          <span className="cv-logo-mark" />
          <span className="cv-text">Northwind</span>
        </div>
        <div className="cv-type">
          <span className="cv-type__aa">Aa</span>
          <span className="cv-stack-tight">
            <span className="cv-text">Display font</span>
            <span className="cv-muted">Bold · 48 / 56</span>
          </span>
        </div>
      </div>
      <div className="cv-swatches">
        {[
          ["#F26B1D", "Accent"],
          ["#1F1A17", "Ink"],
          ["#F4EFE9", "Paper"],
          ["#2F6F5E", "Support"],
        ].map(([color, name]) => (
          <div className="cv-swatch-card" key={name}>
            <i style={vars({ "--c": color })} />
            <span className="cv-text">{name}</span>
            <span className="cv-muted cv-mono">{color}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  voice: () => (
    <Win title="Voice guide">
      <div className="cv-voice cv-voice--do">
        <span className="cv-voice__tag"><Check /> Say</span>
        <span className="cv-text">&ldquo;Launch your store this week.&rdquo;</span>
      </div>
      <div className="cv-voice cv-voice--dont">
        <span className="cv-voice__tag"><X /> Avoid</span>
        <span className="cv-muted cv-strike">&ldquo;Leverage synergistic solutions.&rdquo;</span>
      </div>
      <div className="cv-row cv-between">
        <div className="cv-row">
          <Chip>Clear</Chip>
          <Chip>Friendly</Chip>
          <Chip>Direct</Chip>
        </div>
        <span className="cv-btn cv-btn--sm">Book a call</span>
      </div>
    </Win>
  ),

  tokens: () => (
    <Win title="tokens.json">
      <div className="cv-token">
        <i className="cv-token__swatch" />
        <span className="cv-mono">color.accent</span>
        <span className="cv-mono cv-muted">#F26B1D</span>
      </div>
      <div className="cv-token">
        <i className="cv-token__space" />
        <span className="cv-mono">space.md</span>
        <span className="cv-mono cv-muted">16px</span>
      </div>
      <div className="cv-token">
        <i className="cv-token__radius" />
        <span className="cv-mono">radius.pill</span>
        <span className="cv-mono cv-muted">999px</span>
      </div>
      <div className="cv-token">
        <i className="cv-token__type">Aa</i>
        <span className="cv-mono">font.display</span>
        <span className="cv-mono cv-muted">Jakarta 800</span>
      </div>
    </Win>
  ),

  "ui-kit": () => (
    <div className="cv-kit">
      <div className="cv-kit__cell">
        <small>Buttons</small>
        <div className="cv-row">
          <span className="cv-btn cv-btn--sm">Primary</span>
          <span className="cv-btn cv-btn--sm cv-btn--ghost">Secondary</span>
        </div>
      </div>
      <div className="cv-kit__cell">
        <small>Inputs</small>
        <span className="cv-input">Email address</span>
      </div>
      <div className="cv-kit__cell">
        <small>Controls</small>
        <div className="cv-row">
          <span className="cv-toggle cv-toggle--on" />
          <Tick />
          <span className="cv-radio" />
        </div>
      </div>
      <div className="cv-kit__cell">
        <small>Cards</small>
        <div className="cv-row">
          <span className="cv-kit__img" />
          <span className="cv-stack cv-grow">
            <Line tone="strong" w="80%" />
            <Line w="60%" />
          </span>
        </div>
      </div>
    </div>
  ),

  "figma-canvas": () => (
    <div className="cv-canvas">
      <span className="cv-canvas__logo"><IconBrandFigma /></span>
      <div className="cv-artboard cv-artboard--poster">
        <small>Poster</small>
        <span className="cv-artboard__fill" />
        <Line tone="strong" w="80%" />
        <Line w="55%" />
      </div>
      <div className="cv-artboard cv-artboard--story cv-artboard--selected">
        <small>Story</small>
        <span className="cv-artboard__fill cv-artboard__fill--accent" />
        <Line tone="strong" w="70%" />
        <i className="cv-handle cv-handle--tl" />
        <i className="cv-handle cv-handle--tr" />
        <i className="cv-handle cv-handle--bl" />
        <i className="cv-handle cv-handle--br" />
      </div>
      <div className="cv-artboard cv-artboard--post">
        <small>Post</small>
        <span className="cv-artboard__fill" />
        <Line w="70%" />
      </div>
      <span className="cv-cursor">
        <MousePointer2 />
        <b>You</b>
      </span>
    </div>
  ),

  "social-templates": () => (
    <div className="cv-stack cv-socials-wrap">
      <div className="cv-row cv-between">
        <span className="cv-text">Social template set</span>
        <Chip tone="accent">12 formats</Chip>
      </div>
      <div className="cv-socials">
        <div className="cv-social cv-social--accent">
          <strong>Launch day</strong>
          <span>Now live</span>
        </div>
        <div className="cv-social">
          <span className="cv-social__img"><Shirt /></span>
          <span className="cv-chip cv-chip--accent">New drop</span>
        </div>
        <div className="cv-social cv-social--ink">
          <strong>50% off</strong>
          <span>This weekend</span>
        </div>
      </div>
    </div>
  ),

  slide: () => (
    <div className="cv-deck">
      <div className="cv-slide">
        <div className="cv-stack cv-grow">
          <span className="cv-text">Market opportunity</span>
          <Line w="90%" />
          <Line w="76%" />
          <Line w="84%" />
        </div>
        <div className="cv-slide__chart">
          {[32, 48, 66, 90].map((height) => (
            <i key={height} style={vars({ "--h": `${height}%` })} />
          ))}
        </div>
        <span className="cv-slide__num cv-mono">4 / 12</span>
      </div>
      <div className="cv-thumbs">
        {[1, 2, 3, 4, 5].map((index) => (
          <i className={cx(index === 4 && "cv-thumbs__on")} key={index} />
        ))}
      </div>
    </div>
  ),

  "brand-package": () => (
    <Win badge={<Chip tone="ok"><Check /> Handed off</Chip>} title="Brand kit">
      <FileRow icon={<Folder />} meta="SVG · PNG" name="Logo pack" tone="accent" />
      <FileRow icon={<FileText />} meta="24 pages" name="Brand guidelines.pdf" tone="red" />
      <FileRow icon={<Layers />} meta="12 frames" name="Social templates.fig" tone="violet" />
      <FileRow icon={<Type />} meta="2 families" name="Fonts" tone="ink" />
    </Win>
  ),

  positioning: () => (
    <div className="cv-position">
      {[
        ["For", "Busy Shopify founders"],
        ["We offer", "Done-for-you store operations"],
        ["Why now", "Peak season is weeks away"],
      ].map(([key, value]) => (
        <div className="cv-position__row" key={key}>
          <span className="cv-position__key">{key}</span>
          <span className="cv-text">{value}</span>
        </div>
      ))}
      <span className="cv-btn cv-btn--sm">Book a free call</span>
    </div>
  ),

  "landing-wireframe": () => (
    <Win title="Landing page">
      <div className="cv-wire cv-wire--hero">
        <span className="cv-stack cv-grow">
          <Line tone="strong" w="80%" />
          <Line w="55%" />
        </span>
        <span className="cv-btn cv-btn--sm">Book a call</span>
        <small>Hero</small>
      </div>
      <div className="cv-wire cv-wire--proof">
        <i />
        <i />
        <i />
        <i />
        <small>Proof</small>
      </div>
      <div className="cv-wire cv-wire--features">
        <i />
        <i />
        <i />
        <small>Benefits</small>
      </div>
      <div className="cv-wire">
        <span className="cv-stack cv-grow">
          <Line w="70%" />
          <Line w="50%" />
        </span>
        <small>FAQ</small>
      </div>
    </Win>
  ),

  keywords: () => (
    <Win title="Keyword research">
      <div className="cv-search">
        <Search />
        <span>shopify virtual assistant</span>
      </div>
      {(
        [
          ["shopify virtual assistant", "2.4k", "82%", "Buy", "accent"],
          ["ecommerce va services", "1.1k", "46%", "Buy", "accent"],
          ["how to manage shopify orders", "880", "32%", "Learn", ""],
        ] as const
      ).map(([term, volume, level, intent, tone]) => (
        <div className="cv-kw" key={term}>
          <span className="cv-kw__term">{term}</span>
          <span className="cv-meter cv-meter--accent"><i style={vars({ "--w": level })} /></span>
          <span className="cv-mono cv-muted">{volume}</span>
          <Chip tone={tone}>{intent}</Chip>
        </div>
      ))}
    </Win>
  ),

  "seo-audit": () => (
    <Win title="SEO health check">
      <div className="cv-audit">
        <div className="cv-ring" style={vars({ "--p": 92 })}>
          <strong>92</strong>
          <small>Score</small>
        </div>
        <div className="cv-stack cv-grow">
          {(
            [
              ["Meta titles", "ok", "Pass"],
              ["Headings", "ok", "Pass"],
              ["Page speed", "warn", "Improve"],
              ["Internal links", "ok", "Pass"],
            ] as const
          ).map(([label, tone, status]) => (
            <div className="cv-audit__row" key={label}>
              <i className={`cv-dot cv-dot--${tone}`} />
              <span className="cv-text">{label}</span>
              <span className="cv-muted">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </Win>
  ),

  local: () => (
    <div className="cv-map">
      <span className="cv-map__pin"><MapPin /></span>
      <div className="cv-local">
        <div className="cv-row cv-between">
          <span className="cv-text">Your Store · Downtown</span>
          <Chip tone="ok">Open</Chip>
        </div>
        <div className="cv-row">
          <span className="cv-stars">★★★★★</span>
          <span className="cv-text">4.9</span>
          <span className="cv-muted">(128 reviews)</span>
        </div>
        <div className="cv-row">
          <span className="cv-btn cv-btn--sm"><Navigation /> Directions</span>
          <span className="cv-btn cv-btn--sm cv-btn--ghost"><Phone /> Call</span>
        </div>
      </div>
    </div>
  ),

  "campaign-board": () => (
    <Win title="Q4 campaign plan">
      <div className="cv-gantt">
        <span />
        {["Wk 1", "Wk 2", "Wk 3", "Wk 4"].map((week) => (
          <span className="cv-gantt__week" key={week}>{week}</span>
        ))}
        {(
          [
            ["Landing", 1, 2, "accent"],
            ["Email", 2, 3, "blue"],
            ["Social", 1, 4, "violet"],
            ["Ads", 3, 2, "green"],
          ] as const
        ).map(([label, start, span, tone], index) => (
          <Fragment key={label}>
            <span className="cv-gantt__label" style={{ gridRow: index + 2 }}>{label}</span>
            <span
              className={`cv-gantt__bar cv-gantt__bar--${tone}`}
              style={{ gridColumn: `${start + 1} / span ${span}`, gridRow: index + 2 }}
            />
          </Fragment>
        ))}
      </div>
    </Win>
  ),

  "meta-ad": () => (
    <div className="cv-row cv-ad-wrap">
      <div className="cv-ad">
        <div className="cv-ad__head">
          <span className="cv-avatar cv-avatar--brand">YB</span>
          <span className="cv-stack-tight">
            <span className="cv-text">Your Brand</span>
            <span className="cv-muted cv-row">Sponsored · <IconBrandMeta className="cv-inline-icon" /></span>
          </span>
        </div>
        <div className="cv-ad__media">
          <Shirt />
          <span className="cv-chip cv-chip--accent">New season</span>
        </div>
        <div className="cv-ad__foot">
          <span className="cv-stack-tight">
            <span className="cv-muted">yourbrand.com</span>
            <span className="cv-text">Made to last</span>
          </span>
          <span className="cv-btn cv-btn--sm">Shop now</span>
        </div>
      </div>
      <div className="cv-stack cv-annotations">
        <Chip tone="ok">CTR 2.8%</Chip>
        <Chip>Age 25–44</Chip>
        <Chip>3 variants</Chip>
      </div>
    </div>
  ),

  report: () => (
    <Win title="Monthly report">
      <div className="cv-kpis">
        {(
          [
            ["Traffic", "+24%", "ok"],
            ["Leads", "138", ""],
            ["Rankings", "+12", "ok"],
          ] as const
        ).map(([label, value, tone]) => (
          <div className="cv-kpi" key={label}>
            <small>{label}</small>
            <strong className={cx(tone && `cv-kpi--${tone}`)}>{value}</strong>
          </div>
        ))}
      </div>
      <svg className="cv-spark" preserveAspectRatio="none" viewBox="0 0 200 44">
        <polygon points="0,44 0,36 25,33 50,35 75,26 100,28 125,19 150,21 175,10 200,6 200,44" />
        <polyline points="0,36 25,33 50,35 75,26 100,28 125,19 150,21 175,10 200,6" />
      </svg>
      <Chip tone="accent"><ArrowRight /> Next: publish 2 new pages</Chip>
    </Win>
  ),
};

export default function CapabilityVisual({
  fallbackIcon,
  visual,
}: {
  fallbackIcon?: ReactNode;
  visual?: string;
}) {
  const render = visual ? visuals[visual] : undefined;

  return (
    <div aria-hidden="true" className="cv">
      {render ? render() : <span className="cv-fallback">{fallbackIcon}</span>}
    </div>
  );
}
