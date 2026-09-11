"use client";

import { ArrowRight, Check, Info } from "lucide-react";
import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";

import { departmentIcons } from "@/components/pricing/departmentIcons";

import {
  bookingHref,
  departments,
  formatNumber,
  formatPrice,
  getBestPlanIndex,
  monthlyOrderCap,
  monthlyPlans,
  periodMonths,
  periodOrder,
  recommendedPlanIndex,
  type DepartmentId,
  type PricingPeriod,
} from "@/lib/pricing";

const periodNames: Record<PricingPeriod, string> = {
  monthly: "Monthly",
  "6-month": "6 months",
  yearly: "12 months",
};

const orderSteps = [1_000, 2_500, 5_000, 10_000, 15_000, 20_000, 30_000, 40_000, 60_000];

export default function PlanPicker() {
  const sliderId = useId();
  const [period, setPeriod] = useState<PricingPeriod>("monthly");
  const [needed, setNeeded] = useState<DepartmentId[]>(["operations"]);
  const [orderStep, setOrderStep] = useState(2);
  const [touched, setTouched] = useState(false);

  const months = periodMonths[period];
  const orders = orderSteps[orderStep];
  const overCap = orders > monthlyOrderCap;
  const bestIndex = getBestPlanIndex(needed);
  const highlightIndex = touched ? bestIndex : recommendedPlanIndex;

  function toggleDepartment(id: DepartmentId) {
    setTouched(true);
    setNeeded((current) => {
      if (current.includes(id)) {
        const next = current.filter((item) => item !== id);
        return next.length ? next : ["operations"];
      }

      return [...current, id];
    });
  }

  return (
    <div className="pp-picker">
      <div className="pp-finder" data-reveal>
        <div className="pp-finder__group">
          <span className="pp-finder__label">1. What do you need help with?</span>
          <div aria-label="Departments you need" className="pp-finder__options" role="group">
            {departments.map((department) => {
              const Icon = departmentIcons[department.id];
              const isOn = needed.includes(department.id);

              return (
                <button aria-pressed={isOn} className="pp-need" key={department.id} onClick={() => toggleDepartment(department.id)} type="button">
                  <span className="pp-need__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="pp-need__text">
                    <strong>{department.label}</strong>
                    <small>{department.summary}</small>
                  </span>
                  <span aria-hidden="true" className="pp-need__check">
                    <Check />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pp-finder__row">
          <div className="pp-finder__group">
            <label className="pp-finder__label" htmlFor={sliderId}>
              2. Orders per month: <strong>{overCap ? `${formatNumber(monthlyOrderCap)}+` : formatNumber(orders)}</strong>
            </label>
            <input
              aria-valuetext={overCap ? `More than ${formatNumber(monthlyOrderCap)} orders` : `${formatNumber(orders)} orders`}
              className="pp-range"
              id={sliderId}
              max={orderSteps.length - 1}
              min={0}
              onChange={(event) => setOrderStep(Number(event.target.value))}
              step={1}
              style={{ "--fill": `${(orderStep / (orderSteps.length - 1)) * 100}%` } as CSSProperties}
              type="range"
              value={orderStep}
            />
            <div aria-hidden="true" className="pp-range__scale">
              <span>1k</span>
              <span>30k</span>
              <span>60k+</span>
            </div>
          </div>

          <div className="pp-finder__group">
            <span className="pp-finder__label">3. Billing period</span>
            <div aria-label="Billing period" className="pp-segment" role="group">
              {periodOrder.map((key) => (
                <button aria-pressed={period === key} key={key} onClick={() => setPeriod(key)} type="button">
                  {periodNames[key]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p aria-live="polite" className={overCap ? "pp-finder__result pp-finder__result--custom" : "pp-finder__result"}>
          <Info aria-hidden="true" />
          {overCap ? (
            <span>
              Over {formatNumber(monthlyOrderCap)} orders a month? We will build a custom plan around your volume.{" "}
              <Link href={bookingHref(undefined, period)}>Talk to us</Link>
            </span>
          ) : touched ? (
            <span>
              Best fit for you: <strong>{monthlyPlans[bestIndex].displayName}</strong> at{" "}
              {formatPrice(monthlyPlans[bestIndex].monthlyPrice)}/month.
            </span>
          ) : (
            <span>Pick what you need above and we will highlight the plan that fits.</span>
          )}
        </p>
      </div>

      <div className="pp-plans" id="plans">
        {monthlyPlans.map((plan, index) => {
          const isHighlight = index === highlightIndex;
          const previous = monthlyPlans[index - 1];
          const added = departments.filter((department) => plan.departments.includes(department.id) && !previous?.departments.includes(department.id));
          const total = plan.monthlyPrice * months;

          return (
            <article className={isHighlight ? "pp-plan pp-plan--on" : "pp-plan"} data-reveal key={plan.name}>
              {isHighlight ? <span className="pp-plan__badge">{touched ? "Best fit for you" : "Recommended"}</span> : null}

              <div className="pp-plan__depts" aria-label={`Includes ${plan.departments.length} of 4 departments`}>
                {departments.map((department) => {
                  const Icon = departmentIcons[department.id];
                  const on = plan.departments.includes(department.id);

                  return (
                    <span className={on ? "pp-dept pp-dept--on" : "pp-dept"} key={department.id} title={department.label}>
                      <Icon aria-hidden="true" />
                    </span>
                  );
                })}
              </div>

              <h3>{plan.displayName}</h3>
              <p className="pp-plan__tagline">{plan.tagline}</p>

              <p className="pp-plan__price">
                <strong>{formatPrice(plan.monthlyPrice)}</strong>
                <span>/month</span>
              </p>
              <p className="pp-plan__billing">
                {months === 1 ? "Billed monthly" : `${formatPrice(total)} for ${months} months`}
                <br />
                Up to {formatNumber(monthlyOrderCap * months)} orders
              </p>

              <Link className={isHighlight ? "btn btn--primary btn--md" : "btn btn--secondary btn--md"} href={bookingHref(plan.name, period)}>
                Choose this plan
                <ArrowRight aria-hidden="true" size={16} />
              </Link>

              <div className="pp-plan__includes">
                {previous ? <p className="pp-plan__plus">Everything in {previous.displayName}, plus:</p> : <p className="pp-plan__plus">What is included:</p>}
                {added.map((department) => (
                  <div key={department.id}>
                    <p className="pp-plan__dept-name">{department.label}</p>
                    <ul>
                      {department.items.map((item) => (
                        <li key={item}>
                          <Check aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
