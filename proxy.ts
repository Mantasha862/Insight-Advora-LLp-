import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

const CANONICAL_HOST = "www.insightadvora.com";
const APEX_HOST = "insightadvora.com";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host")?.split(":")[0];

  // 301 apex → www
  if (host === APEX_HOST) {
    const to = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(to, 301);
  }

  // Server-side session check for every /admin route (pages re-verify against the DB).
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    let ok = false;
    try {
      ok = Boolean(await verifySession(req.cookies.get(SESSION_COOKIE)?.value));
    } catch {
      ok = false;
    }
    if (!ok) {
      const login = new URL("/admin/login", req.url);
      return NextResponse.redirect(login);
    }
  }

  const res = NextResponse.next();
  if (url.pathname.startsWith("/admin")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|icon.png|apple-icon.png|opengraph-image.png|favicon.ico).*)"],
};
