// API route backing the "book a call" form (components/sections/BookingForm.tsx).
// The client POSTs its form fields here as JSON; this route re-validates them
// server-side (never trust client validation alone) and then hands them to
// lib/mailer.ts, which emails them out over SMTP via Nodemailer.
import { NextResponse } from "next/server";

import { sendBookingInquiry } from "@/lib/mailer";

// Payload as received from the client, before we know it's trustworthy —
// every field is `unknown` until asString() below normalizes it.
type BookingPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  website?: unknown;
  service?: unknown;
  duration?: unknown;
  platforms?: unknown;
  orders?: unknown;
  start?: unknown;
  message?: unknown;
};

// Coerces a JSON value to a trimmed string, or "" for anything that isn't a
// string (missing field, wrong type, etc.) — keeps the fields below simple
// strings without any per-field type checking.
function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  // Reject non-JSON / malformed request bodies before touching any fields.
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = {
    name: asString(payload.name),
    email: asString(payload.email),
    phone: asString(payload.phone),
    company: asString(payload.company),
    website: asString(payload.website),
    service: asString(payload.service),
    duration: asString(payload.duration),
    platforms: asString(payload.platforms),
    orders: asString(payload.orders),
    start: asString(payload.start),
    message: asString(payload.message),
  };

  // Same required-field rules as the client (name, a plausible email,
  // message) — enforced again here since the client check is only a UX
  // convenience and can't be trusted on its own.
  if (!data.name || !/.+@.+\..+/.test(data.email) || !data.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Send the booking notification email over SMTP (Nodemailer). If sending
  // fails (bad credentials, SMTP host unreachable, etc.), report it as a
  // 502 so the client shows its "Something went wrong sending that" fallback.
  try {
    await sendBookingInquiry(data);
  } catch (error) {
    console.error("Failed to send booking inquiry email", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
