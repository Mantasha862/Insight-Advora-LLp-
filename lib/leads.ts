import "server-only";
import { hasDb, prisma } from "@/lib/db";
import type { EnquiryInput, SubscribeInput } from "@/lib/validation";

// Writes go through Supabase PostgREST with the public anon key, so the live RLS
// policies and column grants on `leads` / `subscribers` are always enforced.
// Falls back to Prisma if only DATABASE_URL is configured.

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function restInsert(table: string, row: Record<string, unknown>): Promise<{ ok: boolean; status: number }> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SB_ANON!,
      Authorization: `Bearer ${SB_ANON}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  return { ok: res.ok, status: res.status };
}

export type WriteResult = "ok" | "duplicate" | "unconfigured" | "error";

export async function insertLead(input: EnquiryInput): Promise<WriteResult> {
  const row = {
    name: input.name,
    company: input.company,
    designation: input.designation,
    email: input.email,
    phone: input.phone,
    area_of_interest: input.area_of_interest,
    message: input.message,
    source: input.source || "website",
    page_url: input.page_url,
    status: "new",
  };
  try {
    if (SB_URL && SB_ANON) return (await restInsert("leads", row)).ok ? "ok" : "error";
    if (hasDb) {
      await prisma.lead.create({
        data: {
          name: row.name,
          company: row.company,
          designation: row.designation,
          email: row.email,
          phone: row.phone,
          areaOfInterest: row.area_of_interest,
          message: row.message,
          source: row.source,
          pageUrl: row.page_url,
        },
      });
      return "ok";
    }
    return "unconfigured";
  } catch (e) {
    console.error("[leads] insert failed", e);
    return "error";
  }
}

export async function insertSubscriber(input: SubscribeInput): Promise<WriteResult> {
  const row = { ...input, email: input.email.toLowerCase(), source: "knowledge-hub", confirmed: false };
  try {
    if (SB_URL && SB_ANON) {
      const r = await restInsert("subscribers", row);
      if (r.status === 409) return "duplicate";
      return r.ok ? "ok" : "error";
    }
    if (hasDb) {
      const existing = await prisma.subscriber.findUnique({ where: { email: row.email } });
      if (existing) return "duplicate";
      await prisma.subscriber.create({
        data: { name: row.name, email: row.email, organisation: row.organisation, interest: row.interest, source: row.source },
      });
      return "ok";
    }
    return "unconfigured";
  } catch (e) {
    console.error("[subscribers] insert failed", e);
    return "error";
  }
}
