"use client";

import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BadgePercent,
  Boxes,
  CalendarClock,
  Check,
  ClipboardList,
  Handshake,
  LineChart,
  MessagesSquare,
  Receipt,
  RotateCcw,
  Search,
  ShieldCheck,
  Sheet,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import { bookingHref, formatPrice, monthlyPlans } from "@/lib/pricing";

type Category = "store" | "orders" | "customers" | "admin";

type VaTask = {
  body: string;
  category: Category;
  icon: LucideIcon;
  title: string;
};

const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All tasks" },
  { id: "store", label: "Store & catalog" },
  { id: "orders", label: "Orders & shipping" },
  { id: "customers", label: "Customer care" },
  { id: "admin", label: "Admin & research" },
];

const tasks: VaTask[] = [
  { category: "store", icon: Tag, title: "Product listings", body: "Titles, photos, variants, and prices uploaded right." },
  { category: "store", icon: Boxes, title: "Inventory updates", body: "Stock levels, restock alerts, and clean spreadsheets." },
  { category: "store", icon: Search, title: "Product research", body: "Trending products, suppliers, and new ideas." },
  { category: "store", icon: LineChart, title: "Competitor price checks", body: "Track rival prices and promotions every week." },
  { category: "store", icon: BadgePercent, title: "Promotions and discounts", body: "Set up sales, discount codes, and seasonal offers." },
  { category: "orders", icon: ShoppingBag, title: "Order processing", body: "Check, confirm, and route every new order." },
  { category: "orders", icon: Truck, title: "Shipping and tracking", body: "Courier bookings and delivery updates for customers." },
  { category: "orders", icon: RotateCcw, title: "Returns and refunds", body: "Approve, track, and close returns and exchanges." },
  { category: "orders", icon: Handshake, title: "Supplier and dropship orders", body: "Purchase orders and supplier follow-up." },
  { category: "customers", icon: MessagesSquare, title: "Email and live chat support", body: "Fast, friendly replies with the right answer." },
  { category: "customers", icon: Star, title: "Review management", body: "Reply to reviews and collect customer feedback." },
  { category: "customers", icon: AtSign, title: "Social inbox and comments", body: "Answer DMs and keep comments tidy." },
  { category: "customers", icon: ShoppingCart, title: "Abandoned cart follow-ups", body: "Friendly reminders that win back sales." },
  { category: "admin", icon: Sheet, title: "Data entry", body: "Orders, products, and customer data kept organised." },
  { category: "admin", icon: Receipt, title: "Bookkeeping support", body: "Invoices, receipts, and payouts logged each week." },
  { category: "admin", icon: ShieldCheck, title: "Marketplace account health", body: "Watch metrics, policy notices, and alerts." },
  { category: "admin", icon: CalendarClock, title: "Inbox and calendar", body: "Sort email, book calls, and send reminders." },
  { category: "admin", icon: ClipboardList, title: "Weekly reports", body: "What was done, what is open, and what is next." },
];

const starterTasks = ["Product listings", "Order processing", "Email and live chat support"];
const operationsPlan = monthlyPlans[0];

export default function TaskPicker() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<string[]>(starterTasks);

  const visible = useMemo(() => (filter === "all" ? tasks : tasks.filter((task) => task.category === filter)), [filter]);

  function toggle(title: string) {
    setSelected((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));
  }

  return (
    <div className="hm-picker">
      <div className="hm-picker__main">
        <div aria-label="Filter tasks" className="hm-picker__filters" role="group">
          {categories.map((category) => (
            <button
              aria-pressed={filter === category.id}
              className="hm-chip"
              key={category.id}
              onClick={() => setFilter(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <ul className="hm-picker__grid">
          {visible.map((task) => {
            const Icon = task.icon;
            const isOn = selected.includes(task.title);

            return (
              <li key={task.title}>
                <button aria-pressed={isOn} className="hm-task" onClick={() => toggle(task.title)} type="button">
                  <span className="hm-task__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="hm-task__text">
                    <strong>{task.title}</strong>
                    <small>{task.body}</small>
                  </span>
                  <span aria-hidden="true" className="hm-task__check">
                    <Check />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside aria-label="Your task list" className="hm-picker__summary">
        <div className="hm-picker__photo">
          <Image
            alt="Ecommerce virtual assistant managing product listings and orders"
            fill
            sizes="(min-width: 64rem) 24rem, 100vw"
            src="/services/photos/va-hero.jpg"
          />
          <span className="hm-picker__count" aria-live="polite">
            <strong>{selected.length}</strong> {selected.length === 1 ? "task" : "tasks"} on your list
          </span>
        </div>

        <div className="hm-picker__summary-body">
          {selected.length ? (
            <ul className="hm-picker__selected">
              {selected.map((title) => (
                <li key={title}>
                  <button aria-label={`Remove ${title}`} onClick={() => toggle(title)} type="button">
                    {title}
                    <X aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="hm-picker__empty">Tap the tasks you want off your plate. Your list builds here.</p>
          )}

          <p className="hm-picker__plan">
            All of these are covered by the <Link href="/pricing">{operationsPlan.displayName} plan</Link>, from{" "}
            <strong>{formatPrice(operationsPlan.monthlyPrice)}/month</strong>.
          </p>

          <Button href={bookingHref(operationsPlan.name, "monthly", selected)} size="md">
            {selected.length ? "Send this list and book a call" : "Book a call"}
            <ArrowRight aria-hidden="true" size={16} />
          </Button>
          <Link className="hm-textlink" href="/services/e-commerce-virtual-assistant">
            See the full virtual assistant service
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
