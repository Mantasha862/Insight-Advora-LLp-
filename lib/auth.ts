import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasDb, prisma } from "@/lib/db";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, signSession, verifySession, type SessionPayload } from "@/lib/session";

export type AdminUser = { id: string; email: string; name: string | null; role: "admin" | "editor" };

export async function createSession(p: SessionPayload) {
  const token = await signSession(p);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Returns the signed-in, still-active user — or null. Always re-checks the database. */
export async function getCurrentUser(): Promise<AdminUser | null> {
  if (!hasDb || !process.env.AUTH_SECRET) return null;
  const session = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user || !user.active) return null;
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

/** Guard for every admin page and server action. */
export async function requireUser(role?: "admin"): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (role === "admin" && user.role !== "admin") redirect("/admin?denied=1");
  return user;
}
