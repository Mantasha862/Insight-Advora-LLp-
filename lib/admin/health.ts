import "server-only";
import { hasDb, prisma } from "@/lib/db";

/** Explains why the admin panel cannot be used yet (shown on the login page). */
export async function adminSetupProblems(): Promise<string[]> {
  const problems: string[] = [];
  const secret = process.env.AUTH_SECRET ?? "";
  if (!secret) problems.push("AUTH_SECRET is not set. Generate one with `openssl rand -base64 32` and add it to your environment.");
  else if (secret.length < 32) problems.push("AUTH_SECRET must be at least 32 characters long.");
  if (!hasDb) {
    problems.push("DATABASE_URL is not set, so there is no database to sign in against.");
    return problems;
  }
  try {
    const users = await prisma.user.count({ where: { active: true, role: "admin" } });
    if (users === 0) problems.push("No admin user exists yet. Set ADMIN_BOOTSTRAP_EMAIL (and optionally ADMIN_BOOTSTRAP_PASSWORD) and run `npm run db:seed`.");
  } catch (e) {
    const code = typeof e === "object" && e && "code" in e ? String((e as { code: unknown }).code) : "";
    if (code === "P2021") problems.push("The CMS tables do not exist yet. Run `npx prisma migrate resolve --applied 0_init` then `npm run db:deploy` (see DEVELOPMENT.md).");
    else problems.push(`Cannot connect to the database (${code || "connection error"}). Check DATABASE_URL.`);
  }
  return problems;
}
