export type MonthlyPlan = {
  monthlyPrice: number;
  name: string;
};

// Base monthly rates — the source of truth every other period is calculated from.
export const monthlyPlans: readonly MonthlyPlan[] = [
  { name: "Operations", monthlyPrice: 1200 },
  { name: "Operations + Creative", monthlyPrice: 1500 },
  { name: "Operations + Creative + Marketing", monthlyPrice: 1800 },
  { name: "Complete Ecommerce Team including tech", monthlyPrice: 2000 },
];

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
