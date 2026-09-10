"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingContact() {
  const pathname = usePathname();

  if (pathname?.startsWith("/booking")) {
    return null;
  }

  return (
    <Link className="floating-contact" href="/booking">
      <MessageCircle aria-hidden="true" className="floating-contact__icon" />
      <span>Contact us</span>
    </Link>
  );
}
