export const serviceSlugs = [
  "web-design-development",
  "software-product-development",
  "motion-video-design",
  "cybersecurity-helper",
  "brand-ready-systems",
  "marketing-branding-seo",
  "e-commerce-virtual-assistant",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceCapability = {
  body: string;
  title: string;
  group?: string;
  highlights?: readonly string[];
  icon?: string;
  tools?: readonly string[];
  visual?: string;
};

export type ServiceCapabilityGroup = {
  summary: string;
  title: string;
};

export type ServiceFAQ = {
  answer: string;
  question: string;
};

export type ServiceStep = {
  body: string;
  title: string;
};

export type ServiceImage = {
  alt: string;
  src: string;
};

export type ServiceContent = {
  audienceFit: readonly string[];
  /** Secondary photo used in the "What you get" section. */
  detailImage?: ServiceImage;
  /** Benefit-led headline for the service hero. Falls back to the title. */
  headline?: string;
  /** Three short outcomes listed in the service hero. */
  heroPoints?: readonly string[];
  bookingLabel: string;
  capabilities: readonly ServiceCapability[];
  capabilityGroups?: readonly ServiceCapabilityGroup[];
  deliverables: readonly string[];
  faqs: readonly ServiceFAQ[];
  handoff: string;
  homeDescription: string;
  image: ServiceImage;
  meta: {
    description: string;
    title: string;
  };
  process: readonly ServiceStep[];
  relatedPortfolioSlugs: readonly string[];
  shortTitle: string;
  slug: ServiceSlug;
  stack: readonly string[];
  summary: string;
  title: string;
};

export type ServiceDecisionGuide = {
  need: string;
  note: string;
  serviceSlugs: readonly ServiceSlug[];
};

export type CombinedEngagement = {
  body: string;
  serviceSlugs: readonly ServiceSlug[];
  title: string;
};

export const services = [
  // {
  //   slug: "web-design-development",
  //   title: "Web design and development",
  //   shortTitle: "Web",
  //   bookingLabel: "Web design and development",
  //   summary:
  //     "Responsive marketing sites, product websites, web apps, dashboards, and CMS-backed pages built around one clear user action.",
  //   homeDescription:
  //     "Marketing pages, product sites, dashboards, and responsive front-end builds shaped around one clear action.",
  //   meta: {
  //     title: "Web Design and Development | EcomPros Services",
  //     description:
  //       "Ecom ProDesk web design and development services for startup websites, web apps, dashboards, CMS content systems, SEO foundations, analytics, DevOps, and launch support.",
  //   },
  //   audienceFit: [
  //     "A startup needs a credible launch site before outreach or fundraising.",
  //     "A product already exists, but the public website does not explain it clearly.",
  //     "A team needs a responsive web app, dashboard, or CMS-backed content surface.",
  //     "The current site is hard to maintain, slow, or inconsistent with the product.",
  //   ],
  //   capabilities: [
  //     {
  //       title: "UI/UX design",
  //       body:
  //         "Map the primary visitor path, wireframe the core screens, and shape the interface so people understand the offer without needing a sales deck first.",
  //     },
  //     {
  //       title: "Product discovery",
  //       body:
  //         "Turn unclear scope into a practical site map, feature list, content model, and release order that a small team can actually ship.",
  //     },
  //     {
  //       title: "Product development",
  //       body:
  //         "Build interactive web surfaces, account flows, lead forms, dashboards, calculators, profile pages, and launch-ready product experiences.",
  //     },
  //     {
  //       title: "Application architecture",
  //       body:
  //         "Define route structure, data boundaries, state ownership, API touchpoints, authentication needs, and reusable component patterns before implementation sprawls.",
  //     },
  //     {
  //       title: "Frontend engineering",
  //       body:
  //         "Implement accessible, responsive interfaces with production-grade React and Next.js patterns, not throwaway landing page markup.",
  //     },
  //     {
  //       title: "CMS and content architecture",
  //       body:
  //         "Create editable content structures for teams that need to publish pages, articles, resources, case studies, or campaign content after launch.",
  //     },
  //     {
  //       title: "Performance and SEO foundations",
  //       body:
  //         "Set semantic structure, metadata, responsive media, crawlable content, and performance habits early so the site is not repaired after launch.",
  //     },
  //     {
  //       title: "Analytics and conversion paths",
  //       body:
  //         "Prepare events, form handoff, booking paths, and content hierarchy so the site can tell the team what visitors are doing.",
  //     },
  //     {
  //       title: "DevOps and deployment",
  //       body:
  //         "Set up preview and production environments, environment variables, deployment notes, domain readiness, and a practical launch checklist.",
  //     },
  //   ],
  //   deliverables: [
  //     "Discovery notes, site map, and priority user journeys",
  //     "Responsive UI direction or coded prototype for the key pages",
  //     "Production Next.js website or web app implementation",
  //     "Reusable component patterns for future pages",
  //     "CMS, admin, or content editing workflow when needed",
  //     "Metadata, analytics, performance, and launch-readiness pass",
  //     "Deployment notes, environment guide, and handoff checklist",
  //   ],
  //   process: [
  //     {
  //       title: "Frame the visitor path",
  //       body:
  //         "Clarify the audience, offer, content hierarchy, conversion action, and launch deadline.",
  //     },
  //     {
  //       title: "Design the surface",
  //       body:
  //         "Create the core page structure, responsive states, visual system, and reusable interface patterns.",
  //     },
  //     {
  //       title: "Build the application",
  //       body:
  //         "Implement the route structure, components, data hooks, forms, media, and integrations.",
  //     },
  //     {
  //       title: "Harden for launch",
  //       body:
  //         "Review accessibility, responsiveness, metadata, speed, deployment, and edge states before public release.",
  //     },
  //   ],
  //   stack: [
  //     "Next.js",
  //     "React",
  //     "TypeScript",
  //     "Responsive CSS",
  //     "CMS workflows",
  //     "Analytics",
  //     "Vercel or managed hosting",
  //     "Domain and environment setup",
  //   ],
  //   handoff:
  //     "The handoff includes the codebase, route map, reusable components, content editing notes, deployment instructions, and a launch checklist the founder can share with the team.",
  //   relatedPortfolioSlugs: ["tapcon", "solarstock", "oneplatemeal"],
  //   faqs: [
  //     {
  //       question: "Can EcomPros handle both design and development?",
  //       answer:
  //         "Yes. The work is planned as one product surface, so the visual direction, responsive behavior, content structure, and implementation stay connected.",
  //     },
  //     {
  //       question: "Can the website include app-like features?",
  //       answer:
  //         "Yes. Lead portals, dashboards, authenticated areas, calculators, profiles, and account flows can be scoped into the web build.",
  //     },
  //     {
  //       question: "Can we start with a launch site and expand later?",
  //       answer:
  //         "Yes. The first release can focus on the pages and flows needed now, with the route and component structure left ready for the next product layer.",
  //     },
  //   ],
  // },
  // {
  //   slug: "software-product-development",
  //   title: "Software design and development",
  //   shortTitle: "Software",
  //   bookingLabel: "Software design and development",
  //   summary:
  //     "Product UX, application logic, admin dashboards, backend workflows, integrations, and database-backed systems for early-stage teams.",
  //   homeDescription:
  //     "Interface logic, architecture-facing UX, and implementation support for products that need to feel coherent early.",
  //   meta: {
  //     title: "Software Design and Development | EcomPros Services",
  //     description:
  //       "Software design and development services for product UX, application architecture, backend systems, dashboards, APIs, databases, authentication, permissions, and mobile app planning.",
  //   },
  //   audienceFit: [
  //     "A founder has product requirements but needs the software shaped into a buildable system.",
  //     "A team needs an MVP, internal platform, dashboard, or operational workflow.",
  //     "A product has grown through quick fixes and needs clearer architecture.",
  //     "Mobile app planning is needed alongside the web product and backend.",
  //   ],
  //   capabilities: [
  //     {
  //       title: "Product strategy and scope",
  //       body:
  //         "Convert the idea, workflow, or existing manual process into release stages, screens, data models, and technical priorities.",
  //     },
  //     {
  //       title: "Application architecture",
  //       body:
  //         "Plan the front-end, back-end, database, role model, integration boundaries, and deployment model before the product becomes expensive to change.",
  //     },
  //     {
  //       title: "UX flows and product interfaces",
  //       body:
  //         "Design signup, onboarding, dashboards, admin tools, settings, billing, status, and operational views around the jobs users need to finish.",
  //     },
  //     {
  //       title: "Frontend and backend implementation",
  //       body:
  //         "Build the application interface, API routes, server-side logic, persistence layer, and integration glue required for a working product.",
  //     },
  //     {
  //       title: "API and integration design",
  //       body:
  //         "Connect payment providers, CRMs, email systems, storage, third-party APIs, notification services, and internal data sources.",
  //     },
  //     {
  //       title: "Database modeling",
  //       body:
  //         "Define schemas, relationships, indexes, migrations, seed data, and admin workflows so the product can hold real operational data.",
  //     },
  //     {
  //       title: "Authentication and permissions",
  //       body:
  //         "Set up login, roles, access control, account states, password flows, and secure defaults for user-facing and admin areas.",
  //     },
  //     {
  //       title: "Mobile app design and development",
  //       body:
  //         "Plan and design native-feeling mobile flows, then build with a practical cross-platform stack when the product needs an iOS or Android layer.",
  //     },
  //     {
  //       title: "QA and release support",
  //       body:
  //         "Review happy paths, failure states, responsive behavior, permissions, browser support, and release notes before launch.",
  //     },
  //   ],
  //   deliverables: [
  //     "Product scope, workflow map, and release plan",
  //     "Application architecture notes and data model",
  //     "Responsive product UI and admin interface",
  //     "Backend workflows, API routes, and integrations",
  //     "Authentication, roles, and permission behavior",
  //     "Mobile app plan or implementation when included",
  //     "QA notes, deployment instructions, and release checklist",
  //   ],
  //   process: [
  //     {
  //       title: "Map the product",
  //       body:
  //         "Turn the business process into user roles, data states, screens, and integration points.",
  //     },
  //     {
  //       title: "Design the operating model",
  //       body:
  //         "Specify the core workflows, permissions, dashboard needs, database shape, and release order.",
  //     },
  //     {
  //       title: "Build the system",
  //       body:
  //         "Implement the application, backend logic, database, admin tools, and third-party connections.",
  //     },
  //     {
  //       title: "Release with checks",
  //       body:
  //         "Test the critical paths, document the setup, and prepare the team to operate the product after launch.",
  //     },
  //   ],
  //   stack: [
  //     "Next.js",
  //     "React",
  //     "TypeScript",
  //     "Node.js",
  //     "PostgreSQL or MySQL",
  //     "Prisma or Drizzle",
  //     "Authentication",
  //     "API integrations",
  //     "React Native or Expo planning",
  //   ],
  //   handoff:
  //     "The handoff documents how the application is structured, where the data lives, how roles behave, what services are connected, and what needs attention in the next release.",
  //   relatedPortfolioSlugs: ["tapcon", "solarstock", "oneplatemeal"],
  //   faqs: [
  //     {
  //       question: "Can EcomPros build an MVP from a rough idea?",
  //       answer:
  //         "Yes, as long as the first release can be framed around a clear workflow, user role, or operational job.",
  //     },
  //     {
  //       question: "Can mobile app work be included?",
  //       answer:
  //         "Yes. Mobile app design and development can be included under the software scope when the product needs iOS or Android access.",
  //     },
  //     {
  //       question: "Can existing software be improved instead of rebuilt?",
  //       answer:
  //         "Yes. The work can focus on a specific module, admin flow, frontend rebuild, database cleanup, or architecture pass.",
  //     },
  //   ],
  // },
    {
    slug: "e-commerce-virtual-assistant",
    title: "E-commerce Virtual Assistant",
    shortTitle: "E-commerce VA",
    bookingLabel: "E-commerce Virtual Assistant",
    summary:
      "Reliable day-to-day ecommerce support for catalog updates, marketplace operations, order follow-up, customer care, and store administration.",
    homeDescription:
      "Practical ecommerce support that keeps products, orders, customers, and daily store operations moving.",
    headline: "Hand off the daily store work. Keep full visibility.",
    heroPoints: ["Product uploads and listing cleanup", "Order tracking and customer replies", "A weekly summary of everything done"],
    image: {
      src: "/services/photos/va-hero.jpg",
      alt: "Ecommerce virtual assistant managing product listings and orders at a tidy desk with shipping boxes",
    },
    detailImage: {
      src: "/services/photos/va-detail.jpg",
      alt: "Order being packed into a kraft shipping box with an orders dashboard in the background",
    },
    meta: {
      title: "E-commerce Virtual Assistant | EcomPros Services",
      description:
        "E-commerce virtual assistant services for product uploads, catalog management, marketplace support, order tracking, customer care, and store operations.",
    },
    audienceFit: [
      "A store owner needs consistent help maintaining products and orders.",
      "A growing catalog needs clean listings, images, variants, and inventory updates.",
      "Customer emails, DMs, reviews, and returns are piling up faster than you can answer.",
      "A founder wants to hand off repeatable ecommerce tasks without losing visibility.",
    ],
    capabilityGroups: [
      { title: "Products & catalog", summary: "Accurate, well-presented products your customers can trust." },
      { title: "Orders & shipping", summary: "Every order tracked from checkout to doorstep, and back." },
      { title: "Customer care", summary: "Every customer answered, every review handled." },
      { title: "Marketplace & back office", summary: "The platform and admin work that keeps your store running." },
    ],
    capabilities: [
      {
        title: "Product listing management",
        body:
          "Create, update, and organize product titles, descriptions, images, variants, pricing, and collection placement.",
        group: "Products & catalog",
        icon: "tag",
        visual: "product-listing",
        highlights: ["Titles & descriptions", "Images & variants", "Pricing"],
        tools: ["shopify", "amazon", "etsy"],
      },
      {
        title: "Catalog and inventory support",
        body:
          "Keep product information, stock notes, spreadsheets, and category structures accurate across the store.",
        group: "Products & catalog",
        icon: "boxes",
        visual: "inventory",
        highlights: ["Stock levels", "Spreadsheets", "Categories"],
        tools: ["shopify", "sheets"],
      },
      {
        title: "Product research and price monitoring",
        body:
          "Find trending products and reliable suppliers, and keep an eye on competitor prices and promotions so you can react quickly.",
        group: "Products & catalog",
        icon: "search",
        visual: "price-watch",
        highlights: ["Trending products", "Supplier shortlists", "Competitor prices"],
        tools: ["amazon", "google", "sheets"],
      },
      {
        title: "Order and fulfillment follow-up",
        body:
          "Track order status, flag exceptions, coordinate follow-up, and keep customers informed when something changes.",
        group: "Orders & shipping",
        icon: "truck",
        visual: "order-timeline",
        highlights: ["Status tracking", "Exceptions flagged", "Customer updates"],
        tools: ["shopify", "amazon"],
      },
      {
        title: "Returns, refunds, and exchanges",
        body:
          "Process return requests, arrange labels, confirm items are received, and issue refunds or exchanges by your rules.",
        group: "Orders & shipping",
        icon: "repeat",
        visual: "returns",
        highlights: ["Return labels", "Refunds", "Exchanges"],
        tools: ["shopify", "amazon", "gmail"],
      },
      {
        title: "Supplier and dropship coordination",
        body:
          "Place and confirm purchase orders, chase delivery dates, and add tracking to dropship orders so nothing stalls.",
        group: "Orders & shipping",
        icon: "package",
        visual: "suppliers",
        highlights: ["Purchase orders", "Supplier follow-up", "Dropship tracking"],
        tools: ["sheets", "gmail", "whatsapp"],
      },
      {
        title: "Customer care",
        body:
          "Handle repeatable customer questions with a clear tone, useful context, and escalation notes for the store owner.",
        group: "Customer care",
        icon: "messages",
        visual: "chat",
        highlights: ["Clear replies", "Escalation notes", "Consistent tone"],
        tools: ["gmail", "whatsapp", "messenger"],
      },
      {
        title: "Reviews and feedback",
        body:
          "Reply to product and store reviews, pass recurring complaints to your team, and ask happy customers for a review.",
        group: "Customer care",
        icon: "quote",
        visual: "reviews",
        highlights: ["Review replies", "Feedback notes", "Review requests"],
        tools: ["shopify", "amazon", "google-maps"],
      },
      {
        title: "Social inbox and comments",
        body:
          "Answer product questions in DMs, keep comment sections tidy, and route sales leads or complaints to the right person.",
        group: "Customer care",
        icon: "users-round",
        visual: "inbox",
        highlights: ["DM replies", "Comment moderation", "Lead routing"],
        tools: ["instagram", "facebook", "tiktok"],
      },
      {
        title: "Marketplace operations",
        body:
          "Support listings, marketplace updates, order checks, message handling, account health, and routine platform administration.",
        group: "Marketplace & back office",
        icon: "store",
        visual: "marketplaces",
        highlights: ["Listings", "Account health", "Messages"],
        tools: ["amazon", "etsy", "walmart"],
      },
      {
        title: "Store administration",
        body:
          "Support promotions, collections, content updates, reporting routines, and the small operational tasks that pile up.",
        group: "Marketplace & back office",
        icon: "clipboard-check",
        visual: "admin-tasks",
        highlights: ["Promotions", "Collections", "Weekly reports"],
        tools: ["shopify", "sheets"],
      },
      {
        title: "Data entry and bookkeeping support",
        body:
          "Keep order, product, and customer data organised, and log invoices, receipts, and payouts ready for your accountant.",
        group: "Marketplace & back office",
        icon: "list-checks",
        visual: "ledger",
        highlights: ["Data entry", "Invoices & receipts", "Payout checks"],
        tools: ["sheets", "drive", "gmail"],
      },
    ],
    deliverables: [
      "Product uploads and listing cleanup",
      "Catalog, collection, and inventory updates",
      "Order tracking, returns, and refunds handled",
      "Customer, review, and social inbox replies",
      "Supplier, dropship, and marketplace follow-up",
      "Clean store data and bookkeeping records",
      "Weekly task summary and operational handoff",
    ],
    process: [
      {
        title: "Map the routine",
        body:
          "Identify the recurring store tasks, platforms, access needs, priorities, and escalation rules.",
      },
      {
        title: "Set the workflow",
        body:
          "Create a practical task list, update rhythm, communication channel, and quality checklist.",
      },
      {
        title: "Run the operations",
        body:
          "Handle the agreed catalog, marketplace, order, customer, and admin work with consistent documentation.",
      },
      {
        title: "Report and improve",
        body:
          "Share completed work, blockers, customer patterns, and the next operational priorities.",
      },
    ],
    stack: [
      "Shopify",
      "Amazon and marketplaces",
      "Product catalogs",
      "Order management",
      "Returns and refunds",
      "Customer support",
      "Social inboxes",
      "Spreadsheets",
      "Bookkeeping records",
      "Weekly reporting",
    ],
    handoff:
      "The handoff includes the task workflow, store notes, escalation rules, update checklist, and a clear record of the work completed each week.",
    relatedPortfolioSlugs: [],
    faqs: [
      {
        question: "Can the virtual assistant work inside our existing store?",
        answer:
          "Yes. The workflow can be shaped around the ecommerce platform, marketplaces, tools, and approval process your team already uses.",
      },
      {
        question: "Can support start with product uploads only?",
        answer:
          "Yes. The engagement can begin with one repeatable task and expand into orders, customer care, marketplace work, or store administration.",
      },
      {
        question: "How will we know what was completed?",
        answer:
          "You receive a simple task summary with completed updates, open questions, exceptions, and the next priorities.",
      },
      {
        question: "Can the assistant handle returns, reviews, and social messages too?",
        answer:
          "Yes. Returns and refunds, review replies, and social inbox or comment management can all be part of the routine, following the rules and tone you set.",
      },
      {
        question: "Which plan covers the virtual assistant?",
        answer:
          "Virtual assistant work is part of the Operations plan. You can add creative, marketing, or tech support later by moving to a larger plan.",
      },
    ],
  },
  {
    slug: "motion-video-design",
    title: "Motion video design",
    shortTitle: "Motion",
    bookingLabel: "Motion video design",
    summary:
      "Product explainers, launch loops, podcast edits, motion graphics, AI-assisted commercials, and social-ready video packages.",
    homeDescription:
      "Launch loops, product explainers, and short motion systems that help a young company show momentum without overexplaining.",
    headline: "Videos that explain your product in seconds.",
    heroPoints: ["Explainers, launch loops and social cuts", "Captions that read well on mobile", "Every size exported and ready to post"],
    image: {
      src: "/services/photos/motion-hero.jpg",
      alt: "Video editor working on a motion timeline across an ultrawide and a vertical monitor",
    },
    detailImage: {
      src: "/services/photos/motion-detail.jpg",
      alt: "Vertical product video playing on a phone with widescreen and square versions on a laptop behind",
    },
    meta: {
      title: "Motion Video Design | EcomPros Services",
      description:
        "Motion video design services for product explainers, launch loops, podcast editing, captions, motion graphics, social cutdowns, and campaign video finishing.",
    },
    audienceFit: [
      "A startup needs a short video to explain what the product does.",
      "A founder needs launch assets for a website, investor update, or social channel.",
      "A podcast, interview, or talking-head clip needs branded pacing and captions.",
      "A campaign needs multiple video cuts for different placements.",
    ],
    capabilityGroups: [
      { title: "Plan the story", summary: "Turn rough ideas into a clear, watchable sequence." },
      { title: "Design the motion", summary: "Movement, type, and captions that fit your brand." },
      { title: "Edit & deliver", summary: "Cut, resize, and package every file for where it will run." },
    ],
    capabilities: [
      {
        title: "Storyboarding and script shaping",
        body:
          "Turn rough notes, product clips, or talking points into a sequence that can be watched quickly and understood without context.",
        group: "Plan the story",
        icon: "clapperboard",
        visual: "storyboard",
        highlights: ["Scene plan", "Script lines", "Shot list"],
      },
      {
        title: "Product explainers",
        body:
          "Create short motion pieces that show the product value, user flow, or campaign offer without becoming a long tutorial.",
        group: "Plan the story",
        icon: "circle-play",
        visual: "explainer",
        highlights: ["Product value", "User flow", "Short runtime"],
        tools: ["youtube"],
      },
      {
        title: "Launch loops",
        body:
          "Build muted website hero loops, social teasers, and investor-update clips that communicate motion without demanding sound.",
        group: "Design the motion",
        icon: "repeat",
        visual: "loop",
        highlights: ["Website hero", "Social teasers", "Works on mute"],
      },
      {
        title: "Podcast and interview editing",
        body:
          "Cut raw conversations into tighter episodes or short vertical clips with pacing, framing, captions, and brand treatment.",
        group: "Edit & deliver",
        icon: "mic",
        visual: "waveform",
        highlights: ["Tighter pacing", "Vertical clips", "Captions"],
        tools: ["premiere", "youtube", "spotify"],
      },
      {
        title: "Captions and readable overlays",
        body:
          "Design captions, speaker labels, titles, lower thirds, and annotations that stay readable across mobile and desktop placements.",
        group: "Design the motion",
        icon: "captions",
        visual: "captions",
        highlights: ["Captions", "Lower thirds", "Titles"],
        tools: ["premiere"],
      },
      {
        title: "Motion graphics",
        body:
          "Use typography, UI details, product screens, icons, and transitions to create a visual rhythm that fits the brand.",
        group: "Design the motion",
        icon: "sparkles",
        visual: "keyframes",
        highlights: ["Typography", "UI animation", "Transitions"],
        tools: ["after-effects", "figma"],
      },
      {
        title: "Social cutdowns",
        body:
          "Prepare vertical, square, and landscape cuts with platform-specific framing, hooks, and export settings.",
        group: "Edit & deliver",
        icon: "smartphone",
        visual: "aspect-ratios",
        highlights: ["9:16 vertical", "1:1 square", "16:9 landscape"],
        tools: ["tiktok", "instagram", "youtube"],
      },
      {
        title: "Export and delivery package",
        body:
          "Deliver named files, aspect-ratio variants, thumbnail direction, and notes for where each asset should be used.",
        group: "Edit & deliver",
        icon: "package",
        visual: "export-files",
        highlights: ["Named files", "Every size", "Thumbnails"],
        tools: ["drive", "dropbox"],
      },
    ],
    deliverables: [
      "Storyboard, script notes, or edit outline",
      "Hero loop, explainer, podcast edit, or campaign video",
      "Caption, title, lower-third, and overlay system",
      "Vertical, square, and landscape exports when needed",
      "Thumbnail or poster-frame recommendations",
      "Compressed review files and final delivery package",
    ],
    process: [
      {
        title: "Collect the source",
        body:
          "Review product clips, raw footage, brand assets, scripts, notes, or existing campaign material.",
      },
      {
        title: "Shape the sequence",
        body:
          "Define the hook, pacing, caption style, visual rhythm, and platform-specific versions.",
      },
      {
        title: "Edit and animate",
        body:
          "Build the cut with motion graphics, typography, captions, transitions, and sound-safe pacing.",
      },
      {
        title: "Package for use",
        body:
          "Export the final formats with clear naming, poster frames, and placement notes.",
      },
    ],
    stack: [
      "Product footage",
      "Podcast edits",
      "Motion graphics",
      "Captions",
      "Vertical MP4",
      "Landscape MP4",
      "Hero loops",
      "Social exports",
    ],
    handoff:
      "The handoff includes final videos, review exports, platform-specific versions, poster-frame notes, and a short usage guide for the website or campaign team.",
    relatedPortfolioSlugs: [
      "zoho-motion-editing",
      "instant-hydration-commercial",
      "podcast-motion-graphics",
      "levute-podcast-content",
    ],
    faqs: [
      {
        question: "Can EcomPros edit existing footage?",
        answer:
          "Yes. Existing product captures, interviews, podcasts, commercials, and social clips can be shaped into finished edits.",
      },
      {
        question: "Can motion assets be used on the website?",
        answer:
          "Yes. Motion work can be exported as hero loops, product videos, or lightweight clips that fit the page design.",
      },
      {
        question: "Can one video become multiple social cuts?",
        answer:
          "Yes. A main edit can be repackaged into vertical, square, and landscape versions with adjusted framing and captions.",
      },
    ],
  },
  {
    slug: "cybersecurity-helper",
    title: "Cybersecurity helper",
    shortTitle: "Security",
    bookingLabel: "Cybersecurity helper",
    summary:
      "Security UX, trust surfaces, access-control review, checklist systems, policy pages, and practical security support for small teams.",
    homeDescription:
      "Practical security surfaces, checklists, and helper tooling that make trust work easier to understand and maintain.",
    headline: "Security your customers can see and trust.",
    heroPoints: ["Logins, roles and access reviewed", "Practical checklists your team keeps using", "Clear privacy and trust pages"],
    image: {
      src: "/services/photos/security-hero.jpg",
      alt: "Security specialist reviewing a two-step sign-in screen and a security checklist dashboard",
    },
    detailImage: {
      src: "/services/photos/security-detail.jpg",
      alt: "Team reviewing a security checklist and an access permissions chart together",
    },
    meta: {
      title: "Cybersecurity Helper | EcomPros Services",
      description:
        "Cybersecurity helper services for startup trust surfaces, security UX, authentication review, permission models, checklist systems, policy pages, and incident-ready documentation.",
    },
    audienceFit: [
      "A product handles customer data and needs clearer security behavior.",
      "A team needs trust pages, policy surfaces, or security checklists before sales conversations.",
      "An app has roles, auth, or admin access that should be reviewed before launch.",
      "A founder needs practical security support without buying a heavy enterprise program.",
    ],
    capabilityGroups: [
      { title: "Accounts & access", summary: "The right people get in, and only see what they should." },
      { title: "Risks & readiness", summary: "Find weak spots early and be ready if something goes wrong." },
      { title: "Policies & training", summary: "Security your customers can read and your team can follow." },
    ],
    capabilities: [
      {
        title: "Security UX",
        body:
          "Design trust, consent, permissions, account recovery, and security settings so users can understand what is happening.",
        group: "Accounts & access",
        icon: "shield-check",
        visual: "security-settings",
        highlights: ["Consent", "Account recovery", "Clear settings"],
      },
      {
        title: "Authentication review",
        body:
          "Review login, password reset, session behavior, admin access, account states, and user role boundaries.",
        group: "Accounts & access",
        icon: "key-round",
        visual: "login",
        highlights: ["Login & reset", "Sessions", "Admin access"],
        tools: ["auth0", "google"],
      },
      {
        title: "Permission model cleanup",
        body:
          "Document who can see what, who can change what, and where role behavior needs safer defaults.",
        group: "Accounts & access",
        icon: "users-round",
        visual: "permissions",
        highlights: ["Roles", "Who sees what", "Safer defaults"],
      },
      {
        title: "Checklist systems",
        body:
          "Create practical launch, vendor, access, content, and incident checklists that a small team can keep using.",
        group: "Risks & readiness",
        icon: "list-checks",
        visual: "checklist",
        highlights: ["Launch", "Vendors", "Access"],
        tools: ["notion"],
      },
      {
        title: "Policy and trust surfaces",
        body:
          "Shape privacy, security, compliance, responsible-use, and internal process pages into readable web content.",
        group: "Policies & training",
        icon: "scroll-text",
        visual: "policy",
        highlights: ["Privacy", "Security page", "Compliance"],
      },
      {
        title: "Vulnerability hygiene",
        body:
          "Support dependency review, exposed configuration checks, common web risk review, and issue triage for early products.",
        group: "Risks & readiness",
        icon: "bug",
        visual: "scan",
        highlights: ["Dependencies", "Config checks", "Issue triage"],
        tools: ["github", "cloudflare"],
      },
      {
        title: "Incident-ready documentation",
        body:
          "Prepare contact flows, escalation notes, access lists, and response steps so the team has a starting point before pressure hits.",
        group: "Risks & readiness",
        icon: "siren",
        visual: "incident-flow",
        highlights: ["Contacts", "Escalation", "Response steps"],
      },
      {
        title: "Security training material",
        body:
          "Turn security behavior into simple guides, onboarding notes, and team reminders instead of dense policy documents.",
        group: "Policies & training",
        icon: "graduation-cap",
        visual: "training",
        highlights: ["Simple guides", "Onboarding", "Team reminders"],
        tools: ["notion"],
      },
    ],
    deliverables: [
      "Security UX review notes",
      "Authentication and permission checklist",
      "Trust, privacy, or security page content structure",
      "Launch security checklist",
      "Incident contact and escalation notes",
      "Access review recommendations",
      "Developer handoff notes for priority fixes",
    ],
    process: [
      {
        title: "Review the surface",
        body:
          "Look at the product, access model, customer data, user roles, and visible trust promises.",
      },
      {
        title: "Find practical gaps",
        body:
          "Identify confusing security UX, unclear ownership, risky defaults, missing documentation, or launch blockers.",
      },
      {
        title: "Build the helper layer",
        body:
          "Create checklists, interface copy, trust surfaces, access notes, and prioritized implementation guidance.",
      },
      {
        title: "Hand off priorities",
        body:
          "Separate immediate fixes from later maturity work so the founder knows what matters now.",
      },
    ],
    stack: [
      "Auth review",
      "Role mapping",
      "Security UX",
      "Trust pages",
      "Policy content",
      "Launch checklists",
      "Access review",
      "Incident notes",
    ],
    handoff:
      "The handoff gives the team clear security notes, ownership points, checklists, and implementation priorities rather than a vague risk report.",
    relatedPortfolioSlugs: ["asd-security-seo"],
    faqs: [
      {
        question: "Is this a full security audit?",
        answer:
          "No. This is practical startup security support. It helps clarify UX, access, checklists, trust content, and priority fixes. Formal audits and certifications should use a dedicated security auditor.",
      },
      {
        question: "Can this be paired with software development?",
        answer:
          "Yes. It often works best when paired with product development, because auth, roles, admin tooling, and launch checklists can be improved during the build.",
      },
      {
        question: "Can EcomPros write policy pages?",
        answer:
          "Ecom ProDesk can structure and draft readable web content for trust and policy surfaces. Legal review should still happen where legal obligations apply.",
      },
    ],
  },
  {
    slug: "brand-ready-systems",
    title: "Brand-ready systems",
    shortTitle: "Brand systems",
    bookingLabel: "Brand-ready systems",
    summary:
      "Visual identity foundations, design tokens, UI kits, content voice, social templates, pitch material, and reusable launch assets.",
    homeDescription:
      "Shared type, color, UI, and content decisions that keep the website, product, and launch assets speaking the same language.",
    headline: "One brand system your whole team can use.",
    heroPoints: ["Logo, color and type rules", "A reusable UI kit and templates", "Launch-ready social assets"],
    image: {
      src: "/services/photos/brand-hero.jpg",
      alt: "Brand identity flat lay with color swatches, typography cards, packaging and a logo sketch on a tablet",
    },
    detailImage: {
      src: "/services/photos/brand-detail.jpg",
      alt: "Designer desk with a UI component kit on screen and social templates pinned beside it",
    },
    meta: {
      title: "Brand-Ready Systems | EcomPros Services",
      description:
        "Brand-ready systems for startups including visual identity foundations, design tokens, UI kits, content voice, launch assets, presentation templates, and social creative systems.",
    },
    audienceFit: [
      "A startup needs a brand system strong enough for a website, product, and investor deck.",
      "The current visuals feel inconsistent across web, product, and social channels.",
      "A founder wants reusable assets instead of one-off graphics.",
      "The product is being rebuilt and the brand needs to travel into the UI.",
    ],
    capabilityGroups: [
      { title: "Brand foundation", summary: "The core look and voice everything else is built on." },
      { title: "Design system", summary: "Reusable parts so every new page looks like it belongs." },
      { title: "Launch & handoff", summary: "Campaign-ready assets and everything your team needs next." },
    ],
    capabilities: [
      {
        title: "Visual identity foundation",
        body:
          "Define color, type, spacing, logo usage, graphic direction, and visual rules that can survive beyond the first page.",
        group: "Brand foundation",
        icon: "palette",
        visual: "identity",
        highlights: ["Logo usage", "Colors", "Typography"],
        tools: ["illustrator", "figma"],
      },
      {
        title: "Design tokens",
        body:
          "Translate brand decisions into reusable UI values for colors, typography, spacing, radii, rules, motion, and states.",
        group: "Design system",
        icon: "sliders",
        visual: "tokens",
        highlights: ["Colors", "Spacing", "Type scale"],
        tools: ["figma"],
      },
      {
        title: "UI kit",
        body:
          "Create reusable buttons, form controls, cards, navigation patterns, content blocks, and responsive layout primitives.",
        group: "Design system",
        icon: "component",
        visual: "ui-kit",
        highlights: ["Buttons", "Forms", "Cards"],
        tools: ["figma"],
      },
      {
        title: "Content voice",
        body:
          "Set headline style, CTA language, service labels, product copy patterns, and tone guardrails for future pages.",
        group: "Brand foundation",
        icon: "quote",
        visual: "voice",
        highlights: ["Headlines", "CTAs", "Tone rules"],
      },
      {
        title: "Launch asset system",
        body:
          "Design reusable social post formats, announcement graphics, thumbnail structures, banners, and campaign visuals.",
        group: "Launch & handoff",
        icon: "megaphone",
        visual: "social-templates",
        highlights: ["Social posts", "Banners", "Thumbnails"],
        tools: ["instagram", "linkedin", "facebook"],
      },
      {
        title: "Pitch and presentation support",
        body:
          "Prepare deck visual direction, slides, diagrams, and narrative assets that match the product and website.",
        group: "Launch & handoff",
        icon: "presentation",
        visual: "slide",
        highlights: ["Deck design", "Diagrams", "Story flow"],
        tools: ["figma"],
      },
      {
        title: "Graphic design in Figma",
        body:
          "Create posters, campaign layouts, social graphics, launch visuals, and editable templates for the team.",
        group: "Design system",
        icon: "pen-tool",
        visual: "figma-canvas",
        highlights: ["Posters", "Social graphics", "Templates"],
        tools: ["figma"],
      },
      {
        title: "Brand handoff",
        body:
          "Package the rules, assets, templates, and usage notes so the team can keep producing coherent work.",
        group: "Launch & handoff",
        icon: "folder-open",
        visual: "brand-package",
        highlights: ["Guidelines", "Asset files", "Templates"],
        tools: ["figma", "drive"],
      },
    ],
    deliverables: [
      "Brand direction and usage notes",
      "Color, type, spacing, and motion tokens",
      "Reusable UI kit or component direction",
      "Launch graphics and social templates",
      "Pitch or presentation visual support",
      "Content voice notes and CTA language",
      "Organized asset handoff package",
    ],
    process: [
      {
        title: "Audit the current signal",
        body:
          "Review the existing website, product UI, deck, logo, copy, and public channels.",
      },
      {
        title: "Define the system",
        body:
          "Choose the reusable visual and verbal rules that should guide web, product, and marketing surfaces.",
      },
      {
        title: "Build the assets",
        body:
          "Create the UI kit, content examples, launch templates, and graphics needed for the immediate rollout.",
      },
      {
        title: "Package the rules",
        body:
          "Deliver organized files, token notes, usage guidance, and examples the team can reuse.",
      },
    ],
    stack: [
      "Figma",
      "Design tokens",
      "UI components",
      "Brand rules",
      "Social templates",
      "Pitch decks",
      "Campaign graphics",
      "Asset libraries",
    ],
    handoff:
      "The handoff includes editable design files, token notes, reusable asset templates, and clear guidance for applying the brand across web, product, and marketing work.",
    relatedPortfolioSlugs: ["tapcon", "draped-and-defined-marketing"],
    faqs: [
      {
        question: "Is this a full brand identity package?",
        answer:
          "It can be scoped that way, but the default is practical brand-system work for teams that need reusable web, product, and launch assets.",
      },
      {
        question: "Can the brand system connect to the website?",
        answer:
          "Yes. The strongest version connects directly to website and product implementation so the system is not left as a separate design file.",
      },
      {
        question: "Can EcomPros create social templates?",
        answer:
          "Yes. Social posts, thumbnails, campaign visuals, and editable Figma templates can be included in the brand-ready system.",
      },
    ],
  },
  {
    slug: "marketing-branding-seo",
    title: "Marketing, branding and SEO",
    shortTitle: "Marketing and SEO",
    bookingLabel: "Marketing, branding and SEO",
    summary:
      "Positioning, landing page messaging, SEO research, on-page optimization, local SEO, paid social support, and campaign-ready content direction.",
    homeDescription:
      "Positioning, messaging, visual identity, SEO, and campaign systems that help a young company get found and understood.",
    headline: "Get found, get clicks, and turn visitors into customers.",
    heroPoints: ["Clear positioning and landing copy", "Keyword research and on-page SEO", "Campaigns, ads and simple reporting"],
    image: {
      src: "/services/photos/marketing-hero.jpg",
      alt: "Marketer reviewing a growth dashboard on a laptop and a social ad on a phone",
    },
    detailImage: {
      src: "/services/photos/marketing-detail.jpg",
      alt: "Laptop showing local search results with map pins next to a phone showing a five-star business profile",
    },
    meta: {
      title: "Marketing, Branding and SEO | EcomPros Services",
      description:
        "Marketing, branding, and SEO services for startup positioning, landing page messaging, keyword research, on-page SEO, local SEO, paid social, reporting, and campaign content.",
    },
    audienceFit: [
      "A startup needs clearer positioning before traffic is sent to the site.",
      "A service business needs local search visibility and better landing pages.",
      "A founder needs SEO foundations before publishing more content.",
      "A team needs campaign assets and reporting that connect to the website.",
    ],
    capabilityGroups: [
      { title: "Message & positioning", summary: "Say clearly what you sell, who it is for, and why it matters." },
      { title: "Search visibility (SEO)", summary: "Get found by customers who are already searching." },
      { title: "Campaigns & reporting", summary: "Plan campaigns, run ads, and see what is working." },
    ],
    capabilities: [
      {
        title: "Positioning and offer copy",
        body:
          "Clarify what the company sells, who it is for, why it matters now, and what the page should ask visitors to do.",
        group: "Message & positioning",
        icon: "target",
        visual: "positioning",
        highlights: ["Who it's for", "The offer", "Why now"],
      },
      {
        title: "Landing page messaging",
        body:
          "Write and structure page sections, CTAs, proof areas, FAQs, and objections around a practical conversion path.",
        group: "Message & positioning",
        icon: "panels",
        visual: "landing-wireframe",
        highlights: ["Page sections", "CTAs", "FAQs"],
      },
      {
        title: "Keyword and intent research",
        body:
          "Identify search themes, buyer intent, page opportunities, content gaps, and terms that match the actual service or product.",
        group: "Search visibility (SEO)",
        icon: "search",
        visual: "keywords",
        highlights: ["Search themes", "Buyer intent", "Content gaps"],
        tools: ["google"],
      },
      {
        title: "Technical and on-page SEO",
        body:
          "Improve metadata, headings, internal links, crawlability, schema opportunities, page speed habits, and indexable content.",
        group: "Search visibility (SEO)",
        icon: "gauge",
        visual: "seo-audit",
        highlights: ["Metadata", "Site speed", "Internal links"],
        tools: ["google", "chrome"],
      },
      {
        title: "Local SEO",
        body:
          "Support service-area pages, local search profiles, location content, review signals, and practical local visibility improvements.",
        group: "Search visibility (SEO)",
        icon: "map-pin",
        visual: "local",
        highlights: ["Google profile", "Location pages", "Reviews"],
        tools: ["google-maps"],
      },
      {
        title: "Campaign planning",
        body:
          "Shape campaign angles, landing pages, creative variants, email or social hooks, and channel-specific content needs.",
        group: "Campaigns & reporting",
        icon: "calendar",
        visual: "campaign-board",
        highlights: ["Campaign angles", "Creative variants", "Channels"],
        tools: ["gmail", "instagram"],
      },
      {
        title: "Meta ads and paid social support",
        body:
          "Prepare campaign creative, landing page alignment, audience notes, and reporting structure for social advertising.",
        group: "Campaigns & reporting",
        icon: "pointer",
        visual: "meta-ad",
        highlights: ["Ad creative", "Audiences", "Landing match"],
        tools: ["meta", "facebook", "instagram"],
      },
      {
        title: "Reporting and next actions",
        body:
          "Create a simple reporting view that separates traffic, leads, ranking movement, and content work that should happen next.",
        group: "Campaigns & reporting",
        icon: "chart",
        visual: "report",
        highlights: ["Traffic", "Leads", "Rankings"],
        tools: ["google-analytics"],
      },
    ],
    deliverables: [
      "Positioning notes and messaging map",
      "Landing page copy structure",
      "Keyword and page opportunity list",
      "On-page SEO recommendations and implementation notes",
      "Local SEO plan when location visibility matters",
      "Campaign creative direction and content plan",
      "Reporting structure and next-action list",
    ],
    process: [
      {
        title: "Understand the market",
        body:
          "Review the offer, audience, competitors, current pages, search intent, and proof the company can actually show.",
      },
      {
        title: "Set the message",
        body:
          "Clarify the positioning, landing page structure, SEO priorities, and campaign angles.",
      },
      {
        title: "Implement the improvements",
        body:
          "Update page copy, metadata, content structure, campaign assets, and local or on-page SEO items.",
      },
      {
        title: "Report what changed",
        body:
          "Summarize what shipped, what needs monitoring, and what should be created next.",
      },
    ],
    stack: [
      "Positioning",
      "Landing pages",
      "Keyword research",
      "On-page SEO",
      "Local SEO",
      "Meta ads support",
      "Campaign creative",
      "Analytics reporting",
    ],
    handoff:
      "The handoff includes messaging direction, page recommendations, SEO priorities, campaign notes, and a reporting structure that keeps the next work visible.",
    relatedPortfolioSlugs: [
      "tapcon-marketing",
      "asd-security-seo",
      "dalworth-restoration-seo",
      "wintergreen-grass-seo",
      "elite-paint-seo",
      "draped-and-defined-marketing",
    ],
    faqs: [
      {
        question: "Can SEO work be paired with website development?",
        answer:
          "Yes. SEO foundations are strongest when metadata, headings, content structure, performance, and landing page copy are handled during the build.",
      },
      {
        question: "Can EcomPros support local SEO?",
        answer:
          "Yes. Local service pages, business profile direction, review signals, and location content can be included when local search matters.",
      },
      {
        question: "Can campaign creative be included?",
        answer:
          "Yes. Campaign direction, ad creative, social assets, landing page alignment, and reporting structure can be planned together.",
      },
    ],
  }

] as const satisfies readonly ServiceContent[];

const serviceCatalog: readonly ServiceContent[] = services;

export const serviceBookingOptions = serviceCatalog.map((service) => service.bookingLabel);

export const serviceDecisionGuides: ServiceDecisionGuide[] = [
  {
    need: "My store's daily work is piling up",
    note:
      "Hand product uploads, orders, customer messages, and store admin to a dedicated ecommerce assistant who reports back every week.",
    serviceSlugs: ["e-commerce-virtual-assistant"],
  },
  {
    need: "I need more traffic and sales",
    note:
      "Start with positioning, SEO, and campaigns. Add video when your ads and product pages need stronger creative.",
    serviceSlugs: ["marketing-branding-seo", "motion-video-design"],
  },
  {
    need: "My brand looks different everywhere",
    note:
      "Set one clear system for logo, color, type, and templates so every page, post, and package looks like the same company.",
    serviceSlugs: ["brand-ready-systems"],
  },
  {
    need: "Customers don't get my product",
    note:
      "Short explainers and captioned social cuts show the value quickly, and clearer landing copy keeps the message consistent.",
    serviceSlugs: ["motion-video-design", "marketing-branding-seo"],
  },
  {
    need: "I'm worried about account security",
    note:
      "Review logins, roles, and access for everyone who touches the store, then keep a simple checklist the team can follow.",
    serviceSlugs: ["cybersecurity-helper", "e-commerce-virtual-assistant"],
  },
  {
    need: "I'm launching a new store or product",
    note:
      "Brand system, launch video, and campaign plan built together so the launch looks and sounds like one company.",
    serviceSlugs: ["brand-ready-systems", "motion-video-design", "marketing-branding-seo"],
  },
];

export const combinedEngagements: CombinedEngagement[] = [
  {
    title: "Run & grow",
    body:
      "Daily store management plus steady traffic growth: listings, orders, customer care, SEO, and campaigns handled by one team.",
    serviceSlugs: ["e-commerce-virtual-assistant", "marketing-branding-seo"],
  },
  {
    title: "Launch kit",
    body:
      "Brand system, launch video, and campaign plan created together so your launch feels polished from the first post.",
    serviceSlugs: ["brand-ready-systems", "motion-video-design", "marketing-branding-seo"],
  },
  {
    title: "Safe operations",
    body:
      "Safer logins, clear roles, and access checklists for the people running your store every day.",
    serviceSlugs: ["cybersecurity-helper", "e-commerce-virtual-assistant"],
  },
];

export const servicesFaqs: ServiceFAQ[] = [
  {
    question: "Can one engagement include more than one service?",
    answer:
      "Yes. Many stores combine services, such as a virtual assistant with SEO, or a brand system with a launch video. We plan them as one track with one point of contact.",
  },
  {
    question: "Do I need a detailed brief before contacting EcomPros?",
    answer:
      "No. Your store link, the platforms you sell on, and the problem you want solved are enough to start. We help shape the scope on the first call.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "See the pricing page for our plans. Custom scopes are quoted after a short call, once we understand your store, platforms, and goals.",
  },
  {
    question: "Which platforms do you work with?",
    answer:
      "Shopify, Amazon, Etsy, Walmart and other marketplaces, plus Meta, Google, TikTok, and the tools your team already uses.",
  },
  {
    question: "How do we stay in touch during the work?",
    answer:
      "By email or WhatsApp, with a clear summary of completed work, open questions, and the next priorities.",
  },
];

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}

export function getServiceLinks(slugs: readonly ServiceSlug[]): ServiceContent[] {
  const linkedServices: ServiceContent[] = [];

  for (const slug of slugs) {
    const service = getServiceBySlug(slug);

    if (service) {
      linkedServices.push(service);
    }
  }

  return linkedServices;
}

export function getAdjacentServices(slug: ServiceSlug) {
  const currentIndex = serviceCatalog.findIndex((service) => service.slug === slug);
  const previous = serviceCatalog[(currentIndex - 1 + serviceCatalog.length) % serviceCatalog.length];
  const next = serviceCatalog[(currentIndex + 1) % serviceCatalog.length];

  return { next, previous };
}
