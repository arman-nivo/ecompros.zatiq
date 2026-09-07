export interface Testimonial {
  id: string;
  role: string;
  quote: string;
  clientLocation: string; // "City, Country"
  rating: number; // out of 5
  dateRange: string; // "Nov 3 – Nov 5, 2025"
  earned: string; // "$100.00"
  rateType: string; // "Fixed price" | "$10.00/hr"
  hours?: string; // "40 hours" — omit for fixed price jobs
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    role: "Full Stack Developer & Amazon Expert",
    quote:
      "Second time working with Sultan, and he once again delivered outstanding results with professionalism and attention to detail. Communication was smooth, work was on time, and it's always a pleasure collaborating with him.",
    clientLocation: "Chicago, United States",
    rating: 5.0,
    dateRange: "Nov 3 – Nov 5, 2025",
    earned: "$100.00",
    rateType: "Fixed price",
  },
  {
    id: "t2",
    role: "Virtual Assistant for Shopify Landing Pages & Product Management",
    quote:
      "He had good communication & made sure work was done properly.",
    clientLocation: "Lutz, United States",
    rating: 5.0,
    dateRange: "May 20 – May 26, 2025",
    earned: "$25.00",
    rateType: "Fixed price",
  },
  {
    id: "t3",
    role: "Customer Service VA with WordPress & Shopify Expertise",
    quote: "Exceptional talent! It's always a pleasure working with him.",
    clientLocation: "Bainsford, United Kingdom",
    rating: 5.0,
    dateRange: "Nov 9 – Dec 6, 2024",
    earned: "$400.00",
    rateType: "$10.00 / hr",
    hours: "40 hours",
  },
  {
    id: "t4",
    role: "Shopify, Etsy & Amazon Virtual Assistant with SEO Expertise",
    quote:
      "Impressive service — Sultan was organized, responsive, and dependable. Highly recommended!",
    clientLocation: "Morrisville, United States",
    rating: 5.0,
    dateRange: "Oct 28 – Nov 8, 2024",
    earned: "$300.00",
    rateType: "$10.00 / hr",
    hours: "30 hours",
  },
  {
    id: "t5",
    role: "Shopify, WooCommerce Expert & Dropshipping Virtual Assistant",
    quote:
      "Sultan did a great job on my project. He is very efficient, responsive and produces great work. I'm looking forward to working with him again in future projects.",
    clientLocation: "Cleveland, United States",
    rating: 5.0,
    dateRange: "Oct 17 – Oct 23, 2024",
    earned: "$200.00",
    rateType: "$10.00 / hr",
    hours: "20 hours",
  },
];