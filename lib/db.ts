import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** True when a database connection string is configured. */
export const hasDb = Boolean(process.env.DATABASE_URL);

/**
 * Pool defaults suited to a remote pooled database (Vercel builds in the US, the database is in
 * Mumbai): static generation fires many queries at once, and Prisma's defaults (a pool of
 * ~2×CPUs, 10 s wait) time out. Values already present in DATABASE_URL win.
 */
function datasourceUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (!url.searchParams.has("connection_limit")) url.searchParams.set("connection_limit", "10");
    if (!url.searchParams.has("pool_timeout")) url.searchParams.set("pool_timeout", "60");
    return url.toString();
  } catch {
    return raw;
  }
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: datasourceUrl(),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
