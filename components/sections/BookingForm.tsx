"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { ArrowRight, Check, CircleCheck, LoaderCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { departmentIcons } from "@/components/pricing/departmentIcons";
import Button from "@/components/ui/Button";
import {
  departments,
  formatPrice,
  monthlyPlans,
  periodLabels,
  periodMonths,
  periodOrder,
  type PricingPeriod,
} from "@/lib/pricing";

// Fallback inbox for the "email us directly" link, shown only if sending fails.
const PLACEHOLDER_BOOKING_INBOX = "gazi.arman.islam.zatiq@gmail.com";
const NOT_SURE = "Not sure yet";

const platformOptions = ["Shopify", "Amazon", "Etsy", "Walmart", "TikTok Shop", "WooCommerce", "Other"];
const orderOptions = ["Under 1,000", "1,000 to 5,000", "5,000 to 30,000", "Over 30,000"];
const startOptions = ["As soon as possible", "Within a month", "Just exploring"];

const periodNames: Record<PricingPeriod, string> = {
  monthly: "Monthly",
  "6-month": "6 months",
  yearly: "12 months",
};

type FormData = {
  company: string;
  email: string;
  message: string;
  name: string;
  orders: string;
  period: PricingPeriod;
  phone: string;
  plan: string;
  platforms: string[];
  start: string;
  website: string;
};

type FormErrors = Partial<Record<"email" | "message" | "name", string>>;

const initialFormData: FormData = {
  company: "",
  email: "",
  message: "",
  name: "",
  orders: "",
  period: "monthly",
  phone: "",
  plan: NOT_SURE,
  platforms: [],
  start: startOptions[0],
  website: "",
};

export type BookingPrefill = {
  period?: string;
  plan?: string;
  tasks?: string;
};

// Links from the pricing page and the home task picker carry ?plan=, ?period= and ?tasks=
// so the visitor lands on a form that already reflects what they chose.
function readPrefill({ period, plan, tasks: taskList }: BookingPrefill): Partial<FormData> {
  const prefill: Partial<FormData> = {};
  const tasks = taskList?.split("|").map((task) => task.trim()).filter(Boolean) ?? [];

  if (plan && monthlyPlans.some((item) => item.name === plan)) {
    prefill.plan = plan;
  }

  if (period && period in periodLabels) {
    prefill.period = period as PricingPeriod;
  }

  if (tasks.length) {
    prefill.message = `I would like help with:\n${tasks.map((task) => `- ${task}`).join("\n")}\n\nAbout my store: `;
  }

  return prefill;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Add your name.";
  }

  if (!/.+@.+\..+/.test(data.email.trim())) {
    errors.email = "Add a valid email so we can reply.";
  }

  if (!data.message.trim()) {
    errors.message = "Add a line or two about what you need.";
  }

  return errors;
}

function buildPayload(data: FormData) {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    company: data.company.trim(),
    website: data.website.trim(),
    service: data.plan,
    duration: data.plan === NOT_SURE ? "" : periodLabels[data.period],
    platforms: data.platforms.join(", "),
    orders: data.orders,
    start: data.start,
    message: data.message.trim(),
  };
}

function buildMailtoUrl(data: FormData) {
  const payload = buildPayload(data);
  const subject = `Ecom ProDesk project inquiry - ${payload.company || payload.name}`;
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `WhatsApp / phone: ${payload.phone || "Not provided"}`,
    `Company: ${payload.company || "Not provided"}`,
    `Store website: ${payload.website || "Not provided"}`,
    `Plan: ${payload.service}`,
    `Billing period: ${payload.duration || "Not provided"}`,
    `Platforms: ${payload.platforms || "Not provided"}`,
    `Orders per month: ${payload.orders || "Not provided"}`,
    `Start: ${payload.start}`,
    "",
    "Project note:",
    payload.message,
  ].join("\n");

  return `mailto:${PLACEHOLDER_BOOKING_INBOX}?${new URLSearchParams({ subject, body }).toString()}`;
}

export default function BookingForm({ prefill = {} }: { prefill?: BookingPrefill }) {
  const id = useId();
  const [formData, setFormData] = useState<FormData>(() => ({ ...initialFormData, ...readPrefill(prefill) }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"error" | "idle" | "sending" | "success">("idle");
  const [sentName, setSentName] = useState("");

  const selectedPlan = monthlyPlans.find((plan) => plan.name === formData.plan);
  const months = periodMonths[formData.period];

  function updateField<Field extends keyof FormData>(field: Field, value: FormData[Field]) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (status === "error") {
      setStatus("idle");
    }
  }

  function togglePlatform(platform: string) {
    setFormData((current) => ({
      ...current,
      platforms: current.platforms.includes(platform)
        ? current.platforms.filter((item) => item !== platform)
        : [...current.platforms, platform],
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      const firstInvalid = (["name", "email", "message"] as const).find((field) => nextErrors[field]);
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(formData)),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSentName(formData.name.trim().split(" ")[0] ?? "");
      setStatus("success");
      setFormData(initialFormData);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div aria-live="polite" className="bk-success">
        <span className="bk-success__icon">
          <CircleCheck aria-hidden="true" />
        </span>
        <h2>Thanks{sentName ? `, ${sentName}` : ""}! Your request is in.</h2>
        <p>
          We will read your note and reply by email to set up a short call. Want a faster answer? Message us on
          WhatsApp.
        </p>
        <div className="bk-success__actions">
          <Link className="sv-whatsapp" href="/whatsapp" prefetch={false} rel="noopener noreferrer" target="_blank">
            <IconBrandWhatsapp aria-hidden="true" />
            Chat on WhatsApp
          </Link>
          <Button href="/services" size="md" variant="secondary">
            Explore our services
          </Button>
        </div>
        <button className="bk-success__again" onClick={() => setStatus("idle")} type="button">
          Send another request
        </button>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form className="bk-form" noValidate onSubmit={onSubmit}>
      <fieldset className="bk-step">
        <legend>
          <span className="bk-step__num">1</span>
          Which plan interests you?
        </legend>

        <div className="bk-plans">
          {[...monthlyPlans, null].map((plan) => {
            const value = plan?.name ?? NOT_SURE;
            const isOn = formData.plan === value;

            return (
              <label className={isOn ? "bk-plan bk-plan--on" : "bk-plan"} key={value}>
                <input
                  checked={isOn}
                  className="sr-only"
                  name="plan"
                  onChange={() => updateField("plan", value)}
                  type="radio"
                  value={value}
                />
                {plan ? (
                  <span className="bk-plan__depts" aria-hidden="true">
                    {departments.map((department) => {
                      const Icon = departmentIcons[department.id];

                      return (
                        <span className={plan.departments.includes(department.id) ? "pp-dept pp-dept--on" : "pp-dept"} key={department.id}>
                          <Icon />
                        </span>
                      );
                    })}
                  </span>
                ) : (
                  <span className="bk-plan__depts" aria-hidden="true">
                    <span className="pp-dept pp-dept--on">
                      <Sparkles />
                    </span>
                  </span>
                )}
                <strong>{plan?.displayName ?? NOT_SURE}</strong>
                <small>{plan ? `${formatPrice(plan.monthlyPrice)}/month` : "We will recommend one"}</small>
                <span className="bk-plan__check" aria-hidden="true">
                  <Check />
                </span>
              </label>
            );
          })}
        </div>

        {selectedPlan ? (
          <div className="bk-period">
            <span className="bk-label" id={`${id}-period`}>
              Billing period
            </span>
            <div aria-labelledby={`${id}-period`} className="pp-segment" role="group">
              {periodOrder.map((key) => (
                <button aria-pressed={formData.period === key} key={key} onClick={() => updateField("period", key)} type="button">
                  {periodNames[key]}
                </button>
              ))}
            </div>
            <p className="bk-summary" aria-live="polite">
              <strong>{selectedPlan.displayName}</strong> · {formatPrice(selectedPlan.monthlyPrice)}/month
              {months > 1 ? ` · ${formatPrice(selectedPlan.monthlyPrice * months)} for ${months} months` : ""}
            </p>
          </div>
        ) : null}
      </fieldset>

      <fieldset className="bk-step">
        <legend>
          <span className="bk-step__num">2</span>
          About your store
        </legend>

        <div className="bk-field">
          <span className="bk-label" id={`${id}-platforms`}>
            Where do you sell? <span className="bk-optional">Pick all that apply</span>
          </span>
          <div aria-labelledby={`${id}-platforms`} className="bk-chips" role="group">
            {platformOptions.map((platform) => (
              <button
                aria-pressed={formData.platforms.includes(platform)}
                className="hm-chip"
                key={platform}
                onClick={() => togglePlatform(platform)}
                type="button"
              >
                {formData.platforms.includes(platform) ? <Check aria-hidden="true" /> : null}
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="bk-grid">
          <label className="bk-field">
            <span className="bk-label">Orders per month</span>
            <select className="bk-control" onChange={(event) => updateField("orders", event.target.value)} value={formData.orders}>
              <option value="">Select a range</option>
              {orderOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="bk-field">
            <span className="bk-label">When would you like to start?</span>
            <select className="bk-control" onChange={(event) => updateField("start", event.target.value)} value={formData.start}>
              {startOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="bk-field bk-grid__wide">
            <span className="bk-label">
              Store website <span className="bk-optional">Optional</span>
            </span>
            <input
              className="bk-control"
              inputMode="url"
              onChange={(event) => updateField("website", event.target.value)}
              placeholder="yourstore.com"
              value={formData.website}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="bk-step">
        <legend>
          <span className="bk-step__num">3</span>
          Your details
        </legend>

        <div className="bk-grid">
          <label className="bk-field">
            <span className="bk-label">Name</span>
            <input
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              className="bk-control"
              id={`${id}-name`}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
              value={formData.name}
            />
            {errors.name ? (
              <span className="bk-error" id={`${id}-name-error`}>
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="bk-field">
            <span className="bk-label">Email</span>
            <input
              aria-describedby={errors.email ? `${id}-email-error` : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className="bk-control"
              id={`${id}-email`}
              inputMode="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@company.com"
              type="email"
              value={formData.email}
            />
            {errors.email ? (
              <span className="bk-error" id={`${id}-email-error`}>
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="bk-field">
            <span className="bk-label">
              WhatsApp number <span className="bk-optional">Optional</span>
            </span>
            <input
              autoComplete="tel"
              className="bk-control"
              inputMode="tel"
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+1 555 000 0000"
              type="tel"
              value={formData.phone}
            />
          </label>

          <label className="bk-field">
            <span className="bk-label">
              Company <span className="bk-optional">Optional</span>
            </span>
            <input
              autoComplete="organization"
              className="bk-control"
              onChange={(event) => updateField("company", event.target.value)}
              placeholder="Your brand or store name"
              value={formData.company}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="bk-step">
        <legend>
          <span className="bk-step__num">4</span>
          What do you need help with?
        </legend>

        <label className="bk-field">
          <span className="sr-only">Your note</span>
          <textarea
            aria-describedby={errors.message ? `${id}-message-error` : undefined}
            aria-invalid={Boolean(errors.message)}
            className="bk-control bk-control--textarea"
            id={`${id}-message`}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="For example: we sell on Shopify and Amazon, handle about 3,000 orders a month, and need help with customer emails, returns, and product listings."
            value={formData.message}
          />
          {errors.message ? (
            <span className="bk-error" id={`${id}-message-error`}>
              {errors.message}
            </span>
          ) : null}
        </label>
      </fieldset>

      <div className="bk-submit">
        <Button disabled={status === "sending"} size="lg" type="submit">
          {status === "sending" ? (
            <>
              <LoaderCircle aria-hidden="true" className="bk-spinner" size={18} />
              Sending
            </>
          ) : (
            <>
              Send and book my call
              <ArrowRight aria-hidden="true" size={18} />
            </>
          )}
        </Button>
        <p aria-live="polite" className={status === "error" ? "bk-status bk-status--error" : "bk-status"}>
          {status === "error" && hasErrors ? (
            "Please fill in the highlighted fields."
          ) : status === "error" ? (
            <>
              Something went wrong sending that. <a href={buildMailtoUrl(formData)}>Email us directly</a> or message us on
              WhatsApp.
            </>
          ) : (
            "We reply by email, or on WhatsApp if you add your number."
          )}
        </p>
      </div>
    </form>
  );
}
