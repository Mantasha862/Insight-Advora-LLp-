import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { toCsv } from "@/lib/admin/leads";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return new NextResponse("Forbidden", { status: 403 });
  const subs = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  const csv = toCsv(subs as unknown as Record<string, unknown>[], ["createdAt", "name", "email", "organisation", "interest", "source", "confirmed", "unsubscribedAt"]);
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
