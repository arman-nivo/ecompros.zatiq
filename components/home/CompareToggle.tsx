"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";

type Option = "inhouse" | "freelance";

const options: { id: Option; label: string }[] = [
  { id: "inhouse", label: "Hiring in-house" },
  { id: "freelance", label: "Freelancers" },
];

const rows: { label: string; us: string; inhouse: string; freelance: string }[] = [
  {
    label: "Getting started",
    us: "No recruiting or training",
    inhouse: "Recruit, hire, and train",
    freelance: "Search and vet each person",
  },
  {
    label: "Skills covered",
    us: "Operations, creative, marketing, and tech",
    inhouse: "One role per hire",
    freelance: "One skill per freelancer",
  },
  {
    label: "Coverage",
    us: "24/7, across time zones",
    inhouse: "Office hours",
    freelance: "When they are available",
  },
  {
    label: "Managing the work",
    us: "One point of contact",
    inhouse: "You manage the team",
    freelance: "You coordinate everyone",
  },
  {
    label: "Reporting",
    us: "Weekly progress report",
    inhouse: "Up to you to set up",
    freelance: "Varies by person",
  },
  {
    label: "Cost",
    us: "One fixed monthly plan",
    inhouse: "Salaries, benefits, and tools",
    freelance: "Hourly or per project",
  },
];

export default function CompareToggle() {
  const [other, setOther] = useState<Option>("inhouse");
  const otherLabel = options.find((option) => option.id === other)?.label;

  return (
    <div className="hm-compare">
      <div className="hm-compare__top">
        <span className="hm-compare__prompt">Compare EcomPros with</span>
        <div aria-label="Compare with" className="hm-segment" role="group">
          {options.map((option) => (
            <button aria-pressed={other === option.id} key={option.id} onClick={() => setOther(option.id)} type="button">
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <table className="hm-compare__table">
        <caption className="sr-only">EcomPros compared with {otherLabel}</caption>
        <thead>
          <tr>
            <td />
            <th className="hm-compare__us" scope="col">EcomPros</th>
            <th scope="col">{otherLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td className="hm-compare__us">
                <span className="hm-compare__yes">
                  <Check aria-hidden="true" />
                </span>
                {row.us}
              </td>
              <td key={other}>
                <span className="hm-compare__no">
                  <Minus aria-hidden="true" />
                </span>
                {row[other]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
