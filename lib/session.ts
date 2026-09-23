import { jwtVerify, SignJWT } from "jose";

// Edge/proxy-safe session helpers (no DB access here).

export const SESSION_COOKIE = "ia_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8;

export type SessionPayload = { sub: string; email: string; role: "admin" | "editor" };

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (at least 32 characters).");
  return new TextEncoder().encode(s);
}

export async function signSession(p: SessionPayload) {
  return new SignJWT({ email: p.email, role: p.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(p.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secret());
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    if (!payload.sub || (payload.role !== "admin" && payload.role !== "editor")) return null;
    return { sub: payload.sub, email: String(payload.email ?? ""), role: payload.role };
  } catch {
    return null;
  }
}

export function hasValidSecret() {
  return (process.env.AUTH_SECRET ?? "").length >= 32;
}
