export type PortfolioTab = {
  description?: string;
  emptyState?: string;
  id: "virtual-assistant" | "motion-videos" | "marketing-seo";
  label: string;
};

type PortfolioImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export type PortfolioMedia =
  | {
      id: string;
      title: string;
      type: "youtube";
    }
  | {
      durationLabel: string;
      height: number;
      orientation: "landscape" | "portrait";
      src: string;
      title: string;
      type: "video";
      width: number;
    };

export type PortfolioProject = {
  category: PortfolioTab["id"];
  cover?: PortfolioImage;
  description: string[];
  durationLabel?: string;
  featured?: boolean;
  formatLabel?: string;
  logo?: PortfolioImage;
  media: PortfolioMedia[];
  services: string[];
  slug: string;
  stack: string[];
  stackLabel?: string;
  summary: string;
  title: string;
};

export const portfolioTabs: PortfolioTab[] = [
  {
    id: "virtual-assistant",
    label: "Virtual Assistant",
    description:
      "Practical ecommerce support for product uploads, catalog updates, marketplace operations, order follow-up, and customer care.",
  },
  {
    id: "motion-videos",
    label: "Motion/Videos",
    description:
      "Motion edits, podcast visuals, and short-form commercials shaped for clear viewing, brand fit, and social delivery.",
    emptyState: "Motion and video work will appear here when the first public set is ready.",
  },
  {
    id: "marketing-seo",
    label: "Marketing and SEO",
    description:
      "SEO campaigns, local search visibility, and Meta marketing systems built to bring in qualified customers.",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "ecommerce-virtual-assistant",
    title: "E-commerce Virtual Assistant",
    category: "virtual-assistant",
    summary:
      "Ecommerce operations support that keeps catalogs, products, orders, customers, and daily store tasks moving.",
    cover: {
      src: "/services/virtual-assistant.jpeg",
      alt: "E-commerce virtual assistant service workspace preview.",
      width: 1536,
      height: 1024,
    },
    media: [],
    services: [
      "Product uploads",
      "Catalog management",
      "Marketplace operations",
      "Order follow-up",
      "Customer care",
    ],
    stackLabel: "Focus",
    stack: ["Shopify", "Marketplaces", "Order management", "Customer support", "Weekly reporting"],
    description: [
      "E-commerce stores often lose time to repetitive catalog, marketplace, order, and customer tasks. This service provides reliable operational support around the workflows the store already uses.",
      "Work can include product listing updates, collection and inventory maintenance, marketplace administration, order status follow-up, customer responses, and clear escalation notes when an issue needs the owner's decision.",
      "The engagement starts with a practical task map and reporting rhythm, then turns repeatable store work into a consistent operating routine the team can see and improve.",
    ],
  },
  {
    slug: "zoho-motion-editing",
    title: "Zoho",
    category: "motion-videos",
    featured: true,
    summary:
      "Podcast edits shaped with smooth pacing, branded motion, and a social-ready vertical presentation.",
    durationLabel: "3:05",
    formatLabel: "Vertical MP4",
    logo: {
      src: "/portfolio/video%20editing%20and%20motion/Zoho/logo.png",
      alt: "Zoho logo",
      width: 1920,
      height: 960,
    },
    media: [
      {
        type: "video",
        title: "Zoho podcast edit 01",
        src: "https://drive.unifyxent.com/seafhttp/f/bded686cbbb642388646/",
        durationLabel: "0:49",
        width: 1080,
        height: 1920,
        orientation: "portrait",
      },
      {
        type: "video",
        title: "Zoho podcast edit 02",
        src: "https://drive.unifyxent.com/seafhttp/f/cc6c5f4f5d2943309c44/",
        durationLabel: "2:16",
        width: 1080,
        height: 1920,
        orientation: "portrait",
      },
    ],
    services: [
      "Podcast editing",
      "Motion graphics",
      "Brand-aligned visual flow",
      "Social video finishing",
    ],
    stackLabel: "Format",
    stack: ["2 vertical MP4 clips", "1080 x 1920", "3:05 total runtime"],
    description: [
      "We handled podcast editing for Zoho, shaping raw conversations into polished vertical episodes with a clean visual flow.",
      "The work focused on smooth cuts, branded motion, dynamic captions, and a viewing rhythm that matched the clarity Zoho brings to its product experiences.",
      "The result is concise, social-ready content that keeps the speaker easy to follow while giving the edit a stronger visual identity.",
    ],
  },
  {
    slug: "instant-hydration-commercial",
    title: "Instant Hydration",
    category: "motion-videos",
    summary:
      "A hyper-dynamic AI-generated sports drink commercial with cinematic product visuals and flavor-led scenes.",
    durationLabel: "1:16",
    formatLabel: "Vertical MP4",
    media: [
      {
        type: "video",
        title: "Instant Hydration commercial 01",
        src: "https://drive.unifyxent.com/seafhttp/f/6023a3da95d4495d81eb",
        durationLabel: "0:10",
        width: 1080,
        height: 1920,
        orientation: "portrait",
      },
      {
        type: "video",
        title: "Instant Hydration commercial 02",
        src: "https://drive.unifyxent.com/seafhttp/f/30436b2924ef4d05ba15/",
        durationLabel: "1:06",
        width: 1080,
        height: 1920,
        orientation: "portrait",
      },
    ],
    services: [
      "AI-generated commercial",
      "Product motion",
      "Cinematic editing",
      "Visual storytelling",
    ],
    stackLabel: "Format",
    stack: ["2 vertical MP4 clips", "1080 x 1920", "1:16 total runtime"],
    description: [
      "We created a hyper-dynamic AI-generated commercial for Instant Hydration Electrolyte Powder, using cinematic product visuals, macro liquid simulations, and vibrant flavor worlds.",
      "The spot blends slow-motion splash effects, premium studio lighting, and active lifestyle scenes into a high-energy sports drink advertisement.",
      "The final piece is built through visual storytelling, with orange, strawberry, and lemon cues shaping the rhythm and atmosphere of the commercial.",
    ],
  },
  {
    slug: "blyss-mop-soap-commercial",
    title: "Blyss",
    category: "motion-videos",
    summary:
      "A warm, Pixar-inspired 3D-animated commercial for a natural scented mop soap, told around family and safer, deeply cleaned floors.",
    durationLabel: "2:26",
    formatLabel: "Vertical MP4",
    media: [
      {
        type: "video",
        title: "Blyss Natural Scented Mop Soap commercial",
        src: "https://drive.unifyxent.com/seafhttp/f/0f2694af0ab744bd97d6/",
        durationLabel: "2:26",
        width: 1080,
        height: 1920,
        orientation: "portrait",
      },
    ],
    services: [
      "3D animation",
      "Kinetic captions",
      "Brand storytelling",
      "Social video finishing",
    ],
    stackLabel: "Format",
    stack: ["1 vertical MP4 clip", "1080 x 1920", "2:26 runtime"],
    description: [
      "We created a vertical 3D-animated commercial for Blyss Natural Scented Mop Soap, rendered in a warm, Pixar-inspired character style with word-by-word kinetic captions for sound-off viewing.",
      "The story follows a young mother in a sunlit family home who notices an oily rainbow film left behind by a generic supermarket cleaner, right where her baby crawls and plays. A simple visual explainer shows how harsh cleaners strip the floor's protective finish, before she discovers Blyss: a plant-based, pH-balanced formula that deeply cleans without stripping the finish.",
      "Close-ups of the concentrate being poured into a wooden bucket and a streak-free floor resolve with mother and baby playing together again, tying the product's promise of safer, naturally scented cleaning back to family.",
    ],
  },
  {
    slug: "podcast-motion-graphics",
    title: "Podcast Motion Graphics",
    category: "motion-videos",
    summary:
      "A landscape podcast edit where spoken ideas are translated into dynamic motion graphics and visual narrative.",
    durationLabel: "0:33",
    formatLabel: "Landscape MP4",
    media: [
      {
        type: "video",
        title: "Podcast motion graphics edit",
        src: "https://drive.unifyxent.com/seafhttp/f/2fb9e143696d425c9eca/",
        durationLabel: "0:33",
        width: 1920,
        height: 1080,
        orientation: "landscape",
      },
    ],
    services: [
      "Podcast editing",
      "Motion graphics",
      "Audio-to-visual storytelling",
      "Narrative pacing",
    ],
    stackLabel: "Format",
    stack: ["1 landscape MP4 clip", "1920 x 1080", "0:33 runtime"],
    description: [
      "We focused on enhancing the speaker's voice and message by translating spoken words into dynamic motion graphics.",
      "Each visual element was crafted to align with the tone, emotion, and intent of the speaker, turning the audio into a more compelling visual narrative.",
      "The result is an audiovisual experience where motion amplifies expression and makes the content more immersive and impactful.",
    ],
  },
  {
    slug: "levute-podcast-content",
    title: "Levute",
    category: "motion-videos",
    summary:
      "Founder-led podcast content finished with custom animations, dynamic captions, and clean transitions.",
    durationLabel: "0:58",
    formatLabel: "Vertical MP4",
    logo: {
      src: "/portfolio/video%20editing%20and%20motion/Levute/logo.png",
      alt: "Levute logo",
      width: 500,
      height: 500,
    },
    media: [
      {
        type: "video",
        title: "Levute podcast content edit",
        src: "https://drive.unifyxent.com/seafhttp/f/d149456b78714273a897/",
        durationLabel: "0:58",
        width: 1080,
        height: 1920,
        orientation: "portrait",
      },
    ],
    services: [
      "Podcast editing",
      "Motion graphics",
      "Brand-aligned visual design",
      "Social platform finishing",
    ],
    stackLabel: "Format",
    stack: ["1 vertical MP4 clip", "1080 x 1920", "0:58 runtime"],
    description: [
      "We produced podcast content for the founder of A Cool Agency, handling end-to-end video editing, motion graphics, and brand-aligned visual design.",
      "The edit uses custom animations, dynamic captions, and clean transitions to turn raw conversation footage into a polished, share-ready piece.",
      "The final delivery was optimized for social platforms while preserving a visual language that felt aligned with the agency's identity.",
    ],
  },
  {
    slug: "tapcon-marketing",
    title: "TapCon",
    category: "marketing-seo",
    summary:
      "Meta ad campaigns and a structured marketing system that grow brand awareness and lead generation for NFC digital business cards.",
    logo: {
      src: "/portfolio/Marketing%20and%20Branding/tapconlogo.png",
      alt: "TapCon logo",
      width: 611,
      height: 725,
    },
    media: [],
    services: [
      "Meta ad campaigns",
      "Brand awareness",
      "Retargeting",
      "Lead generation",
      "Campaign reporting",
    ],
    stackLabel: "Focus",
    stack: [
      "Meta marketing system",
      "Facebook and Instagram ads",
      "Audience research and segmentation",
      "Performance monitoring",
    ],
    description: [
      "TapCon is an NFC and digital business card solution that helps professionals and businesses share contact details, social links, and brand information through smart digital cards.",
      "We managed Meta marketing to improve brand awareness, reach the right audience, retarget potential customers, and support lead generation through Facebook and Instagram campaigns.",
      "The work was built around a structured Meta marketing system: strategic planning, campaign setup and management, ad run and boosting, retargeting for interested and engaged audiences, audience research and segmentation, campaign report generation, performance monitoring and optimization, and creative direction for ad copy and visuals.",
      "The goal was to increase TapCon's online visibility, retarget potential customers, and improve campaign performance through regular reporting and strategic planning.",
    ],
  },
  {
    slug: "asd-security-seo",
    title: "ASD Security",
    category: "marketing-seo",
    summary:
      "SEO that lifts Google rankings, organic traffic, and customer leads for a full-range home and business security provider.",
    logo: {
      src: "/portfolio/Marketing%20and%20Branding/asdsecurity-logo.svg",
      alt: "ASD Security logo",
      width: 657,
      height: 602,
    },
    media: [],
    services: [
      "Keyword research",
      "On-page SEO",
      "Technical SEO",
      "Local SEO",
      "Link building",
      "Business directory submission",
    ],
    stackLabel: "Focus",
    stack: [
      "Search rankings",
      "Organic traffic",
      "Customer lead generation",
    ],
    description: [
      "ASD Security provides professional security solutions for homes and businesses, including CCTV cameras, alarm systems, access control, fire alarms, and 24/7 monitoring.",
      "We ran SEO for ASD Security to improve the website's Google rankings, increase organic traffic, and generate more customer leads.",
      "The work covered keyword research, on-page and technical SEO, local SEO, link building, and business directory submission to build visibility across the security market.",
    ],
  },
  {
    slug: "dalworth-restoration-seo",
    title: "Dalworth Restoration",
    category: "marketing-seo",
    summary:
      "Local SEO that raises rankings, organic traffic, and qualified leads for a DFW restoration company operating since 1976.",
    logo: {
      src: "/portfolio/Marketing%20and%20Branding/dalworth-restoration-logo.svg",
      alt: "Dalworth Restoration logo",
      width: 119,
      height: 47,
    },
    media: [],
    services: [
      "Keyword research",
      "On-page SEO",
      "Business directory submission",
    ],
    stackLabel: "Focus",
    stack: [
      "Google rankings",
      "Organic traffic",
      "Qualified lead generation",
    ],
    description: [
      "Dalworth Restoration is a trusted restoration company serving the Dallas–Fort Worth area since 1976. The company provides 24/7 emergency services, including water damage restoration, fire damage restoration, mold remediation, storm damage repair, and commercial restoration for homes and businesses.",
      "We ran SEO to increase Google rankings, drive more organic traffic, and generate qualified leads through effective on-page work, keyword research, and business directory submission.",
    ],
  },
  {
    slug: "wintergreen-grass-seo",
    title: "WinterGreen Synthetic Grass",
    category: "marketing-seo",
    summary:
      "Local and technical SEO for a synthetic turf installer looking to rank higher and pull in more customer leads.",
    logo: {
      src: "/portfolio/Marketing%20and%20Branding/wintergreengrass-logo.svg",
      alt: "WinterGreen Synthetic Grass logo",
      width: 297,
      height: 70,
    },
    media: [],
    services: [
      "Keyword research",
      "On-page SEO",
      "Technical SEO",
      "Local SEO",
      "Link building",
    ],
    stackLabel: "Focus",
    stack: [
      "Google rankings",
      "Organic traffic",
      "Customer lead generation",
    ],
    description: [
      "WinterGreen Synthetic Grass provides professional artificial turf installation for residential and commercial properties, including lawns, pet turf, putting greens, and landscaping solutions.",
      "Our SEO project aimed to improve Google rankings, increase organic traffic, and generate more customer leads through keyword research, on-page and technical SEO, local SEO, and link building.",
    ],
  },
  {
    slug: "elite-paint-seo",
    title: "Elite Paint",
    category: "marketing-seo",
    summary:
      "On-page SEO and Google Business Profile optimization that put a painting contractor in front of local customers.",
    logo: {
      src: "/portfolio/Marketing%20and%20Branding/elitepaint.svg",
      alt: "Elite Paint logo",
      width: 297,
      height: 70,
    },
    media: [],
    services: [
      "Keyword research",
      "On-page SEO optimization",
      "Google Business Profile optimization",
    ],
    stackLabel: "Focus",
    stack: [
      "Local search visibility",
      "Google Business Profile",
      "Organic rankings",
    ],
    description: [
      "Elite Paint is a painting contractor whose local customers search for services nearby — so we focused SEO on the places those customers actually look.",
      "The project covered keyword research, on-page SEO optimization, and Google Business Profile (GMB) optimization to strengthen local search visibility and bring in qualified work.",
    ],
  },
  {
    slug: "draped-and-defined-marketing",
    title: "Draped & Defined",
    category: "marketing-seo",
    summary:
      "Meta marketing for a fashion and lifestyle brand: ad campaigns, retargeting, and creative direction across Facebook and Instagram.",
    logo: {
      src: "/portfolio/Marketing%20and%20Branding/drapedndefined.png",
      alt: "Draped & Defined logo",
      width: 4872,
      height: 3112,
    },
    media: [],
    services: [
      "Strategic marketing plan",
      "Meta ad campaign setup",
      "Ad run and boosting",
      "Retargeting campaigns",
      "Audience research",
      "Campaign reporting",
    ],
    stackLabel: "Focus",
    stack: [
      "Meta marketing system",
      "Facebook and Instagram campaigns",
      "Performance monitoring",
      "Creative direction",
    ],
    description: [
      "Draped & Defined is a fashion and lifestyle brand focused on elegant styling, curated product presentation, and strong visual communication across social platforms.",
      "We managed Meta marketing to improve brand awareness, reach the right audience, and support customer engagement through Facebook and Instagram campaigns.",
      "Services included a strategic marketing plan, Meta ad campaign setup and management, ad run and campaign boosting, retargeting campaigns for engaged audiences, audience research and segmentation, campaign report generation, performance monitoring and optimization, and creative direction for ad copy and visuals.",
      "The goal was to build a structured Meta marketing system that increases visibility, retargets potential customers, and improves campaign performance through regular reporting and strategic planning.",
    ],
  },
];
