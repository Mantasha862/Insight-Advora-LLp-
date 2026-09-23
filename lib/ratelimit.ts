import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

type Limiter = { limit: (key: string) => Promise<{ success: boolean }> };

const upstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    : null;

/** In-memory fallback (per server instance) when Upstash is not configured. */
function memoryLimiter(max: number, windowMs: number): Limiter {
  const hits = new Map<string, number[]>();
  return {
    async limit(key) {
      const now = Date.now();
      const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      arr.push(now);
      hits.set(key, arr);
      if (hits.size > 5000) hits.clear();
      return { success: arr.length <= max };
    },
  };
}

function make(prefix: string, max: number, window: `${number} m`): Limiter {
  if (upstash) return new Ratelimit({ redis: upstash, limiter: Ratelimit.slidingWindow(max, window), prefix: `ia:${prefix}` });
  return memoryLimiter(max, parseInt(window, 10) * 60_000);
}

export const limiters = {
  contact: make("contact", 5, "10 m"),
  newsletter: make("newsletter", 5, "10 m"),
  login: make("login", 8, "15 m"),
};

export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function rateLimit(kind: keyof typeof limiters, extra = ""): Promise<boolean> {
  const ip = await clientIp();
  const { success } = await limiters[kind].limit(`${ip}${extra ? `:${extra}` : ""}`);
  return success;
}
