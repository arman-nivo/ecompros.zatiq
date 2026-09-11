export type DepartmentId = "operations" | "creative" | "marketing" | "technology";

export type MonthlyPlan = {
  /** Departments this plan covers. Plans are cumulative: each adds one department. */
  departments: readonly DepartmentId[];
  /** Friendlier name for cards and tables. `name` stays the booking-form value. */
  displayName: string;
  monthlyPrice: number;
  name: string;
  tagline: string;
};

// Base monthly rates — the source of truth every other period is calculated from.
export const monthlyPlans: readonly MonthlyPlan[] = [
  {
    name: "Operations",
    displayName: "Operations",
    monthlyPrice: 1200,
    departments: ["operations"],
    tagline: "Your daily store work, handled.",
  },
  {
    name: "Operations + Creative",
    displayName: "Operations + Creative",
    monthlyPrice: 1500,
    departments: ["operations", "creative"],
    tagline: "Add design, video and content.",
  },
  {
    name: "Operations + Creative + Marketing",
    displayName: "Operations + Creative + Marketing",
    monthlyPrice: 1800,
    departments: ["operations", "creative", "marketing"],
    tagline: "Run the store and grow it.",
  },
  {
    name: "Complete Ecommerce Team including tech",
    displayName: "Complete Ecommerce Team",
    monthlyPrice: 2000,
    departments: ["operations", "creative", "marketing", "technology"],
    tagline: "Every department, including tech.",
  },
];

/** Index of the plan highlighted as the recommended starting point. */
export const recommendedPlanIndex = 2;

export type Department = {
  id: DepartmentId;
  items: readonly string[];
  label: string;
  summary: string;
};

// What each department covers. Mirrors the department lists shown on the home page.
export const departments: readonly Department[] = [
  {
    id: "operations",
    label: "Operations",
    summary: "Orders, customers and the daily store work.",
    items: [
      "Order processing and tracking",
      "Customer support by email and chat",
      "Product listings and catalog updates",
      "Fulfilment and courier coordination",
      "Returns, refunds and follow-ups",
      "Store and marketplace management",
    ],
  },
  {
    id: "creative",
    label: "Creative",
    summary: "Design and video that make the brand look sharp.",
    items: [
      "Graphics and product visuals",
      "Video editing and animation",
      "Branding and brand systems",
      "Content for store and social",
      "AI-assisted creative",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    summary: "Traffic, campaigns and conversion.",
    items: [
      "SEO for store and product pages",
      "Ads on Meta, Google and TikTok",
      "Campaign planning and launches",
      "Conversion optimization",
      "Growth reporting",
    ],
  },
  {
    id: "technology",
    label: "Technology",
    summary: "The site, integrations and automation.",
    items: [
      "Web design",
      "Store development",
      "App and tool integrations",
      "Workflow automation",
      "AI implementation",
    ],
  },
];

// Included with every plan, whatever departments it covers.
export const everyPlanIncludes = [
  { title: "One point of contact", body: "One person who knows your store and answers your questions." },
  { title: "24/7 coverage", body: "Your store keeps moving around the clock, across time zones." },
  { title: "Weekly progress report", body: "What was done, what is open, and what comes next." },
  { title: "Works inside your tools", body: "Shopify, Amazon, Etsy, Walmart, and the apps you already use." },
  { title: "Updates on WhatsApp or email", body: "Quick answers in the channel your team already checks." },
  { title: "Up to 30,000 orders a month", body: "Plenty of room to grow before you need a custom plan." },
] as const;

// Base monthly order cap ("Standard monthly service: up to 30,000 orders/month"),
// applied uniformly across tiers.
export const monthlyOrderCap = 30_000;

export type PricingPeriod = "monthly" | "6-month" | "yearly";

export const periodOrder: readonly PricingPeriod[] = [
  "monthly",
  "6-month",
  "yearly",
];

export const periodLabels: Record<PricingPeriod, string> = {
  monthly: "Monthly",
  "6-month": "6 Month",
  yearly: "Yearly",
};

// Number of months each period represents — every other period's price and
// order cap is the monthly rate multiplied by this figure.
export const periodMonths: Record<PricingPeriod, number> = {
  monthly: 1,
  "6-month": 6,
  yearly: 12,
};

export const baseRateNote =
  "Totals are calculated from the standard monthly rate: up to 30,000 orders/month.";
export const enterpriseNote = "Above 1M annual orders → Enterprise";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});
const numberFormatter = new Intl.NumberFormat("en-US");

export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export type ComputedPlanCard = {
  key: string;
  name: string;
  orderCapLabel: string;
  price: string;
  priceSuffix: string;
};

export function getPlansForPeriod(period: PricingPeriod): ComputedPlanCard[] {
  const months = periodMonths[period];

  return monthlyPlans.map((plan) => {
    const totalPrice = plan.monthlyPrice * months;
    const totalOrders = monthlyOrderCap * months;

    return {
      key: plan.name,
      name: plan.name,
      orderCapLabel: `Up to ${numberFormatter.format(totalOrders)} orders`,
      price: currencyFormatter.format(totalPrice),
      priceSuffix: period === "monthly" ? "/month" : `/ ${months} months`,
    };
  });
}

/** Smallest plan that covers every department the visitor asked for. */
export function getBestPlanIndex(needed: readonly DepartmentId[]) {
  const index = monthlyPlans.findIndex((plan) => needed.every((id) => plan.departments.includes(id)));

  return index === -1 ? monthlyPlans.length - 1 : index;
}

export function bookingHref(plan?: string, period?: PricingPeriod, tasks?: readonly string[]) {
  const params = new URLSearchParams();

  if (plan) params.set("plan", plan);
  if (period) params.set("period", period);
  if (tasks?.length) params.set("tasks", tasks.join("|"));

  const query = params.toString();
  return query ? `/booking?${query}#booking` : "/booking";
}

export const pricingFaqs = [
  {
    question: "Which plan should I start with?",
    answer:
      "Start with Operations to get the daily work off your plate, then add Creative, Marketing, or Technology as you grow. Not sure? Book a call and we will recommend a plan based on your store.",
  },
  {
    question: "How do the 6-month and yearly options work?",
    answer:
      "They use the same monthly rate. The price shown is the total for the whole period, and your order allowance covers the whole period too.",
  },
  {
    question: "What if my store handles more than 30,000 orders a month?",
    answer:
      "Tell us your volume and we will scope a plan that fits. Stores above 1 million orders a year move to an Enterprise plan with a dedicated setup.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. When your needs change, let us know and we will move you to the plan that fits, adding or removing departments.",
  },
  {
    question: "Do I need to hire or manage anyone?",
    answer:
      "No. We provide and manage the team. You get one point of contact, updates on WhatsApp or email, and a weekly report.",
  },
  {
    question: "Which platforms do you work with?",
    answer:
      "Shopify, Amazon, Etsy, Walmart, and the tools around them, such as Google Sheets, Gmail, WhatsApp, Meta, and Google Analytics.",
  },
] as const;
