import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { sanitizeText, validateContactForm } from "@/lib/validation";
import { normalizePhone } from "@/lib/utils";

type RateLimitState = { count: number; resetAt: number };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<string, RateLimitState>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const payload = {
    name: sanitizeText(String((body as Record<string, unknown>)?.name ?? "")),
    phone: String((body as Record<string, unknown>)?.phone ?? "").trim(),
    email: sanitizeText(String((body as Record<string, unknown>)?.email ?? "")),
    message: sanitizeText(String((body as Record<string, unknown>)?.message ?? "")),
    company: String((body as Record<string, unknown>)?.company ?? ""),
  };

  const validationErrors = validateContactForm(payload);

  if (Object.values(validationErrors).some(Boolean)) {
    return NextResponse.json(
      { message: "Validation failed.", errors: validationErrors },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({
      name: payload.name,
      phone: normalizePhone(payload.phone),
      email: payload.email,
      message: payload.message,
    });

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact email error", error);
    return NextResponse.json(
      { message: "Unable to send message at this time." },
      { status: 500 },
    );
  }
}
