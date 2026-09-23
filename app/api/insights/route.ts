import { NextResponse, type NextRequest } from "next/server";
import { searchArticles } from "@/lib/data";

// Public, read-only: returns published articles only (server-side search + pagination).
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const clean = (k: string) => (sp.get(k) ?? "").slice(0, 120) || undefined;
  const { items, total } = await searchArticles({
    q: clean("q"),
    category: clean("category"),
    type: clean("type"),
    industry: clean("industry"),
    offset: Number(sp.get("offset") ?? 0) || 0,
    limit: Number(sp.get("limit") ?? 6) || 6,
  });
  return NextResponse.json(
    { items: items.map(({ body: _body, ...rest }) => rest), total },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
