// Company-wide proof points. Keep these in sync with the claims in
// components/effects/RollingStats.tsx on the home page.
export const companyStats = [
  { value: 1000, suffix: "+", label: "Clients served" },
  { value: 4, suffix: "M+", label: "Orders processed a year" },
  { value: 120, suffix: "+", label: "Brands managed" },
  { value: 24, suffix: "/7", label: "Support coverage" },
] as const;

// Platforms shown in the "Platforms we work on" strip on the services pages.
export const platformTools = [
  "shopify",
  "amazon",
  "etsy",
  "walmart",
  "meta",
  "google",
  "tiktok",
  "instagram",
  "youtube",
  "figma",
  "google-analytics",
  "whatsapp",
] as const;
