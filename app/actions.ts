"use server";

import { enquirySchema, subscribeSchema } from "@/lib/validation";
import { insertLead, insertSubscriber, type WriteResult } from "@/lib/leads";
import { rateLimit } from "@/lib/ratelimit";

export type FormState = { status: "idle" | "success" | "error"; message?: string; fieldErrors?: Record<string, string>; fileUrl?: string | null };

const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : undefined;
};

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}

function unconfigured(result: WriteResult): FormState | null {
  if (result !== "unconfigured") return null;
  if (process.env.NODE_ENV !== "production") {
    console.warn("[forms] No Supabase/DB configured — submission accepted in development only.");
    return { status: "success" };
  }
  return { status: "error", message: "Our enquiry system is temporarily unavailable." };
}

export async function submitEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  // Honeypot — bots fill every field.
  if (str(fd, "website")) return { status: "success" };
  const parsed = enquirySchema.safeParse({
    name: str(fd, "name"),
    company: str(fd, "company"),
    designation: str(fd, "designation"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    area_of_interest: str(fd, "area_of_interest"),
    message: str(fd, "message"),
    page_url: str(fd, "page_url"),
    source: str(fd, "source") || "website",
  });
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  if (!(await rateLimit("contact"))) return { status: "error", message: "Too many submissions. Please try again in a few minutes." };

  const result = await insertLead(parsed.data);
  return unconfigured(result) ?? (result === "ok" ? { status: "success" } : { status: "error", message: "We could not submit your enquiry." });
}

export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  if (str(fd, "website")) return { status: "success" };
  const parsed = subscribeSchema.safeParse({
    name: str(fd, "name"),
    email: str(fd, "email"),
    organisation: str(fd, "organisation"),
    interest: str(fd, "interest"),
  });
  if (!parsed.success) return { status: "error", message: "Please enter a valid email address.", fieldErrors: fieldErrors(parsed.error.issues) };
  if (!(await rateLimit("newsletter"))) return { status: "error", message: "Too many attempts. Please try again shortly." };

  const result = await insertSubscriber(parsed.data);
  // Duplicate email = quiet success (never reveal whether an address is subscribed).
  if (result === "duplicate") return { status: "success" };
  return unconfigured(result) ?? (result === "ok" ? { status: "success" } : { status: "error", message: "We could not complete your subscription." });
}

/** Gated resource: captures a lead, then returns the file URL (never sent to the client beforehand). */
export async function requestResource(_prev: FormState, fd: FormData): Promise<FormState> {
  if (str(fd, "website")) return { status: "success" };
  const { getResources } = await import("@/lib/data");
  const slug = str(fd, "resource") ?? "";
  const resource = (await getResources()).find((r) => r.slug === slug);
  if (!resource) return { status: "error", message: "Resource not found." };

  const parsed = enquirySchema.safeParse({
    name: str(fd, "name"),
    company: str(fd, "company"),
    email: str(fd, "email"),
    area_of_interest: "Other",
    message: `Resource request: ${resource.title}`,
    source: `resource:${resource.slug}`.slice(0, 80),
    page_url: "/knowledge-hub",
  });
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  if (!(await rateLimit("contact", "resource"))) return { status: "error", message: "Too many requests. Please try again shortly." };

  const result = await insertLead(parsed.data);
  const base = unconfigured(result) ?? (result === "ok" ? { status: "success" as const } : { status: "error" as const, message: "We could not process your request." });
  return base.status === "success" ? { ...base, fileUrl: resource.fileUrl ?? null } : base;
}
