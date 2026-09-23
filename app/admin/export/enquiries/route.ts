import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { filtersFrom, listLeads, toCsv } from "@/lib/admin/leads";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return new NextResponse("Forbidden", { status: 403 });
  const leads = await listLeads(filtersFrom(Object.fromEntries(req.nextUrl.searchParams)), 50000);
  const csv = toCsv(leads as unknown as Record<string, unknown>[], ["createdAt", "name", "company", "designation", "email", "phone", "areaOfInterest", "message", "source", "pageUrl", "status", "internalNotes"]);
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
