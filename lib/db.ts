import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** True when a database connection string is configured. */
export const hasDb = Boolean(process.env.DATABASE_URL);

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient({ log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
