// Server-only mail helper for the booking form. This module talks to an SMTP
// server via Nodemailer (no EmailJS or any browser-side mail SDK involved) —
// it must only ever be imported from server code (API routes), since it reads
// SMTP credentials from process.env and would leak them if bundled for the client.
import nodemailer from "nodemailer";

// Shape of one booking form submission, mirrored from BookingForm.tsx's
// FormData type. Kept as plain strings since values arrive from JSON.
export type BookingInquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  duration: string;
  platforms: string;
  orders: string;
  start: string;
  message: string;
};

// Label/value pairs shared by the text and HTML versions of the email.
function detailRows(data: BookingInquiry): Array<[string, string]> {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["WhatsApp / phone", data.phone || "Not provided"],
    ["Company", data.company || "Not provided"],
    ["Store website", data.website || "Not provided"],
    ["Plan", data.service || "Not sure yet"],
    ["Billing period", data.duration || "Not provided"],
    ["Platforms", data.platforms || "Not provided"],
    ["Orders per month", data.orders || "Not provided"],
    ["Start", data.start || "Not provided"],
  ];
}

// Cached across requests (and hot reloads) so we don't reconnect/re-auth to
// the SMTP server on every single form submission.
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

// Builds (once) and returns the Nodemailer SMTP transporter using the
// MAIL_* credentials from .env.local:
//   MAIL_HOST     -> sandbox.smtp.mailtrap.io (Mailtrap's SMTP sandbox)
//   MAIL_PORT     -> 2525 (Mailtrap's non-465 test port, so `secure` is false)
//   MAIL_USERNAME -> Mailtrap SMTP username
//   MAIL_PASSWORD -> Mailtrap SMTP password
// `secure: true` is only correct for port 465 (implicit TLS); other ports
// like 587/2525 use STARTTLS, which Nodemailer negotiates automatically when
// `secure` is false.
function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT ?? 587);
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error("Mail is not configured: missing MAIL_HOST, MAIL_USERNAME, or MAIL_PASSWORD.");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

// Escapes user-supplied text before it's interpolated into the HTML email
// body, so a booking submission can't inject markup/scripts into the email
// (basic HTML-injection protection for the HTML part of the message).
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Plain-text version of the notification email. Every field from the
// booking form is listed on its own line so it's easy to scan/copy from a
// text-only mail client.
function buildTextBody(data: BookingInquiry) {
  return [
    "New project inquiry from the Ecom ProDesk website",
    "",
    ...detailRows(data).map(([label, value]) => `${`${label}:`.padEnd(19)}${value}`),
    "",
    "Project note:",
    data.message,
  ].join("\n");
}

// HTML version of the notification email: same fields as buildTextBody, but
// laid out as a two-column table (label/value) plus a highlighted block for
// the free-text project note, so it's organized and easy to read in an inbox.
function buildHtmlBody(data: BookingInquiry) {
  const rowsHtml = detailRows(data)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e5e5;color:#6b6b6b;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e5e5;color:#111;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#111;margin-bottom:4px;">New project inquiry</h2>
      <p style="color:#6b6b6b;margin-top:0;">Submitted from the Ecom ProDesk booking form.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${rowsHtml}
      </table>
      <div>
        <p style="color:#6b6b6b;font-size:13px;margin-bottom:4px;">Project note</p>
        <p style="color:#111;font-size:14px;white-space:pre-wrap;border-left:3px solid #e5722c;padding-left:12px;">${escapeHtml(data.message)}</p>
      </div>
    </div>
  `;
}

// Sends one booking form submission as an email, via SMTP (Nodemailer), to
// the inbox configured in BOOKING_NOTIFY_EMAIL — this is "my email" the
// booking form should notify. Called from the /api/booking route handler
// (app/api/booking/route.ts) after that route validates the payload.
export async function sendBookingInquiry(data: BookingInquiry) {
  // Destination inbox — where booking notifications land. Currently set in
  // .env.local to gazi.arman.islam.zatiq@gmail.com.
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!to) {
    throw new Error("Mail is not configured: missing BOOKING_NOTIFY_EMAIL.");
  }

  // "From" address/name shown on the email. Falls back to the SMTP username
  // and a default display name if MAIL_FROM_* aren't set.
  const fromAddress = process.env.MAIL_FROM_ADDRESS ?? process.env.MAIL_USERNAME ?? "no-reply@ecompros.dev";
  const fromName = process.env.MAIL_FROM_NAME ?? "Ecom ProDesk Website";
  const subjectLabel = data.company || data.name;

  await getTransporter().sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    // Reply-To is the lead's own email, so hitting "Reply" in the inbox
    // replies straight to the person who submitted the form, not to
    // no-reply@ecompros.dev.
    replyTo: data.email,
    subject: `Ecom ProDesk project inquiry - ${subjectLabel}`,
    // Both a plain-text and an HTML body are sent; mail clients pick
    // whichever they support/prefer to render.
    text: buildTextBody(data),
    html: buildHtmlBody(data),
  });
}
