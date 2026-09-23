import { z } from "zod";
import { areasOfInterest } from "@/content/site";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const opt = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters).").max(120),
  company: opt(160),
  designation: opt(120),
  email: z.string().trim().max(254).regex(EMAIL, "Please enter a valid email address."),
  phone: opt(32),
  area_of_interest: z.enum(areasOfInterest).catch("Other"),
  message: opt(4000),
  page_url: opt(500),
  source: z.string().max(80).optional().default("website"),
});

export const subscribeSchema = z.object({
  name: opt(120),
  email: z.string().trim().max(254).regex(EMAIL, "Please enter a valid email address."),
  organisation: opt(160),
  interest: opt(120),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
