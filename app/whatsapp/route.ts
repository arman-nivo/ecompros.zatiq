import { NextResponse } from "next/server";

const defaultMessage = "Hi EcomPros, I'd like to book a call.";

// Redirects to WhatsApp so the number stays out of the page source and the repo.
// Set WHATSAPP_NUMBER in .env.local and in Vercel (country code + number, digits only).
export function GET(request: Request) {
  const number = process.env.WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!number) {
    return NextResponse.redirect(new URL("/booking", request.url));
  }

  const whatsappUrl = new URL(`https://wa.me/${number}`);
  whatsappUrl.searchParams.set("text", defaultMessage);

  return NextResponse.redirect(whatsappUrl);
}
